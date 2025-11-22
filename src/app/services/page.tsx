"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Scissors, Zap, User } from "lucide-react";

const services = [
    {
        category: "Haircuts",
        image: "https://images.unsplash.com/photo-1593702295094-aea22597af65?q=80&w=2070&auto=format&fit=crop",
        items: [
            { name: "Classic Haircut", price: "$35", description: "Traditional cut with scissors and clippers, finished with a hot towel." },
            { name: "Skin Fade", price: "$40", description: "Precision fade with a razor finish for a sharp look." },
            { name: "Buzz Cut", price: "$25", description: "Uniform length all over with clippers." },
            { name: "Long Hair Styling", price: "$50", description: "Scissor cut and styling for longer hair lengths." },
        ]
    },
    {
        category: "Beard & Shave",
        image: "https://images.unsplash.com/photo-1503951914875-452162b7f30a?q=80&w=2070&auto=format&fit=crop",
        items: [
            { name: "Beard Trim", price: "$25", description: "Shape and trim your beard to perfection." },
            { name: "Hot Towel Shave", price: "$45", description: "Traditional straight razor shave with hot towels and essential oils." },
            { name: "Beard Sculpting", price: "$35", description: "Detailed shaping and lining for a defined look." },
        ]
    },
    {
        category: "Packages",
        image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=2070&auto=format&fit=crop",
        items: [
            { name: "The Gentleman", price: "$70", description: "Haircut + Hot Towel Shave + Facial Massage." },
            { name: "The Express", price: "$55", description: "Haircut + Beard Trim." },
        ]
    }
];

export default function ServicesPage() {
    return (
        <div className="min-h-screen bg-black text-white pt-20">
            <div className="max-w-7xl mx-auto px-4 py-16">
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-bold mb-4">Our Services</h1>
                    <p className="text-xl text-gray-400">Premium grooming services tailored to your style.</p>
                </div>

                <div className="space-y-24">
                    {services.map((section, index) => (
                        <motion.div
                            key={section.category}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}
                        >
                            <div className="w-full lg:w-1/2 h-[400px] relative rounded-lg overflow-hidden border border-zinc-800">
                                <Image
                                    src={section.image}
                                    alt={section.category}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            <div className="w-full lg:w-1/2">
                                <h2 className="text-3xl font-bold text-carmine-500 mb-8 border-b border-zinc-800 pb-4 inline-block">
                                    {section.category}
                                </h2>
                                <div className="space-y-8">
                                    {section.items.map((item) => (
                                        <div key={item.name} className="group">
                                            <div className="flex justify-between items-baseline mb-2">
                                                <h3 className="text-xl font-semibold group-hover:text-white transition-colors">
                                                    {item.name}
                                                </h3>
                                                <span className="text-carmine-500 font-bold text-lg">{item.price}</span>
                                            </div>
                                            <p className="text-gray-400 text-sm mb-4">{item.description}</p>
                                            <Link
                                                href="/book"
                                                className="inline-block text-xs font-bold uppercase tracking-wider text-gray-500 hover:text-white transition-colors border-b border-transparent hover:border-white pb-0.5"
                                            >
                                                Book This Service
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-24 text-center">
                    <div className="bg-carmine-900/20 border border-carmine-500/30 p-12 rounded-lg max-w-4xl mx-auto">
                        <h3 className="text-3xl font-bold mb-4">Not sure what you need?</h3>
                        <p className="text-gray-300 mb-8 text-lg">
                            Book a consultation with one of our master barbers. We'll help you find the perfect style.
                        </p>
                        <Link
                            href="/book"
                            className="inline-flex items-center gap-2 bg-carmine-600 text-white px-8 py-4 rounded hover:bg-carmine-700 transition-colors font-bold uppercase tracking-wider"
                        >
                            <Scissors className="w-5 h-5" />
                            Book Appointment
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
