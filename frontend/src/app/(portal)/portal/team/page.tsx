"use client";

import { useEffect, useState } from "react";
import { Users, Calendar, Trophy, FileText, ArrowRight, Handshake } from "lucide-react";
import Link from "next/link";
import userApi from "@/lib/api";
import Cookies from "js-cookie";

export default function TeamDashboard() {
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState<any[]>([]);
    const [clubStatus, setClubStatus] = useState<string>("Pending");

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [playersRes, negRes, meRes] = await Promise.all([
                    userApi.get('/players/my-players'),
                    userApi.get('/negotiations/incoming'),
                    userApi.get('/portal-auth/me')
                ]);

                const myPlayers = playersRes.data;
                const onMarketCount = myPlayers.filter((p: any) => p.transferStatus === 'OnMarket').length;
                const pendingOffers = negRes.data.filter((n: any) => n.status === 'Pending').length;
                const currentClub = meRes.data;

                setClubStatus(currentClub.status || "Pending");

                setStats([
                    { label: "Squad Size", value: myPlayers.length.toString(), icon: Users, color: "text-blue-500", bg: "bg-blue-500/10" },
                    { label: "On Market", value: onMarketCount.toString(), icon: Trophy, color: "text-yellow-500", bg: "bg-yellow-500/10" },
                    { label: "Pending Offers", value: pendingOffers.toString(), icon: Handshake, color: "text-green-500", bg: "bg-green-500/10" },
                    { label: "Status", value: currentClub.status || "Pending", icon: FileText, color: currentClub.status === 'Approved' ? "text-green-500" : "text-yellow-500", bg: currentClub.status === 'Approved' ? "bg-green-500/10" : "bg-yellow-500/10" },
                ]);
            } catch (error) {
                console.error("Failed to load dashboard stats");
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-white">Club Dashboard</h1>
                {clubStatus !== 'Approved' && (
                    <div className="bg-yellow-500/10 border border-yellow-500/30 px-4 py-2 rounded-full flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></div>
                        <span className="text-yellow-500 text-sm font-medium uppercase tracking-wider">Pending Approval</span>
                    </div>
                )}
                {clubStatus === 'Approved' && (
                    <div className="bg-green-500/10 border border-green-500/30 px-4 py-2 rounded-full flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        <span className="text-green-500 text-sm font-medium uppercase tracking-wider">Approved</span>
                    </div>
                )}
            </div>

            {clubStatus !== 'Approved' && (
                <div className="bg-yellow-500/5 border border-yellow-500/20 p-4 rounded-xl flex items-start gap-3">
                    <FileText className="text-yellow-500 mt-0.5" size={20} />
                    <div>
                        <p className="text-yellow-500 font-medium">Club Not Yet Approved</p>
                        <p className="text-gray-400 text-sm">
                            Your club registration is currently being reviewed by the OSFA administrators.
                            You will have full access to player registration and transfer market features once approved.
                        </p>
                    </div>
                </div>
            )}

            {/* Quick Actions / Registration CTA */}
            {clubStatus !== 'Approved' ? (
                <div className="bg-accent/10 border border-accent/30 p-8 rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:scale-110 transition-transform">
                        <FileText size={120} />
                    </div>
                    <div className="relative z-10 space-y-3">
                        <div className="flex items-center gap-2">
                             <div className="w-2 h-2 rounded-full bg-accent animate-ping"></div>
                             <h2 className="text-xl font-black text-white uppercase tracking-tight">Complete Official Registration</h2>
                        </div>
                        <p className="text-gray-400 max-w-xl font-medium">
                            Your club registration is currently incomplete or pending. Please fill out the official <span className="text-accent">OSFA Digital Registration Form</span> (Sections A-G) to proceed with affiliation.
                        </p>
                    </div>
                    <Link
                        href="/portal/team/registration"
                        className="bg-accent text-primary-dark font-black px-8 py-4 rounded-2xl flex items-center gap-3 hover:-translate-y-1 transition-all shadow-xl shadow-accent/20 shrink-0 uppercase text-xs tracking-[0.2em] relative z-10"
                    >
                        <FileText size={18} />
                        Complete Now
                        <ArrowRight size={18} />
                    </Link>
                </div>
            ) : (
                <div className="bg-primary/20 border border-primary/30 p-8 rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-8 group">
                    <div className="space-y-3">
                        <h2 className="text-xl font-black text-white uppercase tracking-tight">Manage Your Squad</h2>
                        <p className="text-gray-400 max-w-xl font-medium">
                            Explore the transfer market, manage your current roster, and prepare for upcoming OSFA league matches.
                        </p>
                    </div>
                    <Link
                        href="/portal/team/players"
                        className="bg-accent text-primary-dark font-black px-8 py-4 rounded-2xl flex items-center gap-3 hover:-translate-y-1 transition-all shadow-xl shadow-accent/20 shrink-0 uppercase text-xs tracking-[0.2em]"
                    >
                        <Users size={18} />
                        Manage Players
                        <ArrowRight size={18} />
                    </Link>
                </div>
            )}

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-white/5 border border-white/5 p-6 rounded-2xl hover:bg-white/10 transition-colors">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-3 rounded-xl ${stat.bg}`}>
                                <stat.icon className={`w-6 h-6 ${stat.color}`} />
                            </div>
                        </div>
                        <h3 className="text-gray-400 font-medium text-sm mb-1">{stat.label}</h3>
                        <p className="text-3xl font-bold text-white">{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* Recent Activity */}
            <div className="bg-white/5 border border-white/5 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-6">Recent Activity</h3>
                <div className="text-center py-12 text-gray-500">
                    <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No recent activity yet. Added players and matches will appear here.</p>
                </div>
            </div>
        </div>
    );
}
