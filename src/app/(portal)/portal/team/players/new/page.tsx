"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
    Save,
    Loader2,
    User,
    MapPin,
    Phone,
    Shield,
    Trophy,
    Activity,
    FileText,
    Upload,
    ArrowLeft,
    Check,
    X,
    Image as ImageIcon,
    Briefcase,
    HeartPulse,
    History
} from "lucide-react";
import userApi from "@/lib/api";
import toast from "react-hot-toast";
import Link from "next/link";
import PhotoCapture from "@/components/forms/PhotoCapture";

export default function RegisterPlayerPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const [photo, setPhoto] = useState<File | null>(null);

    const [formData, setFormData] = useState<any>({
        // Section A: Personal
        surname: "",
        firstName: "",
        otherNames: "",
        gender: "Male",
        dateOfBirth: "",
        placeOfBirth: "",
        nationality: "Nigerian",
        stateOfOrigin: "",
        lga: "",
        residentialAddress: "",

        // Section B: Contact
        phoneNumber: "",
        emailAddress: "",
        emergencyContactName: "",
        emergencyContactPhone: "",
        relationshipToPlayer: "",

        // Section C: Next of Kin
        parentFullName: "",
        parentPhoneNumber: "",
        parentAddress: "",

        // Section E: Football Profile
        currentClubName: "",
        clubRegistrationNumber: "",
        playingPosition: "Forward",
        preferredPosition: "",
        jerseyNumber: "",
        dominantFoot: "Right",
        heightCm: "",
        weightKg: "",
        yearsOfExperience: "",

        // Section F: Registration & Transfer
        previouslyRegisteredWithOSFA: "No",
        previousOsfaClub: "",
        previousClubs: "",
        outstandingTransferIssues: "No",
        transferIssueDetails: "",

        // Section G: Medical
        bloodGroup: "",
        knownMedicalConditions: "",
        allergies: "",

        // Section H: Education
        highestEducationLevel: "None",
        schoolInstitutionEmployer: "",

        // Section I: Declaration
        declarationAccepted: false,
        playerName: "",
        digitalSignature: "",
        date: new Date().toISOString().split('T')[0],
        parentName: "",
        parentSignature: "",
        dataProtectionConsent: false,
        registrationSeason: "2023/2024" // Default for now
    });

    const [files, setFiles] = useState<Record<string, File>>({});

    const handleChange = (e: any) => {
        const { name, value, type, checked } = e.target;
        const finalValue = type === 'checkbox' ? checked : value;
        setFormData((prev: any) => ({ ...prev, [name]: finalValue }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
        if (e.target.files && e.target.files[0]) {
            setFiles(prev => ({ ...prev, [fieldName]: e.target.files![0] }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.declarationAccepted || !formData.dataProtectionConsent) {
            toast.error("Please accept the declaration and data consent");
            return;
        }

        if (!photo) {
            toast.error("Passport photograph is required");
            setCurrentStep(4); // Move to documents section
            return;
        }

        setLoading(true);
        const submitData = new FormData();

        // Append all text data
        Object.entries(formData).forEach(([key, value]: [string, any]) => {
            if (value !== undefined && value !== null) {
                submitData.append(key, value.toString());
            }
        });

        // Append captured photo
        submitData.append("passportPhotograph", photo);

        // Append other files
        Object.entries(files).forEach(([key, file]) => {
            submitData.append(key, file);
        });

        try {
            await userApi.post("/players/portal-register", submitData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            toast.success("Player registered successfully!");
            router.push("/portal/team/players");
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to register player");
        } finally {
            setLoading(false);
        }
    };

    const sections = [
        { id: 1, label: "Personal", icon: User },
        { id: 2, label: "Contact", icon: Phone },
        { id: 3, label: "Parent/Guardian", icon: Shield },
        { id: 4, label: "Documents", icon: FileText },
        { id: 5, label: "Football", icon: Trophy },
        { id: 6, label: "History", icon: History },
        { id: 7, label: "Medical", icon: HeartPulse },
        { id: 8, label: "Education", icon: Briefcase },
        { id: 9, label: "Consent", icon: Save }
    ];

    return (
        <div className="max-w-5xl mx-auto space-y-8 pb-20">
            {/* Header */}
            <div className="bg-linear-to-br from-primary via-primary-dark to-black p-10 rounded-[2.5rem] border border-white/10 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-10 opacity-5">
                    <User size={160} />
                </div>
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="space-y-2">
                        <div className="flex items-center gap-3">
                            <span className="bg-accent/20 text-accent text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full border border-accent/30">Official Portal</span>
                            <span className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">• PLAYER-DRP-2026</span>
                        </div>
                        <h1 className="text-4xl font-black text-white tracking-tight">Digital Player Registration</h1>
                        <p className="text-gray-400 font-medium">Complete all 9 sections to register a player to your club.</p>
                    </div>
                    <Link href="/portal/team/players">
                        <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-bold bg-white/5 px-4 py-2 rounded-xl border border-white/5">
                            <ArrowLeft size={16} />
                            Back to Players
                        </button>
                    </Link>
                </div>
            </div>

            {/* Stepper Navigation */}
            <div className="bg-white/5 border border-white/10 rounded-4xl p-4 hide-scrollbar overflow-x-auto">
                <div className="flex items-center justify-between min-w-[1000px] px-4">
                    {sections.map((s, i) => (
                        <div key={s.id} className="flex items-center flex-1 last:flex-none">
                            <button
                                onClick={() => setCurrentStep(s.id)}
                                className={`flex flex-col items-center gap-2 group transition-all ${currentStep === s.id ? 'scale-110' : 'opacity-60 hover:opacity-100'}`}
                            >
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all border-2 ${currentStep === s.id
                                    ? 'bg-accent border-accent text-primary-dark shadow-lg shadow-accent/20'
                                    : 'bg-white/5 border-white/10 text-gray-400 hover:border-accent/40'
                                    }`}>
                                    <s.icon size={18} />
                                </div>
                                <span className={`text-[8px] font-black uppercase tracking-widest ${currentStep === s.id ? 'text-accent' : 'text-gray-500'}`}>{s.label}</span>
                            </button>
                            {i < sections.length - 1 && (
                                <div className="flex-1 h-[2px] bg-white/5 mx-2 mt-[-20px]">
                                    <div className={`h-full transition-all duration-500 ${currentStep > s.id ? 'bg-accent w-full' : 'w-0'}`}></div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Section A: Personal Information */}
                {currentStep === 1 && (
                    <FormCard title="Section A: Personal Information" icon={User}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <InputField label="Surname *" name="surname" value={formData.surname} onChange={handleChange} required />
                            <InputField label="First Name *" name="firstName" value={formData.firstName} onChange={handleChange} required />
                            <InputField label="Other Name(s)" name="otherNames" value={formData.otherNames} onChange={handleChange} />
                            <SelectField
                                label="Gender *"
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                options={["Male", "Female"]}
                            />
                            <InputField label="Date of Birth *" name="dateOfBirth" type="date" value={formData.dateOfBirth} onChange={handleChange} required />
                            <InputField label="Place of Birth *" name="placeOfBirth" value={formData.placeOfBirth} onChange={handleChange} required />
                            <InputField label="Nationality *" name="nationality" value={formData.nationality} onChange={handleChange} required />
                            <InputField label="State of Origin *" name="stateOfOrigin" value={formData.stateOfOrigin} onChange={handleChange} required />
                            <InputField label="LGA *" name="lga" value={formData.lga} onChange={handleChange} required />
                            <div className="md:col-span-2">
                                <TextAreaField label="Residential Address *" name="residentialAddress" value={formData.residentialAddress} onChange={handleChange} required />
                            </div>
                        </div>
                    </FormCard>
                )}

                {/* Section B: Contact Information */}
                {currentStep === 2 && (
                    <FormCard title="Section B: Contact Information" icon={Phone}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <InputField label="Phone Number *" name="phoneNumber" type="tel" value={formData.phoneNumber} onChange={handleChange} required />
                            <InputField label="Email Address (Optional)" name="emailAddress" type="email" value={formData.emailAddress} onChange={handleChange} />
                            <InputField label="Emergency Contact Name *" name="emergencyContactName" value={formData.emergencyContactName} onChange={handleChange} required />
                            <InputField label="Emergency Contact Phone *" name="emergencyContactPhone" type="tel" value={formData.emergencyContactPhone} onChange={handleChange} required />
                            <InputField label="Relationship to Player *" name="relationshipToPlayer" value={formData.relationshipToPlayer} onChange={handleChange} required />
                        </div>
                    </FormCard>
                )}

                {/* Section C: Next of Kin / Parent */}
                {currentStep === 3 && (
                    <FormCard title="Section C: Next of Kin / Parent (For Minors)" icon={Shield}>
                        <p className="text-gray-400 text-sm mb-8 italic">Required for players under 18 years old.</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <InputField label="Parent/Guardian Full Name" name="parentFullName" value={formData.parentFullName} onChange={handleChange} />
                            <InputField label="Parent/Guardian Phone" name="parentPhoneNumber" type="tel" value={formData.parentPhoneNumber} onChange={handleChange} />
                            <div className="md:col-span-2">
                                <TextAreaField label="Parent/Guardian Address" name="parentAddress" value={formData.parentAddress} onChange={handleChange} />
                            </div>
                        </div>
                    </FormCard>
                )}

                {/* Section D: Player Identification (Uploads) */}
                {currentStep === 4 && (
                    <FormCard title="Section D: Player Identification" icon={FileText}>
                        <div className="space-y-10">
                            <div className="p-8 bg-black/20 rounded-3xl border border-white/5">
                                <label className="text-sm font-black text-white uppercase tracking-widest mb-4 block">1. Passport Photograph (Facial Capture) *</label>
                                <p className="text-xs text-gray-400 mb-6 italic">Secure white background headshot required for AI facial recognition.</p>
                                <PhotoCapture onPhotoCaptured={(file) => setPhoto(file)} />
                                {photo && <div className="mt-4 flex items-center gap-2 text-accent text-xs font-bold"><Check size={14} /> Photo Captured Successfully</div>}
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                <FileUpload label="Birth Certificate / Declaration" fieldName="birthCertificate" file={files.birthCertificate} onChange={handleFileChange} />
                                <FileUpload label="NIN Slip / Identification" fieldName="ninDocument" file={files.ninDocument} onChange={handleFileChange} />
                                <FileUpload label="School ID (Youth Players)" fieldName="schoolId" file={files.schoolId} onChange={handleFileChange} />
                                <FileUpload label="Consent Form (Minors)" fieldName="consentFormUpload" file={files.consentFormUpload} onChange={handleFileChange} />
                            </div>
                        </div>
                    </FormCard>
                )}

                {/* Section E: Football Profile */}
                {currentStep === 5 && (
                    <FormCard title="Section E: Football Profile" icon={Trophy}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <InputField label="Current Club Name (Auto-filled)" name="currentClubName" value={formData.currentClubName} readOnly placeholder="Will be set by system" />
                            <InputField label="Club Registration Number (If Any)" name="clubRegistrationNumber" value={formData.clubRegistrationNumber} onChange={handleChange} />
                            <SelectField
                                label="Playing Position *"
                                name="playingPosition"
                                value={formData.playingPosition}
                                onChange={handleChange}
                                options={["Goalkeeper", "Defender", "Midfielder", "Forward"]}
                            />
                            <InputField label="Preferred Position" name="preferredPosition" value={formData.preferredPosition} onChange={handleChange} placeholder="e.g. Left Wing, Centre Back" />
                            <InputField label="Jersey Number (If Assigned)" name="jerseyNumber" type="number" value={formData.jerseyNumber} onChange={handleChange} />
                            <SelectField
                                label="Dominant Foot *"
                                name="dominantFoot"
                                value={formData.dominantFoot}
                                onChange={handleChange}
                                options={["Right", "Left", "Both"]}
                            />
                            <InputField label="Height (cm)" name="heightCm" type="number" value={formData.heightCm} onChange={handleChange} />
                            <InputField label="Weight (kg)" name="weightKg" type="number" value={formData.weightKg} onChange={handleChange} />
                            <InputField label="Registration Season *" name="registrationSeason" value={formData.registrationSeason} onChange={handleChange} required />
                            <InputField label="Years of Playing Experience *" name="yearsOfExperience" type="number" value={formData.yearsOfExperience} onChange={handleChange} required />
                        </div>
                    </FormCard>
                )}

                {/* Section F: Registration & Transfer History */}
                {currentStep === 6 && (
                    <FormCard title="Section F: Registration & Transfer History" icon={History}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <SelectField
                                label="Previously Registered with OSFA? *"
                                name="previouslyRegisteredWithOSFA"
                                value={formData.previouslyRegisteredWithOSFA}
                                onChange={handleChange}
                                options={["No", "Yes"]}
                            />
                            {formData.previouslyRegisteredWithOSFA === "Yes" && (
                                <InputField label="If Yes, Previous Club" name="previousOsfaClub" value={formData.previousOsfaClub} onChange={handleChange} />
                            )}
                            <div className="md:col-span-2">
                                <TextAreaField label="Previous Club(s)" name="previousClubs" value={formData.previousClubs} onChange={handleChange} placeholder="List previous clubs and periods" />
                            </div>
                            <SelectField
                                label="Outstanding Transfer Issues? *"
                                name="outstandingTransferIssues"
                                value={formData.outstandingTransferIssues}
                                onChange={handleChange}
                                options={["No", "Yes"]}
                            />
                            {formData.outstandingTransferIssues === "Yes" && (
                                <div className="md:col-span-2">
                                    <TextAreaField label="Explain Transfer Issues" name="transferIssueDetails" value={formData.transferIssueDetails} onChange={handleChange} />
                                </div>
                            )}
                        </div>
                    </FormCard>
                )}

                {/* Section G: Medical & Fitness */}
                {currentStep === 7 && (
                    <FormCard title="Section G: Medical & Fitness (Confidential)" icon={HeartPulse}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <InputField label="Blood Group (Optional)" name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} placeholder="e.g. O+, AB-" />
                            <div className="md:col-span-2">
                                <TextAreaField label="Known Medical Conditions" name="knownMedicalConditions" value={formData.knownMedicalConditions} onChange={handleChange} />
                            </div>
                            <div className="md:col-span-2">
                                <TextAreaField label="Allergies (If Any)" name="allergies" value={formData.allergies} onChange={handleChange} />
                            </div>
                            <FileUpload label="Medical Clearance Certificate" fieldName="medicalClearanceUpload" file={files.medicalClearanceUpload} onChange={handleFileChange} />
                        </div>
                    </FormCard>
                )}

                {/* Section H: Education / Occupation */}
                {currentStep === 8 && (
                    <FormCard title="Section H: Education / Occupation (Optional)" icon={Briefcase}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <SelectField
                                label="Highest Education Level"
                                name="highestEducationLevel"
                                value={formData.highestEducationLevel}
                                onChange={handleChange}
                                options={["None", "Primary", "Secondary", "Tertiary"]}
                            />
                            <InputField label="School / Institution / Employer" name="schoolInstitutionEmployer" value={formData.schoolInstitutionEmployer} onChange={handleChange} />
                        </div>
                    </FormCard>
                )}

                {/* Section I: Declaration & Consent */}
                {currentStep === 9 && (
                    <FormCard title="Section I: Declaration & Consent" icon={Save}>
                        <div className="space-y-10">
                            <div className="bg-white/5 p-8 rounded-4xl border border-white/5 space-y-4">
                                <p className="text-sm text-gray-300 leading-relaxed italic">
                                    "I confirm that the information provided is accurate and complete. I agree to comply with the rules and regulations of Osun State Football Association and related governing bodies."
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <InputField label="Player Name (Digital Signature) *" name="playerName" value={formData.playerName} onChange={handleChange} required placeholder="Full Legal Name" />
                                <InputField label="Signature Style *" name="digitalSignature" value={formData.digitalSignature} onChange={handleChange} required placeholder="e.g. Initials or Full Name" />
                                <InputField label="Date *" name="date" type="date" value={formData.date} readOnly />
                            </div>

                            <div className="p-6 bg-black/20 rounded-3xl border border-white/5 space-y-6">
                                <h4 className="text-sm font-black text-accent uppercase tracking-widest">For Minors (Under 18)</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <InputField label="Parent/Guardian Name" name="parentName" value={formData.parentName} onChange={handleChange} />
                                    <InputField label="Parent Signature (Type Name)" name="parentSignature" value={formData.parentSignature} onChange={handleChange} />
                                </div>
                            </div>

                            <div className="space-y-4 pt-6 border-t border-white/5">
                                <label className="flex items-start gap-4 p-6 rounded-3xl bg-accent/5 border border-accent/10 cursor-pointer group">
                                    <div className="relative mt-1">
                                        <input type="checkbox" name="declarationAccepted" checked={formData.declarationAccepted} onChange={handleChange} className="hidden" />
                                        <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${formData.declarationAccepted ? 'bg-accent border-accent text-primary-dark rotate-0' : 'border-gray-500 rotate-90'}`}>
                                            {formData.declarationAccepted && <Check size={18} strokeWidth={4} />}
                                        </div>
                                    </div>
                                    <div>
                                        <span className="text-sm font-black text-white uppercase tracking-tight block mb-1">Affirmation of Accuracy</span>
                                        <span className="text-xs text-gray-400 font-medium">I declare all information provided is true and accurate.</span>
                                    </div>
                                </label>

                                <label className="flex items-start gap-4 p-6 rounded-3xl bg-accent/5 border border-accent/10 cursor-pointer group">
                                    <div className="relative mt-1">
                                        <input type="checkbox" name="dataProtectionConsent" checked={formData.dataProtectionConsent} onChange={handleChange} className="hidden" />
                                        <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${formData.dataProtectionConsent ? 'bg-accent border-accent text-primary-dark rotate-0' : 'border-gray-500 rotate-90'}`}>
                                            {formData.dataProtectionConsent && <Check size={18} strokeWidth={4} />}
                                        </div>
                                    </div>
                                    <div>
                                        <span className="text-sm font-black text-white uppercase tracking-tight block mb-1">Data Processing Consent</span>
                                        <span className="text-xs text-gray-400 font-medium">I consent to data processing in accordance with OSFA Data Protection Policy.</span>
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

                    {currentStep < 9 ? (
                        <button
                            type="button"
                            onClick={() => setCurrentStep(prev => Math.min(9, prev + 1))}
                            className="bg-white/10 text-white font-black uppercase text-[10px] tracking-[0.3em] px-12 py-5 rounded-3xl hover:bg-white/20 hover:-translate-y-1 transition-all active:scale-95 shadow-xl"
                        >
                            Next Section
                        </button>
                    ) : (
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-accent text-primary-dark font-black uppercase text-[10px] tracking-[0.3em] px-16 py-5 rounded-3xl hover:-translate-y-1 transition-all active:scale-95 shadow-2xl shadow-accent/20 flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
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

function TextAreaField({ label, name, value, onChange, placeholder, required }: any) {
    return (
        <div className="space-y-2.5 group">
            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest pl-1 group-focus-within:text-accent transition-colors block">{label}</label>
            <textarea
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                rows={3}
                className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white font-bold tracking-tight focus:outline-none focus:ring-4 focus:ring-accent/10 focus:border-accent/40 transition-all"
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

function FileUpload({ label, fieldName, file, onChange, isImage }: any) {
    return (
        <div className="relative group">
            <label className="flex flex-col items-center justify-center gap-4 p-8 border-4 border-dotted border-white/5 rounded-[2.5rem] bg-white/5 hover:bg-white/10 hover:border-accent/30 transition-all cursor-pointer text-center h-full min-h-[200px] overflow-hidden relative">
                <input type="file" onChange={(e) => onChange(e, fieldName)} className="hidden" />

                {file ? (
                    <div className="space-y-4 animate-in zoom-in duration-300">
                        <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center text-primary-dark mx-auto shadow-xl">
                            {isImage ? <ImageIcon size={32} /> : <FileText size={32} />}
                        </div>
                        <div className="space-y-1">
                            <p className="text-xs font-black text-white truncate max-w-[150px]">{file.name}</p>
                            <p className="text-[10px] font-bold text-accent uppercase tracking-widest">Selected</p>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-gray-500 group-hover:text-accent transition-colors border border-white/5 group-hover:border-accent/20">
                            <Upload size={24} />
                        </div>
                        <div className="space-y-1">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">{label}</p>
                            <p className="text-[10px] text-gray-600 font-bold italic">No file</p>
                        </div>
                    </div>
                )}
            </label>
        </div>
    );
}
