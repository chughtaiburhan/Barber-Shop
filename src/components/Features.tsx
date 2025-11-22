"use client";

import { motion } from "framer-motion";
import { Scissors, Star, Clock, Coffee, Wifi, ShieldCheck } from "lucide-react";

const features = [
    {
        icon: Scissors,
        title: "Master Barbers",
        description: "Our team consists of highly skilled professionals with years of experience in traditional and modern techniques."
    },
    {
        icon: Star,
        title: "Premium Products",
        description: "We use only the finest grooming products to ensure your hair and skin get the best treatment possible."
    },
    {
        icon: Clock,
        title: "Easy Booking",
        description: "Book your appointment online in seconds. Choose your barber, date, and time with our seamless system."
    },
    {
        icon: Coffee,
        title: "Relaxing Atmosphere",
        description: "Enjoy a complimentary beverage and unwind in our premium lounge while you wait for your service."
    },
    {
        icon: Wifi,
        title: "Free Wi-Fi",
        description: "Stay connected while you wait or during your service with our high-speed internet access."
    },
    {
        icon: ShieldCheck,
        title: "Hygiene First",
        description: "We adhere to the strictest sanitation standards to ensure a safe and clean environment for every client."
    }
];

export default function Features() {
    return (
        <section className="py-24 bg-zinc-900 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5 pointer-events-none">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M0 40L40 0H20L0 20M40 40V20L20 40" stroke="white" strokeWidth="1" fill="none" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid-pattern)" />
                </svg>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-carmine-500 font-bold tracking-[0.2em] uppercase mb-3 text-sm">
                        Why Choose Us
                    </h2>
                    <h3 className="text-3xl md:text-4xl font-bold text-white">
                        The Ultimate Grooming Experience
                    </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-black/50 backdrop-blur-sm p-8 rounded-lg border border-zinc-800 hover:border-carmine-500/50 transition-all duration-300 group hover:-translate-y-1"
                        >
                            <div className="w-12 h-12 bg-carmine-900/20 rounded-full flex items-center justify-center mb-6 group-hover:bg-carmine-600 transition-colors duration-300">
                                <feature.icon className="w-6 h-6 text-carmine-500 group-hover:text-white transition-colors duration-300" />
                            </div>
                            <h4 className="text-xl font-bold text-white mb-4">{feature.title}</h4>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
