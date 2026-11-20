# Aurevia Estates — Premium Cinematic Real-Estate Development Experience

A visually stunning, interactive property-development website for **Aurevia Estates**, featuring a continuous scroll-driven construction film, responsive GSAP ScrollTrigger timeline scrubbing, and an editorial architectural identity.

---

## 🌟 Key Highlights & Core Experience

### 1. Scroll-Driven Construction Film (9 Chronological Stages)
The homepage revolves around a continuous cinematic development film. The user begins at a pristine coastal bluff with survey markings, and by scrolling, progressively constructs a nine-tier luxury residential estate:

1. **The Vision (01/09):** Wide aerial view of the empty coastal bluff, terrain survey demarcation, untouched earth, and morning light.
2. **Site Preparation (02/09):** Active earthmoving machinery, yellow JCB hydraulic excavators, and bulldozers grading the structural pad and perimeter roads.
3. **Excavation (03/09):** Deep structural bedrock excavation pits, secant shoring walls, rock trenches, and dump trucks transporting soil.
4. **Foundation (04/09):** High-tensile steel rebar cages, articulated concrete boom pumps pouring the monolithic raft slab, and the anchor mast for the tower crane.
5. **Structural Framework (05/09):** Concrete columns, post-tensioned floor slabs, shear-wall elevator core, and a 65m luffing tower crane working overhead.
6. **Floor-by-Floor Construction (06/09):** Vertical progression floor by floor up to nine architectural tiers with cantilevered balconies, topped-out superstructure.
7. **Facade Development (07/09):** Floor-to-ceiling acoustic glass curtain walls, marine-grade anodized champagne-bronze vertical louvers, and balcony balustrades.
8. **Landscape & Amenities (08/09):** Tower crane dismantled, travertine arrival motor court paved, mature coastal cypress planted, cliffside lawns, and rooftop infinity pool lined.
9. **Final Reveal (09/09):** Completed architectural masterpiece at twilight dusk, warm interior glow through glass curtain walls, illuminated fountain, and rooftop reflection pool.

### 2. Dual-Engine Video & Frame Scrubber Architecture
- **4K Sequential Master Engine (Canvas):** High-performance HTML5 canvas preloads the 9 master keyframes into memory with a luxury preloader progress bar. Implements damped linear interpolation (`requestAnimationFrame`) for smooth forward and reverse scrubbing, with subtle cross-fading and cinematic push-in scale.
- **Native MP4 Video Engine:** Automatically detects `/videos/construction-master.mp4`. When present, seamlessly supports hardware-accelerated scroll scrubbing with a live engine toggle in the HUD.
- **Interactive Telemetry HUD:** Displays real-time camera metadata, active equipment, structural specs, elevation indicators, and timecodes.
- **Interactive Stage Navigation:** 9 clickable stage pills allow jumping to any stage, while a "Play Timelapse" button provides continuous automated viewing.
- **Full Reverse Scrolling:** Scrolling backwards smoothly reverses the assembly of the tower back to virgin land.

### 3. Visual Design System & Editorial Layout
- **Typography:** Strictly **Inter** (loaded via `next/font/google`), featuring bold/extra-bold weights (800 for the hero, 700 for section titles) and fluid `clamp()` sizing.
- **Architectural Palette:** Warm ivory (`#FBF9F5`), deep midnight navy (`#0E1B24`), and restrained champagne-gold accents (`#C5A880`).
- **Editorial Structure:** Masterplan metrics grid, material craftsmanship feature, resort-tier amenities showcase, interactive visual archive with lightbox, and luxury consultation CTA.

---

## 🛠️ Technology Stack

- **Framework:** Next.js 15 (App Router) + React 19 + TypeScript
- **Motion & Scrubbing:** GSAP 3.14 + ScrollTrigger
- **Typography:** Inter (`next/font/google`)
- **Icons:** Lucide React
- **Styling:** Custom CSS design system with CSS custom properties and full responsive breakpoints

---

## 🚀 Running the Project Locally

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Open the browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

4. **Production Build & Verification:**
   ```bash
   npm run build
   npm run start
   ```

---

## 🎬 How to Place or Replace Construction Video & Frame Assets

### Option A: Dropping in your Real MP4 Construction Film
1. Export your rendered 3D animation or drone video (H.264 / MP4, 16:9, preferably All-Intra or keyframe interval every 1-2 frames for instant seek response).
2. Save the file to:
   ```
   public/videos/construction-master.mp4
   ```
3. Refresh the website. The HUD will detect the master video and enable native video scrubbing!

### Option B: Customizing the 9 Stage Frames
1. Replace the nine images located in:
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
2. The canvas engine automatically preloads and interpolates your updated assets.

---

## 🧭 Site Route Directory

- `/` — Homepage (Hero, Scroll-Controlled Construction Film, Philosophy, Metrics, Craftsmanship, Amenities, Gallery Lightbox, Enquiry CTA)
- `/about` — Architectural philosophy, geological context, and design principles
- `/development` — Detailed 09-stage construction dossier with technical telemetry and equipment specs
- `/residences` — Residential typologies, sky penthouse features, and spatial planning
- `/amenities` — Living sanctuary, cliffside infinity pool, and arrival motor court
- `/gallery` — Curated high-resolution visual archive with category filters and full-screen lightbox
- `/contact` — Private client registration and consultation booking form with validation

---

## ⚖️ Content Integrity & Legal Notice

Aurevia Estates is a conceptual luxury real estate development project created to demonstrate cutting-edge interactive web architecture and scroll-synchronized video storytelling. Visuals, measurements, and technical specifications are illustrative representations.
