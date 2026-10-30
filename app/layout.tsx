import type { Metadata } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import { Suspense } from "react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { PageTransition } from "@/components/page-transition";
import { NavigationTransition } from "@/components/navigation-transition";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Diseño web profesional y perfiles de Google Maps | Macno",
  description:
    "Antes de llamarte, tus clientes te buscan en Google. Diseño sitios web profesionales y cuido tu perfil en Maps para que esa primera impresión esté a tu altura.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${inter.variable} ${interTight.variable} font-sans antialiased`}
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
