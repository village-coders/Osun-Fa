"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Save, Loader2, Image as ImageIcon } from "lucide-react";
import api from "@/lib/api";
import toast from "react-hot-toast";

function NewsFormContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const isEditing = !!id;

    const [loading, setLoading] = useState(isEditing);
    const [submitting, setSubmitting] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);

    const [formData, setFormData] = useState({
        title: "",
        excerpt: "",
        content: "",
        imageUrl: "",
        author: "Admin",
        status: "published",
        category: "Official Announcement",
    });

    useEffect(() => {
        if (isEditing) {
            const fetchArticle = async () => {
                try {
                    const res = await api.get(`/news/${id}`);
                    setFormData({
                        title: res.data.title || "",
                        excerpt: res.data.excerpt || "",
                        content: res.data.content || "",
                        imageUrl: res.data.imageUrl || "",
                        author: res.data.author || "Admin",
                        status: res.data.status || "published",
                        category: res.data.category || "Official Announcement",
                    });
                } catch (error) {
                    toast.error("Failed to load article");
                    router.push("/admin/news");
                } finally {
                    setLoading(false);
                }
            };
            fetchArticle();
        }
    }, [id, router]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const data = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                data.append(key, value);
            });
            if (imageFile) {
                data.append("image", imageFile);
            }

            if (isEditing) {
                await api.put(`/news/${id}`, data, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                toast.success("Article updated successfully");
            } else {
                await api.post("/news", data, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                toast.success("Article created successfully");
            }
            router.push("/admin/news");
        } catch (error) {
            toast.error(isEditing ? "Failed to update article" : "Failed to create article");
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center gap-4">
                <button
                    onClick={() => router.push("/admin/news")}
                    className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5 text-gray-600" />
                </button>
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                        {isEditing ? "Edit Article" : "Create New Article"}
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                        {isEditing ? "Update the details of this news article." : "Publish a new story or announcement."}
                    </p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 md:p-8 space-y-6">

                    {/* Title */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Article Title *</label>
                        <input
                            type="text"
                            name="title"
                            required
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                            placeholder="Enter the main headline..."
                        />
                    </div>

                    {/* Excerpt */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Short Excerpt *</label>
                        <textarea
                            name="excerpt"
                            required
                            value={formData.excerpt}
                            onChange={handleChange}
                            rows={2}
                            className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                            placeholder="A brief summary of the article..."
                        />
                    </div>

                    {/* Content */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Full Content *</label>
                        <textarea
                            name="content"
                            required
                            value={formData.content}
                            onChange={handleChange}
                            rows={12}
                            className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-y"
                            placeholder="Write the full article content here..."
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Image Upload */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                <div className="flex items-center gap-2">
                                    <ImageIcon className="w-4 h-4" />
                                    Featured Image
                                </div>
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    if (e.target.files && e.target.files.length > 0) {
                                        setImageFile(e.target.files[0]);
                                    }
                                }}
                                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/5 file:text-primary hover:file:bg-primary/10 cursor-pointer"
                            />
                            {formData.imageUrl && !imageFile && (
                                <p className="text-xs text-gray-500 mt-2 truncate">Current image: {formData.imageUrl.substring(formData.imageUrl.lastIndexOf('/') + 1)}</p>
                            )}
                        </div>

                        {/* Author */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Author</label>
                            <input
                                type="text"
                                name="author"
                                value={formData.author}
                                onChange={handleChange}
                                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                placeholder="Author name"
                            />
                        </div>

                        {/* Status */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                            >
                                <option value="published">Published</option>
                                <option value="draft">Draft</option>
                            </select>
                        </div>

                        {/* Category */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                            >
                                <option value="Official Announcement">Official Announcement</option>
                                <option value="Development">Development</option>
                                <option value="League Updates">League Updates</option>
                                <option value="Refereeing">Refereeing</option>
                                <option value="Partnerships">Partnerships</option>
                                <option value="Women's Football">Women's Football</option>
                                <option value="Competition">Competition</option>
                                <option value="Training">Training</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-end gap-3">
                    <button
                        type="button"
                        onClick={() => router.push("/admin/news")}
                        className="px-5 py-2.5 text-sm font-semibold text-gray-600 hover:text-gray-800 transition-colors"
                        disabled={submitting}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={submitting}
                        className="bg-primary hover:bg-primary-dark text-white font-bold py-2.5 px-6 rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50"
                    >
                        {submitting ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <Save className="w-5 h-5" />
                        )}
                        {isEditing ? "Save Changes" : "Publish Article"}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default function NewsFormPage() {
    return (
        <Suspense fallback={<div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>}>
            <NewsFormContent />
        </Suspense>
    );
}
