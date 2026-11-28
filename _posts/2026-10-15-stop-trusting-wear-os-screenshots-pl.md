---
layout: "post"
title: "Dlaczego przestałem ufać zrzutom ekranu moich gier na Wear OS"
description: "Zrzut ekranu z monitora nie pokazuje gry na zegarek tak, jak widzi ją gracz. Dlaczego stworzyłem WearView — darmowe narzędzie pokazujące ekran na zegarku 3D w realnym rozmiarze."
date: "2026-10-15T12:00:00.000Z"
last_modified_at: "2026-11-15T12:00:00.000Z"
lang: "pl"
page_id: "stop-trusting-wear-os-screenshots"
permalink: "/blog/stop-trusting-wear-os-screenshots/"
tags: ["Tools", "Wear OS", "Game Design"]
author: "ihor"
seo_type: "BlogPosting"
image: "/assets/images/tools/wearview-og.webp"
image_alt: "WearView: ekran gry na Wear OS wyświetlony na modelu zegarka 3D"
focus_keyword: "Wear OS screen preview"
archive_note: false
sitemap: true
published: true
fmContentType: "Post"
---

Kiedy robisz grę na zegarek, prawie nigdy nie oglądasz jej na zegarku. Patrzysz na nią w Unity, na dużym monitorze, gdzie okrągły ekran rozciąga się na pół okna. I tam wszystko wygląda świetnie: tekst jest czytelny, przyciski ogromne, a krawędzie daleko.

Potem budujesz wersję na zegarek i myślisz: kto to w ogóle zrobił? Tekst jest mikroskopijny. Pierścień zjadł przycisk przy krawędzi. To, co wyglądało schludnie na monitorze, na nadgarstku zamienia się w papkę.

Zdarzało mi się to nie raz podczas pracy nad naszymi grami. Budowanie na zegarek przy każdej drobnej zmianie jest wolne i nudne. Zrobiłem więc sobie małe narzędzie, które pokazuje ekran na modelu prawdziwego zegarka. Nazwałem je WearView. Pomaga mi na co dzień, więc udostępniam je za darmo — może przyda się też Tobie.

## Co jest nie tak z takim zrzutem ekranu

Jest kwadratowy, płaski i nie ma pojęcia, na jakim zegarku zostanie wyświetlony.

Na monitorze nie widać, że ekran Galaxy Watch7 44 mm ma około 37 mm średnicy, podczas gdy pierwszy Pixel Watch ma około 30 mm. Nie widać, że jedne zegarki mają szkło niemal do samej krawędzi, a inne grubą czarną ramkę. I nie widać, że Twoja piękna klatka 1024×1024 staje się na zegarku obrazem 480×480, na którym cienkie linie po prostu znikają.

## Jak to działa

Otwierasz stronę w przeglądarce i gotowe. Nic nie trzeba instalować, bez rejestracji, a Twoje zrzuty ekranu nigdzie nie są wysyłane.

Wybierasz zegarek (obecnie dostępnych jest **21 dokładnych modeli 3D z 4 rodzin urządzeń**: Google Pixel Watch 1–4, Samsung Galaxy Watch 4 Classic aż po Watch8 Classic & Ultra, OnePlus Watch 2/3, Xiaomi Watch 2 Pro oraz Mobvoi TicWatch Pro 5), wklejasz obraz przez Ctrl+V albo przeciągasz plik, a ten ląduje na ekranie modelu 3D. Możesz obracać zegarek, przełączać presety `0°` Front, `35°` Tilt i `75°` Bezel, założyć go na nadgarstek albo obejrzeć w „świetle słonecznym” czy w „nocy”.

## Tryb na żywo to moja ulubiona funkcja

Zrzuty ekranu są w porządku, ale naprawdę wygodne jest co innego: możesz po prostu strumieniować swoją grę prosto na zegarek.

Klikasz „Capture window (live)”, wybierasz okno — widok Unity Game albo emulator w Android Studio — i tyle. Zegarek w przeglądarce pokazuje Twoją grę na żywo, klatka po klatce. Grasz w edytorze, a tuż obok widzisz, jak to wygląda na prawdziwej kopercie, z pierścieniem i w rzeczywistym rozmiarze.

Zmieniasz rozmiar czcionki, przesuwasz przycisk, poprawiasz kolor tła — i natychmiast widzisz efekt na nadgarstku. Bez budowania, bez kabla, bez czekania. Dla mnie zmieniło to sam proces pracy: już nie zgaduję, tylko patrzę.

## Z czego faktycznie korzystam

**Rzeczywisty rozmiar.** Przykładasz kartę płatniczą do ekranu, dopasowujesz ramkę i od tego momentu zegarek na monitorze ma dokładnie taki rozmiar jak w rzeczywistości. Odsuwasz się na długość ręki i szczerze pytasz siebie: czy umiem to przeczytać? Jeśli nie, gracz też nie da rady.

**Bezpieczne strefy.** Pierścienie przy krawędzi ekranu. Wszystko, co ważne — wynik, przyciski, tekst — powinno zostać w środku. Przy samej krawędzi okrągłego ekranu jest mało miejsca, a gdy patrzysz pod kątem, pierścień zasłania jeszcze więcej.

**Natywne piksele.** Pokazują klatkę w prawdziwej rozdzielczości zegarka. Od razu widzisz, co zostaje z drobnego tekstu albo pixel artu.

**Dwa zegarki obok siebie.** Stawiam małego Pixel Watcha obok dużego Galaxy Watcha. To, co wydaje się przestronne na dużym ekranie, na małym często robi się ciasne — i widać to w sekundę.

**Sprawdzanie ergonomii fizycznej i AOD.** W skalibrowanym trybie 1:1 **nakładka palca 14 mm** pokazuje, jak dużą część małego przycisku UI zasłania opuszek ludzkiego palca; **test 2-sekundowego spojrzenia** sprawdza, czy kluczowy tekst HUD da się odczytać jednym uniesieniem nadgarstka; a **mapa cieplna AOD / OPR &lt; 10%** wyłapuje klatki Always-On Display spalające zbyt wiele pikseli OLED. Pełne omówienie znajdziesz w naszym poradniku: [Bezpieczne strefy Wear OS, pola dotykowe 14 mm i AOD &lt;10% OPR](/pl/blog/wearos-safe-zones-aod-opr-ergonomics/).

## Uczciwie o ograniczeniach

To nie jest emulator. Nie uruchamia Twojego pliku APK, nie mierzy FPS i nie zastępuje testów na prawdziwym zegarku. Po prostu wyłapuje oczywiste problemy wcześniej — zanim zmarnujesz czas na budowanie wersji. Nadal sprawdzam gry na sprzęcie, tylko bez niespodzianek w stylu „ups, tekst się nie mieści”.

## Wypróbuj

WearView jest darmowy i ma otwarty kod źródłowy.

- Otwórz narzędzie: [wristandpocket.dev/wearview](https://wristandpocket.dev/wearview/)
- Więcej szczegółów i FAQ: [strona WearView](/pl/tools/wearview/)
- Kod: [GitHub](https://github.com/wristandpocket/wearview)

Jeśli brakuje Twojego zegarka, daj znać na GitHubie albo na [Discordzie](https://discord.gg/6vzt33SX9D). Dodaję wyłącznie modele o potwierdzonych wymiarach, więc link do oficjalnej specyfikacji bardzo pomaga.

## To dopiero początek

WearView powstał z moich własnych potrzeb, a lista pomysłów „fajnie by było, gdyby…” już jest długa. Część z nich jest właśnie w przygotowaniu i jeszcze bardziej ułatwi sprawdzanie gier na zegarki. Na razie nie odkrywam kart — obserwujcie aktualizacje.
