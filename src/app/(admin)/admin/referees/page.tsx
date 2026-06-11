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
    Activity,
    CreditCard,
    XCircle,
    Trash2,
    Hammer,
    Scale,
    Stethoscope
} from "lucide-react";
import AdminModal from "@/components/AdminModal";

export default function AdminRefereesPage() {
    const [referees, setReferees] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedReferee, setSelectedReferee] = useState<any>(null);
    const [reviewMode, setReviewMode] = useState<{ id: string, status: string } | null>(null);
    const [remarks, setRemarks] = useState("");
    const [activeTab, setActiveTab] = useState("general");

    useEffect(() => {
        const fetchReferees = async () => {
            try {
                const res = await api.get('/referees');
                setReferees(res.data);
            } catch (error) {
                toast.error("Failed to load referees");
            } finally {
                setLoading(false);
            }
        };
        fetchReferees();
    }, []);

    const handleUpdateStatus = async (id: string, status: string) => {
        try {
            await api.put(`/referees/${id}/status`, { status, remarks });
            setReferees(referees.map(r => r._id === id ? { ...r, status, remarks } : r));
            toast.success(`Referee ${status.toLowerCase()}`);
            setReviewMode(null);
            setRemarks("");
            if (selectedReferee?._id === id) {
                setSelectedReferee({ ...selectedReferee, status, remarks });
            }
        } catch (error) {
            toast.error("Failed to update status");
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this referee?")) return;
        try {
            await api.delete(`/referees/${id}`);
            setReferees(referees.filter(r => r._id !== id));
            toast.success("Referee deleted");
        } catch (error) {
            toast.error("Failed to delete referee");
        }
    };

    const filteredReferees = useMemo(() => {
        return referees.filter(r =>
            (r.refereeFullName || `${r.surname} ${r.firstName}`).toLowerCase().includes(searchQuery.toLowerCase()) ||
            r.currentGrade?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            r.lga?.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [referees, searchQuery]);

    if (loading) return <TableSkeleton />;

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Match Officials Registry</h2>
                    <p className="text-sm text-gray-500 mt-1">Manage officiating grading, fitness reports, and disciplinary status.</p>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full">
                <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-4 justify-between bg-gray-50/50">
                    <div className="relative w-full sm:w-96">
                        <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by name, grade, or society..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto w-full">
                    <table className="w-full text-left text-sm whitespace-nowrap min-w-225">
                        <thead className="bg-gray-50 text-gray-500 font-semibold border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4">Referee Details</th>
                                <th className="px-6 py-4">Grade / Category</th>
                                <th className="px-6 py-4">Local Society</th>
                                <th className="px-6 py-4">Exp.</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredReferees.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-8 text-center text-gray-500">No match officials found</td>
                                </tr>
                            ) : (
                                filteredReferees.map((ref) => (
                                    <tr key={ref._id} className="hover:bg-gray-50/50 transition-colors group">
                                        <td className="px-6 py-4 font-bold text-gray-800">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-gray-100 flex shrink-0 items-center justify-center text-gray-400 overflow-hidden border border-gray-200 shadow-sm transition-transform group-hover:scale-110">
                                                    {ref.passportPhotographUrl ? (
                                                        <img src={ref.passportPhotographUrl} alt="" className="w-full h-full object-cover" />
                                                    ) : (
                                                        <User className="w-5 h-5" />
                                                    )}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="truncate max-w-45 font-extrabold">{ref.refereeFullName || `${ref.surname} ${ref.firstName}`}</span>
                                                    <span className="text-[10px] text-gray-400 uppercase tracking-widest">{ref.email}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600 font-medium">
                                            <div className="flex items-center gap-2">
                                                <Activity className="w-4 h-4 text-secondary shrink-0" />
                                                <div className="flex flex-col">
                                                    <span className="truncate max-w-37.5">{ref.currentGrade}</span>
                                                    <span className="text-[10px] text-primary/60 font-bold uppercase">{ref.refereeCategory}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="text-gray-600 font-bold">{ref.lga} Society</span>
                                                <span className="text-[10px] text-gray-400 uppercase">Registered Official</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="text-gray-600 font-bold">{ref.yearsOfExperience} Years</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${ref.status === 'Approved' ? 'bg-green-100 text-green-700 border border-green-200' :
                                                ref.status === 'Pending' ? 'bg-yellow-100 text-yellow-700 border border-yellow-200' :
                                                    'bg-red-100 text-red-700 border border-red-200'
                                                }`}>
                                                {ref.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => { setSelectedReferee(ref); setActiveTab("general"); }}
                                                    className="p-2 text-primary hover:bg-primary/5 rounded-lg transition-colors border border-transparent hover:border-primary/20"
                                                    title="View Full Profile"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                                {ref.status === 'Pending' && (
                                                    <div className="flex gap-1">
                                                        <button
                                                            onClick={() => setReviewMode({ id: ref._id, status: 'Approved' })}
                                                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors border border-transparent hover:border-green-200"
                                                            title="Authorize Official"
                                                        >
                                                            <BadgeCheck className="w-4 h-4" />
                                                        </button>
                                                        <button
                                                            onClick={() => setReviewMode({ id: ref._id, status: 'Rejected' })}
                                                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-200"
                                                            title="Decline Assessment"
                                                        >
                                                            <XCircle className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                )}
                                                <button
                                                    onClick={() => handleDelete(ref._id)}
                                                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                    title="Purge Identity"
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

            <AdminModal
                isOpen={!!selectedReferee}
                onClose={() => setSelectedReferee(null)}
                title={`${selectedReferee?.surname} ${selectedReferee?.firstName}`}
                subtitle={selectedReferee?.currentGrade ? `${selectedReferee.currentGrade} Official` : "Referee Profile"}
                maxWidth="5xl"
                tabs={[
                    { id: 'general', label: 'Identity', icon: User },
                    { id: 'professional', label: 'Officiating', icon: Scale },
                    { id: 'fitness', label: 'Evaluation', icon: Stethoscope },
                    { id: 'disciplinary', label: 'Integrity', icon: Hammer },
                    { id: 'docs', label: 'Registry', icon: FileText }
                ]}
                activeTab={activeTab}
                onTabChange={setActiveTab}
                footer={
                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-3 text-sm text-gray-500">
                            <UserCog size={18} className="text-primary" />
                            <span>{selectedReferee?.reviewedBy ? `Verified by ${selectedReferee.reviewedBy}` : "Pending Verification"}</span>
                        </div>
                        <div className="flex gap-2">
                            {selectedReferee?.status === 'Pending' && (
                                <>
                                    <button
                                        onClick={() => setReviewMode({ id: selectedReferee._id, status: 'Rejected' })}
                                        className="px-6 py-2 rounded-xl border border-red-200 text-red-600 font-bold hover:bg-red-50 transition-all text-sm uppercase tracking-wider"
                                    >
                                        Decline
                                    </button>
                                    <button
                                        onClick={() => setReviewMode({ id: selectedReferee._id, status: 'Approved' })}
                                        className="px-6 py-2 rounded-xl bg-green-600 text-white font-bold hover:bg-green-700 transition-all shadow-md shadow-green-600/20 text-sm uppercase tracking-wider"
                                    >
                                        Approve
                                    </button>
                                </>
                            )}
                            <button
                                onClick={() => setSelectedReferee(null)}
                                className="px-6 py-2 bg-white border border-gray-200 text-gray-600 font-bold rounded-xl hover:bg-gray-100 transition-all text-sm uppercase tracking-wider"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                }
            >
                {selectedReferee && (
                    <div className="space-y-10">
                        <div className="flex flex-col md:flex-row items-center gap-8 pb-8 border-b border-gray-100">
                            <div className="w-24 h-24 rounded-2xl bg-white border border-gray-100 p-1 shadow-sm flex items-center justify-center shrink-0 overflow-hidden">
                                {selectedReferee.passportPhotographUrl ? (
                                    <img src={selectedReferee.passportPhotographUrl} alt="" className="w-full h-full object-cover" />
                                ) : (
                                    <User className="w-12 h-12 text-gray-200" />
                                )}
                            </div>
                            <div className="flex flex-wrap gap-4">
                                <div className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest ${selectedReferee.status === 'Approved' ? 'bg-green-50 text-green-700 border border-green-100' :
                                    selectedReferee.status === 'Pending' ? 'bg-yellow-50 text-yellow-700 border border-yellow-100' :
                                        'bg-red-50 text-red-700 border border-red-100'
                                    }`}>
                                    {selectedReferee.status}
                                </div>
                                <div className="px-4 py-2 bg-gray-50 text-gray-700 border border-gray-100 rounded-xl text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                                    <Scale size={14} className="text-secondary" />
                                    {selectedReferee.currentGrade}
                                </div>
                            </div>
                        </div>

                        {activeTab === 'general' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                <div className="space-y-8">
                                    <SectionTitle title="Personal Profile" />
                                    <div className="grid grid-cols-2 gap-6">
                                        <DataField label="Surname" value={selectedReferee.surname} />
                                        <DataField label="First Name" value={selectedReferee.firstName} />
                                        <DataField label="Gender" value={selectedReferee.gender} />
                                        <DataField label="Nationality" value={selectedReferee.nationality} />
                                    </div>
                                    <DataField label="Residential Address" value={selectedReferee.residentialAddress} />
                                </div>
                                <div className="space-y-8">
                                    <SectionTitle title="Contact & Next of Kin" />
                                    <div className="grid grid-cols-2 gap-6">
                                        <DataField label="Phone Number" value={selectedReferee.phoneNumber} icon={<Phone size={14} />} />
                                        <DataField label="Email Address" value={selectedReferee.email} icon={<Mail size={14} />} />
                                    </div>
                                    <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 space-y-4">
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Emergency Contact</p>
                                        <div className="grid grid-cols-2 gap-4">
                                            <DataField label="Name" value={selectedReferee.emergencyContactName} />
                                            <DataField label="Phone" value={selectedReferee.emergencyContactPhone} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'professional' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                <div className="space-y-8">
                                    <SectionTitle title="Technical Grading" />
                                    <div className="grid grid-cols-2 gap-6">
                                        <DataField label="Current Grade" value={selectedReferee.currentGrade} />
                                        <DataField label="Category" value={selectedReferee.refereeCategory} />
                                        <DataField label="Issuing Body" value={selectedReferee.certificationBody} />
                                        <DataField label="Badge Number" value={selectedReferee.certificateNumber} />
                                        <DataField label="Year Certified" value={selectedReferee.yearCertified} />
                                        <DataField label="License Expiry" value={selectedReferee.licenseExpiryDate} />
                                    </div>
                                </div>
                                <div className="space-y-8">
                                    <SectionTitle title="Match Experience" />
                                    <div className="grid grid-cols-2 gap-6">
                                        <DataField label="Total Matches" value={selectedReferee.totalMatchesOfficiated} />
                                        <DataField label="Experience" value={`${selectedReferee.yearsOfExperience} Years`} />
                                    </div>
                                    <DataField label="Peak Competition" value={selectedReferee.highestCompetitionOfficiated} />
                                    <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10">
                                        <DataField label="Recent Major Assignments" value={selectedReferee.recentMajorMatches} />
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'fitness' && (
                            <div className="max-w-4xl mx-auto space-y-8">
                                <SectionTitle title="Official Assessment Registry" icon={<Stethoscope size={16} />} />
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
                                        <div className="flex items-center gap-3">
                                            <Activity className="text-blue-500" size={20} />
                                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Physical Test</span>
                                        </div>
                                        <DataField label="Last Test Date" value={selectedReferee.lastFitnessTestDate} />
                                        <div className="flex items-center justify-between pt-2">
                                            <span className="text-xs font-bold text-gray-500">Result</span>
                                            <span className={`px-4 py-1 rounded-full text-[10px] font-bold uppercase ${selectedReferee.fitnessTestResult === 'Pass' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                {selectedReferee.fitnessTestResult || 'N/A'}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
                                        <div className="flex items-center gap-3">
                                            <Eye className="text-secondary" size={20} />
                                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Technical Assessment</span>
                                        </div>
                                        <DataField label="Last Evaluation" value={selectedReferee.lastAssessmentDate} />
                                        <div className="flex items-center justify-between pt-2">
                                            <span className="text-xs font-bold text-gray-500">Performance Rating</span>
                                            <span className="text-base font-bold text-primary">{selectedReferee.assessmentRating || '0.0'}/10</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'disciplinary' && (
                            <div className="max-w-2xl mx-auto bg-gray-50 rounded-3xl p-8 border border-gray-100">
                                <SectionTitle title="Disciplinary Registry" icon={<Hammer size={16} />} />
                                <div className="space-y-8 mt-6">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                        <div className="flex flex-col gap-2">
                                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Suspension Status</span>
                                            <span className={`text-sm font-bold px-4 py-2 rounded-xl border w-fit ${selectedReferee.underSuspension === 'Yes' ? 'bg-red-50 text-red-600 border-red-100' : 'bg-green-50 text-green-600 border-green-100'}`}>
                                                {selectedReferee.underSuspension === 'Yes' ? 'ACTIVE SUSPENSION' : 'CLEAR'}
                                            </span>
                                        </div>
                                        <DataField label="Prior Disciplinary Record" value={selectedReferee.previousDisciplinaryAction} />
                                    </div>
                                    <DataField label="Suspension Details" value={selectedReferee.suspensionDetails} />
                                    <div className="bg-white p-6 rounded-2xl border border-gray-100">
                                        <DataField label="Registry Remarks" value={selectedReferee.disciplinaryDetails} />
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'docs' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <DocumentLink label="Grading Certificate" url={selectedReferee.certificationUploadUrl} />
                                <DocumentLink label="Passport Photo" url={selectedReferee.passportPhotographUrl} />
                                <DocumentLink label="Birth Certificate" url={selectedReferee.birthCertificateUrl} />
                                <DocumentLink label="NIN Proof" url={selectedReferee.ninDocumentUrl} />
                                <DocumentLink label="Medical Fitness" url={selectedReferee.medicalFitnessCertificateUrl} />
                                <div className="bg-gray-50 rounded-2xl p-6 flex flex-col items-center justify-center text-center gap-3">
                                    <CreditCard size={24} className="text-gray-400" />
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-bold text-gray-400 uppercase">Payment Ref</p>
                                        <p className="text-xs font-bold text-gray-700">{selectedReferee.paymentReference || 'N/A'}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </AdminModal>

            <AdminModal
                isOpen={!!reviewMode}
                onClose={() => setReviewMode(null)}
                title={`${reviewMode?.status} Grading`}
                subtitle="Log administrative rationale"
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
                            placeholder={reviewMode?.status === 'Approved' ? "e.g. Assessment and fitness verified." : "e.g. Incomplete records."}
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
