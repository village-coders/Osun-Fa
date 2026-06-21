"use client";

import { useState, useEffect, useMemo } from "react";
import api from "@/lib/api";
import toast from "react-hot-toast";
import { TableSkeleton } from "@/components/PortalSkeletons";
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
import AdminModal from "@/components/AdminModal";

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

    if (loading) return <TableSkeleton />;

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
                    <span className="text-sm text-gray-400 self-center">{filteredCoaches.length} coach{filteredCoaches.length !== 1 ? 'es' : ''} found</span>
                </div>

                <div className="p-6">
                    {filteredCoaches.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20 text-center">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                <User className="w-8 h-8 text-gray-300" />
                            </div>
                            <p className="text-gray-500 font-semibold">No coaches matching your search found</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                            {filteredCoaches.map((coach) => (
                                <div key={coach._id} className="bg-gray-50 border border-gray-100 rounded-2xl overflow-hidden hover:shadow-lg hover:border-primary/20 transition-all group">
                                    {/* Card Header */}
                                    <div className="relative bg-gradient-to-br from-secondary/10 to-secondary/5 p-5 flex flex-col items-center text-center">
                                        <div className="w-20 h-20 rounded-2xl bg-white border-2 border-white shadow-md overflow-hidden mb-3 group-hover:scale-105 transition-transform">
                                            {coach.passportPhotographUrl ? (
                                                <img src={coach.passportPhotographUrl} alt="" className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                                                    <User className="w-9 h-9 text-gray-300" />
                                                </div>
                                            )}
                                        </div>
                                        <h3 className="font-extrabold text-gray-800 text-sm leading-tight">{coach.coachFullName || `${coach.surname} ${coach.firstName}`}</h3>
                                        <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1 truncate max-w-full">{coach.email}</p>
                                        <span className={`mt-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${coach.status === 'Approved' ? 'bg-green-100 text-green-700 border border-green-200' : coach.status === 'Pending' ? 'bg-yellow-100 text-yellow-700 border border-yellow-200' : 'bg-red-100 text-red-700 border border-red-200'}`}>
                                            {coach.status}
                                        </span>
                                    </div>

                                    {/* Card Body */}
                                    <div className="p-4 space-y-2 text-sm">
                                        <div className="flex items-center justify-between">
                                            <span className="text-gray-400 text-[10px] uppercase font-bold">License</span>
                                            <span className="text-gray-700 font-semibold text-xs truncate max-w-[130px]">{coach.highestCoachingQualification || 'N/A'}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-gray-400 text-[10px] uppercase font-bold">Club</span>
                                            <span className="text-gray-700 font-semibold text-xs truncate max-w-[130px]">{coach.currentClub || 'Unattached'}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-gray-400 text-[10px] uppercase font-bold">Exp.</span>
                                            <span className="text-gray-700 font-semibold text-xs">{coach.yearsOfExperience ? `${coach.yearsOfExperience} yrs` : 'N/A'}</span>
                                        </div>
                                    </div>

                                    {/* Card Footer */}
                                    <div className="px-4 pb-4 flex items-center justify-between gap-2">
                                        <button
                                            onClick={() => { setSelectedCoach(coach); setActiveTab("general"); }}
                                            className="flex-1 py-2 text-xs font-bold text-primary border border-primary/20 rounded-xl hover:bg-primary/5 transition-all flex items-center justify-center gap-1"
                                        >
                                            <Eye size={13} /> View
                                        </button>
                                        {coach.status === 'Pending' && (
                                            <>
                                                <button onClick={() => setReviewMode({ id: coach._id, status: 'Approved' })} className="p-2 text-green-600 hover:bg-green-50 rounded-xl transition-all border border-green-200" title="Approve">
                                                    <BadgeCheck size={15} />
                                                </button>
                                                <button onClick={() => setReviewMode({ id: coach._id, status: 'Rejected' })} className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-all border border-red-200" title="Reject">
                                                    <XCircle size={15} />
                                                </button>
                                            </>
                                        )}
                                        <button onClick={() => handleDelete(coach._id)} className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all" title="Delete">
                                            <Trash2 size={15} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Coach Details Modal */}
            <AdminModal
                isOpen={!!selectedCoach}
                onClose={() => setSelectedCoach(null)}
                title={`${selectedCoach?.surname} ${selectedCoach?.firstName}`}
                subtitle={selectedCoach?.highestCoachingQualification || "Coach Profile"}
                maxWidth="5xl"
                tabs={[
                    { id: 'general', label: 'Identity', icon: User },
                    { id: 'professional', label: 'Credentials', icon: GraduationCap },
                    { id: 'experience', label: 'History', icon: Clock },
                    { id: 'docs', label: 'Library', icon: FileText },
                    { id: 'payment', label: 'Billing', icon: CreditCard }
                ]}
                activeTab={activeTab}
                onTabChange={setActiveTab}
                footer={
                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-3 text-sm text-gray-500">
                            <UserCog size={18} className="text-primary" />
                            <span>{selectedCoach?.reviewedBy ? `Verified by ${selectedCoach.reviewedBy}` : "Pending Verification"}</span>
                        </div>
                        <div className="flex gap-2">
                            {selectedCoach?.status === 'Pending' && (
                                <>
                                    <button
                                        onClick={() => setReviewMode({ id: selectedCoach._id, status: 'Rejected' })}
                                        className="px-6 py-2 rounded-xl border border-red-200 text-red-600 font-bold hover:bg-red-50 transition-all text-sm uppercase tracking-wider"
                                    >
                                        Decline
                                    </button>
                                    <button
                                        onClick={() => setReviewMode({ id: selectedCoach._id, status: 'Approved' })}
                                        className="px-6 py-2 rounded-xl bg-green-600 text-white font-bold hover:bg-green-700 transition-all shadow-md shadow-green-600/20 text-sm uppercase tracking-wider"
                                    >
                                        Approve
                                    </button>
                                </>
                            )}
                            <button
                                onClick={() => setSelectedCoach(null)}
                                className="px-6 py-2 bg-white border border-gray-200 text-gray-600 font-bold rounded-xl hover:bg-gray-100 transition-all text-sm uppercase tracking-wider"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                }
            >
                {selectedCoach && (
                    <div className="space-y-10">
                        {/* Header Content */}
                        <div className="flex flex-col md:flex-row items-center gap-8 pb-8 border-b border-gray-100">
                            <div className="w-24 h-24 rounded-2xl bg-white border border-gray-100 p-1 shadow-sm flex items-center justify-center shrink-0 overflow-hidden">
                                {selectedCoach.passportPhotographUrl ? (
                                    <img src={selectedCoach.passportPhotographUrl} alt="" className="w-full h-full object-cover" />
                                ) : (
                                    <User className="w-12 h-12 text-gray-200" />
                                )}
                            </div>
                            <div className="flex flex-wrap gap-4">
                                <div className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest ${selectedCoach.status === 'Approved' ? 'bg-green-50 text-green-700 border border-green-100' :
                                        selectedCoach.status === 'Pending' ? 'bg-yellow-50 text-yellow-700 border border-yellow-100' :
                                            'bg-red-50 text-red-700 border border-red-100'
                                    }`}>
                                    {selectedCoach.status}
                                </div>
                                <div className="px-4 py-2 bg-gray-50 text-gray-700 border border-gray-100 rounded-xl text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                                    <Medal size={14} className="text-yellow-500" />
                                    {selectedCoach.highestCoachingQualification}
                                </div>
                            </div>
                        </div>

                        {activeTab === 'general' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                <div className="space-y-8">
                                    <SectionTitle title="Personal Profile" />
                                    <div className="grid grid-cols-2 gap-6">
                                        <DataField label="Surname" value={selectedCoach.surname} />
                                        <DataField label="First Name" value={selectedCoach.firstName} />
                                        <DataField label="Gender" value={selectedCoach.gender} />
                                        <DataField label="Nationality" value={selectedCoach.nationality} />
                                    </div>
                                    <DataField label="Residential Address" value={selectedCoach.residentialAddress} />
                                </div>
                                <div className="space-y-8">
                                    <SectionTitle title="Contact & Next of Kin" />
                                    <div className="grid grid-cols-2 gap-6">
                                        <DataField label="Phone Number" value={selectedCoach.phoneNumber} icon={<Phone size={14} />} />
                                        <DataField label="Email Address" value={selectedCoach.email} icon={<Mail size={14} />} />
                                    </div>
                                    <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 space-y-4">
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Emergency Contact</p>
                                        <div className="grid grid-cols-2 gap-4">
                                            <DataField label="Name" value={selectedCoach.emergencyContactName} />
                                            <DataField label="Relationship" value={selectedCoach.emergencyContactRelationship} />
                                            <DataField label="Direct Line" value={selectedCoach.emergencyContactPhone} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'professional' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                <div className="space-y-8">
                                    <SectionTitle title="Formal Certification" />
                                    <div className="grid grid-cols-2 gap-6">
                                        <DataField label="Main License" value={selectedCoach.highestCoachingQualification} />
                                        <DataField label="Issuing Body" value={selectedCoach.issuingBody} />
                                        <DataField label="Cert Number" value={selectedCoach.certificateNumber} />
                                        <DataField label="Year Awarded" value={selectedCoach.yearObtained} />
                                        <DataField label="Expiry Date" value={selectedCoach.licenseExpiryDate} />
                                        <DataField label="Primary Role" value={selectedCoach.primaryCoachingRole} />
                                    </div>
                                </div>
                                <div className="space-y-8">
                                    <SectionTitle title="Specialism & Training" />
                                    <DataField label="Specialization Areas" value={selectedCoach.specialization} />
                                    <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10">
                                        <DataField label="Recent Courses Attended" value={selectedCoach.recentCoursesAttended} />
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'experience' && (
                            <div className="space-y-10">
                                <SectionTitle title="Employment History" />
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <DataField label="Current Club/Employer" value={selectedCoach.currentClub} icon={<Building size={14} />} />
                                    <DataField label="Club Reg Number" value={selectedCoach.clubRegistrationNumber} />
                                    <div className="md:col-span-2">
                                        <DataField label="Previous Coaching Experience" value={selectedCoach.previousClubs} />
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'docs' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <DocumentLink label="Coaching Certificate" url={selectedCoach.certificateUploadUrl} />
                                <DocumentLink label="Passport Photo" url={selectedCoach.passportPhotographUrl} />
                                <DocumentLink label="Birth Certificate" url={selectedCoach.birthCertificateUrl} />
                                <DocumentLink label="NIN Proof" url={selectedCoach.ninDocumentUrl} />
                                <DocumentLink label="Medical Fitness" url={selectedCoach.medicalFitnessCertificateUrl} />
                                <DocumentLink label="Proof of Address" url={selectedCoach.proofOfAddressUrl} />
                            </div>
                        )}

                        {activeTab === 'payment' && (
                            <div className="max-w-2xl mx-auto bg-gray-50 rounded-3xl p-8 border border-gray-100">
                                <SectionTitle title="Financial Records" icon={<CreditCard size={16} />} />
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-6">
                                    <DataField label="Bank Name" value={selectedCoach.bankName} />
                                    <DataField label="Account Name" value={selectedCoach.accountName} />
                                    <DataField label="Account Number" value={selectedCoach.accountNumber} />
                                    <DataField label="Payment Ref" value={selectedCoach.paymentReference} />
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </AdminModal>

            {/* Review Decision Modal */}
            <AdminModal
                isOpen={!!reviewMode}
                onClose={() => setReviewMode(null)}
                title={`${reviewMode?.status} Application`}
                subtitle="Log official administrative justification"
                maxWidth="md"
                footer={
                    <div className="flex flex-col gap-2 w-full">
                        <button
                            onClick={() => handleUpdateStatus(reviewMode!.id, reviewMode!.status)}
                            className={`w-full py-3 text-white font-bold rounded-xl shadow-lg transition-all active:scale-[0.98] uppercase tracking-wider text-sm ${reviewMode?.status === 'Approved' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'
                                }`}
                        >
                            Confirm Decision
                        </button>
                        <button
                            onClick={() => setReviewMode(null)}
                            className="w-full py-2 text-gray-500 font-bold rounded-xl hover:bg-gray-100 transition-all text-xs uppercase tracking-wider"
                        >
                            Cancel
                        </button>
                    </div>
                }
            >
                <div className="space-y-6 pt-4 text-center">
                    <div className={`w-20 h-20 mx-auto rounded-3xl flex items-center justify-center ${reviewMode?.status === 'Approved' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                        <Shield size={40} />
                    </div>
                    <div className="text-left space-y-2">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Internal Remarks</label>
                        <textarea
                            value={remarks}
                            onChange={(e) => setRemarks(e.target.value)}
                            placeholder={reviewMode?.status === 'Approved' ? "e.g. Credentials verified." : "e.g. Incomplete documentation."}
                            className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl h-32 focus:outline-none focus:border-primary focus:bg-white transition-all text-sm font-medium text-gray-700 resize-none"
                        />
                    </div>
                </div>
            </AdminModal>
        </div>
    );
}

function SectionTitle({ title, icon }: { title: string, icon?: any }) {
    return (
        <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
            {icon && <span className="text-primary/50">{icon}</span>}
            <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">{title}</h4>
        </div>
    );
}

function DataField({ label, value, icon }: { label: string, value?: string, icon?: any }) {
    return (
        <div className="space-y-1">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block opacity-70">{label}</span>
            <div className="flex items-center gap-2 text-gray-700 font-bold">
                {icon && <span className="text-primary/30">{icon}</span>}
                <span className="text-sm">{value || 'N/A'}</span>
            </div>
        </div>
    );
}

function DocumentLink({ label, url }: { label: string, url?: string }) {
    if (!url) {
        return (
            <div className="bg-gray-50 border border-dashed border-gray-200 rounded-2xl p-6 flex flex-col items-center justify-center gap-3 opacity-50">
                <FileText size={24} className="text-gray-300" />
                <div className="text-center">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{label}</p>
                    <p className="text-[10px] font-bold text-gray-300 italic">NOT UPLOADED</p>
                </div>
            </div>
        );
    }
    return (
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white border border-gray-100 rounded-2xl p-6 flex items-center gap-4 hover:border-primary hover:shadow-lg transition-all group"
        >
            <div className="w-12 h-12 bg-primary/5 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                <FileText size={24} />
            </div>
            <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{label}</p>
                <div className="flex items-center gap-1.5 text-primary font-bold text-xs">
                    <span>View Document</span>
                    <ExternalLink size={12} />
                </div>
            </div>
        </a>
    );
}
