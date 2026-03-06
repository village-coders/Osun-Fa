import { Trophy, Shield, Goal, ChevronRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Official Competitions & Leagues",
    description: "Explore the premier football competitions in Osun State, including the FA Cup, State League, Women's League, and grassroots tournaments.",
    openGraph: {
        title: "Official Competitions | Osun State FA",
        description: "Explore all official football competitions and leagues organized by the Osun State Football Association.",
        url: "https://osunstatefa.org.ng/affiliations/competition",
    }
};

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
            title: "Osun State Football League",
            type: "State League",
            desc: "Immerses young players (U-17) into a regulated competitive environment, allowing them to advance their careers from grassroots to professional level. Unites players from all demographics.",
            icon: <Shield className="w-8 h-8 text-primary" />,
            status: "Active"
        },
        {
            title: "Osun Women’s Football League",
            type: "Women's Football",
            desc: "Promotes and develops women's football by providing a competitive environment. Fosters growth, develops talented players, and promotes equality and inclusivity.",
            icon: <Goal className="w-8 h-8 text-accent" />,
            status: "Upcoming"
        },
        {
            title: "Osun Kiddies Football League",
            type: "Youth Development (U-12)",
            desc: "Provides a fun, safe, and developmental environment for U-12 players. Promotes physical activity, teamwork, discipline, sportsmanship, and fundamental skills.",
            icon: <Shield className="w-8 h-8 text-secondary" />,
            status: "Registration"
        },
        {
            title: "Osun Inter-Collegiate Football League",
            type: "Tertiary Institutions",
            desc: "An inter-higher institutions football league. Provides a place for Universities, Polytechnics, and Colleges of Education to play amateur football at a competitive standard.",
            icon: <Trophy className="w-8 h-8 text-primary" />,
            status: "Active"
        },
        {
            title: "Osun State Principals’ Cup",
            type: "Secondary Schools",
            desc: "An age-long competition among secondary schools aimed at discovering talent. Now revived for both males and females, promoting the FA's inclusive policy.",
            icon: <Goal className="w-8 h-8 text-secondary" />,
            status: "Upcoming"
        },
        {
            title: "Osun State Headmasters’ Cup",
            type: "Primary Schools",
            desc: "A 7-a-side tournament among primary schools aimed at unearthing young budding soccer talents in a safe and inclusive environment.",
            icon: <Trophy className="w-8 h-8 text-accent" />,
            status: "Upcoming"
        },
        {
            title: "Osun Corporate Football League",
            type: "Corporate/Amateur",
            desc: "Playing the game we love under the colours we embrace. A league for corporate workers and professionals.",
            icon: <Shield className="w-8 h-8 text-primary" />,
            status: "Registration"
        },
        {
            title: "Osogbo Street Soccer Challenge",
            type: "Street/Grassroots",
            desc: "Promises to deliver unparalleled excitement for football stakeholders in Osogbo, the fastest-developing city in the South West.",
            icon: <Goal className="w-8 h-8 text-secondary" />,
            status: "Upcoming"
        }
    ];

    return (
        <div className="bg-surface-light min-h-screen pt-20 md:pt-28">
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
