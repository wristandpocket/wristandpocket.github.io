---
layout: tool
lang: ru
page_id: "tool-wearview"
permalink: /tools/wearview/
title: "WearView: просмотр экрана Wear OS"
badge: "Бесплатный инструмент для разработчиков"
description: "Просмотр скриншотов Wear OS и живых окон Unity на 21 3D-модели часов в масштабе 1:1: безопасные зоны, касания и проверка AOD. Бесплатно."
banner: "/assets/images/tools/wearview-hero.webp"
banner_alt: "WearView показывает экран игры для Wear OS на 3D-модели Samsung Galaxy Watch7"
image: "/assets/images/tools/wearview-og.webp"
app_url: "/wearview/"
source_url: "https://github.com/wristandpocket/wearview"
cta: "Открыть WearView"
source_cta: "Код на GitHub"
cta_note: "Без регистрации и загрузок: скриншоты и трансляция остаются в вашем браузере."
gallery_title: "Как это выглядит"
screenshots:
  - src: "/assets/images/tools/wearview-compare.webp"
    alt: "Режим сравнения: один и тот же экран на Galaxy Watch7 44 мм и Pixel Watch 41 мм"
  - src: "/assets/images/tools/wearview-safe-zones.webp"
    alt: "Тестовый шаблон с кольцами безопасных зон Wear OS на круглом дисплее"
  - src: "/assets/images/tools/wearview-wrist.webp"
    alt: "Вид на запястье: часы на модели руки для масштаба"
faq:
  - question: "Как посмотреть экран Wear OS без физических часов?"
    answer: "Откройте WearView, выберите любую из 21 модели часов и вставьте скриншот через Ctrl+V (или перетащите PNG, JPEG или WebP). Изображение ложится на круглый дисплей физически точной 3D-модели, чтобы читаемость, рамки и обрезку было видно ещё до сборки на устройство."
  - question: "Можно ли видеть Unity Game view на часах в реальном времени?"
    answer: "Да. Нажмите «Capture window (live)» и поделитесь окном Unity Game view или эмулятора Wear OS в Android Studio. WearView транслирует его на дисплей часов кадр за кадром, а обрезка и кольца безопасных зон работают и в живом режиме."
  - question: "Какие 21 модель часов есть в инструменте?"
    answer: "21 модель из 4 семейств устройств: Google Pixel Watch 1/2 (41 мм), Pixel Watch 3 (41 и 45 мм), Pixel Watch 4 (41 и 45 мм), Samsung Galaxy Watch5 (40 и 44 мм), Watch6 (40 и 44 мм), Watch7 (40 и 44 мм), Watch4 Classic (46 мм), Watch5 Pro (45 мм), Watch6 Classic (43 и 47 мм), Watch8 Classic (46 мм), Watch Ultra (47 мм), OnePlus Watch 2 (46 мм), OnePlus Watch 3 (46 мм), Xiaomi Watch 2 Pro (46 мм) и Mobvoi TicWatch Pro 5 (48 мм)."
  - question: "Показываются ли часы в реальном физическом размере?"
    answer: "Да. Выполните одноразовую калибровку по стандартной банковской карте 85,60 мм ISO/IEC 7810 ID-1 (или задайте PPI монитора), и режим «1:1 Real size» покажет каждые часы в точном миллиметровом масштабе."
  - question: "Как работает проверка AOD и выгорания OLED (< 10% OPR)?"
    answer: "WearView в реальном времени рассчитывает долю активных пикселей On-Pixel Ratio (OPR) и взвешенную яркость ITU-R BT.709 для кадра Always-On Display (AOD) и подсвечивает проблемные участки на тепловой карте, помогая соблюсти ограничения энергопотребления и защиты OLED."
  - question: "Чем помогают шаблон пальца 14 мм и 2-секундный тест взгляда?"
    answer: "В откалиброванном режиме 1:1 шаблон пальца диаметром 14 мм показывает, какую часть крошечного экрана физически перекрывает подушечка пальца при касании. Тест «2s Glance» на две секунды показывает интерфейс как при вскидывании запястья, проверяя мгновенную считываемость."
  - question: "Загружаются ли мои скриншоты куда-нибудь?"
    answer: "Нет. WearView — полностью клиентское WebGL-приложение без сервера и аналитики. Изображения и захват окна обрабатываются только в памяти вашего браузера."
  - question: "WearView бесплатный?"
    answer: "Да. Он бесплатный и с открытым кодом под лицензией MIT."
---

WearView — бесплатная браузерная 3D-студия для разработчиков игр и приложений под Wear OS, авторов циферблатов и Unity-разработчиков. Плоский квадратный скриншот на большом мониторе обманывает: мелкий текст кажется чётким, кнопки у краёв — безопасными, а плоский безель не отбрасывает тень под углом. На круглом экране диаметром 30–38 мм на движущемся запястье тот же кадр ведёт себя иначе.

WearView проецирует ваши скриншоты или живую трансляцию из Unity и эмулятора на **21 физически точную 3D-модель смарт-часов Wear OS из 4 семейств устройств**, дополненную инструментами эргономики и OLED QA.

## Что можно делать

- **21 3D-модель Wear OS из 4 семейств.** Быстрое переключение между Google Pixel Watch (1/2/3/4), Samsung Galaxy Watch Modern Flat (Watch5/6/7), Classic/Pro/Ultra (Watch4 Classic, Watch5 Pro, Watch6 Classic, Watch8 Classic, Watch Ultra) и 46–48-мм моделями OnePlus, Xiaomi и Mobvoi.
- **Вставка, перетаскивание, лайв-трансляция и автоматизация.** Ctrl+V с любым скриншотом, перетаскивание PNG/JPEG/WebP, живой стрим Unity Game view или Android Studio Emulator и мост `postMessage` для автоматических пайплайнов.
- **Реальный физический размер (1:1).** Однократная калибровка банковской картой 85,60 мм или ползунком PPI показывает корпус, безель и пиксели в точном миллиметровом масштабе.
- **Безопасные зоны 80% и 90%.** Кольца 80%, 90% и 100%, чтобы проверить читаемость текста и убедиться, что кнопки не срежет круглая маска или приподнятый поворотный безель.
- **Пакет физической эргономики и QA:**
  - **Зона пальца 14 мм (`👆 14mm Finger`)** в масштабе 1:1 — для проверки реального размера целей касания и перекрытия интерфейса пальцем.
  - **2-секундный тест взгляда (`⏱ 2s Glance`)** — имитирует короткое поднятие запястья и проверяет моментальную считываемость UI.
  - **Проверка AOD и выгорания OLED (`☀️ AOD / OPR < 10%`)** — рассчитывает On-Pixel Ratio (OPR) и яркость для Always-On Display.
- **Нативные пиксели, пресеты ракурсов и PNG-снимок.** Проверка реального разрешения (`384×384` – `480×480`), быстрые ракурсы `0°` (фронт), `35°` (наклон запястья) и `75°` (срез безеля), сравнение двух моделей рядом, освещение (студия, солнце, ночь) и экспорт PNG клавишей `[P]`.

## Поддерживаемые 21 модель часов Wear OS (таблица характеристик)

<div style="overflow-x: auto; max-width: 100%; -webkit-overflow-scrolling: touch; margin: 20px 0;">
<table style="width: 100%; border-collapse: collapse; font-size: 0.88rem; line-height: 1.45;">
<thead>
<tr>
<th style="border: 1px solid #303b4b; padding: 8px 10px; text-align: left;">Семейство</th>
<th style="border: 1px solid #303b4b; padding: 8px 10px; text-align: left;">Модель</th>
<th style="border: 1px solid #303b4b; padding: 8px 10px; text-align: left;">Корпус (мм)</th>
<th style="border: 1px solid #303b4b; padding: 8px 10px; text-align: left;">Активный дисплей</th>
<th style="border: 1px solid #303b4b; padding: 8px 10px; text-align: left;">Разрешение</th>
<th style="border: 1px solid #303b4b; padding: 8px 10px; text-align: left;">Плотность</th>
<th style="border: 1px solid #303b4b; padding: 8px 10px; text-align: left;">Стекло и безель</th>
</tr>
</thead>
<tbody>
<tr>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Google Pixel Watch</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Google Pixel Watch 1/2 (41mm)</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">41.0 × 41.0 × 12.3 mm</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">30.48 mm (1.20")</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">384×384 px</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">320 PPI</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Купольное стекло-галька (рамка 5.26 мм)</td>
</tr>
<tr>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Google Pixel Watch</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Google Pixel Watch 3 (41mm)</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">41.0 × 41.0 × 12.3 mm</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">32.20 mm (1.27")</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">408×408 px</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">320 PPI</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Купольное стекло-галька (рамка 4.40 мм)</td>
</tr>
<tr>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Google Pixel Watch</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Google Pixel Watch 3 (45mm)</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">45.0 × 45.0 × 12.3 mm</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">35.56 mm (1.40")</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">456×456 px</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">326 PPI</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Купольное стекло-галька (рамка 4.72 мм)</td>
</tr>
<tr>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Google Pixel Watch</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Google Pixel Watch 4 (41mm)</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">41.0 × 41.0 × 12.3 mm</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">33.02 mm (1.30" Actua 360)</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">416×416 px</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">320 PPI</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Купольное стекло-галька (рамка 3.99 мм)</td>
</tr>
<tr>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Google Pixel Watch</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Google Pixel Watch 4 (45mm)</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">45.0 × 45.0 × 12.3 mm</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">36.20 mm (1.43" Actua 360)</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">456×456 px</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">320 PPI</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Купольное стекло-галька (рамка 4.40 мм)</td>
</tr>
<tr>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Galaxy Modern Flat</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Samsung Galaxy Watch7 (40mm)</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">40.4 × 40.4 × 9.7 mm</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">33.27 mm (1.31")</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">432×432 px</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">330 PPI</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Плоский сапфир + алюминиевый ободок</td>
</tr>
<tr>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Galaxy Modern Flat</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Samsung Galaxy Watch7 (44mm)</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">44.4 × 44.4 × 9.7 mm</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">37.34 mm (1.47")</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">480×480 px</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">327 PPI</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Плоский сапфир + алюминиевый ободок</td>
</tr>
<tr>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Galaxy Modern Flat</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Samsung Galaxy Watch6 (40mm)</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">40.4 × 38.8 × 9.0 mm</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">33.27 mm (1.31")</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">432×432 px</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">330 PPI</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Плоский сапфир + алюминиевый ободок</td>
</tr>
<tr>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Galaxy Modern Flat</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Samsung Galaxy Watch6 (44mm)</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">44.4 × 42.8 × 9.0 mm</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">37.34 mm (1.47")</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">480×480 px</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">327 PPI</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Плоский сапфир + алюминиевый ободок</td>
</tr>
<tr>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Galaxy Modern Flat</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Samsung Galaxy Watch5 (40mm)</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">40.4 × 39.3 × 9.8 mm</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">30.23 mm (1.19")</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">396×396 px</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">330 PPI</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Плоский сапфир + широкий сенсорный безель</td>
</tr>
<tr>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Galaxy Modern Flat</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Samsung Galaxy Watch5 (44mm)</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">44.4 × 43.3 × 9.8 mm</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">34.60 mm (1.36")</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">450×450 px</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">330 PPI</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Плоский сапфир + сенсорный безель</td>
</tr>
<tr>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Galaxy Classic / Pro / Ultra</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Samsung Galaxy Watch8 Classic (46mm)</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">46.4 × 46.0 × 10.6 mm</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">34.04 mm (1.34")</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">438×438 px</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">327 PPI</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Корпус-подушка + 48-зубчатый безель</td>
</tr>
<tr>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Galaxy Classic / Pro / Ultra</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Samsung Galaxy Watch6 Classic (43mm)</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">42.5 × 42.5 × 10.9 mm</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">33.27 mm (1.31")</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">432×432 px</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">330 PPI</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Приподнятый поворотный стальной безель</td>
</tr>
<tr>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Galaxy Classic / Pro / Ultra</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Samsung Galaxy Watch6 Classic (47mm)</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">46.5 × 46.5 × 10.9 mm</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">37.34 mm (1.47")</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">480×480 px</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">327 PPI</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Приподнятый поворотный стальной безель</td>
</tr>
<tr>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Galaxy Classic / Pro / Ultra</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Samsung Galaxy Watch5 Pro (45mm)</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">45.4 × 45.4 × 10.5 mm</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">34.60 mm (1.36")</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">450×450 px</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">330 PPI</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Приподнятый вогнутый титановый бортик</td>
</tr>
<tr>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Galaxy Classic / Pro / Ultra</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Samsung Galaxy Watch4 Classic (46mm)</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">45.5 × 45.5 × 11.0 mm</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">34.60 mm (1.36")</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">450×450 px</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">330 PPI</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Приподнятый поворотный стальной безель</td>
</tr>
<tr>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Galaxy Classic / Pro / Ultra</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Samsung Galaxy Watch Ultra (47mm)</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">47.4 × 47.4 × 12.1 mm</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">37.34 mm (1.47")</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">480×480 px</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">327 PPI</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Титановая подушка + приподнятый безель</td>
</tr>
<tr>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">OnePlus, Xiaomi &amp; Mobvoi</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">OnePlus Watch 3 (46mm)</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">47.6 × 46.6 × 11.8 mm</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">38.10 mm (1.50")</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">466×466 px</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">310 PPI</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Асимметричный корпус + титановый безель</td>
</tr>
<tr>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">OnePlus, Xiaomi &amp; Mobvoi</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">OnePlus Watch 2 (46mm)</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">47.0 × 46.6 × 12.1 mm</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">36.32 mm (1.43")</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">466×466 px</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">326 PPI</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Асимметричный корпус + сапфир 2.5D</td>
</tr>
<tr>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">OnePlus, Xiaomi &amp; Mobvoi</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Xiaomi Watch 2 Pro (46mm)</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">47.6 × 45.9 × 11.8 mm</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">36.32 mm (1.43")</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">466×466 px</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">326 PPI</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Хронограф с гильошированным безелем</td>
</tr>
<tr>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">OnePlus, Xiaomi &amp; Mobvoi</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Mobvoi TicWatch Pro 5 (48mm)</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">50.1 × 48.0 × 12.2 mm</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">36.32 mm (1.43")</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">466×466 px</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">326 PPI</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Рифлёный тактический безель</td>
</tr>
</tbody>
</table>
</div>

## Инженерные заметки по теме

- [Почему я перестал верить скриншотам своих игр для Wear OS](/ru/blog/stop-trusting-wear-os-screenshots/) — почему плоский монитор обманывает и как лайв-стрим из Unity ускоряет разработку.
- [Безопасные зоны Wear OS, цели касания 14 мм и OLED AOD &lt;10% OPR: практический гайд по WearView](/ru/blog/wearos-safe-zones-aod-opr-ergonomics/) — правила круглой обрезки, проверка эргономики пальца и бюджет яркости Always-On Display.

## Для кого

Для разработчиков игр и приложений под Wear OS, авторов циферблатов, UI-дизайнеров и QA-тестировщиков, которым нужен быстрый и честный взгляд на экран до сборки на устройство. Тестирование на реальных часах инструмент не заменяет, но отлавливает ошибки вёрстки, безелей и AOD ещё до первого деплоя APK.

## Приватность

Всё работает локально в браузере. Нет аккаунта, загрузок на сервер, трекеров и бэкенда.
