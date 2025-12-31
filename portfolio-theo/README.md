# Theo Daudebourg Portfolio

An immersive 3D portfolio website built with Next.js 14, React Three Fiber, and Theatre.js.

## 🚀 Features

- **Immersive 3D Experience** - Interactive particle fields and WebGL effects
- **Adaptive Quality** - Auto-detects GPU capabilities for optimal performance
- **Dark Theme** - Sleek design with lime green (#A1FB09) accents
- **Fully Responsive** - Works beautifully on all devices
- **Performance First** - Optimized for 60fps with graceful fallbacks

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **3D Graphics**: React Three Fiber + Three.js
- **Animations**: Theatre.js, Framer Motion
- **Styling**: Tailwind CSS
- **State**: Zustand
- **Performance**: detect-gpu for quality tiers

## 🏃‍♂️ Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Main page
│   └── globals.css        # Global styles
├── components/
│   ├── canvas/            # 3D components
│   │   ├── Scene3D.tsx    # Main canvas
│   │   └── ParticleField.tsx
│   ├── sections/          # Page sections
│   │   ├── HeroSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── ProjectsSection.tsx
│   │   ├── SkillsSection.tsx
│   │   └── ContactSection.tsx
│   └── ui/                # UI components
│       ├── Navigation.tsx
│       ├── Footer.tsx
│       └── LoadingScreen.tsx
└── lib/                   # Utilities
    ├── store.ts           # Zustand stores
    ├── quality.ts         # GPU detection
    └── utils.ts           # Helper functions
```

## 🎨 Brand Colors

| Color | Hex | Usage |
|-------|-----|-------|
| Lime Neon | `#A1FB09` | Primary accent |
| Grey | `#8F929A` | Secondary text |
| Dark | `#0A0A0A` | Background |

## 📝 License

MIT © Theo Daudebourg
