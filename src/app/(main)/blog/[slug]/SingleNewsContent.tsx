"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Calendar, User, ArrowLeft, Clock, Share2, Loader2, ChevronRight, Home, ArrowRight } from "lucide-react";
import Link from "next/link";
import api from "@/lib/api";
import toast from "react-hot-toast";

export default function SingleNewsContent({ initialData }: { initialData?: any }) {
    const { slug } = useParams();
    const router = useRouter();
    const [news, setNews] = useState<any>(initialData || null);
    const [relatedPosts, setRelatedPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(!initialData);

    useEffect(() => {
        const fetchNewsItem = async () => {
            if (initialData) {
                // If we have initialData, also fetch related posts
                fetchRelatedPosts(initialData._id);
                return;
            }
            try {
                const res = await api.get(`/news/${slug}`);
                setNews(res.data);
                fetchRelatedPosts(res.data._id);
            } catch (error) {
                console.error("Failed to fetch news item:", error);
            } finally {
                setLoading(false);
            }
        };

        const fetchRelatedPosts = async (currentId: string) => {
            try {
                const res = await api.get("/news");
                // Get 3 recent posts, excluding current
                const filtered = res.data
                    .filter((item: any) => item._id !== currentId)
                    .slice(0, 3);
                setRelatedPosts(filtered);
            } catch (error) {
                console.error("Failed to fetch related news:", error);
            }
        };

        if (slug) fetchNewsItem();
    }, [slug, initialData]);

    const handleShare = async () => {
        const shareData = {
            title: news?.title,
            text: news?.excerpt,
            url: typeof window !== 'undefined' ? window.location.href : '',
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                await navigator.clipboard.writeText(window.location.href);
                toast.success("Link copied to clipboard!");
            }
        } catch (error) {
            if ((error as Error).name !== 'AbortError') {
                console.error("Error sharing:", error);
            }
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen pt-40 pb-20 flex justify-center items-center bg-gray-50">
                <Loader2 className="w-12 h-12 animate-spin text-primary" />
            </div>
        );
    }

    if (!news) {
        return (
            <div className="min-h-screen pt-40 pb-20 flex flex-col justify-center items-center bg-gray-50">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">News not found</h1>
                <Link href="/blog" className="text-primary hover:underline flex items-center gap-2">
                    <ArrowLeft className="w-4 h-4" /> Back to Blog
                </Link>
            </div>
        );
    }

    const formattedDate = new Date(news.publishedAt).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });

    return (
        <div className="bg-gray-50 min-h-screen pt-36 pb-20">
            {/* Breadcrumbs */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
                <nav className="flex items-center gap-2 text-sm text-gray-500 overflow-x-auto whitespace-nowrap scrollbar-hide">
                    <Link href="/" className="hover:text-primary flex items-center gap-1 transition-colors">
                        <Home className="w-3.5 h-3.5" /> Home
                    </Link>
                    <ChevronRight className="w-4 h-4 shrink-0" />
                    <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
                    <ChevronRight className="w-4 h-4 shrink-0" />
                    <span className="text-gray-900 font-medium truncate max-w-[200px] md:max-w-none">{news.title}</span>
                </nav>
            </div>

            <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 mb-10">
                    {news.imageUrl && (
                        <div className="w-full aspect-video relative">
                            <img
                                src={news.imageUrl}
                                alt={news.title}
                                className="w-full h-full object-contain"
                            />
                            <div className="absolute top-6 left-6">
                                <span className="glass-light text-primary font-bold px-4 py-2 rounded-full text-xs uppercase tracking-wider backdrop-blur-md border border-white/20">
                                    {news.category || 'Official Announcement'}
                                </span>
                            </div>
                        </div>
                    )}

                    <div className="p-8 md:p-12">
                        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-8 leading-tight">
                            {news.title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 border-b border-gray-100 pb-8 mb-8">
                            <div className="flex items-center gap-2.5 bg-gray-50 px-3 py-1.5 rounded-full">
                                <User className="w-4 h-4 text-primary" />
                                <span className="font-medium text-gray-700">{news.author || 'Admin'}</span>
                            </div>
                            <div className="flex items-center gap-2.5">
                                <Calendar className="w-4 h-4 text-secondary" />
                                <span>{formattedDate}</span>
                            </div>
                            <div className="flex items-center gap-2.5">
                                <Clock className="w-4 h-4 text-secondary" />
                                <span>5 min read</span>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed font-normal">
                            {news.content?.split('\n').map((paragraph: string, idx: number) => (
                                <p key={idx} className="mb-6">{paragraph}</p>
                            )) || <p>{news.excerpt}</p>}
                        </div>

                        {/* Footer Controls */}
                        <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-6">
                            <button
                                onClick={() => router.push('/blog')}
                                className="flex items-center gap-2.5 text-gray-600 hover:text-primary font-bold transition-all duration-300 transform hover:-translate-x-1"
                            >
                                <ArrowLeft className="w-5 h-5" />
                                Back to All News
                            </button>

                            <div className="flex items-center gap-4">
                                <span className="text-sm font-medium text-gray-400">Share:</span>
                                <button
                                    onClick={handleShare}
                                    className="p-2.5 rounded-full bg-gray-50 text-gray-600 hover:bg-primary/10 hover:text-primary transition-all overflow-hidden relative group/share"
                                    title="Share this article"
                                >
                                    <Share2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </article>

            {/* Related Articles Section */}
            {relatedPosts.length > 0 && (
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
                    <div className="flex items-center justify-between mb-10">
                        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 flex items-center gap-3">
                            <span className="w-2 h-8 bg-primary rounded-full"></span>
                            Related Articles
                        </h2>
                        <Link href="/blog" className="text-sm font-bold text-primary hover:text-primary-dark transition-colors flex items-center gap-1">
                            View All <ChevronRight className="w-4 h-4" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {relatedPosts.map((post: any) => (
                            <Link 
                                key={post._id} 
                                href={`/blog/${post.slug || post._id}`}
                                className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
                            >
                                <div className="aspect-[16/10] overflow-hidden relative">
                                    <img 
                                        src={post.imageUrl || '/osun-fa-logo.png'} 
                                        alt={post.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-black uppercase text-primary border border-white/20">
                                            {post.category || 'News'}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-6 flex flex-col flex-grow">
                                    <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 mb-3 uppercase tracking-wider">
                                        <Calendar className="w-3 h-3" />
                                        {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                                        {post.title}
                                    </h3>
                                    <p className="text-sm text-gray-500 line-clamp-2 mb-6 flex-grow">
                                        {post.excerpt}
                                    </p>
                                    <div className="flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-widest mt-auto">
                                        Read More <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
