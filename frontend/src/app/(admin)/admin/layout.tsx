"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard, Newspaper, Users, UserCog,
    Activity, Trophy, CalendarDays, LogOut, Menu, X, Settings
} from "lucide-react";
import { useState } from "react";
import Image from "next/image";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const navItems = [
        { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
        { name: "News & Media", href: "/admin/news", icon: Newspaper },
        { name: "Manage Teams", href: "/admin/teams", icon: Users },
        { name: "Manage Coaches", href: "/admin/coaches", icon: UserCog },
        { name: "Manage Referees", href: "/admin/referees", icon: Activity },
        { name: "Competitions", href: "/admin/competitions", icon: Trophy },
        { name: "Registered Players", href: "/admin/players", icon: Users },
        { name: "Match Fixtures", href: "/admin/matches", icon: CalendarDays },
        { name: "Settings", href: "/admin/settings", icon: Settings },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex">

            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}

            {/* Sidebar */}
            <aside className={`fixed top-0 left-0 h-screen w-64 bg-surface-dark text-white z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
                {/* Logo Area */}
                <div className="h-20 flex items-center gap-3 px-6 border-b border-[rgba(255,255,255,0.05)] bg-primary-dark">
                    <Link href="/">
                        <div className="w-8 h-8 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center font-bold text-black border border-accent">
                            <Image src="/osun-fa-logo.png" alt="Logo" width={30} height={30} />
                        </div>
                        <span className="font-bold text-lg tracking-tight">OSFA Admin</span>
                    </Link>
                    <button className="ml-auto lg:hidden text-gray-400 hover:text-white" onClick={() => setIsSidebarOpen(false)}>
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Navigation Links */}
                <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;

                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => setIsSidebarOpen(false)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive
                                    ? "bg-primary text-white font-bold shadow-md border border-[rgba(255,255,255,0.1)]"
                                    : "text-gray-400 hover:bg-[rgba(255,255,255,0.05)] hover:text-white"
                                    }`}
                            >
                                <Icon className={`w-5 h-5 ${isActive ? 'text-accent' : 'text-gray-400'}`} />
                                <span className="text-sm">{item.name}</span>
                            </Link>
                        );
                    })}
                </div>

                {/* Bottom Profile Area */}
                <div className="p-4 border-t border-[rgba(255,255,255,0.05)]">
                    <button onClick={() => {
                        import('js-cookie').then(Cookies => {
                            Cookies.default.remove('token');
                            window.location.href = '/login';
                        });
                    }} className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-gray-400 hover:bg-red-500/10 hover:text-red-500 transition-colors">
                        <LogOut className="w-5 h-5" />
                        <span className="text-sm font-medium">Secure Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 lg:ml-64 flex flex-col min-h-screen min-w-0">
                {/* Top Header */}
                <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-4 sm:px-6 lg:px-8 z-30 sticky top-0">
                    <div className="flex items-center gap-4">
                        <button
                            className="lg:hidden p-2 rounded-md text-gray-500 hover:bg-gray-100"
                            onClick={() => setIsSidebarOpen(true)}
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                        <h1 className="text-xl font-bold text-gray-800 hidden sm:block">
                            {navItems.find(i => i.href === pathname)?.name || "Dashboard"}
                        </h1>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="text-sm text-right hidden sm:block">
                            <p className="font-bold text-gray-900">Admin User</p>
                            <p className="text-gray-500 text-xs text-primary font-semibold">Super Administrator</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                            <UserCog className="w-5 h-5 text-primary" />
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <div className="flex-1 p-4 sm:p-6 lg:p-8 bg-gray-50 text-gray-900">
                    {children}
                </div>
            </main>

        </div>
    );
}
