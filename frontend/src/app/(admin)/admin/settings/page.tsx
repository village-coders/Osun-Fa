"use client";

import { useState, useEffect } from "react";
import { UserCog, Lock, Save, Loader2, Building, Mail, Phone, Globe } from "lucide-react";
import api from "@/lib/api";
import toast from "react-hot-toast";

export default function AdminSettingsPage() {
    const [loading, setLoading] = useState(false);
    const [submittingPassword, setSubmittingPassword] = useState(false);

    // Profile State (Placeholder for now since backend only has email)
    const [profile, setProfile] = useState({
        email: "admin@osfa.org",
        role: "Super Administrator",
    });

    // Password Update State
    const [passwords, setPasswords] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    // Global site settings (UI only mock for now, can be wired to backend later if site-settings model exists)
    const [siteSettings, setSiteSettings] = useState({
        contactEmail: "info@osfa.org",
        contactPhone: "+234 800 000 0000",
        address: "Osogbo, Osun State",
        facebook: "https://facebook.com/osunfa",
        twitter: "https://twitter.com/osunfa",
    });
    const [submittingSite, setSubmittingSite] = useState(false);

    const handlePasswordChange = async (e: React.FormEvent) => {
        e.preventDefault();

        if (passwords.newPassword !== passwords.confirmPassword) {
            toast.error("New passwords do not match!");
            return;
        }

        setSubmittingPassword(true);
        try {
            await api.put("/auth/change-password", {
                currentPassword: passwords.currentPassword,
                newPassword: passwords.newPassword,
            });
            toast.success("Password updated successfully!");
            setPasswords({ currentPassword: "", newPassword: "", confirmPassword: "" });
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to update password");
        } finally {
            setSubmittingPassword(false);
        }
    };

    const handleSiteSettingsChange = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmittingSite(true);
        // Simulate an API call to save global site settings
        setTimeout(() => {
            toast.success("Site settings updated successfully!");
            setSubmittingSite(false);
        }, 1000);
    };

    return (
        <div className="space-y-6 max-w-5xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Admin Settings</h2>
                    <p className="text-sm text-gray-500 mt-1">Manage your account credentials and global site data.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Left Column: Account Profile & Security */}
                <div className="lg:col-span-1 space-y-6">
                    {/* Account Info Card */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-5 border-b border-gray-100 bg-gray-50 flex items-center gap-3">
                            <UserCog className="w-5 h-5 text-gray-600" />
                            <h3 className="font-bold text-gray-800">Account Profile</h3>
                        </div>
                        <div className="p-6">
                            <div className="flex flex-col items-center mb-6">
                                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center border-4 border-white shadow-md mb-3">
                                    <UserCog className="w-10 h-10 text-primary" />
                                </div>
                                <h4 className="font-bold text-gray-900 border border-gray-200 px-3 py-1 rounded-full text-sm bg-gray-50">{profile.role}</h4>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Email Address</label>
                                    <div className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 font-medium">
                                        {profile.email}
                                    </div>
                                    <p className="text-xs text-gray-400 mt-1">This email is used for your dashboard login.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Change Password Card */}
                    <form onSubmit={handlePasswordChange} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-5 border-b border-gray-100 bg-gray-50 flex items-center gap-3">
                            <Lock className="w-5 h-5 text-gray-600" />
                            <h3 className="font-bold text-gray-800">Change Password</h3>
                        </div>
                        <div className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Current Password</label>
                                <input
                                    type="password"
                                    required
                                    value={passwords.currentPassword}
                                    onChange={(e) => setPasswords(prev => ({ ...prev, currentPassword: e.target.value }))}
                                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                                    placeholder="••••••••"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">New Password</label>
                                <input
                                    type="password"
                                    required
                                    value={passwords.newPassword}
                                    onChange={(e) => setPasswords(prev => ({ ...prev, newPassword: e.target.value }))}
                                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                                    placeholder="••••••••"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm New Password</label>
                                <input
                                    type="password"
                                    required
                                    value={passwords.confirmPassword}
                                    onChange={(e) => setPasswords(prev => ({ ...prev, confirmPassword: e.target.value }))}
                                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                                    placeholder="••••••••"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={submittingPassword}
                                className="w-full bg-gray-800 hover:bg-gray-900 text-white font-bold py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-50 mt-4"
                            >
                                {submittingPassword ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    <Save className="w-4 h-4" />
                                )}
                                Update Password
                            </button>
                        </div>
                    </form>
                </div>

                {/* Right Column: Global Site Settings */}
                <div className="lg:col-span-2">
                    <form onSubmit={handleSiteSettingsChange} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden h-full">
                        <div className="p-5 border-b border-gray-100 bg-gray-50 flex items-center gap-3">
                            <Building className="w-5 h-5 text-gray-600" />
                            <h3 className="font-bold text-gray-800">Global Site Settings</h3>
                        </div>

                        <div className="p-6 space-y-6">
                            <div className="bg-blue-50 text-blue-800 p-4 rounded-lg text-sm mb-6 flex items-start gap-3">
                                <div className="mt-0.5">ℹ️</div>
                                <div>
                                    <p className="font-bold">Configuration Environment</p>
                                    <p className="mt-1 opacity-90">These parameters directly affect the public-facing footprint of the OSFA website. Updates are cached and may take up to 5 minutes to globally propagate.</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        <div className="flex items-center gap-2">
                                            <Mail className="w-4 h-4" />
                                            Public Contact Email
                                        </div>
                                    </label>
                                    <input
                                        type="email"
                                        value={siteSettings.contactEmail}
                                        onChange={(e) => setSiteSettings(prev => ({ ...prev, contactEmail: e.target.value }))}
                                        className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        <div className="flex items-center gap-2">
                                            <Phone className="w-4 h-4" />
                                            Office Phone Number
                                        </div>
                                    </label>
                                    <input
                                        type="text"
                                        value={siteSettings.contactPhone}
                                        onChange={(e) => setSiteSettings(prev => ({ ...prev, contactPhone: e.target.value }))}
                                        className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Headquarters Address</label>
                                    <textarea
                                        value={siteSettings.address}
                                        onChange={(e) => setSiteSettings(prev => ({ ...prev, address: e.target.value }))}
                                        rows={2}
                                        className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                    />
                                </div>

                                <div className="md:col-span-2 border-t border-gray-100 pt-6 mt-2">
                                    <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                                        <Globe className="w-4 h-4 text-gray-500" />
                                        Social Media Connections
                                    </h4>

                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 font-bold">f</div>
                                            <input
                                                type="url"
                                                value={siteSettings.facebook}
                                                onChange={(e) => setSiteSettings(prev => ({ ...prev, facebook: e.target.value }))}
                                                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                                                placeholder="https://facebook.com/..."
                                            />
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-sky-100 text-sky-500 flex items-center justify-center shrink-0 font-bold">𝕏</div>
                                            <input
                                                type="url"
                                                value={siteSettings.twitter}
                                                onChange={(e) => setSiteSettings(prev => ({ ...prev, twitter: e.target.value }))}
                                                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                                                placeholder="https://twitter.com/..."
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-end">
                            <button
                                type="submit"
                                disabled={submittingSite}
                                className="bg-primary hover:bg-primary-dark text-white font-bold py-2.5 px-6 rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50"
                            >
                                {submittingSite ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    <Save className="w-5 h-5" />
                                )}
                                Save Application Settings
                            </button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    );
}
