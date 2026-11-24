# frozen_string_literal: true

# Liquid filter for _includes/gallery.html: lists the photos inside a folder
# of the source tree. jekyll-polyglot skips static files for non-default
# languages, so site.static_files cannot be used there.
#   {% assign photos = "/assets/images/blog/<page_id>/<id>/" | gallery_photos %}
module Figarist
  module GalleryPhotos
    PHOTO_EXTS = %w[.webp .jpg .jpeg .png .avif].freeze

    def gallery_photos(dir)
      site = @context.registers[:site]
      root = File.expand_path(site.source)
      abs = File.expand_path(dir.to_s.sub(%r{\A/+}, ''), root)
      return [] unless abs.start_with?("#{root}/") && File.directory?(abs)

      Dir.children(abs)
         .reject { |name| name.start_with?('.') }
         .select { |name| PHOTO_EXTS.include?(File.extname(name).downcase) }
         .sort
         .map { |name| { 'name' => name, 'basename' => File.basename(name, '.*') } }
    end
  end
end

Liquid::Template.register_filter(Figarist::GalleryPhotos)
