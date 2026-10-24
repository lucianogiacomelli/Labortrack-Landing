import { useRef } from "react";
import { MOTION, gsap, useGSAP } from "@/lib/gsap";
import { numeros, stack } from "@/content/landingContent";
import { contenedor } from "@/lib/estilos";
import { Seccion, SectionHeading } from "./ui";

export function Numeros() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION, () => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: "[data-cifras]", start: "top 80%" },
        });
        tl.from("[data-cifra]", { y: 40, autoAlpha: 0, stagger: 0.12, duration: 0.7 });

        // Contadores de 0 al valor final.
        gsap.utils.toArray<HTMLElement>("[data-valor]").forEach((el, i) => {
          const contador = { valor: 0 };
          const final = Number(el.dataset.valor);
          if (Number.isNaN(final)) return;
          tl.to(
            contador,
            {
              valor: final,
              duration: 1.6,
              ease: "power2.out",
              onUpdate: () => {
                el.textContent = String(Math.round(contador.valor));
              },
            },
            0.1 + i * 0.12,
          );
        });

        tl.from("[data-subrayado]", { scaleX: 0, transformOrigin: "left", stagger: 0.12, duration: 0.8 }, 0.6)
          .from("[data-capa]", { x: -30, autoAlpha: 0, stagger: 0.1, duration: 0.6 }, 0.8);
      });
    },
    { scope: ref },
  );

  return (
    <Seccion id="numeros">
      <div ref={ref} className={contenedor}>
        <SectionHeading id="numeros" eyebrow="En números" titulo="Un sistema, no una planilla de cálculo." />
        <dl data-cifras className="mt-3 grid grid-cols-2 gap-px border border-border bg-border md:grid-cols-4">
          {numeros.map((numero) => (
            <div key={numero.etiqueta} data-cifra className="relative flex flex-col-reverse bg-page px-6 py-8">
              <dt className="mt-2 text-sm text-foreground-muted">{numero.etiqueta}</dt>
              <dd className="font-mono text-4xl font-bold tabular-nums tracking-tight text-primary md:text-5xl">
                <span data-valor={numero.valor}>{numero.valor}</span>
              </dd>
              <span data-subrayado aria-hidden="true" className="absolute inset-x-6 bottom-0 h-0.5 bg-accent" />
            </div>
          ))}
        </dl>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stack.map((item) => (
            <div key={item.capa} data-capa className="border-l-2 border-accent pl-4">
              <p className="text-xs font-semibold uppercase tracking-[.17em] text-foreground-muted">{item.capa}</p>
              <p className="mt-1.5 font-medium">{item.tecnologias}</p>
            </div>
          ))}
        </div>
      </div>
    </Seccion>
  );
}
