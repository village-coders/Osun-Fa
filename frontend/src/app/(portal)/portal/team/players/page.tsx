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
        <div className="max-w-6xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">My Players</h1>
                    <p className="text-gray-400">Manage your club roster and player registrations.</p>
                </div>
                {/* The link to a new portal-side registration form allows teams to self-register players */}
                <Link href="/portal/team/players/new">
                    <button className="bg-accent text-primary-dark font-bold px-4 py-2.5 rounded-xl flex items-center gap-2 hover:-translate-y-1 transition-transform shadow-[0_0_15px_rgba(0,255,136,0.2)]">
                        <Plus size={20} />
                        Register New Player
                    </button>
                </Link>
            </div>

            <div className="bg-white/5 border border-white/5 rounded-2xl overflow-hidden flex flex-col">
                <div className="p-4 border-b border-white/5 flex items-center gap-4">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search players by name or position..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto w-full">
                    <table className="w-full text-left whitespace-nowrap">
                        <thead className="bg-white/5 border-b border-white/5 text-gray-400 text-sm font-semibold uppercase tracking-wider">
                            <tr>
                                <th className="px-6 py-4">Player</th>
                                <th className="px-6 py-4">Position</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {loading ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                                        <Loader2 className="w-8 h-8 mx-auto mb-3 animate-spin text-accent" />
                                        <p>Loading your roster...</p>
                                    </td>
                                </tr>
                            ) : filteredPlayers.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                                        <Users className="w-12 h-12 mx-auto mb-3 opacity-20" />
                                        <p>No players found matching your criteria.</p>
                                    </td>
                                </tr>
                            ) : (
                                filteredPlayers.map((player) => (
                                    <tr key={player._id} className="hover:bg-white/5 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-surface-dark border border-white/10 flex items-center justify-center font-bold text-gray-300 overflow-hidden shrink-0">
                                                    {player.passportPhotographUrl ? (
                                                        <img src={player.passportPhotographUrl} alt={player.playerName} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <User className="w-5 h-5 opacity-50" />
                                                    )}
                                                </div>
                                                <span className="font-bold text-white truncate max-w-[200px]">{player.playerName}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-300">{player.playingPosition}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col gap-1">
                                                <span className={`px-3 py-1 text-[10px] font-bold rounded-full border w-fit ${player.status === 'Approved'
                                                    ? 'bg-green-500/10 text-green-400 border-green-500/20'
                                                    : player.status === 'Pending'
                                                        ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                                                        : 'bg-red-500/10 text-red-400 border-red-500/20'
                                                    }`}>
                                                    {player.status.toUpperCase()}
                                                </span>
                                                {player.transferStatus && player.transferStatus !== 'None' && (
                                                    <span className={`px-3 py-1 text-[10px] font-bold rounded-full border w-fit ${player.transferStatus === 'OnMarket'
                                                        ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                                                        : 'bg-purple-500/10 text-purple-400 border-purple-500/20'
                                                        }`}>
                                                        {player.transferStatus.toUpperCase()}
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link href={`/portal/team/players/view/${player._id}`}>
                                                    <button className="p-2 text-gray-400 hover:text-accent hover:bg-accent/10 rounded-lg transition-colors" title="View Profile">
                                                        <Eye size={18} />
                                                    </button>
                                                </Link>
                                                <Link href={`/portal/team/players/edit/${player._id}`}>
                                                    <button className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors" title="Edit Player">
                                                        <Edit size={18} />
                                                    </button>
                                                </Link>

                                                {player.transferStatus !== 'OnMarket' ? (
                                                    <button
                                                        onClick={() => handleListOnMarket(player._id, player.playerName)}
                                                        className="p-2 text-gray-400 hover:text-yellow-400 hover:bg-yellow-400/10 rounded-lg transition-colors"
                                                        title="List on Market"
                                                    >
                                                        <Trophy size={18} />
                                                    </button>
                                                ) : (
                                                    <div className="px-2 py-1 bg-yellow-500/10 text-yellow-500 text-[10px] font-bold rounded border border-yellow-500/20">
                                                        ON MARKET
                                                    </div>
                                                )}

                                                <button
                                                    onClick={() => handleRelease(player._id, player.playerName)}
                                                    disabled={isActionLoading}
                                                    className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors disabled:opacity-50"
                                                    title="Release as Free Agent"
                                                >
                                                    <UserMinus size={18} />
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
