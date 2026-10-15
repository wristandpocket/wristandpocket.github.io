---
layout: tool
lang: ko
page_id: "tool-wearview"
permalink: /tools/wearview/
title: "WearView — 3D 워치에서 Wear OS 화면 미리보기"
badge: "무료 개발자 도구"
description: "스크린샷을 붙여넣거나 Unity Game 뷰를 실시간으로 정확한 3D Wear OS 워치에 띄워 보세요. 실제 물리 크기, 세이프 존, 네이티브 픽셀, 두 모델 나란히 비교를 지원하며 모든 처리는 브라우저 안에서 이루어집니다."
banner: "/assets/images/tools/wearview-hero.webp"
banner_alt: "3D Samsung Galaxy Watch7에 Wear OS 게임 화면을 표시한 WearView"
image: "/assets/images/tools/wearview-og.webp"
app_url: "/wearview/"
source_url: "https://github.com/wristandpocket/wearview"
cta: "WearView 열기"
source_cta: "GitHub 소스"
cta_note: "가입도 업로드도 없습니다. 스크린샷은 브라우저 밖으로 나가지 않습니다."
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
    answer: "WearView를 열고 워치 모델을 고른 뒤 Ctrl+V로 스크린샷을 붙여넣거나 PNG, JPEG, WebP 파일을 끌어다 놓으세요. 이미지가 정확한 3D 모델의 원형 디스플레이에 입혀져, 기기에 빌드하기 전에 가독성, 베젤, 잘림을 확인할 수 있습니다."
  - question: "Unity Game 뷰를 워치에서 실시간으로 볼 수 있나요?"
    answer: "네. “Capture window (live)”를 누르고 Unity Game 뷰나 Wear OS 에뮬레이터 창을 공유하면 WearView가 프레임 단위로 워치 디스플레이에 미러링합니다. 실시간 모드에서도 자르기가 동작합니다."
  - question: "어떤 워치가 포함되어 있나요?"
    answer: "11개 모델: Google Pixel Watch 1/2 (41mm), Pixel Watch 3 (41mm, 45mm), Samsung Galaxy Watch5 (40mm), Watch6 Classic (43mm, 47mm), Watch7 (40mm, 44mm), Watch Ultra (47mm), OnePlus Watch 2, Mobvoi TicWatch Pro 5. 치수는 제조사 사양을 기준으로 하며, 추정값은 저장소의 기기 조사 노트에 표시되어 있습니다."
  - question: "워치가 실제 크기로 표시되나요?"
    answer: "1:1 Real size 모드는 일반 은행 카드로 한 번 보정한 뒤 모니터에 워치를 실제 물리 크기로 보여 줍니다."
  - question: "스크린샷이 어딘가로 업로드되나요?"
    answer: "아니요. WearView는 서버와 분석 도구가 없는 정적 웹 페이지입니다. 이미지와 실시간 캡처는 브라우저 메모리 안에서만 처리됩니다."
  - question: "WearView는 무료인가요?"
    answer: "네. MIT 라이선스의 무료 오픈 소스입니다."
---

WearView는 저희 Wear OS 게임을 위해 만든 작은 도구입니다. 큰 모니터에서 보는 454×454 평면 스크린샷은 진실을 말해 주지 않습니다. 글자는 읽기 쉬워 보이고, 가장자리는 안전해 보이고, 색은 차분해 보입니다. 하지만 움직이는 손목 위 41mm 워치에서는 같은 화면이 전혀 다르게 느껴질 수 있습니다.

그래서 WearView는 화면을 실제 워치의 3D 모델에, 올바른 물리 크기로 입히고 플레이어가 보게 될 방식 그대로 살펴볼 수 있게 해 줍니다.

## 할 수 있는 일

- **붙여넣기, 끌어다 놓기, 실시간 캡처.** 스크린샷을 Ctrl+V로 붙여넣거나, 파일을 3D 뷰에 놓거나, Unity Game 뷰나 에뮬레이터 창을 실시간으로 미러링하세요.
- **실제 크기 (1:1).** 은행 카드로 한 번만 보정하면 화면에 워치가 실제 크기로 표시됩니다.
- **세이프 존.** 80%, 90%, 100% 링을 겹쳐 텍스트와 버튼이 원형 잘림에서 살아남는지 확인하세요.
- **네이티브 픽셀.** 워치 패널의 실제 해상도와 선명한 픽셀로 표시해 기기가 어떻게 샘플링할지 보여 줍니다.
- **비교.** 카메라가 동기화된 두 워치를 나란히 놓아 보세요. 예: Pixel Watch 41mm와 Galaxy Watch 47mm.
- **조명 프리셋.** 스튜디오, 햇빛, 야간 조명으로 대비와 눈부심을 확인하세요.
- **뷰 공유.** 모델, 비교, 조명, 모드를 복원하는 링크를 복사하세요. 스크린샷은 링크에 절대 포함되지 않습니다.

## 누구를 위한 도구인가요

기기에 빌드하기 전에 화면을 빠르고 정직하게 확인하고 싶은 Wear OS 게임·앱 개발자, UI 디자이너, QA 테스터를 위한 도구입니다. 실제 기기 테스트를 대신하지는 않지만, 뻔한 문제를 더 일찍 잡아 줍니다.

## 개인정보

모든 처리는 로컬에서 이루어집니다. 계정, 업로드, 분석, 서버가 없습니다.
