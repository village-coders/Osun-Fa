import AboutSection from "@/components/AboutSection";
import Image from "next/image";
import { CircleCheckBig } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "About Us | Mission, Vision & Core Values",
    description: "Learn about the Osun State Football Association's history, our commitment to grassroots empowerment, and our core values of transparency and integrity.",
    openGraph: {
        title: "About Us | Osun State Football Association",
        description: "Learn about the Osun State Football Association's history and our commitment to grassroots football.",
        url: "https://osunstatefa.org.ng/about",
    }
};

export default function AboutPage() {
    const values = [
        "Transparency and Integrity",
        "Grassroots Empowerment",
        "Inclusivity in Sports",
        "Professionalism",
        "Excellence and Dedication",
        "Community Collaboration"
    ];

    return (
        <div className="bg-background min-h-screen pt-20 lg:pt-28">
            {/* Page Header */}
            <div className="bg-surface-dark py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden border-b border-white/5">
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-50"></div>
                <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary rounded-full mix-blend-screen filter blur-[150px] opacity-10"></div>

                <div className="max-w-7xl mx-auto text-center relative z-10">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
                        About <span className="text-accent">Osun FA</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Governing, developing, and promoting football across Osun State to world-class standards.
                    </p>
                </div>
            </div>

            <AboutSection />

            {/* Extended Content: Values */}
            <section className="py-24 bg-surface-dark text-white border-t border-border-dark">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-extrabold mb-4">Our Core Values</h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            The principles that drive every decision, tournament, and initiative within the association.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {values.map((value, idx) => (
                            <div key={idx} className="glass-dark p-6 rounded-2xl flex items-center gap-4 hover:border-accent/40 transition-colors">
                                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-accent flex-shrink-0">
                                    <CircleCheckBig className="w-6 h-6" />
                                </div>
                                <h3 className="text-lg font-bold">{value}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
