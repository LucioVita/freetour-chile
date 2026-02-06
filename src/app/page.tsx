import Image from "next/image";
import Link from "next/link";
import BookingForm from "@/components/BookingForm";

const tours = [
  {
    id: "essentials",
    title: "Santiago Essentials",
    subtitle: "Lo mejor de la capital en 24 horas",
    description: "Ideal para tu primer día. Plaza de Armas, La Moneda y Cerro Santa Lucía con historias que no están en los libros.",
    image: "https://images.unsplash.com/photo-1594916893633-88741349a8f4?auto=format&fit=crop&q=80&w=800",
    slug: "free-tour-santiago-imprescindible",
    tag: "Popular"
  },
  {
    id: "markets",
    title: "Mercados y Sabor",
    subtitle: "Inmersión sensorial chilena",
    description: "La Vega Central y Tirso de Molina. Prueba la sopaipilla y el mote con huesillo mientras vives el Santiago real.",
    image: "https://images.unsplash.com/photo-1518492104633-130d0cc84637?auto=format&fit=crop&q=80&w=800",
    slug: "tour-gastronomico-mercados-santiago",
    tag: "Sabroso"
  },
  {
    id: "history",
    title: "Memoria y Dictadura",
    subtitle: "Un viaje al corazón político de Chile",
    description: "Abordamos el golpe de 1973 y la transición democrática con profundidad y respeto. Para viajeros que buscan entender.",
    image: "https://images.unsplash.com/photo-1590483734724-383b853b237d?auto=format&fit=crop&q=80&w=800",
    slug: "tour-memoria-historica-dictadura",
    tag: "Offbeat"
  },
  {
    id: "art",
    title: "Street Art Yungay",
    subtitle: "El barrio más 'cool' de Santiago",
    description: "Murales gigantes, arquitectura bohemia y la energía joven del barrio más vibrante de la ciudad hoy.",
    image: "https://images.unsplash.com/photo-1561570183-503487f583f7?auto=format&fit=crop&q=80&w=800",
    slug: "tour-barrio-yungay-arte-urbano",
    tag: "Instagrammable"
  }
];

export default function Home() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1589147482342-999333555541?auto=format&fit=crop&q=80&w=1920"
            alt="Vista panorámica de Santiago de Chile"
            fill
            className="object-cover brightness-[0.4]"
            priority
          />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold font-outfit text-white mb-6 leading-tight">
            Descubre el <span className="text-accent">Santiago Invisible</span>
          </h1>
          <p className="text-xl text-slate-200 mb-10 max-w-2xl mx-auto leading-relaxed">
            Más que un tour, una conversación. Camina con guías locales por los rincones que las guías tradicionales olvidan.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#tours"
              className="bg-accent text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:scale-105 transition-all"
            >
              Ver Nuestros Tours
            </Link>
            <Link
              href="#reservar"
              className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white/20 transition-all"
            >
              Reserva Directa
            </Link>
          </div>
        </div>
      </section>

      {/* Intro / EEAT */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold font-outfit mb-6 text-primary">
                ¿Por qué caminar con nosotros?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Somos guías independientes que hemos decidido salir de las grandes plataformas para ofrecerte una experiencia **sin grupos masificados** y con **cero comisiones** externas.
              </p>
              <div className="space-y-4">
                {[
                  "Grupos reducidos y personales",
                  "Expertos en historia y cultura local",
                  "Flexibilidad y recomendaciones reales",
                  "Apoyo directo a la economía local"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center text-accent">
                      ✓
                    </div>
                    <span className="font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-2xl skew-y-1">
              <Image
                src="https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=800"
                alt="Guía local conversando con viajeros"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Tours Grid */}
      <section id="tours" className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold font-outfit mb-4">Nuestros Tours Elegidos</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-16">
            Diseñados por expertos para capturar la verdadera esencia de la capital chilena.
            Elige tu historia y únete a nosotros.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {tours.map((tour) => (
              <div key={tour.id} className="group bg-card rounded-3xl overflow-hidden border border-border shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                <div className="relative h-48">
                  <Image src={tour.image} alt={tour.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-4 right-4 bg-accent text-white py-1 px-3 rounded-full text-xs font-bold shadow-md">
                    {tour.tag}
                  </div>
                </div>
                <div className="p-6 text-left">
                  <h3 className="text-xl font-bold mb-1 font-outfit group-hover:text-primary transition-colors">{tour.title}</h3>
                  <p className="text-xs font-bold text-accent mb-3 uppercase tracking-tighter">{tour.subtitle}</p>
                  <p className="text-sm text-muted-foreground mb-6 line-clamp-3">
                    {tour.description}
                  </p>
                  <Link
                    href={`/tours/${tour.slug}`}
                    className="inline-block w-full text-center bg-primary/10 hover:bg-primary hover:text-white text-primary font-bold py-3 rounded-xl transition-all"
                  >
                    Detalles del Tour
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Form Section */}
      <section id="reservar" className="py-24 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold font-outfit mb-6">Reserva tu lugar gratis</h2>
          <p className="text-blue-100 mb-12 text-lg">
            No cobramos por adelantado. Paga lo que creas justo al finalizar el tour.
            Recibirás una confirmación por WhatsApp en pocos minutos.
          </p>

          <BookingForm />
        </div>
      </section>
    </div>
  );
}
