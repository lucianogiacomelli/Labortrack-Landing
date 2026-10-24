# LaborTrack · Landing

Landing pública de LaborTrack, gestor integral de RR.HH. para obras civiles (Proyecto Final, Ingeniería en Sistemas de Información, UTN FRM 2026).

## Stack

- Vite + React + TypeScript
- Tailwind CSS 4 con los tokens de diseño de la app (`src/styles/tokens.css`)
- GSAP 3 (ScrollTrigger, SplitText, DrawSVG, MotionPath) con `@gsap/react`

## Desarrollo

```bash
npm install
cp .env.example .env   # VITE_APP_URL: URL de la app para "Iniciar sesión"
npm run dev
```

`npm run build` genera `dist/`. `npm run lint` corre ESLint.

## Contenido

Todos los textos y datos están en `src/content/landingContent.ts`, tomados del documento de Factibilidad y Diseño.

- **Documentación técnica:** cada recurso sin `href` se muestra como "Próximamente". Para publicar un diagrama, agregar el archivo en `public/` y completar `href`.
- **Pantallas:** cada pantalla sin `src` muestra un marcador. Para usar una captura, agregar la imagen en `public/` y completar `src`.

## Animaciones

Cada sección registra sus animaciones con `useGSAP` y `gsap.matchMedia()`:

- Escritorio (≥ 1024 px): secciones fijas con scroll (Qué es, Módulos en horizontal) y parallax.
- Móvil: entradas simples al hacer scroll.
- Con `prefers-reduced-motion: reduce` no corre ninguna animación y el contenido se muestra en su estado final.
