import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import BookingForm from "@/components/BookingForm";
import { Clock, MapPin, Users, CheckCircle } from "lucide-react";

const toursData: Record<string, any> = {
    "free-tour-santiago-imprescindible": {
        title: "Santiago Essentials (Free Tour)",
        subtitle: "El corazón de la capital",
        description: "Únete a nuestro recorrido más popular. Descubre por qué Santiago es el cruce de caminos de Sudamérica mientras exploramos los hitos que definen la identidad chilena.",
        duration: "2.5 Horas",
        startPoint: "Plaza de Armas",
        maxGroup: "Grupos Pequeños",
        image: "https://images.unsplash.com/photo-1594916893633-88741349a8f4?auto=format&fit=crop&q=80&w=1200",
        highlights: ["Palacio de La Moneda", "Catedral Metropolitana", "Cerro Santa Lucía", "Historias de la Independencia"],
        schema: {
            type: "TouristTrip",
            name: "Free Walking Tour Santiago Essentials",
            itinerary: ["Plaza de Armas", "La Moneda", "Santa Lucía"]
        }
    },
    "tour-gastronomico-mercados-santiago": {
        title: "Tour de Mercados y Sabor",
        subtitle: "La Vega y Tirso de Molina",
        description: "Una inmersión sensorial en los mercados más vibrantes de Chile. No es solo un tour, es un festín de olores, colores y sabores auténticos.",
        duration: "3 Horas",
        startPoint: "Mercado Tirso de Molina",
        maxGroup: "Máx 10 personas",
        image: "https://images.unsplash.com/photo-1518492104633-130d0cc84637?auto=format&fit=crop&q=80&w=1200",
        highlights: ["Degustación de Sopaipillas", "Mote con Huesillo", "Historia de La Chimba", "Secretos de la cocina local"],
        schema: {
            type: "TouristTrip",
            name: "Santiago Local Markets & Food Tour",
            itinerary: ["La Vega Central", "Tirso de Molina"]
        }
    },
    "tour-memoria-historica-dictadura": {
        title: "Memoria y Dictadura",
        subtitle: "El Chile Contemporáneo",
        description: "Un recorrido honesto y respetuoso sobre los eventos que marcaron a Chile desde 1973. Entiende la transición y la resiliencia de un pueblo.",
        duration: "3 Horas",
        startPoint: "Plaza de la Constitución",
        maxGroup: "Máx 12 personas",
        image: "https://images.unsplash.com/photo-1590483734724-383b853b237d?auto=format&fit=crop&q=80&w=1200",
        highlights: ["Historia del 11 de Septiembre", "Salvador Allende", "Sitios de Memoria", "Chile hoy"],
        schema: {
            type: "TouristTrip",
            name: "Santiago Memory and Dictatorship Tour",
            itinerary: ["La Moneda", "Museo de la Memoria"]
        }
    },
    "tour-barrio-yungay-arte-urbano": {
        title: "Street Art & Barrio Yungay",
        subtitle: "Cultura y Bohemia",
        description: "Explora el barrio más cool de la ciudad. Muralismo, arquitectura patrimonial y la energía creativa del Santiago moderno.",
        duration: "2.5 Horas",
        startPoint: "Metro Quinta Normal",
        maxGroup: "Máx 15 personas",
        image: "https://images.unsplash.com/photo-1561570183-503487f583f7?auto=format&fit=crop&q=80&w=1200",
        highlights: ["Murales Gigantes", "Pasaje Lucrecia Valdés", "Historia del Barrio", "Galerías locales"],
        schema: {
            type: "TouristTrip",
            name: "Barrio Yungay Street Art Tour",
            itinerary: ["Parque Quinta Normal", "Barrio Yungay"]
        }
    }
};

export default function TourPage({ params }: { params: { slug: string } }) {
    const tour = toursData[params.slug];

    if (!tour) notFound();

    // JSON-LD para Google
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "TouristTrip",
        "name": tour.title,
        "description": tour.description,
        "itinerary": {
            "@type": "ItemList",
            "itemListElement": tour.highlights.map((h: string, i: number) => ({
                "@type": "ListItem",
                "position": i + 1,
                "name": h
            }))
        }
    };

    return (
        <div className="pt-20">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* Hero Tour */}
            <section className="relative h-[60vh] flex items-end">
                <Image
                    src={tour.image}
                    alt={tour.title}
                    fill
                    className="object-cover brightness-[0.5]"
                    priority
                />
                <div className="relative z-10 max-w-7xl mx-auto px-4 pb-12 w-full">
                    <Link href="/#tours" className="text-white/80 text-sm mb-4 inline-block hover:text-white">← Volver a todos los tours</Link>
                    <h1 className="text-4xl md:text-6xl font-bold font-outfit text-white mb-2">{tour.title}</h1>
                    <p className="text-xl text-accent font-bold uppercase tracking-widest">{tour.subtitle}</p>
                </div>
            </section>

            <section className="py-16 bg-background">
                <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-12">

                    {/* Main Info */}
                    <div className="lg:col-span-2">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                            <div className="bg-muted p-4 rounded-2xl flex flex-col items-center text-center">
                                <Clock className="text-primary mb-2" size={20} />
                                <span className="text-xs text-muted-foreground uppercase font-bold">Duración</span>
                                <span className="font-bold">{tour.duration}</span>
                            </div>
                            <div className="bg-muted p-4 rounded-2xl flex flex-col items-center text-center">
                                <MapPin className="text-primary mb-2" size={20} />
                                <span className="text-xs text-muted-foreground uppercase font-bold">Inicia</span>
                                <span className="font-bold">{tour.startPoint}</span>
                            </div>
                            <div className="bg-muted p-4 rounded-2xl flex flex-col items-center text-center">
                                <Users className="text-primary mb-2" size={20} />
                                <span className="text-xs text-muted-foreground uppercase font-bold">Tamaño</span>
                                <span className="font-bold">{tour.maxGroup}</span>
                            </div>
                            <div className="bg-muted p-4 rounded-2xl flex flex-col items-center text-center">
                                <CheckCircle className="text-primary mb-2" size={20} />
                                <span className="text-xs text-muted-foreground uppercase font-bold">Precio</span>
                                <span className="font-bold text-green-600">Free / Propinas</span>
                            </div>
                        </div>

                        <h2 className="text-3xl font-bold font-outfit mb-6">Sobre esta experiencia</h2>
                        <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                            {tour.description}
                        </p>

                        <h3 className="text-2xl font-bold font-outfit mb-6 text-primary">Lo que visitaremos:</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                            {tour.highlights.map((h: string, i: number) => (
                                <div key={i} className="flex items-center gap-3 p-4 border border-border rounded-xl">
                                    <div className="w-2 h-2 rounded-full bg-accent" />
                                    <span className="font-medium">{h}</span>
                                </div>
                            ))}
                        </div>

                        <div className="bg-accent/5 p-8 rounded-3xl border border-accent/20">
                            <h4 className="font-bold text-accent mb-2">Información Importante</h4>
                            <p className="text-sm text-muted-foreground italic">
                                Recomendamos traer calzado cómodo, agua y protector solar. El clima de Santiago puede variar rápidamente. Nuestros tours se realizan con sol o lluvia ligera.
                            </p>
                        </div>
                    </div>

                    {/* Sidebar Booking */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-28">
                            <div className="bg-primary p-1 rounded-[2rem] shadow-2xl">
                                <div className="bg-white dark:bg-slate-900 p-6 rounded-[1.8rem]">
                                    <h3 className="text-2xl font-bold font-outfit mb-2 text-center">Reserva tu lugar</h3>
                                    <p className="text-sm text-muted-foreground text-center mb-6">Confirmación inmediata por WhatsApp</p>
                                    <BookingForm />
                                </div>
                            </div>

                            {/* Trust Badge Mobile Optimization */}
                            <div className="mt-6 flex items-center justify-center gap-4 bg-muted/50 p-4 rounded-2xl border border-border">
                                <div className="text-center">
                                    <span className="block text-xl font-bold">4.9/5</span>
                                    <span className="text-[10px] uppercase font-bold text-muted-foreground">Rating Local</span>
                                </div>
                                <div className="h-8 w-[1px] bg-border" />
                                <div className="text-center">
                                    <span className="block text-xl font-bold">+1k</span>
                                    <span className="text-[10px] uppercase font-bold text-muted-foreground">Turistas</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </div>
    );
}
