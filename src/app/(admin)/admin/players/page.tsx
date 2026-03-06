"use client";

import { CheckCircle, XCircle, Trash2, Search, User } from "lucide-react";

export default function AdminPlayersPage() {
    const players = [
        { id: 1, name: "Taiwo Awoniyi", club: "Osun United FC", position: "Forward", dob: "12 Aug 1997", status: "Approved" },
        { id: 2, name: "Olamilekan Ojo", club: "Ilesa Dynamos", position: "Midfielder", dob: "05 Mar 2002", status: "Approved" },
        { id: 3, name: "Sunday Adeyemi", club: "Ogbomosho Pillars", position: "Defender", dob: "14 Nov 2004", status: "Pending" },
        { id: 4, name: "Tunde Babalola", club: "Unattached", position: "Goalkeeper", dob: "22 Jan 2005", status: "Rejected" },
        { id: 5, name: "Victor Moses", club: "Ede City Boys", position: "Forward", dob: "12 Dec 1990", status: "Approved" },
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Player Registration DB</h2>
                    <p className="text-sm text-gray-500 mt-1">Review player transfers, registrations, and clear licenses.</p>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-4 justify-between bg-gray-50/50">
                    <div className="relative w-full sm:w-96">
                        <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search players by name or club..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead className="bg-gray-50 text-gray-500 font-semibold border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4">Player Name</th>
                                <th className="px-6 py-4">Current Club</th>
                                <th className="px-6 py-4">Position</th>
                                <th className="px-6 py-4">Date of Birth</th>
                                <th className="px-6 py-4">License Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {players.map((player) => (
                                <tr key={player.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-4 font-bold text-gray-800">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                                                <User className="w-4 h-4" />
                                            </div>
                                            {player.name}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600 font-medium">{player.club}</td>
                                    <td className="px-6 py-4 text-gray-500">{player.position}</td>
                                    <td className="px-6 py-4 text-gray-500">{player.dob}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${player.status === 'Approved' ? 'bg-green-100 text-green-700' :
                                                player.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-red-100 text-red-700'
                                            }`}>
                                            {player.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-end gap-2">
                                            {player.status !== 'Approved' && (
                                                <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Approve Registration">
                                                    <CheckCircle className="w-5 h-5" />
                                                </button>
                                            )}
                                            {player.status !== 'Rejected' && (
                                                <button className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors" title="Reject Registration">
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
