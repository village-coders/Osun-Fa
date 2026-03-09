"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Mail, Lock, User, CheckCircle2, Loader2, Users, ArrowLeft } from "lucide-react";
import userApi from "@/lib/api";
import toast from "react-hot-toast";

export default function PortalRegisterPage() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [step, setStep] = useState(1);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        role: "",
    });

    const roles = [
        { id: "team", label: "Club / Team", icon: Users, desc: "Register a football club to manage players and matches" },
        { id: "coach", label: "Head Coach", icon: User, desc: "Register as an independent certified coach" },
        { id: "referee", label: "Referee", icon: User, desc: "Register as an official match referee" },
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }
        if (formData.password.length < 6) {
            toast.error("Password must be at least 6 characters long");
            return;
        }

        setLoading(true);
        try {
            await userApi.post("/portal-auth/register", {
                email: formData.email,
                password: formData.password,
                role: formData.role
            });
            setSuccess(true);
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Registration failed. Try again.");
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-surface-dark py-12 px-4">
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 max-w-lg w-full text-center relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-accent opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 relative z-10 border-4 border-green-500/30">
                        <CheckCircle2 className="w-10 h-10 text-green-500" />
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-4 relative z-10">Check Your Email</h2>
                    <p className="text-gray-300 mb-8 relative z-10 leading-relaxed text-lg">
                        We've sent a verification link to <span className="text-white font-bold">{formData.email}</span>. Please check your inbox and click the link to verify your account and complete your {formData.role} profile.
                    </p>
                    <Link href="/" className="inline-block bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-8 rounded-xl transition-colors relative z-10 border border-white/10">
                        Return to Home
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-surface-dark py-12">
            <div className="relative z-10 w-full max-w-5xl mx-auto px-4 flex flex-col md:flex-row shadow-2xl rounded-3xl overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10">

                {/* Left Side Info */}
                <div className="w-full md:w-[45%] p-8 lg:p-14 flex flex-col justify-between bg-primary-dark/80 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-64 h-64 bg-accent opacity-10 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2"></div>

                    <div className="relative z-10">
                        <Link href="/" className="inline-flex items-center gap-3 mb-10 transition-transform hover:scale-105">
                            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg p-1.5 border-2 border-accent/20">
                                <Image src="/osun-fa-logo.png" alt="OSFA Logo" width={40} height={40} className="object-contain" />
                            </div>
                            <span className="text-2xl font-bold text-white tracking-tight">OSFA Portal</span>
                        </Link>

                        <h1 className="text-3xl lg:text-4xl font-extrabold text-white mb-6 leading-tight">
                            Start Your Journey with <span className="text-accent">OSFA</span>
                        </h1>
                        <p className="text-gray-300 text-lg leading-relaxed shadow-sm">
                            Create your secure portal account to register your club, apply as a coach, or become an official football referee.
                        </p>
                    </div>

                    <div className="mt-12 pt-8 border-t border-white/10 relative z-10">
                        <p className="text-sm font-medium text-gray-400">
                            Already have an account? <Link href="/portal/login" className="text-accent hover:underline font-bold ml-1">Sign In instead</Link>
                        </p>
                    </div>
                </div>

                {/* Right Side Form */}
                <div className="w-full md:w-[55%] bg-white p-8 lg:p-14 flex flex-col justify-center">
                    <div className="max-w-md w-full mx-auto">
                        <h2 className="text-2xl font-bold text-gray-900 mb-8">Create Portal Account</h2>

                        <form className="space-y-6" onSubmit={handleSubmit}>
                            {step === 1 ? (
                                <div className="space-y-3">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block">I am registering as a...</label>
                                    <div className="grid grid-cols-1 gap-3">
                                        {roles.map((role) => (
                                            <button
                                                type="button"
                                                key={role.id}
                                                onClick={() => {
                                                    setFormData(prev => ({ ...prev, role: role.id }));
                                                    setStep(2);
                                                }}
                                                className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all border-gray-100 hover:border-gray-200 bg-white hover:bg-gray-50 hover:shadow-md cursor-pointer`}
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className={`p-2 rounded-lg bg-gray-100 text-gray-500`}>
                                                        <role.icon className="w-5 h-5" />
                                                    </div>
                                                    <div className="text-left">
                                                        <p className={`font-bold text-gray-800`}>{role.label}</p>
                                                        <p className="text-xs text-gray-500 font-medium mt-0.5">{role.desc}</p>
                                                    </div>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    <button
                                        type="button"
                                        onClick={() => setStep(1)}
                                        className="text-sm font-bold text-gray-500 hover:text-primary flex items-center gap-1.5 transition-colors"
                                    >
                                        <ArrowLeft className="w-4 h-4" /> Back to roles
                                    </button>

                                    {/* Selected Role Summary */}
                                    <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 flex items-center gap-3">
                                        <div className="p-2 bg-primary text-white rounded-lg">
                                            {roles.find(r => r.id === formData.role)?.icon && (() => {
                                                const Icon = roles.find(r => r.id === formData.role)!.icon;
                                                return <Icon className="w-5 h-5" />;
                                            })()}
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-primary uppercase tracking-wider">Selected Role</p>
                                            <p className="font-bold text-gray-900">{roles.find(r => r.id === formData.role)?.label}</p>
                                        </div>
                                    </div>

                                    {/* Email */}
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-bold text-gray-700 block">Email Address</label>
                                        <div className="relative">
                                            <Mail className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                                            <input
                                                type="email"
                                                value={formData.email}
                                                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                                placeholder="you@example.com"
                                                className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-gray-900 font-medium"
                                                required
                                                disabled={loading}
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {/* Password */}
                                        <div className="space-y-1.5">
                                            <label className="text-sm font-bold text-gray-700 block">Password</label>
                                            <div className="relative">
                                                <Lock className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                                                <input
                                                    type="password"
                                                    value={formData.password}
                                                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                                                    placeholder="••••••••"
                                                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-gray-900"
                                                    required minLength={6}
                                                    disabled={loading}
                                                />
                                            </div>
                                        </div>

                                        {/* Confirm Pwd */}
                                        <div className="space-y-1.5">
                                            <label className="text-sm font-bold text-gray-700 block">Confirm</label>
                                            <div className="relative">
                                                <Lock className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                                                <input
                                                    type="password"
                                                    value={formData.confirmPassword}
                                                    onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                                                    placeholder="••••••••"
                                                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-gray-900"
                                                    required minLength={6}
                                                    disabled={loading}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full mt-8 bg-primary hover:bg-primary-dark text-white font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary/30 hover:shadow-primary/50 disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        {loading ? (
                                            <><Loader2 className="w-5 h-5 animate-spin" /> Creating Account...</>
                                        ) : "Create Account & Send Link"}
                                    </button>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
