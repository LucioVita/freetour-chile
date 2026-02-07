import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Chatbot from "@/components/Chatbot";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: {
    default: "Free Walking Tour Santiago | El Mejor Tour Local en Chile",
    template: "%s | Free Walking Tour Santiago"
  },
  description: "Descubre Santiago de forma auténtica. Tours por el centro histórico, mercados y memoria histórica con guías locales expertos. ¡Reserva gratis hoy!",
  keywords: ["free tour santiago", "walking tour santiago chile", "que hacer en santiago", "tour mercado la vega", "tour dictadura chile", "guia turistico santiago"],
  authors: [{ name: "Free Walking Tour Santiago" }],
  openGraph: {
    title: "Free Walking Tour Santiago | Experiencias Locales Auténticas",
    description: "Únete al tour mejor valorado de Santiago. Sin intermediarios, directo con guías locales.",
    url: "https://freewalkingtoursantiago.cl",
    siteName: "Free Walking Tour Santiago",
    locale: "es_CL",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${outfit.variable}`}>
      <body className="antialiased min-h-screen flex flex-col bg-white overflow-x-hidden">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        {/* <Chatbot /> */}
      </body>
    </html>
  );
}
