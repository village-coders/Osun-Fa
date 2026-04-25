"use client";

import { X } from "lucide-react";
import { useEffect } from "react";

interface AdminModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    subtitle?: string;
    children: React.ReactNode;
    footer?: React.ReactNode;
    maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl";
    tabs?: { id: string; label: string; icon: any }[];
    activeTab?: string;
    onTabChange?: (id: string) => void;
}

const maxWidthClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    "3xl": "max-w-3xl",
    "4xl": "max-w-4xl",
    "5xl": "max-w-5xl",
    "6xl": "max-w-6xl",
    "7xl": "max-w-7xl",
};

export default function AdminModal({
    isOpen,
    onClose,
    title,
    subtitle,
    children,
    footer,
    maxWidth = "4xl",
    tabs,
    activeTab,
    onTabChange,
}: AdminModalProps) {
    // Lock scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-all animate-in fade-in duration-200">
            <div
                className={`bg-white rounded-2xl w-full ${maxWidthClasses[maxWidth]} max-h-[95vh] overflow-hidden flex flex-col shadow-2xl animate-in zoom-in slide-in-from-bottom-4 duration-300`}
            >
                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/30">
                    <div className="flex flex-col">
                        <h3 className="text-xl font-bold text-gray-900 leading-tight">{title}</h3>
                        {subtitle && <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>}
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-400 hover:text-gray-600"
                        title="Close"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Tabs */}
                {tabs && tabs.length > 0 && (
                    <div className="flex border-b border-gray-100 bg-white px-6 overflow-x-auto no-scrollbar">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => onTabChange?.(tab.id)}
                                className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold transition-all border-b-2 whitespace-nowrap ${activeTab === tab.id
                                        ? "border-primary text-primary"
                                        : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50/50"
                                    }`}
                            >
                                {tab.icon && <tab.icon size={16} />}
                                {tab.label}
                            </button>
                        ))}
                    </div>
                )}

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar bg-white">
                    {children}
                </div>

                {/* Footer */}
                {footer && (
                    <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/30 flex justify-end gap-3">
                        {footer}
                    </div>
                )}
            </div>
        </div>
    );
}
