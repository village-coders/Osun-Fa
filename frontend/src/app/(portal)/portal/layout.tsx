"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Cookies from "js-cookie";
import { LayoutDashboard, Users, User, Calendar, Settings, LogOut, Menu, X, Handshake, MessageSquare, LayoutGrid } from "lucide-react";

export default function PortalLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const [role, setRole] = useState<string | null>(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const isPublicPath = pathname?.startsWith("/portal/login") ||
        pathname?.startsWith("/portal/register") ||
        pathname?.startsWith("/portal/verify");

    useEffect(() => {
        if (isPublicPath) return;

        const token = Cookies.get("portalToken");
        const userRole = Cookies.get("portalRole");

        if (!token) {
            router.push("/portal/login");
        } else {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            setRole(userRole || null);
        }
    }, [router, pathname, isPublicPath]);

    const handleLogout = () => {
        Cookies.remove("portalToken");
        Cookies.remove("portalRole");
        router.push("/portal/login");
    };

    // Shared nav items + role specific items
    const getNavItems = () => {
        const base = [
            { name: "Dashboard", href: `/portal/${role}`, icon: LayoutDashboard },
        ];

        if (role === "team") {
            base.push({ name: "My Players", href: `/portal/team/players`, icon: Users });
            base.push({ name: "Squad Lineup", href: `/portal/team/squad`, icon: LayoutGrid });
            base.push({ name: "Transfer Market", href: `/portal/team/market`, icon: Handshake });
            base.push({ name: "Friendly Matches", href: `/portal/team/friendlies`, icon: Calendar });
            base.push({ name: "Negotiations", href: `/portal/team/negotiations`, icon: MessageSquare });
            base.push({ name: "Match Fixtures", href: `/portal/team/matches`, icon: Calendar });
        } else if (role === "coach") {
            base.push({ name: "My Assignments", href: `/portal/coach/assignments`, icon: Calendar });
        } else if (role === "referee") {
            base.push({ name: "Match Allocations", href: `/portal/referee/allocations`, icon: Calendar });
        }

        base.push({ name: "Settings", href: `/portal/${role}/settings`, icon: Settings });
        return base;
    };

    if (isPublicPath) {
        return <>{children}</>;
    }

    if (!role) return null; // Or a loading spinner

    return (
        <div className="min-h-screen bg-surface-dark flex flex-col md:flex-row">

            {/* Mobile Header */}
            <div className="md:hidden bg-primary-dark border-b border-white/10 p-4 flex items-center justify-between z-30">
                <Link href={`/portal/${role}`} className="flex items-center gap-2">
                    <Image src="/osun-fa-logo.png" alt="Logo" width={32} height={32} />
                    <span className="text-white font-bold">OSFA Portal</span>
                </Link>
                <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white">
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Sidebar */}
            <aside className={`
                fixed inset-y-0 left-0 w-64 bg-primary-dark border-r border-white/5 flex flex-col z-20 transition-transform duration-300
                md:relative md:translate-x-0
                ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
            `}>
                <div className="hidden md:flex items-center gap-3 p-6 border-b border-white/5">
                    <div className="bg-white p-1 rounded-full">
                        <Image src="/osun-fa-logo.png" alt="OSFA" width={40} height={40} className="w-10 h-10 object-contain" />
                    </div>
                    <div>
                        <h2 className="text-white font-bold text-lg leading-tight">OSFA</h2>
                        <span className="text-accent text-xs font-semibold uppercase tracking-wider">{role} Portal</span>
                    </div>
                </div>

                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    {getNavItems().map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${isActive
                                    ? "bg-accent/10 text-accent border border-accent/20"
                                    : "text-gray-400 hover:text-white hover:bg-white/5"
                                    }`}
                            >
                                <item.icon size={20} className={isActive ? "text-accent" : ""} />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-white/5">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-colors font-medium"
                    >
                        <LogOut size={20} />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content Overlay for Mobile */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-10 md:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Main Content */}
            <main className="flex-1 w-full min-w-0 flex flex-col h-screen overflow-hidden">
                <div className="flex-1 overflow-y-auto p-4 md:p-8">
                    {children}
                </div>
            </main>

        </div>
    );
}
