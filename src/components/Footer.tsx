import { Facebook, Twitter, Instagram, Youtube, MapPin, Phone, Mail, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Footer() {
    const year = new Date().getFullYear();
    return (
        <footer className="bg-surface-dark text-white border-t border-[rgba(255,255,255,0.05)] pt-20 pb-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

                    {/* Brand Col */}
                    <div className="space-y-6">
                        <Link href="/" className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center font-bold text-black border-2 border-accent text-xl">
                                OS
                            </div>
                            <span className="font-bold text-2xl tracking-tight">Osun State FA</span>
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Official Governing Body for Football in Osun State. Developing football at grassroots, amateur, and professional levels.
                        </p>
                        <div className="flex gap-4">
                            {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                                <a key={i} href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-accent hover:text-black transition-colors">
                                    <Icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-bold mb-6 text-white">Quick Links</h4>
                        <ul className="space-y-3">
                            {['Home', 'About Us', 'Competitions', 'Latest News', 'Gallery', 'Contact Us'].map((link) => (
                                <li key={link}>
                                    <Link href="#" className="text-gray-400 hover:text-accent transition-colors flex items-center gap-2 group text-sm">
                                        <span className="w-1.5 h-1.5 rounded-full bg-primary group-hover:bg-accent transition-colors"></span>
                                        {link}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Affiliations */}
                    <div>
                        <h4 className="text-lg font-bold mb-6 text-white">Affiliations</h4>
                        <ul className="space-y-3">
                            {['Registered Clubs', 'Licensed Referees', 'Licensed Coaches', 'Youth Development', 'State League Teams'].map((link) => (
                                <li key={link}>
                                    <Link href="#" className="text-gray-400 hover:text-accent transition-colors flex items-center gap-2 group text-sm">
                                        <span className="w-1.5 h-1.5 rounded-full bg-secondary group-hover:bg-accent transition-colors"></span>
                                        {link}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact & Newsletter */}
                    <div className="space-y-6">
                        <h4 className="text-lg font-bold mb-6 text-white">Contact Us</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-sm text-gray-400">
                                <MapPin className="w-5 h-5 text-accent flex-shrink-0" />
                                <span>OSFA Secretariat, Osogbo City Stadium, Osogbo, Osun State.</span>
                            </li>
                            <li className="flex items-center gap-3 text-sm text-gray-400">
                                <Phone className="w-5 h-5 text-accent flex-shrink-0" />
                                <span>+234 (0) 800 123 4567</span>
                            </li>
                            <li className="flex items-center gap-3 text-sm text-gray-400">
                                <Mail className="w-5 h-5 text-accent flex-shrink-0" />
                                <span>info@osunstatefa.org.ng</span>
                            </li>
                        </ul>

                        <form className="mt-6 relative">
                            <input
                                type="email"
                                placeholder="Subscribe to newsletter"
                                className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-full px-4 py-3 text-sm text-white focus:outline-none focus:border-accent pr-12"
                            />
                            <button type="button" className="absolute right-1.5 top-1.5 bottom-1.5 bg-accent hover:bg-secondary text-black rounded-full w-10 flex items-center justify-center transition-colors">
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </form>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-[rgba(255,255,255,0.05)] flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
                    <p>© {year} Osun State Football Association. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
