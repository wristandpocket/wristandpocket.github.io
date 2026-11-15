---
layout: "post"
title: "Wear OS 세이프 존, 14mm 터치 타겟 & AOD 10% 미만 OPR: WearView 실전 인체공학 가이드"
description: "원형 화면 모서리 잘림, 돌출 베젤 시야 가림, 좁은 14mm 손가락 터치 영역, OLED Always-On Display 10% 미만 OPR 기준 위반을 WearView 3D로 미리 잡는 실전 가이드."
date: "2026-11-15T12:00:00.000Z"
last_modified_at: "2026-11-15T12:00:00.000Z"
lang: "ko"
page_id: "wearos-safe-zones-aod-opr-ergonomics"
permalink: "/blog/wearos-safe-zones-aod-opr-ergonomics/"
tags: ["Tools", "Wear OS", "Game Design"]
author: "ihor"
seo_type: "BlogPosting"
image: "/assets/images/tools/wearview-safe-zones.webp"
image_alt: "Wear OS 80% 및 90% 원형 세이프 존 링이 표시된 WearView QA 패턴"
focus_keyword: "Wear OS 세이프 존 AOD OPR"
archive_note: false
sitemap: true
published: true
fmContentType: "Post"
---

데스크톱 IDE나 Figma에서 원형 스마트워치 UI를 설계하면 네 가지 실수가 반복됩니다. 가장자리 글자 잘림, 비스듬한 각도에서 돌출 베젤에 가리는 버튼, 성인 손가락보다 작은 터치 영역, 그리고 OLED Always-On Display(AOD) 전력·번인 기준 초과입니다.

[WearView](https://wristandpocket.dev/wearview/)에서 **1:1 실제 물리 크기와 정확한 3D 워치 하드웨어** 위에 화면을 올려 보면 네 가지 문제를 기기 빌드 전에 바로 잡아낼 수 있습니다.

## 1. 평면 정사각형 프리뷰가 원형 워치에서 실패하는 이유

정사각형 안에 원을 내접시키면 베젤을 고려하기도 전에 전체 픽셀 영역의 **`21.5%`** (`1 - pi/4`)가 사라집니다. 여기에 Wear OS 워치의 서로 다른 글라스·베젤 구조가 겹칩니다.

- **돔형 페블 글라스** (Google Pixel Watch 1–4): 곡면 3D 유리가 케이스 측면까지 이어지며 테두리 반사를 만듭니다.
- **플랫 사파이어 + 터치 베젤** (Samsung Galaxy Watch5 / Watch6 / Watch7): `1.19"` (`396×396`, Watch5 40mm)부터 `1.47"` (`480×480`, Watch7 44mm)까지 실화면 대비 테두리 비율이 크게 다릅니다.
- **돌출형 회전 베젤 및 쿠션 프레임** (Galaxy Watch4/6/8 Classic, Watch5 Pro, Watch Ultra): 금속 베젤 벽이 오목하게 들어간 사파이어 유리보다 **`1.35 mm`~`1.45 mm` 위**로 솟아 있습니다.

사용자가 손목을 들어 워치를 볼 때는 정면 `0°`가 아니라 약 **`35°` 기울기**로 봅니다. 이때 돌출된 베젤 벽이 화면 바깥쪽 픽셀 띠를 실제로 가립니다. 정면 `0°` 스크린샷만으로는 이 가림 현상을 절대 볼 수 없습니다.

## 2. 80% 텍스트 세이프 존 vs 90% 액션 세이프 존 규칙

[WearView](https://wristandpocket.dev/wearview/)에서 붙여넣은 스크린샷이나 Unity·에뮬레이터 실시간 스트림 위에 원형 세이프 존 가이드를 켜 보세요.

### 안쪽 80% 링 — 텍스트, 점수 및 핵심 HUD
제목, 상태 텍스트, 수치, 주요 HUD 정보는 안쪽 **`80%`** 원 안에 배치하세요. `450×450` 패널 기준으로 사방 약 `45 px`의 여유가 생겨 돔 글라스 굴절이나 회전 베젤 그림자에 글자가 잘리지 않습니다.

### 바깥쪽 90% 링 — 보조 아크 및 가장자리 인디케이터
원형 진행 표시줄, 회전 베젤 스크롤 바, 보조 아이콘은 **`90%`** 링까지 확장할 수 있습니다. 단, **`35° Wrist Tilt`** 카메라 프리셋으로 전환해 Galaxy Watch6 Classic 47mm나 Watch8 Classic 46mm 같은 오목한 디스플레이에서 가려지지 않는지 확인하세요. `90%~100%` 구간은 비네팅이나 배경 그라데이션 전용으로 비워 두는 것이 안전합니다.

## 3. 1:1 크기 보정 & 14mm 손가락 터치 패드 검증

`1.20"` (`30.48 mm`) Pixel Watch 41mm 화면에서 `48 px` Material 터치 타겟은 실제 폭이 약 `3.8 mm`에 불과합니다. 반면 성인 손가락 끝이 화면에 닿는 면적은 지름 약 **`14 mm`**로, **전체 화면 너비의 절반에 가깝습니다**.

1. WearView 보정 창에서 표준 ISO/IEC 7810 ID-1 은행 카드(`85.60 mm`)를 화면에 대고 맞추거나 모니터 PPI를 입력합니다.
2. **Real Size (1:1)** 모드를 켜 워치를 실제 밀리미터 크기로 표시합니다.
3. **`14mm Finger`** 오버레이를 켜고 반투명 원을 버튼 위에 올려 봅니다.

14mm 원 안에 버튼 두 개가 동시에 들어가거나 손가락이 버튼 라벨을 완전히 가린다면 간격을 넓히거나 회전 크라운·베젤 탐색으로 전환해야 합니다.

## 4. 2초 손목 가독성 테스트 (`2s Glance`)

스마트워치는 걷거나 대화하는 도중에 잠깐 손목을 들어 확인하는 기기입니다. WearView의 **`2s Glance`** 모드는 UI를 딱 2초 동안 보여 준 뒤 화면을 가립니다.

2초가 지난 뒤 스스로 점검해 보세요.
- 눈을 찡그리지 않고 **핵심 숫자나 상태 하나**를 바로 읽었는가?
- **주 액션 버튼**이 즉시 눈에 들어왔는가?
- 1:1 실제 크기에서 팔 길이만큼 떨어져 **`Sunlight`** 조명으로 봤을 때 회색 보조 텍스트의 대비가 유지되는가?

2초 안에 읽히지 않는다면 보조 라벨을 줄이고 크기·색상 위계를 단순화해야 합니다.

## 5. OLED AOD 10% 미만 On-Pixel Ratio (OPR) & 휘도 검사

Google Play와 Wear OS Watch Face Format은 OLED 번인을 막고 배터리를 지키기 위해 Always-On Display(AOD) 화면의 켜진 픽셀 비율(**On-Pixel Ratio, OPR**)을 보통 **`10%` 미만**으로 유지하도록 요구합니다.

WearView의 **`AOD / OPR`** 검사기는 **ITU-R BT.709** 지각 휘도 계수로 픽셀별 부하를 계산해 다음 두 가지를 바로 보여 줍니다.
- 원형 활성 디스플레이 내 **OPR 비율(%)** (`10%` 이상 시 경고 표시)
- 과도하게 밝은 영역, 꽉 찬 배지, 두꺼운 안티앨리어싱 번짐을 표시하는 **히트맵**

채워진 아이콘을 얇은 외곽선 스타일로 바꾸고 순백색(`#FFFFFF`)을 중간 회색 톤으로 낮추며 배경 그라데이션을 끄면 보통 `18~25%`였던 OPR을 **`6~8%`** 수준으로 줄일 수 있습니다.

## 기기 빌드 전 체크리스트

- [WearView](https://wristandpocket.dev/wearview/)의 **21개 지원 모델** 중 가장 작은 화면(`30.23 mm` Galaxy Watch5 40mm / `30.48 mm` Pixel Watch 1/2 41mm)과 가장 큰 화면(`38.10 mm` OnePlus Watch 3 46mm / `37.34 mm` Galaxy Watch7 44mm)을 나란히 비교합니다.
- **`35°` 손목 기울기** 및 **`75°` 측면 베젤** 각도에서 `80%`·`90%` 세이프 존을 확인합니다.
- 1:1 실제 크기에서 **`14mm Finger`** 터치 영역과 **`2s Glance`** 가독성을 검증합니다.
- Ambient/AOD 캡처가 **`<10%` OPR** 조건을 통과하는지 확인합니다.

21개 워치 사양 표와 FAQ는 [WearView 도구 페이지](/ko/tools/wearview/)에서, Unity 실시간 미러링 워크플로는 [내 Wear OS 게임 스크린샷을 더 이상 믿지 않는 이유](/ko/blog/stop-trusting-wear-os-screenshots/)에서 확인할 수 있습니다.
