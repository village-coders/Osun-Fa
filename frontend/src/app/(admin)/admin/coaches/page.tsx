"use client";

import { useState, useEffect, useMemo } from "react";
import api from "@/lib/api";
import toast from "react-hot-toast";
import {
    Eye,
    FileText,
    Phone,
    Mail,
    User,
    Shield,
    Trophy,
    BadgeCheck,
    AlertCircle,
    X,
    ExternalLink,
    Building,
    UserCog,
    Search,
    Loader2,
    Calendar,
    Dna,
    Activity,
    CheckCircle2,
    XCircle,
    Trash2,
    Medal,
    GraduationCap,
    Clock,
    CreditCard
} from "lucide-react";

export default function AdminCoachesPage() {
    const [coaches, setCoaches] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCoach, setSelectedCoach] = useState<any>(null);
    const [reviewMode, setReviewMode] = useState<{ id: string, status: string } | null>(null);
    const [remarks, setRemarks] = useState("");
    const [activeTab, setActiveTab] = useState("general");

    useEffect(() => {
        const fetchCoaches = async () => {
            try {
                const res = await api.get('/coaches');
                setCoaches(res.data);
            } catch (error) {
                toast.error("Failed to load coaches");
            } finally {
                setLoading(false);
            }
        };
        fetchCoaches();
    }, []);

    const handleUpdateStatus = async (id: string, status: string) => {
        try {
            await api.put(`/coaches/${id}/status`, { status, remarks });
            setCoaches(coaches.map(c => c._id === id ? { ...c, status, remarks } : c));
            toast.success(`Coach ${status.toLowerCase()}`);
            setReviewMode(null);
            setRemarks("");
            if (selectedCoach?._id === id) {
                setSelectedCoach({ ...selectedCoach, status, remarks });
            }
        } catch (error) {
            toast.error("Failed to update status");
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this coach?")) return;
        try {
            await api.delete(`/coaches/${id}`);
            setCoaches(coaches.filter(c => c._id !== id));
            toast.success("Coach deleted");
        } catch (error) {
            toast.error("Failed to delete coach");
        }
    };

    const filteredCoaches = useMemo(() => {
        return coaches.filter(c =>
            (c.coachFullName || `${c.surname} ${c.firstName}`).toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.highestCoachingQualification?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.currentClub?.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [coaches, searchQuery]);

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Coach Database</h2>
                    <p className="text-sm text-gray-500 mt-1">Review credentials and manage state-wide coaching licenses.</p>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full">
                <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-4 justify-between bg-gray-50/50">
                    <div className="relative w-full sm:w-96">
                        <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by name, license, or affiliation..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto w-full">
                    <table className="w-full text-left text-sm whitespace-nowrap min-w-[900px]">
                        <thead className="bg-gray-50 text-gray-500 font-semibold border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4">Coach Profile</th>
                                <th className="px-6 py-4">Qualification</th>
                                <th className="px-6 py-4">Experience / Club</th>
                                <th className="px-6 py-4">Exp. Date</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {loading ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                                        <div className="flex items-center justify-center gap-2">
                                            <Loader2 className="w-5 h-5 animate-spin text-primary" />
                                            <span>Processing credentials...</span>
                                        </div>
                                    </td>
                                </tr>
                            ) : filteredCoaches.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-8 text-center text-gray-500">No coaches matching your search found</td>
                                </tr>
                            ) : (
                                filteredCoaches.map((coach) => (
                                    <tr key={coach._id} className="hover:bg-gray-50/50 transition-colors group">
                                        <td className="px-6 py-4 font-bold text-gray-800">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-gray-100 flex shrink-0 items-center justify-center text-gray-400 overflow-hidden border border-gray-200 shadow-sm transition-transform group-hover:scale-110">
                                                    {coach.passportPhotographUrl ? (
                                                        <img src={coach.passportPhotographUrl} alt="" className="w-full h-full object-cover" />
                                                    ) : (
                                                        <User className="w-5 h-5" />
                                                    )}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="truncate max-w-[180px] font-extrabold">{coach.coachFullName || `${coach.surname} ${coach.firstName}`}</span>
                                                    <span className="text-[10px] text-gray-400 uppercase tracking-widest">{coach.email}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600 font-medium">
                                            <div className="flex items-center gap-2">
                                                <Medal className="w-4 h-4 text-secondary shrink-0" />
                                                <div className="flex flex-col">
                                                    <span className="truncate max-w-[150px]">{coach.highestCoachingQualification}</span>
                                                    <span className="text-[10px] text-primary/60 font-bold uppercase">{coach.issuingBody}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="text-gray-600 font-bold">{coach.currentClub || 'Private / Unattached'}</span>
                                                <span className="text-[10px] text-gray-400 capitalize">{coach.yearsOfExperience} Years Exp.</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="text-gray-600 font-bold">{coach.licenseExpiryDate || 'N/A'}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${coach.status === 'Approved' ? 'bg-green-100 text-green-700 border border-green-200' :
                                                coach.status === 'Pending' ? 'bg-yellow-100 text-yellow-700 border border-yellow-200' :
                                                    'bg-red-100 text-red-700 border border-red-200'
                                                }`}>
                                                {coach.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => { setSelectedCoach(coach); setActiveTab("general"); }}
                                                    className="p-2 text-primary hover:bg-primary/5 rounded-lg transition-colors border border-transparent hover:border-primary/20"
                                                    title="View Full Profile"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                                {coach.status === 'Pending' && (
                                                    <div className="flex gap-1">
                                                        <button
                                                            onClick={() => setReviewMode({ id: coach._id, status: 'Approved' })}
                                                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors border border-transparent hover:border-green-200"
                                                            title="Approve License"
                                                        >
                                                            <BadgeCheck className="w-4 h-4" />
                                                        </button>
                                                        <button
                                                            onClick={() => setReviewMode({ id: coach._id, status: 'Rejected' })}
                                                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-200"
                                                            title="Reject Application"
                                                        >
                                                            <XCircle className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                )}
                                                <button
                                                    onClick={() => handleDelete(coach._id)}
                                                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                    title="Remove Record"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Coach Details Modal */}
            {selectedCoach && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm shadow-2xl">
                    <div className="bg-white rounded-[2.5rem] w-full max-w-5xl max-h-[95vh] overflow-hidden flex flex-col shadow-2xl animate-in fade-in zoom-in slide-in-from-bottom-5 duration-300">
                        {/* Header Section */}
                        <div className="p-10 border-b border-gray-100 flex items-center justify-between bg-linear-to-r from-primary/5 via-white to-transparent">
                            <div className="flex items-center gap-8">
                                <div className="w-28 h-28 rounded-4xl bg-white border-4 border-white p-1 shrink-0 flex items-center justify-center shadow-2xl relative">
                                    {selectedCoach.passportPhotographUrl ? (
                                        <img src={selectedCoach.passportPhotographUrl} alt="" className="w-full h-full object-cover rounded-[1.8rem]" />
                                    ) : (
                                        <User className="w-14 h-14 text-gray-200" />
                                    )}
                                    <div className={`absolute -bottom-2 -right-2 w-10 h-10 rounded-2xl flex items-center justify-center border-4 border-white shadow-lg ${selectedCoach.status === 'Approved' ? 'bg-green-500 text-white' : 'bg-yellow-400 text-white'}`}>
                                        <BadgeCheck size={20} />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <div className="flex items-center gap-3">
                                        <h3 className="text-4xl font-black text-gray-800 tracking-tight">{selectedCoach.surname} {selectedCoach.firstName}</h3>
                                        {selectedCoach.otherNames && <span className="text-2xl font-bold text-gray-300">({selectedCoach.otherNames})</span>}
                                    </div>
                                    <div className="flex items-center gap-6 mt-3">
                                        <div className="flex items-center gap-2 bg-white px-4 py-1.5 rounded-2xl border border-gray-100 shadow-sm">
                                            <Medal size={16} className="text-secondary" />
                                            <span className="text-sm font-black text-gray-600 uppercase tracking-tighter">{selectedCoach.highestCoachingQualification}</span>
                                        </div>
                                        <div className="flex items-center gap-2 bg-white px-4 py-1.5 rounded-2xl border border-gray-100 shadow-sm">
                                            <Building size={16} className="text-primary" />
                                            <span className="text-sm font-bold text-gray-600">{selectedCoach.currentClub || 'Private Practice'}</span>
                                        </div>
                                        <div className="flex items-center gap-2 bg-white px-4 py-1.5 rounded-2xl border border-gray-100 shadow-sm">
                                            <Mail size={16} className="text-blue-500" />
                                            <span className="text-sm font-bold text-gray-600">{selectedCoach.email}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button onClick={() => setSelectedCoach(null)} className="p-4 bg-white hover:bg-red-50 hover:text-red-500 hover:shadow-xl rounded-3xl transition-all text-gray-300 border border-gray-100 group">
                                <X size={28} className="group-hover:rotate-90 transition-transform duration-300" />
                            </button>
                        </div>

                        {/* Navigation Tabs */}
                        <div className="flex border-b border-gray-100 bg-gray-50/20 px-10 gap-2">
                            {[
                                { id: 'general', label: 'Identity', icon: User },
                                { id: 'professional', label: 'Credentials', icon: GraduationCap },
                                { id: 'experience', label: 'History', icon: Clock },
                                { id: 'docs', label: 'Library', icon: FileText },
                                { id: 'payment', label: 'Billing', icon: CreditCard }
                            ].map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-3 px-8 py-6 text-sm font-black transition-all border-b-4 relative ${activeTab === tab.id ? 'border-primary text-primary bg-white -mb-px' : 'border-transparent text-gray-400 hover:text-gray-600 hover:bg-gray-100/30'
                                        }`}
                                >
                                    <tab.icon size={20} className={activeTab === tab.id ? 'text-primary' : 'text-gray-300'} />
                                    <span className="uppercase tracking-widest">{tab.label}</span>
                                </button>
                            ))}
                        </div>

                        {/* Dynamic Content Body */}
                        <div className="flex-1 overflow-y-auto p-12 custom-scrollbar bg-white">
                            {activeTab === 'general' && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                                    <div className="space-y-10">
                                        <div className="flex items-center gap-3 pb-4 border-b border-gray-50">
                                            <User className="text-primary/40" size={20} />
                                            <h4 className="text-xs font-black text-gray-400 uppercase tracking-[0.3em]">Personal Profile</h4>
                                        </div>
                                        <div className="grid grid-cols-2 gap-y-10 gap-x-12">
                                            <DataField label="Full Surname" value={selectedCoach.surname} />
                                            <DataField label="Given Name" value={selectedCoach.firstName} />
                                            <DataField label="Gender" value={selectedCoach.gender} />
                                            <DataField label="Nationality" value={selectedCoach.nationality} />
                                            <DataField label="State of Origin" value={selectedCoach.stateOfOrigin} />
                                            <DataField label="Home LGA" value={selectedCoach.lga} />
                                        </div>
                                        <DataField label="Residential Address" value={selectedCoach.residentialAddress} />
                                    </div>
                                    <div className="space-y-10">
                                        <div className="flex items-center gap-3 pb-4 border-b border-gray-50">
                                            <Phone size={20} className="text-primary/40" />
                                            <h4 className="text-xs font-black text-gray-400 uppercase tracking-[0.3em]">Contact Registry</h4>
                                        </div>
                                        <div className="space-y-8">
                                            <div className="grid grid-cols-2 gap-6">
                                                <DataField label="Primary Phone" value={selectedCoach.phoneNumber} icon={<Phone size={14} />} />
                                                <DataField label="Official Email" value={selectedCoach.email} icon={<Mail size={14} />} />
                                            </div>
                                            <div className="bg-gray-50/50 p-8 rounded-4xl border border-gray-100 space-y-6">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <Shield size={16} className="text-orange-400" />
                                                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Emergency Next of Kin</span>
                                                </div>
                                                <DataField label="Full Name" value={selectedCoach.emergencyContactName} />
                                                <DataField label="Direct Line" value={selectedCoach.emergencyContactPhone} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'professional' && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                                    <div className="space-y-10">
                                        <div className="flex items-center gap-3 pb-4 border-b border-gray-50">
                                            <GraduationCap size={20} className="text-primary/40" />
                                            <h4 className="text-xs font-black text-gray-400 uppercase tracking-[0.3em]">Formal Certification</h4>
                                        </div>
                                        <div className="grid grid-cols-2 gap-y-10 gap-x-12">
                                            <DataField label="Main License" value={selectedCoach.highestCoachingQualification} />
                                            <DataField label="Issuing Body" value={selectedCoach.issuingBody} />
                                            <DataField label="Cert Number" value={selectedCoach.certificateNumber} />
                                            <DataField label="Year Awarded" value={selectedCoach.yearObtained} />
                                            <DataField label="Expiry Date" value={selectedCoach.licenseExpiryDate} />
                                            <DataField label="Primary Role" value={selectedCoach.primaryCoachingRole} />
                                        </div>
                                    </div>
                                    <div className="space-y-10">
                                        <div className="flex items-center gap-3 pb-4 border-b border-gray-50">
                                            <Shield size={20} className="text-primary/40" />
                                            <h4 className="text-xs font-black text-gray-400 uppercase tracking-[0.3em]">Specialism</h4>
                                        </div>
                                        <div className="space-y-6">
                                            <DataField label="Specialization Areas" value={selectedCoach.specialization} />
                                            <div className="bg-primary/5 p-8 rounded-4xl border border-primary/10">
                                                <div className="flex items-center gap-2 mb-4">
                                                    <AlertCircle size={16} className="text-primary" />
                                                    <span className="text-[10px] font-black text-primary uppercase tracking-widest">Ongoing Education</span>
                                                </div>
                                                <DataField label="Recent Courses" value={selectedCoach.recentCoursesAttended} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'experience' && (
                                <div className="max-w-4xl mx-auto space-y-12">
                                    <div className="flex items-center gap-6 mb-12">
                                        <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center text-primary shadow-xl border border-gray-100">
                                            <Clock size={32} />
                                        </div>
                                        <div>
                                            <h4 className="text-2xl font-black text-gray-800 tracking-tight">Employment & Tenure</h4>
                                            <p className="text-sm text-gray-400 font-medium">History of professional coaching engagements.</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
                                        <DataField label="Current Employer" value={selectedCoach.currentClub} />
                                        <DataField label="Club Reg Number" value={selectedCoach.clubRegistrationNumber} />
                                        <div className="sm:col-span-2">
                                            <DataField label="Career History (Previous Clubs)" value={selectedCoach.previousClubs} />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'docs' && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                    <DocumentLink label="Coaching Certificate" url={selectedCoach.certificateUploadUrl} />
                                    <DocumentLink label="ID Card / Passport" url={selectedCoach.passportPhotographUrl} />
                                    <DocumentLink label="Birth Certificate" url={selectedCoach.birthCertificateUrl} />
                                    <DocumentLink label="NIN Proof" url={selectedCoach.ninDocumentUrl} />
                                    <DocumentLink label="Address Verification" url={selectedCoach.proofOfAddressUrl} />
                                    <DocumentLink label="Medical Fitness" url={selectedCoach.medicalFitnessCertificateUrl} />
                                </div>
                            )}

                            {activeTab === 'payment' && (
                                <div className="max-w-3xl mx-auto bg-gray-50/50 rounded-[3rem] p-12 border border-gray-100">
                                    <div className="flex items-center gap-6 mb-12">
                                        <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center text-green-500 shadow-xl border border-gray-100">
                                            <CreditCard size={32} />
                                        </div>
                                        <div>
                                            <h4 className="text-2xl font-black text-gray-800 tracking-tight">License Fees</h4>
                                            <p className="text-sm text-gray-400 font-medium">Financial records for license procurement.</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
                                        <DataField label="Registered Bank" value={selectedCoach.bankName} />
                                        <DataField label="Account Title" value={selectedCoach.accountName} />
                                        <DataField label="Account Number" value={selectedCoach.accountNumber} />
                                        <div className="flex flex-col gap-2">
                                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Payment TX Ref</span>
                                            <span className="text-sm font-black text-primary bg-primary/10 px-4 py-2 rounded-xl border border-primary/20 w-fit">{selectedCoach.paymentReference || 'N/A'}</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Audit Tool Footer */}
                        <div className="p-10 border-t border-gray-100 bg-gray-50/50 flex flex-col sm:flex-row justify-between items-center gap-8">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-primary shadow-lg border border-gray-100 shrink-0">
                                    <UserCog size={24} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] text-gray-400 font-black uppercase tracking-[0.3em]">Decision Audit Log</span>
                                    <span className="text-base font-black text-gray-800">
                                        {selectedCoach.reviewedBy ? `Last decision by Officer ${selectedCoach.reviewedBy}` : 'Pending Credentials Verification'}
                                    </span>
                                    {selectedCoach.remarks && (
                                        <p className="text-xs text-primary font-bold mt-1 italic opacity-70">"{selectedCoach.remarks}"</p>
                                    )}
                                </div>
                            </div>
                            <div className="flex gap-4 w-full sm:w-auto">
                                {selectedCoach.status === 'Pending' && (
                                    <>
                                        <button
                                            onClick={() => setReviewMode({ id: selectedCoach._id, status: 'Rejected' })}
                                            className="flex-1 sm:flex-none px-10 py-5 rounded-[1.8rem] border-2 border-orange-100 text-orange-600 font-black hover:bg-orange-50 hover:border-orange-200 transition-all text-sm uppercase tracking-widest"
                                        >
                                            Deny Credentials
                                        </button>
                                        <button
                                            onClick={() => setReviewMode({ id: selectedCoach._id, status: 'Approved' })}
                                            className="flex-1 sm:flex-none px-12 py-5 rounded-[1.8rem] bg-green-600 text-white font-black hover:bg-green-700 transition-all shadow-2xl shadow-green-600/30 text-sm uppercase tracking-widest active:scale-95"
                                        >
                                            Verify License
                                        </button>
                                    </>
                                )}
                                <button onClick={() => setSelectedCoach(null)} className="flex-1 sm:flex-none px-10 py-5 bg-white border border-gray-200 text-gray-500 font-black rounded-[1.8rem] hover:bg-gray-100 transition-all text-sm uppercase tracking-widest">
                                    Dismiss Profile
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Review Decision Modal */}
            {reviewMode && (
                <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl">
                    <div className="bg-white rounded-[3rem] w-full max-w-md p-12 animate-in slide-in-from-bottom-12 duration-500 shadow-2xl overflow-hidden relative border border-gray-100">
                        <div className="absolute top-0 right-0 p-10">
                            <button onClick={() => setReviewMode(null)} className="text-gray-300 hover:text-gray-600 transition-colors">
                                <X size={32} />
                            </button>
                        </div>

                        <div className="mb-12 text-center pt-8">
                            <div className={`w-28 h-28 mx-auto rounded-[2.5rem] flex items-center justify-center mb-8 shadow-2xl transform hover:rotate-6 transition-transform ${reviewMode.status === 'Approved' ? 'bg-green-50 text-green-600 shadow-green-600/10' : 'bg-orange-50 text-orange-600 shadow-orange-600/10'}`}>
                                <Shield size={56} />
                            </div>
                            <h3 className="text-3xl font-black text-gray-800 tracking-tight leading-none uppercase">{reviewMode.status} Application</h3>
                            <p className="text-gray-400 mt-4 text-sm font-bold tracking-tight px-4">Log the official rationale for this coaching certificate decision.</p>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-center justify-between px-2">
                                <label className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em] leading-none">Reviewer's Notes</label>
                                <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                            </div>
                            <textarea
                                value={remarks}
                                onChange={(e) => setRemarks(e.target.value)}
                                placeholder={reviewMode.status === 'Approved' ? "e.g. AFC/FIFA credentials validated." : "e.g. Expired certificates provided. Please re-upload current ones."}
                                className="w-full p-8 bg-gray-50 border-2 border-gray-100 rounded-4xl h-48 focus:outline-none focus:ring-8 focus:ring-primary/5 focus:border-primary focus:bg-white transition-all text-base font-bold text-gray-700 shadow-inner resize-none"
                            />
                        </div>

                        <div className="flex flex-col gap-4 mt-12 pb-4">
                            <button
                                onClick={() => handleUpdateStatus(reviewMode.id, reviewMode.status)}
                                className={`w-full py-6 text-white font-black rounded-4xl shadow-2xl transition-all transform active:scale-[0.96] uppercase tracking-[0.2em] text-sm ${reviewMode.status === 'Approved' ? 'bg-green-600 hover:bg-green-700 shadow-green-600/40' : 'bg-orange-600 hover:bg-orange-700 shadow-orange-600/40'
                                    }`}
                            >
                                Submit Record
                            </button>
                            <button onClick={() => setReviewMode(null)} className="w-full py-5 text-gray-400 font-black rounded-4xl hover:bg-gray-50 hover:text-gray-600 transition-all text-[10px] uppercase tracking-[0.3em]">
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function DataField({ label, value, icon }: { label: string, value?: string, icon?: any }) {
    return (
        <div className="group bg-white p-1 rounded-xl transition-all">
            <span className="text-[10px] font-black text-gray-400 uppercase block mb-2 tracking-widest opacity-60">{label}</span>
            <div className="flex items-center gap-3 text-gray-800 font-extrabold group-hover:text-primary transition-all">
                {icon && <span className="text-primary/30 group-hover:text-primary transition-colors">{icon}</span>}
                <span className="leading-tight text-lg tracking-tight whitespace-pre-wrap">{value || 'NOT SPECIFIED'}</span>
            </div>
        </div>
    );
}

function DocumentLink({ label, url }: { label: string, url?: string }) {
    if (!url) {
        return (
            <div className="bg-gray-50/50 border-4 border-dotted border-gray-100 rounded-[2.5rem] p-10 flex flex-col items-center justify-center gap-6 h-full opacity-50 select-none">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-gray-200 shadow-inner border border-gray-50">
                    <XCircle size={32} />
                </div>
                <div className="text-center">
                    <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em] mb-1">{label}</p>
                    <p className="text-sm font-black text-gray-200 italic">EMPTY RECORD</p>
                </div>
            </div>
        );
    }
    return (
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white border border-gray-100 rounded-[2.5rem] p-10 flex flex-col items-center justify-center gap-8 h-full hover:border-primary hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-3 transition-all group overflow-hidden relative shadow-sm"
        >
            <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                <ExternalLink size={24} className="text-primary/30" />
            </div>

            <div className="w-20 h-20 bg-primary/5 rounded-[1.8rem] flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all transform group-hover:scale-110 shadow-lg group-hover:rotate-6 border border-primary/10">
                <FileText size={40} />
            </div>

            <div className="text-center">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-2 group-hover:text-primary/60 transition-colors">{label}</p>
                <div className="flex items-center justify-center gap-2 text-primary font-black uppercase text-xs">
                    <span>Review Digital File</span>
                </div>
            </div>
        </a>
    );
}
