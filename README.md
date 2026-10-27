# LaborTrack · Landing

Landing pública de LaborTrack, gestor integral de RR.HH. para obras civiles (Proyecto Final, Ingeniería en Sistemas de Información, UTN FRM 2026).

## Stack

- Vite + React + TypeScript
- Tailwind CSS 4 con los tokens de diseño de la app (`src/styles/tokens.css`)
- GSAP 3 (ScrollTrigger, SplitText, DrawSVG, MotionPath) con `@gsap/react`

## Desarrollo

```bash
npm install
cp .env.example .env   # VITE_APP_URL: URL de la app (por defecto https://labortrack-frontend.vercel.app)
npm run dev
```

`npm run build` genera `dist/`. `npm run lint` corre ESLint.

## Contenido

Todos los textos y datos están en `src/content/landingContent.ts`, tomados del documento de Factibilidad y Diseño.

- **Documentación técnica:** cada tarjeta tiene un botón "Ver" que abre sus `diagramas` en el visor. Para publicar un diagrama nuevo (en una tarjeta existente o en una nueva entrada de `documentacion`):
  1. Copiar el `.png` en `public/diagramas/` y generar su `.webp` (ver abajo). Los diagramas no tienen PDF.
  2. Agregar una entrada en `diagramas` con `id`, `etiqueta` (nombre de la pestaña), `imagen` (ruta sin extensión), `ancho` y `alto` reales del PNG y un `alt` escrito mirando la imagen.

  La tarjeta abre el visor (`VisorImagen`) con zoom, arrastre y, si hay más de un diagrama, pestañas. El pie del visor sale de `pieDiagramas`.
- **Pantallas:** cada pantalla sin `captura` muestra un marcador. Para usar una captura, copiar el `.png` en `public/capturas/`, generar su `.webp` y completar `captura` con los mismos campos que un diagrama. El orden del arreglo arma las filas de la galería: una captura de escritorio junto a una de celular, o dos de escritorio juntas.

### Regenerar los WebP

Las imágenes se sirven en WebP, con el PNG como respaldo dentro de `<picture>`. Después de agregar o reemplazar un PNG (con el mismo nombre de archivo), regenerar los WebP de la carpeta:

```bash
python scripts/webp.py public/capturas
python scripts/webp.py public/diagramas
```

El script necesita Pillow (`pip install pillow`), que no es dependencia del proyecto. No modifica los PNG: para cada uno escribe el `.webp` más chico entre calidad 90 y sin pérdida. Si cambian las dimensiones de una imagen, actualizar `ancho` y `alto` en `landingContent.ts`.

## Animaciones

Cada sección registra sus animaciones con `useGSAP` y `gsap.matchMedia()`:

- Escritorio (≥ 1024 px): secciones fijas con scroll (Qué es, Módulos en horizontal) y parallax.
- Móvil: entradas simples al hacer scroll.
- Con `prefers-reduced-motion: reduce` no corre ninguna animación y el contenido se muestra en su estado final.
