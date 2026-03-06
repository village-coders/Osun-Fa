import { Trophy, Shield, Goal, ChevronRight } from "lucide-react";

export default function CompetitionPage() {
    const competitions = [
        {
            title: "Osun State FA Cup",
            type: "Knockout Tournament",
            desc: "The premier football cup competition in the state. Winners represent Osun State at the National Federation Cup.",
            icon: <Trophy className="w-8 h-8 text-secondary" />,
            status: "Registration Ongoing"
        },
        {
            title: "State League Division 1",
            type: "League Setup",
            desc: "The top-tier state football league. Featuring the finest amateur clubs competing for the prestigious state trophy.",
            icon: <Shield className="w-8 h-8 text-primary" />,
            status: "Mid-Season"
        },
        {
            title: "Under-15 Youth League",
            type: "Youth Development",
            desc: "Grassroots competition designed to scout, nurture, and develop the next generation of football prodigies.",
            icon: <Goal className="w-8 h-8 text-accent" />,
            status: "Upcoming in Jan"
        }
    ];

    return (
        <div className="bg-surface-light min-h-screen pt-20">
            <div className="bg-surface-dark py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent rounded-full mix-blend-screen filter blur-[120px] opacity-10"></div>
                <div className="max-w-7xl mx-auto text-center relative z-10">
                    <Trophy className="w-16 h-16 text-secondary mx-auto mb-6 drop-shadow-[0_0_15px_rgba(229,168,35,0.5)]" />
                    <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
                        OSFA <span className="text-secondary">Competitions</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        The heart of state football. Explore our competitive leagues and knockout tournaments that forge champions.
                    </p>
                </div>
            </div>

            <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {competitions.map((comp, idx) => (
                        <div key={idx} className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 flex flex-col h-full hover:-translate-y-2 transition-all duration-300">
                            <div className="flex justify-between items-start mb-6">
                                <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center shadow-inner">
                                    {comp.icon}
                                </div>
                                <span className="text-xs font-bold px-3 py-1 bg-gray-100 text-gray-600 rounded-full uppercase tracking-widest">
                                    {comp.status}
                                </span>
                            </div>
                            <h3 className="text-2xl font-bold text-text-main mb-2">{comp.title}</h3>
                            <p className="text-sm font-semibold text-secondary uppercase tracking-wider mb-4">{comp.type}</p>
                            <p className="text-text-muted leading-relaxed mb-8 flex-grow">{comp.desc}</p>
                            <button className="w-full bg-[rgba(2,89,40,0.05)] hover:bg-primary hover:text-white text-primary font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors">
                                View Standings & Info <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
