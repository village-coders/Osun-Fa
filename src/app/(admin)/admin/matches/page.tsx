"use client";

import { Plus, Edit, Trash2, Search, Calendar as CalendarIcon } from "lucide-react";

export default function AdminMatchesPage() {
    const matches = [
        { id: 1, home: "Osun United FC", away: "Ilesa Dynamos", date: "Oct 28, 2026 - 16:00", venue: "Osogbo City Stadium", competition: "State League D1", status: "Upcoming" },
        { id: 2, home: "Ogbomosho Pillars", away: "Ede City Boys", date: "Oct 29, 2026 - 15:30", venue: "Ede Township Stadium", competition: "State League D1", status: "Upcoming" },
        { id: 3, home: "Ife Royals", away: "Ijesha Warriors", date: "Oct 22, 2026 - 16:00", venue: "OAU Sports Complex", competition: "Osun FA Cup", status: "Live" },
        { id: 4, home: "Osogbo Street FC", away: "Modakeke Stars", date: "Oct 20, 2026 - 10:00", venue: "Technical Centre Pitch", competition: "U-15 Youth League", status: "Completed (2-0)" },
        { id: 5, home: "Ikire United", away: "Ila Orangun FC", date: "Oct 19, 2026 - 16:00", venue: "Ikire Match Ground", competition: "State League D1", status: "Completed (1-1)" },
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h2 className="text-2xl font-bold text-gray-800">Match Fixtures & Results</h2>
                <button className="bg-primary hover:bg-primary-dark text-white font-bold py-2.5 px-5 rounded-lg flex items-center gap-2 transition-colors shadow-sm">
                    <Plus className="w-5 h-5" />
                    Record New Match
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-4 justify-between bg-gray-50/50">
                    <div className="relative w-full sm:w-96">
                        <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by team or competition..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                        />
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600 text-sm font-medium transition-colors whitespace-nowrap">
                        <CalendarIcon className="w-4 h-4" />
                        Filter by Date
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
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
                            {matches.map((match) => (
                                <tr key={match.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="font-bold text-gray-800">
                                            {match.home} <span className="text-gray-400 font-normal mx-1">vs</span> {match.away}
                                        </div>
                                        <div className="text-xs text-gray-500 mt-1">{match.venue}</div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600 font-medium">{match.competition}</td>
                                    <td className="px-6 py-4 text-gray-500">{match.date}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${match.status === 'Upcoming' ? 'bg-yellow-100 text-yellow-800' :
                                                match.status === 'Live' ? 'bg-red-100 text-red-700 animate-pulse' :
                                                    'bg-gray-100 text-gray-700'
                                            }`}>
                                            {match.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-end gap-2">
                                            <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Edit Match">
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete Match">
                                                <Trash2 className="w-4 h-4" />
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
