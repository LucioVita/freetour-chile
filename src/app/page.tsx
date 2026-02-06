"use client";

import Image from "next/image";
import Link from "next/link";
import BookingForm from "@/components/BookingForm";
import { Star, ShieldCheck, Map, Users, Quote, ChevronDown, Award, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

const tours = [
  {
    id: "essentials",
    title: "Santiago Todo en Uno",
    subtitle: "Imprescindibles y mucho más",
    description: "El tour que nos hizo #1. Plaza de Armas, La Moneda y los secretos de la fundación de Chile narrados por expertos.",
    image: "https://images.unsplash.com/photo-1594916893633-88741349a8f4?auto=format&fit=crop&q=80&w=800",
    slug: "free-tour-santiago-imprescindible",
    tag: "El más reservado"
  },
  {
    id: "markets",
    title: "Mercados y Saber Vivir",
    subtitle: "Turismo Sensorial",
    description: "La Vega y Tirso de Molina. No solo es comida; es entender por qué el santiaguino vive como vive.",
    image: "https://images.unsplash.com/photo-1591871925023-1d9bac055938?auto=format&fit=crop&q=80&w=800",
    slug: "tour-gastronomico-mercados-santiago",
    tag: "Auténtico"
  },
  {
    id: "history",
    title: "Memoria Histórica",
    subtitle: "Dictadura y Resiliencia",
    description: "Un recorrido profundo sobre el golpe de 1973. Historia contemporánea con la perspectiva de guías que vivieron el cambio.",
    image: "https://images.unsplash.com/photo-1549615591-6228303f8fbf?auto=format&fit=crop&q=80&w=800",
    slug: "tour-memoria-historica-dictadura",
    tag: "Recomendado"
  },
  {
    id: "art",
    title: "Street Art Yungay",
    subtitle: "Barrio Patrimonio y Bohemia",
    description: "Explora el barrio más 'cool' según Time Out. Muralismo, arquitectura y cultura urbana de vanguardia.",
    image: "https://images.unsplash.com/photo-1561570183-503487f583f7?auto=format&fit=crop&q=80&w=800",
    slug: "tour-barrio-yungay-arte-urbano",
    tag: "Instagrammable"
  }
];

const reviews = [
  { name: "Sarah Miller", country: "Canada", text: "Finding Carlos was the highlight of our trip. He's not just a guide, he's a storyteller with an incredible soul.", rating: 5 },
  { name: "Antonio López", country: "España", text: "He tomado muchos free tours, pero el nivel de detalle y pasión de Carlos en el tour de la Dictadura no tiene rival.", rating: 5 },
  { name: "Jessica Hunt", country: "Australia", text: "The Markets tour was amazing. Real food, real people. Carlos is definitely the best in Santiago!", rating: 5 }
];

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* HERO SECTION - DOMINANCIA TOTAL */}
      <section className="relative h-screen flex items-center justify-center bg-slate-900">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1589147482342-999333555541?auto=format&fit=crop&q=80&w=1920"
            alt="Santiago de Chile Skyline"
            fill
            className="object-cover opacity-60"
            priority
          />
        </div>

        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-background to-transparent z-10" />

        <div className="relative z-20 text-center px-6 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-xl border border-white/20 text-white px-6 py-3 rounded-full mb-10">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-xs font-black uppercase tracking-[0.2em]">Guías #1 en GuruWalk y Civitatis</span>
            </div>

            <h1 className="text-6xl md:text-9xl font-black font-outfit text-white mb-8 leading-[0.85] tracking-tighter">
              SANTIAGO <br />
              <span className="text-accent">SIN FILTROS</span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-200 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
              Reserva directamente con **Carlos**, LocalExpert y mejor guía de Santiago. Experiencias auténticas, grupos humanos y 0% comisiones.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <Link
                href="#tours"
                className="bg-accent text-white px-12 py-6 rounded-[2rem] font-black text-xl shadow-[0_20px_50px_rgba(180,83,9,0.3)] hover:scale-105 active:scale-95 transition-all"
              >
                Ver Nuestros Tours
              </Link>
              <Link
                href="#reservar"
                className="bg-white/10 backdrop-blur-lg text-white border border-white/20 px-12 py-6 rounded-[2rem] font-black text-xl hover:bg-white/20 transition-all"
              >
                Reserva Directa
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECCIÓN CARLOS - AUTORIDAD Y EEAT */}
      <section className="py-32 bg-background relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl" />
              <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white dark:border-slate-800 rotate-2">
                <Image
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800"
                  alt="Carlos - Guía Local Experto"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 glass p-6 rounded-3xl shadow-xl flex items-center gap-4 border border-accent/20">
                <div className="bg-accent text-white p-3 rounded-2xl">
                  <Award size={32} />
                </div>
                <div>
                  <p className="font-black text-primary leading-none text-xl">LocalExpert</p>
                  <p className="text-xs font-bold text-muted-foreground uppercase mt-1">Status Civitatis</p>
                </div>
              </div>
            </div>

            <div className="text-left">
              <h2 className="text-4xl md:text-5xl font-black font-outfit mb-8 text-primary leading-tight">
                Camina con el Guía <br /> <span className="text-accent underline decoration-8 underline-offset-4">Mejor Valorado</span>
              </h2>
              <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
                Hola, soy **Carlos**. He guiado a miles de viajeros en las principales plataformas, logrando el puesto **#1 en GuruWalk**. Mi objetivo con este sitio es ofrecerte el mismo recorrido de excelencia, pero con la libertad de un trato directo, grupos más íntimos y una pasión sin intermediarios.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="text-green-500 mt-1" size={20} />
                  <div>
                    <h5 className="font-bold">Guía Certificado</h5>
                    <p className="text-sm text-muted-foreground">Registrado oficialmente en Sernatur Chile.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="text-green-500 mt-1" size={20} />
                  <div>
                    <h5 className="font-bold">+2,500 Reseñas</h5>
                    <p className="text-sm text-muted-foreground">Con promedio de 4.9 estrellas en toda mi carrera.</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6 p-6 bg-muted/50 rounded-3xl border border-border">
                <div className="text-center">
                  <span className="block text-2xl font-black text-accent">#1</span>
                  <span className="text-[10px] uppercase font-black text-muted-foreground">GuruWalk Ranking</span>
                </div>
                <div className="w-[1px] h-10 bg-border" />
                <div className="text-center">
                  <span className="block text-2xl font-black text-primary">5.0</span>
                  <span className="text-[10px] uppercase font-black text-muted-foreground">Civitatis LocalExpert</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TOURS GRID - IMÁGENES CORREGIDAS */}
      <section id="tours" className="py-32 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-5xl md:text-7xl font-black font-outfit mb-4 tracking-tighter uppercase">NUESTRAS <span className="text-accent italic">RUTAS</span></h2>
          <p className="text-xl text-muted-foreground mb-20 max-w-2xl mx-auto font-medium leading-relaxed">
            Historias profundas, mercados reales y el Santiago que no sale en las postales genéricas.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {tours.map((tour) => (
              <Link key={tour.id} href={`/tours/${tour.slug}`} className="group relative aspect-[3/4.5] rounded-[3rem] overflow-hidden shadow-2xl hover:-translate-y-4 transition-all duration-500">
                <Image src={tour.image} alt={tour.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                <div className="absolute top-8 left-8">
                  <span className="bg-accent text-white px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                    {tour.tag}
                  </span>
                </div>

                <div className="absolute bottom-10 left-8 right-8 text-left text-white">
                  <h3 className="text-3xl font-black font-outfit mb-1 leading-none">{tour.title}</h3>
                  <p className="text-sm font-bold text-accent mb-6 uppercase tracking-wider">{tour.subtitle}</p>
                  <div className="w-12 h-1 bg-accent/50 mb-6 group-hover:w-full transition-all duration-500" />
                  <p className="text-sm text-slate-300 font-medium opacity-0 group-hover:opacity-100 transition-opacity translate-y-4 group-hover:translate-y-0 duration-500">
                    {tour.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* PRUEBA SOCIAL - IMPORTANCIA GURUWALK */}
      <section className="py-32 bg-background border-y border-border">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex justify-center mb-10">
            <div className="flex -space-x-4">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="w-16 h-16 rounded-full border-4 border-background bg-muted overflow-hidden">
                  <Image src={`https://i.pravatar.cc/150?u=${i}`} alt="User" width={64} height={64} />
                </div>
              ))}
              <div className="w-16 h-16 rounded-full border-4 border-background bg-primary text-white flex items-center justify-center font-black text-sm">
                +2k
              </div>
            </div>
          </div>
          <h2 className="text-4xl font-black font-outfit mb-16">Elegido por viajeros de todo el mundo</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
            {reviews.map((rev, i) => (
              <div key={i} className="bg-muted/30 p-10 rounded-[2.5rem] border border-border hover:border-accent/30 transition-colors">
                <div className="flex gap-1 mb-6 text-accent">
                  {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
                </div>
                <p className="text-xl font-medium text-slate-800 dark:text-slate-200 mb-8 italic">"{rev.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white font-bold">
                    {rev.name[0]}
                  </div>
                  <div>
                    <h6 className="font-bold text-lg leading-none">{rev.name}</h6>
                    <span className="text-xs font-black text-muted-foreground uppercase">{rev.country}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER & RECOGNITION */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-10">
          <div>
            <h3 className="text-2xl font-black mb-2">Free Walking Tour Santiago</h3>
            <p className="text-slate-400">By Carlos - LocalExpert Certificado</p>
          </div>
          <div className="flex gap-8 items-center bg-white/5 p-6 rounded-3xl border border-white/10">
            <div className="text-center">
              <p className="text-2xl font-black text-accent">4.9/5</p>
              <p className="text-[10px] font-black uppercase text-slate-400">GuruWalk Rating</p>
            </div>
            <div className="w-[1px] h-10 bg-white/10" />
            <div className="text-center">
              <p className="text-2xl font-black text-blue-400">EXCELENCIA</p>
              <p className="text-[10px] font-black uppercase text-slate-400">TripAdvisor 2026</p>
            </div>
          </div>
        </div>
      </section>

      {/* MODAL / FORM SECTION */}
      <section id="reservar" className="py-32 bg-primary relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-7xl font-black font-outfit text-white mb-6 uppercase">RESERVA <br /> <span className="text-accent underline decoration-8">DIRECTO</span></h2>
            <p className="text-blue-100 text-xl font-medium">Olvídate de las apps. Háblanos por WhatsApp y asegura tu lugar gratis con Carlos.</p>
          </div>
          <BookingForm />
        </div>
      </section>
    </div>
  );
}
