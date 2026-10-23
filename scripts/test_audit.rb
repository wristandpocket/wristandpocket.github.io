# frozen_string_literal: true
Encoding.default_external = Encoding::UTF_8
Encoding.default_internal = Encoding::UTF_8
require 'tmpdir'
require 'fileutils'
require 'open3'

# Mutate only a disposable copy of the generated site, never production sources.
Dir.mktmpdir('wrist-pocket-audit-') do |temp|
  FileUtils.cp_r('_site/.', temp)
  file = File.join(temp, 'uk/index.html')
  original = File.read(file, encoding: 'UTF-8')
  cases = {
    'missing asset' => original.sub('</main>', '<img alt="control" src="/missing-control.webp"></main>'),
    'broken anchor' => original.sub('</main>', '<a href="/uk/#missing-control">control</a></main>'),
    'duplicate hreflang' => original.sub('</head>', '<link rel="alternate" hreflang="uk" href="https://wristandpocket.dev/uk/"></head>'),
    'wrong canonical' => original.sub('rel="canonical" href="https://wristandpocket.dev/uk/"', 'rel="canonical" href="https://wristandpocket.dev/"'),
    'unwanted noindex' => original.sub('index, follow', 'noindex'),
    'localhost leak' => original.sub('</main>', '<p>http://localhost:4000</p></main>'),
    'homepage breadcrumb' => original.sub('"@graph": [{', '"@graph": [{"@type":"BreadcrumbList","itemListElement":[]},{')
  }
  cases.each do |name, broken|
    raise "Control did not mutate HTML: #{name}" if broken == original
    File.write(file, broken, encoding: 'UTF-8')
    output, status = Open3.capture2e({ 'RUBYOPT' => '-EUTF-8:UTF-8' }, 'ruby', '-E', 'UTF-8:UTF-8', 'scripts/audit_site.rb', temp)
    raise "Audit missed #{name}: #{output}" if status.success?
    puts "PASS: audit rejects #{name}"
    File.write(file, original, encoding: 'UTF-8')
  end
  moved = File.join(temp, 'blog/hello-world/index.html')
  FileUtils.mv(moved, moved + '.control')
  _, status = Open3.capture2e({ 'RUBYOPT' => '-EUTF-8:UTF-8' }, 'ruby', '-E', 'UTF-8:UTF-8', 'scripts/audit_site.rb', temp)
  raise 'Audit missed removed route' if status.success?
  FileUtils.mv(moved + '.control', moved)
  puts 'PASS: audit rejects removed public route'
  map = File.join(temp, 'sitemap.xml')
  original_map = File.read(map, encoding: 'UTF-8')
  File.write(map, original_map.sub('<loc>https://wristandpocket.dev/', '<loc>https://wrong.example/'), encoding: 'UTF-8')
  _, status = Open3.capture2e({ 'RUBYOPT' => '-EUTF-8:UTF-8' }, 'ruby', '-E', 'UTF-8:UTF-8', 'scripts/audit_site.rb', temp)
  raise 'Audit missed incorrect sitemap' if status.success?
  File.write(map, original_map, encoding: 'UTF-8')
  puts 'PASS: audit rejects incorrect sitemap'
  FileUtils.mkdir_p(File.join(temp, 'Docs'))
  File.write(File.join(temp, 'Docs/private.md'), 'synthetic control', encoding: 'UTF-8')
  _, status = Open3.capture2e({ 'RUBYOPT' => '-EUTF-8:UTF-8' }, 'ruby', '-E', 'UTF-8:UTF-8', 'scripts/audit_site.rb', temp)
  raise 'Audit missed operational file leak' if status.success?
  FileUtils.rm_r(File.join(temp, 'Docs'))
  puts 'PASS: audit rejects operational file leak'
  output, status = Open3.capture2e({ 'RUBYOPT' => '-EUTF-8:UTF-8' }, 'ruby', '-E', 'UTF-8:UTF-8', 'scripts/audit_site.rb', temp)
  raise "Restored fixture fails: #{output}" unless status.success?
  puts 'PASS: restored temporary build passes'
end
