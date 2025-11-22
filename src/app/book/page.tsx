"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar as CalendarIcon, Clock, User as UserIcon, Check, Scissors, ChevronRight, ChevronLeft } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import { db } from "@/lib/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import gsap from "gsap";

// Mock Data
const services = [
    { id: "haircut", name: "Classic Haircut", price: "$35", duration: "45m", icon: Scissors },
    { id: "beard", name: "Beard Trim", price: "$25", duration: "30m", icon: UserIcon },
    { id: "shave", name: "Hot Towel Shave", price: "$45", duration: "45m", icon: UserIcon },
    { id: "full", name: "The Gentleman", price: "$70", duration: "90m", icon: Scissors },
];

const barbers = [
    { id: "1", name: "James 'The Blade'", image: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=2074&auto=format&fit=crop" },
    { id: "2", name: "Marcus Styles", image: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?q=80&w=2070&auto=format&fit=crop" },
    { id: "3", name: "David Sharp", image: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?q=80&w=1974&auto=format&fit=crop" },
];

const timeSlots = [
    "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"
];

function BookingContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { user } = useAuth();

    const [step, setStep] = useState(1);
    const [selectedService, setSelectedService] = useState<string>("");
    const [selectedBarber, setSelectedBarber] = useState(searchParams.get("barber") || "");
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    // GSAP Tilt Effect
    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -10; // Max rotation deg
        const rotateY = ((x - centerX) / centerX) * 10;

        gsap.to(card, {
            rotationX: rotateX,
            rotationY: rotateY,
            transformPerspective: 1000,
            scale: 1.02,
            duration: 0.4,
            ease: "power2.out"
        });
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
        gsap.to(e.currentTarget, {
            rotationX: 0,
            rotationY: 0,
            scale: 1,
            duration: 0.4,
            ease: "power2.out"
        });
    };

    const handleBooking = async () => {
        if (!user || !selectedBarber || !selectedDate || !selectedTime || !selectedService) return;

        setLoading(true);
        try {
            await addDoc(collection(db, "bookings"), {
                userId: user.uid,
                userEmail: user.email,
                serviceId: selectedService,
                barberId: selectedBarber,
                date: selectedDate,
                time: selectedTime,
                createdAt: Timestamp.now(),
                status: "pending"
            });
            setSuccess(true);
            setTimeout(() => router.push("/"), 3000);
        } catch (error) {
            console.error("Error creating booking:", error);
        } finally {
            setLoading(false);
        }
    };

    const nextStep = () => setStep(s => s + 1);
    const prevStep = () => setStep(s => s - 1);

    if (success) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(34,197,94,0.5)]"
                >
                    <Check className="w-12 h-12 text-white" />
                </motion.div>
                <h2 className="text-4xl font-bold text-white mb-2">Booking Confirmed!</h2>
                <p className="text-gray-400 text-lg">Your appointment has been successfully scheduled.</p>
                <p className="text-gray-500 text-sm mt-8">Redirecting to home...</p>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-12 min-h-screen flex flex-col">
            {/* Progress Bar */}
            <div className="mb-12">
                <div className="flex justify-between mb-4 text-sm font-bold uppercase tracking-wider text-gray-500">
                    <span className={step >= 1 ? "text-carmine-500" : ""}>Service</span>
                    <span className={step >= 2 ? "text-carmine-500" : ""}>Barber</span>
                    <span className={step >= 3 ? "text-carmine-500" : ""}>Time</span>
                    <span className={step >= 4 ? "text-carmine-500" : ""}>Confirm</span>
                </div>
                <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-carmine-600"
                        initial={{ width: "0%" }}
                        animate={{ width: `${(step / 4) * 100}%` }}
                        transition={{ duration: 0.5 }}
                    />
                </div>
            </div>

            <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Main Content */}
                <div className="lg:col-span-2">
                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <h2 className="text-3xl font-bold text-white mb-8">Select Service</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {services.map((service) => (
                                        <button
                                            key={service.id}
                                            onClick={() => setSelectedService(service.id)}
                                            onMouseMove={handleMouseMove}
                                            onMouseLeave={handleMouseLeave}
                                            className={`p-6 rounded-xl border text-left transition-colors relative overflow-hidden group ${selectedService === service.id
                                                    ? "bg-carmine-900/20 border-carmine-500"
                                                    : "bg-zinc-900 border-zinc-800 hover:border-zinc-600"
                                                }`}
                                        >
                                            <div className="flex justify-between items-start mb-4">
                                                <service.icon className={`w-8 h-8 ${selectedService === service.id ? "text-carmine-500" : "text-gray-400"}`} />
                                                <span className="text-lg font-bold text-white">{service.price}</span>
                                            </div>
                                            <h3 className="text-xl font-bold text-white mb-1">{service.name}</h3>
                                            <p className="text-gray-400 text-sm">{service.duration}</p>
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <h2 className="text-3xl font-bold text-white mb-8">Select Barber</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {barbers.map((barber) => (
                                        <button
                                            key={barber.id}
                                            onClick={() => setSelectedBarber(barber.id)}
                                            onMouseMove={handleMouseMove}
                                            onMouseLeave={handleMouseLeave}
                                            className={`p-4 rounded-xl border text-left transition-colors flex items-center gap-4 ${selectedBarber === barber.id
                                                    ? "bg-carmine-900/20 border-carmine-500"
                                                    : "bg-zinc-900 border-zinc-800 hover:border-zinc-600"
                                                }`}
                                        >
                                            <img src={barber.image} alt={barber.name} className="w-16 h-16 rounded-full object-cover border-2 border-zinc-700" />
                                            <div>
                                                <h3 className="text-lg font-bold text-white">{barber.name}</h3>
                                                <p className="text-carmine-500 text-sm">Master Barber</p>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div
                                key="step3"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-8"
                            >
                                <h2 className="text-3xl font-bold text-white mb-8">Select Date & Time</h2>

                                <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
                                    <label className="block text-gray-400 text-sm mb-3 uppercase tracking-wider font-bold">Date</label>
                                    <input
                                        type="date"
                                        min={new Date().toISOString().split("T")[0]}
                                        value={selectedDate}
                                        onChange={(e) => setSelectedDate(e.target.value)}
                                        className="w-full bg-black border border-zinc-700 rounded-lg p-4 text-white focus:border-carmine-500 focus:outline-none transition-colors"
                                    />
                                </div>

                                {selectedDate && (
                                    <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
                                        <label className="block text-gray-400 text-sm mb-3 uppercase tracking-wider font-bold">Available Slots</label>
                                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                                            {timeSlots.map((time) => (
                                                <button
                                                    key={time}
                                                    onClick={() => setSelectedTime(time)}
                                                    className={`p-3 rounded-lg text-sm font-bold transition-all ${selectedTime === time
                                                            ? "bg-carmine-600 text-white shadow-lg scale-105"
                                                            : "bg-black text-gray-300 hover:bg-zinc-800 border border-zinc-700"
                                                        }`}
                                                >
                                                    {time}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        )}

                        {step === 4 && (
                            <motion.div
                                key="step4"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <h2 className="text-3xl font-bold text-white mb-8">Confirm Booking</h2>
                                <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-8 space-y-6">
                                    <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
                                        <span className="text-gray-400">Service</span>
                                        <span className="text-white font-bold text-lg">{services.find(s => s.id === selectedService)?.name}</span>
                                    </div>
                                    <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
                                        <span className="text-gray-400">Barber</span>
                                        <span className="text-white font-bold text-lg">{barbers.find(b => b.id === selectedBarber)?.name}</span>
                                    </div>
                                    <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
                                        <span className="text-gray-400">Date</span>
                                        <span className="text-white font-bold text-lg">{selectedDate}</span>
                                    </div>
                                    <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
                                        <span className="text-gray-400">Time</span>
                                        <span className="text-white font-bold text-lg">{selectedTime}</span>
                                    </div>
                                    <div className="flex items-center justify-between pt-2">
                                        <span className="text-gray-400">Total Price</span>
                                        <span className="text-carmine-500 font-bold text-2xl">{services.find(s => s.id === selectedService)?.price}</span>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Navigation Buttons */}
                    <div className="flex justify-between mt-12">
                        <button
                            onClick={prevStep}
                            disabled={step === 1}
                            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold transition-colors ${step === 1 ? "opacity-0 pointer-events-none" : "text-gray-400 hover:text-white hover:bg-zinc-800"
                                }`}
                        >
                            <ChevronLeft className="w-5 h-5" /> Back
                        </button>

                        {step < 4 ? (
                            <button
                                onClick={nextStep}
                                disabled={
                                    (step === 1 && !selectedService) ||
                                    (step === 2 && !selectedBarber) ||
                                    (step === 3 && (!selectedDate || !selectedTime))
                                }
                                className="flex items-center gap-2 px-8 py-3 bg-white text-black rounded-lg font-bold hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            >
                                Next <ChevronRight className="w-5 h-5" />
                            </button>
                        ) : (
                            <button
                                onClick={handleBooking}
                                disabled={loading}
                                className="flex items-center gap-2 px-8 py-3 bg-carmine-600 text-white rounded-lg font-bold hover:bg-carmine-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:shadow-[0_0_30px_rgba(220,38,38,0.6)]"
                            >
                                {loading ? "Processing..." : "Confirm Booking"}
                            </button>
                        )}
                    </div>
                </div>

                {/* Summary Sidebar (Desktop) */}
                <div className="hidden lg:block">
                    <div className="sticky top-24 bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl p-6 space-y-6">
                        <h3 className="text-xl font-bold text-white border-b border-zinc-800 pb-4">Booking Summary</h3>

                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <div className={`p-2 rounded bg-zinc-800 ${selectedService ? "text-carmine-500" : "text-gray-600"}`}>
                                    <Scissors className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase font-bold">Service</p>
                                    <p className="text-white font-medium">{services.find(s => s.id === selectedService)?.name || "Not selected"}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className={`p-2 rounded bg-zinc-800 ${selectedBarber ? "text-carmine-500" : "text-gray-600"}`}>
                                    <UserIcon className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase font-bold">Barber</p>
                                    <p className="text-white font-medium">{barbers.find(b => b.id === selectedBarber)?.name || "Not selected"}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className={`p-2 rounded bg-zinc-800 ${selectedDate ? "text-carmine-500" : "text-gray-600"}`}>
                                    <CalendarIcon className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase font-bold">Date & Time</p>
                                    <p className="text-white font-medium">
                                        {selectedDate ? `${selectedDate} ${selectedTime ? `at ${selectedTime}` : ""}` : "Not selected"}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {selectedService && (
                            <div className="pt-4 border-t border-zinc-800 mt-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-400">Total</span>
                                    <span className="text-2xl font-bold text-white">{services.find(s => s.id === selectedService)?.price}</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function BookingPage() {
    return (
        <ProtectedRoute>
            <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-white">Loading...</div>}>
                <BookingContent />
            </Suspense>
        </ProtectedRoute>
    );
}
