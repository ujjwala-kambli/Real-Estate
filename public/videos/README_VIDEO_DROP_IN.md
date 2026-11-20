# AUREVIA ESTATES — VIDEO & FRAME SEQUENCE DROP-IN GUIDE

This directory is reserved for your primary master construction footage.

---

## 1. Native Video Master Drop-in

To use a single continuous video file for scroll-driven scrubbing:

1. Place your exported construction video at:
   ```
   public/videos/construction-master.mp4
   ```

2. **Recommended Video Encoding Specifications:**
   - **Codec:** H.264 or H.265 (MP4 container)
   - **GOP / Keyframe Frequency:** Crucial for smooth scroll scrubbing! Set Keyframe interval to `1` or `2` frames (All-Intra / Intra-frame GOP) so the browser can scrub instantaneously backwards and forwards without seek lag.
   - **Resolution:** 4K UHD (`3840x2160`) or Full HD (`1920x1080`)
   - **Frame Rate:** 24fps or 30fps
   - **Audio:** No audio track required (or muted)

3. **Automatic Detection:**
   The `ScrollStory` component automatically checks for the presence of `/videos/construction-master.mp4` on page load. When found, it enables the **NATIVE MP4 STREAM** mode and renders an engine switcher toggle in the top-right HUD bar.

---

## 2. High-Precision Frame Sequence Drop-in

The website currently uses a synchronized **4K Sequential Master Engine** loaded from:
```
public/images/construction/
  ├── stage-01-vision.jpg
  ├── stage-02-site-preparation.jpg
  ├── stage-03-excavation.jpg
  ├── stage-04-foundation.jpg
  ├── stage-05-structural-framework.jpg
  ├── stage-06-floor-by-floor.jpg
  ├── stage-07-facade-development.jpg
  ├── stage-08-landscape-amenities.jpg
  └── stage-09-final-reveal.jpg
```

To update the sequence with your own 3D CGI or drone camera timelapse passes:
- Simply overwrite the `.jpg` files in `public/images/construction/` maintaining the same names.
- Dimensions: `1920x1080` or `3840x2160` (16:9 aspect ratio recommended).
- The canvas scrubber will automatically preload your updated frames, calculate smooth cross-fading and micro-zoom interpolation on scroll.
