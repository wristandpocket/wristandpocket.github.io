source "https://rubygems.org"

# Use Jekyll directly (NOT github-pages) so custom plugins like Polyglot load
gem "jekyll", "~> 4.3"

# Plugins
group :jekyll_plugins do
  gem "jekyll-feed", "~> 0.12"
  gem "jekyll-seo-tag", "~> 2.9"
  gem "jekyll-sitemap"
  # Upgrade deliberately with multilingual routing and metadata regression gates.
  gem "jekyll-polyglot", "= 1.14.0"
  gem "jekyll-paginate-v2"
  gem "jekyll-spaceship"
  gem "jekyll-minifier"
  gem "jekyll-redirect-from"
  gem "jekyll-pwa-workbox", require: false
  gem "jekyll-toc"
  gem "jekyll-last-modified-at"
  gem "jekyll-archives"
end


# Required for Ruby 3.x local dev server (WEBrick removed from stdlib)
gem "webrick", "~> 1.8"

group :test do
  gem "html-proofer", "~> 5.2"
end

gem "bundler-audit", "~> 0.9.3", group: :test
