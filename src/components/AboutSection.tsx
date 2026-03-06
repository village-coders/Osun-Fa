import { Trophy, Users, ShieldCheck, Target } from "lucide-react";
import Link from "next/link";

export default function AboutSection() {
    const features = [
        {
            icon: <Users className="w-8 h-8 text-secondary" />,
            title: "Grassroots Development",
            description: "Nurturing local talent across Osun State to build future champions and provide youth with positive pathways."
        },
        {
            icon: <Trophy className="w-8 h-8 text-accent" />,
            title: "Premier Competitions",
            description: "Organizing state leagues, cups, and tournaments that showcase the vibrant football culture of Osun."
        },
        {
            icon: <ShieldCheck className="w-8 h-8 text-secondary" />,
            title: "Integrity & Fair Play",
            description: "Upholding the highest standards of governance, refereeing, and sportsmanship in every single match."
        },
        {
            icon: <Target className="w-8 h-8 text-accent" />,
            title: "Coaching Excellence",
            description: "Providing world-class training and licensing for coaches to elevate the tactical quality of the game."
        }
    ];

    return (
        <section id="about" className="py-24 bg-surface-light relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-16 items-center">

                    {/* Text Content */}
                    <div className="lg:w-1/2">
                        <div className="inline-flex items-center gap-2 mb-4 text-primary font-bold uppercase tracking-wider text-sm">
                            <span className="w-8 h-1 bg-secondary rounded-full"></span>
                            About Our Association
                        </div>

                        <h2 className="text-4xl md:text-5xl font-extrabold text-text-main mb-6 leading-tight">
                            Driving the Passion of <span className="text-primary">Osun Football</span>
                        </h2>

                        <p className="text-lg text-text-muted mb-6 leading-relaxed">
                            The Osun State Football Association (OSFA) is the official governing body of football in Osun State. We are committed to fostering a thriving, inclusive, and globally competitive football ecosystem right here at home.
                        </p>
                        <p className="text-lg text-text-muted mb-8 leading-relaxed">
                            Since our establishment, we have worked tirelessly with clubs, referees, coaches, and communities to elevate the standard of the beautiful game, transforming passion into purpose.
                        </p>

                        <Link href="#history" className="inline-flex items-center gap-2 text-primary hover:text-primary-light font-bold text-lg group transition-colors">
                            Read our full history
                            <span className="bg-primary/10 group-hover:bg-primary/20 p-2 rounded-full transition-colors">
                                <Trophy className="w-4 h-4" />
                            </span>
                        </Link>
                    </div>

                    {/* Features Grid */}
                    <div className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-8">
                        {features.map((feature, idx) => (
                            <div
                                key={idx}
                                className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden group"
                            >
                                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-dark/5 group-hover:bg-primary-dark/10 transition-colors">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-text-main mb-3">{feature.title}</h3>
                                <p className="text-text-muted leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}
