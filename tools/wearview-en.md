---
layout: tool
lang: en
page_id: "tool-wearview"
permalink: /tools/wearview/
title: "WearView: Wear OS Screen Preview"
badge: "Free developer tool"
description: "Preview Wear OS screenshots and live Unity windows on 21 3D watch models at 1:1 size, with safe zones, touch-target and AOD burn-in checks. Free."
banner: "/assets/images/tools/wearview-hero.webp"
banner_alt: "WearView showing a Wear OS game screen on a 3D Samsung Galaxy Watch7"
image: "/assets/images/tools/wearview-og.webp"
app_url: "/wearview/"
source_url: "https://github.com/wristandpocket/wearview"
cta: "Open WearView"
source_cta: "Source on GitHub"
cta_note: "No sign-up, no upload: screenshots and live captures stay in your browser."
gallery_title: "What it looks like"
screenshots:
  - src: "/assets/images/tools/wearview-compare.webp"
    alt: "Compare mode: the same screen on a Galaxy Watch7 44 mm and a Pixel Watch 41 mm"
  - src: "/assets/images/tools/wearview-safe-zones.webp"
    alt: "QA pattern with Wear OS safe-zone rings on a round display"
  - src: "/assets/images/tools/wearview-wrist.webp"
    alt: "On-wrist view: the watch on a forearm model for scale"
faq:
  - question: "How do I preview a Wear OS screen without a physical watch?"
    answer: "Open WearView, choose any of the 21 watch models and paste a screenshot with Ctrl+V (or drop a PNG, JPEG or WebP). The image maps onto the round display of a physically dimensioned 3D model so you can check readability, bezels and edge cropping before building to hardware."
  - question: "Can I see my Unity Game view on a watch in real time?"
    answer: "Yes. Click “Capture window (live)” and share the Unity Game view or the Android Studio Wear OS emulator window. WearView mirrors it onto the watch display frame by frame, and cropping and safe-zone overlays continue working while live."
  - question: "Which 21 watches are included?"
    answer: "21 models across 4 device families: Google Pixel Watch 1/2 (41 mm), Pixel Watch 3 (41 and 45 mm), Pixel Watch 4 (41 and 45 mm), Samsung Galaxy Watch5 (40 and 44 mm), Watch6 (40 and 44 mm), Watch7 (40 and 44 mm), Watch4 Classic (46 mm), Watch5 Pro (45 mm), Watch6 Classic (43 and 47 mm), Watch8 Classic (46 mm), Watch Ultra (47 mm), OnePlus Watch 2 (46 mm), OnePlus Watch 3 (46 mm), Xiaomi Watch 2 Pro (46 mm) and Mobvoi TicWatch Pro 5 (48 mm)."
  - question: "Is the watch shown at its real physical size?"
    answer: "Yes. Calibrate once by matching the on-screen frame to a standard 85.60 mm ISO/IEC 7810 ID-1 bank card (or dialing your monitor PPI), and 1:1 Real size mode displays every smartwatch at true physical millimeter scale."
  - question: "How does the AOD & OLED Burn-In (< 10% OPR) checker work?"
    answer: "WearView calculates the real-time On-Pixel Ratio (OPR) and ITU-R BT.709 weighted luminance of your Ambient / Always-On Display frame and highlights pixels over the safe burn-in threshold in a diagnostic heatmap so you can meet Google Play and Wear OS Watch Face Format ambient power limits."
  - question: "How do the 14mm Finger Contact Pad and 2-Second Glanceability Test help Wear OS UI design?"
    answer: "In calibrated 1:1 mode, the 14mm Finger Contact Pad shows how much of the tiny watch face an adult fingertip physically covers when tapping a control. The 2-Second Glanceability Test briefly flashes your UI as if raising a wrist, verifying whether players or users can read primary stats inside 2 seconds."
  - question: "Are my screenshots uploaded anywhere?"
    answer: "No. WearView is a static client-side WebGL application with no backend and no telemetry. Images and live window captures stay strictly inside your browser's memory."
  - question: "Is WearView free?"
    answer: "Yes. WearView is free and open source under the MIT license."
---

WearView is a free browser-based 3D inspection studio built for Wear OS developers, watch face designers, and Unity creators. A flat square screenshot on a desktop monitor hides reality: tiny typography looks sharp, edge buttons look safe, and flat bezels never cast grazing shadows across the glass. On a 30–38 mm round watch on a moving wrist, the exact same frame behaves very differently.

WearView projects your screenshots or live emulator/Unity windows onto **21 physically dimensioned 3D Wear OS smartwatches across 4 hardware families**, paired with ergonomics and OLED power QA tools.

## What you can do

- **21 3D Wear OS smartwatches across 4 families.** Instant switching across Google Pixel Watch (1/2/3/4), Samsung Galaxy Watch Modern Flat (Watch5/6/7), Classic/Pro/Ultra (Watch4 Classic, Watch5 Pro, Watch6 Classic, Watch8 Classic, Watch Ultra), and flagship 46–48 mm round devices from OnePlus, Xiaomi and Mobvoi.
- **Paste, drop or live-capture.** Press `Ctrl+V` with any screenshot, drag-and-drop PNG/JPEG/WebP files onto the stage, stream your Unity Game view or Android Studio Emulator live, or connect automated pipelines via the `postMessage` bridge.
- **1:1 physical scale (bank card calibration).** Match the on-screen guide to a standard 85.60 mm bank card once (or adjust your monitor PPI) to see every bezel and pixel density at real-life millimeter size.
- **80% Text &amp; 90% Action Safe Zones.** Toggle circular 80%, 90% and 100% rings to catch clipped edge labels and sunken rotating-bezel occlusion before shipping.
- **Physical Ergonomics QA Pack:**
  - **14 mm Finger Contact Pad (`👆 14mm Finger`)** in calibrated 1:1 mode to validate real-world touch targets and thumb occlusion.
  - **2-Second Glanceability Test (`⏱ 2s Glance`)** simulating a quick wrist raise to verify hierarchy and legibility under time pressure.
  - **AOD &amp; OLED Burn-In Checker (`☀️ AOD / OPR < 10%`)** computing On-Pixel Ratio (OPR) and luminance heatmaps for Always-On Display compliance.
- **Native Pixel Grid, Camera Angles &amp; Snapshots.** Inspect exact native panel pixels (`384×384` to `480×480`), jump between `0°` Front, `35°` Wrist Tilt, and `75°` Extreme Bezel Side presets, put two watches side-by-side with synced cameras, test studio/sunlight/night lighting, and export a transparent PNG with `[P]`.

## Supported 21 Wear OS Smartwatches (Hardware Reference Table)

<div style="overflow-x: auto; max-width: 100%; -webkit-overflow-scrolling: touch; margin: 20px 0;">
<table style="width: 100%; border-collapse: collapse; font-size: 0.88rem; line-height: 1.45;">
<thead>
<tr>
<th style="border: 1px solid #303b4b; padding: 8px 10px; text-align: left;">Family</th>
<th style="border: 1px solid #303b4b; padding: 8px 10px; text-align: left;">Watch Model</th>
<th style="border: 1px solid #303b4b; padding: 8px 10px; text-align: left;">Case Size (mm)</th>
<th style="border: 1px solid #303b4b; padding: 8px 10px; text-align: left;">Active Display</th>
<th style="border: 1px solid #303b4b; padding: 8px 10px; text-align: left;">Resolution</th>
<th style="border: 1px solid #303b4b; padding: 8px 10px; text-align: left;">Density</th>
<th style="border: 1px solid #303b4b; padding: 8px 10px; text-align: left;">Glass &amp; Bezel Geometry</th>
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

## Related Engineering Guides

- [Why I stopped trusting screenshots of my Wear OS games](/blog/stop-trusting-wear-os-screenshots/) — why flat monitor previews mislead developers and how live Unity/emulator capture fixes iteration speed.
- [Wear OS Safe Zones, 14mm Touch Targets &amp; AOD &lt;10% OPR: A Practical Ergonomics Guide with WearView](/blog/wearos-safe-zones-aod-opr-ergonomics/) — practical rules for round cropping, fingertip coverage, glanceability, and Always-On Display burn-in budgets.

## Who it is for

Wear OS game and app developers, watch face designers, UI/UX teams and QA testers who want fast, honest ergonomic feedback before deploying builds to hardware. It does not replace testing on a physical smartwatch; it catches layout, bezel and AOD issues before the first APK deploy.

## Privacy

Everything runs locally inside your browser. There is no account, no upload, no tracking script and no backend.
