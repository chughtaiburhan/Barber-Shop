"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Facebook, Twitter, Instagram } from "lucide-react";

const barbers = [
    {
        name: "Mark Brown",
        role: "Owner",
        bio: "Glavi amet ritnisl libero molestie ante ut fringilla purus eros quis glavrd from dolor amet iquam lorem bibendum",
        image: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=2074&auto=format&fit=crop"
    },
    {
        name: "David Villegas",
        role: "Barber",
        bio: "Glavi amet ritnisl libero molestie ante ut fringilla purus eros quis glavrd from dolor amet iquam lorem bibendum",
        image: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?q=80&w=2070&auto=format&fit=crop"
    },
    {
        name: "Robert Fifield",
        role: "Barber",
        bio: "Glavi amet ritnisl libero molestie ante ut fringilla purus eros quis glavrd from dolor amet iquam lorem bibendum",
        image: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?q=80&w=1974&auto=format&fit=crop"
    },
    {
        name: "Clayton Lane",
        role: "Barber",
        bio: "Glavi amet ritnisl libero molestie ante ut fringilla purus eros quis glavrd from dolor amet iquam lorem bibendum",
        image: "https://images.unsplash.com/photo-1534308143481-c55f00be8bd7?q=80&w=1930&auto=format&fit=crop"
    },
    {
        name: "Dan Spinello",
        role: "Barber",
        bio: "Glavi amet ritnisl libero molestie ante ut fringilla purus eros quis glavrd from dolor amet iquam lorem bibendum",
        image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1887&auto=format&fit=crop"
    },
    {
        name: "Dwight Atkins",
        role: "Stylist",
        bio: "Glavi amet ritnisl libero molestie ante ut fringilla purus eros quis glavrd from dolor amet iquam lorem bibendum",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1887&auto=format&fit=crop"
    }
];

export default function Team() {
    return (
        <section className="py-20 bg-zinc-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-5xl font-bold text-white">Our Barbers</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {barbers.map((barber, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="relative h-[500px] rounded-2xl overflow-hidden group bg-black"
                        >
                            <Image
                                src={barber.image}
                                alt={barber.name}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                            />

                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-90" />

                            {/* Content */}
                            <div className="absolute bottom-0 left-0 w-full p-8">
                                <h3 className="text-2xl font-bold text-white uppercase tracking-wide mb-1">{barber.name}</h3>
                                <p className="text-carmine-500 font-medium mb-4">{barber.role}</p>
                                <p className="text-gray-400 text-sm leading-relaxed mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                                    {barber.bio}
                                </p>

                                <div className="flex gap-4">
                                    <a href="#" className="text-gray-400 hover:text-carmine-500 transition-colors">
                                        <Facebook className="w-5 h-5" />
                                    </a>
                                    <a href="#" className="text-gray-400 hover:text-carmine-500 transition-colors">
                                        <Twitter className="w-5 h-5" />
                                    </a>
                                    <a href="#" className="text-gray-400 hover:text-carmine-500 transition-colors">
                                        <Instagram className="w-5 h-5" />
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
