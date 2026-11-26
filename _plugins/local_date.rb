# Localized post dates: {{ page.date | local_date: site.active_lang }}
# uk "26 листопада 2026", ru "26 ноября 2026", ko "2026년 11월 26일", en "November 26, 2026".
module Jekyll
  module LocalDateFilter
    MONTHS = {
      "uk" => %w[січня лютого березня квітня травня червня липня серпня вересня жовтня листопада грудня],
      "ru" => %w[января февраля марта апреля мая июня июля августа сентября октября ноября декабря]
    }.freeze

    def local_date(input, lang = "en")
      date = input.respond_to?(:strftime) ? input : Jekyll::Utils.parse_date(input.to_s)
      case lang.to_s
      when "uk", "ru" then "#{date.day} #{MONTHS[lang.to_s][date.month - 1]} #{date.year}"
      when "ko" then "#{date.year}년 #{date.month}월 #{date.day}일"
      else date.strftime("%B %-d, %Y")
      end
    rescue StandardError
      input
    end
  end
end

Liquid::Template.register_filter(Jekyll::LocalDateFilter)
