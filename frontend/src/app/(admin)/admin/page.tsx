import { Users, UserCog, Activity, Trophy, CalendarDays, TrendingUp } from "lucide-react";

export default function AdminDashboard() {
    const stats = [
        { title: "Registered Clubs", value: "124", icon: Users, color: "text-blue-600", bg: "bg-blue-100" },
        { title: "Licensed Coaches", value: "85", icon: UserCog, color: "text-green-600", bg: "bg-green-100" },
        { title: "Active Referees", value: "62", icon: Activity, color: "text-purple-600", bg: "bg-purple-100" },
        { title: "Competitions", value: "8", icon: Trophy, color: "text-yellow-600", bg: "bg-yellow-100" },
        { title: "Total Players", value: "2,450", icon: TrendingUp, color: "text-emerald-600", bg: "bg-emerald-100" },
        { title: "Upcoming Matches", value: "12", icon: CalendarDays, color: "text-rose-600", bg: "bg-rose-100" },
    ];

    const recentActions = [
        { action: "Osun United Registration", status: "Pending Approval", time: "2 hours ago" },
        { action: "Referee Seminar Scheduled", status: "Published", time: "5 hours ago" },
        { action: "Adeboye Samson (Coach)", status: "Approved", time: "1 day ago" },
        { action: "U-15 Youth League Match Data", status: "Updated", time: "1 day ago" },
        { action: "Ijesha Warriors FC", status: "Rejected (Incomplete)", time: "2 days ago" },
    ];

    return (
        <div className="max-w-7xl mx-auto space-y-6">

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Welcome Back, Admin</h2>
                    <p className="text-gray-500 mt-1">Here is the overview of the Osun State FA operations today.</p>
                </div>
                <button className="bg-primary hover:bg-primary-dark text-white font-bold py-2.5 px-6 rounded-lg transition-colors shadow-md">
                    Generate Global Report
                </button>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {stats.map((stat, idx) => {
                    const Icon = stat.icon;
                    return (
                        <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow">
                            <div>
                                <p className="text-sm font-semibold text-gray-500 mb-1">{stat.title}</p>
                                <h3 className="text-3xl font-extrabold text-gray-800">{stat.value}</h3>
                            </div>
                            <div className={`w-14 h-14 rounded-full flex items-center justify-center ${stat.bg} ${stat.color}`}>
                                <Icon className="w-7 h-7" />
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Dashboard Splitting Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Recent Activity Feed */}
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100 bg-gray-50">
                        <h3 className="font-bold text-gray-800">Needs Attention / Recent Activity</h3>
                    </div>
                    <div className="divide-y divide-gray-100">
                        {recentActions.map((action, idx) => (
                            <div key={idx} className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className={`w-2 h-2 rounded-full ${action.status.includes('Pending') ? 'bg-yellow-400' : action.status.includes('Approved') || action.status.includes('Published') ? 'bg-green-500' : action.status.includes('Rejected') ? 'bg-red-500' : 'bg-blue-500'}`}></div>
                                    <div>
                                        <p className="font-semibold text-gray-800">{action.action}</p>
                                        <p className="text-xs text-gray-500 mt-1">{action.time}</p>
                                    </div>
                                </div>
                                <span className={`text-xs font-bold px-3 py-1 rounded-full ${action.status.includes('Pending') ? 'bg-yellow-100 text-yellow-800' : action.status.includes('Approved') || action.status.includes('Published') ? 'bg-green-100 text-green-800' : action.status.includes('Rejected') ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}`}>
                                    {action.status}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* System Status / Quick Actions */}
                <div className="space-y-6">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <h3 className="font-bold text-gray-800 mb-4">Quick Shortcuts</h3>
                        <div className="space-y-3">
                            <button className="w-full text-left px-4 py-3 rounded-lg border border-gray-200 hover:border-primary hover:text-primary transition-colors font-medium text-gray-600">
                                + Approve Pending Clubs
                            </button>
                            <button className="w-full text-left px-4 py-3 rounded-lg border border-gray-200 hover:border-primary hover:text-primary transition-colors font-medium text-gray-600">
                                + Publish News Article
                            </button>
                            <button className="w-full text-left px-4 py-3 rounded-lg border border-gray-200 hover:border-primary hover:text-primary transition-colors font-medium text-gray-600">
                                + Update Match Scores
                            </button>
                        </div>
                    </div>

                    <div className="bg-surface-dark text-white rounded-2xl shadow-sm p-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-accent opacity-10 rounded-full blur-2xl"></div>
                        <h3 className="font-bold text-white mb-2">Registration Season</h3>
                        <p className="text-gray-400 text-sm mb-4">Current phase: 2026/2027 Club Affiliations</p>

                        <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                            <div className="bg-accent h-2 rounded-full" style={{ width: '68%' }}></div>
                        </div>
                        <p className="text-xs text-accent font-bold text-right border-t pt-2 border-gray-700 mt-4">68% Complete • 14 Days Left</p>
                    </div>
                </div>

            </div>

        </div>
    );
}
