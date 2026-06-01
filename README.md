# IFAIR 2026 — Vietnamese Club

An interactive, narrative-driven web experience for the Vietnamese Club at Knox College's IFAIR 2026 event (February 14, 2026). The Golden Dragon guides visitors through Vietnamese culture, sports, food, and natural landmarks.

## Tech Stack

- **Next.js 15** (App Router)
- **TypeScript**
- **CSS Modules**
- **Google Fonts** — Playfair Display, Inter

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scene Flow

| Route | Scene |
|-------|-------|
| `/` | Golden Dragon awakens — pull the lamp cord to begin |
| `/scene2` | Vietnamese Soccer — stadium, fans, and national pride |
| `/scene3` | Childhood Sports — fire particles, memory cards |
| `/scene4` | Bún Thịt Nướng — knock-knock door reveal |
| `/scene5` | Things We Cook in Winter — ASCII tree, food photos |
| `/scene6` | Hạ Long Bay — floating boat, UNESCO facts |
| `/ending` | Canvas 3D globe — flight path from Vietnam to Galesburg |

## Project Structure

```
app/
├── layout.tsx          # Root layout with fonts & metadata
├── globals.css         # Global reset and CSS variables
├── page.tsx            # Scene 1
├── scene2/page.tsx     # Scene 2
├── scene3/page.tsx     # Scene 3
├── scene4/page.tsx     # Scene 4
├── scene5/page.tsx     # Scene 5
├── scene6/page.tsx     # Scene 6
└── ending/page.tsx     # Ending
public/
└── images/             # All photo assets
```

## Credits

Built by **Kacy '29** for the Vietnamese Club 2025–2026.

Photos by **Lam Giang '29 (Jane)** and **Tra '29**.

Special thanks to **ICLUB EXEC 2025–2026** for making this event possible.

Follow us: [Vietnamese Club @ Knox College](https://www.instagram.com/vietnameseclub_knoxcollege/)
