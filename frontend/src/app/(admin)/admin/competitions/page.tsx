"use client";

import { CheckCircle, XCircle, Trash2, Search, Trophy, Loader2, Image as ImageIcon, Plus, Edit } from "lucide-react";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import toast from "react-hot-toast";

export default function AdminCompetitionsPage() {
    const [competitions, setCompetitions] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchCompetitions = async () => {
            try {
                const res = await api.get('/competitions');
                setCompetitions(res.data);
            } catch (error) {
                toast.error("Failed to load competitions");
            } finally {
                setLoading(false);
            }
        };
        fetchCompetitions();
    }, []);

    const handleUpdateStatus = async (id: string, status: string) => {
        try {
            await api.put(`/competitions/${id}/status`, { status });
            setCompetitions(competitions.map(c => c._id === id ? { ...c, status } : c));
            toast.success(`Competition ${status.toLowerCase()}`);
        } catch (error) {
            toast.error("Failed to update status");
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this competition?")) return;
        try {
            await api.delete(`/competitions/${id}`);
            setCompetitions(competitions.filter(c => c._id !== id));
            toast.success("Competition deleted");
        } catch (error) {
            toast.error("Failed to delete competition");
        }
    };

    const filteredCompetitions = competitions.filter(c =>
        c.proposedName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.formatType?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.seasonYear?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Competitions & Tournaments</h2>
                    <p className="text-sm text-gray-500 mt-1">Review proposals and manage officially sanctioned state competitions.</p>
                </div>
                <button
                    onClick={() => window.location.href = '/admin/competitions/form'}
                    className="bg-primary hover:bg-primary-dark text-white font-bold py-2.5 px-5 rounded-lg flex items-center gap-2 transition-colors shadow-sm shrink-0"
                >
                    <Plus className="w-5 h-5" />
                    Add Competition
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full">
                <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-4 justify-between bg-gray-50/50">
                    <div className="relative w-full sm:w-96">
                        <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search competitions..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto w-full">
                    <table className="w-full text-left text-sm whitespace-nowrap min-w-[800px]">
                        <thead className="bg-gray-50 text-gray-500 font-semibold border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4">Competition Name</th>
                                <th className="px-6 py-4">Format</th>
                                <th className="px-6 py-4">Season / Year</th>
                                <th className="px-6 py-4">Sponsor (if any)</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {loading ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                                        <div className="flex items-center justify-center gap-2">
                                            <Loader2 className="w-5 h-5 animate-spin text-primary" />
                                            <span>Loading competitions...</span>
                                        </div>
                                    </td>
                                </tr>
                            ) : filteredCompetitions.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-8 text-center text-gray-500">No competitions found</td>
                                </tr>
                            ) : (
                                filteredCompetitions.map((comp) => (
                                    <tr key={comp._id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4 font-bold text-gray-800">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded bg-gray-100 flex shrink-0 items-center justify-center text-gray-400 overflow-hidden">
                                                    {comp.sponsorLogoUrl ? (
                                                        <img src={comp.sponsorLogoUrl} alt={comp.proposedName} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <Trophy className="w-4 h-4 text-primary" />
                                                    )}
                                                </div>
                                                <span className="truncate max-w-[200px]">{comp.proposedName}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600">{comp.formatType}</td>
                                        <td className="px-6 py-4 text-gray-500">{comp.seasonYear}</td>
                                        <td className="px-6 py-4 text-gray-500 font-medium truncate max-w-[150px]">{comp.sponsorName || 'None'}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${comp.status === 'Approved' ? 'bg-green-100 text-green-700' :
                                                comp.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-red-100 text-red-700'
                                                }`}>
                                                {comp.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end gap-2">
                                                {comp.status !== 'Approved' && (
                                                    <button onClick={() => handleUpdateStatus(comp._id, 'Approved')} className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Sanction Competition">
                                                        <CheckCircle className="w-5 h-5" />
                                                    </button>
                                                )}
                                                {comp.status !== 'Rejected' && (
                                                    <button onClick={() => handleUpdateStatus(comp._id, 'Rejected')} className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors" title="Reject Competition">
                                                        <XCircle className="w-5 h-5" />
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => window.location.href = `/admin/competitions/form?id=${comp._id}`}
                                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                    title="Edit Competition"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </button>
                                                <button onClick={() => handleDelete(comp._id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete Record">
                                                    <Trash2 className="w-5 h-5" />
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
