# 3D Folding Box

An interactive web app that folds flat 2D cardboard templates into animated 3D boxes, built to learn and demonstrate React Three Fiber, hinge-based 3D animation, and component architecture.
## Live Demo

3d-folding-box.vercel.app

## Features

- 4 box templates, each with a genuinely different fold mechanism:
  - **Pizza Box / Shipping Box** — 4-flap tuck-top closure
  - **Shoe Box** — gable roof with pentagon-shaped ends
  - **Gift Box** — envelope-style pillow box with peaked flaps
- Hover-to-fold interaction: hovering the box folds it, moving away unfolds it
- Auto-rotating camera with manual drag-to-rotate (via OrbitControls)
- Reset button to snap back to the flat template instantly
- Gentle "floating" lift animation while the box is open

## Tech Stack

- React + Vite
- React Three Fiber (`@react-three/fiber`)
- Three.js
- `@react-three/drei` (OrbitControls only)
- React Router
- Plain CSS — no UI/animation libraries

## How the folding works

Each box template is defined as plain data in `src/data/templates.js`: a list of panels, each with a hinge position, hinge axis, and target fold angle. Panels are rendered as nested Three.js groups — an outer `<group>` acts as the hinge pivot, and the panel mesh sits offset inside it, so rotating the group swings the panel like a real hinge. Folding is driven by a single animated number (`foldStage`) via `useFrame`, which each panel maps to its own 0–1 fold progress based on which "stage" it belongs to (sides → front/back → lid, etc).

## Running locally

```bash
npm install
npm run dev
```

## Project Structure

```
src/
├── data/templates.js       # Box definitions: panels, hinges, fold angles
├── components/
│   ├── Panel.jsx            # Single hinged cardboard panel
│   ├── BoxModel.jsx         # Assembles panels, owns fold animation state
│   ├── BoxScene.jsx         # Canvas, camera, lighting, OrbitControls
│   └── FoldControls.jsx     # Reset button
├── hooks/useFoldAnimation.js # Drives the fold animation over time
└── pages/
    ├── HomePage.jsx          # Template gallery
    └── BoxPage.jsx           # 3D view for a selected template
```