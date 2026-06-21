"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Cookies from "js-cookie";
import { LayoutDashboard, Users, User, Calendar, Settings, LogOut, Menu, X, Handshake, MessageSquare, LayoutGrid, Activity, Trophy } from "lucide-react";
import api from "@/lib/api";

export default function PortalLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const [role, setRole] = useState<string | null>(null);
    const [userData, setUserData] = useState<any>(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const isPublicPath = pathname?.startsWith("/portal/login") ||
        pathname?.startsWith("/portal/register") ||
        pathname?.startsWith("/portal/verify");

    useEffect(() => {
        if (isPublicPath) return;

        const token = Cookies.get("portalToken");
        const userRole = Cookies.get("portalRole");

        if (!token || !userRole) {
            router.push("/portal/login");
        } else {
            setRole(userRole);
            
            // Enforce Role-Based Access Control on Frontend
            const pathSegments = pathname?.split('/') || [];
            const accessingTeamArea = pathSegments.includes('team') || pathSegments.includes('club');
            const accessingCoachArea = pathSegments.includes('coach');
            const accessingRefereeArea = pathSegments.includes('referee');

            if (accessingTeamArea && userRole !== 'team') {
                router.replace(`/portal/${userRole}`);
                return;
            }
            if (accessingCoachArea && userRole !== 'coach') {
                router.replace(`/portal/${userRole}`);
                return;
            }
            if (accessingRefereeArea && userRole !== 'referee') {
                router.replace(`/portal/${userRole}`);
                return;
            }

            fetchUserData();
        }
    }, [router, pathname, isPublicPath]);

    const fetchUserData = async () => {
        try {
            const res = await api.get('/portal-auth/me');
            setUserData(res.data);
        } catch (error) {
            console.error("Failed to fetch user data for layout");
        }
    };

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
            base.push({ name: "Competitions", href: `/portal/team/competitions`, icon: Trophy });
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
        <div className="min-h-screen bg-[#050907] text-white flex flex-col md:flex-row font-inter">
            {/* Ambient Background Glow */}
            <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] pointer-events-none z-0"></div>
            <div className="fixed bottom-0 left-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[100px] pointer-events-none z-0"></div>

            {/* Mobile Header */}
            <div className="md:hidden bg-primary-dark/80 backdrop-blur-xl border-b border-white/5 p-4 flex items-center justify-between z-40 sticky top-0">
                <Link href={`/portal/${role}`} className="flex items-center gap-3">
                    <div className="bg-white p-1 rounded-lg">
                         <Image src="/osun-fa-logo.png" alt="Logo" width={28} height={28} />
                    </div>
                    <span className="text-white font-black tracking-tighter text-lg uppercase">Osun FA<span className="text-accent underline decoration-2 underline-offset-4 ml-1">Portal</span></span>
                </Link>
                <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 bg-white/5 rounded-xl border border-white/5 text-white active:scale-95 transition-all">
                    {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </div>

            {/* Sidebar */}
            <aside className={`
                fixed inset-y-0 left-0 w-72 bg-[#0a0f0d]/80 backdrop-blur-3xl border-r border-white/5 flex flex-col z-50 transition-all duration-500 ease-in-out shadow-2xl h-screen md:sticky md:top-0
                md:translate-x-0
                ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
            `}>
                <Link href={`/`} className="flex items-center gap-4 p-6">
                    <div className="bg-white p-1.5 rounded-2xl shadow-xl shadow-white/5 w-14 h-14 flex items-center justify-center overflow-hidden">
                        {(userData?.clubLogoUrl || userData?.passportPhotographUrl) ? (
                            <img 
                                src={userData.clubLogoUrl || userData.passportPhotographUrl} 
                                alt="Logo" 
                                className="w-full h-full object-contain" 
                            />
                        ) : (
                            <Image src="/osun-fa-logo.png" alt="Osun FA" width={42} height={42} className="w-10 h-10 object-contain" />
                        )}
                    </div>
                    <div>
                        <h2 className="text-white font-black text-xl leading-none tracking-tighter uppercase whitespace-nowrap overflow-hidden text-ellipsis max-w-[140px]">
                            {userData?.name || userData?.clubName || userData?.playerName || (userData?.firstName && userData?.surname ? `${userData.firstName} ${userData.surname}` : null) || (userData?.firstName ? userData.firstName : null) || 'Osun FA'}
                        </h2>
                        <div className="h-1 w-8 bg-accent mt-1 rounded-full"></div>
                        <span className="text-accent/60 text-[9px] font-black uppercase tracking-[0.3em] mt-2 block">{role} Profile</span>
                    </div>
                </Link>

                <div className="flex-1 px-4 py-4 space-y-1.5 overflow-y-auto hide-scrollbar">
                    {/* <p className="px-4 pb-4 text-[10px] font-black text-white/20 uppercase tracking-[0.4em]">Command Center</p> */}
                    {getNavItems().map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 group relative overflow-hidden ${isActive
                                    ? "bg-accent/10 text-accent"
                                    : "text-white/40 hover:text-white hover:bg-white/5"
                                    }`}
                            >
                                {isActive && <div className="absolute left-0 w-1 h-6 bg-accent rounded-r-full"></div>}
                                <item.icon size={20} className={`transition-transform duration-500 ${isActive ? "scale-110" : "group-hover:scale-110"}`} />
                                <span className="text-[11px] font-black uppercase tracking-widest leading-none">{item.name}</span>
                            </Link>
                        );
                    })}
                </div>

                <div className="p-4">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-3 px-4 py-4 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-2xl transition-all duration-300 font-black text-[10px] uppercase tracking-[0.2em] border border-red-500/10 shadow-lg shadow-red-500/5 mb-4"
                    >
                        <LogOut size={16} />
                        Logout
                    </button>
                    <p className="text-[8px] text-center font-bold text-white/10 uppercase tracking-[0.2em]">&copy; {new Date().getFullYear()} Osun FA Portal v1.0</p>
                </div>
            </aside>

            {/* Main Content Overlay for Mobile */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden transition-all duration-500"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Main Content */}
            <main className="flex-1 w-full min-w-0 flex flex-col h-screen overflow-hidden relative z-10">
                <div className="flex-1 overflow-y-auto px-6 py-8 md:px-10 md:py-12 scroll-smooth">
                    {children}
                </div>
            </main>
        </div>
    );
}
