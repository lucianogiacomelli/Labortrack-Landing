import { useRef, type MouseEvent } from "react";
import { ArrowRight } from "lucide-react";
import { MOTION, gsap, useGSAP } from "@/lib/gsap";
import { documentacion, type RecursoDocumentacion } from "@/content/landingContent";
import { contenedor } from "@/lib/estilos";
import { Seccion, SectionHeading } from "./ui";

// Inclinación 3D leve siguiendo el puntero.
function inclinar(event: MouseEvent<HTMLElement>) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const card = event.currentTarget;
  const caja = card.getBoundingClientRect();
  const x = (event.clientX - caja.left) / caja.width - 0.5;
  const y = (event.clientY - caja.top) / caja.height - 0.5;
  gsap.to(card, { rotateY: x * 10, rotateX: -y * 10, duration: 0.4, ease: "power2.out" });
}

function enderezar(event: MouseEvent<HTMLElement>) {
  gsap.to(event.currentTarget, { rotateX: 0, rotateY: 0, duration: 0.6, ease: "elastic.out(1, 0.5)" });
}

function DocumentoCard({ recurso }: { recurso: RecursoDocumentacion }) {
  const Icono = recurso.icono;
  return (
    <article
      data-doc
      onMouseMove={inclinar}
      onMouseLeave={enderezar}
      className="flex flex-col rounded-card border border-border bg-card p-6 shadow-soft [transform-style:preserve-3d]"
    >
      <span data-doc-icono className="mb-5 flex size-11 items-center justify-center rounded-lg bg-primary-soft text-primary">
        <Icono className="size-5" />
      </span>
      <h3 className="mb-2 text-lg font-bold tracking-tight">{recurso.titulo}</h3>
      <p className="mb-6 flex-1 leading-relaxed text-foreground-muted">{recurso.descripcion}</p>
      {recurso.href ? (
        <a
          href={recurso.href}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 font-semibold text-primary hover:underline"
        >
          {recurso.accion}
          <ArrowRight className="size-4" />
        </a>
      ) : (
        <span className="flex flex-col items-start gap-2 rounded-lg border border-dashed border-border-strong px-3 py-2.5 text-sm font-semibold text-foreground-muted">
          <span data-pronto className="rounded-full bg-accent-soft px-2 py-0.5 text-[11px] uppercase tracking-wide text-warning">
            Próximamente
          </span>
          {recurso.accion}
        </span>
      )}
    </article>
  );
}

export function Documentacion() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION, () => {
        gsap.timeline({ scrollTrigger: { trigger: "[data-docs]", start: "top 80%" } })
          .from("[data-doc]", {
            rotateX: -75,
            y: 60,
            autoAlpha: 0,
            transformOrigin: "50% 0%",
            stagger: 0.12,
            duration: 1,
            ease: "back.out(1.4)",
          })
          .from("[data-doc-icono]", { scale: 0, rotate: -90, stagger: 0.12, duration: 0.6, ease: "back.out(2)" }, "-=0.8")
          .fromTo("[data-pronto]", { scale: 1 }, { scale: 1.12, yoyo: true, repeat: 1, duration: 0.25, stagger: 0.08 }, "-=0.2");
      });
    },
    { scope: ref },
  );

  return (
    <Seccion id="documentacion">
      <div ref={ref} className={contenedor}>
        <SectionHeading
          id="documentacion"
          eyebrow="Documentación técnica"
          titulo="Cómo está pensado por dentro."
          bajada="Versiones reducidas de los modelos del diseño del sistema, para recorrer la estructura sin leer el documento completo."
        />
        <div data-docs className="mt-10 grid gap-6 [perspective:1200px] sm:grid-cols-2 lg:grid-cols-4">
          {documentacion.map((recurso) => (
            <DocumentoCard key={recurso.titulo} recurso={recurso} />
          ))}
        </div>
      </div>
    </Seccion>
  );
}
