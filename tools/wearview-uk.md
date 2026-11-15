---
layout: tool
lang: uk
page_id: "tool-wearview"
permalink: /tools/wearview/
title: "WearView — 3D-перегляд екрана Wear OS, безпечні зони та перевірка AOD"
badge: "Безкоштовний інструмент для розробників"
description: "Вставте скриншот або транслюйте Unity чи емулятор наживо на 21 точну 3D-модель годинників Wear OS у масштабі 1:1 із безпечними зонами 80%/90%, шаблоном пальця 14 мм, тестом читання за 2 с та перевіркою OLED AOD <10% OPR."
banner: "/assets/images/tools/wearview-hero.webp"
banner_alt: "WearView показує екран гри для Wear OS на 3D-моделі Samsung Galaxy Watch7"
image: "/assets/images/tools/wearview-og.webp"
app_url: "/wearview/"
source_url: "https://github.com/wristandpocket/wearview"
cta: "Відкрити WearView"
source_cta: "Код на GitHub"
cta_note: "Без реєстрації та завантажень: скриншоти й трансляція лишаються у вашому браузері."
gallery_title: "Як це виглядає"
screenshots:
  - src: "/assets/images/tools/wearview-compare.webp"
    alt: "Режим порівняння: той самий екран на Galaxy Watch7 44 мм і Pixel Watch 41 мм"
  - src: "/assets/images/tools/wearview-safe-zones.webp"
    alt: "Тестовий шаблон із кільцями безпечних зон Wear OS на круглому дисплеї"
  - src: "/assets/images/tools/wearview-wrist.webp"
    alt: "Вигляд на зап'ясті: годинник на моделі руки для масштабу"
faq:
  - question: "Як переглянути екран Wear OS без фізичного годинника?"
    answer: "Відкрийте WearView, оберіть будь-яку з 21 моделі годинника і вставте скриншот через Ctrl+V (або перетягніть PNG, JPEG чи WebP). Зображення лягає на круглий дисплей точної 3D-моделі з реальними габаритами, щоб ви побачили читабельність, рамки й обрізання ще до збірки на пристрій."
  - question: "Чи можна бачити Unity Game view на годиннику в реальному часі?"
    answer: "Так. Натисніть «Capture window (live)» і поділіться вікном Unity Game view або емулятора Wear OS в Android Studio. WearView транслює його на дисплей годинника кадр за кадром, а обрізання та кільця безпечних зон працюють і наживо."
  - question: "Які 21 модель годинників є в інструменті?"
    answer: "21 модель із 4 сімейств пристроїв: Google Pixel Watch 1/2 (41 мм), Pixel Watch 3 (41 і 45 мм), Pixel Watch 4 (41 і 45 мм), Samsung Galaxy Watch5 (40 і 44 мм), Watch6 (40 і 44 мм), Watch7 (40 і 44 мм), Watch4 Classic (46 мм), Watch5 Pro (45 мм), Watch6 Classic (43 і 47 мм), Watch8 Classic (46 мм), Watch Ultra (47 мм), OnePlus Watch 2 (46 мм), OnePlus Watch 3 (46 мм), Xiaomi Watch 2 Pro (46 мм) та Mobvoi TicWatch Pro 5 (48 мм)."
  - question: "Чи показується годинник у реальному фізичному розмірі?"
    answer: "Так. Відкалібруйте монітор один раз за стандартною банківською карткою 85,60 мм ISO/IEC 7810 ID-1 (або задайте PPI монітора), і режим «1:1 Real size» покаже кожен годинник у точному міліметровому масштабі."
  - question: "Як працює перевірка AOD і вигоряння OLED (< 10% OPR)?"
    answer: "WearView у реальному часі обчислює частку активних пікселів On-Pixel Ratio (OPR) та зважену яскравість ITU-R BT.709 для кадру Always-On Display (AOD) і підсвічує проблемні ділянки на тепловій карті, допомагаючи дотриматися вимог енергоспоживання та захисту OLED."
  - question: "Чим допомагають шаблон пальця 14 мм і 2-секундний тест читання?"
    answer: "У відкаліброваному режимі 1:1 шаблон пальця діаметром 14 мм показує, яку площу крихітного екрана фізично закриває подушечка пальця під час натискання. Тест «2s Glance» на дві секунди показує інтерфейс як при піднятті зап'ястя, перевіряючи, чи встигає користувач зчитати головну інформацію."
  - question: "Чи завантажуються мої скриншоти кудись?"
    answer: "Ні. WearView — повністю клієнтський WebGL-застосунок без сервера й аналітики. Зображення та захоплення вікна обробляються виключно в оперативній пам'яті вашого браузера."
  - question: "WearView безкоштовний?"
    answer: "Так. Інструмент безкоштовний і відкритий під ліцензією MIT."
---

WearView — безкоштовна браузерна 3D-студія для розробників ігор і застосунків під Wear OS, дизайнерів циферблатів та Unity-авторів. Плаский квадратний скриншот на великому моніторі оманливий: дрібний текст здається чітким, кнопки біля країв — безпечними, а на піднесеному безелі під кутом не видно реального перекриття. На круглому екрані діаметром 30–38 мм на рухомому зап'ясті той самий кадр поводиться зовсім інакше.

WearView проєктує ваші скриншоти або живу трансляцію з Unity та емулятора на **21 фізично точну 3D-модель смарт-годинників Wear OS із 4 сімейств пристроїв**, доповнену інструментами ергономіки та OLED QA.

## Що можна робити

- **21 3D-модель Wear OS із 4 сімейств.** Миттєве перемикання між Google Pixel Watch (1/2/3/4), Samsung Galaxy Watch Modern Flat (Watch5/6/7), Classic/Pro/Ultra (Watch4 Classic, Watch5 Pro, Watch6 Classic, Watch8 Classic, Watch Ultra) та 46–48-мм моделями OnePlus, Xiaomi і Mobvoi.
- **Вставлення, перетягування, лайв-трансляція та автоматизація.** Ctrl+V із будь-яким скриншотом, перетягування файлів PNG/JPEG/WebP, живий стрім Unity Game view чи Android Studio Emulator і міст `postMessage` для зовнішніх скриптів.
- **Реальний фізичний розмір (1:1).** Одноразове калібрування банківською карткою 85,60 мм або повзунком PPI показує корпус, безель і пікселі в точному масштабі 1:1.
- **Безпечні зони 80% і 90%.** Кільця 80%, 90% і 100%, щоб перевірити читабельність тексту та впевнитися, що кнопки не зріже скло чи піднятий поворотний безель.
- **Пакет фізичної ергономіки та QA:**
  - **Зона пальця 14 мм (`👆 14mm Finger`)** у масштабі 1:1 — для перевірки реального розміру зон дотику й перекриття інтерфейсу пальцем.
  - **2-секундний тест погляду (`⏱ 2s Glance`)** — імітує швидке підняття зап'ястя та перевіряє миттєву зчитуваність UI.
  - **Перевірка AOD і вигоряння OLED (`☀️ AOD / OPR < 10%`)** — вимірює On-Pixel Ratio (OPR) та яскравість для режиму Always-On Display.
- **Нативні пікселі, пресети кутів камери та PNG-знімок.** Перевірка реальної матриці (`384×384` – `480×480`), швидкі ракурси `0°` (фронт), `35°` (нахил зап'ястя) та `75°` (край безеля), порівняння двох моделей поруч, освітлення (студія, сонце, ніч) і збереження PNG однією клавішею `[P]`.

## Підтримувані 21 модель годинників Wear OS (таблиця характеристик)

<div style="overflow-x: auto; max-width: 100%; -webkit-overflow-scrolling: touch; margin: 20px 0;">
<table style="width: 100%; border-collapse: collapse; font-size: 0.88rem; line-height: 1.45;">
<thead>
<tr>
<th style="border: 1px solid #303b4b; padding: 8px 10px; text-align: left;">Сімейство</th>
<th style="border: 1px solid #303b4b; padding: 8px 10px; text-align: left;">Модель</th>
<th style="border: 1px solid #303b4b; padding: 8px 10px; text-align: left;">Корпус (мм)</th>
<th style="border: 1px solid #303b4b; padding: 8px 10px; text-align: left;">Активний дисплей</th>
<th style="border: 1px solid #303b4b; padding: 8px 10px; text-align: left;">Роздільність</th>
<th style="border: 1px solid #303b4b; padding: 8px 10px; text-align: left;">Щільність</th>
<th style="border: 1px solid #303b4b; padding: 8px 10px; text-align: left;">Скло та безель</th>
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
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Опукле скло-галька (рамка 5.26 мм)</td>
</tr>
<tr>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Google Pixel Watch</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Google Pixel Watch 3 (41mm)</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">41.0 × 41.0 × 12.3 mm</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">32.20 mm (1.27")</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">408×408 px</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">320 PPI</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Опукле скло-галька (рамка 4.40 мм)</td>
</tr>
<tr>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Google Pixel Watch</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Google Pixel Watch 3 (45mm)</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">45.0 × 45.0 × 12.3 mm</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">35.56 mm (1.40")</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">456×456 px</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">326 PPI</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Опукле скло-галька (рамка 4.72 мм)</td>
</tr>
<tr>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Google Pixel Watch</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Google Pixel Watch 4 (41mm)</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">41.0 × 41.0 × 12.3 mm</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">33.02 mm (1.30" Actua 360)</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">416×416 px</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">320 PPI</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Опукле скло-галька (рамка 3.99 мм)</td>
</tr>
<tr>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Google Pixel Watch</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Google Pixel Watch 4 (45mm)</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">45.0 × 45.0 × 12.3 mm</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">36.20 mm (1.43" Actua 360)</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">456×456 px</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">320 PPI</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Опукле скло-галька (рамка 4.40 мм)</td>
</tr>
<tr>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Galaxy Modern Flat</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Samsung Galaxy Watch7 (40mm)</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">40.4 × 40.4 × 9.7 mm</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">33.27 mm (1.31")</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">432×432 px</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">330 PPI</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Плаский сапфір + алюмінієвий обідок</td>
</tr>
<tr>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Galaxy Modern Flat</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Samsung Galaxy Watch7 (44mm)</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">44.4 × 44.4 × 9.7 mm</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">37.34 mm (1.47")</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">480×480 px</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">327 PPI</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Плаский сапфір + алюмінієвий обідок</td>
</tr>
<tr>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Galaxy Modern Flat</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Samsung Galaxy Watch6 (40mm)</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">40.4 × 38.8 × 9.0 mm</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">33.27 mm (1.31")</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">432×432 px</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">330 PPI</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Плаский сапфір + алюмінієвий обідок</td>
</tr>
<tr>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Galaxy Modern Flat</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Samsung Galaxy Watch6 (44mm)</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">44.4 × 42.8 × 9.0 mm</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">37.34 mm (1.47")</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">480×480 px</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">327 PPI</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Плаский сапфір + алюмінієвий обідок</td>
</tr>
<tr>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Galaxy Modern Flat</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Samsung Galaxy Watch5 (40mm)</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">40.4 × 39.3 × 9.8 mm</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">30.23 mm (1.19")</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">396×396 px</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">330 PPI</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Плаский сапфір + широкий сенсорний безель</td>
</tr>
<tr>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Galaxy Modern Flat</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Samsung Galaxy Watch5 (44mm)</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">44.4 × 43.3 × 9.8 mm</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">34.60 mm (1.36")</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">450×450 px</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">330 PPI</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Плаский сапфір + сенсорний безель</td>
</tr>
<tr>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Galaxy Classic / Pro / Ultra</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Samsung Galaxy Watch8 Classic (46mm)</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">46.4 × 46.0 × 10.6 mm</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">34.04 mm (1.34")</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">438×438 px</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">327 PPI</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Корпус-подушка + 48-зубчастий безель</td>
</tr>
<tr>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Galaxy Classic / Pro / Ultra</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Samsung Galaxy Watch6 Classic (43mm)</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">42.5 × 42.5 × 10.9 mm</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">33.27 mm (1.31")</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">432×432 px</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">330 PPI</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Піднятий поворотний сталевий безель</td>
</tr>
<tr>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Galaxy Classic / Pro / Ultra</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Samsung Galaxy Watch6 Classic (47mm)</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">46.5 × 46.5 × 10.9 mm</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">37.34 mm (1.47")</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">480×480 px</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">327 PPI</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Піднятий поворотний сталевий безель</td>
</tr>
<tr>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Galaxy Classic / Pro / Ultra</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Samsung Galaxy Watch5 Pro (45mm)</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">45.4 × 45.4 × 10.5 mm</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">34.60 mm (1.36")</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">450×450 px</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">330 PPI</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Піднятий увігнутий титановий бортик</td>
</tr>
<tr>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Galaxy Classic / Pro / Ultra</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Samsung Galaxy Watch4 Classic (46mm)</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">45.5 × 45.5 × 11.0 mm</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">34.60 mm (1.36")</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">450×450 px</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">330 PPI</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Піднятий поворотний сталевий безель</td>
</tr>
<tr>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Galaxy Classic / Pro / Ultra</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Samsung Galaxy Watch Ultra (47mm)</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">47.4 × 47.4 × 12.1 mm</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">37.34 mm (1.47")</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">480×480 px</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">327 PPI</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Титанова подушка + піднятий безель</td>
</tr>
<tr>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">OnePlus, Xiaomi &amp; Mobvoi</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">OnePlus Watch 3 (46mm)</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">47.6 × 46.6 × 11.8 mm</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">38.10 mm (1.50")</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">466×466 px</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">310 PPI</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Асиметричний корпус + титановий безель</td>
</tr>
<tr>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">OnePlus, Xiaomi &amp; Mobvoi</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">OnePlus Watch 2 (46mm)</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">47.0 × 46.6 × 12.1 mm</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">36.32 mm (1.43")</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">466×466 px</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">326 PPI</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Асиметричний корпус + сапфір 2.5D</td>
</tr>
<tr>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">OnePlus, Xiaomi &amp; Mobvoi</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Xiaomi Watch 2 Pro (46mm)</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">47.6 × 45.9 × 11.8 mm</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">36.32 mm (1.43")</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">466×466 px</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">326 PPI</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Хронограф із гільйошованим безелем</td>
</tr>
<tr>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">OnePlus, Xiaomi &amp; Mobvoi</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Mobvoi TicWatch Pro 5 (48mm)</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">50.1 × 48.0 × 12.2 mm</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">36.32 mm (1.43")</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">466×466 px</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">326 PPI</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Рифлений тактильний безель</td>
</tr>
</tbody>
</table>
</div>

## Інженерні матеріали по темі

- [Чому я перестав вірити скриншотам своїх ігор для Wear OS](/uk/blog/stop-trusting-wear-os-screenshots/) — чому плаский монітор вводить в оману та як живий стрім із Unity прискорює ітерації.
- [Безпечні зони Wear OS, зони дотику 14 мм та OLED AOD &lt;10% OPR: практичний гайд із WearView](/uk/blog/wearos-safe-zones-aod-opr-ergonomics/) — правила кругової обрізки, перевірка ергономіки пальця й бюджет яскравості Always-On Display.

## Для кого

Для розробників ігор і застосунків під Wear OS, дизайнерів циферблатів, UI-дизайнерів та QA-тестувальників, яким потрібен швидкий і чесний огляд інтерфейсу до збірки на реальний пристрій. Інструмент не замінює фінального тесту на залізі, але виявляє проблеми верстки, безелів та AOD ще на етапі дизайну.

## Приватність

Усе працює локально у браузері. Немає акаунтів, завантажень на сервер, трекерів чи бекенду.
