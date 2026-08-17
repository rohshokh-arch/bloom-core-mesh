# Vesper Canvas

System / Environment: WebGL / Three.js Canvas integrated into a modern web hero section.




Theme & Background:




Mode: Light Theme.

Background: A pale, off-white canvas featuring very subtle, ghosted radial gradients mirroring the main 3D object—a soft cyan glow in the top-left and a soft purple glow in the bottom-right.

3D Geometry & Architecture:




Core Structure: A dense, organic central core made of thousands of individual particles, roughly shaped like a heavily distorted, turbulent torus or abstract nebula.

Exploded Structure: Expanding outward from the core is an immense, complex 3D wireframe mesh. The wireframe consists of interconnected, angular geometric polygons (triangles and quads) that stretch toward the edges of the screen.

Material & Coloring: Both the inner particles and the outer wireframe share a strictly defined vertical/diagonal linear color gradient.




Top/Left mapping: Bright Cyan (#00FFFF).

Bottom/Right mapping: Deep Purple (#8800FF).

Animation & Interaction Phases:




Phase 1 - Birth/Idle: The object begins as just the dense central particle orb. It features a slow, continuous Y-axis rotation and a subtle, breathing noise algorithm applied to the particle coordinates (shimmering).

Phase 2 - The Explosion (Transition): A sudden, eased burst where the outer particles rapidly scale outward, mapping their coordinates to a newly generated geometric wireframe surface that blooms across the screen.

Phase 3 - Continuous State: The entire complex structure (core + wireframe) maintains a slow, majestic rotation. The wireframe surface undulates continuously using procedural simplex noise.

Phase 4 - Interactivity (Living Interface): The mesh acts as a "motion layer." It strictly tracks mouse coordinates (pointer, scroll, dwell). As the cursor moves over the canvas, the vertices of the wireframe physically repulse or distort around the pointer's radius, snapping back elastically when the cursor leaves.

UI & Typography Overlay (Z-Index above Canvas):




Text Color: Dark charcoal/almost black for high contrast against the light background. Font should be a modern, highly legible, ultra-thin sans-serif (e.g., Helvetica Now Display or Inter).

Header (Top Center): A dark, translucent pill-shaped navigation bar. Contains "Vesper" logo (left), links "Home, Services, Works, About" (center), and a "Contact Us" dropdown (right).

Main Headline (Middle Left): Huge, clean typography reading:

"Motion instead

of chrome"

Bottom Left Details: Small, uppercase technical monospace or sans-serif text reading:

"AN ABSTRACT THREE.JS PARTICLE ORB (0x00FFFF TO 0x8800FF) EXPLODING INTO AN INTRICATE, REAL-TIME PROCEDURAL WIREFRAME SURFACE."

Bottom Right Details: Small paragraph reading:

"A rendering and interaction layer that turns your presence into motion, now revealing complex geometric structures. Tuned to feel alive under every pointer."

CTA Button (Bottom Right): A solid rectangular button, deep teal/cyan background with white text reading "Send Request" accompanied by an asterisk-like icon.

Footer (Bottom Left): "[ LIVING INTERFACE ] • [ MOTION LAYER ] • [ MOTION LAYER ]"

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://bloom-core-mesh.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/00d31746-dba7-4b3e-b49f-6570c576b404).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
