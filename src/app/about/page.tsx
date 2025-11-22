"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Team from "@/components/Team";

const shopImages = [
    "https://images.unsplash.com/photo-1503951914875-452162b7f30a?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1634480496821-5580b48f0933?q=80&w=2026&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?q=80&w=1976&auto=format&fit=crop"
];

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-black text-white pt-20">
            {/* Hero Section */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-black/70 z-10" />
                    <div
                        className="w-full h-full bg-cover bg-center bg-no-repeat"
                        style={{
                            backgroundImage: "url('https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=2070&auto=format&fit=crop')"
                        }}
                    />
                </div>
                <div className="relative z-20 text-center px-4">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-5xl md:text-7xl font-bold mb-4"
                    >
                        Our Story
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-xl text-gray-300 max-w-2xl mx-auto"
                    >
                        Redefining the art of grooming since 2015.
                    </motion.p>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-carmine-500 font-bold tracking-wider uppercase mb-2">Who We Are</h2>
                        <h3 className="text-3xl md:text-4xl font-bold mb-6">More Than Just a Haircut</h3>
                        <p className="text-gray-400 mb-6 leading-relaxed">
                            At BarberShop, we believe that a haircut is not just a service, but an experience.
                            Founded with a passion for traditional barbering and modern style, we have created a space
                            where every man can feel relaxed, refined, and revitalized.
                        </p>
                        <p className="text-gray-400 leading-relaxed">
                            Our team of master barbers brings years of experience and a keen eye for detail to every chair.
                            Whether you're looking for a classic cut, a hot towel shave, or a complete style transformation,
                            we are dedicated to helping you look and feel your absolute best.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="grid grid-cols-2 gap-4"
                    >
                        <div className="relative h-64 rounded-lg overflow-hidden">
                            <Image
                                src={shopImages[0]}
                                alt="Shop Interior 1"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="relative h-64 rounded-lg overflow-hidden mt-8">
                            <Image
                                src={shopImages[1]}
                                alt="Shop Interior 2"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Team Section */}
            <Team />

            {/* Mission Section */}
            <section className="py-20 bg-zinc-900">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-8">Our Mission</h2>
                    <p className="text-xl text-gray-300 italic">
                        "To provide an unparalleled grooming experience that combines the timeless traditions of barbering
                        with contemporary style and exceptional service, creating a community where every client feels valued and confident."
                    </p>
                </div>
            </section>
        </div>
    );
}
