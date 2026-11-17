# 3D Model Assets

Replace any of the GLB models in this directory to customize the 3D workstation hardware:

- `public/models/monitor.glb` — Primary studio display chassis & stand
- `public/models/laptop.glb` — Secondary workstation laptop
- `public/models/desk.glb` — Architectural desk surface & props

Draco-compressed `.glb` files are supported automatically via `@react-three/drei`'s `useGLTF`.
If a model is removed or fails to load, the corresponding component automatically falls back to its procedural PBR Three.js geometry.

