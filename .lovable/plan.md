# Two-phase particle hero animation

Keep the current palette, background, layout and copy exactly as they are. All work happens inside `src/components/hero/VesperScene.tsx`.

## Phase 1 — the unstable orb (particles only)

- Rebuild the core as a single dense particle cloud (~40k points) sampled on a closed, roughly spherical/lobed shell, matching the reference: particles sit on the surface, denser toward the silhouette edges, with a hollow center so you see through it.
- Surface irregularities: displace each particle along its normal with layered noise (large lobes + fine ripple), so the shell bulges and puckers instead of reading as a smooth sphere.
- Pre-explosion tension: slow rotation, a rising breathing pulse, and a few noise "hot spots" that swell and jitter faster over time so it feels about to burst.
- No wireframe is drawn during this phase — the wireframe mesh stays at zero opacity.

## Transition — the explosion

- Triggered on a timeline (a few seconds after load) and re-triggerable on click.
- Particles get outward velocities from their own surface normal plus noise, accelerate hard in a short burst, then decelerate.
- As they fly out, each particle is retargeted to a vertex position on the complex wireframe surface and eases into it, so the debris resolves into structure rather than just fading.
- Wireframe lines fade in during the second half of the burst, matched to particle arrival.

## Phase 2 — the wireframe surface

- The existing procedural wireframe surface, with its undulation and elastic pointer repulsion, kept as-is.
- Particles remain as accent points sitting on the wireframe so both readings coexist.

## Technical notes

- Single `THREE.Points` buffer reused across all phases (base position, normal, explode velocity, wireframe target stored as attributes) so nothing is allocated per frame.
- Phase driven by one normalized `phase` value (0 = orb, 1 = wireframe) with an eased curve; per-particle stagger from a random offset so the burst is not uniform.
- Colors keep the current cyan→purple gradient mapping and existing tokens; no CSS or copy changes.
