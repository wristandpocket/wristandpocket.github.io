# Reads pixel sizes of local PNG, JPEG, GIF and WebP files at build time.
# - Liquid filter `image_size`: "/assets/x.webp" | image_size => [width, height] or nil.
#   Used for og:image:width / og:image:height.
# - Liquid filter `lazy_images`: adds loading="lazy" and decoding="async" to every
#   <img> in a post body that does not set them (the cover stays eager in the layout).
# - post_render hook: adds width/height to local <img> tags in blog posts that
#   have none, so body images never shift the layout (CLS). Post CSS keeps
#   `height: auto` (or fixed gallery sizes), so the attributes only reserve space.
# The same file lives in figarist.github.io and wristandpocket.github.io.
module ImageDimensions
  CACHE = {}

  module_function

  def lookup(site, src)
    return nil if src.nil?

    path = src.to_s.strip
    path = path.sub(%r{\Ahttps?://[^/]+}i, '') if site && path.start_with?(site.config['url'].to_s) && !site.config['url'].to_s.empty?
    return nil unless path.start_with?('/') && !path.start_with?('//')

    path = path.split(/[?#]/).first
    file = File.join(site.source, path)
    return CACHE[file] if CACHE.key?(file)

    CACHE[file] = File.file?(file) ? read(file) : nil
  rescue StandardError
    nil
  end

  def read(file)
    File.open(file, 'rb') do |io|
      head = io.read(32) || ''
      if head.start_with?("\x89PNG".b)
        head[16, 8].unpack('NN')
      elsif head.start_with?('GIF8')
        head[6, 4].unpack('vv')
      elsif head[0, 4] == 'RIFF' && head[8, 4] == 'WEBP'
        webp(head, io)
      elsif head.start_with?("\xFF\xD8".b)
        jpeg(io)
      end
    end
  end

  def webp(head, io)
    io.seek(0)
    data = io.read(30) || ''
    case data[12, 4]
    when 'VP8 '
      w, h = data[26, 4].unpack('vv')
      [w & 0x3fff, h & 0x3fff]
    when 'VP8L'
      b = data[21, 4].unpack('C4')
      w = 1 + (((b[1] & 0x3f) << 8) | b[0])
      h = 1 + (((b[3] & 0x0f) << 10) | (b[2] << 2) | ((b[1] & 0xc0) >> 6))
      [w, h]
    when 'VP8X'
      w = 1 + (data[24, 3] + "\x00".b).unpack1('V')
      h = 1 + (data[27, 3] + "\x00".b).unpack1('V')
      [w, h]
    end
  end

  def jpeg(io)
    io.seek(2)
    200.times do
      marker = io.read(2)
      return nil if marker.nil? || marker.getbyte(0) != 0xFF

      code = marker.getbyte(1)
      next io.seek(-1, IO::SEEK_CUR) if code == 0xFF # fill byte
      next if code == 0x01 || (0xD0..0xD9).cover?(code) # standalone markers

      length = io.read(2)&.unpack1('n')
      return nil if length.nil? || length < 2

      if (0xC0..0xCF).cover?(code) && ![0xC4, 0xC8, 0xCC].include?(code)
        io.read(1)
        h, w = io.read(4).unpack('nn')
        return [w, h]
      end
      io.seek(length - 2, IO::SEEK_CUR)
    end
    nil
  end
end

module Jekyll
  module ImageSizeFilter
    def image_size(src)
      ImageDimensions.lookup(@context.registers[:site], src)
    end

    def lazy_images(html)
      html.to_s.gsub(/<img\b[^>]*>/i) do |tag|
        tag = tag.sub(/<img\b/i, '<img loading="lazy"') unless tag =~ /\sloading\s*=/i
        tag = tag.sub(/<img\b/i, '<img decoding="async"') unless tag =~ /\sdecoding\s*=/i
        tag
      end
    end
  end
end

Liquid::Template.register_filter(Jekyll::ImageSizeFilter)

Jekyll::Hooks.register :documents, :post_render do |item|
  next unless item.collection&.label == 'posts' && item.output_ext == '.html' && item.output

  site = item.site
  item.output = item.output.gsub(/<img\b[^>]*>/i) do |tag|
    next tag if tag =~ /\swidth\s*=/i || tag =~ /\sheight\s*=/i

    src = tag[/\ssrc\s*=\s*["']([^"']+)["']/i, 1]
    size = ImageDimensions.lookup(site, src)
    next tag unless size

    tag.sub(/<img\b/i, %(<img width="#{size[0]}" height="#{size[1]}"))
  end
end
