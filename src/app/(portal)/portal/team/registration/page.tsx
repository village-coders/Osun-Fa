"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
    Save,
    Loader2,
    Building,
    MapPin,
    UserCog,
    Shield,
    Trophy,
    CreditCard,
    CheckCircle2,
    AlertCircle,
    FileText,
    Upload,
    ArrowLeft,
    Check,
    X,
    Image as ImageIcon
} from "lucide-react";
import userApi from "@/lib/api";
import toast from "react-hot-toast";
import Link from "next/link";

export default function ClubRegistrationPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);

    const [formData, setFormData] = useState<any>({
        // Section A: identification
        clubName: "",
        shortNameNickname: "",
        yearOfEstablishment: "",
        clubCategory: "Academy",
        leagueLevel: "Grassroots",
        leagueOther: "",

        // Section B: Contact
        registeredAddress: "",
        lga: "",
        townCity: "",
        state: "Osun State",
        officialPhoneNumber: "",
        officialEmailAddress: "",
        websiteSocialMedia: "",

        // Section C: Management
        chairmanName: "",
        chairmanPhone: "",
        chairmanEmail: "",
        secretaryName: "",
        secretaryPhone: "",
        secretaryEmail: "",
        headCoachName: "",
        headCoachLicenseLevel: "",
        headCoachPhone: " ",
        teamManagerName: "",
        teamManagerPhone: "",

        // Section E: Facilities
        homeGroundName: "",
        stadiumAddress: "",
        trainingGround: "",
        homeKitColor: "",
        awayKitColor: "",
        reserveKitColor: "",
        numberOfPlayers: "",
        youthTeamsAvailable: [],

        // Section F: Banking
        bankName: "",
        accountName: "",
        accountNumber: "",
        paymentReference: "",

        // Section G: Declaration
        authorizedOfficerName: "",
        authorizedOfficerPosition: "",
        digitalSignature: "",
        date: new Date().toISOString().split('T')[0],
        dataProtectionConsent: false
    });

    const [files, setFiles] = useState<Record<string, File>>({});

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const res = await userApi.get('/portal-auth/me');
                const user = res.data;
                setFormData((prev: any) => ({
                    ...prev,
                    clubName: user.clubName || user.name || "",
                    email: user.email || "",
                    officialEmailAddress: user.officialEmailAddress || user.email || "",
                    officialPhoneNumber: user.officialPhoneNumber || "",
                }));
            } catch (error) {
                console.error("Failed to load initial club data");
            } finally {
                setLoading(false);
            }
        };
        fetchInitialData();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;

        // Handle youthTeamsAvailable array separately
        if (name === 'youthTeamsAvailable') {
            const val = (e.target as HTMLInputElement).value;
            const current = Array.isArray(formData.youthTeamsAvailable) ? formData.youthTeamsAvailable : [];
            if (current.includes(val)) {
                setFormData((prev: any) => ({ ...prev, youthTeamsAvailable: current.filter((i: string) => i !== val) }));
            } else {
                setFormData((prev: any) => ({ ...prev, youthTeamsAvailable: [...current, val] }));
            }
            return;
        }

        if (type === 'checkbox') {
            const checked = (e.target as HTMLInputElement).checked;
            setFormData((prev: any) => ({ ...prev, [name]: checked }));
        } else {
            setFormData((prev: any) => ({ ...prev, [name]: value }));
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
        if (e.target.files && e.target.files[0]) {
            setFiles(prev => ({ ...prev, [fieldName]: e.target.files![0] }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.dataProtectionConsent) {
            toast.error("You must consent to data processing");
            return;
        }

        setSubmitting(true);
        const submitData = new FormData();

        // Append all text data
        Object.entries(formData).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                value.forEach(v => submitData.append(key, v));
            } else {
                submitData.append(key, value as string);
            }
        });

        // Append files
        Object.entries(files).forEach(([key, file]) => {
            submitData.append(key, file);
        });

        try {
            await userApi.put("/clubs/update-profile", submitData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            toast.success("Official registration submitted successfully!");
            router.push("/portal/team");
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to submit registration");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <div className="flex justify-center py-20"><Loader2 className="animate-spin text-accent w-10 h-10" /></div>;

    const sections = [
        { id: 1, label: "Identification", icon: Building },
        { id: 2, label: "Contacts", icon: MapPin },
        { id: 3, label: "Management", icon: UserCog },
        { id: 4, label: "Documents", icon: FileText },
        { id: 5, label: "Facilities", icon: Trophy },
        { id: 6, label: "Financials", icon: CreditCard },
        { id: 7, label: "Declaration", icon: Shield }
    ];

    return (
        <div className="max-w-5xl mx-auto space-y-8 pb-20">
            {/* Header */}
            <div className="bg-linear-to-br from-primary via-primary-dark to-black p-10 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-10 opacity-5">
                    <Building size={160} />
                </div>
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="space-y-2">
                        <div className="flex items-center gap-3">
                            <span className="bg-accent/20 text-accent text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full border border-accent/30">Official Portal</span>
                            <span className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">• OSFA-DRP-2026</span>
                        </div>
                        <h1 className="text-4xl font-black text-white tracking-tight">Digital Club Registration</h1>
                        <p className="text-gray-400 font-medium">Please complete all 7 sections to finalize your official OSFA affiliation.</p>
                    </div>
                    <Link href="/portal/team">
                        <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-bold bg-white/5 px-4 py-2 rounded-xl border border-white/5">
                            <ArrowLeft size={16} />
                            Back to Dashboard
                        </button>
                    </Link>
                </div>
            </div>

            {/* Stepper Navigation */}
            <div className="bg-white/5 border border-white/10 rounded-4xl p-4 hide-scrollbar overflow-x-auto">
                <div className="flex items-center justify-between min-w-[800px] px-4">
                    {sections.map((s, i) => (
                        <div key={s.id} className="flex items-center flex-1 last:flex-none">
                            <button
                                onClick={() => setCurrentStep(s.id)}
                                className={`flex flex-col items-center gap-2 group transition-all ${currentStep === s.id ? 'scale-110' : 'opacity-60 hover:opacity-100'}`}
                            >
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all border-2 ${currentStep === s.id
                                    ? 'bg-accent border-accent text-primary-dark shadow-lg shadow-accent/20'
                                    : 'bg-white/5 border-white/10 text-gray-400 hover:border-accent/40'
                                    }`}>
                                    <s.icon size={20} />
                                </div>
                                <span className={`text-[10px] font-black uppercase tracking-widest ${currentStep === s.id ? 'text-accent' : 'text-gray-500'}`}>{s.label}</span>
                            </button>
                            {i < sections.length - 1 && (
                                <div className="flex-1 h-[2px] bg-white/5 mx-4 mt-[-18px]">
                                    <div className={`h-full transition-all duration-500 ${currentStep > s.id ? 'bg-accent w-full' : 'w-0'}`}></div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Section A: Identification */}
                {currentStep === 1 && (
                    <FormCard title="Section A: Club Identification" icon={Building}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <InputField label="Club Name (Registered Name) *" name="clubName" value={formData.clubName} onChange={handleChange} required />
                            <InputField label="Short Name / Nickname" name="shortNameNickname" value={formData.shortNameNickname} onChange={handleChange} />
                            <InputField label="Year of Establishment *" name="yearOfEstablishment" type="number" value={formData.yearOfEstablishment} onChange={handleChange} required />
                            <SelectField
                                label="Club Category *"
                                name="clubCategory"
                                value={formData.clubCategory}
                                onChange={handleChange}
                                options={["Professional", "Semi-Professional", "Amateur", "Academy", "School Team", "Community Club"]}
                            />
                            <div className="md:col-span-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 block">League / Competition Level *</label>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                    {["NPFL", "NNL", "National Women's Championship", "NLO", "Osun State Youth League", "Osun State Women’s League", "Grassroots", "Others"].map(opt => (
                                        <label key={opt} className={`flex items-center gap-3 p-4 rounded-xl border transition-all cursor-pointer ${formData.leagueLevel === opt ? 'bg-accent/10 border-accent text-accent' : 'bg-white/5 border-white/5 text-gray-400 hover:bg-white/10'}`}>
                                            <input type="radio" name="leagueLevel" value={opt} checked={formData.leagueLevel === opt} onChange={handleChange} className="hidden" />
                                            {formData.leagueLevel === opt ? <CheckCircle2 size={16} /> : <div className="w-4 h-4 rounded-full border-2 border-current opacity-30" />}
                                            <span className="text-sm font-bold">{opt}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                            {formData.leagueLevel === 'Others' && (
                                <div className="md:col-span-2">
                                    <InputField label="Please specify Other League" name="leagueOther" value={formData.leagueOther} onChange={handleChange} required />
                                </div>
                            )}
                        </div>
                    </FormCard>
                )}

                {/* Section B: Location */}
                {currentStep === 2 && (
                    <FormCard title="Section B: Club Location & Contact Details" icon={MapPin}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="md:col-span-2">
                                <InputField label="Registered Address *" name="registeredAddress" value={formData.registeredAddress} onChange={handleChange} required />
                            </div>
                            <InputField label="Local Government Area (LGA) *" name="lga" value={formData.lga} onChange={handleChange} required />
                            <InputField label="Town / City *" name="townCity" value={formData.townCity} onChange={handleChange} required />
                            <InputField label="State (Auto-filled)" name="state" value={formData.state} readOnly />
                            <InputField label="Official Phone Number *" name="officialPhoneNumber" type="tel" value={formData.officialPhoneNumber} onChange={handleChange} required />
                            <InputField label="Official Email Address *" name="officialEmailAddress" type="email" value={formData.officialEmailAddress} onChange={handleChange} required />
                            <div className="md:col-span-2">
                                <InputField label="Official Website / Social Media (Optional)" name="websiteSocialMedia" value={formData.websiteSocialMedia} onChange={handleChange} placeholder="e.g. www.clubname.com, @clubname on Twitter" />
                            </div>
                        </div>
                    </FormCard>
                )}

                {/* Section C: Management */}
                {currentStep === 3 && (
                    <FormCard title="Section C: Club Management & Officials" icon={UserCog}>
                        <div className="space-y-12">
                            <OfficialGroup title="13. Club Chairman / President" prefix="chairman" data={formData} onChange={handleChange} />
                            <OfficialGroup title="14. Secretary / Administrator" prefix="secretary" data={formData} onChange={handleChange} />
                            <div className="space-y-6">
                                <h4 className="text-xs font-black text-accent uppercase tracking-[0.2em] border-b border-accent/10 pb-2">15. Head Coach</h4>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <InputField label="Full Name" name="headCoachName" value={formData.headCoachName} onChange={handleChange} />
                                    <InputField label="License Level" name="headCoachLicenseLevel" value={formData.headCoachLicenseLevel} onChange={handleChange} placeholder="e.g. CAF A, B, C" />
                                    <InputField label="Phone" name="headCoachPhone" value={formData.headCoachPhone} onChange={handleChange} />
                                </div>
                            </div>
                            <div className="space-y-6">
                                <h4 className="text-xs font-black text-accent uppercase tracking-[0.2em] border-b border-accent/10 pb-2">16. Team Manager</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <InputField label="Full Name" name="teamManagerName" value={formData.teamManagerName} onChange={handleChange} />
                                    <InputField label="Phone" name="teamManagerPhone" value={formData.teamManagerPhone} onChange={handleChange} />
                                </div>
                            </div>
                        </div>
                    </FormCard>
                )}

                {/* Section D: Documents */}
                {currentStep === 4 && (
                    <FormCard title="Section D: Legal & Affiliation Documents" icon={FileText}>
                        <p className="text-gray-400 text-sm mb-10 italic">Please upload clear scanned copies (PDF/JPG/PNG). Max 10MB per document.</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            <FileUpload label="CAC Registration Certificate" fieldName="cacRegistrationCertificate" file={files.cacRegistrationCertificate} onChange={handleFileChange} />
                            <FileUpload label="OSFA Affiliation Certificate" fieldName="osfaAffiliationCertificate" file={files.osfaAffiliationCertificate} onChange={handleFileChange} />
                            <FileUpload label="Constitution / Memorandum" fieldName="constitution" file={files.constitution} onChange={handleFileChange} />
                            <FileUpload label="Club Logo *" fieldName="clubLogo" file={files.clubLogo} onChange={handleFileChange} isImage />
                            <FileUpload label="Letter of Application *" fieldName="applicationLetter" file={files.applicationLetter} onChange={handleFileChange} />
                        </div>
                    </FormCard>
                )}

                {/* Section E: Facilities */}
                {currentStep === 5 && (
                    <FormCard title="Section E: Team & Facilities Information" icon={Trophy}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <InputField label="Home Ground / Stadium Name *" name="homeGroundName" value={formData.homeGroundName} onChange={handleChange} required />
                            <InputField label="Stadium Address *" name="stadiumAddress" value={formData.stadiumAddress} onChange={handleChange} required />
                            <div className="md:col-span-2">
                                <InputField label="Training Ground (If Different)" name="trainingGround" value={formData.trainingGround} onChange={handleChange} />
                            </div>
                            <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-6">
                                <InputField label="Home Kit Colour" name="homeKitColor" value={formData.homeKitColor} onChange={handleChange} placeholder="e.g. Blue/White" />
                                <InputField label="Away Kit Colour" name="awayKitColor" value={formData.awayKitColor} onChange={handleChange} placeholder="e.g. Yellow/Black" />
                                <InputField label="Reserve Kit Colour" name="reserveKitColor" value={formData.reserveKitColor} onChange={handleChange} />
                            </div>
                            <InputField label="Number of Registered Players" name="numberOfPlayers" type="number" value={formData.numberOfPlayers} onChange={handleChange} />
                            <div>
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 block">Youth Teams Available</label>
                                <div className="flex flex-wrap gap-4">
                                    {["U-13", "U-15", "U-17", "U-20", "None"].map(age => (
                                        <label key={age} className={`flex items-center gap-3 px-4 py-2 rounded-xl border transition-all cursor-pointer ${formData.youthTeamsAvailable?.includes(age) ? 'bg-accent/10 border-accent text-accent' : 'bg-white/5 border-white/5 text-gray-400 hover:bg-white/10'}`}>
                                            <input type="checkbox" name="youthTeamsAvailable" value={age} checked={formData.youthTeamsAvailable?.includes(age)} onChange={handleChange} className="hidden" />
                                            <span className="text-sm font-bold uppercase">{age}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </FormCard>
                )}

                {/* Section F: Banking */}
                {currentStep === 6 && (
                    <FormCard title="Section F: Banking & Financial Details" icon={CreditCard}>
                        <p className="text-gray-500 text-xs mb-10 flex items-center gap-2 bg-black/20 p-4 rounded-xl border border-white/5">
                            <Shield size={14} className="text-accent" />
                            This information is confidential and used only for official OSFA financial transactions.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <InputField label="Club Bank Name *" name="bankName" value={formData.bankName} onChange={handleChange} required />
                            <InputField label="Account Name *" name="accountName" value={formData.accountName} onChange={handleChange} required />
                            <InputField label="Account Number *" name="accountNumber" value={formData.accountNumber} onChange={handleChange} required />
                            <InputField label="Payment Reference (if applicable)" name="paymentReference" value={formData.paymentReference} onChange={handleChange} />
                        </div>
                    </FormCard>
                )}

                {/* Section G: Declaration */}
                {currentStep === 7 && (
                    <FormCard title="Section G: Declaration & Consent" icon={Shield}>
                        <div className="space-y-10">
                            <div className="bg-white/5 p-8 rounded-4xl border border-white/5 space-y-4">
                                <p className="text-sm text-gray-300 leading-relaxed italic">
                                    "I hereby declare that all information provided is true and correct to the best of my knowledge. I agree to abide by the rules and regulations of Osun State Football Association and related football bodies."
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <InputField label="Authorized Officer Name *" name="authorizedOfficerName" value={formData.authorizedOfficerName} onChange={handleChange} required />
                                <InputField label="Position *" name="authorizedOfficerPosition" value={formData.authorizedOfficerPosition} onChange={handleChange} required />
                                <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <InputField label="Digital Signature (Type Full Name) *" name="digitalSignature" value={formData.digitalSignature} onChange={handleChange} required placeholder="Legal full name" />
                                    <InputField label="Date *" name="date" type="date" value={formData.date} readOnly />
                                </div>
                            </div>

                            <div className="pt-6 border-t border-white/5">
                                <label className="flex items-start gap-4 p-6 rounded-3xl bg-accent/5 border border-accent/10 cursor-pointer group">
                                    <div className="relative mt-1">
                                        <input
                                            type="checkbox"
                                            name="dataProtectionConsent"
                                            checked={formData.dataProtectionConsent}
                                            onChange={handleChange}
                                            className="hidden"
                                        />
                                        <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${formData.dataProtectionConsent ? 'bg-accent border-accent text-primary-dark rotate-0' : 'border-gray-500 rotate-90'}`}>
                                            {formData.dataProtectionConsent && <Check size={18} strokeWidth={4} />}
                                        </div>
                                    </div>
                                    <div>
                                        <span className="text-sm font-black text-white uppercase tracking-tight block mb-1">Data Processing Consent</span>
                                        <span className="text-xs text-gray-400 font-medium">I consent to data processing in line with OSUN FA Data Protection Policy.</span>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </FormCard>
                )}

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between pt-8 border-t border-white/10">
                    <button
                        type="button"
                        onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
                        className={`flex items-center gap-2 text-gray-400 font-black uppercase text-[10px] tracking-[0.3em] px-8 py-5 rounded-3xl transition-all ${currentStep === 1 ? 'opacity-0 pointer-events-none' : 'hover:bg-white/5 hover:text-white'}`}
                    >
                        <ArrowLeft size={16} />
                        Previous Phase
                    </button>

                    {currentStep < 7 ? (
                        <button
                            type="button"
                            onClick={() => setCurrentStep(prev => Math.min(7, prev + 1))}
                            className="bg-white/10 text-white font-black uppercase text-[10px] tracking-[0.3em] px-12 py-5 rounded-3xl hover:bg-white/20 hover:-translate-y-1 transition-all active:scale-95 shadow-xl"
                        >
                            Next Section
                        </button>
                    ) : (
                        <button
                            type="submit"
                            disabled={submitting}
                            className="bg-accent text-primary-dark font-black uppercase text-[10px] tracking-[0.3em] px-16 py-5 rounded-3xl hover:-translate-y-1 transition-all active:scale-95 shadow-2xl shadow-accent/20 flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {submitting ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                            Submit Final Record
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}

function FormCard({ title, icon: Icon, children }: any) {
    return (
        <div className="bg-white/5 border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl animate-in fade-in slide-in-from-bottom-6 duration-500">
            <div className="p-8 border-b border-white/5 bg-white/5 flex items-center gap-4">
                <div className="p-3 bg-accent/20 rounded-2xl text-accent border border-accent/20">
                    <Icon size={24} />
                </div>
                <h2 className="text-xl font-black text-white tracking-tight uppercase">{title}</h2>
            </div>
            <div className="p-8 md:p-12">
                {children}
            </div>
        </div>
    );
}

function InputField({ label, name, type = "text", value, onChange, placeholder, required, readOnly }: any) {
    return (
        <div className="space-y-2.5 group">
            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest pl-1 group-focus-within:text-accent transition-colors block">{label}</label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                readOnly={readOnly}
                className={`w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white font-bold tracking-tight focus:outline-none focus:ring-4 focus:ring-accent/10 focus:border-accent/40 transition-all ${readOnly ? 'opacity-50 cursor-not-allowed bg-black/20' : ''}`}
            />
        </div>
    );
}

function SelectField({ label, name, value, onChange, options }: any) {
    return (
        <div className="space-y-2.5 group">
            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest pl-1 group-focus-within:text-accent transition-colors block">{label}</label>
            <select
                name={name}
                value={value}
                onChange={onChange}
                className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white font-bold tracking-tight focus:outline-none focus:ring-4 focus:ring-accent/10 focus:border-accent/40 transition-all appearance-none cursor-pointer"
            >
                {options.map((opt: string) => (
                    <option key={opt} value={opt} className="bg-primary-dark">{opt}</option>
                ))}
            </select>
        </div>
    );
}

function OfficialGroup({ title, prefix, data, onChange }: any) {
    return (
        <div className="space-y-6">
            <h4 className="text-xs font-black text-accent uppercase tracking-[0.2em] border-b border-accent/10 pb-2">{title}</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <InputField label="Full Name" name={`${prefix}Name`} value={data[`${prefix}Name`]} onChange={onChange} />
                <InputField label="Phone" name={`${prefix}Phone`} value={data[`${prefix}Phone`]} onChange={onChange} />
                <InputField label="Email" name={`${prefix}Email`} type="email" value={data[`${prefix}Email`]} onChange={onChange} />
            </div>
        </div>
    );
}

function FileUpload({ label, fieldName, file, onChange, isImage }: any) {
    return (
        <div className="relative group">
            <label className="flex flex-col items-center justify-center gap-4 p-8 border-4 border-dotted border-white/5 rounded-3xl bg-white/5 hover:bg-white/10 hover:border-accent/30 transition-all cursor-pointer text-center h-full min-h-[220px] overflow-hidden relative">
                <input type="file" onChange={(e) => onChange(e, fieldName)} className="hidden" />

                {file ? (
                    <div className="space-y-4 animate-in zoom-in duration-300">
                        <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center text-primary-dark mx-auto shadow-xl">
                            {isImage ? <ImageIcon size={32} /> : <FileText size={32} />}
                        </div>
                        <div className="space-y-1">
                            <p className="text-xs font-black text-white truncate max-w-[150px]">{file.name}</p>
                            <p className="text-[10px] font-bold text-accent uppercase tracking-widest">Document Selected</p>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-gray-500 group-hover:text-accent transition-colors border border-white/5 group-hover:border-accent/20">
                            <Upload size={28} />
                        </div>
                        <div className="space-y-1">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">{label}</p>
                            <p className="text-[10px] text-gray-600 font-bold italic">No file selected</p>
                        </div>
                    </div>
                )}

                {file && (
                    <div className="absolute top-4 right-4 p-2 bg-black/40 rounded-full text-white/40 hover:text-white transition-colors backdrop-blur-md">
                        <X size={14} />
                    </div>
                )}
            </label>
        </div>
    );
}
