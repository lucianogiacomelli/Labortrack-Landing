import { useRef } from "react";
import { CircleCheck, UsersRound } from "lucide-react";
import { cn } from "@/lib/cn";
import { DESKTOP, MOBILE, MOTION, gsap, SplitText, useGSAP } from "@/lib/gsap";
import { contenedor } from "@/lib/estilos";
import { BotonLogin } from "./ui";

// Zigzag del reticulado: alterna entre dos líneas paralelas a lo largo de un eje.
function reticulado(desde: number, hasta: number, paso: number, a: number, b: number, vertical: boolean) {
  const puntos: string[] = [];
  const pasos = Math.round(Math.abs(hasta - desde) / paso);
  const sentido = hasta > desde ? 1 : -1;
  for (let i = 0; i <= pasos; i++) {
    const eje = desde + i * paso * sentido;
    const lado = i % 2 === 0 ? a : b;
    puntos.push(vertical ? `${lado} ${eje}` : `${eje} ${lado}`);
  }
  return `M${puntos.join("L")}`;
}

const columnas = [390, 450, 510, 570, 630];
const losas = [406, 342, 278, 214];
const ventanas = losas.slice(1).flatMap((losa) =>
  columnas.slice(0, -1).map((x) => ({ x: x + 12, y: losa + 14 })),
);

const obreros = [
  { cx: 250, cy: 408 },
  { cx: 362, cy: 408 },
  { cx: 424, cy: 336 },
  { cx: 548, cy: 336 },
  { cx: 486, cy: 272 },
  { cx: 604, cy: 272 },
  { cx: 432, cy: 208 },
];

function Ilustracion() {
  return (
    <svg viewBox="0 0 700 460" className="h-auto w-full overflow-visible" aria-hidden="true">
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path data-trazo stroke="var(--lt-border-strong)" strokeWidth="1.5" d="M26 414h648" />

        {/* Obrador */}
        <g data-obrador>
          <rect data-trazo stroke="var(--lt-neutral-500)" strokeWidth="1.75" x="56" y="344" width="176" height="70" rx="6" fill="var(--lt-surface-card)" />
          <path data-trazo stroke="var(--lt-neutral-500)" strokeWidth="1.75" d="M48 344h192" />
          <rect data-trazo stroke="var(--lt-neutral-500)" strokeWidth="1.75" x="76" y="366" width="26" height="48" rx="2" />
          <rect data-trazo stroke="var(--lt-neutral-500)" strokeWidth="1.75" x="124" y="362" width="40" height="22" rx="3" />
          <rect data-trazo stroke="var(--lt-neutral-500)" strokeWidth="1.75" x="176" y="362" width="40" height="22" rx="3" />
        </g>

        {/* Grúa torre */}
        <g stroke="var(--lt-orange-500)" strokeWidth="2">
          <path data-trazo d="M290 414V96M310 414V96" />
          <path data-trazo strokeWidth="1.25" d={reticulado(414, 104, 31, 290, 310, true)} />
          <path data-trazo d="M250 88h380M250 104h380" />
          <path data-trazo strokeWidth="1.25" d={reticulado(310, 630, 20, 104, 88, false)} />
          <path data-trazo strokeWidth="1.5" d="M256 88L300 60L560 88M290 88L300 60L310 88" />
          <rect data-trazo x="254" y="104" width="30" height="24" rx="2" fill="var(--lt-orange-100)" />
        </g>
        <g data-carro>
          <rect x="510" y="104" width="20" height="8" rx="2" fill="var(--lt-orange-600)" stroke="none" />
          <line data-cable x1="520" y1="112" x2="520" y2="134" stroke="var(--lt-neutral-500)" strokeWidth="1.5" />
          <g data-viga>
            <path stroke="var(--lt-neutral-500)" strokeWidth="1.5" d="M520 134l-28 10M520 134l28 10" />
            <rect x="484" y="144" width="72" height="8" rx="2" fill="var(--lt-action-primary)" stroke="none" />
          </g>
        </g>

        {/* Edificio en construcción */}
        <g data-edificio>
          {columnas.map((x) => (
            <path key={x} data-trazo stroke="var(--lt-action-primary)" strokeWidth="2.5" d={`M${x} 414V214`} />
          ))}
          <g stroke="none">
            {losas.map((y) => (
              <rect key={y} data-losa x="384" y={y} width="252" height="8" rx="2" fill="var(--lt-action-primary)" />
            ))}
            {ventanas.map(({ x, y }) => (
              <rect key={`${x}-${y}`} data-ventana x={x} y={y} width="36" height="34" rx="3" fill="var(--lt-blue-100)" />
            ))}
          </g>
          <rect
            data-proyecto
            x="390"
            y="160"
            width="240"
            height="54"
            rx="2"
            stroke="var(--lt-blue-500)"
            strokeWidth="1.5"
            strokeDasharray="6 6"
          />
        </g>

        {/* Cada punto es un operario que ya fichó su ingreso */}
        {obreros.map(({ cx, cy }) => (
          <g key={`${cx}-${cy}`}>
            <circle data-anillo cx={cx} cy={cy} r="6" stroke="var(--lt-orange-500)" strokeWidth="1.5" opacity="0" />
            <circle data-obrero cx={cx} cy={cy} r="6" fill="var(--lt-orange-500)" stroke="var(--lt-surface-card)" strokeWidth="2" />
          </g>
        ))}
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
        const split = SplitText.create("h1", { type: "words", mask: "words", wordsClass: "split-palabra" });
        const intro = gsap.timeline({ delay: 0.15 });

        intro
          .from("[data-hero-eyebrow] span", { scaleX: 0, transformOrigin: "left", duration: 0.7 })
          .from("[data-hero-eyebrow] em", { autoAlpha: 0, x: -12, duration: 0.6 }, "<0.2")
          .from(split.words, { yPercent: 115, stagger: 0.07, duration: 1.1, ease: "expo.out" }, "<0.1")
          .from("[data-hero-texto]", { autoAlpha: 0, y: 24 }, "-=0.7")
          .from("[data-hero-acciones] > *", { autoAlpha: 0, y: 18, stagger: 0.1 }, "-=0.6")

          // Ilustración: se dibuja la obra, sube piso a piso y van llegando los operarios.
          .from("[data-trazo]", { drawSVG: "0%", duration: 1.1, stagger: 0.04, ease: "power2.inOut" }, 0.3)
          .from("[data-carro]", { autoAlpha: 0, duration: 0.4 }, 1.2)
          .from("[data-losa]", { scaleX: 0, transformOrigin: "left", stagger: 0.18, duration: 0.6, ease: "power2.out" }, 1.1)
          .from("[data-ventana]", {
            scale: 0,
            transformOrigin: "center",
            duration: 0.35,
            stagger: { each: 0.04, from: "start" },
            ease: "back.out(2)",
          }, 1.5)
          .from("[data-proyecto]", { autoAlpha: 0, duration: 0.6 }, 2)
          .from("[data-obrero]", { scale: 0, transformOrigin: "center", stagger: 0.12, duration: 0.4, ease: "back.out(3)" }, 2.1)
          .from("[data-chip-ingreso]", { autoAlpha: 0, scale: 0.6, y: 20, duration: 0.6, ease: "back.out(1.8)" }, 2.2)
          .from("[data-chip-presentes]", { autoAlpha: 0, scale: 0.6, y: 20, duration: 0.6, ease: "back.out(1.8)" }, 2.9);

        // La grúa traslada la viga sobre el piso en obra.
        gsap.timeline({ repeat: -1, yoyo: true, delay: 3, defaults: { ease: "sine.inOut" } })
          .to("[data-carro]", { x: -70, duration: 3.2 })
          .to("[data-cable]", { attr: { y2: 150 }, duration: 1.6 }, "<0.8")
          .to("[data-viga]", { y: 16, duration: 1.6 }, "<");

        // Cada operario "ficha" con un pulso, desfasado del resto.
        gsap.utils.toArray<SVGCircleElement>("[data-anillo]").forEach((anillo, i) => {
          gsap.fromTo(
            anillo,
            { scale: 1, opacity: 0.8, transformOrigin: "center" },
            { scale: 2.8, opacity: 0, duration: 1.4, ease: "power1.out", repeat: -1, repeatDelay: 2.6, delay: 3 + i * 0.55 },
          );
        });

        gsap.to("[data-chip-ingreso]", { y: -8, duration: 2.2, yoyo: true, repeat: -1, ease: "sine.inOut", delay: 3 });
        gsap.to("[data-chip-presentes]", { y: 8, duration: 2.6, yoyo: true, repeat: -1, ease: "sine.inOut", delay: 3.6 });

        return () => split.revert();
      });

      // Al scrollear, el texto se aleja y la ilustración se hunde con profundidad.
      mm.add(DESKTOP, () => {
        const salida = { trigger: ref.current, start: "top top", end: "bottom top", scrub: true };
        gsap.to("[data-hero-copy]", { yPercent: -18, autoAlpha: 0.2, ease: "none", scrollTrigger: salida });
        gsap.to("[data-hero-arte]", { y: 90, scale: 0.92, ease: "none", scrollTrigger: salida });
        gsap.to("[data-obrador]", { x: -24, ease: "none", scrollTrigger: salida });
        gsap.to("[data-edificio]", { x: 24, ease: "none", scrollTrigger: salida });
      });

      // En celular la ilustración queda debajo del texto: se separa mientras cruza la pantalla.
      mm.add(MOBILE, () => {
        const cruce = { trigger: "[data-hero-arte]", start: "top bottom", end: "bottom top", scrub: true };
        gsap.fromTo("[data-hero-arte]", { scale: 0.94 }, { scale: 1.04, ease: "none", scrollTrigger: cruce });
        gsap.fromTo("[data-obrador]", { x: 12 }, { x: -16, ease: "none", scrollTrigger: cruce });
        gsap.fromTo("[data-edificio]", { x: -12 }, { x: 16, ease: "none", scrollTrigger: cruce });
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
          aria-label="Una obra en construcción con grúa, donde cada operario registra su ingreso y RR.HH. ve cuántos están presentes"
          className="relative"
        >
          <Ilustracion />
          <div
            data-chip-ingreso
            className="absolute right-[2%] top-[1%] flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-xs font-semibold shadow-floating sm:text-sm"
          >
            <CircleCheck className="size-4 text-success" aria-hidden="true" />
            Ingreso 07:58 · Obra Centro
          </div>
          <div
            data-chip-presentes
            className="absolute left-[2%] top-[40%] flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-xs font-semibold shadow-floating sm:text-sm"
          >
            <UsersRound className="size-4 text-primary" aria-hidden="true" />
            42 de 45 presentes
          </div>
        </div>
      </div>
    </div>
  );
}
