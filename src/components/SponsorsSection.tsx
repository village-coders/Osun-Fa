import Image from "next/image";

export default function SponsorsSection() {
    // We'll use placeholder data that looks like realistic sponsor names
    const sponsors = [
        { name: "Osun State Government", type: "Principal Partner", logo: "/partners/osun-state-government.png" },
        { name: "Lanreleke Sports Academy", type: "Partner", logo: "/partners/lanreleke-sports-academy.png" },
        { name: "Perculia Ultimate Concerns Limited", type: "Partner", logo: "/partners/perculia-ultimate-concerns-limited.png" },
        { name: "SmartCity PLC", type: "Partner", logo: "/partners/smartcity-plc.png" },
        { name: "Armstrong Paint", type: "Partner", logo: "/partners/armstrong.png" },
    ];

    return (
        <section className="py-20 bg-white border-t border-border">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <span className="text-sm font-bold tracking-widest text-primary uppercase">
                        Our Proud Partners
                    </span>
                    <h2 className="mt-2 text-3xl font-extrabold text-text-main">Empowering Osun Football</h2>
                </div>

                <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
                    {sponsors.map((sponsor, idx) => (
                        <div key={idx} className="group flex flex-col items-center justify-center p-6 grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300">
                            {/* Abstract Logo Placeholder */}
                            <div className="w-24 h-24 mb-4 relative flex items-center justify-center">
                                <Image
                                    src={sponsor.logo}
                                    alt={sponsor.name}
                                    width={96}
                                    height={96}
                                    className="object-cover"
                                />
                            </div>
                            <h3 className="font-bold text-lg text-center max-w-70 text-text-main">{sponsor.name}</h3>
                            {sponsor.type && (
                                <span className="text-xs text-text-muted font-medium tracking-wide uppercase">{sponsor.type}</span>
                            )}
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