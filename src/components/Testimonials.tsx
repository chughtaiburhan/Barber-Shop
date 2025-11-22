"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
    {
        id: 1,
        name: "Michael R.",
        text: "Best haircut I've ever had. The attention to detail is unmatched.",
        role: "Regular Client"
    },
    {
        id: 2,
        name: "James T.",
        text: "Great atmosphere and professional service. Highly recommend!",
        role: "New Customer"
    },
    {
        id: 3,
        name: "David L.",
        text: "Finally found a barber who understands exactly what I want.",
        role: "Loyal Patron"
    }
];

export default function Testimonials() {
    return (
        <section className="py-24 bg-zinc-900 relative overflow-hidden">
            {/* Curved Top */}
            <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0]">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-[calc(100%+1.3px)] h-[60px]">
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-black"></path>
                </svg>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-carmine-500 font-bold tracking-[0.2em] uppercase mb-3 text-sm">
                        Testimonials
                    </h2>
                    <h3 className="text-3xl md:text-4xl font-bold text-white">
                        What Our Clients Say
                    </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={testimonial.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            viewport={{ once: true }}
                            className="bg-black p-8 rounded-none border border-zinc-800 relative"
                        >
                            <Quote className="absolute top-4 right-4 w-8 h-8 text-carmine-500/20" />
                            <p className="text-gray-300 mb-6 italic">"{testimonial.text}"</p>
                            <div>
                                <h4 className="text-white font-bold">{testimonial.name}</h4>
                                <p className="text-carmine-500 text-sm">{testimonial.role}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Curved Bottom */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-[calc(100%+1.3px)] h-[60px]">
                    <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="fill-black"></path>
                </svg>
            </div>
        </section>
    );
}
