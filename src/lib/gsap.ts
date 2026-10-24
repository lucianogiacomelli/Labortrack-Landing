import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(
  useGSAP,
  DrawSVGPlugin,
  MotionPathPlugin,
  ScrollTrigger,
  SplitText,
);

gsap.defaults({ ease: "power3.out", duration: 0.9 });

// Todas las animaciones se registran dentro de estas condiciones.
// Con reduced-motion no corre ninguna y el contenido queda en su estado final.
export const MOTION = "(prefers-reduced-motion: no-preference)";
export const DESKTOP = "(min-width: 1024px) and (prefers-reduced-motion: no-preference)";
export const MOBILE = "(max-width: 1023px) and (prefers-reduced-motion: no-preference)";


export { gsap, useGSAP, ScrollTrigger, SplitText };
