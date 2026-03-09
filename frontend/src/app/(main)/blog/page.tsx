import type { Metadata } from "next";
import BlogContent from "./BlogContent";

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

            <BlogContent />
        </div>
    );
}
