import Link from "next/link";
import { Scissors, Instagram, Twitter, Facebook } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-black border-t border-white/10 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                    <div className="col-span-1 md:col-span-1">
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            <Scissors className="h-6 w-6 text-carmine-500" />
                            <span className="text-xl font-bold tracking-wider text-white">
                                BARBER<span className="text-carmine-500">SHOP</span>
                            </span>
                        </Link>
                        <p className="text-gray-400 text-sm">
                            Premium grooming experience for the modern gentleman.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-white font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><Link href="/" className="hover:text-carmine-500 transition-colors">Home</Link></li>
                            <li><Link href="/#services" className="hover:text-carmine-500 transition-colors">Services</Link></li>
                            <li><Link href="/#barbers" className="hover:text-carmine-500 transition-colors">Barbers</Link></li>
                            <li><Link href="/book" className="hover:text-carmine-500 transition-colors">Book Now</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-white font-semibold mb-4">Contact</h3>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li>123 Barber Street</li>
                            <li>City, State 12345</li>
                            <li>(555) 123-4567</li>
                            <li>info@barbershop.com</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-white font-semibold mb-4">Follow Us</h3>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-carmine-500 transition-colors">
                                <Instagram className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-carmine-500 transition-colors">
                                <Twitter className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-carmine-500 transition-colors">
                                <Facebook className="h-5 w-5" />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="border-t border-white/10 pt-8 text-center text-sm text-gray-500">
                    <p>&copy; {new Date().getFullYear()} BarberShop. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
