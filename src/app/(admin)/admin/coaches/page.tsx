"use client";

import { CheckCircle, XCircle, Trash2, Search, Medal } from "lucide-react";

export default function AdminCoachesPage() {
    const coaches = [
        { id: 1, name: "Bright Omokaro", license: "CAF A License", primaryClub: "Osun United FC", experience: "15 Years", status: "Approved" },
        { id: 2, name: "Samuel Ojo", license: "NFF Grade 1", primaryClub: "Ilesa Dynamos", experience: "8 Years", status: "Approved" },
        { id: 3, name: "Ayo Bamidele", license: "Basic Grassroots", primaryClub: "Unattached", experience: "2 Years", status: "Pending" },
        { id: 4, name: "David Aina", license: "NFF Grade 3", primaryClub: "Ijesha Warriors FC", experience: "5 Years", status: "Rejected" },
        { id: 5, name: "Tunde Alabi", license: "CAF C License", primaryClub: "Ede City Boys", experience: "10 Years", status: "Approved" },
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Licensed Coaches Directory</h2>
                    <p className="text-sm text-gray-500 mt-1">Review coaching credentials and manage state-certified personnel.</p>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-4 justify-between bg-gray-50/50">
                    <div className="relative w-full sm:w-96">
                        <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search coaches by name or license..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead className="bg-gray-50 text-gray-500 font-semibold border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4">Coach Name</th>
                                <th className="px-6 py-4">Highest License</th>
                                <th className="px-6 py-4">Primary Club (if any)</th>
                                <th className="px-6 py-4">Exp.</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {coaches.map((coach) => (
                                <tr key={coach.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-4 font-bold text-gray-800">{coach.name}</td>
                                    <td className="px-6 py-4 text-gray-600">
                                        <div className="flex items-center gap-1.5 font-medium">
                                            <Medal className="w-4 h-4 text-secondary" />
                                            {coach.license}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-500">{coach.primaryClub}</td>
                                    <td className="px-6 py-4 text-gray-500">{coach.experience}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${coach.status === 'Approved' ? 'bg-green-100 text-green-700' :
                                                coach.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-red-100 text-red-700'
                                            }`}>
                                            {coach.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-end gap-2">
                                            {coach.status !== 'Approved' && (
                                                <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Approve License">
                                                    <CheckCircle className="w-5 h-5" />
                                                </button>
                                            )}
                                            {coach.status !== 'Rejected' && (
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
