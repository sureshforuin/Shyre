# ShyRe Creations — Minimalist Multidirectional Parallax Website

> **Tagline:** Made with love  
> **Brand Emblem:** Captured from artisan resin & floral preservation emblem (`/public/images/logo.jpg`)

---

## ✦ Project Overview

**ShyRe Creations** is a modern, premium, minimalist website built with **React 19**, **TypeScript**, **Framer Motion**, and **Ant Design (customized theme tokens)**.

Instead of conventional vertical or horizontal page scrolling, the application delivers an immersive **spatial browsing experience** through **random multidirectional parallax transitions** across a multidimensional canvas.

Every page, section, project portfolio listing, navigation item, and detail modal is dynamically generated from a centralized JSON configuration: [`src/config/site.json`](./src/config/site.json).

---

## ✦ Key Architecture & Features

### 1. Centralized JSON-Driven Configuration
- **Location:** `src/config/site.json`
- Drives:
  - Global site metadata, logo, social channels, and navigation items.
  - Page definitions: `Home`, `About Us`, `Our Work`, `Contact Us`.
  - Reusable section blocks (`hero`, `philosophy`, `features`, `text`, `image`, `projectGrid`, `contact`).
  - Dynamic projects portfolio with title, category, year, thumbnail, long descriptions, and materials.
- Safe component registry (`src/components/SectionRenderer/SectionRenderer.tsx`) without dangerous HTML strings or dynamic execution.

### 2. Random Multidirectional Parallax Navigation
- **Directions:**
  - `top`, `bottom`, `left`, `right`
  - `top-left`, `top-right`, `bottom-left`, `bottom-right`
- Direction is picked randomly on each navigation action, avoiding consecutive identical vectors.
- Exit and enter animations coordinate smoothly across the canvas using Framer Motion GPU-accelerated transforms (`translateX`, `translateY`, `scale`, and `opacity`).
- Transition locking prevents rapid-click race conditions and overlapping animations.
- Full support for browser back/forward history and direct URL access.
- Seamlessly respects `prefers-reduced-motion` accessibility standards.

### 3. Bespoke Editorial Design & Ant Design Theme
- Replaced default corporate AntD styling with bespoke luxury editorial tokens:
  - Cream & Ivory canvas: `#FAF8F5`
  - Subtle text charcoal: `#1A1817` and secondary `#706B64`
  - Brand raspberry & champagne gold accents: `#C23363` & `#C59A5A`
  - Elegant serif typography: *Cinzel* & *Italiana* paired with *Plus Jakarta Sans*
  - Floating pill navigation capsule with real-time spatial vector indicator.

---

## ✦ Project Structure

```
shyre-creations/
├── public/
│   └── images/
│       └── logo.jpg              # ShyRe Creations brand emblem
├── src/
│   ├── config/
│   │   └── site.json             # Centralized JSON application configuration
│   ├── types/
│   │   └── site.ts               # Complete TypeScript interfaces
│   ├── hooks/
│   │   ├── useNavigation.ts      # Navigation state, transition lock, reduced-motion
│   │   └── useRandomDirection.ts # 8-way spatial randomizer & coordinate calculation
│   ├── components/
│   │   ├── Navigation/           # Floating pill navbar & mobile overlay
│   │   ├── PageTransition/       # Framer Motion multidirectional canvas wrapper
│   │   ├── SectionRenderer/      # Safe registry for hero, text, features, grid, etc.
│   │   ├── ProjectCard/          # Editorial project portfolio card
│   │   └── Footer/               # Minimalist footer with spatial state indicator
│   ├── layouts/
│   │   └── MainLayout.tsx        # Persistent shell with transition viewport
│   ├── pages/
│   │   └── DynamicPage.tsx       # Dynamic JSON-driven page engine
│   ├── styles/
│   │   ├── theme.ts              # Custom Ant Design theme tokens
│   │   └── global.scss           # Global luxury typography & tokens
│   ├── App.tsx                   # Routes dynamically rendered from JSON
│   ├── main.tsx                  # Vite React entry point
│   └── vite-env.d.ts             # SCSS & asset declarations
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## ✦ How to Run Locally

Navigate to the project directory:
```bash
cd ~/Desktop/work/shyre-creations
```

Run the development server:
```bash
npm run dev
```

Open your browser at:
`http://localhost:3000` (or the port specified in terminal).

To create a production build:
```bash
npm run build
```
