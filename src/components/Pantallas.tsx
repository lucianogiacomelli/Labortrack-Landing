import { useRef } from "react";
import { ImageIcon, Monitor, Smartphone } from "lucide-react";
import { cn } from "@/lib/cn";
import { DESKTOP, MOTION, gsap, useGSAP } from "@/lib/gsap";
import { pantallas, type Pantalla } from "@/content/landingContent";
import { contenedor } from "@/lib/estilos";
import { Seccion, SectionHeading } from "./ui";

function PantallaCard({ pantalla, indice }: { pantalla: Pantalla; indice: number }) {
  const esMovil = pantalla.formato === "movil";
  const IconoFormato = esMovil ? Smartphone : Monitor;
  return (
    <figure data-pantalla data-velocidad={[0, 1, 2][indice % 3]} className="flex flex-col">
      <div
        data-marco
        className={cn(
          "flex aspect-[4/3] items-center justify-center overflow-hidden rounded-card border border-border bg-subtle",
          esMovil && "p-4",
        )}
      >
        {pantalla.src ? (
          <img
            data-captura
            src={pantalla.src}
            alt={`Captura de ${pantalla.titulo}`}
            loading="lazy"
            className={cn("size-full", esMovil ? "object-contain" : "h-[130%] object-cover object-top")}
          />
        ) : (
          <div
            className={cn(
              "flex flex-col items-center justify-center gap-2 border-2 border-dashed border-border-strong text-foreground-muted",
              esMovil ? "aspect-[9/16] h-full rounded-2xl" : "size-[calc(100%-2rem)] rounded-lg",
            )}
          >
            <ImageIcon className="size-6" />
            <span className="px-2 text-center text-xs font-semibold uppercase tracking-wide">Captura pendiente</span>
          </div>
        )}
      </div>
      <figcaption className="mt-4">
        <p className="flex items-center gap-2 font-bold tracking-tight">
          <IconoFormato className="size-4 text-accent-deep" aria-hidden="true" />
          {pantalla.titulo}
        </p>
        <p className="mt-1 text-sm leading-relaxed text-foreground-muted">{pantalla.descripcion}</p>
      </figcaption>
    </figure>
  );
}

export function Pantallas() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

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
          // La captura se desplaza dentro del marco, como si alguien navegara la pantalla.
          const captura = figura.querySelector("[data-captura]");
          if (captura) {
            gsap.fromTo(captura, { yPercent: 0 }, {
              yPercent: -20,
              ease: "none",
              scrollTrigger: { trigger: figura, start: "top bottom", end: "bottom top", scrub: true },
            });
          }
        });
      });

      // Escritorio: cada columna avanza a distinta velocidad.
      mm.add(DESKTOP, () => {
        gsap.utils.toArray<HTMLElement>("[data-pantalla]").forEach((figura) => {
          const velocidad = Number(figura.dataset.velocidad);
          gsap.fromTo(
            figura,
            { y: velocidad * 60 },
            {
              y: -velocidad * 60,
              ease: "none",
              scrollTrigger: { trigger: "[data-galeria]", start: "top bottom", end: "bottom top", scrub: true },
            },
          );
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
        <div data-galeria className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 lg:py-16">
          {pantallas.map((pantalla, i) => (
            <PantallaCard key={pantalla.titulo} pantalla={pantalla} indice={i} />
          ))}
        </div>
      </div>
    </Seccion>
  );
}
