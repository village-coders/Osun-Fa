import Link from "next/link";
import { User, Users, Shield, Award, ChevronRight } from "lucide-react";

export default function RegisterSelectionPage() {
    const options = [
        {
            title: "Team / Club Registration",
            description: "Register your football club or academy.",
            icon: <Users className="w-8 h-8 text-blue-400" />,
            href: "/portal/register",
            color: "border-blue-400",
        },
        {
            title: "Coach Registration",
            description: "Register as an official OSFA licensed coach.",
            icon: <Award className="w-8 h-8 text-accent" />,
            href: "/portal/register",
            color: "border-accent",
        },
        {
            title: "Referee Registration",
            description: "Register as an official match official.",
            icon: <Shield className="w-8 h-8 text-red-500" />,
            href: "/portal/register",
            color: "border-red-500",
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

                <div className="mt-12 bg-white/5 border border-white/10 rounded-2xl p-6 text-center max-w-2xl mx-auto">
                    <User className="w-10 h-10 text-gray-500 mx-auto mb-3" />
                    <h3 className="text-xl font-bold text-white mb-2">Are you a Player?</h3>
                    <p className="text-gray-400">
                        Individual player registration is no longer publicly available. All players must be officially registered and licensed by their respective clubs through the secure <span className="text-accent">Team Portal</span>.
                    </p>
                </div>
            </div>
        </div>
    );
}
