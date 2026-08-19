import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import { Marquee, Servicios, Sectores, Proceso, Compromisos, Fundador, Faq } from "@/components/Secciones";
import Contacto, { WaFloat } from "@/components/Contacto";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Servicios />
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
