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

export const AdminDashboardSkeleton = () => {
    return (
        <div className="max-w-7xl mx-auto space-y-6 animate-pulse">
            <div className="bg-white/5 border border-white/5 p-6 rounded-2xl h-28 w-full" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="bg-white/5 border border-white/5 p-6 rounded-2xl h-36" />
                ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white/5 border border-white/5 rounded-2xl h-128" />
                <div className="bg-white/5 border border-white/5 rounded-2xl h-128" />
            </div>
        </div>
    );
};

export const CardGridSkeleton = () => {
    return (
        <div className="max-w-6xl mx-auto space-y-8 animate-pulse">
            <div className="space-y-4">
                <SkeletonBase className="h-4 w-40 rounded-full" />
                <SkeletonBase className="h-10 w-80 max-w-full rounded-2xl" />
                <SkeletonBase className="h-4 w-64 rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((item) => (
                    <div key={item} className="bg-white/5 border border-white/5 rounded-2xl overflow-hidden flex flex-col">
                        <div className="h-16 bg-white/5 border-b border-white/5" />
                        <div className="p-6 space-y-5">
                            <SkeletonBase className="h-6 w-40 rounded-full" />
                            <div className="space-y-3">
                                <SkeletonBase className="h-4 w-full rounded-full" />
                                <SkeletonBase className="h-4 w-5/6 rounded-full" />
                                <SkeletonBase className="h-4 w-2/3 rounded-full" />
                            </div>
                            <SkeletonBase className="h-12 w-full rounded-2xl" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export const PlayerDetailSkeleton = () => {
    return (
        <div className="max-w-6xl mx-auto space-y-8 pb-20 animate-pulse">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <SkeletonBase className="h-12 w-44 rounded-xl" />
                <div className="flex items-center gap-3">
                    <SkeletonBase className="h-12 w-44 rounded-xl" />
                    <SkeletonBase className="h-12 w-36 rounded-xl" />
                </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-[3rem] p-10 shadow-2xl relative overflow-hidden">
                <div className="relative z-10 flex flex-col lg:flex-row gap-12 items-center lg:items-end">
                    <SkeletonBase className="w-56 h-56 rounded-[2.5rem] shrink-0" />

                    <div className="flex-1 text-center lg:text-left space-y-4 w-full">
                        <SkeletonBase className="h-4 w-56 mx-auto lg:mx-0 rounded-full" />
                        <SkeletonBase className="h-12 w-11/12 mx-auto lg:mx-0 rounded-2xl" />
                        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
                            <SkeletonBase className="h-9 w-28 rounded-full" />
                            <SkeletonBase className="h-9 w-36 rounded-full" />
                            <SkeletonBase className="h-9 w-28 rounded-full" />
                            <SkeletonBase className="h-9 w-32 rounded-full" />
                        </div>
                    </div>

                    <SkeletonBase className="hidden xl:block h-40 w-56 rounded-3xl" />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <SkeletonBase className="h-44 w-full rounded-3xl" />
                    <SkeletonBase className="h-64 w-full rounded-3xl" />
                </div>
                <div className="space-y-6">
                    <SkeletonBase className="h-44 w-full rounded-3xl" />
                    <SkeletonBase className="h-44 w-full rounded-3xl" />
                </div>
            </div>
        </div>
    );
};

export const SquadSkeleton = () => {
    return (
        <div className="max-w-7xl mx-auto space-y-8 pb-20 p-4 animate-pulse">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="space-y-3">
                    <SkeletonBase className="h-8 w-56 rounded-2xl" />
                    <SkeletonBase className="h-4 w-80 max-w-full rounded-full" />
                </div>
                <SkeletonBase className="h-12 w-40 rounded-xl" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-8 space-y-8">
                    <div className="relative aspect-3/4 md:aspect-4/3 w-full bg-white/5 rounded-[30px] border border-white/5 overflow-hidden">
                        <div className="absolute inset-4 border border-white/10 rounded-3xl" />
                        <div className="absolute top-1/2 left-0 right-0 h-px bg-white/10" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-white/10 rounded-full" />
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[1, 2, 3, 4].map((i) => (
                            <SkeletonBase key={i} className="h-24 rounded-2xl" />
                        ))}
                    </div>
                </div>
                <div className="lg:col-span-4 space-y-4">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <SkeletonBase key={i} className="h-16 rounded-2xl" />
                    ))}
                </div>
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
