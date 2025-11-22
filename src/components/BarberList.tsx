"use client";

import BarberCard from "./BarberCard";

const barbers = [
    {
        id: "1",
        name: "James 'The Blade'",
        specialty: "Classic Cuts & Shaves",
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=2074&auto=format&fit=crop", // Placeholder
    },
    {
        id: "2",
        name: "Marcus Styles",
        specialty: "Modern Fades & Designs",
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?q=80&w=2070&auto=format&fit=crop", // Placeholder
    },
    {
        id: "3",
        name: "David Sharp",
        specialty: "Beard Sculpting",
        rating: 5.0,
        image: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?q=80&w=1974&auto=format&fit=crop", // Placeholder
    },
];

export default function BarberList() {
    return (
        <section id="barbers" className="py-20 bg-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-carmine-500 font-bold tracking-[0.2em] uppercase mb-3 text-sm">
                        Our Team
                    </h2>
                    <h3 className="text-3xl md:text-4xl font-bold text-white">
                        Meet The Masters
                    </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {barbers.map((barber, index) => (
                        <BarberCard key={barber.id} barber={barber} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}
