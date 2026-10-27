import { useRef, useState, type MouseEvent } from "react";
import { Eye } from "lucide-react";
import { DESKTOP, MOBILE, gsap, useGSAP } from "@/lib/gsap";
import { documentacion, pieDiagramas, type RecursoDocumentacion } from "@/content/landingContent";
import { cn } from "@/lib/cn";
import { boton, contenedor } from "@/lib/estilos";
import { Seccion, SectionHeading } from "./ui";
import { VisorImagen, type ContenidoVisor } from "./VisorImagen";

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

function DocumentoCard({
  recurso,
  onVer,
}: {
  recurso: RecursoDocumentacion;
  onVer: (disparador: HTMLButtonElement) => void;
}) {
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
      <button
        type="button"
        onClick={(e) => onVer(e.currentTarget)}
        aria-label={recurso.accion}
        className={cn(boton.primary, "w-full")}
      >
        <Eye className="size-4" />
        Ver
      </button>
    </article>
  );
}

export function Documentacion() {
  const ref = useRef<HTMLDivElement>(null);
  const [abierto, setAbierto] = useState<ContenidoVisor | null>(null);
  const disparador = useRef<HTMLButtonElement | null>(null);

  function abrir(recurso: RecursoDocumentacion, elemento: HTMLButtonElement) {
    disparador.current = elemento;
    setAbierto({ titulo: recurso.titulo, imagenes: recurso.diagramas, pie: pieDiagramas });
  }

  // Al cerrar el visor, el foco vuelve al botón "Ver" de la tarjeta que lo abrió.
  function cerrar() {
    setAbierto(null);
    disparador.current?.focus();
  }

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      // Escritorio: las cuatro tarjetas están en una fila y caen en cascada.
      mm.add(DESKTOP, () => {
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
          .from("[data-doc-icono]", { scale: 0, rotate: -90, stagger: 0.12, duration: 0.6, ease: "back.out(2)" }, "-=0.8");
      });

      // Celular y tablet: las tarjetas se apilan, así que cada una cae al llegar a ella.
      mm.add(MOBILE, () => {
        gsap.utils.toArray<HTMLElement>("[data-doc]").forEach((card) => {
          gsap.timeline({ scrollTrigger: { trigger: card, start: "top 88%" } })
            .from(card, { rotateX: -75, y: 60, autoAlpha: 0, transformOrigin: "50% 0%", duration: 1, ease: "back.out(1.4)" })
            .from(card.querySelector("[data-doc-icono]"), { scale: 0, rotate: -90, duration: 0.6, ease: "back.out(2)" }, "-=0.7");
        });
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
            <DocumentoCard key={recurso.titulo} recurso={recurso} onVer={(elemento) => abrir(recurso, elemento)} />
          ))}
        </div>
      </div>
      <VisorImagen contenido={abierto} onCerrar={cerrar} />
    </Seccion>
  );
}
