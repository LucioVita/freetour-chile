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
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "py-2" : "py-4 md:py-6"
                }`}
        >
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className={`
          flex items-center justify-between px-4 md:px-6 py-3 rounded-2xl transition-all duration-500
          ${scrolled || isOpen ? "glass shadow-xl" : "bg-transparent"}
        `}>
                    {/* Logo - Asegurado para móvil */}
                    <Link href="/" className="flex items-center gap-2 group shrink-0">
                        <div className="w-8 h-8 md:w-10 md:h-10 bg-primary rounded-lg md:rounded-xl flex items-center justify-center text-white shadow-lg">
                            <span className="font-bold text-lg md:text-xl italic">F</span>
                        </div>
                        <span className={`font-black text-lg md:text-xl font-outfit tracking-tighter ${scrolled || isOpen ? "text-primary" : "text-white"}`}>
                            Santiago<span className="text-accent">Walking</span>
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center space-x-8">
                        {["Tours", "FAQ"].map((item) => (
                            <Link
                                key={item}
                                href={`#${item.toLowerCase()}`}
                                className={`text-sm font-bold tracking-wide hover:text-accent transition-colors ${scrolled ? "text-slate-700" : "text-white"
                                    }`}
                            >
                                {item}
                            </Link>
                        ))}
                        <Link
                            href="#reservar"
                            className="bg-accent text-white px-6 py-3 rounded-xl text-sm font-black shadow-lg hover:shadow-accent/40 transition-all"
                        >
                            RESERVA GRATIS
                        </Link>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        className={`md:hidden p-2 rounded-xl transition-colors ${scrolled || isOpen ? "text-primary hover:bg-primary/10" : "text-white hover:bg-white/10"}`}
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="absolute top-[80px] left-4 right-4 glass p-6 rounded-3xl shadow-2xl border border-white/20 md:hidden flex flex-col gap-4 overflow-hidden"
                    >
                        {["Tours", "FAQ"].map((item) => (
                            <Link
                                key={item}
                                href={`#${item.toLowerCase()}`}
                                className="text-lg font-black text-primary p-4 bg-primary/5 rounded-2xl"
                                onClick={() => setIsOpen(false)}
                            >
                                {item}
                            </Link>
                        ))}
                        <Link
                            href="#reservar"
                            className="bg-accent text-white text-center py-5 rounded-2xl font-black text-lg shadow-xl"
                            onClick={() => setIsOpen(false)}
                        >
                            RESERVAR AHORA
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
