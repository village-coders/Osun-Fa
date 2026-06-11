"use client";

import { useState, useEffect } from "react";
import { Calendar, User, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import api from "@/lib/api";

export default function BlogContent() {
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const res = await api.get("/news");
                const formattedPosts = res.data.map((item: any) => ({
                    id: item._id,
                    slug: item.slug,
                    title: item.title,
                    excerpt: item.excerpt,
                    category: item.category || 'Official Announcement',
                    date: new Date(item.publishedAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                    }),
                    author: item.author || 'Admin',
                    imageColor: getRandomColor(item.category),
                    imageUrl: item.imageUrl
                }));
                setPosts(formattedPosts);
            } catch (error) {
                console.error("Failed to fetch news:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchNews();
    }, []);

    const getRandomColor = (category: string) => {
        const colors = [
            'bg-[#0b6e4f]', // primary
            'bg-[#e5a823]', // secondary
            'bg-[#1f2937]', // dark
            'bg-[#00ff88]', // accent
            'bg-[#013618]', // primary dark
        ];
        // Simple hash based on category name
        const index = category ? category.length % colors.length : 0;
        return colors[index];
    };

    if (loading) {
        return (
            <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-pulse">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 flex flex-col h-full">
                            <div className="h-48 w-full bg-gray-200 relative overflow-hidden">
                                <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/50 to-transparent -translate-x-full animate-[shimmer_1.4s_infinite]"></div>
                            </div>
                            <div className="p-6 flex flex-col grow gap-4">
                                <div className="flex gap-2">
                                    <div className="h-6 w-24 rounded-full bg-gray-200"></div>
                                </div>
                                <div className="space-y-3">
                                    <div className="h-6 w-11/12 rounded bg-gray-200"></div>
                                    <div className="h-6 w-4/5 rounded bg-gray-200"></div>
                                </div>
                                <div className="space-y-2 grow">
                                    <div className="h-4 w-full rounded bg-gray-200"></div>
                                    <div className="h-4 w-5/6 rounded bg-gray-200"></div>
                                    <div className="h-4 w-3/5 rounded bg-gray-200"></div>
                                </div>
                                <div className="pt-6 border-t border-gray-100 flex items-center justify-between gap-4">
                                    <div className="flex items-center gap-4 w-full">
                                        <div className="h-4 w-24 rounded bg-gray-200"></div>
                                        <div className="h-4 w-20 rounded bg-gray-200"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
    return (
        <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {posts.length > 0 ? (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map((post) => (
                            <Link href={`/blog/${post.slug || post.id}`} key={post.id} className="group">
                                <article className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 flex flex-col h-full hover:-translate-y-2">
                                    <div className={`h-48 w-full ${post.imageColor} relative overflow-hidden flex items-center justify-center`}>
                                        {post.imageUrl ? (
                                            <>
                                                <Image
                                                    src={post.imageUrl}
                                                    alt={post.title}
                                                    fill
                                                    aria-hidden="true"
                                                    className="object-cover scale-125 blur-3xl opacity-55 transition-transform duration-500 group-hover:scale-150"
                                                />
                                                <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-black/15"></div>
                                                <Image
                                                    src={post.imageUrl}
                                                    alt={post.title}
                                                    fill
                                                    className="object-contain z-10 px-6 py-4 drop-shadow-2xl transition-transform duration-500 group-hover:scale-105"
                                                />
                                            </>
                                        ) : (
                                            <>
                                                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                                                <span className="font-bold text-white/50 text-xl tracking-widest uppercase origin-center -rotate-12 scale-150 mix-blend-overlay">Osun FA</span>
                                            </>
                                        )}
                                    </div>
                                    <div className="p-6 flex flex-col grow">
                                        <div className="flex gap-2 mb-4">
                                            <span className="text-xs font-bold px-3 py-1 bg-primary/10 text-primary rounded-full uppercase tracking-wider">
                                                {post.category}
                                            </span>
                                        </div>
                                        <h2 className="text-2xl font-bold text-text-main mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                                            {post.title}
                                        </h2>
                                        <p className="text-text-muted mb-6 line-clamp-3 leading-relaxed grow">
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
                            </Link>
                        ))}
                    </div>

                    <div className="mt-16 text-center">
                        <button 
                            className="bg-primary text-white font-bold px-8 py-3 rounded-full hover:bg-primary-light transition-colors duration-300 inline-flex items-center gap-2 disabled:opacity-50"
                            onClick={() => toast.success("Loading more news...")}
                        >
                            Load More News <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </>
            ) : (
                <div className="text-center py-20">
                    <p className="text-xl text-gray-500">No news articles found. Check back later!</p>
                </div>
            )}
        </div>
    );
}
