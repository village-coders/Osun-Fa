import { Calendar, User, ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Latest News & Blog | Official Announcements",
    description: "Stay up to date with the latest football news, referee developments, match reviews, and official announcements from the Osun State Football Association.",
    openGraph: {
        title: "Official News & Blog | Osun State FA",
        description: "The latest news, announcements, and stories from the Osun State Football Association.",
        url: "https://osunstatefa.org.ng/blog",
    }
};

export default function BlogPage() {
    const posts = [
        {
            id: 1,
            title: "Osun FA Cup Registration Extended to November 5th",
            excerpt: "Due to overwhelming requests from clubs across the state, the registration deadline for the 2026/2027 FA Cup has been pushed back.",
            category: "Official Announcement",
            date: "Oct 26, 2026",
            author: "Media Dept",
            imageColor: "bg-[#0b6e4f]" // primary
        },
        {
            id: 2,
            title: "Grassroots Coaching Clinic Kicks Off in Ilesa",
            excerpt: "Over 50 grassroots coaches have converged in Ilesa for the first phase of the C-License equivalent tactical program.",
            category: "Development",
            date: "Oct 22, 2026",
            author: "Technical Dept",
            imageColor: "bg-[#e5a823]" // secondary
        },
        {
            id: 3,
            title: "State League Mid-Season Review: Who's on Top?",
            excerpt: "As we hit the halfway mark of the State Premier League, we look at the standout teams, surprise packages, and top scorers.",
            category: "League Updates",
            date: "Oct 18, 2026",
            author: "League Admin",
            imageColor: "bg-[#1f2937]"
        },
        {
            id: 4,
            title: "Referees Complete Elite Fitness Test ahead of Finals",
            excerpt: "30 state-licensed referees participated in the rigorous quarterly fitness assessment required for officiating top-flight state matches.",
            category: "Refereeing",
            date: "Oct 15, 2026",
            author: "Referees Council",
            imageColor: "bg-[#00ff88]" // accent
        },
        {
            id: 5,
            title: "New Partnership Announced with Local Sports Brands",
            excerpt: "OSFA is proud to announce a historic kit partnership set to provide subsidized playing gear to all registered grassroots clubs.",
            category: "Partnerships",
            date: "Oct 10, 2026",
            author: "Commercial Dept",
            imageColor: "bg-[#013618]" // primary dark
        },
        {
            id: 6,
            title: "Women's Football Initiative Reaches Over 20 Schools",
            excerpt: "The catch-them-young women's football drive has seen incredible success in its first month of deployment.",
            category: "Women's Football",
            date: "Oct 5, 2026",
            author: "Development Team",
            imageColor: "bg-[#131815]"
        }
    ];

    return (
        <div className="bg-background min-h-screen pt-20">
            {/* Page Header */}
            <div className="bg-surface-dark py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden border-b border-white/5">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
                <div className="max-w-7xl mx-auto text-center relative z-10">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
                        Official <span className="text-accent">Blog</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        The latest news, announcements, and stories from the Osun State Football Association.
                    </p>
                </div>
            </div>

            <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post) => (
                        <article key={post.id} className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 group flex flex-col h-full hover:-translate-y-2">
                            <div className={`h-48 w-full ${post.imageColor} relative overflow-hidden flex items-center justify-center`}>
                                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                                <span className="font-bold text-white/50 text-xl tracking-widest uppercase origin-center -rotate-12 scale-150 mix-blend-overlay">Osun FA</span>
                            </div>
                            <div className="p-6 flex flex-col flex-grow">
                                <div className="flex gap-2 mb-4">
                                    <span className="text-xs font-bold px-3 py-1 bg-primary/10 text-primary rounded-full uppercase tracking-wider">
                                        {post.category}
                                    </span>
                                </div>
                                <h2 className="text-2xl font-bold text-text-main mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                                    {post.title}
                                </h2>
                                <p className="text-text-muted mb-6 line-clamp-3 leading-relaxed flex-grow">
                                    {post.excerpt}
                                </p>
                                <div className="flex items-center justify-between text-sm text-gray-500 pt-6 border-t border-gray-100">
                                    <div className="flex items-center gap-4">
                                        <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-secondary" /> {post.date}</span>
                                        <span className="flex items-center gap-1.5"><User className="w-4 h-4 text-secondary" /> {post.author}</span>
                                    </div>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <button className="bg-primary text-white font-bold px-8 py-3 rounded-full hover:bg-primary-light transition-colors duration-300 inline-flex items-center gap-2">
                        Load More News <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}
