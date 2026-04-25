"use client";

import { useState, useEffect } from "react";
import { Users, Plus, Search, MoreVertical, Edit, Trash2, Loader2, User, Eye, UserMinus, Trophy } from "lucide-react";
import Link from "next/link";
import userApi from "@/lib/api";
import toast from "react-hot-toast";

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
                        Register New Player
                    </button>
                </Link>
            </div>

            {/* Content Card */}
            <div className="bg-[#0a0f0d]/40 backdrop-blur-3xl border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
                {/* Search Bar */}
                <div className="p-8 border-b border-white/5 bg-white/5 flex flex-col md:flex-row items-center gap-6">
                    <div className="relative flex-1 w-full">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-accent/40" />
                        <input
                            type="text"
                            placeholder="SEARCH BY NAME OR POSITION..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-14 pr-6 py-5 bg-black/40 border border-white/5 rounded-2xl text-white text-[10px] uppercase font-black tracking-widest focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent/40 transition-all placeholder:text-white/10"
                        />
                    </div>
                </div>

                {/* Table Section */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left whitespace-nowrap">
                        <thead className="bg-white/5 text-[9px] font-black text-white/20 uppercase tracking-[0.3em]">
                            <tr>
                                <th className="px-10 py-6">Player</th>
                                <th className="px-10 py-6">Position</th>
                                <th className="px-10 py-6">Status</th>
                                <th className="px-10 py-6 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {loading ? (
                                <tr>
                                    <td colSpan={4} className="px-10 py-32 text-center">
                                        <Loader2 className="w-12 h-12 mx-auto mb-6 animate-spin text-accent/20" />
                                        <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">Synchronizing Registry...</p>
                                    </td>
                                </tr>
                            ) : filteredPlayers.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-10 py-32 text-center text-gray-500">
                                        <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-6">
                                            <Users className="w-10 h-10 opacity-10" />
                                        </div>
                                        <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">No Players Found</p>
                                    </td>
                                </tr>
                            ) : (
                                filteredPlayers.map((player) => (
                                    <tr key={player._id} className="group hover:bg-white/[0.03] transition-colors relative">
                                        <td className="px-10 py-6">
                                            <div className="flex items-center gap-6">
                                                <div className="w-14 h-14 rounded-2xl bg-black/40 border border-white/5 flex items-center justify-center font-black text-gray-300 overflow-hidden shrink-0 group-hover:scale-105 transition-transform duration-500 relative shadow-xl">
                                                    {player.passportPhotographUrl ? (
                                                        <img src={player.passportPhotographUrl} alt={player.playerName} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <User className="w-6 h-6 text-accent/20" />
                                                    )}
                                                </div>
                                                <div className="space-y-0.5">
                                                    <p className="font-black text-white text-[11px] uppercase tracking-wider">{player.playerName}</p>
                                                    <p className="text-[8px] text-white/20 font-bold uppercase tracking-widest leading-none">ID: {player._id.slice(-8).toUpperCase()}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-10 py-6">
                                            <span className="text-[10px] font-black text-accent/60 uppercase tracking-widest">{player.playingPosition}</span>
                                        </td>
                                        <td className="px-10 py-6">
                                            <div className="flex flex-col gap-2">
                                                <span className={`px-4 py-1.5 text-[8px] font-black rounded-full border w-fit uppercase tracking-widest ${player.status === 'Approved'
                                                    ? 'bg-green-500/10 text-green-400 border-green-500/10'
                                                    : player.status === 'Verified'
                                                        ? 'bg-blue-500/10 text-blue-400 border-blue-500/10'
                                                        : player.status === 'Pending'
                                                            ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/10'
                                                            : 'bg-red-500/10 text-red-400 border-red-500/10'
                                                    }`}>
                                                    {player.status}
                                                </span>
                                                {player.transferStatus && player.transferStatus !== 'None' && (
                                                    <span className={`px-4 py-1.5 text-[8px] font-black rounded-full border w-fit uppercase tracking-widest ${player.transferStatus === 'OnMarket'
                                                        ? 'bg-accent/10 text-accent border-accent/10'
                                                        : 'bg-purple-500/10 text-purple-400 border-purple-500/10'
                                                        }`}>
                                                        On Market
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-10 py-6 text-right">
                                            <div className="flex items-center justify-end gap-3 translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                                                <Link href={`/portal/team/players/view/${player._id}`}>
                                                    <button className="p-3 bg-white/5 border border-white/5 text-white/40 hover:text-accent hover:border-accent/40 rounded-xl transition-all" title="View Profile">
                                                        <Eye size={16} />
                                                    </button>
                                                </Link>
                                                <Link href={`/portal/team/players/edit/${player._id}`}>
                                                    <button className="p-3 bg-white/5 border border-white/5 text-white/40 hover:text-white hover:border-white/20 rounded-xl transition-all" title="Edit Player">
                                                        <Edit size={16} />
                                                    </button>
                                                </Link>

                                                {player.transferStatus !== 'OnMarket' ? (
                                                    <button
                                                        onClick={() => handleListOnMarket(player._id, player.playerName)}
                                                        disabled={isActionLoading || !['Approved', 'Verified'].includes(player.status)}
                                                        className="p-3 bg-white/5 border border-white/5 text-white/40 hover:text-orange-400 hover:border-orange-400/40 rounded-xl transition-all disabled:opacity-10"
                                                        title={['Approved', 'Verified'].includes(player.status) ? "List on Market" : "Pending Approval"}
                                                    >
                                                        <Trophy size={16} />
                                                    </button>
                                                ) : (
                                                    <div className="px-4 py-2.5 bg-accent/10 border border-accent/20 text-accent text-[8px] font-black rounded-xl uppercase tracking-[0.2em]">
                                                        ON MARKET
                                                    </div>
                                                )}

                                                <button
                                                    onClick={() => handleRelease(player._id, player.playerName)}
                                                    disabled={isActionLoading || !['Approved', 'Verified'].includes(player.status)}
                                                    className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-all disabled:opacity-10"
                                                    title={['Approved', 'Verified'].includes(player.status) ? "Release Player" : "Pending Approval"}
                                                >
                                                    <UserMinus size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
