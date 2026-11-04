import type { Metadata } from "next";
import { Bricolage_Grotesque, Instrument_Serif, JetBrains_Mono, Onest } from "next/font/google";
import { Suspense } from "react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { PageTransition } from "@/components/page-transition";
import { NavigationTransition } from "@/components/navigation-transition";
import "./globals.css";

// Títulos con carácter, texto limpio, serif cursiva para la palabra destacada y mono para etiquetas
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

const onest = Onest({
  subsets: ["latin"],
  variable: "--font-onest",
  display: "swap",
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Diseño web profesional y perfiles de Google Maps | Macno",
  description:
    "Antes de llamarte, tus clientes te buscan en Google. Diseño sitios web profesionales y cuido tu perfil de Google Maps para que esa primera impresión esté a tu altura.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="bg-background">
      <body
        className={`${bricolage.variable} ${onest.variable} ${instrument.variable} ${jetbrains.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <Suspense fallback={null}>
          <NavigationTransition />
          <PageTransition>{children}</PageTransition>
        </Suspense>
        <SpeedInsights />
      </body>
    </html>
  );
}
