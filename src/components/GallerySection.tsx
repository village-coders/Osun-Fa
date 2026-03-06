import Image from "next/link";
import { Camera } from "lucide-react";

export default function GallerySection() {
    const images = [
        {
            id: 1,
            color: "bg-[#0b6e4f]", // Primary Green
            label: "Osun FA Cup Final 2025",
            span: "md:col-span-2 md:row-span-2",
        },
        {
            id: 2,
            color: "bg-[#e5a823]", // Gold
            label: "Grassroots Training",
            span: "md:col-span-1 md:row-span-1",
        },
        {
            id: 3,
            color: "bg-[#111827]", // Dark Gray
            label: "Referee Clinic",
            span: "md:col-span-1 md:row-span-1",
        },
        {
            id: 4,
            color: "bg-[#00ff88]", // Accent Green
            label: "Youth League Kickoff",
            span: "md:col-span-2 md:row-span-1",
        },
    ];

    return (
        <section className="py-24 bg-surface-light">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                    <div className="mb-6 md:mb-0">
                        <h2 className="text-4xl md:text-5xl font-extrabold text-text-main mb-4">
                            Moments <span className="text-primary italic">Captured</span>
                        </h2>
                        <p className="text-lg text-text-muted max-w-xl">
                            Highlights from our tournaments, events, and community engagements across Osun State.
                        </p>
                    </div>
                    <button className="inline-flex items-center gap-2 bg-text-main text-white px-6 py-3 rounded-full hover:bg-primary font-bold transition-colors">
                        View All Gallery
                        <Camera className="w-5 h-5" />
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-[600px]">
                    {images.map((img) => (
                        <div
                            key={img.id}
                            className={`relative rounded-2xl overflow-hidden group shadow-md hover:shadow-2xl transition-all duration-300 ${img.span} ${img.color} flex items-center justify-center`}
                        >
                            {/* Overlay Content */}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-6 text-center">
                                <span className="text-white font-bold text-xl md:text-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 drop-shadow-lg">
                                    {img.label}
                                </span>
                            </div>

                            {/* Empty state icon for placeholder */}
                            <Camera className="w-16 h-16 text-white/20" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
