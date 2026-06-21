"use client";

import { useEffect, useState } from "react";
import { Users, Calendar, Trophy, FileText, ArrowRight, Handshake, Activity } from "lucide-react";
import Link from "next/link";
import userApi from "@/lib/api";
import Cookies from "js-cookie";
import { DashboardSkeleton } from "@/components/PortalSkeletons";

export default function TeamDashboard() {
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState<any[]>([]);
    const [clubStatus, setClubStatus] = useState<string>("Pending");
    const [isProfileComplete, setIsProfileComplete] = useState<boolean>(false);

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
                // Check if registration form is submitted by looking at required fields like digitalSignature or declarationAccepted
                setIsProfileComplete(!!currentClub.digitalSignature || !!currentClub.declarationAccepted || !!currentClub.clubCategory);

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

    if (loading) return <DashboardSkeleton />;

    return (
        <div className="max-w-7xl mx-auto space-y-12">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-1">
                    <span className="text-accent font-black uppercase text-[10px] tracking-[0.4em] mb-2 block">— OVERVIEW —</span>
                    <h1 className="text-5xl font-black text-white tracking-tighter uppercase leading-none">Club <span className="text-accent">Dashboard</span></h1>
                </div>
                <div className="flex items-center gap-3">
                    <div className={`px-4 py-2 rounded-2xl border flex items-center gap-2 ${clubStatus === 'Approved' ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400'}`}>
                        <div className={`w-2 h-2 rounded-full ${clubStatus === 'Approved' ? 'bg-green-500' : 'bg-yellow-500 animate-pulse'}`}></div>
                        <span className="text-[10px] font-black uppercase tracking-widest">{clubStatus === 'Approved' ? 'Verified Club' : 'Pending Verification'}</span>
                    </div>
                </div>
            </div>

            {/* Quick Actions / Registration CTA */}
            {clubStatus !== 'Approved' && !isProfileComplete && (
                <div className="bg-linear-to-br from-accent/20 via-primary-dark to-black border border-accent/20 p-8 md:p-12 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden group shadow-2xl mb-12">
                    <div className="absolute top-0 right-0 p-20 opacity-5 group-hover:scale-110 group-hover:rotate-12 transition-all duration-1000">
                        <FileText size={200} />
                    </div>
                    <div className="relative z-10 space-y-4 text-center md:text-left">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/20 rounded-full border border-accent/30 mb-2">
                             <div className="w-1.5 h-1.5 rounded-full bg-accent animate-ping"></div>
                             <span className="text-[9px] font-black text-accent uppercase tracking-widest leading-none">Action Required</span>
                        </div>
                        <h2 className="text-3xl font-black text-white uppercase tracking-tight leading-tight">Registration <br/> <span className="text-accent">Incomplete</span></h2>
                        <p className="text-gray-400 max-w-xl font-medium leading-relaxed">
                            Your club registration is currently pending. Please fill out the official <span className="text-accent">Osun FA Digital Registration Form</span> to proceed with full membership.
                        </p>
                    </div>
                    <Link
                        href="/portal/team/registration"
                        className="bg-accent text-primary-dark font-black px-10 py-5 rounded-2xl flex items-center gap-4 hover:-translate-y-1 active:scale-95 transition-all shadow-2xl shadow-accent/20 shrink-0 uppercase text-xs tracking-[0.3em] relative z-10"
                    >
                        <FileText size={20} />
                        Complete Registration
                        <ArrowRight size={20} />
                    </Link>
                </div>
            )}

            {clubStatus !== 'Approved' && isProfileComplete && (
                <div className="bg-linear-to-br from-yellow-500/10 via-primary-dark to-black border border-yellow-500/20 p-8 md:p-12 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden group shadow-2xl mb-12">
                    <div className="absolute top-0 right-0 p-20 opacity-5 group-hover:scale-110 group-hover:rotate-12 transition-all duration-1000">
                        <Activity size={200} className="text-yellow-500" />
                    </div>
                    <div className="relative z-10 space-y-4 text-center md:text-left">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-500/20 rounded-full border border-yellow-500/30 mb-2">
                             <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-ping"></div>
                             <span className="text-[9px] font-black text-yellow-500 uppercase tracking-widest leading-none">Under Review</span>
                        </div>
                        <h2 className="text-3xl font-black text-white uppercase tracking-tight leading-tight">Pending <br/> <span className="text-yellow-500">Verification</span></h2>
                        <p className="text-gray-400 max-w-xl font-medium leading-relaxed">
                            Your club registration has been submitted and is currently awaiting verification by the Osun FA Admin. Once approved, you will have full access to manage your club.
                        </p>
                    </div>
                </div>
            )}

            {clubStatus === 'Approved' && (
                <div className="bg-linear-to-br from-white/5 to-transparent border border-white/10 p-8 md:p-12 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-12 group shadow-2xl relative overflow-hidden mb-12">
                     <div className="absolute -top-24 -right-24 w-64 h-64 bg-accent/5 rounded-full blur-[100px] pointer-events-none"></div>
                    <div className="space-y-4 text-center md:text-left relative z-10">
                        <h2 className="text-3xl font-black text-white uppercase tracking-tight leading-tight">Manage Your <span className="text-accent">Club</span></h2>
                        <p className="text-gray-400 max-w-xl font-medium leading-relaxed">
                            You can now manage your player lineup, participate in the transfer market, and view your upcoming match fixtures.
                        </p>
                    </div>
                    <Link
                        href="/portal/team/players"
                        className="bg-accent text-primary-dark font-black px-10 py-5 rounded-2xl flex items-center gap-4 hover:-translate-y-1 active:scale-95 transition-all shadow-2xl shadow-accent/20 shrink-0 uppercase text-xs tracking-[0.3em]"
                    >
                        <Users size={20} />
                        View Players
                        <ArrowRight size={20} />
                    </Link>
                </div>
            )}

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-white/5 border border-white/5 p-6 rounded-2xl hover:bg-white/[0.08] transition-all duration-300 group shadow-xl">
                        <div className="flex items-center justify-between mb-8">
                            <div className={`p-4 rounded-2xl ${stat.bg} group-hover:scale-110 transition-transform duration-500`}>
                                <stat.icon className={`w-6 h-6 ${stat.color}`} />
                            </div>
                        </div>
                        <div className="space-y-1">
                             <h3 className="text-gray-500 font-black text-[10px] uppercase tracking-[0.2em]">{stat.label}</h3>
                             <p className="text-4xl font-black text-white tracking-tighter tabular-nums">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Bottom Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                 {/* Recent Activity */}
                <div className="lg:col-span-2 bg-white/5 border border-white/5 rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden group">
                    <div className="flex items-center justify-between mb-10 pb-4 border-b border-white/5">
                        <h3 className="text-xs font-black text-white uppercase tracking-[0.3em]">Recent Activity</h3>
                        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/40 cursor-help group-hover:text-accent transition-colors">
                            <Activity size={14} />
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
                        <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center text-white/10 group-hover:text-accent/20 transition-all duration-500 group-hover:scale-110">
                             <Calendar size={40} />
                        </div>
                        <div className="space-y-2">
                             <p className="text-white/60 font-black text-sm uppercase tracking-widest italic">No Activity</p>
                             <p className="text-white/20 text-xs font-medium max-w-xs uppercase tracking-tighter">Your recent registrations and match updates will appear here.</p>
                        </div>
                    </div>
                </div>

                {/* Quick Reminders */}
                <div className="bg-linear-to-b from-primary-dark/40 to-transparent border border-white/5 rounded-3xl p-8 md:p-10 shadow-2xl">
                    <h3 className="text-xs font-black text-white uppercase tracking-[0.3em] mb-10 pb-4 border-b border-white/5">Quick Actions</h3>
                    <div className="space-y-6">
                         <div className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-accent/40 transition-all cursor-pointer group">
                              <div className="w-10 h-10 shrink-0 rounded-xl bg-accent/10 flex items-center justify-center text-accent group-hover:rotate-12 transition-transform">
                                   <Users size={20} />
                              </div>
                              <div className="flex-1 min-w-0">
                                   <p className="text-[11px] font-black text-white uppercase">New Player Entry</p>
                                   <p className="text-[9px] text-white/40 font-bold uppercase tracking-tight">Add a new athlete to your official roster.</p>
                              </div>
                         </div>
                         <div className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-accent/40 transition-all cursor-pointer group">
                              <div className="w-10 h-10 shrink-0 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-400 group-hover:rotate-12 transition-transform">
                                   <Trophy size={20} />
                              </div>
                              <div className="flex-1 min-w-0">
                                   <p className="text-[11px] font-black text-white uppercase">Competition Tenders</p>
                                   <p className="text-[9px] text-white/40 font-bold uppercase tracking-tight">Register your team for upcoming FA leagues.</p>
                              </div>
                         </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
