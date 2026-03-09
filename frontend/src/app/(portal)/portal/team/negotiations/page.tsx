"use client";

import { useState, useEffect } from "react";
import { MessageSquare, Check, X, Loader2, User, Clock, ArrowRight } from "lucide-react";
import userApi from "@/lib/api";
import toast from "react-hot-toast";

export default function NegotiationsPage() {
    const [incoming, setIncoming] = useState<any[]>([]);
    const [outgoing, setOutgoing] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isActionLoading, setIsActionLoading] = useState(false);

    useEffect(() => {
        const fetchNegotiations = async () => {
            try {
                const [incRes, outRes] = await Promise.all([
                    userApi.get('/negotiations/incoming'),
                    userApi.get('/negotiations/outgoing')
                ]);
                setIncoming(incRes.data);
                setOutgoing(outRes.data);
            } catch (error) {
                toast.error("Failed to load negotiations");
            } finally {
                setLoading(false);
            }
        };
        fetchNegotiations();
    }, []);

    const handleResponse = async (id: string, status: 'Accepted' | 'Rejected') => {
        if (!confirm(`Are you sure you want to ${status.toLowerCase()} this offer?`)) return;

        setIsActionLoading(true);
        try {
            await userApi.put(`/negotiations/${id}/respond`, { status });
            setIncoming(incoming.map(n => n._id === id ? { ...n, status: status === 'Accepted' ? 'Completed' : 'Rejected' } : n));
            toast.success(`Offer ${status.toLowerCase()} successfully.`);
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to process offer.");
        } finally {
            setIsActionLoading(false);
        }
    };

    const StatusBadge = ({ status }: { status: string }) => {
        const colors: any = {
            'Pending': 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
            'Accepted': 'bg-blue-500/10 text-blue-500 border-blue-500/20',
            'Rejected': 'bg-red-500/10 text-red-500 border-red-500/20',
            'Completed': 'bg-green-500/10 text-green-400 border-green-500/20',
            'Cancelled': 'bg-gray-500/10 text-gray-400 border-gray-500/20',
        };
        return (
            <span className={`px-3 py-1 rounded-full text-[10px] font-bold border ${colors[status] || colors['Pending']}`}>
                {status.toUpperCase()}
            </span>
        );
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px]">
                <Loader2 className="w-10 h-10 animate-spin text-accent mb-4" />
                <p className="text-gray-500">Retrieving negotiation records...</p>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto space-y-12">
            <div>
                <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                    <Handshake className="text-accent" />
                    Negotiations
                </h1>
                <p className="text-gray-400">Track and respond to transfer offers for your players.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Incoming Offers */}
                <div className="space-y-6">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <ArrowRight className="text-accent" />
                        Incoming Offers
                    </h2>

                    {incoming.length === 0 ? (
                        <div className="bg-white/5 border border-white/5 rounded-2xl p-8 text-center text-gray-500 italic">
                            No incoming offers at the moment.
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {incoming.map((neg) => (
                                <div key={neg._id} className="bg-[#111111] border border-white/5 rounded-2xl p-6 space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 overflow-hidden">
                                                <img src={neg.player?.passportPhotographUrl} className="w-full h-full object-cover" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-white">{neg.player?.playerName}</p>
                                                <p className="text-xs text-gray-500 uppercase font-black tracking-widest">FROM: {neg.toClub?.clubName}</p>
                                            </div>
                                        </div>
                                        <StatusBadge status={neg.status} />
                                    </div>

                                    <div className="bg-white/5 p-4 rounded-xl flex items-center justify-between border border-white/5">
                                        <span className="text-gray-400 text-sm font-medium">Offer Amount</span>
                                        <span className="text-accent font-black text-lg">₦{neg.offerAmount.toLocaleString()}</span>
                                    </div>

                                    {neg.status === 'Pending' && (
                                        <div className="grid grid-cols-2 gap-3 pt-2">
                                            <button
                                                onClick={() => handleResponse(neg._id, 'Accepted')}
                                                disabled={isActionLoading}
                                                className="bg-green-500 text-white font-bold py-2.5 rounded-xl flex items-center justify-center gap-2 hover:bg-green-600 transition-all disabled:opacity-50"
                                            >
                                                <Check size={18} />
                                                Accept Offer
                                            </button>
                                            <button
                                                onClick={() => handleResponse(neg._id, 'Rejected')}
                                                disabled={isActionLoading}
                                                className="bg-red-500/10 text-red-500 border border-red-500/20 font-bold py-2.5 rounded-xl flex items-center justify-center gap-2 hover:bg-red-500/20 transition-all disabled:opacity-50"
                                            >
                                                <X size={18} />
                                                Reject
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Outgoing Requests */}
                <div className="space-y-6">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2 opacity-50">
                        Outgoing Requests
                    </h2>

                    {outgoing.length === 0 ? (
                        <div className="bg-white/5 border border-white/5 rounded-2xl p-8 text-center text-gray-500 italic">
                            You haven't made any offers recently.
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {outgoing.map((neg) => (
                                <div key={neg._id} className="bg-white/2 border border-white/2 rounded-2xl p-6 space-y-4 opacity-80 hover:opacity-100 transition-opacity">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 overflow-hidden">
                                                <img src={neg.player?.passportPhotographUrl} className="w-full h-full object-cover" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-white">{neg.player?.playerName}</p>
                                                <p className="text-xs text-gray-500 uppercase font-black tracking-widest">TO: {neg.fromClub?.clubName}</p>
                                            </div>
                                        </div>
                                        <StatusBadge status={neg.status} />
                                    </div>

                                    <div className="flex items-center justify-between p-3 border-t border-white/5">
                                        <div className="flex items-center gap-2 text-gray-500 text-xs uppercase font-bold">
                                            <Clock size={12} />
                                            Your Offer: <span className="text-white">₦{neg.offerAmount.toLocaleString()}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

import { Handshake } from "lucide-react";
