"use client";

import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import { collection, addDoc, query, orderBy, onSnapshot, Timestamp, where } from "firebase/firestore";

interface Message {
    id: string;
    text: string;
    senderId: string;
    createdAt: any;
    isAdmin?: boolean;
}

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState("");
    const { user } = useAuth();
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!user || !isOpen) return;

        // Create a unique chat ID based on user ID
        const chatId = user.uid;
        const q = query(
            collection(db, `chats/${chatId}/messages`),
            orderBy("createdAt", "asc")
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const msgs = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })) as Message[];
            setMessages(msgs);
            scrollToBottom();
        });

        return () => unsubscribe();
    }, [user, isOpen]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim() || !user) return;

        try {
            const chatId = user.uid;
            await addDoc(collection(db, `chats/${chatId}/messages`), {
                text: newMessage,
                senderId: user.uid,
                createdAt: Timestamp.now(),
                isAdmin: false,
                userEmail: user.email // Store email for admin to identify
            });
            setNewMessage("");
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    if (!user) return null; // Only show chat for logged-in users

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        className="absolute bottom-16 right-0 w-80 sm:w-96 bg-zinc-900 border border-zinc-800 rounded-lg shadow-2xl overflow-hidden flex flex-col h-[500px]"
                    >
                        <div className="p-4 bg-carmine-600 flex justify-between items-center">
                            <h3 className="text-white font-bold">Customer Support</h3>
                            <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-black/50">
                            {messages.length === 0 && (
                                <div className="text-center text-gray-500 mt-10">
                                    <p>How can we help you today?</p>
                                </div>
                            )}
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`flex ${msg.isAdmin ? "justify-start" : "justify-end"}`}
                                >
                                    <div
                                        className={`max-w-[80%] p-3 rounded-lg text-sm ${msg.isAdmin
                                                ? "bg-zinc-800 text-white rounded-tl-none"
                                                : "bg-carmine-600 text-white rounded-tr-none"
                                            }`}
                                    >
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>

                        <form onSubmit={handleSendMessage} className="p-4 bg-zinc-900 border-t border-zinc-800 flex gap-2">
                            <input
                                type="text"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                placeholder="Type a message..."
                                className="flex-1 bg-black border border-zinc-700 rounded px-3 py-2 text-white focus:border-carmine-500 focus:outline-none text-sm"
                            />
                            <button
                                type="submit"
                                disabled={!newMessage.trim()}
                                className="bg-carmine-600 text-white p-2 rounded hover:bg-carmine-700 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Send className="w-4 h-4" />
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-carmine-600 text-white p-4 rounded-full shadow-lg hover:bg-carmine-700 transition-colors"
            >
                {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
            </button>
        </div>
    );
}
