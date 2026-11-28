---
layout: "post"
title: "Bezpieczne strefy Wear OS, pola dotykowe 14 mm i AOD <10% OPR: praktyczny poradnik ergonomii z WearView"
seo_title: "Bezpieczne strefy Wear OS, pola dotykowe i AOD: poradnik WearView"
description: "Uniknij uciętych rogów, zasłaniania przez pierścień, ciasnych pól dotykowych 14 mm i AOD powyżej 10% OPR na Wear OS, sprawdzając ekran w 3D w WearView."
date: "2026-11-15T12:00:00.000Z"
last_modified_at: "2026-11-15T12:00:00.000Z"
lang: "pl"
page_id: "wearos-safe-zones-aod-opr-ergonomics"
permalink: "/blog/wearos-safe-zones-aod-opr-ergonomics/"
tags: ["Tools", "Wear OS", "Game Design"]
author: "ihor"
seo_type: "BlogPosting"
image: "/assets/images/tools/wearview-safe-zones.webp"
image_alt: "Wzorzec QA WearView z okrągłymi pierścieniami bezpiecznych stref 80% i 90% dla Wear OS"
focus_keyword: "Wear OS safe zones AOD OPR"
archive_note: false
sitemap: true
published: true
fmContentType: "Post"
---

Projektowanie na okrągły smartwatch w desktopowym IDE albo w ramce Figmy prosi się o cztery przewidywalne błędy: uciętą typografię przy krawędziach, przyciski schowane za podniesionym pierścieniem pod kątem, pola dotykowe mniejsze od opuszka palca dorosłego człowieka oraz ekrany Always-On Display (AOD) przekraczające budżet pikseli chroniący OLED przed wypaleniem.

Każdy z tych problemów staje się natychmiast widoczny, gdy obejrzysz swój interfejs w **prawdziwej skali fizycznej 1:1 na realistycznym sprzęcie 3D** w [WearView](https://wristandpocket.dev/wearview/). Poniżej znajduje się lista kontrolna, którą przechodzimy przed każdym zbudowaniem APK na zegarek.

## 1. Dlaczego płaskie kwadratowe podglądy zawodzą na okrągłych zegarkach

Koło wpisane w kwadrat traci **`21.5%`** (`1 - pi/4`) całego obszaru pikseli jeszcze zanim w ogóle pojawi się ramka koperty. Co ważniejsze, sprzęt z Wear OS dzieli się na diametralnie różne konstrukcje szkła i bezela:

- **Wypukłe szkło typu pebble** (Google Pixel Watch 1–4): ciągłe szkło 3D płynnie przechodzi w krawędź koperty, łapiąc przy obrzeżu odbicia światła otoczenia.
- **Płaski szafir z dotykowym pierścieniem** (Samsung Galaxy Watch5 / Watch6 / Watch7): bardzo cienkie aktywne ramki (`1.19"` `396×396` w Watch5 40mm aż do `1.47"` `480×480` w Watch7 44mm) zostawiają zupełnie inne marginesy dla okrągłych list.
- **Podniesiony obrotowy pierścień i koperty cushion** (Galaxy Watch4/6/8 Classic, Watch5 Pro, Watch Ultra): fizyczne metalowe ścianki wystają od `1.35 mm` do `1.45 mm` **ponad** zagłębioną taflę wyświetlacza.

Gdy użytkownik zerka na nadgarstek naturalnie — pod kątem około `35°`, a nie idealnie na wprost pod `0°` — ta podniesiona ścianka pierścienia fizycznie zasłania zewnętrzny brzeg panelu OLED. Sprawdzanie układu wyłącznie w płaskim widoku `0°` ukrywa ucięcia krawędzi, które właściciele zegarków widzą od razu.

## 2. Zasada bezpiecznej strefy tekstu 80% kontra strefy akcji 90%

W [WearView](https://wristandpocket.dev/wearview/) włącz okrągłe pierścienie Safe Zone na wklejonym zrzucie ekranu lub strumieniu na żywo z Unity czy emulatora:

### Wewnętrzny pierścień 80% — typografia, wyniki i dane
Nagłówki, teksty statusu, liczniki i krytyczną telemetrię HUD trzymaj wewnątrz wewnętrznego okręgu **`80%`** średnicy. Na ekranie `450×450` daje to około `45 px` odstępu od okrągłej krawędzi z każdej strony — wystarczająco dużo zapasu, by załamanie światła na wypukłym szkle i krawędź pierścienia nigdy nie ścinały znaków.

### Zewnętrzny pierścień 90% — elementy interaktywne i łuki
Okrągłe paski postępu, wskaźniki przewijania koronką i drugorzędne przyciski ikonowe mogą bezpiecznie sięgać do **`90%`**, o ile przełączysz WearView na preset kamery **`35° Wrist Tilt`** (i sprawdzisz modele z głębszą krawędzią, jak Galaxy Watch6 Classic 47mm czy Galaxy Watch8 Classic 46mm). Wszystko między `90%` a `100%` należy wyłącznie do subtelnych winiet, poświat albo podziałek brzegowych.

## 3. Kalibracja skali 1:1 i test opuszka palca 14 mm

Materialowy cel dotykowy `48 px` na ekranie `1.20"` (`30.48 mm`) w Pixel Watch 41mm ma zaledwie około `3.8 mm` szerokości, podczas gdy naturalny styk opuszka dorosłego palca ma mniej więcej **`14 mm` szerokości** — prawie **połowę szerokości całego ekranu**!

1. Otwórz kalibrację w WearView i przyłóż standardową kartę płatniczą ISO/IEC 7810 ID-1 (szerokość `85.60 mm`) do monitora (albo wpisz dokładne PPI ekranu).
2. Włącz **Real Size (1:1)**, aby zegarek 3D odpowiadał prawdziwym milimetrom.
3. Włącz **`14mm Finger`** i przesuwaj półprzezroczysty okrąg dotyku nad swoimi przyciskami.

Jeśli dwie akcje interaktywne nakładają się w jednym okręgu `14 mm` albo dotknięcie przycisku zasłania etykietę, którą wywołuje, rozsuń elementy albo oprzyj nawigację na koronce i pierścieniu.

## 4. Test czytelności w 2 sekundy uniesienia nadgarstka

Sesje na smartwatchu to mikrointerakcje: gracze i użytkownicy aplikacji podnoszą rękę na krótkie spojrzenie podczas chodzenia albo rozmowy. Tryb **`2s Glance`** w WearView wyświetla ekran przez dwie sekundy, po czym znów go zasłania.

Zadaj sobie po tych dwóch sekundach trzy pytania:
- Czy potrafisz odczytać **jedną główną liczbę lub stan** bez mrużenia oczu?
- Czy **główny przycisk akcji** wyróżnił się natychmiast?
- Czy z odległości wyciągniętej ręki w skalibrowanym rozmiarze `1:1` i oświetleniu **`Sunlight`** drugorzędny szary tekst nadal utrzymuje kontrast?

Jeśli potrzebujesz więcej niż dwóch sekund, by zrozumieć ekran, usuń zbędne etykiety i wzmocnij hierarchię typografii.

## 5. Spełnienie limitu OLED AOD &lt;10% On-Pixel Ratio (OPR) i budżetu luminancji

Google Play oraz format Wear OS Watch Face Format ograniczają ekrany Always-On Display (AOD), aby chronić diody OLED przed powidokiem i nadmiernym zużyciem baterii — najczęściej utrzymując **On-Pixel Ratio (OPR)** poniżej **`10%`** i unikając dużych, jasnych bloków czystej bieli.

Inspektor diagnostyczny **`AOD / OPR`** w WearView oblicza luminancję percepcyjną piksel po pikselu z użyciem współczynników **ITU-R BT.709** i mierzy jednocześnie:
- **procent OPR** w aktywnym okrągłym obszarze wyświetlacza (oznaczając klatki osiągające lub przekraczające `10%`), oraz
- **mapę cieplną gorących punktów**, wskazującą jasne obrysy, wypełnione plakietki czy antyaliasowane poświaty, które po cichu podbijają pobór mocy.

Zamiana wypełnionych ikon na cienkie obrysy, zmiana czysto białego tekstu ambient (`#FFFFFF`) na stonowaną szarość i ukrycie gradientów tła zazwyczaj obniża OPR trybu ambient z `18–25%` poniżej **`6–8%`** już w pierwszym podejściu.

## Lista kontrolna przed każdym wdrożeniem na sprzęt

- Przełączaj się między najmniejszym (`30.23 mm` Galaxy Watch5 40mm / `30.48 mm` Pixel Watch 1/2 41mm) a największym (`38.10 mm` OnePlus Watch 3 46mm / `37.34 mm` Galaxy Watch7 44mm) zegarkiem spośród wszystkich **21 obsługiwanych modeli** w [WearView](https://wristandpocket.dev/wearview/).
- Zweryfikuj bezpieczne strefy tekstu `80%` i akcji `90%` w widokach **`35°` Wrist Tilt** oraz **`75°` Bezel Side**.
- Potwierdź odstępy dotykowe w skali `1:1` nakładką **`14mm Finger`** oraz czytelność w **`2s Glance`**.
- Sprawdź, czy zrzuty Always-On / Ambient mieszczą się poniżej **`10%` OPR**.

Zobacz pełną tabelę specyfikacji 21 urządzeń i FAQ na [stronie narzędzia WearView](/pl/tools/wearview/) albo przeczytaj, jak strumieniowanie na żywo z Unity i emulatora wpisuje się w nasz codzienny proces w artykule [Dlaczego przestałem ufać zrzutom ekranu moich gier na Wear OS](/pl/blog/stop-trusting-wear-os-screenshots/).
