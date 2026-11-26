# frozen_string_literal: true

# Post update dates count only when the owner sets them on purpose.
#
# jekyll-last-modified-at gives every post its last Git commit time, so a technical commit
# (title card, link fix, a scheduled post committed days early) looked like a content update
# and could even put dateModified before datePublished. For posts, keep last_modified_at only
# when the front matter sets a real date later than the publish date; otherwise drop it, so
# templates fall back to page.date and the visible "Updated" line stays hidden.
# Pages (home, games, tools) keep the plugin's Git date for the sitemap.
Jekyll::Hooks.register :site, :post_read do |site|
  site.posts.docs.each do |post|
    value = post.data["last_modified_at"]
    offset = post.date ? post.date.utc_offset : 0
    # A date-only value (2026-12-12) is midnight in the post's own offset, whatever the build machine's timezone.
    value = (Date.iso8601(value) rescue value) if value.is_a?(String) && value.strip.match?(/\A\d{4}-\d{2}-\d{2}\z/)
    time =
      case value
      when Time then value
      when Date then Time.new(value.year, value.month, value.day, 0, 0, 0, offset)
      when String then (Jekyll::Utils.parse_date(value) rescue nil)
      end # the plugin's Git Determinator and nil end up as nil
    # Compare and show it in the post's own UTC offset (the sites set no timezone, CI runs in UTC):
    # 22:00Z is already the next day in Kyiv.
    time = time.getlocal(offset) if time
    if time && post.date && time.to_date > post.date.to_date
      post.data["last_modified_at"] = time
    else
      post.data.delete("last_modified_at")
    end
  end
end
