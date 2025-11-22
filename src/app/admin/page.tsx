"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, onSnapshot, updateDoc, doc } from "firebase/firestore";
import { Calendar, Clock, User, CheckCircle, XCircle } from "lucide-react";

interface Booking {
    id: string;
    userEmail: string;
    barberId: string;
    date: string;
    time: string;
    status: "pending" | "confirmed" | "cancelled";
}

function AdminContent() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const q = query(collection(db, "bookings"), orderBy("createdAt", "desc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const bookingsData = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })) as Booking[];
            setBookings(bookingsData);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const updateStatus = async (id: string, status: "confirmed" | "cancelled") => {
        try {
            await updateDoc(doc(db, "bookings", id), { status });
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold text-white mb-8">Admin Dashboard</h1>

            <div className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden">
                <div className="p-6 border-b border-zinc-800">
                    <h2 className="text-xl font-bold text-white">Recent Bookings</h2>
                </div>

                {loading ? (
                    <div className="p-8 text-center text-gray-400">Loading bookings...</div>
                ) : bookings.length === 0 ? (
                    <div className="p-8 text-center text-gray-400">No bookings found.</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-black/50 text-gray-400 uppercase text-xs">
                                <tr>
                                    <th className="px-6 py-4">Customer</th>
                                    <th className="px-6 py-4">Date & Time</th>
                                    <th className="px-6 py-4">Barber ID</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-800">
                                {bookings.map((booking) => (
                                    <tr key={booking.id} className="hover:bg-white/5 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 text-white">
                                                <User className="w-4 h-4 text-gray-400" />
                                                {booking.userEmail}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col text-sm">
                                                <span className="text-white flex items-center gap-2">
                                                    <Calendar className="w-3 h-3" /> {booking.date}
                                                </span>
                                                <span className="text-gray-400 flex items-center gap-2">
                                                    <Clock className="w-3 h-3" /> {booking.time}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-300">
                                            {booking.barberId}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${booking.status === "confirmed" ? "bg-green-500/10 text-green-500" :
                                                    booking.status === "cancelled" ? "bg-red-500/10 text-red-500" :
                                                        "bg-yellow-500/10 text-yellow-500"
                                                }`}>
                                                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            {booking.status === "pending" && (
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => updateStatus(booking.id, "confirmed")}
                                                        className="p-1 hover:bg-green-500/20 rounded text-green-500 transition-colors"
                                                        title="Confirm"
                                                    >
                                                        <CheckCircle className="w-5 h-5" />
                                                    </button>
                                                    <button
                                                        onClick={() => updateStatus(booking.id, "cancelled")}
                                                        className="p-1 hover:bg-red-500/20 rounded text-red-500 transition-colors"
                                                        title="Cancel"
                                                    >
                                                        <XCircle className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function AdminPage() {
    return (
        <ProtectedRoute>
            <AdminContent />
        </ProtectedRoute>
    );
}
