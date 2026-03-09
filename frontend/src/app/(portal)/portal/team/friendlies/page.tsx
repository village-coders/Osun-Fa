"use client";

import { useState, useEffect } from "react";
import { Calendar, Clock, MapPin, Check, X, Loader2, Search, Plus, User, Info, MessageSquare, Save } from "lucide-react";
import userApi from "@/lib/api";
import toast from "react-hot-toast";

export default function FriendlyMatchesPage() {
    const [incoming, setIncoming] = useState<any[]>([]);
    const [outgoing, setOutgoing] = useState<any[]>([]);
    const [clubs, setClubs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isActionLoading, setIsActionLoading] = useState(false);
    const [showProposeModal, setShowProposeModal] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        awayClubId: "",
        matchDate: "",
        matchTime: "",
        venue: "",
        message: ""
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [incRes, outRes, clubsRes] = await Promise.all([
                    userApi.get('/friendlies/incoming'),
                    userApi.get('/friendlies/outgoing'),
                    userApi.get('/friendlies/clubs')
                ]);
                setIncoming(incRes.data);
                setOutgoing(outRes.data);
                setClubs(clubsRes.data);
            } catch (error) {
                toast.error("Failed to load match data");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handlePropose = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.awayClubId || !formData.matchDate || !formData.matchTime || !formData.venue) {
            toast.error("Please fill all required fields");
            return;
        }

        setIsActionLoading(true);
        try {
            const res = await userApi.post('/friendlies', formData);
            setOutgoing([res.data, ...outgoing]);
            setShowProposeModal(false);
            setFormData({ awayClubId: "", matchDate: "", matchTime: "", venue: "", message: "" });
            toast.success("Friendly request sent!");
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to send request");
        } finally {
            setIsActionLoading(false);
        }
    };

    const handleResponse = async (id: string, status: 'Accepted' | 'Rejected') => {
        if (!confirm(`Are you sure you want to ${status.toLowerCase()} this match?`)) return;

        setIsActionLoading(true);
        try {
            await userApi.put(`/friendlies/${id}/respond`, { status });
            setIncoming(incoming.map(f => f._id === id ? { ...f, status } : f));
            toast.success(`Request ${status.toLowerCase()} successfully.`);
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to process request.");
        } finally {
            setIsActionLoading(false);
        }
    };

    const StatusBadge = ({ status }: { status: string }) => {
        const colors: any = {
            'Pending': 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
            'Accepted': 'bg-green-500/10 text-green-500 border-green-500/20',
            'Rejected': 'bg-red-500/10 text-red-500 border-red-500/20',
            'Cancelled': 'bg-gray-500/10 text-gray-400 border-gray-500/20',
            'Completed': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
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
                <Loader2 className="w-10 h-10 animate-spin text-green-500 mb-4" />
                <p className="text-gray-500 font-medium uppercase tracking-widest">Loading Friendlies...</p>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto space-y-12 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-4xl font-black text-white mb-2 flex items-center gap-3">
                        <Calendar className="text-green-500" />
                        Friendly Matches
                    </h1>
                    <p className="text-gray-400 font-medium">Coordinate games with other clubs in the league.</p>
                </div>
                <button
                    onClick={() => setShowProposeModal(true)}
                    className="bg-green-500 text-black font-black px-8 py-4 rounded-2xl flex items-center gap-2 hover:bg-green-400 transition-all shadow-xl shadow-green-500/20"
                >
                    <Plus size={20} />
                    PROPOSE FRIENDLY
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Incoming Requests */}
                <div className="space-y-6">
                    <h2 className="text-xl font-bold text-white flex items-center gap-3">
                        <span className="w-2 h-8 bg-green-500 rounded-full"></span>
                        Invitations Received
                    </h2>

                    {incoming.length === 0 ? (
                        <div className="bg-white/5 border border-white/5 rounded-[32px] p-12 text-center text-gray-500 italic">
                            No incoming invitations yet.
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {incoming.map((f) => (
                                <div key={f._id} className="bg-[#111111] border border-white/5 rounded-[32px] p-6 space-y-6 hover:border-white/10 transition-colors">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-surface-dark border border-white/5 p-1 overflow-hidden">
                                                <img src={f.homeClub?.clubLogoUrl || "/placeholder-club.png"} className="w-full h-full object-contain" />
                                            </div>
                                            <div>
                                                <p className="font-black text-white uppercase tracking-tight">{f.homeClub?.clubName}</p>
                                                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{f.homeClub?.townCity}</p>
                                            </div>
                                        </div>
                                        <StatusBadge status={f.status} />
                                    </div>

                                    <div className="grid grid-cols-3 gap-4 bg-white/5 p-4 rounded-2xl border border-white/5">
                                        <div className="text-center border-r border-white/5">
                                            <p className="text-[9px] text-gray-500 font-black uppercase mb-1">Date</p>
                                            <p className="text-xs font-bold text-white uppercase">{new Date(f.matchDate).toLocaleDateString()}</p>
                                        </div>
                                        <div className="text-center border-r border-white/5">
                                            <p className="text-[9px] text-gray-500 font-black uppercase mb-1">Time</p>
                                            <p className="text-xs font-bold text-white uppercase">{f.matchTime}</p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-[9px] text-gray-500 font-black uppercase mb-1">Venue</p>
                                            <p className="text-xs font-bold text-white uppercase truncate">{f.venue}</p>
                                        </div>
                                    </div>

                                    {f.message && (
                                        <div className="bg-blue-500/5 border border-blue-500/10 p-4 rounded-2xl flex gap-3">
                                            <MessageSquare size={16} className="text-blue-400 shrink-0" />
                                            <p className="text-[11px] text-blue-300 italic font-medium">"{f.message}"</p>
                                        </div>
                                    )}

                                    {f.status === 'Pending' && (
                                        <div className="grid grid-cols-2 gap-4 pt-2">
                                            <button
                                                onClick={() => handleResponse(f._id, 'Accepted')}
                                                disabled={isActionLoading}
                                                className="bg-green-500 text-black font-black py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-green-400 transition-all disabled:opacity-50"
                                            >
                                                <Check size={18} />
                                                ACCEPT
                                            </button>
                                            <button
                                                onClick={() => handleResponse(f._id, 'Rejected')}
                                                disabled={isActionLoading}
                                                className="bg-red-500/10 text-red-500 border border-red-500/20 font-black py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-red-500/20 transition-all disabled:opacity-50"
                                            >
                                                <X size={18} />
                                                DECLINE
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Sent Requests */}
                <div className="space-y-6">
                    <h2 className="text-xl font-bold text-white flex items-center gap-3">
                        <span className="w-2 h-8 bg-blue-500 rounded-full"></span>
                        Invitations Sent
                    </h2>

                    {outgoing.length === 0 ? (
                        <div className="bg-white/5 border border-white/5 rounded-[32px] p-12 text-center text-gray-500 italic">
                            You haven't proposed any friendlies yet.
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {outgoing.map((f) => (
                                <div key={f._id} className="bg-white/2 border border-white/5 rounded-[32px] p-6 space-y-6 opacity-80 hover:opacity-100 transition-all">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-surface-dark border border-white/5 p-1 overflow-hidden opacity-60">
                                                <img src={f.awayClub?.clubLogoUrl || "/placeholder-club.png"} className="w-full h-full object-contain" />
                                            </div>
                                            <div>
                                                <p className="font-black text-white uppercase tracking-tight">{f.awayClub?.clubName}</p>
                                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{f.awayClub?.townCity}</p>
                                            </div>
                                        </div>
                                        <StatusBadge status={f.status} />
                                    </div>

                                    <div className="bg-white/5 p-4 rounded-2xl flex items-center justify-between px-8 border border-white/5">
                                        <div className="flex items-center gap-2">
                                            <Calendar size={14} className="text-gray-500" />
                                            <span className="text-xs font-bold text-white">{new Date(f.matchDate).toLocaleDateString()}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Clock size={14} className="text-gray-500" />
                                            <span className="text-xs font-bold text-white">{f.matchTime}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <MapPin size={14} className="text-gray-500" />
                                            <span className="text-xs font-bold text-white uppercase truncate max-w-[100px]">{f.venue}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Propose Modal */}
            {showProposeModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                    <div className="bg-[#0f0f0f] border border-white/10 w-full max-w-xl rounded-[40px] p-8 space-y-8 animate-in fade-in zoom-in duration-300 shadow-2xl">
                        <div className="flex justify-between items-center">
                            <h3 className="text-2xl font-black text-white uppercase italic tracking-tight">Propose Friendly</h3>
                            <button onClick={() => setShowProposeModal(false)} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                                <X size={24} className="text-gray-400" />
                            </button>
                        </div>

                        <form onSubmit={handlePropose} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest px-1">Select opponent Club</label>
                                <select
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:border-green-500 outline-none transition-all uppercase font-bold text-sm"
                                    value={formData.awayClubId}
                                    onChange={(e) => setFormData({ ...formData, awayClubId: e.target.value })}
                                    required
                                >
                                    <option value="" className="bg-black">Choose a club...</option>
                                    {clubs.map(club => (
                                        <option key={club._id} value={club._id} className="bg-black">
                                            {club.clubName} ({club.townCity})
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest px-1">Date</label>
                                    <input
                                        type="date"
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:border-green-500 outline-none"
                                        value={formData.matchDate}
                                        onChange={(e) => setFormData({ ...formData, matchDate: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest px-1">Time</label>
                                    <input
                                        type="time"
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:border-green-500 outline-none"
                                        value={formData.matchTime}
                                        onChange={(e) => setFormData({ ...formData, matchTime: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest px-1">Venue / Stadium</label>
                                <input
                                    type="text"
                                    placeholder="Enter stadium name..."
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:border-green-500 outline-none placeholder:text-gray-700"
                                    value={formData.venue}
                                    onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest px-1">Message (Optional)</label>
                                <textarea
                                    rows={3}
                                    placeholder="Add a note to your invitation..."
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:border-green-500 outline-none placeholder:text-gray-700 resize-none"
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isActionLoading}
                                className="w-full bg-green-500 text-black font-black py-5 rounded-2xl hover:bg-green-400 transition-all flex items-center justify-center gap-3 disabled:opacity-50 shadow-xl shadow-green-500/10"
                            >
                                {isActionLoading ? <Loader2 className="animate-spin" /> : <Save size={20} />}
                                PROPOSE MATCH
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
