"use client";

import { Calendar, User, FileText, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function CoachDashboard() {
    const stats = [
        { label: "Profile Status", value: "Active", icon: User, color: "text-green-500", bg: "bg-green-500/10" },
        { label: "Matches Assessed", value: "0", icon: Calendar, color: "text-blue-500", bg: "bg-blue-500/10" },
        { label: "Certifications", value: "Valid", icon: FileText, color: "text-purple-500", bg: "bg-purple-500/10" },
    ];

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <h1 className="text-3xl font-bold text-white">Coach Dashboard</h1>

            {/* Quick Actions */}
            <div className="bg-primary/20 border border-primary/30 p-6 flex flex-col md:flex-row items-center justify-between gap-6 rounded-2xl">
                <div>
                    <h2 className="text-xl font-bold text-white mb-2">Welcome to your Portal</h2>
                    <p className="text-gray-400 max-w-lg">
                        Manage your coaching profile, view match assignments, and stay up to date with the latest OSFA technical guidelines.
                    </p>
                </div>
                <div className="flex items-center gap-2 bg-green-500/10 text-green-500 px-4 py-2 rounded-full border border-green-500/20 font-medium">
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

            {/* Recent Activity */}
            <div className="bg-white/5 border border-white/5 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-6">Upcoming Assignments</h3>
                <div className="text-center py-12 text-gray-500">
                    <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No upcoming match assignments available yet.</p>
                </div>
            </div>
        </div>
    );
}
