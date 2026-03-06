"use client";

import { Plus, Edit, Trash2, Search, Filter } from "lucide-react";

export default function AdminNewsPage() {
    const newsItems = [
        { id: 1, title: "Osun FA Cup Final Date Announced", category: "Competition", date: "Oct 24, 2026", status: "Published" },
        { id: 2, title: "New Grassroots Football Initiative Launched", category: "Development", date: "Oct 22, 2026", status: "Published" },
        { id: 3, title: "Referee Seminar Scheduled for November", category: "Training", date: "Oct 20, 2026", status: "Draft" },
        { id: 4, title: "Governor's Visit to Osogbo Stadium", category: "General Info", date: "Oct 18, 2026", status: "Published" },
        { id: 5, title: "U-15 Youth League Registration Opens", category: "Youth Football", date: "Oct 15, 2026", status: "Draft" },
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h2 className="text-2xl font-bold text-gray-800">News & Media Management</h2>
                <button className="bg-primary hover:bg-primary-dark text-white font-bold py-2.5 px-5 rounded-lg flex items-center gap-2 transition-colors shadow-sm">
                    <Plus className="w-5 h-5" />
                    Add News Article
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-4 justify-between bg-gray-50/50">
                    <div className="relative w-full sm:w-96">
                        <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search articles..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                        />
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600 text-sm font-medium transition-colors whitespace-nowrap">
                        <Filter className="w-4 h-4" />
                        Filter Category
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead className="bg-gray-50 text-gray-500 font-semibold border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4">Article Title</th>
                                <th className="px-6 py-4">Category</th>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {newsItems.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-gray-800">{item.title}</td>
                                    <td className="px-6 py-4 text-gray-500">{item.category}</td>
                                    <td className="px-6 py-4 text-gray-500">{item.date}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${item.status === 'Published' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                                            }`}>
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-end gap-2">
                                            <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Edit Article">
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete Article">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="p-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500 bg-gray-50/50">
                    <span>Showing 1 to 5 of 24 articles</span>
                    <div className="flex gap-1">
                        <button className="px-3 py-1 border border-gray-200 rounded hover:bg-white transition-colors" disabled>Prev</button>
                        <button className="px-3 py-1 border border-gray-200 rounded bg-white font-bold text-primary">1</button>
                        <button className="px-3 py-1 border border-gray-200 rounded hover:bg-white transition-colors">2</button>
                        <button className="px-3 py-1 border border-gray-200 rounded hover:bg-white transition-colors">Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
