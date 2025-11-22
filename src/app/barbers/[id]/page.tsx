"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, Calendar, Instagram, Twitter, Scissors } from "lucide-react";

// Mock data - in a real app, fetch from Firestore
const barbers = {
    "1": {
        id: "1",
        name: "James 'The Blade'",
        role: "Master Barber",
        specialty: "Classic Cuts & Shaves",
        experience: "10+ Years",
        rating: 4.9,
        reviews: 124,
        bio: "James is a master of traditional barbering techniques. With over a decade of experience, he specializes in classic cuts and hot towel shaves that leave you feeling refreshed and looking sharp. His attention to detail is unmatched.",
        image: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=2074&auto=format&fit=crop",
        portfolio: [
            "https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1503951914875-452162b7f30a?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?q=80&w=1976&auto=format&fit=crop"
        ]
    },
    "2": {
        id: "2",
        name: "Marcus Styles",
        role: "Senior Stylist",
        specialty: "Modern Fades & Designs",
        experience: "7 Years",
        rating: 4.8,
        reviews: 98,
        bio: "Marcus brings a modern edge to the shop. Known for his precision fades and creative hair designs, he stays ahead of the trends to give you a look that stands out. If you want something fresh and bold, Marcus is your guy.",
        image: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?q=80&w=2070&auto=format&fit=crop",
        portfolio: [
            "https://images.unsplash.com/photo-1605497788044-5a32c7078486?q=80&w=1974&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1517832606299-7ae9b720a186?q=80&w=1972&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1593702295094-aea22597af65?q=80&w=2070&auto=format&fit=crop"
        ]
    },
    "3": {
        id: "3",
        name: "David Sharp",
        role: "Beard Specialist",
        specialty: "Beard Sculpting",
        experience: "5 Years",
        rating: 5.0,
        reviews: 86,
        bio: "David is the resident beard expert. He understands face shapes and growth patterns like no one else, ensuring your beard is sculpted to perfection. From trims to full reshaping, David will get your facial hair looking its absolute best.",
        image: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?q=80&w=1974&auto=format&fit=crop",
        portfolio: [
            "https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1503951914875-452162b7f30a?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?q=80&w=1976&auto=format&fit=crop"
        ]
    }
};

export default function BarberProfilePage() {
    const params = useParams();
    const id = params.id as string;
    const barber = barbers[id as keyof typeof barbers];

    if (!barber) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black text-white">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Barber Not Found</h1>
                    <Link href="/" className="text-carmine-500 hover:text-white transition-colors">
                        Return Home
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white pt-20">
            <div className="max-w-7xl mx-auto px-4 py-12">
                {/* Profile Header */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden border border-zinc-800"
                    >
                        <Image
                            src={barber.image}
                            alt={barber.name}
                            fill
                            className="object-cover"
                        />
                    </motion.div>

                    <div className="md:col-span-2 flex flex-col justify-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <h2 className="text-carmine-500 font-bold tracking-wider uppercase mb-2">{barber.role}</h2>
                            <h1 className="text-5xl font-bold mb-4">{barber.name}</h1>

                            <div className="flex items-center gap-6 mb-8 text-gray-400">
                                <div className="flex items-center gap-2">
                                    <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                                    <span className="text-white font-bold">{barber.rating}</span>
                                    <span>({barber.reviews} reviews)</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Scissors className="w-5 h-5" />
                                    <span>{barber.experience}</span>
                                </div>
                            </div>

                            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                                {barber.bio}
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link
                                    href={`/book?barber=${barber.id}`}
                                    className="px-8 py-4 bg-carmine-600 text-white font-bold rounded hover:bg-carmine-700 transition-colors text-center uppercase tracking-wider flex items-center justify-center gap-2"
                                >
                                    <Calendar className="w-5 h-5" />
                                    Book Appointment
                                </Link>
                                <div className="flex gap-4 items-center justify-center sm:justify-start px-6">
                                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                        <Instagram className="w-6 h-6" />
                                    </a>
                                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                        <Twitter className="w-6 h-6" />
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Portfolio Section */}
                <div className="mb-12">
                    <h3 className="text-2xl font-bold mb-8 flex items-center gap-2">
                        <Scissors className="w-6 h-6 text-carmine-500" />
                        Recent Work
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {barber.portfolio.map((img, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="relative h-64 rounded-lg overflow-hidden group"
                            >
                                <Image
                                    src={img}
                                    alt={`${barber.name} work ${index + 1}`}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
