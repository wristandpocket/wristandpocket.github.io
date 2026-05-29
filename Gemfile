source "https://rubygems.org"

# Use Jekyll directly (NOT github-pages) so custom plugins like Polyglot load
gem "jekyll", "~> 4.3"

# Plugins
group :jekyll_plugins do
  gem "jekyll-feed", "~> 0.12"
  gem "jekyll-seo-tag"
  gem "jekyll-sitemap"
  gem "jekyll-polyglot"
  gem "jekyll-paginate-v2"
  gem "jekyll-spaceship"
  gem "jekyll-minifier"
  gem "jekyll-redirect-from"
  gem "jekyll-pwa-workbox"
  gem "jekyll-toc"
  gem "jekyll-last-modified-at"
  gem "jekyll-archives"
end


# Required for Ruby 3.x local dev server (WEBrick removed from stdlib)
gem "webrick", "~> 1.8"

group :test do
  gem "html-proofer", "~> 5.0"
end
