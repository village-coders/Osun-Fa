"use client";

import { useState, useEffect } from "react";
import { useParams as useNextParams, useRouter as useNextRouter } from "next/navigation";
import {
    User,
    Shield,
    Phone,
    MapPin,
    Calendar,
    Mail,
    FileText,
    ArrowLeft,
    Loader2,
    Save,
    Trophy,
    Activity,
    History,
    HeartPulse,
    Briefcase
} from "lucide-react";
import userApi from "@/lib/api";
import toast from "react-hot-toast";

export default function EditPlayerPage() {
    const params = useNextParams();
    const router = useNextRouter();
    const [loading, setLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [formData, setFormData] = useState<any>(null);

    useEffect(() => {
        const fetchPlayer = async () => {
            try {
                const res = await userApi.get(`/players/my-players`);
                const found = res.data.find((p: any) => p._id === params.id);
                if (found) {
                    setFormData({
                        ...found,
                        dateOfBirth: found.dateOfBirth ? found.dateOfBirth.split('T')[0] : '',
                        date: found.date ? found.date.split('T')[0] : ''
                    });
                } else {
                    toast.error("Player not found");
                    router.push("/portal/team/players");
                }
            } catch (error) {
                toast.error("Failed to load player data");
            } finally {
                setLoading(false);
            }
        };
        fetchPlayer();
    }, [params.id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        const finalValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
        setFormData((prev: any) => ({ ...prev, [name]: finalValue }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            await userApi.put(`/players/${params.id}/update-profile`, { ...formData });
            toast.success("Player updated successfully");
            router.push("/portal/team/players");
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to update player. Please try again.");
        } finally {
            setIsSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] text-gray-400">
                <Loader2 className="w-10 h-10 animate-spin text-accent mb-4" />
                <p className="font-bold tracking-widest uppercase text-[10px]">Loading Record...</p>
            </div>
        );
    }

    if (!formData) return null;

    return (
        <div className="max-w-5xl mx-auto space-y-8 pb-20">
            {/* Header */}
            <div className="bg-linear-to-br from-primary via-primary-dark to-black p-8 rounded-[2.5rem] border border-white/10 shadow-2xl flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-6">
                    <div className="w-20 h-20 rounded-2xl bg-accent/20 border border-accent/20 flex items-center justify-center overflow-hidden">
                        {formData.passportPhotographUrl ? (
                            <img src={formData.passportPhotographUrl} alt="" className="w-full h-full object-cover" />
                        ) : (
                            <User size={32} className="text-accent" />
                        )}
                    </div>
                    <div>
                        <h1 className="text-3xl font-black text-white tracking-tight uppercase">{formData.firstName} {formData.surname}</h1>
                        <p className="text-gray-400 font-bold text-xs tracking-wider">Editing Historical Record • {formData.playingPosition}</p>
                    </div>
                </div>
                <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-bold bg-white/5 px-4 py-2 rounded-xl border border-white/5">
                    <ArrowLeft size={16} />
                    Back to Player
                </button>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Personal Section */}
                <EditCard title="Personal Information" icon={User}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <InputField label="Surname" name="surname" value={formData.surname} onChange={handleChange} required />
                        <InputField label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} required />
                        <InputField label="Other Names" name="otherNames" value={formData.otherNames} onChange={handleChange} />
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest pl-1">Gender</label>
                            <select name="gender" value={formData.gender} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white">
                                <option value="Male" className="bg-primary-dark">Male</option>
                                <option value="Female" className="bg-primary-dark">Female</option>
                            </select>
                        </div>
                        <InputField label="Birth Date" name="dateOfBirth" type="date" value={formData.dateOfBirth} onChange={handleChange} required />
                        <InputField label="Birth Place" name="placeOfBirth" value={formData.placeOfBirth} onChange={handleChange} />
                    </div>
                </EditCard>

                {/* Football Section */}
                <EditCard title="Football Profile" icon={Trophy}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest pl-1">Position</label>
                            <select name="playingPosition" value={formData.playingPosition} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white">
                                <option value="Goalkeeper" className="bg-primary-dark">Goalkeeper</option>
                                <option value="Defender" className="bg-primary-dark">Defender</option>
                                <option value="Midfielder" className="bg-primary-dark">Midfielder</option>
                                <option value="Forward" className="bg-primary-dark">Forward</option>
                            </select>
                        </div>
                        <InputField label="Jersey Number" name="jerseyNumber" type="number" value={formData.jerseyNumber} onChange={handleChange} />
                        <InputField label="Dominant Foot" name="dominantFoot" value={formData.dominantFoot} onChange={handleChange} />
                        <InputField label="Season" name="registrationSeason" value={formData.registrationSeason} onChange={handleChange} />
                        <InputField label="Height (cm)" name="heightCm" type="number" value={formData.heightCm} onChange={handleChange} />
                        <InputField label="Weight (kg)" name="weightKg" type="number" value={formData.weightKg} onChange={handleChange} />
                    </div>
                </EditCard>

                {/* Medical & Education */}
                <EditCard title="Health & Education" icon={HeartPulse}>
                    <div className="grid grid-cols-1 gap-5">
                        <InputField label="Blood Group" name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} />
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest pl-1">Highest Education</label>
                            <select name="highestEducationLevel" value={formData.highestEducationLevel} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white">
                                <option value="None" className="bg-primary-dark">None</option>
                                <option value="Primary" className="bg-primary-dark">Primary</option>
                                <option value="Secondary" className="bg-primary-dark">Secondary</option>
                                <option value="Tertiary" className="bg-primary-dark">Tertiary</option>
                            </select>
                        </div>
                    </div>
                </EditCard>

                {/* Contact Section */}
                <EditCard title="Contact Detail" icon={Phone}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <InputField label="Phone" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
                        <InputField label="Email" name="emailAddress" value={formData.emailAddress} onChange={handleChange} />
                        <div className="sm:col-span-2">
                            <InputField label="Emergency Name" name="emergencyContactName" value={formData.emergencyContactName} onChange={handleChange} />
                        </div>
                        <InputField label="Emergency Phone" name="emergencyContactPhone" value={formData.emergencyContactPhone} onChange={handleChange} />
                        <InputField label="Relationship" name="relationshipToPlayer" value={formData.relationshipToPlayer} onChange={handleChange} />
                    </div>
                </EditCard>

                {/* Footer Save Button */}
                <div className="lg:col-span-2 flex justify-end pt-4">
                    <button
                        type="submit"
                        disabled={isSaving}
                        className="bg-accent text-primary-dark px-12 py-4 rounded-2xl font-black uppercase text-xs tracking-[0.3em] transition-all hover:-translate-y-1 shadow-2xl flex items-center gap-3 disabled:opacity-50"
                    >
                        {isSaving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                        {isSaving ? "Updating Record..." : "Sync Changes"}
                    </button>
                </div>
            </form>
        </div>
    );
}

function EditCard({ title, icon: Icon, children }: any) {
    return (
        <div className="bg-white/5 border border-white/10 rounded-4xl p-8 space-y-6">
            <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                <div className="p-2 bg-accent/20 rounded-lg text-accent">
                    <Icon size={18} />
                </div>
                <h2 className="text-sm font-black text-white uppercase tracking-widest">{title}</h2>
            </div>
            {children}
        </div>
    );
}

function InputField({ label, name, value, onChange, type = "text", required }: any) {
    return (
        <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest pl-1">{label}</label>
            <input
                type={type}
                name={name}
                value={value || ""}
                onChange={onChange}
                required={required}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white font-bold text-sm focus:border-accent outline-none transition-all"
            />
        </div>
    );
}
