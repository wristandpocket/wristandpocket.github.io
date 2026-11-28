---
layout: tool
lang: pl
page_id: "tool-wearview"
permalink: /tools/wearview/
title: "WearView: podgląd ekranu Wear OS"
badge: "Darmowe narzędzie deweloperskie"
description: "Podglądaj zrzuty ekranu Wear OS i żywe okna Unity na 21 modelach zegarków 3D w skali 1:1 ze strefami bezpieczeństwa, polem dotyku i testem wypalania AOD. Za darmo."
banner: "/assets/images/tools/wearview-hero.webp"
banner_alt: "WearView prezentujący ekran gry Wear OS na modelu 3D Samsung Galaxy Watch7"
image: "/assets/images/tools/wearview-og.webp"
app_url: "/wearview/"
source_url: "https://github.com/wristandpocket/wearview"
cta: "Otwórz WearView"
source_cta: "Kod na GitHubie"
cta_note: "Bez rejestracji, bez wysyłania plików: zrzuty ekranu i obraz na żywo zostają w Twojej przeglądarce."
gallery_title: "Jak to wygląda"
screenshots:
  - src: "/assets/images/tools/wearview-compare.webp"
    alt: "Tryb porównania: ten sam ekran na Galaxy Watch7 44 mm i Pixel Watch 41 mm"
  - src: "/assets/images/tools/wearview-safe-zones.webp"
    alt: "Wzór testowy QA z okrągłymi strefami bezpieczeństwa Wear OS na okrągłym ekranie"
  - src: "/assets/images/tools/wearview-wrist.webp"
    alt: "Widok na nadgarstku: zegarek na modelu przedramienia dla oceny skali"
faq:
  - question: "Jak podejrzeć ekran Wear OS bez fizycznego zegarka?"
    answer: "Otwórz WearView, wybierz dowolny z 21 modeli zegarków i wklej zrzut ekranu skrótem Ctrl+V (lub upuść plik PNG, JPEG albo WebP). Obraz mapuje się na okrągły wyświetlacz fizycznie zwymiarowanego modelu 3D, dzięki czemu sprawdzisz czytelność, ramki i przycinanie krawędzi przed wdrożeniem na sprzęt."
  - question: "Czy mogę zobaczyć widok Unity Game na zegarku w czasie rzeczywistym?"
    answer: "Tak. Kliknij „Capture window (live)” i udostępnij okno Unity Game view lub emulatora Wear OS z Android Studio. WearView przenosi obraz na ekran zegarka klatka po klatce, a przycinanie i nakładki stref bezpieczeństwa działają również na żywo."
  - question: "Jakie 21 zegarków znajduje się w narzędziu?"
    answer: "21 modeli w 4 rodzinach urządzeń: Google Pixel Watch 1/2 (41 mm), Pixel Watch 3 (41 i 45 mm), Pixel Watch 4 (41 i 45 mm), Samsung Galaxy Watch5 (40 i 44 mm), Watch6 (40 i 44 mm), Watch7 (40 i 44 mm), Watch4 Classic (46 mm), Watch5 Pro (45 mm), Watch6 Classic (43 i 47 mm), Watch8 Classic (46 mm), Watch Ultra (47 mm), OnePlus Watch 2 (46 mm), OnePlus Watch 3 (46 mm), Xiaomi Watch 2 Pro (46 mm) oraz Mobvoi TicWatch Pro 5 (48 mm)."
  - question: "Czy zegarek jest wyświetlany w rzeczywistym rozmiarze fizycznym?"
    answer: "Tak. Wystarczy raz skalibrować widok, dopasowując ramkę na ekranie do standardowej karty płatniczej 85,60 mm ISO/IEC 7810 ID-1 (lub ustawić PPI monitora), a tryb 1:1 Real size wyświetli każdy smartwatch w prawdziwej skali milimetrowej."
  - question: "Jak działa sprawdzanie AOD i wypalania OLED (< 10% OPR)?"
    answer: "WearView oblicza w czasie rzeczywistym współczynnik On-Pixel Ratio (OPR) oraz ważoną luminancję ITU-R BT.709 klatki Ambient / Always-On Display i podświetla na diagnostycznej mapie cieplnej piksele przekraczające bezpieczny próg wypalania, pomagając spełnić limity zużycia energii Google Play i Watch Face Format."
  - question: "W jaki sposób nakładka palca 14 mm i test 2-sekundowego spojrzenia pomagają projektować UI na Wear OS?"
    answer: "W skalibrowanym trybie 1:1 nakładka 14mm Finger Contact Pad pokazuje, jaką część małej tarczy fizycznie zakrywa opuszek palca dorosłej osoby przy dotknięciu elementu. Test 2-Second Glanceability na chwilę błyska interfejsem jak przy podniesieniu nadgarstka, sprawdzając, czy użytkownik odczyta kluczowe dane w 2 sekundy."
  - question: "Czy moje zrzuty ekranu są gdziekolwiek wysyłane?"
    answer: "Nie. WearView to statyczna aplikacja WebGL działająca po stronie klienta, bez backendu i bez telemetrii. Obrazy i przechwytywanie okien na żywo pozostają wyłącznie w pamięci Twojej przeglądarki."
  - question: "Czy WearView jest darmowy?"
    answer: "Tak. WearView jest darmowy i udostępniany na licencji open source MIT."
---

WearView to darmowe studio inspekcji 3D działające w przeglądarce, stworzone dla deweloperów Wear OS, projektantów tarcz zegarków i twórców Unity. Płaski, kwadratowy zrzut ekranu na monitorze zakłamuje rzeczywistość: drobna typografia wygląda ostro, przyciski przy krawędzi wydają się bezpieczne, a płaskie ramki nie rzucają cienia na szkło. Na okrągłym zegarku o średnicy 30–38 mm na poruszającym się nadgarstku ta sama klatka zachowuje się zupełnie inaczej.

WearView wyświetla Twoje zrzuty ekranu lub żywe okna emulatora/Unity na **21 fizycznie zwymiarowanych smartwatchach 3D z Wear OS w 4 rodzinach sprzętowych**, wraz z narzędziami QA do ergonomii i poboru mocy OLED.

## Co możesz zrobić

- **21 smartwatchy 3D z Wear OS w 4 rodzinach.** Błyskawiczne przełączanie między Google Pixel Watch (1/2/3/4), Samsung Galaxy Watch Modern Flat (Watch5/6/7), Classic/Pro/Ultra (Watch4 Classic, Watch5 Pro, Watch6 Classic, Watch8 Classic, Watch Ultra) oraz flagowymi okrągłymi modelami 46–48 mm marek OnePlus, Xiaomi i Mobvoi.
- **Wklej, upuść lub przechwytuj na żywo.** Naciśnij `Ctrl+V` z dowolnym zrzutem ekranu, przeciągnij i upuść pliki PNG/JPEG/WebP na scenę, strumieniuj widok Unity Game lub emulator Android Studio na żywo albo podłącz automatyczne pipeline'y przez mostek `postMessage`.
- **Skala fizyczna 1:1 (kalibracja kartą płatniczą).** Dopasuj jednorazowo wzorzec na ekranie do standardowej karty 85,60 mm (lub ustaw PPI monitora), aby zobaczyć każdą ramkę i zagęszczenie pikseli w rzeczywistym rozmiarze milimetrowym.
- **Strefy bezpieczeństwa: 80% dla tekstu i 90% dla akcji.** Przełączaj okrągłe pierścienie 80%, 90% i 100%, aby wyłapać przycięte etykiety przy krawędzi oraz zasłonięcie przez wklęsły obrotowy bezel przed publikacją.
- **Pakiet QA ergonomii fizycznej:**
  - **Nakładka palca 14 mm (`👆 14mm Finger`)** w skalibrowanym trybie 1:1 do sprawdzania realnych celów dotykowych i zasłaniania przez kciuk.
  - **Test 2-sekundowego spojrzenia (`⏱ 2s Glance`)** symulujący szybkie uniesienie nadgarstka, aby zweryfikować hierarchię i czytelność pod presją czasu.
  - **Kontrola AOD i wypalania OLED (`☀️ AOD / OPR < 10%`)** obliczająca On-Pixel Ratio (OPR) i mapy cieplne luminancji pod kątem wymogów Always-On Display.
- **Natywna siatka pikseli, kąty kamery i zrzuty.** Sprawdzaj dokładne natywne piksele panelu (`384×384` do `480×480`), przełączaj presety `0°` przód, `35°` pochylenie nadgarstka i `75°` skrajny bok bezela, zestawiaj dwa zegarki obok siebie ze zsynchronizowaną kamerą, testuj oświetlenie studyjne/słoneczne/nocne i eksportuj przezroczysty PNG klawiszem `[P]`.

## Obsługiwane 21 smartwatchy Wear OS (tabela sprzętowa)

<div style="overflow-x: auto; max-width: 100%; -webkit-overflow-scrolling: touch; margin: 20px 0;">
<table style="width: 100%; border-collapse: collapse; font-size: 0.88rem; line-height: 1.45;">
<thead>
<tr>
<th style="border: 1px solid #303b4b; padding: 8px 10px; text-align: left;">Rodzina</th>
<th style="border: 1px solid #303b4b; padding: 8px 10px; text-align: left;">Model zegarka</th>
<th style="border: 1px solid #303b4b; padding: 8px 10px; text-align: left;">Koperta (mm)</th>
<th style="border: 1px solid #303b4b; padding: 8px 10px; text-align: left;">Aktywny ekran</th>
<th style="border: 1px solid #303b4b; padding: 8px 10px; text-align: left;">Rozdzielczość</th>
<th style="border: 1px solid #303b4b; padding: 8px 10px; text-align: left;">Gęstość</th>
<th style="border: 1px solid #303b4b; padding: 8px 10px; text-align: left;">Szkło i geometria bezela</th>
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
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Domed Pebble Glass (5.26 mm bezel)</td>
</tr>
<tr>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Google Pixel Watch</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Google Pixel Watch 3 (41mm)</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">41.0 × 41.0 × 12.3 mm</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">32.20 mm (1.27")</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">408×408 px</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">320 PPI</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Domed Pebble Glass (4.40 mm bezel)</td>
</tr>
<tr>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Google Pixel Watch</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Google Pixel Watch 3 (45mm)</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">45.0 × 45.0 × 12.3 mm</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">35.56 mm (1.40")</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">456×456 px</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">326 PPI</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Domed Pebble Glass (4.72 mm bezel)</td>
</tr>
<tr>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Google Pixel Watch</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Google Pixel Watch 4 (41mm)</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">41.0 × 41.0 × 12.3 mm</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">33.02 mm (1.30" Actua 360)</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">416×416 px</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">320 PPI</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Domed Pebble Glass (3.99 mm bezel)</td>
</tr>
<tr>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Google Pixel Watch</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Google Pixel Watch 4 (45mm)</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">45.0 × 45.0 × 12.3 mm</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">36.20 mm (1.43" Actua 360)</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">456×456 px</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">320 PPI</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Domed Pebble Glass (4.40 mm bezel)</td>
</tr>
<tr>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Galaxy Modern Flat</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Samsung Galaxy Watch7 (40mm)</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">40.4 × 40.4 × 9.7 mm</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">33.27 mm (1.31")</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">432×432 px</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">330 PPI</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Flat Sapphire + Armor Aluminum Rim</td>
</tr>
<tr>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Galaxy Modern Flat</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Samsung Galaxy Watch7 (44mm)</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">44.4 × 44.4 × 9.7 mm</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">37.34 mm (1.47")</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">480×480 px</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">327 PPI</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Flat Sapphire + Armor Aluminum Rim</td>
</tr>
<tr>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Galaxy Modern Flat</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Samsung Galaxy Watch6 (40mm)</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">40.4 × 38.8 × 9.0 mm</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">33.27 mm (1.31")</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">432×432 px</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">330 PPI</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Flat Sapphire + Armor Aluminum Rim</td>
</tr>
<tr>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Galaxy Modern Flat</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Samsung Galaxy Watch6 (44mm)</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">44.4 × 42.8 × 9.0 mm</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">37.34 mm (1.47")</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">480×480 px</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">327 PPI</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Flat Sapphire + Armor Aluminum Rim</td>
</tr>
<tr>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Galaxy Modern Flat</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Samsung Galaxy Watch5 (40mm)</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">40.4 × 39.3 × 9.8 mm</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">30.23 mm (1.19")</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">396×396 px</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">330 PPI</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Flat Sapphire + Wide Touch Bezel</td>
</tr>
<tr>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Galaxy Modern Flat</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Samsung Galaxy Watch5 (44mm)</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">44.4 × 43.3 × 9.8 mm</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">34.60 mm (1.36")</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">450×450 px</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">330 PPI</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Flat Sapphire + Touch Bezel</td>
</tr>
<tr>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Galaxy Classic / Pro / Ultra</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Samsung Galaxy Watch8 Classic (46mm)</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">46.4 × 46.0 × 10.6 mm</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">34.04 mm (1.34")</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">438×438 px</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">327 PPI</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Cushion Squircle + 48-Tooth Rotating Bezel</td>
</tr>
<tr>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Galaxy Classic / Pro / Ultra</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Samsung Galaxy Watch6 Classic (43mm)</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">42.5 × 42.5 × 10.9 mm</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">33.27 mm (1.31")</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">432×432 px</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">330 PPI</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Raised 48-Tooth Rotating Steel Bezel</td>
</tr>
<tr>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Galaxy Classic / Pro / Ultra</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Samsung Galaxy Watch6 Classic (47mm)</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">46.5 × 46.5 × 10.9 mm</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">37.34 mm (1.47")</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">480×480 px</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">327 PPI</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Raised 48-Tooth Rotating Steel Bezel</td>
</tr>
<tr>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Galaxy Classic / Pro / Ultra</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Samsung Galaxy Watch5 Pro (45mm)</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">45.4 × 45.4 × 10.5 mm</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">34.60 mm (1.36")</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">450×450 px</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">330 PPI</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Raised Concave Grade 4 Titanium Lip</td>
</tr>
<tr>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Galaxy Classic / Pro / Ultra</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Samsung Galaxy Watch4 Classic (46mm)</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">45.5 × 45.5 × 11.0 mm</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">34.60 mm (1.36")</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">450×450 px</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">330 PPI</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Raised Rotating Steel Bezel</td>
</tr>
<tr>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Galaxy Classic / Pro / Ultra</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Samsung Galaxy Watch Ultra (47mm)</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">47.4 × 47.4 × 12.1 mm</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">37.34 mm (1.47")</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">480×480 px</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">327 PPI</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Cushion Squircle Titanium + Raised Bezel</td>
</tr>
<tr>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">OnePlus, Xiaomi &amp; Mobvoi</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">OnePlus Watch 3 (46mm)</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">47.6 × 46.6 × 11.8 mm</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">38.10 mm (1.50")</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">466×466 px</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">310 PPI</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Asymmetric Chrono + Titanium Bezel</td>
</tr>
<tr>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">OnePlus, Xiaomi &amp; Mobvoi</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">OnePlus Watch 2 (46mm)</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">47.0 × 46.6 × 12.1 mm</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">36.32 mm (1.43")</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">466×466 px</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">326 PPI</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Asymmetric Chrono + 2.5D Sapphire</td>
</tr>
<tr>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">OnePlus, Xiaomi &amp; Mobvoi</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Xiaomi Watch 2 Pro (46mm)</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">47.6 × 45.9 × 11.8 mm</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">36.32 mm (1.43")</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">466×466 px</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">326 PPI</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">72-Notch Parisian Hobnail Bezel</td>
</tr>
<tr>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">OnePlus, Xiaomi &amp; Mobvoi</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Mobvoi TicWatch Pro 5 (48mm)</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">50.1 × 48.0 × 12.2 mm</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">36.32 mm (1.43")</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">466×466 px</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">326 PPI</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Rugged Tactical Knurled Bezel</td>
</tr>
</tbody>
</table>
</div>

## Powiązane poradniki techniczne

- [Why I stopped trusting screenshots of my Wear OS games](/pl/blog/stop-trusting-wear-os-screenshots/) — dlaczego płaski podgląd na monitorze myli twórców i jak przechwytywanie na żywo z Unity lub emulatora przyspiesza iteracje.
- [Wear OS Safe Zones, 14mm Touch Targets &amp; AOD &lt;10% OPR: A Practical Ergonomics Guide with WearView](/pl/blog/wearos-safe-zones-aod-opr-ergonomics/) — praktyczne zasady dotyczące przycinania na okrągłym ekranie, zasłaniania palcem, czytelności i budżetu wypalania Always-On Display.

## Dla kogo

Dla twórców gier i aplikacji na Wear OS, projektantów tarcz zegarków, zespołów UI/UX oraz testerów QA, którzy chcą uzyskać szybki i rzetelny podgląd ergonomii przed wdrożeniem kompilacji na sprzęt. Nie zastępuje to testów na fizycznym smartwatchu, ale pozwala wyłapać błędy układu, bezela i AOD jeszcze przed pierwszym wdrożeniem APK.

## Prywatność

Wszystko działa lokalnie w Twojej przeglądarce. Nie ma konta, wysyłania plików na serwer, skryptów śledzących ani backendu.
