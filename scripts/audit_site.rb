# frozen_string_literal: true
require 'nokogiri'
require 'json'
require 'uri'
require 'fileutils'

base = File.expand_path(ARGV.fetch(0, '_site'))
origin = 'https://wristandpocket.dev'
errors = []
records = []
docs = Dir["#{base}/**/*.html"].to_h { |file| [file, Nokogiri::HTML(File.read(file))] }
check = ->(condition, route, message) { errors << "#{route}: #{message}" unless condition }
route_for = ->(file) { file.delete_prefix(base).sub(/index\.html$/, '') }
target_for = lambda do |route|
  target = File.join(base, URI::DEFAULT_PARSER.unescape(route))
  route.end_with?('/') ? File.join(target, 'index.html') : target
end
sitemap_file = File.join(base, 'sitemap.xml')
sitemap = File.file?(sitemap_file) ? Nokogiri::XML(File.read(sitemap_file)) : Nokogiri::XML('')
urls = sitemap.xpath('//*[local-name()="loc"]').map(&:text)
check.call(!urls.empty? && urls.uniq == urls, 'sitemap', 'missing or duplicate URLs')
indexable = []
metadata = Hash.new { |hash, key| hash[key] = [] }
docs.each do |file, doc|
  route = route_for.call(file)
  bare = route.sub(%r{^/(uk|ru|ko)/}, '/')
  url = origin + route
  lang = route[%r{^/(uk|ru|ko)/}, 1] || 'en'
  is_404 = bare == '/404.html'
  check.call(doc.at_css('html')&.[]('lang') == lang, route, 'incorrect document language')
  check.call(doc.css('h1').size == 1, route, 'expected one H1')
  check.call(doc.css('link[rel="canonical"]').map { |n| n['href'] } == [url], route, 'canonical must occur once and match this route')
  check.call(doc.at_css('meta[property="og:url"]')&.[]('content') == url, route, 'incorrect OG URL')
  %w[title description].each do |key|
    node = key == 'title' ? doc.at_css('title') : doc.at_css('meta[name="description"]')
    value = key == 'title' ? node&.text : node&.[]('content')
    check.call(value && !value.strip.empty?, route, "missing #{key}")
    metadata[[lang, key, value]] << route unless is_404
  end
  robots = doc.css('meta[name="robots"]').map { |n| n['content'] }.join(' ')
  check.call(is_404 ? robots.include?('noindex') : !robots.include?('noindex'), route, 'incorrect indexing directive')
  indexable << url unless is_404
  alternates = doc.css('link[hreflang]')
  check.call(alternates.size == 5, route, 'expected exactly five hreflang links')
  %w[en uk ru ko x-default].each do |alternate|
    expected = origin + (%w[en x-default].include?(alternate) ? '' : "/#{alternate}") + bare
    check.call(alternates.select { |n| n['hreflang'] == alternate }.map { |n| n['href'] } == [expected], route, "incorrect hreflang #{alternate}")
  end
  check.call(!File.read(file).match?(/localhost|127\.0\.0\.1|synthetic-audit|TODO|draft-preview/), route, 'development content leaked')
  if bare == '/' || bare.start_with?('/games/')
    check.call(!doc.text.match?(/Premium Wear OS|first.of.its.kind|first.ever|Coming soon to Play Store/i), route, 'unverified product marketing claim')
  end
  check.call(doc.css('[ferh]').empty?, route, 'unprocessed static_href')
  doc.css('script[type="application/ld+json"]').each do |block|
    begin
      data = JSON.parse(block.text)
      check.call(!block.text.match?(/aggregateRating|"offers"/), route, 'unverified rating or offer')
      # Check URL identities too: Polyglot does not localize JSON-LD strings.
      objects = data['@graph'] || [data]
      if %w[/ /uk/ /ru/ /ko/].include?(route)
        check.call(objects.none? { |object| object['@type'] == 'BreadcrumbList' }, route, 'homepage emits self-referential BreadcrumbList')
      end
      objects.each do |object|
        next unless %w[CreativeWork BlogPosting CollectionPage].include?(object['@type'])
        identity = object['url'] || object.dig('mainEntityOfPage', '@id')
        check.call(identity == url, route, 'JSON-LD identity differs from canonical')
      end
    rescue JSON::ParserError => e
      errors << "#{route}: invalid JSON-LD #{e.message}"
    end
  end
  doc.css('a[href],link[href],img[src],script[src],iframe[src],source[src],video[src],video[poster],source[data-src],[data-full-src],[data-video-src],meta[property="og:image"]').each do |node|
    values = %w[href src poster data-src data-full-src data-video-src].filter_map { |attr| node[attr] }
    values << node['content'] if node['property'] == 'og:image'
    values.each do |value|
      next if value.to_s.empty? || value.match?(/^(mailto:|tel:|data:)/)
      begin
        target_url = URI.join(url, value)
        records << { source: route, url: target_url.to_s }
        next unless target_url.host == 'wristandpocket.dev'
        target = target_for.call(target_url.path)
        check.call(File.file?(target), route, "missing target #{value}")
        if File.file?(target) && target.end_with?('.html') && target_url.fragment
          target_doc = docs[target] || Nokogiri::HTML(File.read(target))
          fragment = URI::DEFAULT_PARSER.unescape(target_url.fragment)
          check.call(target_doc.css('[id],[name]').any? { |n| n['id'] == fragment || n['name'] == fragment }, route, "missing anchor #{value}")
        end
      rescue URI::Error => e
        errors << "#{route}: invalid URL #{value}: #{e.message}"
      end
    end
  end
end
metadata.each { |(_, key, _), routes| check.call(routes.size == 1, routes.join(', '), "duplicate #{key} in one locale") }
check.call(urls.sort == indexable.sort, 'sitemap', 'must contain exactly the indexable canonical HTML routes')
JSON.parse(File.read('scripts/public_routes.json')).each do |route|
  check.call(File.file?(target_for.call(route)), route, 'previously published route removed')
end
%w[Docs scripts qa-evidence ci-results .agents .frontmatter].each do |name|
  check.call(Dir["#{base}/**/#{name}"].empty?, name, 'internal directory leaked')
end
check.call(!Dir["#{base}/**/*"].any? { |p| File.file?(p) && p.match?(/\.(rb|ps1|md|log|toml)$/i) }, 'build', 'source or operational file leaked')
robots = File.read(File.join(base, 'robots.txt'))
check.call(robots.include?("Sitemap: #{origin}/sitemap.xml") && !robots.match?(/^Disallow:\s*\/\s*$/), 'robots.txt', 'invalid crawl policy')
FileUtils.mkdir_p('qa-evidence')
File.write('qa-evidence/link-inventory.json', JSON.pretty_generate({pages: docs.size, records: records.uniq, errors: errors}))
puts "Site audit: #{docs.size} pages, #{records.size} URL references, #{errors.size} errors"
puts errors.first(60)
exit(errors.empty? ? 0 : 1)
