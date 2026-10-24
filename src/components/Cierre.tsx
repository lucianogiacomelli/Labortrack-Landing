import { useRef } from "react";
import { cn } from "@/lib/cn";
import { MOTION, gsap, SplitText, useGSAP } from "@/lib/gsap";
import { enLaObra, equipo } from "@/content/landingContent";
import { boton, contenedor } from "@/lib/estilos";
import { BotonLogin, Seccion, SectionHeading } from "./ui";

export function EnLaObra() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION, () => {
        // El riel avanza con el scroll y cada hito se enciende cuando el riel lo alcanza.
        gsap.fromTo(
          "[data-riel]",
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: { trigger: "[data-hitos]", start: "top 65%", end: "bottom 55%", scrub: 0.5 },
          },
        );
        gsap.utils.toArray<HTMLElement>("[data-hito]").forEach((hito) => {
          const punto = hito.querySelector("[data-punto]");
          gsap.timeline({ scrollTrigger: { trigger: hito, start: "top 62%", toggleActions: "play none none reverse" } })
            .fromTo(punto, { scale: 0.4, backgroundColor: "#ffffff" }, {
              scale: 1,
              backgroundColor: "#fd942e",
              duration: 0.4,
              ease: "back.out(3)",
            })
            .from(hito.querySelectorAll("h3, p"), { x: 30, autoAlpha: 0, stagger: 0.08, duration: 0.6 }, "<");
        });
      });
    },
    { scope: ref },
  );

  return (
    <Seccion id="obra">
      <div ref={ref} className={contenedor}>
        <SectionHeading id="obra" eyebrow="En la obra" titulo="Pensado para el frente de obra, no solo para la oficina." />
        <div data-hitos className="relative mt-10 max-w-3xl pl-8">
          <span aria-hidden="true" className="absolute bottom-1.5 left-0 top-1.5 w-px bg-border" />
          <span data-riel aria-hidden="true" className="absolute bottom-1.5 left-[-0.5px] top-1.5 w-0.5 origin-top bg-accent" />
          <ul>
            {enLaObra.map((item) => (
              <li key={item.titulo} data-hito className="relative pb-10 last:pb-0">
                <span
                  data-punto
                  aria-hidden="true"
                  className="absolute -left-[37px] top-1 size-3 rounded-full border-2 border-accent bg-accent"
                />
                <h3 className="mb-1.5 text-lg font-bold tracking-tight">{item.titulo}</h3>
                <p className="max-w-xl leading-relaxed text-foreground-muted">{item.descripcion}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Seccion>
  );
}

export function Cta() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION, () => {
        const split = SplitText.create("h2", { type: "chars,words", mask: "chars" });
        gsap.timeline({ scrollTrigger: { trigger: ref.current, start: "top 70%" } })
          .from(split.chars, { yPercent: 120, stagger: 0.015, duration: 0.8, ease: "back.out(1.6)" })
          .from("[data-cta-texto]", { y: 20, autoAlpha: 0 }, "-=0.4")
          .from("[data-cta-acciones] > *", { y: 20, autoAlpha: 0, stagger: 0.1 }, "-=0.5");

        // Halo de marca que sigue lento el scroll.
        gsap.fromTo("[data-halo]", { yPercent: 30, rotate: -10 }, {
          yPercent: -30,
          rotate: 10,
          ease: "none",
          scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true },
        });
        return () => split.revert();
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className="relative overflow-hidden border-t border-border bg-primary text-white">
      <div
        data-halo
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[140%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(253_148_46/0.35),transparent)] blur-2xl"
      />
      <div className={cn(contenedor, "relative py-20 text-center md:py-28")}>
        <h2 className="mx-auto mb-5 max-w-2xl text-3xl font-bold leading-tight tracking-tight md:text-5xl">
          Digitalizá la gestión del personal de tus obras.
        </h2>
        <p data-cta-texto className="mx-auto mb-9 max-w-2xl text-lg leading-relaxed text-white/80">
          Desde el navegador, en la oficina o en la obra. Sin instalar nada.
        </p>
        <div data-cta-acciones className="flex flex-wrap items-center justify-center gap-3.5">
          <BotonLogin className={boton.accent} />
          <a href="#documentacion" className={cn(boton.outline, "border-white/40 bg-transparent text-white hover:bg-white/10")}>
            Ver documentación
          </a>
        </div>
      </div>
    </div>
  );
}

export function Footer() {
  return (
    <footer className={cn(contenedor, "pb-8 pt-12 text-sm text-foreground-muted")}>
      <div className="grid grid-cols-2 gap-7 md:grid-cols-4 md:gap-9">
        <div>
          <h3 className="mb-3.5 text-xs font-semibold uppercase tracking-[.17em] text-foreground">Proyecto</h3>
          <ul className="space-y-1.5 leading-relaxed">
            <li>Proyecto Final</li>
            <li>Ingeniería en Sistemas de Información</li>
            <li className="font-mono">UTN · Facultad Regional Mendoza · 2026</li>
          </ul>
        </div>
        <div>
          <h3 className="mb-3.5 text-xs font-semibold uppercase tracking-[.17em] text-foreground">Integrantes</h3>
          <ul className="space-y-1.5 leading-relaxed">
            {equipo.integrantes.map((nombre) => (
              <li key={nombre}>{nombre}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-3.5 text-xs font-semibold uppercase tracking-[.17em] text-foreground">Directores</h3>
          <ul className="space-y-1.5 leading-relaxed">
            {equipo.directores.map((nombre) => (
              <li key={nombre}>{nombre}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-3.5 text-xs font-semibold uppercase tracking-[.17em] text-foreground">Contacto</h3>
          <ul className="space-y-1.5 leading-relaxed">
            <li className="font-mono">Mendoza, Argentina</li>
          </ul>
        </div>
      </div>
      <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-6">
        <span>LaborTrack · Gestor integral de RR.HH. para obras civiles</span>
        <span className="font-mono">2026</span>
      </div>
    </footer>
  );
}
