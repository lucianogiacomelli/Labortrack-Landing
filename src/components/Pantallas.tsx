import { useId, useRef, useState } from "react";
import { ImageIcon, Maximize2, Monitor, Smartphone } from "lucide-react";
import { cn } from "@/lib/cn";
import { MOTION, gsap, useGSAP } from "@/lib/gsap";
import { pantallas, type Pantalla } from "@/content/landingContent";
import { contenedor } from "@/lib/estilos";
import { Seccion, SectionHeading } from "./ui";
import { VisorImagen, type ContenidoVisor } from "./VisorImagen";

// En escritorio la galería tiene 6 columnas y se arma de a pares: una captura de escritorio
// junto a una de celular ocupa 4 + 2 columnas; dos del mismo formato, 3 + 3.
function columnas(lista: Pantalla[]) {
  return lista.map((pantalla, i) => {
    const pareja = lista[i % 2 === 0 ? i + 1 : i - 1];
    const esMovil = pantalla.formato === "movil";
    const tamanio = !pareja ? "lg:col-span-6" : pareja.formato === pantalla.formato ? "lg:col-span-3" : esMovil ? "lg:col-span-2" : "lg:col-span-4";
    return cn(tamanio, !esMovil && "sm:col-span-2");
  });
}

function PantallaCard({
  pantalla,
  className,
  onAmpliar,
}: {
  pantalla: Pantalla;
  className?: string;
  onAmpliar: (disparador: HTMLButtonElement) => void;
}) {
  const idDescripcion = useId();
  const esMovil = pantalla.formato === "movil";
  const IconoFormato = esMovil ? Smartphone : Monitor;
  const captura = pantalla.captura;

  return (
    <figure data-pantalla className={cn("flex flex-col", className)}>
      {captura ? (
        // El marco toma la proporción de la captura: no hay recorte. En celular, la altura
        // acompaña a la de las capturas de escritorio de la misma fila.
        <button
          data-marco
          type="button"
          onClick={(e) => onAmpliar(e.currentTarget)}
          aria-label={`Ampliar captura: ${pantalla.titulo}`}
          aria-describedby={idDescripcion}
          style={{ aspectRatio: `${captura.ancho} / ${captura.alto}` }}
          className={cn(
            "group relative block cursor-zoom-in overflow-hidden rounded-card border border-border bg-subtle shadow-soft transition-colors hover:border-border-strong",
            esMovil ? "mx-auto h-[26rem] lg:h-[min(22.5rem,28vw)]" : "w-full",
          )}
        >
          <picture>
            <source srcSet={`${captura.imagen}.webp`} type="image/webp" />
            <img
              src={`${captura.imagen}.png`}
              width={captura.ancho}
              height={captura.alto}
              alt={captura.alt}
              loading="lazy"
              decoding="async"
              className="block size-full"
            />
          </picture>
          <span
            aria-hidden="true"
            className="absolute right-3 top-3 flex size-9 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-soft transition-colors group-hover:text-primary"
          >
            <Maximize2 className="size-4" />
          </span>
        </button>
      ) : (
        <div
          data-marco
          className={cn(
            "flex aspect-[4/3] items-center justify-center overflow-hidden rounded-card border border-border bg-subtle",
            esMovil && "p-4",
          )}
        >
          <div
            className={cn(
              "flex flex-col items-center justify-center gap-2 border-2 border-dashed border-border-strong text-foreground-muted",
              esMovil ? "aspect-[9/16] h-full rounded-2xl" : "size-[calc(100%-2rem)] rounded-lg",
            )}
          >
            <ImageIcon className="size-6" />
            <span className="px-2 text-center text-xs font-semibold uppercase tracking-wide">Captura pendiente</span>
          </div>
        </div>
      )}
      <figcaption className={cn("mt-4", esMovil && captura && "mx-auto w-full max-w-xs")}>
        <p className="flex items-center gap-2 font-bold tracking-tight">
          <IconoFormato className="size-4 text-accent-deep" aria-hidden="true" />
          {pantalla.titulo}
        </p>
        <p id={idDescripcion} className="mt-1 text-sm leading-relaxed text-foreground-muted">
          {pantalla.descripcion}
        </p>
      </figcaption>
    </figure>
  );
}

export function Pantallas() {
  const ref = useRef<HTMLDivElement>(null);
  const [abierto, setAbierto] = useState<ContenidoVisor | null>(null);
  const disparador = useRef<HTMLButtonElement | null>(null);
  const clases = columnas(pantallas);

  function abrir(pantalla: Pantalla, elemento: HTMLButtonElement) {
    disparador.current = elemento;
    setAbierto({ titulo: pantalla.titulo, imagenes: [pantalla.captura!], ajuste: "entera" });
  }

  // Al cerrar el visor, el foco vuelve a la captura que lo abrió.
  function cerrar() {
    setAbierto(null);
    disparador.current?.focus();
  }

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Solo entrada: el marco se abre y el pie sube. Sin desplazamiento ligado al scroll.
      mm.add(MOTION, () => {
        gsap.utils.toArray<HTMLElement>("[data-pantalla]").forEach((figura) => {
          gsap.from(figura.querySelector("[data-marco]"), {
            clipPath: "inset(12% 12% 12% 12% round 16px)",
            scale: 0.9,
            duration: 1.2,
            ease: "expo.out",
            scrollTrigger: { trigger: figura, start: "top 88%" },
          });
          gsap.from(figura.querySelector("figcaption"), {
            y: 20,
            autoAlpha: 0,
            scrollTrigger: { trigger: figura, start: "top 80%" },
          });
        });
      });
    },
    { scope: ref },
  );

  return (
    <Seccion id="pantallas" className="overflow-hidden">
      <div ref={ref} className={contenedor}>
        <SectionHeading
          id="pantallas"
          eyebrow="Pantallas"
          titulo="Escritorio para la oficina, celular para la obra."
          bajada="Una misma web responsiva con dos experiencias según el rol y el lugar de trabajo."
        />
        <div className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-6">
          {pantallas.map((pantalla, i) => (
            <PantallaCard
              key={pantalla.titulo}
              pantalla={pantalla}
              className={clases[i]}
              onAmpliar={(elemento) => abrir(pantalla, elemento)}
            />
          ))}
        </div>
      </div>
      <VisorImagen contenido={abierto} onCerrar={cerrar} />
    </Seccion>
  );
}
