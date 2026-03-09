"use client";

import { Calendar, CheckCircle2, Flag, FileText } from "lucide-react";

export default function RefereeDashboard() {
    const stats = [
        { label: "Profile Status", value: "Active", icon: CheckCircle2, color: "text-green-500", bg: "bg-green-500/10" },
        { label: "Matches Officiated", value: "0", icon: Flag, color: "text-accent", bg: "bg-accent/10" },
        { label: "Fitness Test", value: "Pending", icon: FileText, color: "text-yellow-500", bg: "bg-yellow-500/10" },
    ];

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <h1 className="text-3xl font-bold text-white">Referee Dashboard</h1>

            {/* Quick Actions */}
            <div className="bg-primary/20 border border-primary/30 p-6 flex flex-col md:flex-row items-center justify-between gap-6 rounded-2xl">
                <div>
                    <h2 className="text-xl font-bold text-white mb-2">Welcome to your Portal</h2>
                    <p className="text-gray-400 max-w-lg">
                        View matches you've been allocated to, submit match reports, and manage your referee certifications and fitness test records.
                    </p>
                </div>
                <div className="flex items-center gap-2 bg-green-500/10 text-green-500 px-4 py-2 rounded-full border border-green-500/20 font-medium shrink-0">
                    <CheckCircle2 size={18} />
                    Profile Approved
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-white/5 border border-white/5 p-6 rounded-2xl hover:bg-white/10 transition-colors">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-3 rounded-xl ${stat.bg}`}>
                                <stat.icon className={`w-6 h-6 ${stat.color}`} />
                            </div>
                        </div>
                        <h3 className="text-gray-400 font-medium text-sm mb-1">{stat.label}</h3>
                        <p className="text-2xl font-bold text-white">{stat.value}</p>
                    </div>
                ))}
            </div>

            <div className="bg-white/5 border border-white/5 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-6">Upcoming Allocations</h3>
                <div className="text-center py-12 text-gray-500">
                    <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No match allocations pending. The referees committee will assign you matches soon.</p>
                </div>
            </div>
        </div>
    );
}
