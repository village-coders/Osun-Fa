"use client";

import { CheckCircle, XCircle, Trash2, Search, Activity } from "lucide-react";

export default function AdminRefereesPage() {
    const referees = [
        { id: 1, name: "Adeola Sunday", grade: "FIFA Badge", lrc: "Osogbo Society", matches: 145, status: "Approved" },
        { id: 2, name: "Blessing Emmanuel", grade: "Grade 1", lrc: "Ife Society", matches: 82, status: "Approved" },
        { id: 3, name: "Chinedu Okoro", grade: "Grade 3", lrc: "Ede Society", matches: 12, status: "Pending" },
        { id: 4, name: "Kazeem Alabi", grade: "Grade 2", lrc: "Ilesa Society", matches: 45, status: "Approved" },
        { id: 5, name: "Fatimah Umar", grade: "Grade 3", lrc: "Odo Otin Society", matches: 5, status: "Rejected" },
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Licensed Referees</h2>
                    <p className="text-sm text-gray-500 mt-1">Manage officiating personnel and review grading applications.</p>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-4 justify-between bg-gray-50/50">
                    <div className="relative w-full sm:w-96">
                        <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search referees by name or society..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead className="bg-gray-50 text-gray-500 font-semibold border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4">Referee Name</th>
                                <th className="px-6 py-4">Grade / Badge</th>
                                <th className="px-6 py-4">Local Society</th>
                                <th className="px-6 py-4">Matches Officiated</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {referees.map((ref) => (
                                <tr key={ref.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-4 font-bold text-gray-800">{ref.name}</td>
                                    <td className="px-6 py-4 text-gray-600">
                                        <div className="flex items-center gap-1.5 font-medium">
                                            <Activity className="w-4 h-4 text-secondary" />
                                            {ref.grade}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-500">{ref.lrc}</td>
                                    <td className="px-6 py-4 text-gray-500 font-medium">{ref.matches}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${ref.status === 'Approved' ? 'bg-green-100 text-green-700' :
                                                ref.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-red-100 text-red-700'
                                            }`}>
                                            {ref.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-end gap-2">
                                            {ref.status !== 'Approved' && (
                                                <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Approve License">
                                                    <CheckCircle className="w-5 h-5" />
                                                </button>
                                            )}
                                            {ref.status !== 'Rejected' && (
                                                <button className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors" title="Reject Application">
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
