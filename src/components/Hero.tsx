"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
    return (
        <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-black/60 z-10" />
                <div
                    className="w-full h-full bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: "url('https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=2074&auto=format&fit=crop')"
                    }}
                />
            </div>

            {/* Content */}
            <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <h2 className="text-carmine-500 font-bold tracking-[0.2em] uppercase mb-4 text-sm md:text-base">
                        Premium Grooming Experience
                    </h2>
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                        Refine Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">Style</span>
                    </h1>
                    <p className="text-gray-300 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
                        Experience the art of traditional barbering fused with modern styling.
                        Book your appointment today for a cut above the rest.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/book"
                            className="px-8 py-4 bg-carmine-600 text-white font-bold rounded-none hover:bg-carmine-700 transition-all duration-300 uppercase tracking-wider"
                        >
                            Book Appointment
                        </Link>
                        <Link
                            href="#services"
                            className="px-8 py-4 border border-white text-white font-bold rounded-none hover:bg-white hover:text-black transition-all duration-300 uppercase tracking-wider"
                        >
                            View Services
                        </Link>
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
            >
                <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
                    <div className="w-1 h-2 bg-white rounded-full" />
                </div>
            </motion.div>
        </section>
    );
}
