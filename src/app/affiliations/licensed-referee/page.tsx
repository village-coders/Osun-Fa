import { Activity, BookOpen, ScrollText } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Licensed Referees | Officiating Pathway",
    description: "The path to officiating football in Osun State. Learn about referee grades, upcoming fitness tests, and the Osun State Referees Council.",
    openGraph: {
        title: "Licensed Referees | Osun State FA",
        description: "Training, assessment, and certification for football referees in Osun State.",
        url: "https://osunstatefa.org.ng/affiliations/licensed-referee",
    }
};

export default function LicensedRefereePage() {
    const steps = [
        {
            title: "Basic Training (Grade 3)",
            description: "Entry-level training for new referees focusing on the fundamental Laws of the Game.",
            icon: <BookOpen className="w-6 h-6" />
        },
        {
            title: "Intermediate (Grade 2)",
            description: "Advanced tactical positioning and match management for state league matches.",
            icon: <Activity className="w-6 h-6" />
        },
        {
            title: "State Elite (Grade 1)",
            description: "Top-tier refereeing for finals and major tournaments, requiring strict quarterly fitness tests.",
            icon: <ScrollText className="w-6 h-6" />
        }
    ];

    return (
        <div className="bg-surface-light min-h-screen pt-20">
            <div className="bg-[#1f2937] py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
                <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-accent rounded-full mix-blend-overlay filter blur-[150px] opacity-20"></div>

                <div className="max-w-7xl mx-auto text-center relative z-10">
                    <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">
                        哨
                    </div>
                    <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
                        OSFA <span className="text-accent">Licensed Referees</span>
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        Upholding the integrity of the game through rigorous training, assessment, and certification.
                    </p>
                </div>
            </div>

            <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl font-extrabold text-text-main mb-6">The Path to Officiating</h2>
                <p className="text-text-muted max-w-3xl mx-auto mb-16 text-lg">
                    The Osun State Referees Council works in tandem with OSFA to train and deploy match officials across the state. Our pathway ensures that only the best, fittest, and most knowledgeable individuals handle the whistle.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {steps.map((step, idx) => (
                        <div key={idx} className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:border-accent transition-colors relative group">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-surface-dark text-accent rounded-full flex items-center justify-center border-4 border-white group-hover:bg-accent group-hover:text-black transition-colors">
                                {step.icon}
                            </div>
                            <div className="pt-8">
                                <h3 className="text-xl font-bold text-text-main mb-4">{step.title}</h3>
                                <p className="text-text-muted leading-relaxed">{step.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-20 glass-dark bg-surface-dark text-white rounded-3xl p-10 max-w-4xl mx-auto">
                    <h3 className="text-2xl font-bold mb-4">Upcoming Fitness Test & Seminar</h3>
                    <p className="text-gray-400 mb-8">
                        Registration is now open for the next quarterly fitness test for Grade 2 and Grade 3 referees. Mandatory for all active officials.
                    </p>
                    <button className="bg-accent text-black font-bold px-8 py-3 rounded-full hover:bg-secondary transition-colors">
                        Register for Seminar
                    </button>
                </div>
            </div>
        </div>
    );
}
