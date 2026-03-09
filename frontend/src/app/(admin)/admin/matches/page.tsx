"use client";

import { Plus, Edit, Trash2, Search, Calendar as CalendarIcon, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import toast from "react-hot-toast";

export default function AdminMatchesPage() {
    const [matches, setMatches] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchMatches = async () => {
            try {
                const res = await api.get('/matches');
                setMatches(res.data);
            } catch (error) {
                toast.error("Failed to load matches");
            } finally {
                setLoading(false);
            }
        };
        fetchMatches();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this match?")) return;
        try {
            await api.delete(`/matches/${id}`);
            setMatches(matches.filter(m => m._id !== id));
            toast.success("Match deleted");
        } catch (error) {
            toast.error("Failed to delete match");
        }
    };

    const filteredMatches = matches.filter(m =>
        m.homeTeam?.clubName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.awayTeam?.clubName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.competition?.proposedName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.venue?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'Upcoming':
                return <span className="px-3 py-1 rounded-full text-xs font-bold bg-yellow-100 text-yellow-800">Upcoming</span>;
            case 'Live':
                return <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700 animate-pulse">Live</span>;
            case 'Completed':
                return <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">Completed</span>;
            case 'Postponed':
                return <span className="px-3 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-700">Postponed</span>;
            default:
                return <span className="px-3 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-700">{status}</span>;
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h2 className="text-2xl font-bold text-gray-800">Match Fixtures & Results</h2>
                <button
                    onClick={() => window.location.href = '/admin/matches/form'}
                    className="bg-primary hover:bg-primary-dark text-white font-bold py-2.5 px-5 rounded-lg flex items-center gap-2 transition-colors shadow-sm"
                >
                    <Plus className="w-5 h-5" />
                    Record New Match
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full">
                <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-4 justify-between bg-gray-50/50">
                    <div className="relative w-full sm:w-96">
                        <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by team, competition, or venue..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                        />
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600 text-sm font-medium transition-colors whitespace-nowrap">
                        <CalendarIcon className="w-4 h-4" />
                        Filter by Date
                    </button>
                </div>

                <div className="overflow-x-auto w-full">
                    <table className="w-full text-left text-sm whitespace-nowrap min-w-[800px]">
                        <thead className="bg-gray-50 text-gray-500 font-semibold border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4">Matchup (Home vs Away)</th>
                                <th className="px-6 py-4">Competition</th>
                                <th className="px-6 py-4">Date & Time</th>
                                <th className="px-6 py-4">Status / Score</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                                        <div className="flex items-center justify-center gap-2">
                                            <Loader2 className="w-5 h-5 animate-spin text-primary" />
                                            <span>Loading matches...</span>
                                        </div>
                                    </td>
                                </tr>
                            ) : filteredMatches.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500">No matches found</td>
                                </tr>
                            ) : (
                                filteredMatches.map((match) => (
                                    <tr key={match._id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="font-bold text-gray-800">
                                                {match.homeTeam?.clubName || 'Unknown'} <span className="text-gray-400 font-normal mx-1">vs</span> {match.awayTeam?.clubName || 'Unknown'}
                                            </div>
                                            <div className="text-xs text-gray-500 mt-1">{match.venue}</div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600 font-medium truncate max-w-[200px]">{match.competition?.proposedName || 'None'}</td>
                                        <td className="px-6 py-4 text-gray-500">
                                            {new Date(match.matchDate).toLocaleDateString()}
                                            {' - '}
                                            {match.matchTime}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col gap-1 items-start">
                                                {getStatusBadge(match.status)}
                                                {(match.status === 'Completed' || match.status === 'Live') && (
                                                    <span className="text-xs font-bold text-gray-800 bg-gray-100 px-2 py-0.5 rounded">
                                                        {match.homeScore} - {match.awayScore}
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => window.location.href = `/admin/matches/form?id=${match._id}`}
                                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                    title="Edit Match"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </button>
                                                <button onClick={() => handleDelete(match._id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete Match">
                                                    <Trash2 className="w-4 h-4" />
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
