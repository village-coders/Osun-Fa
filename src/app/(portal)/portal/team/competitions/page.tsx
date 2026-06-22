"use client";

import { useState, useEffect } from "react";
import { Trophy, Calendar, CheckCircle2, AlertCircle, Users } from "lucide-react";
import api from "@/lib/api";
import toast from "react-hot-toast";

export default function CompetitionsPage() {
    const [competitions, setCompetitions] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCompetitions = async () => {
            try {
                const res = await api.get('/competitions');
                setCompetitions(res.data);
            } catch (error) {
                console.error(error);
                toast.error("Failed to load competitions");
            } finally {
                setLoading(false);
            }
        };
        fetchCompetitions();
    }, []);

    const handleEnroll = async (id: string, registrationLink?: string) => {
        if (registrationLink) {
            window.open(registrationLink, '_blank');
            return;
        }
        
        toast.error("Enrollment is temporarily disabled via platform", { icon: "ℹ️" });
        // NOTE: Functionality intentionally disabled per user request
        /*
        try {
            await api.post(`/competitions/${id}/enroll`);
            toast.success("Successfully enrolled!");
            // Refresh or update state to show enrolled
            const res = await api.get('/competitions');
            setCompetitions(res.data);
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to enroll");
        }
        */
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center py-32">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto space-y-8">
            <div className="space-y-1">
                <span className="text-accent font-black uppercase text-[10px] tracking-[0.4em] mb-2 block">— REGISTRATION —</span>
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase leading-none">Osun FA <span className="text-accent">Competitions</span></h1>
                <p className="text-gray-400 font-medium max-w-xl mt-4">Browse and enroll your club in upcoming official Osun State Football Association tournaments and leagues.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
                {competitions.length === 0 ? (
                    <div className="col-span-full py-16 text-center bg-white/5 border border-white/5 rounded-3xl">
                        <Trophy className="w-16 h-16 text-white/20 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-white mb-2">No Competitions Found</h3>
                        <p className="text-gray-400">There are currently no active or upcoming competitions listed.</p>
                    </div>
                ) : (
                    competitions.map((comp) => (
                        <div key={comp._id} className="bg-white/5 border border-white/5 rounded-3xl overflow-hidden group hover:border-accent/30 transition-all duration-500 shadow-2xl relative flex flex-col">
                            {/* Header / Logo */}
                            <div className="h-40 bg-gradient-to-br from-primary-dark to-black relative flex items-center justify-center border-b border-white/5">
                                {comp.logoUrl ? (
                                    <img src={comp.logoUrl} alt={comp.name} className="h-full w-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                                ) : (
                                    <Trophy className="w-20 h-20 text-white/10 group-hover:text-white/20 transition-colors" />
                                )}
                                <div className="absolute top-4 right-4 flex gap-2">
                                    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                                        comp.registrationStatus === 'open' 
                                        ? 'bg-accent text-primary-dark shadow-[0_0_15px_rgba(0,255,136,0.3)]' 
                                        : 'bg-white/10 text-white/60'
                                    }`}>
                                        Registration {comp.registrationStatus}
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6 flex-1 flex flex-col">
                                <div className="mb-4 flex-1">
                                    <span className="text-accent/60 text-[9px] font-black uppercase tracking-[0.2em]">{comp.season} Season</span>
                                    <h3 className="text-xl font-black text-white mt-1 leading-tight">{comp.name}</h3>
                                    <p className="text-gray-400 text-sm mt-3 line-clamp-3">{comp.description || 'No description provided.'}</p>
                                </div>

                                <div className="space-y-3 mb-6 bg-black/20 p-4 rounded-2xl">
                                    <div className="flex items-center gap-3 text-sm text-gray-300">
                                        <Calendar className="w-4 h-4 text-accent/60" />
                                        <span>Starts: {new Date(comp.startDate).toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-gray-300">
                                        <Users className="w-4 h-4 text-accent/60" />
                                        <span>{comp.enrolledClubs?.length || 0} Clubs Enrolled</span>
                                    </div>
                                </div>

                                {/* Action */}
                                <button
                                    onClick={() => handleEnroll(comp._id, comp.registrationLink)}
                                    disabled={comp.registrationStatus !== 'open'}
                                    className={`w-full py-4 rounded-xl font-black text-[11px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-all ${
                                        comp.registrationStatus === 'open'
                                        ? 'bg-accent text-primary-dark hover:bg-white hover:text-primary shadow-[0_0_20px_rgba(0,255,136,0.2)]'
                                        : 'bg-white/5 text-white/40 cursor-not-allowed'
                                    }`}
                                >
                                    {comp.registrationStatus === 'open' ? 'Enroll Club' : 'Registration Closed'}
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
