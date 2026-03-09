"use client";

import { useState, useEffect } from "react";
import { Users, Search, Loader2, User, Trophy, LayoutGrid, DollarSign, Handshake } from "lucide-react";
import Link from "next/link";
import userApi from "@/lib/api";
import toast from "react-hot-toast";

export default function PlayerMarketPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [players, setPlayers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isActionLoading, setIsActionLoading] = useState(false);

    useEffect(() => {
        const fetchMarket = async () => {
            try {
                const res = await userApi.get('/players/market');
                setPlayers(res.data);
            } catch (error) {
                toast.error("Failed to load player market");
            } finally {
                setLoading(false);
            }
        };
        fetchMarket();
    }, []);

    const filteredPlayers = players.filter(player =>
        player.playerName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        player.playingPosition?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSignPlayer = async (id: string, name: string) => {
        if (!confirm(`Do you want to sign ${name} as a Free Agent?`)) return;

        setIsActionLoading(true);
        try {
            await userApi.post(`/players/${id}/sign`);
            setPlayers(players.filter(p => p._id !== id));
            toast.success(`Congratulations! ${name} is now part of your squad.`);
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to sign player.");
        } finally {
            setIsActionLoading(false);
        }
    };

    const handleNegotiate = async (id: string, name: string) => {
        const amount = prompt(`Enter your transfer offer for ${name} (in NGN):`, "10000");
        if (!amount) return;

        const offerAmount = parseInt(amount);
        if (isNaN(offerAmount)) {
            toast.error("Invalid amount");
            return;
        }

        setIsActionLoading(true);
        try {
            await userApi.post('/negotiations', {
                playerId: id,
                offerAmount,
                message: `Transfer offer from ${userApi.defaults.headers.common['Authorization'] ? 'Our Club' : 'a Club'}`
            });
            toast.success(`Transfer offer sent for ${name}. Waiting for approval.`);
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to send offer.");
        } finally {
            setIsActionLoading(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                        <Handshake className="text-accent" />
                        Transfer Market
                    </h1>
                    <p className="text-gray-400">Discover and sign players from across the state.</p>
                </div>
            </div>

            <div className="bg-white/5 border border-white/5 rounded-2xl overflow-hidden flex flex-col">
                <div className="p-4 border-b border-white/5 flex items-center gap-4">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by name, position or club..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                    {loading ? (
                        <div className="col-span-full py-20 text-center">
                            <Loader2 className="w-10 h-10 mx-auto mb-3 animate-spin text-accent" />
                            <p className="text-gray-500">Scanning the market for talent...</p>
                        </div>
                    ) : filteredPlayers.length === 0 ? (
                        <div className="col-span-full py-20 text-center">
                            <LayoutGrid className="w-16 h-16 mx-auto mb-4 opacity-10 text-white" />
                            <p className="text-gray-500">The transfer market is quiet right now.</p>
                        </div>
                    ) : (
                        filteredPlayers.map((player) => (
                            <div key={player._id} className="bg-[#111111] border border-white/5 rounded-2xl p-6 hover:border-accent/30 transition-all group shadow-xl">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-16 h-16 rounded-2xl bg-surface-dark border border-white/10 overflow-hidden shrink-0">
                                        {player.passportPhotographUrl ? (
                                            <img src={player.passportPhotographUrl} alt={player.playerName} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-white/5">
                                                <User className="text-gray-600" />
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white text-lg leading-tight uppercase">{player.playerName}</h3>
                                        <p className="text-accent text-xs font-bold tracking-widest mt-1">{player.playingPosition.toUpperCase()}</p>
                                    </div>
                                </div>

                                <div className="space-y-4 mb-6">
                                    <div className="flex justify-between text-sm py-2 border-b border-white/5">
                                        <span className="text-gray-500">Nationality</span>
                                        <span className="text-gray-300 font-medium">{player.nationality}</span>
                                    </div>
                                    <div className="flex justify-between text-sm py-2 border-b border-white/5">
                                        <span className="text-gray-500">Club</span>
                                        <span className="text-gray-300 font-medium">{player.currentClubName || 'None'}</span>
                                    </div>
                                    <div className="flex justify-between text-sm py-2">
                                        <span className="text-gray-500 font-bold">Market Value</span>
                                        <span className="text-accent font-black">
                                            {player.transferStatus === 'Released' ? 'FREE' : `₦${player.marketValue?.toLocaleString()}`}
                                        </span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <Link href={`/portal/team/players/view/${player._id}`} className="col-span-2">
                                        <button className="w-full py-2.5 rounded-xl border border-white/10 text-gray-400 font-bold text-xs hover:text-white hover:bg-white/5 transition-all">
                                            VIEW SCOUTING REPORT
                                        </button>
                                    </Link>

                                    {player.transferStatus === 'Released' ? (
                                        <button
                                            onClick={() => handleSignPlayer(player._id, player.playerName)}
                                            disabled={isActionLoading}
                                            className="col-span-2 bg-accent text-primary-dark font-black py-3 rounded-xl flex items-center justify-center gap-2 hover:-translate-y-1 transition-all shadow-lg shadow-accent/20 disabled:opacity-50"
                                        >
                                            <Handshake size={20} />
                                            SIGN AS FREE AGENT
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => handleNegotiate(player._id, player.playerName)}
                                            disabled={isActionLoading}
                                            className="col-span-2 bg-blue-500 text-white font-black py-3 rounded-xl flex items-center justify-center gap-2 hover:-translate-y-1 transition-all shadow-lg shadow-blue-500/20 disabled:opacity-50"
                                        >
                                            <DollarSign size={20} />
                                            OPEN NEGOTIATION
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
