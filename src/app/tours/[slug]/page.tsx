import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import BookingForm from "@/components/BookingForm";
import { Clock, MapPin, Users, CheckCircle, Info, Star, ChevronLeft } from "lucide-react";

const toursData: Record<string, any> = {
    "free-tour-santiago-imprescindible": {
        title: "Santiago Todo en Uno",
        tagline: "El tour que define a la capital",
        description: "Únete al recorrido mejor valorado de Santiago. Con más de 2.000 reseñas, este no es el típico tour de fechas y nombres aburridos. Es una inmersión en el alma de Chile, desde su fundación hasta sus desafíos modernos.",
        longContent: "Caminar por el centro de Santiago con Carlos es entender por qué esta ciudad es el corazón latente de los Andes. Comenzaremos en la Plaza de Armas, el kilómetro cero donde la historia colonial se mezcla con el caos vibrante de hoy. No solo veremos la Catedral Metropolitana, entenderemos el poder social que ha tenido en siglos de historia. \n\nPasaremos por el Palacio de La Moneda, donde el guía te relatará los eventos cruciales que transformaron a Chile para siempre. Este tour está diseñado para que, al finalizar, sientas que ya no eres un turista, sino alguien que entiende la idiosincrasia del chileno.",
        duration: "2.5 Horas",
        startPoint: "Plaza de Armas (Pedro de Valdivia)",
        maxGroup: "Grupos Humanos",
        image: "https://images.unsplash.com/photo-1594916893633-88741349a8f4?auto=format&fit=crop&q=80&w=1200",
        highlights: ["Plaza de Armas y su historia oculta", "Palacio de La Moneda y el centro cívico", "Ex-Congreso Nacional y Tribunales", "Cerro Santa Lucía (Punto panorámico)"],
        faqs: [
            { q: "¿Dónde los encuentro?", a: "Frente a la estatua de Pedro de Valdivia en Plaza de Armas. Buscamos el paraguas o distintivo que te enviaremos por WhatsApp." },
            { q: "¿Hay que pagar algo?", a: "Es bajo el sistema de propinas. Tú decides el valor según tu presupuesto y cuánto hayas disfrutado del conocimiento del guía." }
        ],
        schema: ["Plaza de Armas", "La Moneda", "Cerro Santa Lucía"]
    },
    "tour-gastronomico-mercados-santiago": {
        title: "Mercados y Saber Vivir",
        tagline: "El Santiago Sensorial",
        description: "Descubre por qué la comida es el lenguaje del amor en Chile. Un tour diseñado para los 'foodies' y aquellos que quieren salir de la burbuja turística y entrar al Santiago real.",
        longContent: "En el Mercado Tirso de Molina y La Vega Central no solo se vende fruta; se vende cultura. Carlos te llevará a través de los pasillos donde el santiaguino de verdad compra sus víveres. Probaremos la 'Sopaipilla' de calle (con mucho pebre), el famoso 'Mote con Huesillo' y entenderemos la influencia de la inmigración en la mesa chilena. \n\nEste tour es una 'inmersión sensorial'. Te enseñaremos a distinguir un buen aguacate (palta) y por qué el mercado es el termómetro social del país. Prepárate para olores, colores y sabores que no encontrarás en ningún restaurante del sector oriente.",
        duration: "3 Horas",
        startPoint: "Mercado Tirso de Molina",
        maxGroup: "Máx 12 personas",
        image: "https://images.unsplash.com/photo-1591871925023-1d9bac055938?auto=format&fit=crop&q=80&w=1200",
        highlights: ["Pasillos secretos de La Vega Central", "Degustación de sabores típicos", "Historia de La Chimba", "Mercado de Abastos Tirso de Molina"],
        faqs: [
            { q: "¿El tour incluye la comida?", a: "Las paradas son para degustaciones pequeñas. Recomendamos traer unos pesos extra si deseas comprar una porción completa o frutas." }
        ],
        schema: ["Tirso de Molina", "La Vega Central", "La Chimba"]
    },
    "tour-memoria-historica-dictadura": {
        title: "Memoria Histórica",
        tagline: "Dictadura y Humanidad",
        description: "Un recorrido honesto y necesario. Por qué el 11 de septiembre de 1973 sigue definiendo a Chile hoy. Un tour de reflexión, respeto y datos históricos precisos.",
        longContent: "Este no es un tour político, es un tour humano. Carlos, con años de investigación y relatos de primera mano, te guiará por el centro cívico explicando el bombardeo a La Moneda, la figura de Salvador Allende y el legado de Augusto Pinochet. \n\nHablaremos de los Sitios de Memoria, de la transición democrática y de cómo el Chile actual es un reflejo de esas heridas y cicatrices. Es una experiencia fundamental para cualquier viajero que quiera mirar más allá de la superficie y entender la complejidad social de Sudamérica.",
        duration: "3 Horas",
        startPoint: "Plaza de la Constitución",
        maxGroup: "Respeto total",
        image: "https://images.unsplash.com/photo-1549615591-6228303f8fbf?auto=format&fit=crop&q=80&w=1200",
        highlights: ["Palacio de La Moneda (Sitio del bombardeo)", "Plaza de la Constitución y estatuas históricas", "Museo de la Memoria (Introducción)", "Casco histórico y centros de detención"],
        faqs: [
            { q: "¿Es un tema muy fuerte?", a: "Es solemne y educativo. No usamos el morbo, sino la historia para entender el presente. Apto para mayores de 12 años." }
        ],
        schema: ["La Moneda", "Plaza de la Ciudadanía", "Centro Histórico"]
    },
    "tour-barrio-yungay-arte-urbano": {
        title: "Street Art & Barrio Yungay",
        tagline: "El epicentro de la bohemia",
        description: "Designado como uno de los barrios más cool del mundo, Yungay es un museo al aire libre. Arte urbano, arquitectura patrimonial y la energía de la 'nueva bohemia' santiaguina.",
        longContent: "Lejos del ruido de los rascacielos, el Barrio Yungay preserva la esencia de un Santiago que se niega a desaparecer. Carlos te mostrará murales de artistas de clase mundial que usan las paredes como lienzos para la protesta y la poesía. \n\nVeremos pasajes escondidos, hablaremos de la arquitectura francesa del siglo XIX y entenderemos por qué el actual presidente de Chile decidió vivir aquí. Este tour es ideal para amantes de la fotografía, la arquitectura y aquellos que buscan la vibración 'hipster' y cultural de la capital.",
        duration: "2.5 Horas",
        startPoint: "Metro Quinta Normal",
        maxGroup: "Máx 15 personas",
        image: "https://images.unsplash.com/photo-1561570183-503487f583f7?auto=format&fit=crop&q=80&w=1200",
        highlights: ["Murales de gran formato", "Arquitectura patrimonial del siglo XIX", "Pasajes residenciales secretos", "Vida bohemia y plazas del barrio"],
        faqs: [
            { q: "¿Cómo llego?", a: "Fácilmente en la Línea 5 del Metro, estación Quinta Normal. Es un barrio muy seguro durante el día para caminar." }
        ],
        schema: ["Quinta Normal", "Lleva de Yungay", "Pasaje Lucrecia Valdés"]
    }
};

export default function TourPage({ params }: { params: { slug: string } }) {
    const tour = toursData[params.slug];

    if (!tour) notFound();

    // JSON-LD enriquecido para Google (E-E-A-T)
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "TouristTrip",
        "name": tour.title,
        "description": tour.description,
        "provider": {
            "@type": "LocalBusiness",
            "name": "Free Walking Tour Santiago por Carlos",
            "image": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"
        },
        "itinerary": {
            "@type": "ItemList",
            "itemListElement": tour.schema.map((h: string, i: number) => ({
                "@type": "ListItem",
                "position": i + 1,
                "name": h
            }))
        },
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "CLP",
            "description": "Free Walking Tour - Pago basado en propinas"
        }
    };

    return (
        <div className="flex flex-col w-full bg-background min-h-screen">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* Dynamic Header */}
            <section className="relative h-[65vh] flex items-end">
                <Image src={tour.image} alt={tour.title} fill className="object-cover brightness-[0.4]" priority />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                <div className="relative z-10 max-w-7xl mx-auto px-6 pb-20 w-full text-white">
                    <Link href="/#tours" className="flex items-center gap-2 mb-8 text-white/60 hover:text-white transition-colors">
                        <ChevronLeft size={20} /> <span className="text-sm font-bold uppercase tracking-widest">Todos los tours</span>
                    </Link>
                    <div className="inline-block bg-accent px-4 py-2 rounded-xl mb-6 shadow-xl">
                        <span className="text-[10px] uppercase font-black tracking-widest leading-none">Tour Certificado</span>
                    </div>
                    <h1 className="text-5xl md:text-8xl font-black font-outfit mb-4 leading-none">{tour.title}</h1>
                    <p className="text-2xl font-bold text-accent uppercase tracking-[0.3em]">{tour.tagline}</p>
                </div>
            </section>

            <section className="py-24 bg-background">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-20">

                    {/* Main SEO Content Area */}
                    <div className="lg:col-span-2">
                        <div className="flex flex-wrap gap-4 mb-16">
                            {[
                                { icon: Clock, label: "Duración", val: tour.duration },
                                { icon: MapPin, label: "Salida", val: tour.startPoint },
                                { icon: Users, label: "Grupos", val: tour.maxGroup },
                                { icon: Star, label: "Rating", val: "4.9/5" }
                            ].map((item, i) => (
                                <div key={i} className="flex-1 min-w-[140px] bg-muted/50 p-6 rounded-[2rem] border border-border flex flex-col items-center text-center">
                                    <item.icon className="text-accent mb-3" size={24} />
                                    <span className="text-[10px] uppercase font-black text-muted-foreground tracking-widest mb-1">{item.label}</span>
                                    <span className="font-bold text-slate-800 dark:text-white">{item.val}</span>
                                </div>
                            ))}
                        </div>

                        <article className="prose prose-xl prose-slate dark:prose-invert max-w-none">
                            <h2 className="text-4xl font-black font-outfit mb-8 text-primary uppercase tracking-tighter">La experiencia <br /> con <span className="text-accent italic subrayado">Carlos</span></h2>
                            <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed mb-10 font-medium italic border-l-4 border-accent pl-8">
                                {tour.description}
                            </p>

                            <div className="space-y-8 text-lg text-slate-700 dark:text-slate-400 leading-relaxed lg:columns-1">
                                {tour.longContent.split('\n\n').map((para: string, i: number) => (
                                    <p key={i}>{para}</p>
                                ))}
                            </div>

                            <div className="mt-20">
                                <h3 className="text-2xl font-black font-outfit mb-12 uppercase">Lo que <span className="text-accent">descubrirás:</span></h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {tour.highlights.map((h: string, i: number) => (
                                        <div key={i} className="flex items-start gap-5 p-8 glass rounded-[2.5rem] border border-border group hover:border-accent/30 transition-all">
                                            <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center text-accent font-black shrink-0 group-hover:bg-accent group-hover:text-white transition-all">
                                                {i + 1}
                                            </div>
                                            <p className="font-bold text-lg leading-snug">{h}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* FAQ Sub-section for SEO */}
                            <div className="mt-24 space-y-12">
                                <h3 className="text-2xl font-black font-outfit uppercase">Dudas frecuentes</h3>
                                {tour.faqs.map((faq: any, i: number) => (
                                    <div key={i}>
                                        <h5 className="font-black text-lg mb-2 text-primary">{faq.q}</h5>
                                        <p className="text-muted-foreground">{faq.a}</p>
                                    </div>
                                ))}
                            </div>
                        </article>
                    </div>

                    {/* Sticky Booking Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-32">
                            <div className="relative group">
                                {/* Glow effect */}
                                <div className="absolute -inset-1 bg-gradient-to-r from-accent to-orange-600 rounded-[2.5rem] blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>

                                <div className="relative bg-white dark:bg-slate-900 border border-white/20 p-8 rounded-[2.2rem] shadow-2xl">
                                    <div className="flex items-center justify-center gap-2 mb-2">
                                        <CheckCircle className="text-green-500" size={16} />
                                        <span className="text-[10px] uppercase font-black text-green-500 tracking-widest">Disponibilidad hoy</span>
                                    </div>
                                    <h4 className="text-3xl font-black font-outfit text-center mb-8">Asegura tu lugar</h4>

                                    <BookingForm />

                                    <div className="mt-10 pt-10 border-t border-border">
                                        <div className="flex items-center gap-4 bg-muted/30 p-4 rounded-2xl">
                                            <Image
                                                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100"
                                                alt="Carlos Avatar"
                                                width={48}
                                                height={48}
                                                className="rounded-full grayscale"
                                            />
                                            <div>
                                                <p className="text-xs font-bold leading-none mb-1 text-slate-900 dark:text-white">Pregunta a Carlos</p>
                                                <p className="text-[10px] text-muted-foreground font-black uppercase tracking-tighter">Responde en &lt; 5 min</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </div>
    );
}
