import Link from "next/link";
import { ArrowRight, Calendar, ChevronRight } from "lucide-react";

export default function HeroSection() {
    const latestNews = [
        {
            id: 1,
            title: "Osun FA Cup Final Date Announced",
            date: "Oct 24, 2026",
            category: "Competition"
        },
        {
            id: 2,
            title: "New Grassroots Football Initiative Launched",
            date: "Oct 22, 2026",
            category: "Development"
        },
        {
            id: 3,
            title: "Referee Seminar Scheduled for November",
            date: "Oct 20, 2026",
            category: "Training"
        }
    ];

    return (
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-surface-dark text-white">
            {/* Dynamic Background Elements */}
            <div className="absolute inset-0 bg-cover bg-center bg-no-repeat top-0 left-0 w-full h-full overflow-hidden z-0"
            style={{ backgroundImage: "url('/bg-image.jpeg')" }}
            >
                {/* Athletic Image Background */}
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
                    // style={{ backgroundImage: "url('/bg-image.jpeg')" }}
                ></div>

                {/* Overlays to ensure text remains readable */}
                <div className="absolute inset-0 bg-gradient-to-r from-surface-dark via-surface-dark/80 to-surface-dark/30"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-surface-dark/50 to-surface-dark"></div>

                {/* Abstract pattern overlay */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-30 mix-blend-overlay"></div>

                {/* Brand color glows */}
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary rounded-full mix-blend-screen filter blur-[100px] opacity-40 animate-pulse"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent rounded-full mix-blend-screen filter blur-[120px] opacity-20"></div>
                <div className="absolute top-[20%] right-[20%] w-[30%] h-[30%] bg-secondary rounded-full mix-blend-screen filter blur-[80px] opacity-10"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                    {/* Left Column: Association Info */}
                    <div className="lg:col-span-7 space-y-8">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-dark text-accent text-sm font-semibold tracking-wide uppercase">
                            <span className="w-2 h-2 rounded-full bg-accent animate-ping"></span>
                            The Pulse of Osun Football
                        </div>

                        <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight leading-tight">
                            Elevating <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-secondary to-primary-light">
                                Football Excellence
                            </span>
                            <br /> In Osun State
                        </h1>

                        <p className="text-lg lg:text-xl text-gray-300 max-w-2xl leading-relaxed">
                            We are dedicated to governing, developing, and promoting the beautiful game across all levels in Osun State. From grassroots to professional leagues, we nurture talent and build a stronger football community.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <Link
                                href="/about"
                                className="inline-flex justify-center items-center gap-2 bg-accent text-primary-dark font-bold px-8 py-4 rounded-full hover:bg-secondary hover:shadow-[0_0_20px_rgba(229,168,35,0.4)] transition-all duration-300 transform hover:-translate-y-1"
                            >
                                Discover Our Vision
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                            <Link
                                href="/contact"
                                className="inline-flex justify-center items-center gap-2 bg-transparent text-white border-2 border-[rgba(255,255,255,0.2)] hover:border-accent hover:text-accent font-bold px-8 py-4 rounded-full transition-all duration-300"
                            >
                                Contact Us
                            </Link>
                        </div>
                    </div>

                    {/* Right Column: News Widget */}
                    <div className="lg:col-span-5">
                        <div className="glass-dark rounded-2xl p-6 lg:p-8 shadow-2xl border border-[rgba(255,255,255,0.1)] relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary opacity-10 rounded-full filter blur-[40px] group-hover:opacity-20 transition-opacity"></div>

                            <div className="flex justify-between items-end mb-8 border-b border-[rgba(255,255,255,0.1)] pb-4">
                                <div>
                                    <h2 className="text-2xl font-bold flex items-center gap-3">
                                        Latest Updates
                                        <span className="relative flex h-3 w-3">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-3 w-3 bg-accent"></span>
                                        </span>
                                    </h2>
                                    <p className="text-sm text-gray-400 mt-1">Official news from OSFA</p>
                                </div>
                                <Link href="/blog" className="text-sm text-accent hover:text-white flex items-center gap-1 transition-colors cursor-pointer">
                                    View All <ChevronRight className="w-4 h-4" />
                                </Link>
                            </div>

                            <div className="space-y-6">
                                {latestNews.map((news) => (
                                    <Link href={`/news-${news.id}`} key={news.id} className="block group/item relative pl-4 border-l-2 border-[rgba(255,255,255,0.1)] hover:border-accent transition-colors">
                                        <span className="text-xs font-semibold text-secondary uppercase tracking-wider mb-1 block">
                                            {news.category}
                                        </span>
                                        <h3 className="text-lg font-medium text-white group-hover/item:text-accent transition-colors line-clamp-2">
                                            {news.title}
                                        </h3>
                                        <div className="flex items-center gap-2 mt-2 text-xs text-gray-400">
                                            <Calendar className="w-3.5 h-3.5" />
                                            {news.date}
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
