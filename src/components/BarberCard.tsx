"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, Calendar } from "lucide-react";
import { motion } from "framer-motion";

interface BarberProps {
    id: string;
    name: string;
    specialty: string;
    rating: number;
    image: string;
}

export default function BarberCard({ barber, index }: { barber: BarberProps; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="bg-zinc-900 border border-zinc-800 group hover:border-carmine-500/50 transition-colors duration-300"
        >
            <div className="relative h-80 w-full overflow-hidden">
                <Image
                    src={barber.image}
                    alt={barber.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
            </div>

            <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <h3 className="text-xl font-bold text-white group-hover:text-carmine-500 transition-colors">
                            <Link href={`/barbers/${barber.id}`}>
                                {barber.name}
                            </Link>
                        </h3>
                        <p className="text-gray-400 text-sm">{barber.specialty}</p>
                    </div>
                    <div className="flex items-center gap-1 bg-black/50 px-2 py-1 rounded">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span className="text-white text-sm font-medium">{barber.rating}</span>
                    </div>
                </div>

                <Link
                    href={`/book?barber=${barber.id}`}
                    className="mt-4 w-full flex items-center justify-center gap-2 bg-white/5 hover:bg-carmine-600 text-white py-3 px-4 transition-colors duration-300 font-medium uppercase text-sm tracking-wide"
                >
                    <Calendar className="w-4 h-4" />
                    Book Appointment
                </Link>
            </div>
        </motion.div>
    );
}
