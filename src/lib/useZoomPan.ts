import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type RefObject } from "react";

// Zoom y desplazamiento de una imagen dentro de un lienzo: rueda del mouse,
// pellizco, arrastre y teclado. Escala 1 = imagen ajustada al ancho del lienzo.
// La vista inicial se ajusta al ancho o a la imagen entera, sin agrandarla por
// encima de su tamaño real.

export type AjusteInicial = "ancho" | "entera";

const PASO = 1.25;
const PASO_TECLADO = 48;
const REDUCIR = "(prefers-reduced-motion: reduce)";

interface Vista {
  escala: number;
  x: number;
  y: number;
}

const acotar = (valor: number, min: number, max: number) => Math.min(Math.max(valor, min), max);

export function useZoomPan(
  lienzoRef: RefObject<HTMLElement | null>,
  contenidoRef: RefObject<HTMLElement | null>,
  ancho: number,
  alto: number,
  ajuste: AjusteInicial = "ancho",
) {
  const vista = useRef<Vista>({ escala: 1, x: 0, y: 0 });
  // Porcentaje respecto de la vista inicial: al abrir siempre muestra 100 %.
  const [porcentaje, setPorcentaje] = useState(100);
  const [enMinimo, setEnMinimo] = useState(false);
  const [enMaximo, setEnMaximo] = useState(false);

  // Se puede alejar hasta ver la imagen entera y acercar hasta 4 veces la vista inicial
  // o 1,5 veces la resolución real, lo que sea mayor.
  // Devuelve null mientras el lienzo no tiene tamaño: el hook se monta antes de que el <dialog> se abra.
  const medir = useCallback(() => {
    const lienzo = lienzoRef.current!;
    const anchoLienzo = lienzo.clientWidth;
    const altoLienzo = lienzo.clientHeight;
    if (anchoLienzo === 0 || altoLienzo === 0) return null;
    const altoImagen = (anchoLienzo * alto) / ancho;
    const entera = Math.min(1, altoLienzo / altoImagen);
    const real = ancho / anchoLienzo;
    const inicial = Math.min(ajuste === "ancho" ? 1 : entera, real);
    return {
      anchoLienzo,
      altoLienzo,
      altoImagen,
      inicial,
      min: Math.min(entera, inicial),
      max: Math.max(inicial * 4, real * 1.5),
    };
  }, [lienzoRef, ancho, alto, ajuste]);

  // Si la imagen es más chica que el lienzo se centra; si no, no puede dejar huecos en los bordes.
  const aplicar = useCallback(
    (destino: Vista, animado = false) => {
      const medidas = medir();
      if (!medidas) return null;
      const { anchoLienzo, altoLienzo, altoImagen, inicial, min, max } = medidas;
      const nueva = acotar(destino.escala, min, max);
      const w = anchoLienzo * nueva;
      const h = altoImagen * nueva;
      const x = w <= anchoLienzo ? (anchoLienzo - w) / 2 : acotar(destino.x, anchoLienzo - w, 0);
      const y = h <= altoLienzo ? (altoLienzo - h) / 2 : acotar(destino.y, altoLienzo - h, 0);
      vista.current = { escala: nueva, x, y };

      const contenido = contenidoRef.current!;
      contenido.style.transition =
        animado && !window.matchMedia(REDUCIR).matches ? "transform 200ms ease-out" : "none";
      contenido.style.transform = `translate(${x}px, ${y}px) scale(${nueva})`;
      return { escala: nueva, inicial, min, max };
    },
    [medir, contenidoRef],
  );

  const mover = useCallback(
    (destino: Vista, animado = false) => {
      const resultado = aplicar(destino, animado);
      if (!resultado) return;
      const { escala, inicial, min, max } = resultado;
      setPorcentaje(Math.round((escala / inicial) * 100));
      setEnMinimo(escala <= min + 1e-3);
      setEnMaximo(escala >= max - 1e-3);
    },
    [aplicar],
  );

  // Cambia la escala manteniendo fijo el punto (px, py) del lienzo.
  const zoomEn = useCallback(
    (factor: number, px: number, py: number, animado = false) => {
      const medidas = medir();
      if (!medidas) return;
      const { min, max } = medidas;
      const { escala: actual, x, y } = vista.current;
      const nueva = acotar(actual * factor, min, max);
      const k = nueva / actual;
      mover({ escala: nueva, x: px - (px - x) * k, y: py - (py - y) * k }, animado);
    },
    [medir, mover],
  );

  const zoomAlCentro = useCallback(
    (factor: number) => {
      const lienzo = lienzoRef.current!;
      zoomEn(factor, lienzo.clientWidth / 2, lienzo.clientHeight / 2, true);
    },
    [lienzoRef, zoomEn],
  );

  const acercar = useCallback(() => zoomAlCentro(PASO), [zoomAlCentro]);
  const alejar = useCallback(() => zoomAlCentro(1 / PASO), [zoomAlCentro]);
  const restablecer = useCallback(
    (animado = true) => {
      const medidas = medir();
      if (medidas) mover({ escala: medidas.inicial, x: 0, y: 0 }, animado);
    },
    [medir, mover],
  );

  useEffect(() => {
    const lienzo = lienzoRef.current!;
    let iniciada = false;

    const punteros = new Map<number, { x: number; y: number }>();
    let pellizco: { distancia: number; cx: number; cy: number } | null = null;

    const local = (e: PointerEvent | WheelEvent) => {
      const caja = lienzo.getBoundingClientRect();
      return { x: e.clientX - caja.left, y: e.clientY - caja.top };
    };

    const medirPellizco = () => {
      const [a, b] = [...punteros.values()];
      return { distancia: Math.hypot(a.x - b.x, a.y - b.y), cx: (a.x + b.x) / 2, cy: (a.y + b.y) / 2 };
    };

    const alPresionar = (e: PointerEvent) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      lienzo.setPointerCapture(e.pointerId);
      punteros.set(e.pointerId, local(e));
      pellizco = punteros.size === 2 ? medirPellizco() : null;
      lienzo.dataset.arrastrando = "";
    };

    const alMover = (e: PointerEvent) => {
      const anterior = punteros.get(e.pointerId);
      if (!anterior) return;
      const actual = local(e);
      punteros.set(e.pointerId, actual);

      if (punteros.size === 1) {
        const { escala, x, y } = vista.current;
        mover({ escala, x: x + actual.x - anterior.x, y: y + actual.y - anterior.y });
      } else if (punteros.size === 2 && pellizco && pellizco.distancia > 0) {
        // El pellizco desplaza con el punto medio de los dedos y escala con su distancia.
        const nuevo = medirPellizco();
        vista.current.x += nuevo.cx - pellizco.cx;
        vista.current.y += nuevo.cy - pellizco.cy;
        zoomEn(nuevo.distancia / pellizco.distancia, nuevo.cx, nuevo.cy);
        pellizco = nuevo;
      }
    };

    const alSoltar = (e: PointerEvent) => {
      punteros.delete(e.pointerId);
      pellizco = punteros.size === 2 ? medirPellizco() : null;
      if (punteros.size === 0) delete lienzo.dataset.arrastrando;
    };

    const alGirarRueda = (e: WheelEvent) => {
      e.preventDefault();
      const { x, y } = local(e);
      const delta = e.deltaMode === WheelEvent.DOM_DELTA_LINE ? e.deltaY * 16 : e.deltaY;
      zoomEn(Math.exp(-delta * 0.0015), x, y);
    };

    // La primera vez que el lienzo tiene tamaño (al abrir el <dialog>) se aplica la vista inicial.
    // Después, al rotar el celular o redimensionar la ventana, se vuelve a acotar la vista.
    const observador = new ResizeObserver(() => {
      if (!medir()) return;
      if (iniciada) return mover(vista.current);
      iniciada = true;
      restablecer(false);
    });
    observador.observe(lienzo);

    lienzo.addEventListener("pointerdown", alPresionar);
    lienzo.addEventListener("pointermove", alMover);
    lienzo.addEventListener("pointerup", alSoltar);
    lienzo.addEventListener("pointercancel", alSoltar);
    lienzo.addEventListener("wheel", alGirarRueda, { passive: false });
    return () => {
      observador.disconnect();
      lienzo.removeEventListener("pointerdown", alPresionar);
      lienzo.removeEventListener("pointermove", alMover);
      lienzo.removeEventListener("pointerup", alSoltar);
      lienzo.removeEventListener("pointercancel", alSoltar);
      lienzo.removeEventListener("wheel", alGirarRueda);
    };
  }, [lienzoRef, medir, mover, zoomEn, restablecer]);

  // Flechas para moverse, + y − para el zoom y 0 para restablecer.
  const alTeclear = (e: KeyboardEvent<HTMLElement>) => {
    const desplazamientos: Record<string, [number, number]> = {
      ArrowLeft: [PASO_TECLADO, 0],
      ArrowRight: [-PASO_TECLADO, 0],
      ArrowUp: [0, PASO_TECLADO],
      ArrowDown: [0, -PASO_TECLADO],
    };
    const desplazamiento = desplazamientos[e.key];
    if (desplazamiento) {
      const { escala, x, y } = vista.current;
      mover({ escala, x: x + desplazamiento[0], y: y + desplazamiento[1] });
    } else if (e.key === "+" || e.key === "=") acercar();
    else if (e.key === "-") alejar();
    else if (e.key === "0") restablecer();
    else return;
    e.preventDefault();
  };

  return { porcentaje, enMinimo, enMaximo, acercar, alejar, restablecer, alTeclear };
}
