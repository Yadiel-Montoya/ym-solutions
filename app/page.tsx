import Nav from "@/components/Nav";
import { VideoHero, BandaVideo } from "@/components/Cine";
import SistemaVivo from "@/components/Hero";
import { Marquee, Servicios, Sectores, Proceso, Compromisos, Faq } from "@/components/Secciones";
import DemoBot from "@/components/DemoBot";
import Contacto, { WaFloat } from "@/components/Contacto";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <VideoHero />
        <Marquee />
        <SistemaVivo />
        <Servicios />
        <DemoBot />
        <Sectores />
        <Proceso />
        <BandaVideo
          src="/media/humana.mp4"
          lineas={[
            "Empecé YM Solutions porque veía",
            "negocios buenísimos perdiendo clientes",
            "por no estar bien en internet.",
            "Escríbeme — el que contesta soy yo.",
          ]}
          firma="Yadiel Montoya · fundador"
        />
        <Compromisos />
        <Faq />
        <BandaVideo
          src="/media/v-1140.mp4"
          lineas={["Tu negocio ya está listo", "para su sistema."]}
          cta={{ texto: "Hablemos hoy", wa: "Hola, quiero platicar un proyecto" }}
        />
        <Contacto />
      </main>
      <Footer />
      <WaFloat />
    </>
  );
}
