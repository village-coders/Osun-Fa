"use client";

import { useState, useEffect } from "react";
import { Users, Plus, Search, MoreVertical, Edit, Trash2, Loader2, User, Eye, UserMinus, Trophy } from "lucide-react";
import Link from "next/link";
import userApi from "@/lib/api";
import toast from "react-hot-toast";
import { TableSkeleton } from "@/components/PortalSkeletons";

export default function TeamPlayersPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [players, setPlayers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isActionLoading, setIsActionLoading] = useState(false);

    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                const res = await userApi.get('/players/my-players');
                setPlayers(res.data);
            } catch (error) {
                toast.error("Failed to load players");
            } finally {
                setLoading(false);
            }
        };
        fetchPlayers();
    }, []);

    const filteredPlayers = players.filter(player =>
        (player.playerName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            player.playingPosition?.toLowerCase().includes(searchQuery.toLowerCase())) &&
        player.transferStatus !== 'Released'
    );

    const handleRelease = async (id: string, name: string) => {
        if (!confirm(`Are you sure you want to release ${name}? This will make them a free agent.`)) return;

        setIsActionLoading(true);
        try {
            await userApi.put(`/players/${id}/release`);
            setPlayers(players.filter(p => p._id !== id));
            toast.success(`${name} has been released successfully.`);
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to release player.");
        } finally {
            setIsActionLoading(false);
        }
    };

    const handleListOnMarket = async (id: string, name: string) => {
        const val = prompt(`Enter market value for ${name} (in NGN):`, "10000");
        if (!val) return;

        const marketValue = parseInt(val);
        if (isNaN(marketValue)) {
            toast.error("Invalid amount");
            return;
        }

        setIsActionLoading(true);
        try {
            await userApi.put(`/players/${id}/list-on-market`, { marketValue });
            setPlayers(players.map(p => p._id === id ? { ...p, transferStatus: 'OnMarket', marketValue } : p));
            toast.success(`${name} is now listed on the market.`);
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to list player.");
        } finally {
            setIsActionLoading(false);
        }
    };

    if (loading) return <TableSkeleton />;

    return (
        <div className="max-w-7xl mx-auto space-y-12">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div className="space-y-1">
                    <span className="text-accent font-black uppercase text-[10px] tracking-[0.4em] mb-2 block">— MANAGEMENT —</span>
                    <h1 className="text-5xl font-black text-white tracking-tighter uppercase leading-none">My <span className="text-accent">Players</span></h1>
                    <p className="text-white/40 text-xs font-bold uppercase tracking-wider mt-4">Manage your squad and player registrations.</p>
                </div>
                <Link href="/portal/team/players/new">
                    <button className="bg-accent text-primary-dark font-black px-10 py-5 rounded-2xl flex items-center gap-3 hover:-translate-y-1 active:scale-95 transition-all shadow-2xl shadow-accent/20 shrink-0 uppercase text-[10px] tracking-[0.2em] relative z-10">
                        <Plus size={18} strokeWidth={3} />
                        Add New Player
                    </button>
                </Link>
            </div>

            {/* Content Grid */}
            <div className="space-y-6">
                {/* Search Bar */}
                <div className="bg-[#0a0f0d]/40 backdrop-blur-3xl border border-white/5 rounded-2xl p-4 flex flex-col md:flex-row items-center gap-4">
                    <div className="relative flex-1 w-full">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-accent/40" />
                        <input
                            type="text"
                            placeholder="SEARCH BY NAME OR POSITION..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-6 py-3 bg-black/40 border border-white/5 rounded-xl text-white text-[10px] uppercase font-black tracking-widest focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent/40 transition-all placeholder:text-white/10"
                        />
                    </div>
                    <span className="text-white/20 text-[10px] font-black uppercase tracking-widest shrink-0">{filteredPlayers.length} Player{filteredPlayers.length !== 1 ? 's' : ''}</span>
                </div>

                {filteredPlayers.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-32 text-center bg-[#0a0f0d]/40 backdrop-blur-3xl border border-white/5 rounded-3xl">
                        <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
                            <Users className="w-10 h-10 opacity-10" />
                        </div>
                        <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">No Players Found</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                        {filteredPlayers.map((player) => (
                            <div key={player._id} className="bg-[#0a0f0d]/60 backdrop-blur-xl border border-white/5 rounded-2xl overflow-hidden hover:border-accent/20 hover:shadow-2xl hover:shadow-accent/5 transition-all group">
                                {/* Card Header */}
                                <div className="bg-gradient-to-br from-accent/10 to-transparent p-6 flex flex-col items-center text-center border-b border-white/5">
                                    <div className="w-20 h-20 rounded-2xl bg-black/40 border border-white/10 overflow-hidden mb-3 group-hover:scale-105 transition-transform shadow-xl">
                                        {player.passportPhotographUrl ? (
                                            <img src={player.passportPhotographUrl} alt={player.playerName} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <User className="w-8 h-8 text-accent/20" />
                                            </div>
                                        )}
                                    </div>
                                    <h3 className="font-black text-white text-[11px] uppercase tracking-wider leading-tight">{player.playerName}</h3>
                                    <p className="text-[8px] text-white/20 font-bold uppercase tracking-widest mt-1">ID: {player._id.slice(-8).toUpperCase()}</p>
                                    <div className="flex flex-wrap gap-1.5 justify-center mt-2">
                                        <span className={`px-2.5 py-1 text-[8px] font-black rounded-full border uppercase tracking-widest ${player.status === 'Approved' ? 'bg-green-500/10 text-green-400 border-green-500/10' : player.status === 'Pending' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/10' : 'bg-red-500/10 text-red-400 border-red-500/10'}`}>
                                            {player.status}
                                        </span>
                                        {player.transferStatus && player.transferStatus !== 'None' && (
                                            <span className="px-2.5 py-1 text-[8px] font-black rounded-full border uppercase tracking-widest bg-accent/10 text-accent border-accent/10">
                                                On Market
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Card Body */}
                                <div className="p-4 space-y-2">
                                    <div className="flex items-center justify-between">
                                        <span className="text-white/20 text-[9px] uppercase font-black tracking-widest">Position</span>
                                        <span className="text-accent/60 font-black text-[10px] uppercase tracking-widest">{player.playingPosition || 'N/A'}</span>
                                    </div>
                                </div>

                                {/* Card Actions */}
                                <div className="px-4 pb-4 flex items-center gap-2">
                                    <Link href={`/portal/team/players/view/${player._id}`} className="flex-1">
                                        <button className="w-full py-2 bg-white/5 border border-white/5 text-white/40 hover:text-accent hover:border-accent/40 rounded-xl transition-all text-[9px] font-black uppercase tracking-widest flex items-center justify-center gap-1">
                                            <Eye size={12} /> View
                                        </button>
                                    </Link>
                                    {player.transferStatus !== 'OnMarket' ? (
                                        <button
                                            onClick={() => handleListOnMarket(player._id, player.playerName)}
                                            disabled={isActionLoading || !['Approved', 'Verified'].includes(player.status)}
                                            className="p-2 bg-white/5 border border-white/5 text-white/40 hover:text-orange-400 hover:border-orange-400/40 rounded-xl transition-all disabled:opacity-10"
                                            title="List on Market"
                                        >
                                            <Trophy size={14} />
                                        </button>
                                    ) : null}
                                    <button
                                        onClick={() => handleRelease(player._id, player.playerName)}
                                        disabled={isActionLoading || !['Approved', 'Verified'].includes(player.status)}
                                        className="p-2 bg-red-500/10 border border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-all disabled:opacity-10"
                                        title="Release Player"
                                    >
                                        <UserMinus size={14} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
