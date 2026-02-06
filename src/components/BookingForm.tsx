"use client";

import { useState } from "react";
import { Send } from "lucide-react";

const toursList = [
    "Santiago Essentials (Free Tour)",
    "Mercados y Sabor",
    "Memoria y Dictadura",
    "Street Art Yungay"
];

export default function BookingForm() {
    const [formData, setFormData] = useState({
        tour: toursList[0],
        name: "",
        whatsapp: "",
        date: "",
        people: "1"
    });

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();

        // Configura aquí tu número de WhatsApp real (Código de país + número)
        const MY_PHONE = "569XXXXXXXX";

        const message = `*Nueva Reserva desde la Web*%0A` +
            `-------------------------------%0A` +
            `*Tour:* ${formData.tour}%0A` +
            `*Nombre:* ${formData.name}%0A` +
            `*WhatsApp:* ${formData.whatsapp}%0A` +
            `*Fecha:* ${formData.date}%0A` +
            `*Personas:* ${formData.people}%0A` +
            `-------------------------------%0A` +
            `_Hola! Me gustaría confirmar disponibilidad para este tour._`;

        const whatsappUrl = `https://wa.me/${MY_PHONE}?text=${message}`;
        window.open(whatsappUrl, "_blank");
    };

    return (
        <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl shadow-2xl text-left border border-border">
            <form onSubmit={handleSendMessage} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="col-span-full">
                    <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Selecciona tu Experiencia</label>
                    <select
                        required
                        className="w-full p-4 rounded-2xl bg-muted/50 border border-border focus:ring-2 focus:ring-accent outline-none appearance-none"
                        value={formData.tour}
                        onChange={(e) => setFormData({ ...formData, tour: e.target.value })}
                    >
                        {toursList.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                </div>

                <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Tu Nombre</label>
                    <input
                        type="text"
                        required
                        placeholder="Ej: Alex Smith"
                        className="w-full p-4 rounded-2xl bg-muted/50 border border-border focus:ring-2 focus:ring-accent outline-none"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                </div>

                <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">WhatsApp</label>
                    <input
                        type="tel"
                        required
                        placeholder="+56 9 ..."
                        className="w-full p-4 rounded-2xl bg-muted/50 border border-border focus:ring-2 focus:ring-accent outline-none"
                        value={formData.whatsapp}
                        onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    />
                </div>

                <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Fecha</label>
                    <input
                        type="date"
                        required
                        className="w-full p-4 rounded-2xl bg-muted/50 border border-border focus:ring-2 focus:ring-accent outline-none"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    />
                </div>

                <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">¿Cuántos son?</label>
                    <input
                        type="number"
                        min="1"
                        max="20"
                        required
                        className="w-full p-4 rounded-2xl bg-muted/50 border border-border focus:ring-2 focus:ring-accent outline-none"
                        value={formData.people}
                        onChange={(e) => setFormData({ ...formData, people: e.target.value })}
                    />
                </div>

                <button
                    type="submit"
                    className="col-span-full bg-accent hover:bg-orange-600 text-white font-bold py-5 rounded-2xl text-lg shadow-xl hover:shadow-accent/20 transition-all flex items-center justify-center gap-3 active:scale-95"
                >
                    <Send size={20} />
                    Reservar por WhatsApp Gratis
                </button>

                <p className="col-span-full text-center text-[10px] text-muted-foreground uppercase tracking-widest mt-2">
                    Confirmación inmediata • No requiere tarjeta de crédito
                </p>
            </form>
        </div>
    );
}
