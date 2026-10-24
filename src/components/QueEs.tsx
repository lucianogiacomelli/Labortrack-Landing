import { useRef } from "react";
import { cn } from "@/lib/cn";
import { DESKTOP, MOBILE, gsap, useGSAP } from "@/lib/gsap";
import { pilares, type Pilar } from "@/content/landingContent";
import { contenedor } from "@/lib/estilos";
import { Seccion, SectionHeading } from "./ui";

function PilarCard({ pilar }: { pilar: Pilar }) {
  return (
    <article
      data-pilar
      className="rounded-lg border border-border bg-card px-7 py-6 shadow-soft transition-colors hover:border-primary/30"
    >
      <p className="mb-3 font-mono text-xs tracking-[.12em] text-accent-deep">{pilar.numero}</p>
      <h3 className="mb-2.5 text-xl font-bold tracking-tight">{pilar.titulo}</h3>
      <p className="leading-relaxed text-foreground-muted">{pilar.descripcion}</p>
    </article>
  );
}

export function QueEs() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Escritorio: la sección queda fija y las tarjetas convergen al centro con el scroll.
      mm.add(DESKTOP, () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: "[data-escena]",
            start: "center center",
            end: "+=1400",
            pin: true,
            scrub: 0.8,
          },
        });
        const origen = [
          { x: -180, y: -120 },
          { x: -180, y: 120 },
          { x: 180, y: -120 },
          { x: 180, y: 120 },
        ];
        tl.from("[data-conector]", { drawSVG: "50% 50%", duration: 1, ease: "none" })
          .from("[data-centro]", { scale: 0.4, autoAlpha: 0, duration: 0.8 }, 0);
        gsap.utils.toArray<HTMLElement>("[data-pilar]").forEach((card, i) => {
          tl.from(card, { ...origen[i], autoAlpha: 0, rotate: origen[i].x < 0 ? -6 : 6, duration: 1 }, 0.6 + i * 0.6);
        });
        tl.to("[data-orbita]", { rotate: 360, duration: tl.duration(), ease: "none", transformOrigin: "50% 50%" }, 0);
      });

      // Celular: las tarjetas se apilan, así que cada una entra desde su lado al llegar a ella.
      mm.add(MOBILE, () => {
        gsap.utils.toArray<HTMLElement>("[data-pilar]").forEach((card, i) => {
          const lado = i < 2 ? -1 : 1;
          gsap.from(card, {
            x: lado * 60,
            rotate: lado * 4,
            autoAlpha: 0,
            duration: 0.8,
            scrollTrigger: { trigger: card, start: "top 88%" },
          });
        });
      });
    },
    { scope: ref },
  );

  const izquierda = [pilares[0], pilares[1]];
  const derecha = [pilares[2], pilares[3]];

  return (
    <Seccion id="que-es">
      <div ref={ref} className={contenedor}>
        <SectionHeading
          id="que-es"
          eyebrow="Qué es"
          titulo="La planilla de obra, pero que no se pierde."
          bajada="En la construcción, las horas se anotan en papel, los legajos viven en carpetas y el trabajador no sabe qué le liquidaron. LaborTrack centraliza la relación laboral en un registro digital e inalterable, desde la oficina hasta el frente de obra."
        />
        <div data-escena className="mt-14 grid items-center gap-6 lg:min-h-[70vh] lg:grid-cols-[1fr_auto_1fr]">
          <div className="flex flex-col gap-7">
            {izquierda.map((pilar) => (
              <PilarCard key={pilar.numero} pilar={pilar} />
            ))}
          </div>
          <div className={cn("relative hidden place-items-center lg:grid lg:w-56")}>
            <svg viewBox="0 0 210 250" className="h-64 w-56 overflow-visible" aria-hidden="true">
              <path
                data-conector
                fill="none"
                stroke="var(--lt-border-strong)"
                strokeWidth="1.5"
                d="M0 62h64c11 0 19 9 19 19v28M210 62h-64c-11 0-19 9-19 19v28M0 188h64c11 0 19-9 19-19v-28M210 188h-64c-11 0-19-9-19-19v-28"
              />
              <circle data-orbita cx="105" cy="125" r="50" fill="none" stroke="var(--lt-orange-500)" strokeWidth="1.5" strokeDasharray="3 7" />
            </svg>
            <p data-centro className="pointer-events-none absolute text-center">
              <small className="mb-1 block text-xs uppercase tracking-[.18em] text-foreground-muted">
                Un solo panel
              </small>
              <b className="text-lg font-bold tracking-tight">Tu personal</b>
            </p>
          </div>
          <div className="flex flex-col gap-7">
            {derecha.map((pilar) => (
              <PilarCard key={pilar.numero} pilar={pilar} />
            ))}
          </div>
        </div>
      </div>
    </Seccion>
  );
}
