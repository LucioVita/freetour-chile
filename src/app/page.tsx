"use client";
// Slugs SEO Actualizados 2026
// Integración con n8n y GuruWeb

import Image from "next/image";
import Link from "next/link";
import BookingForm from "@/components/BookingForm";
import { Star, ShieldCheck, Map, Users, Award, CheckCircle2, ArrowRight, MapPin, Mail, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const initialTours = [
  {
    id: "essentials",
    active: true,
    comingSoon: false,
    title: "Santiago Todo en Uno",
    subtitle: "Imprescindibles y mucho más",
    description: "El tour oficial de Carlos. Descubre la Plaza de Armas, La Moneda y el Santa Lucía con el guía mejor valorado.",
    image: "/tours/esenciales.jpg",
    slug: "free-tour-santiago-imprescindible",
    tag: "Top #1",
    color: "bg-blue-50"
  },
  {
    id: "mut",
    active: true,
    comingSoon: true,
    title: "MUT Santiago Urbano",
    subtitle: "El nuevo corazón de la ciudad",
    description: "Explora el primer mercado urbano sustentable de Chile. Arquitectura, diseño y la nueva cara de Santiago.",
    image: "/tours/mut.jpg",
    slug: "tour-mut-santiago-urbano",
    tag: "Nuevo & Moderno",
    color: "bg-orange-50"
  },
  {
    id: "history",
    active: true,
    comingSoon: true,
    title: "Memoria Histórica",
    subtitle: "Dictadura y Resiliencia",
    description: "Un recorrido solemne y profundo sobre el golpe de 1973. Historia narrada con respeto y rigor.",
    image: "/tours/dictadura.jpg",
    slug: "tour-dictadura-chile-1973",
    tag: "Cultural",
    color: "bg-slate-50"
  },
  {
    id: "art",
    active: true,
    comingSoon: true,
    title: "Street Art Yungay",
    subtitle: "Bario Cool y Bohemia",
    description: "Muralismo y patrimonio en el barrio más vibrante. El Santiago joven que pocos conocen.",
    image: "/tours/yungay.jpg",
    slug: "tour-barrio-yungay-arte-urbano",
    tag: "Fotogénico",
    color: "bg-purple-50"
  }
];

export default function Home() {
  const [tours, setTours] = useState(initialTours);

  useEffect(() => {
    // URL de la API - usa Hostinger en producción o API local en desarrollo
    const apiUrl = process.env.NEXT_PUBLIC_API_URL
      ? `${process.env.NEXT_PUBLIC_API_URL}/tour-status.php`
      : '/api/webhook/tour-status';

    fetch(apiUrl)
      .then(res => res.json())
      .then(response => {
        // La API de Hostinger devuelve { success: true, data: {...} }
        // La API local devuelve directamente {...}
        const statusData = response.data || response;

        if (Object.keys(statusData).length > 0) {
          const updatedTours = initialTours.map(tour => ({
            ...tour,
            active: statusData[tour.slug] ?? tour.active
          }));
          setTours(updatedTours);
        }
      })
      .catch(err => console.error("Error fetching tour status:", err));
  }, []);

  const activeTours = tours.filter(t => t.active);

  return (
    <div className="flex flex-col w-full bg-white text-slate-900">

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-slate-100">
          <Image
            src="/hero-santiago.jpg"
            alt="Skyline Santiago"
            fill
            className="object-cover opacity-30 scale-105"
            priority
          />
        </div>
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-primary px-5 py-2 rounded-full mb-8 shadow-sm">
              <Award size={16} />
              <span className="text-xs font-black uppercase tracking-widest">Guía LocalExpert #1 en Santiago</span>
            </div>
            <h1 className="text-6xl md:text-9xl font-black font-outfit text-primary mb-6 leading-[0.85] tracking-tighter">
              CAMINA <br />
              <span className="text-accent underline decoration-accent/20 decoration-[12px] underline-offset-4">SANTIAGO</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 mb-12 max-w-2xl mx-auto font-semibold leading-relaxed">
              Descubre la ciudad con <span className="text-primary font-black">Carlos</span>, el guía mejor valorado. Sin intermediarios, sin grupos masivos. Solo historias reales.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <Link href="#tours" className="bg-primary text-white px-10 py-5 rounded-2xl font-black text-lg shadow-xl hover:bg-primary-dark transition-all flex items-center justify-center gap-2">
                VER TOURS <ArrowRight size={20} />
              </Link>
              <Link href="#reservar" className="bg-accent text-white px-10 py-5 rounded-2xl font-black text-lg shadow-xl hover:bg-orange-600 transition-all">
                RESERVAR DIRECTA
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-16 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <span className="block text-4xl md:text-5xl font-black text-primary mb-1">15k+</span>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Viajeros</span>
            </div>
            <div className="text-center">
              <span className="block text-4xl md:text-5xl font-black text-accent mb-1">4.9</span>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Rating GuruWalk</span>
            </div>
            <div className="text-center">
              <span className="block text-4xl md:text-5xl font-black text-blue-600 mb-1">Local</span>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Expert Civitatis</span>
            </div>
            <div className="text-center">
              <span className="block text-4xl md:text-5xl font-black text-green-600 mb-1">100%</span>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Guía Real</span>
            </div>
          </div>
        </div>
      </section>

      {/* Tours Grid */}
      <section id="tours" className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl mb-20 text-left text-left">
            <h2 className="text-5xl md:text-7xl font-black font-outfit text-primary mb-6 leading-none">NUESTRAS <br /> <span className="text-accent underline decoration-accent/10 decoration-[8px]">RUTAS</span></h2>
            <p className="text-xl text-slate-500 font-medium">Diseñadas para ser leídas bajo el sol. Elige tu próxima aventura por Santiago.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {tours.map((tour) => {
              const isDisabled = tour.comingSoon || !tour.active;

              if (isDisabled) {
                return (
                  <div key={tour.id} className="group relative flex flex-col bg-slate-50 rounded-[2rem] overflow-hidden border border-slate-100 opacity-80 cursor-default">
                    <div className="relative h-64 overflow-hidden bg-slate-200 grayscale">
                      <Image src={tour.image} alt={tour.title} fill className="object-cover" />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-10">
                        <span className="text-sm font-black uppercase tracking-widest text-white border border-white/50 px-4 py-2 rounded-full backdrop-blur-sm">
                          PRÓXIMAMENTE
                        </span>
                      </div>
                    </div>
                    <div className="p-8 flex flex-col items-start text-left bg-slate-50">
                      <h3 className="text-2xl font-black font-outfit text-slate-400 leading-none mb-2">
                        {tour.title}
                      </h3>
                      <p className="text-xs font-bold text-slate-300 uppercase tracking-widest mb-4">
                        {tour.subtitle}
                      </p>
                      <p className="text-sm text-slate-400 leading-relaxed font-medium">
                        {tour.description}
                      </p>
                    </div>
                  </div>
                );
              }

              return (
                <Link key={tour.id} href={`/tours/${tour.slug}`} className="group relative flex flex-col bg-white rounded-[2rem] overflow-hidden tour-card-shadow border border-slate-100 transition-all hover:-translate-y-2">
                  <div className="relative h-64 overflow-hidden bg-slate-200">
                    <Image src={tour.image} alt={tour.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur shadow-sm border border-slate-100 px-4 py-1.5 rounded-full z-10">
                      <span className="text-[10px] font-black uppercase tracking-widest text-primary">{tour.tag}</span>
                    </div>
                  </div>
                  <div className="p-8 flex flex-col items-start text-left">
                    <div className="flex gap-2 mb-3">
                      <span className="text-[10px] font-bold bg-slate-100 px-2 py-0.5 rounded text-slate-500">2.5h</span>
                      <span className="text-[10px] font-bold bg-slate-100 px-2 py-0.5 rounded text-slate-500">🇪🇸 🇬🇧</span>
                    </div>
                    <h3 className="text-2xl font-black font-outfit text-primary leading-none mb-2 group-hover:text-accent transition-colors">
                      {tour.title}
                    </h3>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
                      {tour.subtitle}
                    </p>
                    <p className="text-sm text-slate-600 leading-relaxed font-medium">
                      {tour.description}
                    </p>
                    <div className="mt-6 flex items-center gap-2 text-primary font-black text-xs uppercase tracking-tighter group-hover:translate-x-2 transition-transform">
                      Ver Detalles <ArrowRight size={14} />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Booking Form Section */}
      <section id="reservar" className="py-24 bg-primary text-white overflow-hidden relative">
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-7xl font-black font-outfit mb-6 uppercase tracking-tighter">RESERVA <br /> <span className="text-accent underline decoration-accent/20 decoration-[10px]">DIRECTO</span></h2>
            <p className="text-blue-100 text-xl font-bold">Sin intermediarios. Sin pagos previos. Confirmación vía Email.</p>
          </div>
          <div className="bg-white p-2 rounded-[2.5rem] shadow-2xl">
            <BookingForm />
          </div>
        </div>
      </section>

      {/* Carlos Section */}
      <section className="py-24 bg-blue-50 border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="aspect-square rounded-[3rem] overflow-hidden shadow-2xl rotate-2 relative z-10 border-8 border-white bg-slate-200">
              <Image src="/carlos/perfil.jpg" alt="Carlos" fill className="object-cover" />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-accent text-white p-8 rounded-[2rem] z-20 shadow-xl max-w-[200px] text-center">
              <span className="block text-4xl font-black leading-none mb-1">#1</span>
              <span className="text-[10px] font-black uppercase tracking-widest">En GurúWalk Santiago</span>
            </div>
          </div>

          <div className="text-left text-left">
            <h2 className="text-4xl md:text-5xl font-black font-outfit mb-8 text-primary uppercase leading-tight">Camina con el <br /> <span className="text-accent underline decoration-accent/20 decoration-[8px]">Experto Local</span></h2>
            <p className="text-xl text-slate-600 leading-relaxed mb-8 font-medium">
              Hola, soy <span className="text-primary font-black">Carlos</span>. He guiado a más de 15.000 personas por estas calles. Este sitio es mi casa digital para ofrecerte tours directos, honestos y sin comisiones de plataformas externas.
            </p>
            <ul className="space-y-4 mb-10">
              <li className="flex items-center gap-3 font-bold text-slate-700">
                <CheckCircle2 className="text-green-500" size={20} /> Guía Certificado Sernatur
              </li>
              <li className="flex items-center gap-3 font-bold text-slate-700">
                <CheckCircle2 className="text-green-500" size={20} /> Más de 2.000 reseñas 5/5
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* FOOTER ÚNICO Y FINAL */}
      <footer className="bg-primary text-white pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-24">

            <div className="text-left">
              <h4 className="text-2xl font-black font-outfit text-white mb-6">FWT SANTIAGO</h4>
              <p className="text-blue-100 font-medium leading-relaxed">
                Independientes, locales y apasionados. Creamos las mejores experiencias caminando por el corazón de Chile.
              </p>
            </div>

            <div className="text-left">
              <h4 className="text-xs font-black text-blue-300 uppercase tracking-widest mb-6">Secciones</h4>
              <ul className="space-y-4">
                <li><Link href="/" className="font-bold text-white hover:text-accent transition-colors">Inicio</Link></li>
                <li><Link href="#tours" className="font-bold text-white hover:text-accent transition-colors">Nuestros Tours</Link></li>
                <li><Link href="#reservar" className="font-bold text-white hover:text-accent transition-colors">Reserva Directa</Link></li>
              </ul>
            </div>

            <div className="text-left">
              <h4 className="text-xs font-black text-blue-300 uppercase tracking-widest mb-6">Contacto</h4>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 font-bold text-white">
                  <MapPin size={18} className="text-accent" /> Plaza de Armas, Santiago
                </li>
                <li className="flex items-center gap-3 font-bold text-white">
                  <Mail size={18} className="text-accent" /> contacto@freewalkingtoursantiago.cl
                </li>
                <li className="flex items-center gap-3 font-bold text-white">
                  <Phone size={18} className="text-accent" />
                  <Link href="https://wa.me/56983072325" target="_blank" className="hover:text-accent transition-colors">
                    +56 9 8307 2325
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-12 border-t border-white/10 text-center">
            <p className="text-blue-200 text-xs font-bold mb-6">
              © 2026 Free Walking Tour Santiago. Orgullosamente Chileno.
            </p>
            <Link
              href="https://www.guruweb.com.ar"
              target="_blank"
              className="group inline-flex flex-col items-center"
            >
              <span className="text-[9px] font-black uppercase tracking-[0.4em] text-blue-200 group-hover:text-accent transition-colors mb-1">
                developed by
              </span>
              <div className="flex items-center text-xl font-black font-outfit transition-all">
                <span className="text-white group-hover:text-white/80">GURU</span>
                <span className="text-accent">WEB</span>
              </div>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
