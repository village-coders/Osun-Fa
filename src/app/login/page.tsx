import Image from "next/image";
import Link from "next/link";
import { Mail, Lock, ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Admin Login",
    description: "Secure login portal for Osun State Football Association administration.",
};

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-surface-dark py-12">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/bg-image.jpeg"
                    alt="Football Stadium Background"
                    fill
                    className="object-cover opacity-20"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-primary-dark/95 to-black/95 mix-blend-multiply"></div>
            </div>

            <div className="relative z-10 w-full max-w-5xl mx-auto px-4 flex flex-col md:flex-row shadow-2xl rounded-3xl overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10">

                {/* Brand/Info Side */}
                <div className="w-full md:w-1/2 p-8 lg:p-16 flex flex-col justify-between bg-primary-dark/80 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-accent opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary opacity-10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/4"></div>

                    <div className="relative z-10">
                        <Link href="/" className="inline-flex items-center gap-3 mb-10 transition-transform hover:scale-105">
                            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg p-1.5 border-2 border-accent/20">
                                <Image src="/osun-fa-logo.png" alt="OSFA Logo" width={40} height={40} className="object-contain" />
                            </div>
                            <span className="text-2xl font-bold text-white tracking-tight">OSFA Portal</span>
                        </Link>

                        <h1 className="text-3xl lg:text-4xl font-extrabold text-white mb-6 leading-tight">
                            Manage the Heartbeat of <span className="text-accent underline decoration-secondary decoration-4 underline-offset-4">Osun Football</span>
                        </h1>
                        <p className="text-gray-300 text-lg leading-relaxed max-w-md shadow-sm">
                            Access the unified administrative dashboard to oversee clubs, verify coaches, assign referees, and update live match fixtures.
                        </p>
                    </div>

                    <div className="relative z-10 mt-12 pt-8 border-t border-white/10">
                        <p className="text-sm font-medium text-gray-400 flex items-center gap-2">
                            <Lock className="w-4 h-4 text-accent" />
                            Protected by OSFA Secure Access <br />
                        </p>
                    </div>
                </div>

                {/* Login Form Side */}
                <div className="w-full md:w-1/2 bg-white p-8 lg:p-16 flex flex-col justify-center relative">
                    <div className="max-w-md w-full mx-auto">
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h2>
                            <p className="text-gray-500 font-medium">Please sign in to your administrator account.</p>
                        </div>

                        {/* Note: This form just navigates to /admin for demonstration */}
                        <form className="space-y-5" action="/admin">

                            {/* Email */}
                            <div className="space-y-2">
                                <label className="text-sm font-extrabold text-gray-700 block">Email Address</label>
                                <div className="relative">
                                    <Mail className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="email"
                                        placeholder="admin@osunstatefa.org.ng"
                                        className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-gray-900 placeholder-gray-400 font-medium"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <label className="text-sm font-extrabold text-gray-700 block">Password</label>
                                    <a href="#" className="text-xs font-bold text-primary hover:text-primary-dark transition-colors">Forgot Password?</a>
                                </div>
                                <div className="relative">
                                    <Lock className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="password"
                                        placeholder="••••••••"
                                        className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-gray-900 font-medium tracking-widest placeholder-gray-400"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Remember Me */}
                            <div className="flex items-center pt-2">
                                <input
                                    type="checkbox"
                                    id="remember"
                                    className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary focus:ring-2 cursor-pointer"
                                />
                                <label htmlFor="remember" className="ml-2 text-sm text-gray-600 font-medium cursor-pointer select-none">Remember me for 30 days</label>
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                className="w-full mt-4 bg-primary hover:bg-primary-dark text-white font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-0.5 group"
                            >
                                Sign In to Dashboard
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>

                        </form>

                        <div className="mt-8 pt-6 border-t border-gray-100 text-center sm:text-left text-sm text-gray-500 font-medium">
                            Having trouble logging in? <br className="sm:hidden" /> <a href="mailto:support@osunstatefa.org.ng" className="font-bold text-primary hover:underline ml-1">Contact IT Support</a>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
