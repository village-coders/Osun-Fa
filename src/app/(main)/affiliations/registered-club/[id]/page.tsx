"use client";

import { useEffect, useState } from "react";
import userApi from "@/lib/api";
import { useParams, useRouter } from "next/navigation";
import { ShieldCheck, MapPin, Building2, UserCog, CalendarDays, ArrowLeft, User } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

export default function ClubDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const [club, setClub] = useState<any>(null);
    const [players, setPlayers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchClubData = async () => {
            try {
                if (!params.id) return;
                const clubRes = await userApi.get(`/clubs/public/${params.id}`);
                const clubData = clubRes.data;
                setClub(clubData);

                const playersRes = await userApi.get(`/players/public/club/${clubData._id}`);
                setPlayers(playersRes.data);
            } catch (error) {
                console.error("Failed to fetch club data:", error);
                toast.error("Failed to load club details");
                router.push("/affiliations/registered-club");
            } finally {
                setLoading(false);
            }
        };

        fetchClubData();
    }, [params.id, router]);

    if (loading) {
        return (
            <div className="bg-surface-light min-h-screen pt-20 md:pt-28 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!club) {
        return null;
    }

    return (
        <div className="bg-surface-light min-h-screen pt-20 md:pt-28 pb-20">
            {/* Club Header Section */}
            <div className="bg-primary-dark py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
                <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-primary rounded-full mix-blend-screen filter blur-[120px] opacity-30"></div>
                
                {/* Back Button */}
                <div className="max-w-7xl mx-auto relative z-20 mb-8">
                    <button 
                        onClick={() => router.back()}
                        className="text-white/70 hover:text-white flex items-center gap-2 transition-colors text-sm font-medium"
                    >
                        <ArrowLeft className="w-4 h-4" /> Back to Clubs
                    </button>
                </div>

                <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row items-center gap-8">
                    
                    <div className="w-32 h-32 md:w-40 md:h-40 rounded-3xl bg-white flex items-center justify-center shrink-0 overflow-hidden border-4 border-white shadow-2xl mt-8 md:mt-0">
                        {club.clubLogoUrl ? (
                            <img src={club.clubLogoUrl} alt={club.clubName || club.name} className="w-full h-full object-cover" />
                        ) : (
                            <Building2 className="w-16 h-16 text-primary" />
                        )}
                    </div>
                    
                    <div className="text-center md:text-left flex-1 mt-4 md:mt-0">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/20 text-green-300 text-xs font-bold uppercase tracking-widest border border-green-500/30 mb-4">
                            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                            Verified Club
                        </div>
                        <h1 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight">
                            {club.clubName || club.name}
                        </h1>
                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-gray-300 font-medium">
                            <div className="flex items-center gap-2">
                                <MapPin className="w-5 h-5 text-secondary" />
                                {club.lga ? `${club.lga}, Osun` : "Osun State, Nigeria"}
                            </div>
                            <div className="flex items-center gap-2">
                                <ShieldCheck className="w-5 h-5 text-secondary" />
                                {club.clubCategory || "Standard Category"}
                            </div>
                            {club.yearFounded && (
                                <div className="flex items-center gap-2">
                                    <CalendarDays className="w-5 h-5 text-secondary" />
                                    Est. {club.yearFounded}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Club Details & Players */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20 space-y-12">
                {/* Info Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                            <UserCog className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Team Manager</p>
                            <p className="text-gray-900 font-bold text-lg">{club.teamManagerName || "Not Specified"}</p>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent shrink-0">
                            <User className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Head Coach</p>
                            <p className="text-gray-900 font-bold text-lg">{club.headCoachName || "Not Specified"}</p>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary shrink-0">
                            <MapPin className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Home Ground</p>
                            <p className="text-gray-900 font-bold text-lg">{club.homeGround || "Not Specified"}</p>
                        </div>
                    </div>
                </div>

                {/* Players Section */}
                <div>
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tight">Registered Players</h2>
                            <p className="text-gray-500 font-medium">Official squad roster for the current season.</p>
                        </div>
                        <div className="px-4 py-2 bg-gray-100 rounded-lg font-bold text-gray-600">
                            {players.length} Players
                        </div>
                    </div>

                    {players.length === 0 ? (
                        <div className="text-center py-16 bg-white rounded-3xl border border-gray-100 shadow-sm">
                            <User className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-gray-900 mb-2">No Players Registered</h3>
                            <p className="text-gray-500 max-w-md mx-auto">This club hasn't registered any approved players on the platform yet.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {players.map((player) => (
                                <div key={player._id} className="bg-white rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                                    <div className="aspect-[4/5] w-full bg-gray-100 relative overflow-hidden">
                                        {player.passportPhotographUrl ? (
                                            <img src={player.passportPhotographUrl} alt={player.playerName} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-300">
                                                <User className="w-16 h-16" />
                                            </div>
                                        )}
                                        {player.jerseyNumber && (
                                            <div className="absolute top-4 right-4 w-10 h-10 bg-black/80 backdrop-blur-md rounded-full flex items-center justify-center text-white font-black text-lg border border-white/20 shadow-lg">
                                                {player.jerseyNumber}
                                            </div>
                                        )}
                                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent pt-12">
                                            <p className="text-secondary text-xs font-bold uppercase tracking-widest mb-1">{player.playingPosition || "Position N/A"}</p>
                                            <h3 className="text-white font-bold text-xl leading-tight">{player.playerName || `${player.surname} ${player.firstName}`}</h3>
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
