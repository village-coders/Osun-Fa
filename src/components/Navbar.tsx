"use client";

import Link from "next/link";
import { Menu, X, ChevronDown, MapPin, Phone, Mail, Facebook, Twitter, Instagram, Youtube, UserCog } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import api from "@/lib/api";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isAffiliationsOpen, setIsAffiliationsOpen] = useState(false);
    const [user, setUser] = useState<any>(null);
    const [isMounted, setIsMounted] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        const fetchUserSession = async () => {
            const portalToken = Cookies.get('portalToken');
            const adminToken = Cookies.get('token');

            if (!portalToken && !adminToken) return;

            try {
                // Try portal session if portalToken exists
                if (portalToken) {
                    try {
                        const res = await api.get('/portal-auth/me', {
                            headers: { Authorization: `Bearer ${portalToken}` }
                        });
                        console.log("response from navbar", res)
                        if (res.data) {
                            setUser(res.data);
                            return;
                        }
                    } catch (e) {
                        console.warn("Portal session check failed, trying Admin or falling back.");
                    }
                }

                // Try admin session if adminToken exists
                // if (adminToken) {
                //     try {
                //         const res = await api.get('/auth/me', {
                //             headers: { Authorization: `Bearer ${adminToken}` }
                //         });
                //         if (res.data) {
                //             setUser(res.data);
                //             return;
                //         }
                //     } catch (e) {
                //         console.warn("Admin session check failed.");
                //     }
                // }

                // If we reach here, both failed or were missing
                setUser(null);
            } catch (error) {
                console.error("Session verification failed:", error);
                setUser(null);
            }
        };

        fetchUserSession();
    }, []);

    const getDashboardLink = (role: string) => {
        switch (role?.toLowerCase()) {
            case 'team': return '/portal/team';
            case 'coach': return '/portal/coach';
            case 'referee': return '/portal/referee';
            case 'player': return '/portal/complete-profile';
            case 'admin': return '/admin';
            default: return '/portal/login';
        }
    };

    const getRoleDisplayName = (role: string) => {
        switch (role?.toLowerCase()) {
            case 'team': return 'Club Admin';
            case 'coach': return 'Licensed Coach';
            case 'referee': return 'Licensed Referee';
            case 'player': return 'Member Player';
            case 'admin': return 'System Admin';
            default: return 'User';
        }
    };

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "About", href: "/about" },
        { name: "Blog", href: "/blog" },
        { name: "Contact", href: "/contact" },
    ];

    const affiliations = [
        { name: "Osun FA Registered Clubs", href: "/affiliations/registered-club" },
        { name: "Licensed Referees", href: "/affiliations/licensed-referee" },
        { name: "Licensed Coaches", href: "/affiliations/licensed-coach" },
        { name: "Competitions", href: "/affiliations/competition" },
    ];

    return (
        <nav className="fixed top-0 left-0 w-full z-50 flex flex-col transition-all duration-300 shadow-sm">
            {/* Topbar: Contact & Socials */}
            <div className="hidden bg-primary-dark text-gray-300 py-2 border-b border-[rgba(255,255,255,0.05)] text-xs font-semibold tracking-wide lg:block">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-2 xl:flex-row xl:justify-between xl:items-center">
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                        <div className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer min-w-0">
                            <MapPin className="w-3.5 h-3.5 text-secondary" />
                            <span className="truncate">Osun FA Secretariat, Osogbo City Stadium</span>
                        </div>
                        <div className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer min-w-0">
                            <Phone className="w-3.5 h-3.5 text-secondary" />
                            <span className="truncate">+234 (0) 800 123 4567</span>
                        </div>
                        <div className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer min-w-0">
                            <Mail className="w-3.5 h-3.5 text-secondary" />
                            <span className="truncate">info@osunstatefa.org.ng</span>
                        </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-4">
                        <span className="text-[10px] uppercase text-gray-500 mr-2">Follow Us:</span>
                        <a href="https://www.facebook.com/share/1Cy9EgYGYy/" className="hover:text-accent transition-colors"><Facebook className="w-4 h-4" /></a>
                        <a href="https://x.com/OsunFa" className="hover:text-accent transition-colors"><Twitter className="w-4 h-4" /></a>
                        <a href="https://www.instagram.com/osunstatefa" className="hover:text-accent transition-colors"><Instagram className="w-4 h-4" /></a>
                        <a href="https://www.youtube.com/osunstatefa" className="hover:text-accent transition-colors"><Youtube className="w-4 h-4" /></a>

                        <div className="h-4 w-px bg-gray-600 mx-2"></div>
                        <Link href="/login" className="flex items-center gap-1.5 hover:text-white transition-colors group">
                            <UserCog className="w-3.5 h-3.5 text-secondary group-hover:text-accent transition-colors" />
                            <span className="uppercase text-[10px] font-bold tracking-wider">Admin Login</span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Main Navbar */}
            <div className={`text-white border-b border-[rgba(255,255,255,0.1)] w-full transition-all duration-300 ${isScrolled ? 'bg-black/35 backdrop-blur-xl' : 'bg-black'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16 sm:h-20 gap-3">
                        {/* Logo */}
                        <div className="shrink-0">
                            <Link href="/" className="flex items-center gap-3">
                                <div className="w-9 h-9 sm:w-10 sm:h-10 bg-linear-to-br from-accent to-primary rounded-full flex items-center justify-center font-bold text-black border-2 border-accent overflow-hidden">
                                    <Image src="/osun-fa-logo.png" alt="Logo" width={50} height={50} className="w-full h-full object-contain" />
                                </div>
                                <span className="font-bold text-lg sm:text-xl tracking-tight sm:block">
                                    Osun FA
                                </span>
                            </Link>
                        </div>

                        {/* Desktop Menu */}
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-6">
                                {navLinks.slice(0, 2).map((link) => (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        className="hover:text-accent px-3 py-2 rounded-md text-sm font-medium transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                ))}

                                {/* Dropdown */}
                                <div
                                    className="relative"
                                    onMouseEnter={() => setIsAffiliationsOpen(true)}
                                    onMouseLeave={() => setIsAffiliationsOpen(false)}
                                >
                                    <button className="hover:text-accent px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1">
                                        Osun FA Affiliations <ChevronDown className="w-4 h-4" />
                                    </button>
                                    {isAffiliationsOpen && (
                                        <div className="absolute left-0 mt-0 w-56 rounded-md shadow-lg bg-surface-dark border border-[rgba(255,255,255,0.1)] ring-1 ring-black ring-opacity-5 focus:outline-none overflow-hidden">
                                            <div className="py-1">
                                                {affiliations.map((item) => (
                                                    <Link
                                                        key={item.name}
                                                        href={item.href}
                                                        className="block px-4 py-3 text-sm text-gray-300 hover:bg-primary-dark hover:text-white transition-colors"
                                                    >
                                                        {item.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {navLinks.slice(2).map((link) => (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        className="hover:text-accent px-3 py-2 rounded-md text-sm font-medium transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* CTA Button or User Profile */}
                        <div className="hidden md:block">
                            {isMounted && user ? (
                                <Link
                                    href={getDashboardLink(user.role)}
                                    className="flex items-center gap-3 bg-white/10 hover:bg-white/20 border border-white/20 px-4 py-2 rounded-full transition-all duration-300 group"
                                >
                                    <div className="text-right hidden lg:block">
                                        <p className="text-xs font-bold text-accent uppercase tracking-tighter leading-none mb-2">{getRoleDisplayName(user.role)}</p>
                                        <p className="text-[10px] font-bold text-white leading-none whitespace-nowrap">Go to Dashboard</p>
                                    </div>
                                    <div className="w-10 h-10 rounded-full bg-linear-to-br from-accent to-primary flex items-center justify-center text-primary-dark font-black text-lg border-2 border-accent group-hover:scale-105 transition-transform">
                                        {user.name?.charAt(0) || user.role?.charAt(0).toUpperCase()}
                                    </div>
                                </Link>
                            ) : (
                                <Link
                                    href="/portal/register"
                                    className="bg-accent text-primary-dark hover:bg-secondary px-6 py-2.5 rounded-full text-sm font-bold shadow-[0_0_15px_rgba(0,255,136,0.3)] hover:shadow-[0_0_20px_rgba(229,168,35,0.5)] transition-all duration-300"
                                >
                                    Join Us
                                </Link>
                            )}
                        </div>

                        {/* Mobile menu button */}
                        <div className="-mr-2 flex md:hidden">
                            <button
                                type="button"
                                onClick={() => setIsOpen(!isOpen)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none transition-colors"
                                aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
                                aria-expanded={isOpen}
                            >
                                {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="md:hidden glass-dark border-t border-[rgba(255,255,255,0.1)] max-h-[calc(100vh-4rem)] overflow-y-auto">
                        <div className="px-3 pt-3 pb-4 space-y-1 sm:px-4">
                            <div className="rounded-xl border border-white/10 bg-black/20 p-3 space-y-3 lg:hidden">
                                <div className="flex items-start gap-3 text-sm text-gray-300">
                                    <MapPin className="w-4 h-4 text-secondary mt-0.5 shrink-0" />
                                    <span>Osun FA Secretariat, Osogbo City Stadium</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-gray-300">
                                    <Phone className="w-4 h-4 text-secondary shrink-0" />
                                    <span>+234 (0) 800 123 4567</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-gray-300">
                                    <Mail className="w-4 h-4 text-secondary shrink-0" />
                                    <span className="break-all">info@osunstatefa.org.ng</span>
                                </div>
                                <div className="flex items-center gap-3 pt-1 text-gray-300">
                                    <span className="text-[10px] uppercase text-gray-500 mr-1">Follow Us:</span>
                                    <a href="https://www.facebook.com/share/1Cy9EgYGYy/" className="hover:text-accent transition-colors"><Facebook className="w-4 h-4" /></a>
                                    <a href="https://x.com/OsunFa" className="hover:text-accent transition-colors"><Twitter className="w-4 h-4" /></a>
                                    <a href="https://www.instagram.com/osunstatefa" className="hover:text-accent transition-colors"><Instagram className="w-4 h-4" /></a>
                                    <a href="https://www.youtube.com/osunstatefa" className="hover:text-accent transition-colors"><Youtube className="w-4 h-4" /></a>
                                </div>
                            </div>

                            {navLinks.slice(0, 2).map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-primary-dark"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}

                            {/* Mobile Dropdown */}
                            <div>
                                <button
                                    onClick={() => setIsAffiliationsOpen(!isAffiliationsOpen)}
                                    className="w-full text-left flex justify-between items-center px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-primary-dark"
                                >
                                    Osun FA Affiliations <ChevronDown className={`w-4 h-4 transition-transform ${isAffiliationsOpen ? 'rotate-180' : ''}`} />
                                </button>
                                {isAffiliationsOpen && (
                                    <div className="pl-4 mt-1 space-y-1 bg-black/20 rounded-md py-2">
                                        {affiliations.map((item) => (
                                            <Link
                                                key={item.name}
                                                href={item.href}
                                                className="block px-3 py-2 rounded-md text-sm font-medium text-gray-400 hover:text-white hover:bg-primary"
                                                onClick={() => setIsOpen(false)}
                                            >
                                                {item.name}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {navLinks.slice(2).map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-primary-dark"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}

                            {isMounted && user ? (
                                <Link
                                    href={getDashboardLink(user.role)}
                                    className="mt-4 flex items-center justify-center gap-3 bg-white/10 border border-accent/30 py-3 rounded-lg"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-primary-dark font-bold border-2 border-white">
                                        {user.name?.charAt(0) || user.role?.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="text-left">
                                        <p className="text-xs font-bold text-accent">{getRoleDisplayName(user.role)}</p>
                                        <p className="text-sm font-medium text-white">Go to Dashboard</p>
                                    </div>
                                </Link>
                            ) : (
                                <Link
                                    href="/portal/register"
                                    className="mt-4 block w-full text-center bg-accent text-primary-dark hover:bg-secondary px-6 py-3 rounded-md text-base font-bold transition-all"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Join Us
                                </Link>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
