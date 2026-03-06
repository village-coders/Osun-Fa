"use client";

import { CheckCircle, XCircle, Trash2, Search, Trophy } from "lucide-react";

export default function AdminCompetitionsPage() {
    const competitions = [
        { id: 1, name: "Osun State FA Cup", type: "Knockout", season: "2026/2027", teams: 32, status: "Approved" },
        { id: 2, name: "Osun State Football League", type: "League", season: "2026/2027", teams: 20, status: "Approved" },
        { id: 3, name: "Osun Women's League", type: "League", season: "2026/2027", teams: 12, status: "Pending" },
        { id: 4, name: "U-15 Youth Championship", type: "Tournament", season: "2026", teams: 16, status: "Approved" },
        { id: 5, name: "Veterans Cup", type: "Tournament", season: "2026", teams: 8, status: "Rejected" },
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Competitions & Tournaments</h2>
                    <p className="text-sm text-gray-500 mt-1">Review proposals and manage officially sanctioned state competitions.</p>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-4 justify-between bg-gray-50/50">
                    <div className="relative w-full sm:w-96">
                        <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search competitions..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead className="bg-gray-50 text-gray-500 font-semibold border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4">Competition Name</th>
                                <th className="px-6 py-4">Format</th>
                                <th className="px-6 py-4">Season / Year</th>
                                <th className="px-6 py-4">Teams Reg.</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {competitions.map((comp) => (
                                <tr key={comp.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-4 font-bold text-gray-800">
                                        <div className="flex items-center gap-2">
                                            <Trophy className="w-4 h-4 text-primary" />
                                            {comp.name}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">{comp.type}</td>
                                    <td className="px-6 py-4 text-gray-500">{comp.season}</td>
                                    <td className="px-6 py-4 text-gray-500 font-medium">{comp.teams}</td>
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
                                                <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Sanction Competition">
                                                    <CheckCircle className="w-5 h-5" />
                                                </button>
                                            )}
                                            {comp.status !== 'Rejected' && (
                                                <button className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors" title="Reject Competition">
                                                    <XCircle className="w-5 h-5" />
                                                </button>
                                            )}
                                            <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete Record">
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
