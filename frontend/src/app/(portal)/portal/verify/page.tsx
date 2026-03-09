"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Loader2, CheckCircle2, XCircle, ArrowRight } from "lucide-react";
import api from "@/lib/api";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

function VerifyContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const [status, setStatus] = useState<"verifying" | "success" | "error">("verifying");
    const [errorMessage, setErrorMessage] = useState("");
    const [userRole, setUserRole] = useState<string>("");

    // Fix: Use useEffect for side effects and conditional logic
    useEffect(() => {
        const statusParam = searchParams.get("status");
        const tokenParam = searchParams.get("token");

        if (statusParam === "success") {
            setStatus("success");
            toast.success("Email verified successfully! Please log in to complete your profile.");
        } else if (statusParam !== "success" && !tokenParam) {
            setStatus("error");
            setErrorMessage("No verification information provided in the URL.");
        } else {
            setStatus("error");
            setErrorMessage("Verification failed or link expired. Please try registering again.");
        }
    }, [searchParams]);

    const handleContinue = () => {
        // Since the user is not automatically logged in from the email link in the new flow,
        // redirect them to the login page to authenticate and receive their JWT,
        // which will then route them to the correct dashboard (where they will see they need to complete their profile).
        router.push("/portal/login");
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

            <div className="relative z-10 w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 text-center shadow-2xl">

                <div className="flex justify-center mb-8">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg p-2 border-2 border-accent/20">
                        <Image src="/osun-fa-logo.png" alt="OSFA Logo" width={48} height={48} className="object-contain" />
                    </div>
                </div>

                {status === "verifying" && (
                    <div className="space-y-6">
                        <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto border-4 border-primary/30 relative">
                            <Loader2 className="w-10 h-10 text-primary animate-spin" />
                        </div>
                        <h2 className="text-2xl font-bold text-white">Verifying Email...</h2>
                        <p className="text-gray-400">Please wait while we securely verify your token.</p>
                    </div>
                )}

                {status === "success" && (
                    <div className="space-y-6">
                        <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto border-4 border-green-500/30">
                            <CheckCircle2 className="w-10 h-10 text-green-500" />
                        </div>
                        <h2 className="text-2xl font-bold text-white">Email Verified!</h2>
                        <p className="text-gray-300">
                            Your account has been successfully verified! Please log in to continue and complete your profile.
                        </p>
                        <button
                            onClick={handleContinue}
                            className="w-full mt-4 bg-accent hover:bg-secondary text-primary-dark font-extrabold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg hover:-translate-y-0.5"
                        >
                            Proceed to Login
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                )}

                {status === "error" && (
                    <div className="space-y-6">
                        <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto border-4 border-red-500/30">
                            <XCircle className="w-10 h-10 text-red-500" />
                        </div>
                        <h2 className="text-2xl font-bold text-white">Verification Failed</h2>
                        <p className="text-red-400 bg-red-500/10 p-4 rounded-xl border border-red-500/20 text-sm">
                            {errorMessage}
                        </p>
                        <Link
                            href="/portal/register"
                            className="inline-block w-full mt-4 bg-white/10 hover:bg-white/20 text-white font-bold py-3.5 px-4 rounded-xl transition-all border border-white/10"
                        >
                            Try Registering Again
                        </Link>
                    </div>
                )}

            </div>
        </div>
    );
}

export default function VerifyEmailPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-surface-dark"><Loader2 className="w-10 h-10 text-primary animate-spin" /></div>}>
            <VerifyContent />
        </Suspense>
    );
}