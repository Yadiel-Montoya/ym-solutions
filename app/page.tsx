import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import { Marquee, Servicios, Sectores, Proceso, Compromisos, Fundador, Faq } from "@/components/Secciones";
import DemoBot from "@/components/DemoBot";
import Contacto, { WaFloat } from "@/components/Contacto";
import Footer from "@/components/Footer";
import { CursorGlow, ScrollProgress } from "@/components/Efectos";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <CursorGlow />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Servicios />
        <DemoBot />
        <Sectores />
        <Proceso />
        <Compromisos />
        <Fundador />
        <Faq />
        <Contacto />
      </main>
      <Footer />
      <WaFloat />
    </>
  );
}
