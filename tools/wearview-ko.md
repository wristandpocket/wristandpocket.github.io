---
layout: tool
lang: ko
page_id: "tool-wearview"
permalink: /tools/wearview/
title: "WearView: Wear OS 화면 미리보기"
badge: "무료 개발자 도구"
description: "Wear OS 스크린샷과 Unity 실시간 화면을 21개 3D 워치 모델에 1:1 크기로 확인하세요. 세이프 존, 터치 영역, AOD 검사를 지원하며 무료입니다."
banner: "/assets/images/tools/wearview-hero.webp"
banner_alt: "3D Samsung Galaxy Watch7에 Wear OS 게임 화면을 표시한 WearView"
image: "/assets/images/tools/wearview-og.webp"
app_url: "/wearview/"
source_url: "https://github.com/wristandpocket/wearview"
cta: "WearView 열기"
source_cta: "GitHub 소스"
cta_note: "가입도 업로드도 없습니다. 스크린샷과 실시간 캡처는 브라우저 밖으로 나가지 않습니다."
gallery_title: "미리보기"
screenshots:
  - src: "/assets/images/tools/wearview-compare.webp"
    alt: "비교 모드: Galaxy Watch7 44mm와 Pixel Watch 41mm에 같은 화면 표시"
  - src: "/assets/images/tools/wearview-safe-zones.webp"
    alt: "원형 디스플레이에 Wear OS 세이프 존 링을 표시한 QA 패턴"
  - src: "/assets/images/tools/wearview-wrist.webp"
    alt: "손목 착용 보기: 크기 비교를 위한 팔 모델 위의 워치"
faq:
  - question: "실제 워치 없이 Wear OS 화면을 미리 볼 수 있나요?"
    answer: "WearView를 열고 21개 워치 모델 중 하나를 고른 뒤 Ctrl+V로 스크린샷을 붙여넣거나 PNG, JPEG, WebP 파일을 끌어다 놓으세요. 실제 크기의 정확한 3D 원형 디스플레이에 입혀져 기기에 빌드하기 전에 가독성, 베젤, 잘림을 바로 확인할 수 있습니다."
  - question: "Unity Game 뷰를 워치에서 실시간으로 볼 수 있나요?"
    answer: "네. “Capture window (live)”를 누르고 Unity Game 뷰나 Android Studio의 Wear OS 에뮬레이터 창을 공유하면 프레임 단위로 미러링되며, 실시간 모드에서도 자르기와 세이프 존 오버레이가 그대로 동작합니다."
  - question: "어떤 21개 워치 모델이 포함되어 있나요?"
    answer: "4개 제품군의 21개 모델이 포함됩니다: Google Pixel Watch 1/2 (41mm), Pixel Watch 3 (41·45mm), Pixel Watch 4 (41·45mm), Samsung Galaxy Watch5 (40·44mm), Watch6 (40·44mm), Watch7 (40·44mm), Watch4 Classic (46mm), Watch5 Pro (45mm), Watch6 Classic (43·47mm), Watch8 Classic (46mm), Watch Ultra (47mm), OnePlus Watch 2 (46mm), OnePlus Watch 3 (46mm), Xiaomi Watch 2 Pro (46mm), Mobvoi TicWatch Pro 5 (48mm)."
  - question: "워치가 실제 물리 크기로 표시되나요?"
    answer: "네. 표준 85.60mm ISO/IEC 7810 ID-1 은행 카드에 맞춰 화면 프레임을 한 번만 보정하거나 모니터 PPI를 입력하면 1:1 Real size 모드가 모든 워치를 실제 밀리미터 크기로 보여 줍니다."
  - question: "AOD 및 OLED 번인(10% 미만 OPR) 검사기는 어떻게 동작하나요?"
    answer: "WearView는 Always-On Display(AOD) 프레임의 켜진 픽셀 비율(OPR)과 ITU-R BT.709 기준 휘도를 실시간 계산하고 임계값을 넘는 영역을 히트맵으로 강조해 Google Play 및 Wear OS Watch Face Format 기준을 점검할 수 있게 합니다."
  - question: "14mm 손가락 터치 패드와 2초 한눈 가독성 테스트는 어떤 도움이 되나요?"
    answer: "1:1 보정 모드에서 14mm 손가락 패드는 성인의 손가락 끝이 작은 워치 화면을 물리적으로 얼마나 가리는지 보여 줍니다. 2초 테스트는 손목을 들어 올린 듯 UI를 잠깐 비추어 2초 안에 핵심 정보를 읽을 수 있는지 검증합니다."
  - question: "스크린샷이 어딘가로 업로드되나요?"
    answer: "아니요. WearView는 서버와 추적 스크립트가 없는 정적 클라이언트 WebGL 웹 앱이며 모든 이미지는 브라우저 메모리 안에서만 처리됩니다."
  - question: "WearView는 무료인가요?"
    answer: "네. MIT 라이선스의 무료 오픈 소스입니다."
---

WearView는 Wear OS 앱·게임 개발자, 워치 페이스 디자이너, Unity 크리에이터를 위한 무료 브라우저 3D 검사 스튜디오입니다. 데스크톱 모니터의 큼직한 정사각형 스크린샷은 진실을 가립니다. 작은 글자는 또렷해 보이고, 가장자리 버튼은 안전해 보이며, 각도에 따른 베젤 음영도 드러나지 않지만, 움직이는 손목 위 30~38mm 원형 화면에서는 완전히 다르게 느껴집니다.

WearView는 스크린샷이나 Unity·에뮬레이터 실시간 화면을 **4개 제품군의 물리 치수 기반 21종 3D Wear OS 스마트워치**에 투영하고 인체공학·OLED QA 도구로 검증할 수 있게 해 줍니다.

## 주요 기능

- **4개 제품군 21종 3D Wear OS 스마트워치.** Google Pixel Watch (1/2/3/4), Samsung Galaxy Watch Modern Flat (Watch5/6/7), Classic/Pro/Ultra (Watch4 Classic, Watch5 Pro, Watch6 Classic, Watch8 Classic, Watch Ultra), OnePlus·Xiaomi·Mobvoi의 46~48mm 원형 워치를 즉시 전환해 비교할 수 있습니다.
- **붙여넣기, 드롭, 실시간 스트리밍 및 자동화.** `Ctrl+V` 스크린샷, PNG/JPEG/WebP 드래그 앤 드롭, Unity Game 뷰·Android Studio 에뮬레이터 라이브 캡처, 외부 연동용 `postMessage` 브리지를 지원합니다.
- **실제 물리 크기 (1:1).** 85.60mm 표준 은행 카드나 모니터 PPI 슬라이더로 한 번만 보정하면 베젤 폭과 픽셀 밀도를 실물 크기로 확인합니다.
- **80% 텍스트 / 90% 액션 세이프 존.** 80%·90%·100% 원형 가이드를 겹쳐 가장자리 잘림과 회전 베젤의 시야 가림을 미리 잡아냅니다.
- **물리 인체공학 QA 팩:**
  - **14mm 손가락 터치 패드 (`👆 14mm Finger`)**: 1:1 크기에서 터치 영역 크기와 손가락 가림을 검증합니다.
  - **2초 가독성 테스트 (`⏱ 2s Glance`)**: 손목을 들어 2초 안에 핵심 정보를 읽을 수 있는지 시험합니다.
  - **AOD &amp; OLED 번인 검사기 (`☀️ AOD / OPR < 10%`)**: Always-On Display의 On-Pixel Ratio(OPR)와 휘도 히트맵을 측정합니다.
- **네이티브 픽셀, 카메라 각도 프리셋 &amp; PNG 내보내기.** `384×384`부터 `480×480`까지 실제 패널 해상도 렌더링, `0°` 정면 / `35°` 손목 기울기 / `75°` 측면 베젤 프리셋, 두 모델 나란히 비교, 조명 프리셋(스튜디오·햇빛·야간), `[P]` 키 투명 PNG 저장을 제공합니다.

## 지원되는 21종 Wear OS 스마트워치 사양 표

<div style="overflow-x: auto; max-width: 100%; -webkit-overflow-scrolling: touch; margin: 20px 0;">
<table style="width: 100%; border-collapse: collapse; font-size: 0.88rem; line-height: 1.45;">
<thead>
<tr>
<th style="border: 1px solid #303b4b; padding: 8px 10px; text-align: left;">제품군</th>
<th style="border: 1px solid #303b4b; padding: 8px 10px; text-align: left;">모델명</th>
<th style="border: 1px solid #303b4b; padding: 8px 10px; text-align: left;">케이스 크기 (mm)</th>
<th style="border: 1px solid #303b4b; padding: 8px 10px; text-align: left;">활성 디스플레이</th>
<th style="border: 1px solid #303b4b; padding: 8px 10px; text-align: left;">해상도</th>
<th style="border: 1px solid #303b4b; padding: 8px 10px; text-align: left;">픽셀 밀도</th>
<th style="border: 1px solid #303b4b; padding: 8px 10px; text-align: left;">글라스 및 베젤 구조</th>
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
<td style="border: 1px solid #303b4b; padding: 8px 10px;">돔형 페블 글라스 (베젤 5.26mm)</td>
</tr>
<tr>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Google Pixel Watch</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Google Pixel Watch 3 (41mm)</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">41.0 × 41.0 × 12.3 mm</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">32.20 mm (1.27")</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">408×408 px</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">320 PPI</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">돔형 페블 글라스 (베젤 4.40mm)</td>
</tr>
<tr>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Google Pixel Watch</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Google Pixel Watch 3 (45mm)</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">45.0 × 45.0 × 12.3 mm</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">35.56 mm (1.40")</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">456×456 px</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">326 PPI</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">돔형 페블 글라스 (베젤 4.72mm)</td>
</tr>
<tr>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Google Pixel Watch</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Google Pixel Watch 4 (41mm)</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">41.0 × 41.0 × 12.3 mm</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">33.02 mm (1.30" Actua 360)</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">416×416 px</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">320 PPI</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">돔형 페블 글라스 (베젤 3.99mm)</td>
</tr>
<tr>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Google Pixel Watch</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Google Pixel Watch 4 (45mm)</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">45.0 × 45.0 × 12.3 mm</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">36.20 mm (1.43" Actua 360)</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">456×456 px</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">320 PPI</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">돔형 페블 글라스 (베젤 4.40mm)</td>
</tr>
<tr>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Galaxy Modern Flat</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Samsung Galaxy Watch7 (40mm)</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">40.4 × 40.4 × 9.7 mm</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">33.27 mm (1.31")</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">432×432 px</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">330 PPI</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">플랫 사파이어 + 알루미늄 림</td>
</tr>
<tr>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Galaxy Modern Flat</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Samsung Galaxy Watch7 (44mm)</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">44.4 × 44.4 × 9.7 mm</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">37.34 mm (1.47")</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">480×480 px</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">327 PPI</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">플랫 사파이어 + 알루미늄 림</td>
</tr>
<tr>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Galaxy Modern Flat</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Samsung Galaxy Watch6 (40mm)</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">40.4 × 38.8 × 9.0 mm</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">33.27 mm (1.31")</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">432×432 px</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">330 PPI</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">플랫 사파이어 + 알루미늄 림</td>
</tr>
<tr>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Galaxy Modern Flat</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Samsung Galaxy Watch6 (44mm)</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">44.4 × 42.8 × 9.0 mm</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">37.34 mm (1.47")</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">480×480 px</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">327 PPI</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">플랫 사파이어 + 알루미늄 림</td>
</tr>
<tr>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Galaxy Modern Flat</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Samsung Galaxy Watch5 (40mm)</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">40.4 × 39.3 × 9.8 mm</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">30.23 mm (1.19")</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">396×396 px</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">330 PPI</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">플랫 사파이어 + 와이드 터치 베젤</td>
</tr>
<tr>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Galaxy Modern Flat</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Samsung Galaxy Watch5 (44mm)</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">44.4 × 43.3 × 9.8 mm</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">34.60 mm (1.36")</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">450×450 px</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">330 PPI</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">플랫 사파이어 + 터치 베젤</td>
</tr>
<tr>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Galaxy Classic / Pro / Ultra</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Samsung Galaxy Watch8 Classic (46mm)</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">46.4 × 46.0 × 10.6 mm</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">34.04 mm (1.34")</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">438×438 px</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">327 PPI</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">쿠션 스퀘클 + 48톱니 회전 베젤</td>
</tr>
<tr>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Galaxy Classic / Pro / Ultra</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Samsung Galaxy Watch6 Classic (43mm)</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">42.5 × 42.5 × 10.9 mm</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">33.27 mm (1.31")</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">432×432 px</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">330 PPI</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">돌출형 48톱니 스틸 회전 베젤</td>
</tr>
<tr>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Galaxy Classic / Pro / Ultra</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Samsung Galaxy Watch6 Classic (47mm)</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">46.5 × 46.5 × 10.9 mm</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">37.34 mm (1.47")</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">480×480 px</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">327 PPI</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">돌출형 48톱니 스틸 회전 베젤</td>
</tr>
<tr>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Galaxy Classic / Pro / Ultra</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Samsung Galaxy Watch5 Pro (45mm)</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">45.4 × 45.4 × 10.5 mm</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">34.60 mm (1.36")</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">450×450 px</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">330 PPI</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">오목 돌출 티타늄 보호 베젤</td>
</tr>
<tr>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Galaxy Classic / Pro / Ultra</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Samsung Galaxy Watch4 Classic (46mm)</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">45.5 × 45.5 × 11.0 mm</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">34.60 mm (1.36")</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">450×450 px</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">330 PPI</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">돌출형 스틸 회전 베젤</td>
</tr>
<tr>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Galaxy Classic / Pro / Ultra</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Samsung Galaxy Watch Ultra (47mm)</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">47.4 × 47.4 × 12.1 mm</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">37.34 mm (1.47")</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">480×480 px</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">327 PPI</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">티타늄 쿠션 스퀘클 + 원형 베젤</td>
</tr>
<tr>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">OnePlus, Xiaomi &amp; Mobvoi</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">OnePlus Watch 3 (46mm)</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">47.6 × 46.6 × 11.8 mm</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">38.10 mm (1.50")</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">466×466 px</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">310 PPI</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">비대칭 크로노 + 티타늄 베젤</td>
</tr>
<tr>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">OnePlus, Xiaomi &amp; Mobvoi</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">OnePlus Watch 2 (46mm)</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">47.0 × 46.6 × 12.1 mm</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">36.32 mm (1.43")</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">466×466 px</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">326 PPI</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">비대칭 크로노 + 2.5D 사파이어</td>
</tr>
<tr>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">OnePlus, Xiaomi &amp; Mobvoi</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Xiaomi Watch 2 Pro (46mm)</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">47.6 × 45.9 × 11.8 mm</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">36.32 mm (1.43")</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">466×466 px</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">326 PPI</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">72노치 파리지앵 홉네일 베젤</td>
</tr>
<tr>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">OnePlus, Xiaomi &amp; Mobvoi</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">Mobvoi TicWatch Pro 5 (48mm)</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">50.1 × 48.0 × 12.2 mm</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">36.32 mm (1.43")</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">466×466 px</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">326 PPI</td>
<td style="border: 1px solid #303b4b; padding: 8px 10px;">러기드 널링 택티컬 베젤</td>
</tr>
</tbody>
</table>
</div>

## 관련 엔지니어링 가이드

- [내 Wear OS 게임 스크린샷을 더 이상 믿지 않는 이유](/ko/blog/stop-trusting-wear-os-screenshots/) — 큰 모니터의 평면 프리뷰가 왜 실제와 다른지, Unity 라이브 캡처가 작업 속도를 어떻게 바꾸는지 다룹니다.
- [Wear OS 세이프 존, 14mm 터치 타겟 &amp; AOD 10% 미만 OPR: WearView 실전 인체공학 가이드](/ko/blog/wearos-safe-zones-aod-opr-ergonomics/) — 원형 잘림 기준, 손가락 가림 검증, Always-On Display 번인 예산을 정리했습니다.

## 누구를 위한 도구인가요

기기에 빌드하기 전에 레이아웃, 베젤 가림, AOD 문제를 빠르고 정직하게 확인하고 싶은 Wear OS 게임·앱 개발자, 워치 페이스 디자이너, UI 디자이너, QA 테스터를 위한 도구입니다. 실제 기기 테스트를 완전히 대체하지는 않지만 뻔한 실수를 첫 APK 배포 전에 잡아 줍니다.

## 개인정보

모든 처리는 로컬 브라우저에서 이루어집니다. 계정, 업로드, 추적 스크립트, 백엔드 서버가 없습니다.
