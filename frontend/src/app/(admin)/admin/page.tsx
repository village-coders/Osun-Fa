"use client";

import { Users, UserCog, Activity, Trophy, CalendarDays, TrendingUp, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import api from "@/lib/api";
import toast from "react-hot-toast";
import { Shield } from "lucide-react";

export default function AdminDashboard() {
    const [counts, setCounts] = useState<any>({
        clubs: { pending: 0, approved: 0, rejected: 0 },
        players: { pending: 0, approved: 0, rejected: 0 },
        coaches: 0,
        referees: 0,
        matches: 0,
        totalClubs: 0,
        totalPlayers: 0
    });
    const [attentionItems, setAttentionItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const [statsRes, attentionRes] = await Promise.all([
                    api.get('/admin/stats'),
                    api.get('/admin/needs-attention')
                ]);

                setCounts(statsRes.data);
                setAttentionItems(attentionRes.data);

            } catch (error) {
                console.error("Failed to load dashboard data", error);
                toast.error("Failed to load some dashboard statistics");
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    const stats = [
        { title: "Registered Clubs", value: counts.totalClubs.toString(), subValue: `${counts.clubs.pending} Pending`, icon: Users, color: "text-blue-600", bg: "bg-blue-100" },
        { title: "Active Players", value: counts.totalPlayers.toString(), subValue: `${counts.players.pending} Pending`, icon: TrendingUp, color: "text-emerald-600", bg: "bg-emerald-100" },
        { title: "Licensed Coaches", value: counts.coaches.toString(), icon: UserCog, color: "text-green-600", bg: "bg-green-100" },
        { title: "Active Referees", value: counts.referees.toString(), icon: Activity, color: "text-purple-600", bg: "bg-purple-100" },
        { title: "Total Matches", value: counts.matches.toString(), icon: CalendarDays, color: "text-rose-600", bg: "bg-rose-100" },
    ];

    const recentActions = [
        { action: "Dashboard Data Loaded", status: "Live", time: "Just now" },
        // Placeholder for future real-time activity feed
    ];

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="flex flex-col items-center gap-4 text-gray-500">
                    <Loader2 className="w-10 h-10 animate-spin text-primary" />
                    <p className="font-medium animate-pulse">Loading Operation Metrics...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="max-w-7xl mx-auto space-y-6">

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Welcome Back, Admin</h2>
                    <p className="text-gray-500 mt-1">Here is the overview of the Osun State FA operations today.</p>
                </div>
                <button className="bg-primary hover:bg-primary-dark text-white font-bold py-2.5 px-6 rounded-lg transition-colors shadow-md">
                    Generate Global Report
                </button>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {stats.map((stat, idx) => {
                    const Icon = stat.icon;
                    return (
                        <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow">
                            <div>
                                <p className="text-sm font-semibold text-gray-500 mb-1">{stat.title}</p>
                                <h3 className="text-3xl font-extrabold text-gray-800">{stat.value}</h3>
                                {stat.subValue && <p className="text-xs text-yellow-600 font-medium mt-1">{stat.subValue}</p>}
                            </div>
                            <div className={`w-14 h-14 rounded-full flex items-center justify-center ${stat.bg} ${stat.color}`}>
                                <Icon className="w-7 h-7" />
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Dashboard Splitting Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Recent Activity Feed */}
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full">
                    <div className="p-6 border-b border-gray-100 bg-gray-50">
                        <h3 className="font-bold text-gray-800">Needs Attention / Recent Activity</h3>
                    </div>
                    <div className="divide-y divide-gray-100 flex-1 flex flex-col">
                        {attentionItems.length === 0 ? (
                            <div className="p-12 text-center text-gray-500 italic">
                                No pending items requiring immediate attention.
                            </div>
                        ) : (
                            attentionItems.map((item, idx) => (
                                <div key={idx} className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 shrink-0">
                                            {item.type === 'Club' ? <Shield size={20} /> : <Users size={20} />}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-800">{item.name}</p>
                                            <p className="text-xs text-gray-500 mt-1">{item.type} • {item.details} • {new Date(item.date).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                    <Link
                                        href={item.type === 'Club' ? '/admin/teams' : '/admin/players'}
                                        className="text-primary text-xs font-bold hover:underline py-1 px-3 bg-primary/5 rounded-lg"
                                    >
                                        Review
                                    </Link>
                                </div>
                            ))
                        )}
                        <div className="p-4 text-center text-xs text-gray-500 mt-auto bg-gray-50/50">
                            System is monitoring all new affiliations and registrations.
                        </div>
                    </div>
                </div>

                {/* System Status / Quick Actions */}
                <div className="space-y-6">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <h3 className="font-bold text-gray-800 mb-4">Quick Shortcuts</h3>
                        <div className="space-y-3">
                            <button className="w-full text-left px-4 py-3 rounded-lg border border-gray-200 hover:border-primary hover:text-primary transition-colors font-medium text-gray-600">
                                + Approve Pending Clubs
                            </button>
                            <button className="w-full text-left px-4 py-3 rounded-lg border border-gray-200 hover:border-primary hover:text-primary transition-colors font-medium text-gray-600">
                                + Publish News Article
                            </button>
                            <button className="w-full text-left px-4 py-3 rounded-lg border border-gray-200 hover:border-primary hover:text-primary transition-colors font-medium text-gray-600">
                                + Update Match Scores
                            </button>
                        </div>
                    </div>

                    <div className="bg-surface-dark text-white rounded-2xl shadow-sm p-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-accent opacity-10 rounded-full blur-2xl"></div>
                        <h3 className="font-bold text-white mb-2">Registration Season</h3>
                        <p className="text-gray-400 text-sm mb-4">Current phase: 2026/2027 Club Affiliations</p>

                        <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                            <div className="bg-accent h-2 rounded-full" style={{ width: '68%' }}></div>
                        </div>
                        <p className="text-xs text-accent font-bold text-right border-t pt-2 border-gray-700 mt-4">68% Complete • 14 Days Left</p>
                    </div>
                </div>

            </div>

        </div>
    );
}
