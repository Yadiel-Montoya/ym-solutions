import type { Metadata } from "next";
import { Inter, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body-face",
  display: "swap",
});

const display = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-display-face",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono-face",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ym-solutions.vercel.app"),
  title: "YM Solutions — Software a la medida de tu negocio",
  description:
    "Estudio de desarrollo en Naucalpan: páginas web, chatbots de WhatsApp, interfaces con ERP y automatizaciones. Hablas directo con quien construye tu proyecto.",
  openGraph: {
    title: "YM Solutions — Software a la medida de tu negocio",
    description:
      "Páginas web, chatbots de WhatsApp, interfaces con ERP y automatización. La primera plática es gratis.",
    type: "website",
    locale: "es_MX",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
  icons: {
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 96 114'%3E%3Cpath d='M18 80 V28 L48 60 L78 28 V80 M48 60 V94' fill='none' stroke='%230d5b52' stroke-width='10' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E",
    apple: "/apple-touch-icon.png",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "YM Solutions",
  description:
    "Estudio de desarrollo de software: páginas web, chatbots de WhatsApp, interfaces con ERP y automatizaciones.",
  slogan: "Software a la medida de tu negocio",
  areaServed: ["México", "Estados Unidos"],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Naucalpan de Juárez",
    addressRegion: "Estado de México",
    addressCountry: "MX",
  },
  email: "ymontoya.ymsolutions@gmail.com",
  telephone: "+52-55-6559-5788",
  sameAs: [
    "https://www.facebook.com/profile.php?id=61593035162983",
    "https://www.instagram.com/ym__solutions/",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${body.variable} ${display.variable} ${mono.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
