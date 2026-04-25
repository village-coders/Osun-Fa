"use client";

import React from "react";

const SkeletonBase = ({ className }: { className?: string }) => (
    <div className={`bg-white/5 animate-pulse-slow ${className}`} />
);

export const DashboardSkeleton = () => {
    return (
        <div className="max-w-7xl mx-auto space-y-12">
            {/* Header Skeleton */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-4">
                    <SkeletonBase className="h-3 w-32 rounded-full" />
                    <SkeletonBase className="h-12 w-64 md:w-80 rounded-2xl" />
                </div>
                <SkeletonBase className="h-8 w-32 rounded-2xl" />
            </div>

            {/* Hero CTA Skeleton */}
            <div className="bg-white/5 border border-white/5 p-12 rounded-3xl h-64 w-full" />

            {/* Stats Grid Skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="bg-white/5 border border-white/5 p-8 rounded-2xl h-40" />
                ))}
            </div>

            {/* Bottom Grid Skeleton */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white/5 border border-white/5 rounded-3xl h-96" />
                <div className="bg-white/5 border border-white/5 rounded-3xl h-96" />
            </div>
        </div>
    );
};

export const TableSkeleton = () => {
    return (
        <div className="max-w-7xl mx-auto space-y-12">
            {/* Header Skeleton */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div className="space-y-4">
                    <SkeletonBase className="h-3 w-32 rounded-full" />
                    <SkeletonBase className="h-12 w-64 md:w-80 rounded-2xl" />
                    <SkeletonBase className="h-4 w-48 rounded-full" />
                </div>
                <SkeletonBase className="h-14 w-48 rounded-2xl" />
            </div>

            {/* Table Card Skeleton */}
            <div className="bg-[#0a0f0d]/40 backdrop-blur-3xl border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
                <div className="p-8 border-b border-white/5">
                    <SkeletonBase className="h-12 w-full max-w-md rounded-2xl" />
                </div>
                <div className="p-8 space-y-6">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="flex items-center justify-between py-4 border-b border-white/5 last:border-0">
                            <div className="flex items-center gap-4">
                                <SkeletonBase className="w-14 h-14 rounded-2xl" />
                                <div className="space-y-2">
                                    <SkeletonBase className="h-4 w-32 rounded-full" />
                                    <SkeletonBase className="h-3 w-20 rounded-full" />
                                </div>
                            </div>
                            <SkeletonBase className="h-4 w-24 rounded-full hidden md:block" />
                            <SkeletonBase className="h-6 w-20 rounded-full" />
                            <div className="flex gap-2">
                                <SkeletonBase className="h-10 w-10 rounded-xl" />
                                <SkeletonBase className="h-10 w-10 rounded-xl" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export const FormSkeleton = () => {
    return (
        <div className="max-w-4xl mx-auto space-y-12 py-12">
            <div className="text-center space-y-4">
                <SkeletonBase className="h-10 w-64 mx-auto rounded-2xl" />
                <SkeletonBase className="h-4 w-48 mx-auto rounded-full" />
            </div>
            <div className="bg-white/5 border border-white/5 rounded-3xl p-10 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="space-y-3">
                            <SkeletonBase className="h-3 w-24 rounded-full" />
                            <SkeletonBase className="h-12 w-full rounded-xl" />
                        </div>
                    ))}
                </div>
                <div className="space-y-3">
                    <SkeletonBase className="h-3 w-24 rounded-full" />
                    <SkeletonBase className="h-32 w-full rounded-xl" />
                </div>
                <div className="flex justify-between">
                    <SkeletonBase className="h-12 w-32 rounded-xl" />
                    <SkeletonBase className="h-12 w-32 rounded-xl" />
                </div>
            </div>
        </div>
    );
};
