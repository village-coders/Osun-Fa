"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Save, Loader2, Calendar } from "lucide-react";
import api from "@/lib/api";
import toast from "react-hot-toast";

function MatchFormContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const isEditing = !!id;

    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [competitions, setCompetitions] = useState<any[]>([]);

    const [formData, setFormData] = useState({
        homeTeam: "",
        awayTeam: "",
        competition: "",
        homeScore: 0,
        awayScore: 0,
        matchDate: "",
        venue: "",
        status: "scheduled",
    });

    useEffect(() => {
        const loadInitialData = async () => {
            try {
                // Fetch competitions for the dropdown
                const compsRes = await api.get('/competitions');
                setCompetitions(compsRes.data);

                if (isEditing) {
                    const matchRes = await api.get(`/matches/${id}`);
                    const match = matchRes.data;
                    setFormData({
                        homeTeam: match.homeTeam || "",
                        awayTeam: match.awayTeam || "",
                        competition: match.competition?._id || match.competition || "",
                        homeScore: match.homeScore || 0,
                        awayScore: match.awayScore || 0,
                        matchDate: match.matchDate ? new Date(match.matchDate).toISOString().split('T')[0] : "",
                        venue: match.venue || "",
                        status: match.status || "scheduled",
                    });
                } else if (compsRes.data.length > 0) {
                    // Set default competition if none selected
                    setFormData(prev => ({ ...prev, competition: compsRes.data[0]._id }));
                }
            } catch (error) {
                toast.error("Failed to load data");
            } finally {
                setLoading(false);
            }
        };

        loadInitialData();
    }, [id, isEditing]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            if (isEditing) {
                await api.put(`/matches/${id}`, formData);
                toast.success("Match updated successfully");
            } else {
                await api.post("/matches", formData);
                toast.success("Match scheduled successfully");
            }
            router.push("/admin/matches");
        } catch (error) {
            toast.error(isEditing ? "Failed to update match" : "Failed to scheduled match");
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center gap-4">
                <button
                    onClick={() => router.push("/admin/matches")}
                    className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5 text-gray-600" />
                </button>
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                        {isEditing ? "Edit Match" : "Schedule New Match"}
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                        {isEditing ? "Update score and match details." : "Create a new fixture for a competition."}
                    </p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 md:p-8 space-y-6">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Competition */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Competition *</label>
                            <select
                                name="competition"
                                required
                                value={formData.competition}
                                onChange={handleChange}
                                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                            >
                                <option value="" disabled>Select a competition...</option>
                                {competitions.map((comp) => (
                                    <option key={comp._id} value={comp._id}>{comp.proposedName}</option>
                                ))}
                            </select>
                        </div>

                        {/* Home Team */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Home Team *</label>
                            <input
                                type="text"
                                name="homeTeam"
                                required
                                value={formData.homeTeam}
                                onChange={handleChange}
                                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                placeholder="E.g. Osun United"
                            />
                        </div>

                        {/* Away Team */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Away Team *</label>
                            <input
                                type="text"
                                name="awayTeam"
                                required
                                value={formData.awayTeam}
                                onChange={handleChange}
                                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                placeholder="E.g. Ilesa Dynamos"
                            />
                        </div>

                        {/* Home Score */}
                        {isEditing && (
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Home Score</label>
                                <input
                                    type="number"
                                    name="homeScore"
                                    min="0"
                                    value={formData.homeScore}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                />
                            </div>
                        )}

                        {/* Away Score */}
                        {isEditing && (
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Away Score</label>
                                <input
                                    type="number"
                                    name="awayScore"
                                    min="0"
                                    value={formData.awayScore}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                />
                            </div>
                        )}

                        {/* Match Date */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    Match Date *
                                </div>
                            </label>
                            <input
                                type="date"
                                name="matchDate"
                                required
                                value={formData.matchDate}
                                onChange={handleChange}
                                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                            />
                        </div>

                        {/* Venue */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Venue *</label>
                            <input
                                type="text"
                                name="venue"
                                required
                                value={formData.venue}
                                onChange={handleChange}
                                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                placeholder="E.g. Osogbo City Stadium"
                            />
                        </div>

                        {/* Status */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                            >
                                <option value="scheduled">Scheduled</option>
                                <option value="live">Live</option>
                                <option value="completed">Completed</option>
                                <option value="postponed">Postponed</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-end gap-3">
                    <button
                        type="button"
                        onClick={() => router.push("/admin/matches")}
                        className="px-5 py-2.5 text-sm font-semibold text-gray-600 hover:text-gray-800 transition-colors"
                        disabled={submitting}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={submitting}
                        className="bg-primary hover:bg-primary-dark text-white font-bold py-2.5 px-6 rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50"
                    >
                        {submitting ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <Save className="w-5 h-5" />
                        )}
                        {isEditing ? "Save Changes" : "Schedule Match"}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default function MatchFormPage() {
    return (
        <Suspense fallback={<div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>}>
            <MatchFormContent />
        </Suspense>
    );
}
