export default function Marquee() {
    const newsItems = [
        "🔥 BREAKING: Osun State FA Cup registration extended to Nov 5th.",
        "🏆 MATCH RESULT: Osogbo United 2 - 1 Ilesa Warriors",
        "⚽ NEW INITIATIVE: Grassroots coaching clinic begins next week.",
        "🏟️ UPCOMING: State League finals to be held at Osogbo City Stadium.",
        "📢 NOTICE: All registered clubs must submit player licenses by Friday."
    ];

    // Duplicate items to ensure smooth continuous scrolling
    const scrollItems = [...newsItems, ...newsItems, ...newsItems];

    return (
        <div className="bg-primary-dark mt-20 lg:mt-29 text-white py-3 border-y border-accent/20 overflow-hidden relative flex items-center w-full z-20 shadow-lg">
            <div className="absolute left-0 top-0 bottom-0 w-8 z-10 bg-gradient-to-r from-primary-dark to-transparent"></div>

            <div className="flex-shrink-0 px-4 py-1 bg-accent text-primary-dark font-bold text-sm z-20 uppercase tracking-wider h-full flex items-center">
                Live Updates
            </div>

            <div className="flex whitespace-nowrap overflow-hidden items-center group w-full">
                <div className="flex animate-marquee group-hover:[animation-play-state:paused] items-center">
                    {scrollItems.map((item, index) => (
                        <div key={index} className="flex items-center">
                            <span className="mx-8 text-sm font-medium tracking-wide text-gray-200">{item}</span>
                            <span className="w-1.5 h-1.5 rounded-full bg-secondary mx-2 opacity-50 hidden sm:block"></span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-primary-dark to-transparent"></div>
        </div>
    );
}
