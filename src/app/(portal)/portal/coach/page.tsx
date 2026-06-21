"use client";

import { Calendar, User, FileText, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import userApi from "@/lib/api";
import Cookies from "js-cookie";

export default function CoachDashboard() {
    const [hasCompletedProfile, setHasCompletedProfile] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = Cookies.get("portalToken");
                if (!token) return;
                const res = await userApi.get("/portal-auth/me", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (res.data?.status) {
                    setHasCompletedProfile(true);
                }
            } catch (err) {
                console.error("Failed to fetch coach profile", err);
            }
        };
        fetchProfile();
    }, []);

    const stats = [
        { label: "Profile Status", value: "Active", icon: User, color: "text-green-500", bg: "bg-green-500/10" },
        { label: "Matches Assessed", value: "0", icon: Calendar, color: "text-blue-500", bg: "bg-blue-500/10" },
        { label: "Certifications", value: "Valid", icon: FileText, color: "text-purple-500", bg: "bg-purple-500/10" },
    ];

    return (
        <div className="max-w-7xl mx-auto space-y-12">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-1">
                    <span className="text-accent font-black uppercase text-[10px] tracking-[0.4em] mb-2 block">— MANAGEMENT —</span>
                    <h1 className="text-5xl font-black text-white tracking-tighter uppercase leading-none">Coach <span className="text-accent">Dashboard</span></h1>
                </div>
                <div className="flex items-center gap-2 bg-green-500/10 text-green-400 px-4 py-2 rounded-2xl border border-green-500/10 font-black text-[9px] uppercase tracking-widest">
                    <CheckCircle2 size={14} />
                    Credentialed Professional
                </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-linear-to-br from-white/5 to-transparent border border-white/5 p-8 md:p-12 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-12 group shadow-2xl relative overflow-hidden">
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-accent/5 rounded-full blur-[100px] pointer-events-none"></div>
                <div className="space-y-4 text-center md:text-left relative z-10">
                    <h2 className="text-3xl font-black text-white uppercase tracking-tight leading-tight">Coach <span className="text-accent">Portal</span></h2>
                    <p className="text-gray-400 max-w-lg font-medium leading-relaxed">
                        Manage your coaching profile, view match assignments, and stay up to date with the latest Osun FA technical guidelines.
                    </p>
                </div>
                <Link href="/portal/complete-profile/coach">
                    <button className="bg-accent text-primary-dark font-black px-10 py-5 rounded-2xl flex items-center gap-4 hover:-translate-y-1 active:scale-95 transition-all shadow-2xl shadow-accent/20 shrink-0 uppercase text-[10px] tracking-[0.2em] relative z-10">
                        {hasCompletedProfile ? "Edit Profile" : "Update Credentials"}
                    </button>
                </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-white/5 border border-white/5 p-8 rounded-2xl hover:bg-white/[0.08] transition-all duration-300 group shadow-xl">
                        <div className="flex items-center justify-between mb-8">
                            <div className={`p-4 rounded-2xl ${stat.bg} group-hover:rotate-6 transition-transform duration-500`}>
                                <stat.icon className={`w-6 h-6 ${stat.color}`} />
                            </div>
                        </div>
                        <div className="space-y-1">
                             <h3 className="text-gray-500 font-black text-[10px] uppercase tracking-[0.2em]">{stat.label}</h3>
                             <p className="text-4xl font-black text-white tracking-tighter tabular-nums truncate">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Activity */}
            <div className="bg-white/5 border border-white/5 rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden group">
                 <div className="flex items-center justify-between mb-10 pb-4 border-b border-white/5">
                    <h3 className="text-xs font-black text-white uppercase tracking-[0.3em]">Upcoming Assignments</h3>
                </div>
                <div className="flex flex-col items-center justify-center py-24 text-center space-y-6">
                    <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center text-white/10 group-hover:text-accent/20 transition-all duration-500 group-hover:scale-110">
                         <Calendar size={40} />
                    </div>
                    <div className="space-y-2">
                         <p className="text-white/60 font-black text-sm uppercase tracking-widest italic">No Assignments</p>
                         <p className="text-white/20 text-[10px] font-bold max-w-xs uppercase tracking-tighter">Your match assignments will be listed here when available.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
