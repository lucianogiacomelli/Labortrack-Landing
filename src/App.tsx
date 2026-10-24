import { ScrollTrigger, useGSAP } from "@/lib/gsap";
import { Cta, EnLaObra, Footer } from "@/components/Cierre";
import { Documentacion } from "@/components/Documentacion";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Modulos } from "@/components/Modulos";
import { Numeros } from "@/components/Numeros";
import { Pantallas } from "@/components/Pantallas";
import { QueEs } from "@/components/QueEs";

export default function App() {
  // Los pines cambian la altura de la página: recalcular cuando cargan las fuentes.
  useGSAP(() => {
    document.fonts.ready.then(() => ScrollTrigger.refresh());
  });

  return (
    <>
      <Header />
      <main id="inicio">
        <Hero />
        <QueEs />
        <Modulos />
        <Numeros />
        <Documentacion />
        <Pantallas />
        <EnLaObra />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
