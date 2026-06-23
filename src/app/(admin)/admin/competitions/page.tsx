"use client";

import { CheckCircle, XCircle, Trash2, Search, Trophy, Loader2, Image as ImageIcon, Plus, Edit } from "lucide-react";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import toast from "react-hot-toast";
import { TableSkeleton } from "@/components/PortalSkeletons";
import AdminPagination from "@/components/AdminPagination";

export default function AdminCompetitionsPage() {
    const [competitions, setCompetitions] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 10;

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
            await api.put(`/competitions/${id}`, { status });
            setCompetitions(competitions.map(c => c._id === id ? { ...c, status } : c));
            toast.success(`Competition ${status.toLowerCase()}`);
        } catch (error) {
            toast.error("Failed to update status");
        }
    };

    const handleToggleRegistration = async (id: string, currentStatus: string) => {
        try {
            const newStatus = currentStatus === 'open' ? 'closed' : 'open';
            await api.put(`/competitions/${id}`, { registrationStatus: newStatus });
            setCompetitions(competitions.map(c => c._id === id ? { ...c, registrationStatus: newStatus } : c));
            toast.success(`Registration ${newStatus}`);
        } catch (error) {
            toast.error("Failed to toggle registration status");
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

    const filteredCompetitions = useMemo(() => {
        if (!searchQuery.trim()) return competitions;
        return competitions.filter(c =>
            c.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.season?.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [competitions, searchQuery]);

    const paginatedCompetitions = useMemo(() => {
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredCompetitions.slice(start, start + ITEMS_PER_PAGE);
    }, [filteredCompetitions, currentPage]);

    useMemo(() => { setCurrentPage(1); }, [searchQuery]);

    if (loading) return <TableSkeleton />;

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
                    <table className="w-full text-left text-sm whitespace-nowrap min-w-200">
                        <thead className="bg-gray-50 text-gray-500 font-semibold border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4">Competition Name</th>
                                <th className="px-6 py-4">Format</th>
                                <th className="px-6 py-4">Season / Year</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Registration</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredCompetitions.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-8 text-center text-gray-500">No competitions found</td>
                                </tr>
                            ) : (
                                paginatedCompetitions.map((comp) => (
                                    <tr key={comp._id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4 font-bold text-gray-800">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded bg-gray-100 flex shrink-0 items-center justify-center text-gray-400 overflow-hidden">
                                                    {comp.logoUrl ? (
                                                        <img src={comp.logoUrl} alt={comp.name} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <Trophy className="w-4 h-4 text-primary" />
                                                    )}
                                                </div>
                                                <span className="truncate max-w-50">{comp.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600">-</td>
                                        <td className="px-6 py-4 text-gray-500">{comp.season}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${comp.status === 'completed' ? 'bg-green-100 text-green-700' :
                                                comp.status === 'ongoing' ? 'bg-blue-100 text-blue-800' :
                                                    'bg-yellow-100 text-yellow-700'
                                                }`}>
                                                {comp.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${comp.registrationStatus === 'open' ? 'bg-accent/20 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                                                {comp.registrationStatus === 'open' ? 'Open' : 'Closed'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => handleToggleRegistration(comp._id, comp.registrationStatus)}
                                                    className={`p-2 rounded-lg transition-colors title="Toggle Registration" ${comp.registrationStatus === 'open' ? 'text-red-600 hover:bg-red-50' : 'text-green-600 hover:bg-green-50'}`}
                                                >
                                                    {comp.registrationStatus === 'open' ? <XCircle className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                                                </button>
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
                <AdminPagination
                    currentPage={currentPage}
                    totalItems={filteredCompetitions.length}
                    itemsPerPage={ITEMS_PER_PAGE}
                    onPageChange={setCurrentPage}
                    label="competitions"
                />
            </div>
        </div>
    );
}
