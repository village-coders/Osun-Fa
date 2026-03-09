"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Save, Loader2, Image as ImageIcon } from "lucide-react";
import api from "@/lib/api";
import toast from "react-hot-toast";

function CompetitionFormContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const isEditing = !!id;

    const [loading, setLoading] = useState(isEditing);
    const [submitting, setSubmitting] = useState(false);
    const [logoFile, setLogoFile] = useState<File | null>(null);

    const [formData, setFormData] = useState({
        name: "",
        season: "",
        startDate: "",
        endDate: "",
        status: "upcoming",
        description: "",
        logoUrl: "",
    });

    useEffect(() => {
        if (isEditing) {
            const fetchCompetition = async () => {
                try {
                    const res = await api.get(`/competitions/${id}`);
                    setFormData({
                        name: res.data.name || res.data.proposedName || "",
                        season: res.data.season || res.data.seasonYear || "",
                        startDate: res.data.startDate ? new Date(res.data.startDate).toISOString().split('T')[0] : "",
                        endDate: res.data.endDate ? new Date(res.data.endDate).toISOString().split('T')[0] : "",
                        status: res.data.status || "upcoming",
                        description: res.data.description || "",
                        logoUrl: res.data.logoUrl || res.data.sponsorLogoUrl || "",
                    });
                } catch (error) {
                    toast.error("Failed to load competition");
                    router.push("/admin/competitions");
                } finally {
                    setLoading(false);
                }
            };
            fetchCompetition();
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
            if (logoFile) {
                data.append("logo", logoFile);
            }

            if (isEditing) {
                await api.put(`/competitions/${id}`, data, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                toast.success("Competition updated successfully");
            } else {
                await api.post("/competitions", data, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                toast.success("Competition created successfully");
            }
            router.push("/admin/competitions");
        } catch (error) {
            toast.error(isEditing ? "Failed to update competition" : "Failed to create competition");
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
                    onClick={() => router.push("/admin/competitions")}
                    className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5 text-gray-600" />
                </button>
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                        {isEditing ? "Edit Competition" : "Create New Competition"}
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                        {isEditing ? "Update competition details." : "Register a new tournament."}
                    </p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 md:p-8 space-y-6">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Name */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Competition Name *</label>
                            <input
                                type="text"
                                name="name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                placeholder="E.g. Osun State FA Cup"
                            />
                        </div>

                        {/* Season */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Season *</label>
                            <input
                                type="text"
                                name="season"
                                required
                                value={formData.season}
                                onChange={handleChange}
                                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                placeholder="E.g. 2024/2025"
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
                                <option value="upcoming">Upcoming</option>
                                <option value="ongoing">Ongoing</option>
                                <option value="completed">Completed</option>
                            </select>
                        </div>

                        {/* Start Date */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Start Date *</label>
                            <input
                                type="date"
                                name="startDate"
                                required
                                value={formData.startDate}
                                onChange={handleChange}
                                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                            />
                        </div>

                        {/* End Date */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">End Date *</label>
                            <input
                                type="date"
                                name="endDate"
                                required
                                value={formData.endDate}
                                onChange={handleChange}
                                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                            />
                        </div>

                        {/* Logo Upload */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                <div className="flex items-center gap-2">
                                    <ImageIcon className="w-4 h-4" />
                                    Competition Logo / Sponsor Logo
                                </div>
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    if (e.target.files && e.target.files.length > 0) {
                                        setLogoFile(e.target.files[0]);
                                    }
                                }}
                                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/5 file:text-primary hover:file:bg-primary/10 cursor-pointer"
                            />
                            {formData.logoUrl && !logoFile && (
                                <p className="text-xs text-gray-500 mt-2 truncate">Current logo: {formData.logoUrl.substring(formData.logoUrl.lastIndexOf('/') + 1)}</p>
                            )}
                        </div>

                        {/* Description */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows={4}
                                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-y"
                                placeholder="Details about this competition..."
                            />
                        </div>

                    </div>
                </div>

                <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-end gap-3">
                    <button
                        type="button"
                        onClick={() => router.push("/admin/competitions")}
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
                        {isEditing ? "Save Changes" : "Create Competition"}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default function CompetitionFormPage() {
    return (
        <Suspense fallback={<div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>}>
            <CompetitionFormContent />
        </Suspense>
    );
}
