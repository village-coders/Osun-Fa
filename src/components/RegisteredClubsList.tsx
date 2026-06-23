"use client";

import { useEffect, useState } from "react";
import userApi from "@/lib/api";
import { ShieldCheck, MapPin, Building2, UserCog, CalendarDays } from "lucide-react";
import Link from "next/link";

export default function RegisteredClubsList() {
    const [clubs, setClubs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchClubs = async () => {
            try {
                const res = await userApi.get("/clubs/public");
                // Filter for Approved/Verified clubs only, assuming 'Approved' or 'Verified' are the statuses
                const approvedClubs = res.data.filter((c: any) => c.status === 'Approved' || c.status === 'Verified');
                setClubs(approvedClubs);
            } catch (error) {
                console.error("Failed to fetch registered clubs:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchClubs();
    }, []);

    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xl animate-pulse h-64"></div>
                ))}
            </div>
        );
    }

    if (clubs.length === 0) {
        return (
             <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-xl">
                 <ShieldCheck className="w-16 h-16 text-gray-200 mx-auto mb-6" />
                 <h3 className="text-2xl font-black text-gray-900 mb-2 uppercase tracking-tight">No Registered Clubs Found</h3>
                 <p className="text-gray-500 font-medium max-w-md mx-auto">There are currently no officially registered and verified clubs to display. Please check back later.</p>
             </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {clubs.map((club) => (
                <Link href={`/affiliations/registered-club/${club.slug || club._id}`} key={club._id} className="bg-white rounded-3xl border border-gray-100 shadow-xl hover:shadow-2xl transition-all duration-500 group overflow-hidden flex flex-col relative hover:-translate-y-2 cursor-pointer">
                    <div className="h-24 bg-linear-to-r from-primary-dark via-primary to-accent relative">
                        <div className="absolute inset-0 opacity-20 bg-[url('/pattern.svg')]"></div>
                    </div>
                    
                    <div className="px-6 pb-6 pt-0 flex-1 flex flex-col relative z-10">
                        <div className="flex justify-between items-start -mt-10 mb-4">
                            <div className="w-20 h-20 rounded-2xl bg-white flex items-center justify-center shrink-0 overflow-hidden border-4 border-white shadow-lg relative group-hover:scale-105 transition-transform duration-500">
                                {club.clubLogoUrl ? (
                                    <img src={club.clubLogoUrl} alt={club.clubName || club.name} className="w-full h-full object-cover" />
                                ) : (
                                    <Building2 className="w-8 h-8 text-primary" />
                                )}
                            </div>
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-50 text-green-700 text-[10px] font-black uppercase tracking-widest shadow-sm mt-12 border border-green-100">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                                Verified
                            </span>
                        </div>

                        <div>
                            <h3 className="font-black text-gray-900 text-xl group-hover:text-primary transition-colors tracking-tight mb-2 leading-tight">
                                {club.clubName || club.name}
                            </h3>
                            <div className="flex items-center gap-2 text-sm text-gray-500 font-medium mb-6">
                                <MapPin className="w-4 h-4 text-primary" />
                                {club.lga ? `${club.lga}, Osun` : "Osun State, Nigeria"}
                            </div>
                        </div>
                        
                        <div className="space-y-3 mt-auto">
                            <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50/80 border border-gray-100">
                                <span className="text-gray-500 flex items-center gap-2 text-xs font-bold uppercase tracking-wider"><ShieldCheck className="w-4 h-4 text-gray-400"/> Category</span>
                                <span className="font-black text-gray-900 text-sm">{club.clubCategory || "Standard"}</span>
                            </div>
                            <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50/80 border border-gray-100">
                                <span className="text-gray-500 flex items-center gap-2 text-xs font-bold uppercase tracking-wider"><UserCog className="w-4 h-4 text-gray-400"/> Manager</span>
                                <span className="font-black text-gray-900 text-sm truncate max-w-[120px] text-right" title={club.teamManagerName || "N/A"}>{club.teamManagerName || "N/A"}</span>
                            </div>
                            <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50/80 border border-gray-100">
                                <span className="text-gray-500 flex items-center gap-2 text-xs font-bold uppercase tracking-wider"><CalendarDays className="w-4 h-4 text-gray-400"/> Year Founded</span>
                                <span className="font-black text-gray-900 text-sm">{club.yearFounded || "N/A"}</span>
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}
