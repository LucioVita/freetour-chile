"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? "py-2" : "py-6"
                }`}
        >
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className={`
          flex items-center justify-between px-6 py-3 rounded-2xl transition-all duration-500
          ${scrolled ? "glass shadow-xl" : "bg-transparent"}
        `}>
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg group-hover:rotate-12 transition-transform">
                            <span className="font-bold text-xl uppercase italic">F</span>
                        </div>
                        <span className={`font-bold text-xl font-outfit tracking-tight ${scrolled ? "text-primary" : "text-white"}`}>
                            Santiago<span className="text-accent">Walking</span>
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center space-x-8">
                        {["Tours", "Sobre Nosotros", "FAQ"].map((item) => (
                            <Link
                                key={item}
                                href={`#${item.toLowerCase().replace(" ", "-")}`}
                                className={`text-sm font-semibold tracking-wide hover:text-accent transition-colors ${scrolled ? "text-slate-700" : "text-white"
                                    }`}
                            >
                                {item}
                            </Link>
                        ))}
                        <Link
                            href="#reservar"
                            className="bg-accent text-white px-6 py-3 rounded-xl text-sm font-bold shadow-lg hover:shadow-accent/40 hover:-translate-y-1 transition-all flex items-center gap-2"
                        >
                            <Calendar size={18} />
                            Reserva Gratis
                        </Link>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        className={`md:hidden p-2 rounded-lg ${scrolled ? "text-primary" : "text-white"}`}
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-24 left-4 right-4 glass p-8 rounded-3xl shadow-2xl border border-white/20 md:hidden flex flex-col gap-6"
                    >
                        {["Tours", "Sobre Nosotros", "FAQ"].map((item) => (
                            <Link
                                key={item}
                                href={`#${item.toLowerCase().replace(" ", "-")}`}
                                className="text-xl font-bold text-primary"
                                onClick={() => setIsOpen(false)}
                            >
                                {item}
                            </Link>
                        ))}
                        <Link
                            href="#reservar"
                            className="bg-accent text-white text-center py-5 rounded-2xl font-bold text-lg shadow-xl"
                            onClick={() => setIsOpen(false)}
                        >
                            Reservar Ahora
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
