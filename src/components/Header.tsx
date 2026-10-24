import { useRef, useState } from "react";
import { Building2, Menu, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { MOTION, gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { navSections } from "@/content/landingContent";
import { contenedor } from "@/lib/estilos";
import { BotonLogin } from "./ui";

export function Header() {
  const ref = useRef<HTMLElement>(null);
  const [abierto, setAbierto] = useState(false);

  useGSAP(
    () => {
      // Sombra al dejar el tope de la página (también sin animaciones).
      ScrollTrigger.create({
        start: 8,
        end: "max",
        toggleClass: { targets: ref.current, className: "header-scrolleado" },
      });

      const mm = gsap.matchMedia();
      mm.add(MOTION, () => {
        gsap.from(ref.current, { yPercent: -100, duration: 0.8, ease: "power3.out" });
        // La franja de marca funciona como barra de progreso de lectura.
        gsap.fromTo(
          "[data-progreso]",
          { scaleX: 0 },
          { scaleX: 1, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: 0.3 } },
        );
      });

      // Resalta el link de la sección visible.
      navSections.forEach((seccion) => {
        // El scope de useGSAP solo cubre el header: se pasa el elemento, no el selector.
        ScrollTrigger.create({
          trigger: document.getElementById(seccion.id),
          start: "top center",
          end: "bottom center",
          toggleClass: { targets: `[data-nav="${seccion.id}"]`, className: "nav-activo" },
          refreshPriority: -1,
        });
      });
    },
    { scope: ref },
  );

  return (
    <header
      ref={ref}
      className="sticky top-0 z-50 border-b border-border bg-card/85 backdrop-blur-md transition-shadow [&.header-scrolleado]:shadow-floating"
    >
      <div className="h-1 bg-border">
        <div
          data-progreso
          className="h-full origin-left bg-gradient-to-r from-accent-deep via-accent to-sunset"
        />
      </div>
      <div className={cn(contenedor, "flex items-center justify-between gap-3 py-3 sm:gap-6")}>
        <a href="#inicio" className="flex items-center gap-3" aria-label="LaborTrack, inicio">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary text-white">
            <Building2 className="size-6" strokeWidth={1.75} />
          </span>
          <span className="flex flex-col">
            <span className="text-xl font-bold leading-none tracking-tight">LaborTrack</span>
            <span className="mt-1 hidden text-[11px] font-semibold uppercase tracking-wider text-accent-deep sm:block">
              Control de Personal
            </span>
          </span>
        </a>
        <nav aria-label="Secciones de la página" className="mr-auto ml-6 hidden gap-6 text-sm font-medium lg:flex">
          {navSections.map((seccion) => (
            <a
              key={seccion.id}
              data-nav={seccion.id}
              href={`#${seccion.id}`}
              className="relative py-1 text-foreground-muted transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-left after:scale-x-0 after:bg-accent after:transition-transform hover:text-primary [&.nav-activo]:text-primary [&.nav-activo]:after:scale-x-100"
            >
              {seccion.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <BotonLogin className="hidden h-10 px-4 sm:inline-flex" />
          <button
            type="button"
            className="flex size-10 items-center justify-center rounded-lg text-foreground lg:hidden"
            aria-expanded={abierto}
            aria-controls="menu-movil"
            aria-label={abierto ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setAbierto((valor) => !valor)}
          >
            {abierto ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>
      {abierto ? (
        <nav id="menu-movil" aria-label="Secciones de la página" className="border-t border-border bg-card lg:hidden">
          <ul className={cn(contenedor, "flex flex-col py-2")}>
            {navSections.map((seccion) => (
              <li key={seccion.id}>
                <a
                  href={`#${seccion.id}`}
                  className="block py-3 font-medium text-foreground-muted hover:text-primary"
                  onClick={() => setAbierto(false)}
                >
                  {seccion.label}
                </a>
              </li>
            ))}
            <li className="py-3 sm:hidden">
              <BotonLogin className="w-full" />
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
