"use client";

import { Save, Shield, User, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import userApi from "@/lib/api";
import toast from "react-hot-toast";

export default function RefereeSettingsPage() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [savingPassword, setSavingPassword] = useState(false);

    const [formData, setFormData] = useState({
        surname: "",
        firstName: "",
        email: "",
        phoneNumber: "",
        refereeGrade: "Grade 2"
    });

    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await userApi.get('/portal-auth/me');
                const user = res.data;
                setFormData({
                    surname: user.surname || "",
                    firstName: user.firstName || "",
                    email: user.email || "",
                    phoneNumber: user.phoneNumber || "",
                    refereeGrade: user.refereeGrade || "Grade 2"
                });
            } catch (error) {
                toast.error("Failed to load profile data");
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleUpdateProfile = async () => {
        setSaving(true);
        try {
            await userApi.put('/portal-auth/settings', {
                surname: formData.surname,
                firstName: formData.firstName,
                phoneNumber: formData.phoneNumber,
                refereeGrade: formData.refereeGrade
            });
            toast.success("Profile updated successfully");
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to update profile");
        } finally {
            setSaving(false);
        }
    };

    const handleUpdatePassword = async () => {
        if (!passwordData.currentPassword || !passwordData.newPassword) {
            toast.error("Please fill in all password fields");
            return;
        }
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            toast.error("New passwords do not match");
            return;
        }

        setSavingPassword(true);
        try {
            await userApi.put('/portal-auth/settings', {
                currentPassword: passwordData.currentPassword,
                newPassword: passwordData.newPassword
            });
            toast.success("Password updated successfully");
            setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to update password");
        } finally {
            setSavingPassword(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center py-20">
                <Loader2 className="w-10 h-10 animate-spin text-accent" />
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Referee Settings</h1>
                <p className="text-gray-400">Manage your officiating profile, fitness records, and security.</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden divide-y divide-white/10">

                {/* Profile Information */}
                <div className="p-6 md:p-8">
                    <div className="flex items-center gap-3 mb-6">
                        <User className="text-accent" />
                        <h2 className="text-xl font-bold text-white">Profile Information</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-400">Surname</label>
                            <input
                                type="text"
                                name="surname"
                                value={formData.surname}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-accent focus:border-accent"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-400">First Name</label>
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-accent focus:border-accent"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-400">Email Address</label>
                            <input
                                type="email"
                                disabled
                                value={formData.email}
                                className="w-full px-4 py-2.5 bg-black/20 border border-white/5 rounded-xl text-gray-500 cursor-not-allowed"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-400">Phone Number</label>
                            <input
                                type="tel"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-accent focus:border-accent"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-400">Referee Grade</label>
                            <select
                                name="refereeGrade"
                                value={formData.refereeGrade}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-accent focus:border-accent appearance-none"
                            >
                                <option className="text-black" value="FIFA Badge">FIFA Badge</option>
                                <option className="text-black" value="Grade 1">Grade 1</option>
                                <option className="text-black" value="Grade 2">Grade 2</option>
                                <option className="text-black" value="Grade 3">Grade 3</option>
                                <option className="text-black" value="Referee-in-Training">Referee-in-Training</option>
                            </select>
                        </div>
                    </div>
                    <div className="mt-6 flex justify-end">
                        <button
                            onClick={handleUpdateProfile}
                            disabled={saving}
                            className="bg-accent text-primary-dark font-bold px-6 py-2.5 rounded-xl hover:-translate-y-0.5 transition-transform flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                            Save Profile
                        </button>
                    </div>
                </div>

                {/* Password Change */}
                <div className="p-6 md:p-8">
                    <div className="flex items-center gap-3 mb-6">
                        <Shield className="text-accent" />
                        <h2 className="text-xl font-bold text-white">Security & Password</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-400">Current Password</label>
                            <input
                                type="password"
                                name="currentPassword"
                                value={passwordData.currentPassword}
                                onChange={handlePasswordChange}
                                placeholder="••••••••"
                                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-accent focus:border-accent"
                            />
                        </div>
                        <div className="hidden md:block"></div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-400">New Password</label>
                            <input
                                type="password"
                                name="newPassword"
                                value={passwordData.newPassword}
                                onChange={handlePasswordChange}
                                placeholder="••••••••"
                                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-accent focus:border-accent"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-400">Confirm New Password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={passwordData.confirmPassword}
                                onChange={handlePasswordChange}
                                placeholder="••••••••"
                                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-accent focus:border-accent"
                            />
                        </div>
                    </div>
                    <div className="mt-6 flex justify-end">
                        <button
                            onClick={handleUpdatePassword}
                            disabled={savingPassword}
                            className="bg-white/10 text-white hover:bg-white/20 font-bold px-6 py-2.5 rounded-xl transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {savingPassword ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                            Update Password
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
