import Link from "next/link";
import { User, Users, Shield, Award, ChevronRight } from "lucide-react";

export default function RegisterSelectionPage() {
    const options = [
        {
            title: "Coach Registration",
            description: "Register as an official OSFA licensed coach.",
            icon: <Award className="w-8 h-8 text-accent" />,
            href: "/register/coach",
            color: "border-accent",
        },
        {
            title: "Team / Club Registration",
            description: "Register your football club or academy.",
            icon: <Users className="w-8 h-8 text-blue-400" />,
            href: "/register/club",
            color: "border-blue-400",
        },
        {
            title: "Referee Registration",
            description: "Register as an official match official.",
            icon: <Shield className="w-8 h-8 text-red-500" />,
            href: "/register/referee",
            color: "border-red-500",
        },
        {
            title: "Player Registration",
            description: "Register as a player to participate in OSFA competitions.",
            icon: <User className="w-8 h-8 text-green-400" />,
            href: "/register/player",
            color: "border-green-400",
        },
    ];

    return (
        <div className="min-h-screen bg-surface-dark pt-32 pb-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Join <span className="text-accent">OSFA</span>
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Select your registration category below to begin your journey with the Osun State Football Association.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {options.map((option, index) => (
                        <Link
                            key={index}
                            href={option.href}
                            className={`group flex items-start gap-5 p-6 rounded-2xl glass-dark border-l-4 ${option.color} hover:-translate-y-1 transition-all duration-300 hover:shadow-lg`}
                        >
                            <div className="p-3 rounded-xl bg-black/30 group-hover:bg-black/50 transition-colors">
                                {option.icon}
                            </div>
                            <div className="flex-1">
                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-accent transition-colors">
                                    {option.title}
                                </h3>
                                <p className="text-gray-400 text-sm">
                                    {option.description}
                                </p>
                            </div>
                            <div className="pt-2">
                                <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-white transition-colors group-hover:translate-x-1" />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
