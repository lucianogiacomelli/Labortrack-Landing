import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { APP_URL, boton } from "@/lib/estilos";
import { MOTION, gsap, SplitText, useGSAP } from "@/lib/gsap";

export function BotonLogin({ className }: { className?: string }) {
  return (
    <a href={`${APP_URL}/login`} className={cn(boton.primary, className)}>
      Iniciar sesión
    </a>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="mb-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[.17em] text-foreground-muted">
      <span data-eyebrow-line className="h-0.5 w-8 origin-left bg-accent" aria-hidden="true" />
      {children}
    </p>
  );
}

// Encabezado de sección: la línea naranja crece y el título sube línea por línea.
export function SectionHeading({
  id,
  eyebrow,
  titulo,
  bajada,
}: {
  id: string;
  eyebrow: string;
  titulo: string;
  bajada?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION, () => {
        const titulo = ref.current!.querySelector("h2")!;
        const split = SplitText.create(titulo, { type: "lines", mask: "lines" });
        const tl = gsap.timeline({
          scrollTrigger: { trigger: ref.current, start: "top 82%" },
        });
        tl.from("[data-eyebrow-line]", { scaleX: 0, duration: 0.6 })
          .from(split.lines, { yPercent: 110, stagger: 0.1, duration: 1 }, "-=0.3")
          .from("[data-bajada]", { y: 24, autoAlpha: 0 }, "-=0.6");
        return () => split.revert();
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2
        id={`${id}-titulo`}
        className="mb-5 max-w-3xl text-3xl font-bold leading-tight tracking-tight md:text-4xl"
      >
        {titulo}
      </h2>
      {bajada ? (
        <p data-bajada className="max-w-2xl text-lg leading-relaxed text-foreground-muted">
          {bajada}
        </p>
      ) : null}
    </div>
  );
}

export function Seccion({
  id,
  className,
  children,
}: {
  id: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-titulo`}
      className={cn("scroll-mt-20 border-t border-border py-16 md:py-24", className)}
    >
      {children}
    </section>
  );
}
