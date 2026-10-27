import { useEffect, useId, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { RotateCcw, X, ZoomIn, ZoomOut } from "lucide-react";
import type { ImagenAmpliable } from "@/content/landingContent";
import { cn } from "@/lib/cn";
import { useZoomPan, type AjusteInicial } from "@/lib/useZoomPan";

export interface ContenidoVisor {
  titulo: string;
  // Con más de una imagen, el visor muestra pestañas.
  imagenes: ImagenAmpliable[];
  pie?: string;
  ajuste?: AjusteInicial;
}

// El visor tiene marco oscuro y la imagen, que trae su propio fondo, va sobre un neutro claro.
const botonVisor =
  "inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-control border border-[var(--lt-neutral-800)] px-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--lt-neutral-800)] focus-visible:outline-white disabled:pointer-events-none disabled:opacity-40";

function LienzoImagen({ imagen, ajuste, pie }: { imagen: ImagenAmpliable; ajuste?: AjusteInicial; pie?: string }) {
  const lienzo = useRef<HTMLDivElement>(null);
  const contenido = useRef<HTMLDivElement>(null);
  const { porcentaje, enMinimo, enMaximo, acercar, alejar, restablecer, alTeclear } = useZoomPan(
    lienzo,
    contenido,
    imagen.ancho,
    imagen.alto,
    ajuste,
  );

  return (
    <>
      <div
        ref={lienzo}
        role="group"
        aria-label="Área de la imagen. Flechas para moverse, + y − para el zoom, 0 para restablecer."
        tabIndex={0}
        onKeyDown={alTeclear}
        className="relative min-h-0 flex-1 cursor-grab touch-none select-none overflow-hidden bg-muted focus-visible:outline-offset-[-3px] data-[arrastrando]:cursor-grabbing"
      >
        <div ref={contenido} className="absolute left-0 top-0 w-full origin-top-left">
          {/* Se monta recién al abrir el visor o la pestaña: la descarga es diferida. */}
          <picture>
            <source srcSet={`${imagen.imagen}.webp`} type="image/webp" />
            <img
              src={`${imagen.imagen}.png`}
              width={imagen.ancho}
              height={imagen.alto}
              alt={imagen.alt}
              decoding="async"
              draggable={false}
              className="block h-auto w-full"
            />
          </picture>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-2 border-t border-[var(--lt-neutral-800)] px-4 py-3">
        <button type="button" onClick={alejar} disabled={enMinimo} aria-label="Alejar" className={botonVisor}>
          <ZoomOut className="size-4" />
        </button>
        <span className="w-14 text-center text-sm tabular-nums text-[var(--lt-neutral-300)]">{porcentaje} %</span>
        <button type="button" onClick={acercar} disabled={enMaximo} aria-label="Acercar" className={botonVisor}>
          <ZoomIn className="size-4" />
        </button>
        <button type="button" onClick={() => restablecer()} className={botonVisor}>
          <RotateCcw className="size-4" />
          <span className="max-sm:sr-only">Restablecer</span>
        </button>
        <p className="ml-auto hidden text-sm text-[var(--lt-neutral-300)] md:block">
          Arrastrá para moverte · rueda o pellizco para el zoom
        </p>
        {pie ? <p className="w-full text-xs text-[var(--lt-neutral-300)]">{pie}</p> : null}
      </div>
    </>
  );
}

function CuerpoVisor({ contenido, cerrar }: { contenido: ContenidoVisor; cerrar: () => void }) {
  const { titulo, imagenes, pie, ajuste } = contenido;
  const [activa, setActiva] = useState(0);
  const pestanas = useRef<(HTMLButtonElement | null)[]>([]);
  const idBase = useId();
  const conPestanas = imagenes.length > 1;
  const imagen = imagenes[activa];

  // Patrón de pestañas WAI-ARIA: flechas, Inicio y Fin mueven el foco y activan la pestaña.
  function alTeclearPestana(e: KeyboardEvent<HTMLButtonElement>) {
    const n = imagenes.length;
    const destinos: Record<string, number> = {
      ArrowRight: (activa + 1) % n,
      ArrowLeft: (activa - 1 + n) % n,
      Home: 0,
      End: n - 1,
    };
    const destino = destinos[e.key];
    if (destino === undefined) return;
    e.preventDefault();
    setActiva(destino);
    pestanas.current[destino]?.focus();
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-3 border-b border-[var(--lt-neutral-800)] px-4 py-3">
        <h2 className="min-w-0 flex-1 text-base font-bold tracking-tight md:text-lg">{titulo}</h2>
        <button type="button" onClick={cerrar} aria-label="Cerrar visor" className={cn(botonVisor, "w-10 px-0")}>
          <X className="size-5" />
        </button>
        {conPestanas ? (
          <div role="tablist" aria-label={titulo} className="flex w-full gap-1">
            {imagenes.map((img, i) => (
              <button
                key={img.id}
                ref={(el) => {
                  pestanas.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`${idBase}-pestana-${img.id}`}
                aria-selected={i === activa}
                aria-controls={`${idBase}-panel`}
                tabIndex={i === activa ? 0 : -1}
                onClick={() => setActiva(i)}
                onKeyDown={alTeclearPestana}
                className={cn(
                  "rounded-control border-b-2 px-3 py-2 text-sm font-semibold transition-colors focus-visible:outline-white",
                  i === activa
                    ? "border-accent text-white"
                    : "border-transparent text-[var(--lt-neutral-300)] hover:text-white",
                )}
              >
                {img.etiqueta}
              </button>
            ))}
          </div>
        ) : null}
      </div>
      <div
        id={`${idBase}-panel`}
        role={conPestanas ? "tabpanel" : undefined}
        aria-labelledby={conPestanas ? `${idBase}-pestana-${imagen.id}` : undefined}
        className="flex min-h-0 flex-1 flex-col"
      >
        {/* La key reinicia el zoom y monta la imagen de la pestaña al elegirla. */}
        <LienzoImagen key={imagen.id} imagen={imagen} ajuste={ajuste} pie={pie} />
      </div>
    </div>
  );
}

// En celular ocupa toda la pantalla. Se mide con dvw/dvh y margen 0 porque, si la página
// desborda en horizontal, el 100 % de un elemento fijo toma el ancho del desborde.
export function VisorImagen({ contenido, onCerrar }: { contenido: ContenidoVisor | null; onCerrar: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const presionEnFondo = useRef(false);

  useEffect(() => {
    const dialogo = ref.current!;
    if (contenido && !dialogo.open) dialogo.showModal();
  }, [contenido]);

  // Evita que la rueda desplace la página de fondo mientras el visor está abierto.
  useEffect(() => {
    const dialogo = ref.current!;
    const bloquear = (e: WheelEvent) => e.preventDefault();
    dialogo.addEventListener("wheel", bloquear, { passive: false });
    return () => dialogo.removeEventListener("wheel", bloquear);
  }, []);

  // El fondo es el propio <dialog>: se cierra solo si la presión y el clic ocurren ahí,
  // así un arrastre que termina fuera de la imagen no lo cierra.
  function alPresionar(e: PointerEvent<HTMLDialogElement>) {
    presionEnFondo.current = e.target === e.currentTarget;
  }

  return (
    <dialog
      ref={ref}
      aria-modal="true"
      aria-label={contenido ? contenido.titulo : undefined}
      onClose={onCerrar}
      onPointerDown={alPresionar}
      onClick={(e) => {
        if (presionEnFondo.current && e.target === e.currentTarget) ref.current!.close();
      }}
      className="visor-imagen m-0 h-dvh max-h-none w-dvw max-w-none touch-none overflow-hidden bg-[var(--lt-neutral-950)] p-0 text-white backdrop:bg-[var(--lt-neutral-950)]/70 sm:m-auto sm:h-[min(56rem,calc(100dvh-4rem))] sm:w-[min(80rem,calc(100vw-4rem))] sm:rounded-card sm:shadow-floating"
    >
      {contenido ? (
        <CuerpoVisor key={contenido.titulo} contenido={contenido} cerrar={() => ref.current!.close()} />
      ) : null}
    </dialog>
  );
}
