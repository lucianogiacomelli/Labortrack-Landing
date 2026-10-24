import { useRef } from "react";
import { DESKTOP, MOBILE, gsap, useGSAP } from "@/lib/gsap";
import { modulos } from "@/content/landingContent";
import { contenedor } from "@/lib/estilos";
import { Seccion, SectionHeading } from "./ui";

export function Modulos() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Escritorio: la fila de módulos se desplaza en horizontal mientras la sección queda fija.
      mm.add(DESKTOP, () => {
        const pista = ref.current!.querySelector<HTMLElement>("[data-pista]")!;
        const distancia = () => pista.scrollWidth - window.innerWidth;

        const desplazamiento = gsap.to(pista, {
          x: () => -distancia(),
          ease: "none",
          scrollTrigger: {
            trigger: "[data-carril]",
            start: "center center",
            end: () => `+=${distancia()}`,
            pin: true,
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });

        gsap.to("[data-avance]", {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: "[data-carril]",
            start: "center center",
            end: () => `+=${distancia()}`,
            scrub: true,
            invalidateOnRefresh: true,
          },
        });

        // Cada tarjeta se levanta al entrar por la derecha.
        gsap.utils.toArray<HTMLElement>("[data-modulo]").forEach((card) => {
          gsap.from(card, {
            y: 60,
            rotate: 4,
            autoAlpha: 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              containerAnimation: desplazamiento,
              start: "left 95%",
              end: "left 65%",
              scrub: true,
            },
          });
        });
      });

      mm.add(MOBILE, () => {
        gsap.from("[data-modulo]", {
          y: 30,
          autoAlpha: 0,
          stagger: 0.08,
          duration: 0.6,
          scrollTrigger: { trigger: "[data-pista]", start: "top 85%" },
        });
      });
    },
    { scope: ref },
  );

  return (
    <Seccion id="modulos" className="overflow-hidden">
      <div ref={ref}>
        <div className={contenedor}>
          <SectionHeading
            id="modulos"
            eyebrow="Módulos"
            titulo="Todo el ciclo del trabajador, de la contratación al recibo."
          />
        </div>
        <div data-carril className="mt-10 lg:motion-safe:flex lg:motion-safe:min-h-[60vh] lg:motion-safe:flex-col lg:motion-safe:justify-center">
          <ul
            data-pista
            className="mx-auto grid max-w-[1280px] gap-4 px-4 sm:grid-cols-2 md:px-9 lg:grid-cols-4 lg:motion-safe:mx-0 lg:motion-safe:flex lg:motion-safe:w-max lg:motion-safe:max-w-none lg:motion-safe:gap-6 lg:motion-safe:pl-[max(2.25rem,calc((100vw-1280px)/2+2.25rem))] lg:motion-safe:pr-[20vw]"
          >
            {modulos.map(({ icono: Icono, titulo, descripcion }, i) => (
              <li
                key={titulo}
                data-modulo
                className="group relative flex flex-col overflow-hidden rounded-card border border-border bg-card p-6 shadow-soft lg:motion-safe:h-72 lg:motion-safe:w-72"
              >
                <span className="absolute right-5 top-4 font-mono text-5xl font-bold text-primary/[0.07]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="mb-6 flex size-12 items-center justify-center rounded-lg bg-primary-soft text-primary transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110">
                  <Icono className="size-6" strokeWidth={1.75} aria-hidden="true" />
                </span>
                <h3 className="mb-2 text-lg font-bold tracking-tight">{titulo}</h3>
                <p className="leading-relaxed text-foreground-muted">{descripcion}</p>
                <span className="mt-auto hidden h-0.5 w-10 bg-accent transition-all duration-300 group-hover:w-20 lg:block" />
              </li>
            ))}
          </ul>
          <div className={`${contenedor} mt-8 hidden lg:motion-safe:block`} aria-hidden="true">
            <div className="h-0.5 bg-border">
              <div data-avance className="h-full origin-left scale-x-0 bg-accent" />
            </div>
          </div>
        </div>
      </div>
    </Seccion>
  );
}
