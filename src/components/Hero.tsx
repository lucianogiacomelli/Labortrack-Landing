import { useRef } from "react";
import { CircleCheck, UsersRound } from "lucide-react";
import { cn } from "@/lib/cn";
import { DESKTOP, MOTION, gsap, SplitText, useGSAP } from "@/lib/gsap";
import { contenedor } from "@/lib/estilos";
import { BotonLogin } from "./ui";

const qrCeldas = [
  [0, 0], [1, 0], [2, 0], [4, 0], [6, 0], [7, 0], [8, 0],
  [0, 1], [2, 1], [4, 1], [5, 1], [6, 1], [8, 1],
  [0, 2], [1, 2], [2, 2], [5, 2], [6, 2], [7, 2], [8, 2],
  [3, 3], [5, 3], [7, 3],
  [0, 4], [2, 4], [3, 4], [4, 4], [6, 4], [8, 4],
  [4, 5], [5, 5], [7, 5],
  [0, 6], [1, 6], [2, 6], [4, 6], [6, 6], [7, 6],
  [0, 7], [2, 7], [3, 7], [5, 7], [8, 7],
  [0, 8], [1, 8], [2, 8], [4, 8], [5, 8], [6, 8], [8, 8],
];

const cables = [
  "M248 170c62 0 74-56 134-56h42",
  "M248 230c70 0 78 0 136 0h40",
  "M248 290c62 0 76 42 136 42h40",
];

const barras = [
  { x: 460, h: 46 },
  { x: 494, h: 74 },
  { x: 528, h: 60 },
  { x: 562, h: 104, acento: true },
  { x: 596, h: 86 },
];

function Ilustracion() {
  return (
    <svg viewBox="0 0 700 460" className="h-auto w-full overflow-visible" aria-hidden="true">
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path data-trazo stroke="var(--lt-border-strong)" strokeWidth="1.5" d="M26 414h648" />

        {/* Celular del operario */}
        <g data-celular>
          <rect data-trazo stroke="var(--lt-action-primary)" strokeWidth="2.5" x="58" y="78" width="188" height="300" rx="26" fill="var(--lt-surface-card)" />
          <path data-trazo stroke="var(--lt-action-primary)" strokeWidth="2.5" d="M136 100h32" />
          <path data-trazo stroke="var(--lt-neutral-500)" strokeWidth="1.75" d="M88 132h70M88 148h104" />
          <rect data-trazo stroke="var(--lt-neutral-500)" strokeWidth="1.75" x="94" y="172" width="116" height="116" rx="10" />
          <g stroke="none" fill="var(--lt-text-primary)">
            {qrCeldas.map(([x, y]) => (
              <rect key={`${x}-${y}`} data-qr x={107 + x * 10} y={185 + y * 10} width="8" height="8" rx="1.5" />
            ))}
          </g>
          <path data-escaneo stroke="var(--lt-orange-500)" strokeWidth="2.5" d="M100 230h104" opacity="0" />
          <rect data-trazo stroke="var(--lt-neutral-500)" strokeWidth="1.75" x="88" y="306" width="128" height="34" rx="8" />
          <path data-check stroke="var(--lt-orange-600)" strokeWidth="3" d="M134 323l8 8 16-16" />
        </g>

        {/* Conexión con la oficina */}
        {cables.map((d, i) => (
          <path key={d} id={`cable-${i}`} data-trazo stroke="var(--lt-blue-500)" strokeWidth="1.75" d={d} />
        ))}
        {[114, 230, 332].map((cy) => (
          <circle key={cy} data-nodo cx="362" cy={cy} r="5" fill="var(--lt-orange-500)" stroke="none" />
        ))}
        {cables.map((d) => (
          <circle key={`pulso-${d}`} data-pulso r="4" fill="var(--lt-orange-500)" stroke="none" opacity="0" />
        ))}

        {/* Panel de RR.HH. */}
        <g data-panel>
          <rect data-trazo stroke="var(--lt-action-primary)" strokeWidth="2.5" x="424" y="70" width="230" height="290" rx="16" fill="var(--lt-surface-card)" />
          <path data-trazo stroke="var(--lt-neutral-500)" strokeWidth="1.75" d="M448 102h84" />
          <rect data-trazo stroke="var(--lt-neutral-500)" strokeWidth="1.75" x="448" y="124" width="84" height="56" rx="8" />
          <rect data-trazo stroke="var(--lt-neutral-500)" strokeWidth="1.75" x="546" y="124" width="84" height="56" rx="8" />
          <path data-trazo stroke="var(--lt-neutral-500)" strokeWidth="1.75" d="M460 148h40M460 162h24" />
          <path data-trazo stroke="var(--lt-neutral-500)" strokeWidth="1.75" d="M558 148h40M558 162h52" />
          <path data-trazo stroke="var(--lt-border-strong)" strokeWidth="1.5" d="M448 208h182" />
          <g stroke="none">
            {barras.map((barra) => (
              <rect
                key={barra.x}
                data-barra
                x={barra.x}
                y={336 - barra.h}
                width="22"
                height={barra.h}
                rx="3"
                fill={barra.acento ? "var(--lt-action-primary)" : "var(--lt-blue-100)"}
              />
            ))}
          </g>
        </g>
      </g>
    </svg>
  );
}

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MOTION, () => {
        const split = SplitText.create("h1", { type: "words", mask: "words" });
        const intro = gsap.timeline({ delay: 0.15 });

        intro
          .from("[data-hero-eyebrow] span", { scaleX: 0, transformOrigin: "left", duration: 0.7 })
          .from("[data-hero-eyebrow] em", { autoAlpha: 0, x: -12, duration: 0.6 }, "<0.2")
          .from(split.words, { yPercent: 115, stagger: 0.07, duration: 1.1, ease: "expo.out" }, "<0.1")
          .from("[data-hero-texto]", { autoAlpha: 0, y: 24 }, "-=0.7")
          .from("[data-hero-acciones] > *", { autoAlpha: 0, y: 18, stagger: 0.1 }, "-=0.6")

          // Ilustración: se dibuja, se escanea el QR y viaja el dato al panel.
          .from("[data-trazo]", { drawSVG: "0%", duration: 1.1, stagger: 0.05, ease: "power2.inOut" }, 0.3)
          .from("[data-qr]", {
            scale: 0,
            transformOrigin: "center",
            duration: 0.35,
            stagger: { each: 0.012, from: "center", grid: [9, 9] },
            ease: "back.out(2)",
          }, 1.1)
          .fromTo("[data-escaneo]", { y: -48, opacity: 0 }, { y: 48, opacity: 1, duration: 0.9, ease: "power1.inOut" }, 1.7)
          .to("[data-escaneo]", { opacity: 0, duration: 0.2 })
          .from("[data-check]", { drawSVG: "0%", duration: 0.4 }, "<")
          .from("[data-chip-ingreso]", { autoAlpha: 0, scale: 0.6, y: 20, duration: 0.6, ease: "back.out(1.8)" }, "<0.1")
          .from("[data-nodo]", { scale: 0, transformOrigin: "center", stagger: 0.1, ease: "back.out(3)", duration: 0.4 }, "<")
          .from("[data-barra]", { scaleY: 0, transformOrigin: "bottom", stagger: 0.08, duration: 0.7, ease: "back.out(1.4)" }, "<0.2")
          .from("[data-chip-presentes]", { autoAlpha: 0, scale: 0.6, y: 20, duration: 0.6, ease: "back.out(1.8)" }, "-=0.3");

        // Pulsos en loop por cada cable, desfasados.
        gsap.utils.toArray<SVGCircleElement>("[data-pulso]").forEach((pulso, i) => {
          gsap.timeline({ repeat: -1, delay: 3 + i * 0.45, repeatDelay: 1.2 })
            .set(pulso, { opacity: 1 })
            .to(pulso, {
              duration: 1.2,
              ease: "power1.inOut",
              motionPath: { path: `#cable-${i}`, align: `#cable-${i}`, alignOrigin: [0.5, 0.5] },
            })
            .to(pulso, { opacity: 0, duration: 0.2 });
        });

        gsap.to("[data-chip-ingreso]", { y: -8, duration: 2.2, yoyo: true, repeat: -1, ease: "sine.inOut", delay: 3 });
        gsap.to("[data-chip-presentes]", { y: 8, duration: 2.6, yoyo: true, repeat: -1, ease: "sine.inOut", delay: 3.2 });

        return () => split.revert();
      });

      // Al scrollear, el texto se aleja y la ilustración se hunde con profundidad.
      mm.add(DESKTOP, () => {
        const salida = { trigger: ref.current, start: "top top", end: "bottom top", scrub: true };
        gsap.to("[data-hero-copy]", { yPercent: -18, autoAlpha: 0.2, ease: "none", scrollTrigger: salida });
        gsap.to("[data-hero-arte]", { y: 90, scale: 0.92, ease: "none", scrollTrigger: salida });
        gsap.to("[data-celular]", { x: -24, ease: "none", scrollTrigger: salida });
        gsap.to("[data-panel]", { x: 24, ease: "none", scrollTrigger: salida });
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 size-[36rem] rounded-full bg-[radial-gradient(circle,var(--lt-blue-50),transparent_65%)]"
      />
      <div className={cn(contenedor, "relative grid items-center gap-12 py-14 md:min-h-[calc(100vh-4.5rem)] md:grid-cols-[1fr_1.1fr] md:gap-14 md:py-20")}>
        <div data-hero-copy>
          <p data-hero-eyebrow className="mb-7 flex items-center gap-3 text-xs font-semibold uppercase tracking-[.17em] text-foreground-muted">
            <span className="h-0.5 w-10 bg-accent" aria-hidden="true" />
            <em className="not-italic">RR.HH. para obras civiles · Mendoza, Argentina</em>
          </p>
          <h1 className="text-4xl font-extrabold leading-[1.04] tracking-[-.04em] sm:text-5xl lg:text-7xl">
            Cada obrero, <span className="font-bold text-primary">cada hora, registrada.</span>
          </h1>
          <p data-hero-texto className="mb-9 mt-7 max-w-[30rem] text-lg leading-relaxed text-foreground-muted">
            Legajos, cuadrillas, asistencia y recibos en una sola plataforma. El capataz ficha
            desde la obra, RR.HH. liquida con datos reales y el trabajador consulta lo suyo sin
            pasar por la oficina.
          </p>
          <div data-hero-acciones className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <BotonLogin />
            <a
              href="#que-es"
              className="inline-flex min-h-11 items-center font-medium underline decoration-border-strong underline-offset-[6px] transition-colors hover:decoration-accent"
            >
              Ver cómo funciona →
            </a>
          </div>
        </div>

        <div
          data-hero-arte
          role="img"
          aria-label="Un operario registra su ingreso con QR y RR.HH. lo ve en el panel"
          className="relative"
        >
          <Ilustracion />
          <div
            data-chip-ingreso
            className="absolute left-[2%] top-[4%] flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-xs font-semibold shadow-floating sm:text-sm"
          >
            <CircleCheck className="size-4 text-success" aria-hidden="true" />
            Ingreso 07:58 · Obra Centro
          </div>
          <div
            data-chip-presentes
            className="absolute bottom-[4%] right-[2%] flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-xs font-semibold shadow-floating sm:text-sm"
          >
            <UsersRound className="size-4 text-primary" aria-hidden="true" />
            42 de 45 presentes
          </div>
        </div>
      </div>
    </div>
  );
}
