import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" });

export const metadata: Metadata = {
  metadataBase: new URL("https://ym-solutions.vercel.app"),
  title: "YM Solutions — Software a la medida de tu negocio",
  description:
    "Agencia de desarrollo de software: páginas web con WhatsApp, chatbots, interfaces con ERP y automatizaciones. Soluciones claras, sin complicaciones.",
  openGraph: {
    title: "YM Solutions — Software a la medida de tu negocio",
    description:
      "Páginas web, chatbots, interfaces con ERP y automatización. Cotiza gratis por WhatsApp.",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
  icons: {
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 96 114'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0' stop-color='%230891b2'/%3E%3Cstop offset='1' stop-color='%237c3aed'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cpath d='M18 80 V28 L48 60 L78 28 V80 M48 60 V94' fill='none' stroke='url(%23g)' stroke-width='11' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E",
    apple: "/apple-touch-icon.png",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "YM Solutions",
  description:
    "Agencia de desarrollo de software: páginas web con WhatsApp, chatbots, interfaces con ERP y automatizaciones.",
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
    <html lang="es">
      <body className={`${inter.variable} ${spaceGrotesk.variable}`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
