"use client";

import { useState } from "react";
import { Mail, Users, Loader2, CheckCircle2 } from "lucide-react";
import { sendToN8n } from "@/app/actions";

export default function BookingForm() {
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        tour: "Santiago Essentials (Free Tour)",
        nombre: "",
        email: "",
        fecha: "",
        hora: "11:00",
        personas: "1",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Usamos la Server Action para evitar errores de CORS
        const result = await sendToN8n({
            ...formData,
            fuente: "Sitio Web Oficial"
        });

        if (result.success) {
            setSubmitted(true);
        } else {
            alert("Hubo un error al procesar tu reserva. Por favor intenta nuevamente.");
        }

        setLoading(false);
    };

    if (submitted) {
        return (
            <div className="flex flex-col items-center justify-center p-12 text-center animate-in fade-in zoom-in duration-500">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 className="text-green-600" size={40} />
                </div>
                <h3 className="text-2xl font-black text-primary mb-4 uppercase">¡RESERVA ENVIADA!</h3>
                <p className="text-slate-600 font-bold mb-8 leading-relaxed">
                    Hemos recibido tus datos. Te enviaremos un correo de confirmación a <span className="text-primary">{formData.email}</span> muy pronto.
                </p>
                <button
                    onClick={() => setSubmitted(false)}
                    className="text-xs font-black text-slate-400 uppercase tracking-widest hover:text-primary transition-colors"
                >
                    Hacer otra reserva
                </button>
            </div>
        );
    }

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
                        <option value="Santiago Essentials (Free Tour)">Santiago Essentials (Free Tour)</option>
                        <option value="MUT Santiago Urbano" disabled>MUT Santiago Urbano - PRÓXIMAMENTE</option>
                        <option value="Tour Dictadura Chile 1973" disabled>Tour Dictadura Chile 1973 - PRÓXIMAMENTE</option>
                        <option value="Street Art Barrio Yungay" disabled>Street Art Barrio Yungay - PRÓXIMAMENTE</option>
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
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Email de contacto</label>
                        <input
                            type="email"
                            placeholder="tu@email.com"
                            required
                            className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-primary focus:ring-2 focus:ring-accent outline-none"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                            onChange={(e) => {
                                const newFecha = e.target.value;
                                const isSunday = new Date(newFecha + "T12:00:00").getDay() === 0;
                                setFormData({
                                    ...formData,
                                    fecha: newFecha,
                                    hora: isSunday ? "11:00" : formData.hora
                                });
                            }}
                            disabled={loading}
                        />
                    </div>
                    <div>
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Hora de inicio</label>
                        <div className="relative">
                            <select
                                required
                                className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-primary focus:ring-2 focus:ring-accent outline-none appearance-none cursor-pointer"
                                value={formData.hora}
                                onChange={(e) => setFormData({ ...formData, hora: e.target.value })}
                                disabled={loading}
                            >
                                <option value="11:00">11:00 AM</option>
                                {formData.fecha && new Date(formData.fecha + "T12:00:00").getDay() !== 0 && (
                                    <option value="15:00">15:00 PM</option>
                                )}
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400"><path d="m6 9 6 6 6-6" /></svg>
                            </div>
                        </div>
                    </div>
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
                        <Mail className="group-hover:scale-110 transition-transform" />
                        RESERVAR
                    </>
                )}
            </button>

            <p className="text-[10px] text-center font-bold text-slate-400 uppercase tracking-tighter">
                {loading ? "Procesando reserva..." : "Confirmación rápida • Sin tarjetas"}
            </p>
        </form>
    );
}
