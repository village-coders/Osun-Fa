import { ShieldCheck, FileText, CheckCircle2, ChevronRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Registered Clubs | Affiliation Requirements",
    description: "Learn how to officially register your football club with the Osun State Football Association to participate in sanctioned state leagues and competitions.",
    openGraph: {
        title: "Club Registration | Osun State FA",
        description: "Requirements and benefits of registering your football club with the Osun State Football Association.",
        url: "https://osunstatefa.org.ng/affiliations/registered-club",
    }
};

export default function RegisteredClubPage() {
    const requirements = [
        "Completed OSFA Club Registration Form",
        "List of registered players with valid identification",
        "Evidence of payment of annual affiliation fee",
        "Profiles of the coaching staff and management board",
        "Standard home ground location for matches",
        "Signed code of conduct agreement"
    ];

    return (
        <div className="bg-surface-light min-h-screen pt-20">
            <div className="bg-primary-dark py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
                <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-primary rounded-full mix-blend-screen filter blur-[120px] opacity-30"></div>
                <div className="max-w-7xl mx-auto text-center relative z-10">
                    <ShieldCheck className="w-16 h-16 text-secondary mx-auto mb-6" />
                    <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
                        OSFA <span className="text-secondary">Registered Clubs</span>
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        Join the official network of recognized football clubs in Osun State and gain access to premier competitions.
                    </p>
                </div>
            </div>

            <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    <div>
                        <h2 className="text-3xl font-extrabold text-text-main mb-6">Why Register Your Club?</h2>
                        <p className="text-text-muted mb-8 leading-relaxed">
                            Registering your football club with the Osun State Football Association is the first step toward professional recognition. It grants your team the right to participate in sanctioned state leagues, the Osun FA Cup, and grassroots development programs.
                        </p>

                        <div className="space-y-6">
                            {[
                                "Eligibility to participate in all OSFA organized competitions",
                                "Official recognition by the Nigeria Football Federation (NFF)",
                                "Access to coaching clinics and referee support",
                                "Protection of players under the state transfer system"
                            ].map((benefit, idx) => (
                                <div key={idx} className="flex items-start gap-4">
                                    <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                                    <p className="text-lg font-medium text-gray-800">{benefit}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100">
                        <h3 className="text-2xl font-bold text-text-main mb-6 flex items-center gap-3">
                            <FileText className="w-6 h-6 text-primary" />
                            Registration Requirements
                        </h3>

                        <ul className="space-y-4 mb-8">
                            {requirements.map((req, idx) => (
                                <li key={idx} className="flex items-start gap-3 text-text-muted pb-4 border-b border-gray-50 last:border-0 last:pb-0">
                                    <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                                        {idx + 1}
                                    </span>
                                    <span>{req}</span>
                                </li>
                            ))}
                        </ul>

                        <button className="w-full bg-primary hover:bg-primary-light text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-[0_5px_15px_rgba(2,89,40,0.3)] hover:-translate-y-1">
                            Start Club Registration
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
