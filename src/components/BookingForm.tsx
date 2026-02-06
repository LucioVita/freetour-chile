"use client";

import { useState } from "react";
import { MessageCircle, Users, Loader2 } from "lucide-react";
import { sendToN8n } from "@/app/actions";

const CARLOS_PHONE = "56983072325"; // Número real de Carlos

export default function BookingForm() {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        tour: "Santiago Essentials (Free Tour)",
        nombre: "",
        whatsapp: "",
        fecha: "",
        personas: "1",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Usamos la Server Action para evitar errores de CORS
        await sendToN8n({
            ...formData,
            fuente: "Sitio Web Oficial"
        });

        const message = `Hola Carlos! Quiero reservar:
📍 Tour: ${formData.tour}
👤 Nombre: ${formData.nombre}
📅 Fecha: ${formData.fecha}
👥 Personas: ${formData.personas}
📱 WhatsApp: ${formData.whatsapp}
Espero confirmación!`;

        const whatsappUrl = `https://wa.me/${CARLOS_PHONE}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, "_blank");
        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 p-2 text-left">
            <div className="space-y-4">
                <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Selecciona tu experiencia</label>
                    <select
                        className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-primary focus:ring-2 focus:ring-accent outline-none appearance-none cursor-pointer"
                        value={formData.tour}
                        onChange={(e) => setFormData({ ...formData, tour: e.target.value })}
                        disabled={loading}
                    >
                        <option>Santiago Essentials (Free Tour)</option>
                        <option>MUT Santiago Urbano</option>
                        <option>Tour Dictadura Chile 1973</option>
                        <option>Street Art Barrio Yungay</option>
                    </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Tu Nombre</label>
                        <input
                            type="text"
                            placeholder="Ej: Alex Smith"
                            required
                            className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-primary focus:ring-2 focus:ring-accent outline-none"
                            value={formData.nombre}
                            onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                            disabled={loading}
                        />
                    </div>
                    <div>
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">WhatsApp</label>
                        <input
                            type="tel"
                            placeholder="+56 9..."
                            required
                            className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-primary focus:ring-2 focus:ring-accent outline-none"
                            value={formData.whatsapp}
                            onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                            disabled={loading}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Fecha</label>
                        <input
                            type="date"
                            required
                            className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-primary focus:ring-2 focus:ring-accent outline-none"
                            value={formData.fecha}
                            onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
                            disabled={loading}
                        />
                    </div>
                    <div>
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">¿Cuántos son?</label>
                        <div className="relative">
                            <input
                                type="number"
                                min="1"
                                required
                                className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-primary focus:ring-2 focus:ring-accent outline-none"
                                value={formData.personas}
                                onChange={(e) => setFormData({ ...formData, personas: e.target.value })}
                                disabled={loading}
                            />
                            <Users className="absolute right-4 top-4 text-slate-300" size={20} />
                        </div>
                    </div>
                </div>
            </div>

            <button
                type="submit"
                disabled={loading}
                className={`mt-4 w-full py-6 rounded-3xl font-black text-xl shadow-xl transition-all flex items-center justify-center gap-3 group ${loading ? "bg-slate-200 text-slate-400 cursor-not-allowed" : "bg-primary text-white hover:bg-primary-dark"
                    }`}
            >
                {loading ? (
                    <Loader2 className="animate-spin text-primary" size={24} />
                ) : (
                    <>
                        <MessageCircle className="group-hover:scale-110 transition-transform" />
                        RESERVAR POR WHATSAPP
                    </>
                )}
            </button>

            <p className="text-[10px] text-center font-bold text-slate-400 uppercase tracking-tighter">
                {loading ? "Procesando reserva..." : "Confirmación inmediata • Sin tarjetas"}
            </p>
        </form>
    );
}
