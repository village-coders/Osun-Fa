import { GraduationCap, Award, PlaySquare } from "lucide-react";

export default function LicensedCoachPage() {
    const programs = [
        {
            title: "Grassroots Certification",
            description: "Introductory courses for amateur and youth team coaches.",
            icon: <PlaySquare className="w-8 h-8 text-secondary" />
        },
        {
            title: "State Tactical License (Level 2)",
            description: "Advanced tactical planning, physical conditioning, and game analysis.",
            icon: <Award className="w-8 h-8 text-primary" />
        },
        {
            title: "Elite Pro Diploma Prep",
            description: "Mentorship and preparation for National and CAF licensing integration.",
            icon: <GraduationCap className="w-8 h-8 text-accent" />
        }
    ];

    return (
        <div className="bg-surface-light min-h-screen pt-20">
            <div className="bg-[#013618] py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-secondary rounded-full mix-blend-screen filter blur-[120px] opacity-20"></div>
                <div className="max-w-7xl mx-auto text-center relative z-10">
                    <GraduationCap className="w-16 h-16 text-secondary mx-auto mb-6" />
                    <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
                        OSFA <span className="text-secondary">Licensed Coaches</span>
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        Elevating the tactical, physical, and mental preparedness of Osun State teams through world-class coaching education.
                    </p>
                </div>
            </div>

            <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16 mx-auto max-w-3xl">
                    <h2 className="text-3xl font-extrabold text-text-main mb-6">Mastering the Game</h2>
                    <p className="text-text-muted text-lg leading-relaxed">
                        The Osun State Technical Department mandates that all clubs participating in official OSFA competitions must be handled by certified personnel. We provide continuous education, seminars, and licensing courses to keep our coaches at the cutting edge of modern football.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {programs.map((program, idx) => (
                        <div key={idx} className="bg-white p-8 rounded-2xl shadow-md border hover:border-primary hover:shadow-xl transition-all duration-300 text-center group">
                            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:-translate-y-2 transition-transform">
                                {program.icon}
                            </div>
                            <h3 className="text-xl font-bold text-text-main mb-3">{program.title}</h3>
                            <p className="text-text-muted mb-6">{program.description}</p>
                            <button className="text-primary font-bold hover:text-primary-light transition-colors">
                                View Requirements &rarr;
                            </button>
                        </div>
                    ))}
                </div>

                <div className="mt-20 bg-surface-dark text-white rounded-3xl p-8 md:p-12 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="md:w-2/3">
                        <h3 className="text-2xl md:text-3xl font-bold mb-4">Upcoming Tactical Clinic</h3>
                        <p className="text-gray-400 text-lg">
                            Join former internationals and CAF-certified instructors for a 3-day intensive seminar on modern pressing systems and transition play.
                        </p>
                        <div className="mt-4 flex gap-4 text-sm font-semibold text-secondary uppercase tracking-wider">
                            <span>Nov 12-14, 2026</span>
                            <span>•</span>
                            <span>Osogbo</span>
                        </div>
                    </div>
                    <div>
                        <button className="bg-primary hover:bg-primary-light px-8 py-4 rounded-full font-bold shadow-[0_5px_15px_rgba(2,89,40,0.5)] transition-all transform hover:-translate-y-1 whitespace-nowrap">
                            Register Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
