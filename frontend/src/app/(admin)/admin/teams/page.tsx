"use client";

import { CheckCircle, XCircle, Trash2, Search, MapPin } from "lucide-react";

export default function AdminTeamsPage() {
    const teams = [
        { id: 1, name: "Osun United FC", lga: "Osogbo", coach: "Bright Omokaro", type: "Professional", status: "Approved" },
        { id: 2, name: "Ilesa Dynamos", lga: "Ilesa East", coach: "Samuel Ojo", type: "Amateur", status: "Approved" },
        { id: 3, name: "Ogbomosho Pillars", lga: "Orolu", coach: "Ibrahim Yusuf", type: "Amateur", status: "Pending" },
        { id: 4, name: "Ijesha Warriors FC", lga: "Ilesa West", coach: "David Aina", type: "Amateur", status: "Rejected" },
        { id: 5, name: "Ede City Boys", lga: "Ede North", coach: "Tunde Alabi", type: "Youth Academy", status: "Approved" },
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Manage Registered Clubs</h2>
                    <p className="text-sm text-gray-500 mt-1">Review affiliation requests and manage active teams.</p>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-4 justify-between bg-gray-50/50">
                    <div className="relative w-full sm:w-96">
                        <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search clubs by name or coach..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead className="bg-gray-50 text-gray-500 font-semibold border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4">Club Name</th>
                                <th className="px-6 py-4">LGA / Zone</th>
                                <th className="px-6 py-4">Head Coach</th>
                                <th className="px-6 py-4">Club Type</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {teams.map((team) => (
                                <tr key={team.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-4 font-bold text-gray-800">{team.name}</td>
                                    <td className="px-6 py-4 text-gray-500">
                                        <div className="flex items-center gap-1">
                                            <MapPin className="w-3.5 h-3.5" />
                                            {team.lga}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">{team.coach}</td>
                                    <td className="px-6 py-4 text-gray-500">{team.type}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${team.status === 'Approved' ? 'bg-green-100 text-green-700' :
                                                team.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-red-100 text-red-700'
                                            }`}>
                                            {team.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-end gap-2">
                                            {team.status !== 'Approved' && (
                                                <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Approve Affiliation">
                                                    <CheckCircle className="w-5 h-5" />
                                                </button>
                                            )}
                                            {team.status !== 'Rejected' && (
                                                <button className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors" title="Reject Affiliation">
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
