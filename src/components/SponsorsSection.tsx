export default function SponsorsSection() {
    // We'll use placeholder data that looks like realistic sponsor names
    const sponsors = [
        { name: "Osun State Govt", type: "Principal Partner" },
        { name: "FirstBank", type: "Official Bank" },
        { name: "MTN Nigeria", type: "Telecom Partner" },
        { name: "Aiteo", type: "Energy Partner" },
        { name: "Nike", type: "Kit Sponsor" }
    ];

    return (
        <section className="py-20 bg-white border-t border-border">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-sm font-bold tracking-widest text-primary uppercase">Our Proud Partners</h2>
                    <p className="mt-2 text-3xl font-extrabold text-text-main">Empowering Osun Football</p>
                </div>

                <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
                    {sponsors.map((sponsor, idx) => (
                        <div key={idx} className="group flex flex-col items-center justify-center p-6 grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300">
                            {/* Abstract Logo Placeholder */}
                            <div className="w-24 h-24 mb-4 rounded-full bg-gray-100 flex items-center justify-center shadow-inner group-hover:bg-primary/5 transition-colors border border-gray-200">
                                <span className="text-2xl font-black text-gray-400 group-hover:text-primary transition-colors">
                                    {sponsor.name.charAt(0)}
                                </span>
                            </div>
                            <h3 className="font-bold text-lg text-text-main">{sponsor.name}</h3>
                            <span className="text-xs text-text-muted font-medium tracking-wide uppercase">{sponsor.type}</span>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <button className="bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white font-bold px-8 py-3 rounded-full transition-colors duration-300">
                        Become a Sponsor
                    </button>
                </div>
            </div>
        </section>
    );
}
