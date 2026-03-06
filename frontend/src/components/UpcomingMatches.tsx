import { CalendarDays, Clock, MapPin } from "lucide-react";

export default function UpcomingMatches() {
    const matches = [
        {
            id: 1,
            homeTeam: "Osogbo United",
            awayTeam: "Ife Royals FC",
            homeLogo: "🛡️",
            awayLogo: "👑",
            date: "Oct 24, 2026",
            time: "15:00 WAT",
            venue: "Osogbo City Stadium",
            type: "State FA Cup Final"
        },
        {
            id: 2,
            homeTeam: "Ilesa Warriors",
            awayTeam: "Ede City Boys",
            homeLogo: "⚔️",
            awayLogo: "🦁",
            date: "Oct 28, 2026",
            time: "16:00 WAT",
            venue: "Ilesa Township Stadium",
            type: "League Matchday 12"
        },
        {
            id: 3,
            homeTeam: "Olorunda Stars",
            awayTeam: "Ikire Dynamos",
            homeLogo: "⭐",
            awayLogo: "⚡",
            date: "Nov 2, 2026",
            time: "14:00 WAT",
            venue: "Olorunda Arena",
            type: "League Matchday 13"
        }
    ];

    return (
        <section className="py-24 bg-surface-dark text-white relative border-t border-border-dark">
            {/* Decorative background */}
            <div className="absolute top-1/2 left-0 w-64 h-64 bg-primary rounded-full mix-blend-screen filter blur-[150px] opacity-10"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-extrabold mb-4">Match <span className="text-secondary">Center</span></h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">Stay updated with the latest fixtures and upcoming clashes across Osun State leagues and tournaments.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {matches.map((match) => (
                        <div key={match.id} className="glass-dark rounded-2xl p-6 border border-[rgba(255,255,255,0.05)] hover:border-accent/40 transition-colors group">
                            <div className="flex justify-between items-center mb-6 text-xs text-gray-400 font-semibold tracking-wide uppercase">
                                <span className="bg-primary/20 text-accent px-3 py-1 rounded-full">{match.type}</span>
                            </div>

                            <div className="flex justify-between items-center mb-8">
                                <div className="text-center flex-1">
                                    <div className="w-16 h-16 mx-auto bg-gray-800 rounded-full flex items-center justify-center text-3xl mb-3 shadow-[0_0_15px_rgba(255,255,255,0.05)] border border-gray-700">
                                        {match.homeLogo}
                                    </div>
                                    <h4 className="font-bold text-lg">{match.homeTeam}</h4>
                                </div>

                                <div className="px-4 text-center">
                                    <span className="text-2xl font-black text-gray-500 italic">VS</span>
                                </div>

                                <div className="text-center flex-1">
                                    <div className="w-16 h-16 mx-auto bg-gray-800 rounded-full flex items-center justify-center text-3xl mb-3 shadow-[0_0_15px_rgba(255,255,255,0.05)] border border-gray-700">
                                        {match.awayLogo}
                                    </div>
                                    <h4 className="font-bold text-lg">{match.awayTeam}</h4>
                                </div>
                            </div>

                            <div className="space-y-3 pt-6 border-t border-[rgba(255,255,255,0.1)]">
                                <div className="flex items-center text-sm text-gray-300 gap-3">
                                    <CalendarDays className="w-5 h-5 text-secondary" />
                                    {match.date}
                                </div>
                                <div className="flex items-center text-sm text-gray-300 gap-3">
                                    <Clock className="w-5 h-5 text-secondary" />
                                    {match.time}
                                </div>
                                <div className="flex items-center text-sm text-gray-300 gap-3">
                                    <MapPin className="w-5 h-5 text-secondary" />
                                    {match.venue}
                                </div>
                            </div>

                            <button className="w-full mt-6 py-3 rounded-lg bg-[rgba(255,255,255,0.05)] hover:bg-primary text-white font-semibold transition-colors duration-300 flex justify-center items-center gap-2 group-hover:text-white">
                                View Match Details
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
