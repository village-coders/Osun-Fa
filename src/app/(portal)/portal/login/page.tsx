"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Mail, Lock, LogIn, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import userApi from "@/lib/api";

export default function PortalLoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("team");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await userApi.post("/portal-auth/login", { email, password, role });
            console.log(res.data);
            if (res.data.token) {
                Cookies.set("portalToken", res.data.token, { expires: 30 });
                Cookies.set("portalRole", res.data.user.role, { expires: 30 });
                toast.success("Login successful!");


                // Route to correct dashboard based on role
                switch (res.data.user.role) {
                    case "team":
                        router.push("/portal/team");
                        break;
                    case "coach":
                        router.push("/portal/coach");
                        break;
                    case "referee":
                        router.push("/portal/referee");
                        break;
                    default:
                        router.push("/");
                }
                router.refresh();
            }
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Invalid credentials. Have you verified your email?");
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-surface-dark py-12 px-4">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/bg-image.jpeg"
                    alt="Football Background"
                    fill
                    className="object-cover opacity-20"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-primary-dark/95 to-black/95 mix-blend-multiply"></div>
            </div>

            <div className="relative z-10 w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col">

                <div className="p-8 pb-0 flex flex-col items-center">
                    <Link href="/" className="inline-flex flex-col items-center gap-4 mb-6 transition-transform hover:scale-105">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg p-2 border-2 border-accent/20">
                            <Image src="/osun-fa-logo.png" alt="OSFA Logo" width={56} height={56} className="object-contain" />
                        </div>
                        <h1 className="text-2xl font-bold text-white tracking-tight text-center">
                            Portal Login
                        </h1>
                    </Link>
                    <p className="text-gray-400 text-center text-sm">
                        Sign in to access your Club, Coach, or Referee dashboard.
                    </p>
                </div>

                <div className="p-8">
                    <form className="space-y-5" onSubmit={handleLogin}>
                        {/* Role Selection */}
                        <div className="space-y-1.5">
                            <label className="text-sm font-bold text-gray-300 block">I am logging in as a...</label>
                            <select
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all text-white font-medium appearance-none"
                                disabled={loading}
                            >
                                <option value="team" className="text-gray-900">Club / Team</option>
                                <option value="coach" className="text-gray-900">Head Coach</option>
                                <option value="referee" className="text-gray-900">Referee</option>
                            </select>
                        </div>

                        {/* Email */}
                        <div className="space-y-1.5">
                            <label className="text-sm font-bold text-gray-300 block">Email Address</label>
                            <div className="relative">
                                <Mail className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@example.com"
                                    className="w-full pl-11 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all text-white placeholder-gray-500 font-medium"
                                    required
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="space-y-1.5 pt-2">
                            <div className="flex justify-between items-center">
                                <label className="text-sm font-bold text-gray-300 block">Password</label>
                            </div>
                            <div className="relative">
                                <Lock className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full pl-11 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all text-white placeholder-gray-500 tracking-widest"
                                    required
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full !mt-8 bg-accent hover:bg-secondary text-primary-dark font-extrabold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0 cursor-pointer"
                        >
                            {loading ? (
                                <><Loader2 className="w-5 h-5 animate-spin" /> Authenticating...</>
                            ) : (
                                <><LogIn className="w-5 h-5" /> Sign In to Dashboard</>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-white/10 text-center text-sm text-gray-400 font-medium">
                        Don't have a portal account? <Link href="/portal/register" className="font-bold text-accent hover:underline ml-1">Create Account</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
