import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Link from "next/link";

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
      <body className="antialiased min-h-screen flex flex-col">
        {/* Navigation */}
        <header className="fixed top-0 w-full z-50 transition-all duration-300">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="glass rounded-2xl px-6 py-3 flex items-center justify-between shadow-lg">
              <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                FWT Santiago
              </Link>
              <div className="hidden md:flex space-x-8">
                <Link href="#tours" className="text-sm font-medium hover:text-accent transition-colors">Tours</Link>
                <Link href="#nosotros" className="text-sm font-medium hover:text-accent transition-colors">Nosotros</Link>
                <Link href="#faq" className="text-sm font-medium hover:text-accent transition-colors">FAQ</Link>
              </div>
              <Link 
                href="#reservar" 
                className="bg-primary text-white px-5 py-2 rounded-xl text-sm font-bold shadow-md hover:bg-opacity-90 transition-all"
              >
                Reservar Ahora
              </Link>
            </div>
          </nav>
        </header>

        <main className="flex-grow">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-muted py-12 border-t border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4 font-outfit">FWT Santiago</h3>
                <p className="text-muted-foreground text-sm">
                  Independientes, locales y apasionados. Creamos las mejores experiencias caminando por el corazón de Chile.
                </p>
              </div>
              <div>
                <h4 className="font-bold mb-4">Secciones</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><Link href="/">Inicio</Link></li>
                  <li><Link href="#tours">Nuestros Tours</Link></li>
                  <li><Link href="#reservar">Reserva Directa</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-4">Contacto</h4>
                <p className="text-sm text-muted-foreground">Punto de encuentro: Plaza de Armas, Santiago.</p>
                <p className="text-sm text-muted-foreground mt-2">WhatsApp: +56 9 XXXX XXXX</p>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-border text-center text-xs text-muted-foreground">
              © 2026 Free Walking Tour Santiago. Orgullosamente .cl
            </div>
          </div>
        </footer>

        {/* WhatsApp Button */}
        <a 
          href="https://wa.me/569XXXXXXXX?text=Hola! Me gustaría reservar un tour."
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 glass p-4 rounded-full shadow-2xl animate-float hover:scale-110 transition-transform"
          title="Reserva por WhatsApp"
        >
          <svg className="w-8 h-8 text-green-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.588-5.946 0-6.556 5.332-11.888 11.888-11.888 3.176 0 6.161 1.237 8.404 3.48 2.242 2.242 3.48 5.227 3.48 8.404 0 6.556-5.332 11.888-11.888 11.888-2.019 0-4.001-.512-5.748-1.487l-6.235 1.712zm6.105-4.576c1.614.957 3.232 1.48 4.981 1.48 5.604 0 10.162-4.558 10.162-10.162 0-2.72-1.058-5.274-2.978-7.194s-4.474-2.978-7.194-2.978c-5.604 0-10.162 4.558-10.162 10.162 0 1.902.521 3.743 1.508 5.319l-.995 3.633 3.682-.96zm12.734-6.32c-.049-.082-.18-.131-.377-.23s-1.164-.574-1.344-.64-.311-.098-.443.098c-.131.197-.508.64-.623.77-.115.131-.23.148-.426.049-.197-.099-.83-.307-1.58-.977-.585-.522-.98-1.168-1.095-1.364-.115-.197-.012-.304.086-.403.088-.088.197-.23.295-.344.099-.115.131-.197.197-.328.066-.131.033-.246-.016-.344-.049-.098-.443-1.066-.606-1.459-.159-.383-.314-.33-.443-.33-.115 0-.246-.016-.377-.016s-.344.049-.524.246c-.18.197-.689.672-.689 1.639s.705 1.902.803 2.033c.098.131 1.387 2.118 3.359 2.97.469.203.835.324 1.121.415.47.15.898.128 1.237.078.377-.056 1.164-.475 1.328-.934.164-.459.164-.853.115-.934z" />
          </svg>
        </a>
      </body>
    </html>
  );
}
