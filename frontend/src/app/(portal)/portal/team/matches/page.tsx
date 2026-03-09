"use client";

import { useState, useEffect } from "react";
import { Calendar, MapPin, Clock, Loader2 } from "lucide-react";
import userApi from "@/lib/api";
import toast from "react-hot-toast";

export default function TeamMatchesPage() {
    const [activeTab, setActiveTab] = useState("upcoming");
    const [matches, setMatches] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMatches = async () => {
            try {
                const res = await userApi.get('/matches/my-matches');
                setMatches(res.data);
            } catch (error) {
                toast.error("Failed to load matches");
            } finally {
                setLoading(false);
            }
        };
        fetchMatches();
    }, []);

    // Helper to categorize matches
    // Everything not 'completed' is considered upcoming for simplicity, 
    // unless you want a separate 'live' tab
    const filteredMatches = matches.filter(m => {
        if (activeTab === 'completed') return m.status === 'completed';
        return m.status !== 'completed';
    });

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Match Fixtures</h1>
                <p className="text-gray-400">View your upcoming league matches and past results.</p>
            </div>

            {/* Tabs */}
            <div className="flex gap-4 border-b border-white/10 pb-4">
                <button
                    onClick={() => setActiveTab('upcoming')}
                    className={`font-semibold transition-colors pb-4 -mb-4 border-b-2 ${activeTab === 'upcoming' ? 'text-accent border-accent' : 'text-gray-400 border-transparent hover:text-white'}`}
                >
                    Upcoming Fixtures
                </button>
                <button
                    onClick={() => setActiveTab('completed')}
                    className={`font-semibold transition-colors pb-4 -mb-4 border-b-2 ${activeTab === 'completed' ? 'text-accent border-accent' : 'text-gray-400 border-transparent hover:text-white'}`}
                >
                    Past Results
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {loading ? (
                    <div className="col-span-full text-center py-16 bg-white/5 rounded-2xl border border-white/5">
                        <Loader2 className="w-12 h-12 mx-auto mb-4 text-accent animate-spin" />
                        <p className="text-gray-400 font-medium">Loading match data...</p>
                    </div>
                ) : filteredMatches.length === 0 ? (
                    <div className="col-span-full text-center py-16 bg-white/5 rounded-2xl border border-white/5">
                        <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-600" />
                        <p className="text-gray-400 font-medium">No matches found for this period.</p>
                    </div>
                ) : (
                    filteredMatches.map(match => (
                        <div key={match._id} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-colors group">
                            <div className="p-6">
                                <div className="flex justify-between items-center text-sm font-medium text-gray-400 mb-6">
                                    <div className="flex items-center gap-1.5 shrink-0 bg-primary/30 px-3 py-1 rounded-md">
                                        <Calendar size={14} className="text-accent" /> {new Date(match.matchDate).toLocaleDateString()}
                                    </div>
                                    <div className="flex items-center gap-1.5 shrink-0">
                                        <Clock size={14} className="text-accent" /> {new Date(match.matchDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </div>
                                </div>

                                <div className="flex items-center justify-between mb-8">
                                    <div className="flex-1 text-center">
                                        <h3 className="text-lg font-bold text-white truncate max-w-[120px] mx-auto">{match.homeTeam}</h3>
                                        <p className="text-xs text-gray-500 uppercase mt-1">Home</p>
                                    </div>

                                    <div className="px-4">
                                        {match.status === 'completed' || match.status === 'live' ? (
                                            <div className="bg-white/10 text-white font-bold text-xl px-4 py-2 rounded-xl backdrop-blur-sm border border-white/5 whitespace-nowrap">
                                                {match.homeScore ?? 0} - {match.awayScore ?? 0}
                                            </div>
                                        ) : (
                                            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-500 font-bold border border-white/10">
                                                VS
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex-1 text-center">
                                        <h3 className="text-lg font-bold text-white truncate max-w-[120px] mx-auto">{match.awayTeam}</h3>
                                        <p className="text-xs text-gray-500 uppercase mt-1">Away</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-black/30 px-6 py-4 flex items-center justify-between border-t border-white/5">
                                <div className="flex items-center gap-2 text-sm text-gray-400 truncate">
                                    <MapPin size={14} className="text-secondary shrink-0" />
                                    <span className="truncate">{match.venue}</span>
                                </div>
                                <button className="text-sm font-bold text-accent hover:text-white transition-colors whitespace-nowrap">
                                    {match.status === 'completed' ? 'Match Details' : 'Preview'}
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
