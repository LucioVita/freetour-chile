import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import BookingForm from "@/components/BookingForm";
import { Clock, MapPin, Users, Star, ChevronLeft, Shield, Globe2, CircleDollarSign, Info, Bot } from "lucide-react";

import fs from "fs";
import path from "path";

const toursData: Record<string, any> = {
    "free-tour-santiago-imprescindible": {
        active: true,
        title: "Santiago Todo en Uno",
        tagline: "El tour que define a la capital",
        description: "Únete al recorrido mejor valorado de Santiago. Con más de 2.500 reseñas reales, este no es el típico tour de fechas y nombres aburridos. Es una inmersión en el alma de Chile.",
        longContent: "Caminar por el centro de Santiago con Carlos es entender por qué esta ciudad es el corazón latente de los Andes. Comenzaremos en la Plaza de Armas, el kilómetro cero donde la historia colonial se mezcla con el caos vibrante de hoy. No solo veremos la Catedral Metropolitana, entenderemos el poder social que ha tenido en siglos de historia. \n\nPasaremos por el Palacio de La Moneda, donde el guía te relatará los eventos cruciales que transformaron a Chile para siempre.",
        duration: "2h 30m",
        startPoint: "Plaza de Armas (Pedro de Valdivia)",
        maxGroup: "Grupos Humanos",
        languages: "Español / English",
        image: "/tours/esenciales.jpg",
        stops: ["Plaza de Armas", "Catedral Metropolitana", "Palacio de La Moneda", "Ex-Congreso Nacional", "Cerro Santa Lucía"],
        rating: 4.9,
        reviewsCount: 2540
    },
    "tour-mut-santiago-urbano": {
        active: false,
        title: "MUT Santiago Urbano",
        tagline: "El nuevo corazón de la ciudad",
        description: "Explora MUT, el primer mercado urbano sustentable de Chile. Una joya de arquitectura, diseño y gastronomía que está revolucionando Santiago.",
        longContent: "El Mercado Urbano Tobalaba (MUT) no es un mall, es una revolución urbana. Carlos te guiará por este espacio que redefine cómo vivimos la ciudad. Descubriremos sus huertos urbanos, sus niveles inspirados en los antiguos barrios de Santiago y su impacto en la sustentabilidad moderna. \n\nEs el tour perfecto para quienes quieren ver el 'Chile del Futuro'. Caminaremos por sus pasajes llenos de arte, conoceremos la curatoría de sus tiendas locales y entenderemos por qué MUT es el nuevo punto de encuentro obligado de la capital.",
        duration: "2h 30m",
        startPoint: "Acceso MUT (Metro Tobalaba)",
        maxGroup: "Máx 15 personas",
        languages: "Español / English",
        image: "/tours/mut.jpg",
        stops: ["Plaza Central MUT", "Mercados de especialidad", "Huertos y Techos Verdes", "Caserío Gastronómico", "Conexión Tobalaba"],
        rating: 5.0,
        reviewsCount: 450
    },
    "tour-dictadura-chile-1973": {
        active: false,
        title: "Memoria Histórica 1973",
        tagline: "Dictadura y Resiliencia",
        description: "Un recorrido honesto y necesario sobre el golpe del 11 de septiembre de 1973. Historia contemporánea con rigor y respeto.",
        longContent: "Este no es un tour político, es un tour humano. Carlos, con años de investigación, te guiará por el centro cívico explicando el bombardeo a La Moneda, la figura de Salvador Allende y el legado que marcó a Chile. \n\nHablaremos de los Sitios de Memoria y de la transición democrática en una experiencia fundamental para entender la complejidad social de Sudamérica.",
        duration: "2h 30m",
        startPoint: "Plaza de la Constitución",
        maxGroup: "Solemne",
        languages: "Español / English",
        image: "/tours/dictadura.jpg",
        stops: ["Palacio de La Moneda", "Plaza de la Constitución", "Estatua de Salvador Allende", "Memorial calle Morandé 80", "Londres 38"],
        rating: 4.9,
        reviewsCount: 1890
    },
    "tour-barrio-yungay-arte-urbano": {
        active: false,
        title: "Street Art Barrio Yungay",
        tagline: "Patrimonio y Bohemia",
        description: "Explora el barrio más cool de Santiago según Time Out. Muralismo, arquitectura patrimonial y la energía de la 'nueva bohemia'.",
        longContent: "Lejos del ruido de los rascacielos, el Barrio Yungay preserva la esencia de un Santiago que se niega a desaparecer. Carlos te mostrará murales de artistas de clase mundial que usan las paredes como lienzos para la poesía urbana. \n\nVeremos pasajes escondidos y entenderemos por qué el actual presidente de Chile decidió vivir aquí.",
        duration: "2h 30m",
        startPoint: "Metro Quinta Normal",
        maxGroup: "Máx 15 personas",
        languages: "Español / English",
        image: "/tours/yungay.jpg",
        stops: ["Parque Quinta Normal", "Plaza Yungay", "Pasaje Lucrecia Valdés", "Murales de calle Esperanza"],
        rating: 4.8,
        reviewsCount: 940
    }
};

toursData["tour-dictadura-chile-1973"] = toursData["tour-dictadura-chile-1973"];
toursData["tour-memoria-historica-dictadura"] = toursData["tour-dictadura-chile-1973"];
toursData["tour-gastronomico-mercado-la-vega"] = toursData["tour-mut-santiago-urbano"];
toursData["tour-gastronomico-mercados-santiago"] = toursData["tour-mut-santiago-urbano"];

function getTourStatus(slug: string): boolean {
    try {
        const filePath = path.join(process.cwd(), 'src', 'data', 'tours-status.json');
        if (fs.existsSync(filePath)) {
            const fileContent = fs.readFileSync(filePath, 'utf8');
            const statusData = JSON.parse(fileContent);
            return statusData[slug] ?? toursData[slug]?.active ?? false;
        }
    } catch (e) {
        console.error("Error reading tour status:", e);
    }
    return toursData[slug]?.active ?? false;
}

export default async function TourPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const baseTour = toursData[slug];

    if (!baseTour) notFound();

    // Merge status from JSON
    const tourStatus = getTourStatus(slug);
    const tour = { ...baseTour, active: tourStatus };

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "TouristTrip",
        "name": tour.title,
        "description": tour.description,
        "itinerary": tour.stops.map((stop: string) => ({ "@type": "City", "name": stop })),
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD",
            "description": "Free Tour / Paga lo que quieras"
        }
    };

    return (
        <main className="min-h-screen bg-white">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            <section className="relative h-[60vh] md:h-[70vh] flex items-end">
                <div className="absolute inset-0 bg-slate-200">
                    <Image src={tour.image} alt={tour.title} fill className="object-cover" priority />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
                <div className="relative z-10 max-w-7xl mx-auto px-6 pb-16 w-full text-left">
                    <Link href="/#tours" className="inline-flex items-center gap-2 mb-6 text-primary font-bold hover:gap-4 transition-all">
                        <ChevronLeft size={20} /> VOLVER A LOS TOURS
                    </Link>
                    <div className="flex flex-wrap gap-2 mb-4">
                        <span className="bg-white/90 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-primary border border-slate-100 flex items-center gap-1">
                            🇪🇸 Español
                        </span>
                        <span className="bg-white/90 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-primary border border-slate-100 flex items-center gap-1">
                            🇬🇧 English
                        </span>
                    </div>
                    <h1 className="text-5xl md:text-8xl font-black font-outfit text-primary tracking-tighter mb-4 leading-none">{tour.title}</h1>
                    <p className="text-xl md:text-3xl font-bold text-accent uppercase tracking-widest">{tour.tagline}</p>
                </div>
            </section>

            <section className="py-20 text-left">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-16">
                    <div className="lg:col-span-2">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                            {[
                                { icon: Clock, label: "DURACIÓN", val: tour.duration },
                                { icon: Globe2, label: "IDIOMAS", val: "ES/EN" },
                                { icon: CircleDollarSign, label: "PRECIO", val: "Free Tour" },
                                { icon: Star, label: "RESSEÑAS", val: `${tour.rating}/5` }
                            ].map((s, i) => (
                                <div key={i} className="bg-slate-50 p-6 rounded-3xl border border-slate-100 flex flex-col items-center">
                                    <s.icon className="text-accent mb-2" size={20} />
                                    <span className="text-[10px] font-black text-slate-400">{s.label}</span>
                                    <span className="font-bold text-primary text-sm sm:text-base">{s.val}</span>
                                </div>
                            ))}
                        </div>

                        <article className="prose prose-xl prose-slate max-w-none text-left">
                            <h2 className="text-4xl font-black font-outfit text-primary mb-8 subrayado-accent inline-block">LA EXPERIENCIA CON CARLOS</h2>

                            {/* CAJA DE EXPLICACIÓN FREE TOUR */}
                            <div className="bg-blue-50 border border-blue-100 p-8 rounded-[2rem] mb-12 flex flex-col md:flex-row gap-6 items-start">
                                <div className="bg-white p-4 rounded-2xl shadow-sm">
                                    <Info className="text-primary" size={28} />
                                </div>
                                <div className="text-left">
                                    <h4 className="text-xl font-black text-primary mb-2">¿Cómo funciona un Free Tour?</h4>
                                    <p className="text-base text-slate-600 font-medium leading-relaxed">
                                        No tienen precio fijo. Al finalizar, cada persona aporta lo que considere justo según su satisfacción. Como orientación, se recomienda un aporte mínimo de **$10 USD (o equivalente)** por asistente para valorar el trabajo del guía.
                                    </p>
                                </div>
                            </div>

                            <p className="text-xl font-semibold text-slate-600 mb-10 leading-relaxed italic">
                                "{tour.description}"
                            </p>

                            <div className="space-y-6 text-slate-700 leading-relaxed mb-16">
                                {tour.longContent.split('\n\n').map((p: string, i: number) => <p key={i}>{p}</p>)}
                            </div>

                            <div>
                                <h3 className="text-2xl font-black text-primary mb-10 tracking-widest uppercase">PUNTOS CLAVE DEL RECORRIDO</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {tour.stops.map((stop: string, i: number) => (
                                        <div key={i} className="flex items-center gap-4 p-6 bg-white border border-slate-100 rounded-3xl shadow-sm hover:border-accent/40 transition-all">
                                            <div className="w-10 h-10 bg-accent text-white rounded-2xl flex items-center justify-center font-black">{i + 1}</div>
                                            <span className="font-bold text-primary">{stop}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </article>
                    </div>

                    <div className="lg:col-span-1">
                        <div className="sticky top-32">
                            <div className="bg-white p-8 rounded-[3rem] shadow-2xl border border-slate-100 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-1000" />

                                {tour.active ? (
                                    <>
                                        <div className="flex items-center gap-2 mb-6 text-green-600 font-black text-[10px] uppercase tracking-widest">
                                            <Shield size={14} /> Espacios disponibles hoy
                                        </div>
                                        <h4 className="text-3xl font-black font-outfit text-primary mb-8">ASEGURA TU LUGAR</h4>
                                        <BookingForm />
                                    </>
                                ) : (
                                    <div className="text-center py-10">
                                        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-400">
                                            <Clock size={32} />
                                        </div>
                                        <h4 className="text-2xl font-black font-outfit text-primary mb-4 uppercase">NO DISPONIBLE</h4>
                                        <p className="text-slate-500 font-medium leading-relaxed mb-6">
                                            Carlos no está realizando este tour en este momento. Vuelve pronto para nuevas fechas.
                                        </p>
                                        <button
                                            onClick={() => window.dispatchEvent(new CustomEvent('open-chatbot'))}
                                            className="w-full py-4 bg-primary/5 border border-primary/10 rounded-2xl font-black text-primary hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-2"
                                        >
                                            <Bot size={20} /> PREGUNTAR A PATI (IA)
                                        </button>
                                    </div>
                                )}

                                <div className="mt-8 pt-8 border-t border-slate-100 flex items-center gap-4">
                                    <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center overflow-hidden border-2 border-white shadow-sm">
                                        <Image src="/carlos/perfil.jpg" alt="Carlos" width={48} height={48} className="object-cover" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase">Guía Senior</p>
                                        <p className="font-black text-primary leading-none">Carlos te recibirá en el punto de encuentro</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
