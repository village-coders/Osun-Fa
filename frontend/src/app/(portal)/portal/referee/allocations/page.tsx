"use client";

import { useState, useEffect } from "react";
import { Calendar, Clock, MapPin, Flag, Loader2 } from "lucide-react";
import userApi from "@/lib/api";
import toast from "react-hot-toast";

export default function RefereeAllocationsPage() {
    const [allocations, setAllocations] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAllocations = async () => {
            try {
                const res = await userApi.get('/matches/my-matches');
                setAllocations(res.data);
            } catch (error) {
                toast.error("Failed to load allocations");
            } finally {
                setLoading(false);
            }
        };
        fetchAllocations();
    }, []);

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Match Allocations</h1>
                <p className="text-gray-400">View upcoming assignments and your officiating history.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                    <div className="col-span-full text-center py-16 bg-white/5 rounded-2xl border border-white/5">
                        <Loader2 className="w-12 h-12 mx-auto mb-4 text-accent animate-spin" />
                        <p className="text-gray-400 font-medium">Loading your allocations...</p>
                    </div>
                ) : allocations.length === 0 ? (
                    <div className="col-span-full text-center py-16 bg-white/5 rounded-2xl border border-white/5">
                        <Flag className="w-12 h-12 mx-auto mb-4 text-gray-600" />
                        <p className="text-gray-400 font-medium">You have no match allocations at this time.</p>
                    </div>
                ) : (
                    allocations.map(match => (
                        <div key={match._id} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-colors flex flex-col relative group">

                            {/* Accent Glow */}
                            <div className={`absolute top-0 right-0 w-32 h-32 blur-3xl rounded-full opacity-20 -translate-y-1/2 translate-x-1/2 transition-opacity ${match.status !== 'completed' ? 'bg-accent opacity-30 group-hover:opacity-50' : 'bg-gray-500'
                                }`}></div>

                            <div className="p-5 border-b border-white/10 flex items-center justify-between bg-black/20 relative z-10">
                                <span className="text-xs font-bold text-gray-300 flex items-center gap-1.5 border border-white/10 px-2.5 py-1 rounded-md bg-white/5 truncate max-w-[150px]">
                                    <Flag size={12} className={match.status !== 'completed' ? 'text-accent' : 'text-gray-400'} shrink-0 />
                                    {match.refereeAssessor || "Match Official"}
                                </span>
                                <span className={`text-xs px-2.5 py-1 rounded-full font-bold capitalize ${match.status === 'completed'
                                        ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                                        : match.status === 'live'
                                            ? 'bg-red-500/10 text-red-500 border border-red-500/20'
                                            : 'bg-accent/10 text-accent border border-accent/20'
                                    }`}>
                                    {match.status}
                                </span>
                            </div>

                            <div className="p-6 flex-1 flex flex-col justify-center relative z-10">
                                <div className="text-center space-y-4">
                                    <div className="font-bold text-xl text-white truncate px-2">{match.homeTeam}</div>
                                    <div className="flex justify-center items-center gap-3">
                                        {(match.status === 'completed' || match.status === 'live') ? (
                                            <div className="text-2xl font-black text-white bg-white/10 px-4 py-1.5 rounded-xl border border-white/5">
                                                {match.homeScore ?? 0} - {match.awayScore ?? 0}
                                            </div>
                                        ) : (
                                            <div className="text-sm font-bold text-gray-500 border-y border-white/5 py-2 inline-block px-4">VS</div>
                                        )}
                                    </div>
                                    <div className="font-bold text-xl text-white truncate px-2">{match.awayTeam}</div>
                                </div>
                            </div>

                            <div className="bg-black/40 px-5 py-4 space-y-2 border-t border-white/5 text-sm text-gray-400 font-medium relative z-10">
                                <div className="flex items-center gap-2">
                                    <Calendar size={14} className={match.status !== 'completed' ? 'text-accent' : 'text-gray-500'} shrink-0 />
                                    <span>{new Date(match.matchDate).toLocaleDateString()}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock size={14} className={match.status !== 'completed' ? 'text-accent' : 'text-gray-500'} shrink-0 />
                                    <span>{new Date(match.matchDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin size={14} className={match.status !== 'completed' ? 'text-accent' : 'text-gray-500'} shrink-0 />
                                    <span className="truncate">{match.venue}</span>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
