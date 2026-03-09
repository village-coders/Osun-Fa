"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
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
    CheckCircle,
    Trophy,
    Activity,
    History,
    HeartPulse,
    Briefcase,
    BadgeCheck,
    AlertTriangle
} from "lucide-react";
import Link from "next/link";
import userApi from "@/lib/api";
import toast from "react-hot-toast";

export default function ViewPlayerPage() {
    const params = useParams();
    const router = useRouter();
    const [player, setPlayer] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPlayer = async () => {
            try {
                const res = await userApi.get(`/players/my-players`);
                const found = res.data.find((p: any) => p._id === params.id);
                if (found) {
                    setPlayer(found);
                } else {
                    toast.error("Player not found");
                    router.push("/portal/team/players");
                }
            } catch (error) {
                toast.error("Failed to load player details");
            } finally {
                setLoading(false);
            }
        };
        fetchPlayer();
    }, [params.id]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] text-gray-400">
                <Loader2 className="w-10 h-10 animate-spin text-accent mb-4" />
                <p className="font-black uppercase tracking-widest text-[10px]">Retrieving Player Dossier...</p>
            </div>
        );
    }

    if (!player) return null;

    return (
        <div className="max-w-6xl mx-auto space-y-8 pb-20">
            {/* Header / Actions */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors bg-white/5 px-4 py-2 rounded-xl border border-white/5 font-bold text-sm">
                    <ArrowLeft size={18} />
                    Back to Squad
                </button>
                <div className="flex items-center gap-3">
                    <div className={`px-4 py-2 rounded-xl border flex items-center gap-2 ${player.status === 'Approved' ? 'bg-green-500/10 border-green-500/20 text-green-400' :
                            player.status === 'Pending' ? 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400' :
                                'bg-red-500/10 border-red-500/20 text-red-500'
                        }`}>
                        {player.status === 'Approved' ? <BadgeCheck size={18} /> : <Activity size={18} />}
                        <span className="text-xs font-black uppercase tracking-widest">Status: {player.status}</span>
                    </div>
                    <Link href={`/portal/team/players/edit/${player._id}`}>
                        <button className="bg-accent text-primary-dark font-black uppercase text-[10px] tracking-[0.2em] px-6 py-2.5 rounded-xl transition-all hover:-translate-y-1 shadow-xl">
                            Edit Profile
                        </button>
                    </Link>
                </div>
            </div>

            {/* Profile Overview Card */}
            <div className="bg-linear-to-br from-primary via-primary-dark to-black border border-white/10 rounded-[3rem] p-10 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-[100px] -mr-48 -mt-48 animate-pulse"></div>

                <div className="relative z-10 flex flex-col lg:flex-row gap-12 items-center lg:items-end">
                    <div className="w-56 h-56 rounded-[2.5rem] bg-white/5 border-4 border-white/10 overflow-hidden shadow-2xl shrink-0 group hover:border-accent/40 transition-all duration-500">
                        {player.passportPhotographUrl ? (
                            <img src={player.passportPhotographUrl} alt={player.playerName} className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-500" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-700">
                                <User size={80} />
                            </div>
                        )}
                    </div>

                    <div className="flex-1 text-center lg:text-left space-y-4">
                        <div className="space-y-1">
                            <span className="text-accent font-black uppercase text-[10px] tracking-[0.4em] mb-2 block">— {player.registrationSeason || 'CURRENT SEASON'} RECORD —</span>
                            <h1 className="text-5xl font-black text-white tracking-tighter uppercase">{player.firstName} {player.otherNames} {player.surname}</h1>
                        </div>
                        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
                            <MetaBadge icon={Shield} label={player.playingPosition} color="accent" />
                            <MetaBadge icon={Calendar} label={`DOB: ${new Date(player.dateOfBirth).toLocaleDateString()}`} />
                            <MetaBadge icon={MapPin} label={player.nationality} />
                            <MetaBadge icon={Trophy} label={`Jersey #${player.jerseyNumber || '??'}`} color="secondary" />
                        </div>
                    </div>

                    <div className="hidden xl:flex flex-col items-center justify-center border-l border-white/10 pl-12 h-40">
                        <div className="text-center space-y-1">
                            <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest leading-none mb-2">Dominant</p>
                            <p className="text-3xl font-black text-white italic">{player.dominantFoot?.toUpperCase()}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Detailed Info Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Personal + History */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Identification Details */}
                    <div className="bg-white/5 border border-white/10 rounded-4xl p-8 shadow-xl">
                        <SectionTitle title="IDENTIFICATION & ORIGIN" icon={User} />
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 pt-6">
                            <DataPoint label="Surname" value={player.surname} />
                            <DataPoint label="First Name" value={player.firstName} />
                            <DataPoint label="Other Names" value={player.otherNames} />
                            <DataPoint label="Gender" value={player.gender} />
                            <DataPoint label="Place of Birth" value={player.placeOfBirth} />
                            <DataPoint label="Nationality" value={player.nationality} />
                            <DataPoint label="State of Origin" value={player.stateOfOrigin} />
                            <DataPoint label="LGA of Origin" value={player.lga} />
                            <DataPoint label="Residential Address" value={player.residentialAddress} fullWidth />
                        </div>
                    </div>

                    {/* Football Profile */}
                    <div className="bg-white/5 border border-white/10 rounded-4xl p-8 shadow-xl">
                        <SectionTitle title="FOOTBALLING PROFILE" icon={Trophy} />
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 pt-6">
                            <DataPoint label="Playing Position" value={player.playingPosition} />
                            <DataPoint label="Preferred (Specific)" value={player.preferredPosition} />
                            <DataPoint label="Jersey Number" value={player.jerseyNumber} />
                            <DataPoint label="Dominant Foot" value={player.dominantFoot} />
                            <DataPoint label="Height" value={player.heightCm ? `${player.heightCm} cm` : null} />
                            <DataPoint label="Weight" value={player.weightKg ? `${player.weightKg} kg` : null} />
                            <DataPoint label="Experience" value={player.yearsOfExperience ? `${player.yearsOfExperience} Years` : null} />
                            <DataPoint label="Transfer Status" value={player.transferStatus} />
                        </div>
                        <div className="mt-8 p-6 bg-black/20 rounded-3xl border border-white/5 grid grid-cols-1 sm:grid-cols-2 gap-8">
                            <DataPoint label="Previous OSFA Registration" value={player.previouslyRegisteredWithOSFA} />
                            <DataPoint label="Previous OSFA Club" value={player.previousOsfaClub} />
                            <DataPoint label="Other Previous Clubs" value={player.previousClubs} fullWidth />
                        </div>
                    </div>

                    {/* Medical & Education */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white/5 border border-white/10 rounded-4xl p-8 shadow-xl">
                            <SectionTitle title="MEDICAL & FITNESS" icon={HeartPulse} color="red" />
                            <div className="space-y-6 pt-6">
                                <DataPoint label="Blood Group" value={player.bloodGroup} />
                                <DataPoint label="Known Conditions" value={player.knownMedicalConditions} />
                                <DataPoint label="Allergies" value={player.allergies} />
                            </div>
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-4xl p-8 shadow-xl">
                            <SectionTitle title="EDUCATION & STATUS" icon={Briefcase} color="blue" />
                            <div className="space-y-6 pt-6">
                                <DataPoint label="Education Level" value={player.highestEducationLevel} />
                                <DataPoint label="Institution/Employer" value={player.schoolInstitutionEmployer} />
                                <DataPoint label="Registration Season" value={player.registrationSeason} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Contact + Parent + Documents */}
                <div className="space-y-8">
                    {/* Contact Info */}
                    <div className="bg-white/5 border border-white/10 rounded-4xl p-8 shadow-xl">
                        <SectionTitle title="CONTACT INFO" icon={Phone} />
                        <div className="space-y-6 pt-6">
                            <DataPoint label="Primary Phone" value={player.phoneNumber} />
                            <DataPoint label="Email Address" value={player.emailAddress} />
                            <hr className="border-white/5" />
                            <p className="text-[10px] font-black text-accent uppercase tracking-widest italic">Emergency Contact</p>
                            <DataPoint label="Name" value={player.emergencyContactName} />
                            <DataPoint label="Phone" value={player.emergencyContactPhone} />
                            <DataPoint label="Relationship" value={player.relationshipToPlayer} />
                        </div>
                    </div>

                    {/* Parent/Guardian */}
                    <div className="bg-white/5 border border-white/10 rounded-4xl p-8 shadow-xl">
                        <SectionTitle title="NEXT OF KIN / PARENT" icon={Shield} />
                        <div className="space-y-6 pt-6">
                            <DataPoint label="Guardian Name" value={player.parentFullName} />
                            <DataPoint label="Guardian Phone" value={player.parentPhoneNumber} />
                            <DataPoint label="Guardian Address" value={player.parentAddress} />
                        </div>
                    </div>

                    {/* Verification Documents */}
                    <div className="bg-white/5 border border-white/10 rounded-4xl p-8 shadow-xl">
                        <SectionTitle title="VERIFICATION DOCS" icon={FileText} />
                        <div className="space-y-3 pt-6">
                            <DocumentLink label="Birth Certificate" url={player.birthCertificateUrl} />
                            <DocumentLink label="NIN Slip" url={player.ninDocumentUrl} />
                            <DocumentLink label="School ID" url={player.schoolIdUrl} />
                            <DocumentLink label="Consent Form" url={player.consentFormUploadUrl} />
                            <DocumentLink label="Medical Report" url={player.medicalClearanceUploadUrl} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Declaration & Consent */}
            <div className="bg-linear-to-r from-accent/10 to-transparent border border-accent/20 rounded-4xl p-8 md:p-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 text-accent/10">
                    <CheckCircle size={100} />
                </div>
                <div className="relative z-10 space-y-6">
                    <div className="flex items-center gap-3">
                        <CheckCircle className="text-accent" size={24} />
                        <h3 className="text-xl font-black text-white uppercase tracking-tight">Legal Declaration & Consent</h3>
                    </div>
                    <p className="text-sm text-gray-400 italic leading-relaxed max-w-3xl">
                        "I confirm that the information provided is accurate and complete. I agree to comply with the rules and regulations of Osun State Football Association and related governing bodies."
                    </p>
                    <div className="flex flex-wrap gap-12 pt-6 border-t border-white/10">
                        <DataPoint label="Electronic Signature" value={player.digitalSignature || player.playerName} />
                        <DataPoint label="Signing Date" value={player.date ? new Date(player.date).toLocaleDateString() : 'RECORDED AT SUBMISSION'} />
                        <DataPoint label="Data Protection Consent" value={player.dataProtectionConsent ? "AFFIRMED" : "NOT SIGNED"} />
                    </div>
                </div>
            </div>

            {/* Admin Remarks */}
            {player.remarks && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-4xl p-8 flex gap-6 items-start">
                    <div className="p-3 bg-red-500/20 rounded-2xl text-red-400">
                        <AlertTriangle size={24} />
                    </div>
                    <div>
                        <h4 className="text-sm font-black text-red-400 uppercase tracking-widest mb-2">Reviewer Feedback</h4>
                        <p className="text-gray-300 font-medium italic">"{player.remarks}"</p>
                        <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mt-4 italic">— REVIEWED BY {player.reviewedBy || 'ADMIN'}</p>
                    </div>
                </div>
            )}
        </div>
    );
}

function SectionTitle({ title, icon: Icon, color = "accent" }: any) {
    const colorClasses: any = {
        accent: "text-accent bg-accent/10",
        red: "text-red-400 bg-red-400/10",
        blue: "text-blue-400 bg-blue-400/10",
        green: "text-green-400 bg-green-400/10"
    };

    return (
        <div className="flex items-center gap-3 border-b border-white/5 pb-4">
            <div className={`p-2 rounded-lg ${colorClasses[color] || colorClasses.accent}`}>
                <Icon size={18} />
            </div>
            <h2 className="text-xs font-black text-white uppercase tracking-[0.2em]">{title}</h2>
        </div>
    );
}

function DataPoint({ label, value, fullWidth }: any) {
    return (
        <div className={`space-y-1.5 ${fullWidth ? 'col-span-full' : ''}`}>
            <p className="text-[9px] font-black text-gray-600 uppercase tracking-widest">{label}</p>
            <p className="text-sm font-bold text-white tracking-tight">{value || '—'}</p>
        </div>
    );
}

function MetaBadge({ icon: Icon, label, color = "white" }: any) {
    const colors: any = {
        accent: "text-accent bg-accent/20 border-accent/20 shadow-lg shadow-accent/10",
        secondary: "text-secondary bg-secondary/20 border-secondary/20 shadow-lg shadow-secondary/10",
        white: "text-gray-300 bg-white/5 border-white/5"
    };

    return (
        <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-black uppercase tracking-widest transition-all ${colors[color]}`}>
            <Icon size={14} />
            {label}
        </div>
    );
}

function DocumentLink({ label, url }: { label: string, url?: string }) {
    return (
        <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 group hover:border-accent/40 transition-all">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-white/5 rounded-lg text-gray-500 group-hover:text-accent transition-colors">
                    <FileText size={18} />
                </div>
                <span className="text-xs font-black text-gray-400 uppercase tracking-tight">{label}</span>
            </div>
            {url ? (
                <a href={url} target="_blank" rel="noopener noreferrer" className="text-[10px] font-black text-accent bg-accent/10 px-3 py-1.5 rounded-lg border border-accent/20 hover:bg-accent hover:text-primary-dark transition-all uppercase tracking-widest">
                    View
                </a>
            ) : (
                <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest italic">Missing</span>
            )}
        </div>
    );
}
