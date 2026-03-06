"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isAffiliationsOpen, setIsAffiliationsOpen] = useState(false);

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "About", href: "/about" },
        { name: "Blog", href: "/blog" },
        { name: "Contact", href: "/contact" },
    ];

    const affiliations = [
        { name: "OSFA Registered Club", href: "/affiliations/registered-club" },
        { name: "OSFA Licensed Referee", href: "/affiliations/licensed-referee" },
        { name: "OSFA Licensed Coach", href: "/affiliations/licensed-coach" },
        { name: "OSFA Competition", href: "/affiliations/competition" },
    ];

    return (
        <nav className="fixed w-full z-50 glass-dark text-white border-b border-[rgba(255,255,255,0.1)]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link href="/" className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center font-bold text-black border-2 border-accent">
                                OS
                            </div>
                            <span className="font-bold text-xl tracking-tight hidden sm:block">
                                Osun State FA
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
                                    OSFA Affiliations <ChevronDown className="w-4 h-4" />
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

                    {/* CTA Button */}
                    <div className="hidden md:block">
                        <Link
                            href="#join"
                            className="bg-accent text-primary-dark hover:bg-secondary px-6 py-2.5 rounded-full text-sm font-bold shadow-[0_0_15px_rgba(0,255,136,0.3)] hover:shadow-[0_0_20px_rgba(229,168,35,0.5)] transition-all duration-300"
                        >
                            Join Us
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none transition-colors"
                        >
                            {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden glass-dark border-t border-[rgba(255,255,255,0.1)]">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
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
                                OSFA Affiliations <ChevronDown className={`w-4 h-4 transition-transform ${isAffiliationsOpen ? 'rotate-180' : ''}`} />
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

                        <Link
                            href="#join"
                            className="mt-4 block w-full text-center bg-accent text-primary-dark hover:bg-secondary px-6 py-3 rounded-md text-base font-bold transition-all"
                            onClick={() => setIsOpen(false)}
                        >
                            Join Us
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}
