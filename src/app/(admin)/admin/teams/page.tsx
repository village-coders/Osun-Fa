"use client";

import { useState, useEffect, useMemo } from "react";
import api from "@/lib/api";
import toast from "react-hot-toast";
import {
    Eye,
    MessageSquare,
    FileText,
    Phone,
    Mail,
    Clock,
    Settings,
    Building,
    Shield,
    Trophy,
    BadgeCheck,
    AlertCircle,
    X,
    ExternalLink,
    Landmark,
    Users as UsersIcon,
    UserCog,
    Search,
    Loader2
} from "lucide-react";
import AdminModal from "@/components/AdminModal";

export default function AdminTeamsPage() {
    const [teams, setTeams] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedTeam, setSelectedTeam] = useState<any>(null);
    const [reviewMode, setReviewMode] = useState<{ id: string, status: string } | null>(null);
    const [remarks, setRemarks] = useState("");
    const [activeTab, setActiveTab] = useState("general");

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const res = await api.get('/clubs/public');
                setTeams(res.data);
            } catch (error) {
                toast.error("Failed to load clubs");
            } finally {
                setLoading(false);
            }
        };
        fetchTeams();
    }, []);

    const handleUpdateStatus = async (id: string, status: string) => {
        try {
            await api.put(`/clubs/${id}/status`, { status, remarks });
            setTeams(teams.map(t => t._id === id ? { ...t, status, remarks } : t));
            toast.success(`Club ${status.toLowerCase()}`);
            setReviewMode(null);
            setRemarks("");
            // If the selected team being viewed is the one updated, refresh it too
            if (selectedTeam?._id === id) {
                setSelectedTeam({ ...selectedTeam, status, remarks });
            }
        } catch (error) {
            toast.error("Failed to update status");
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this club?")) return;
        try {
            await api.delete(`/clubs/${id}`);
            setTeams(teams.filter(t => t._id !== id));
            toast.success("Club deleted");
        } catch (error) {
            toast.error("Failed to delete club");
        }
    };

    const filteredTeams = useMemo(() => {
        return teams.filter(t =>
            (t.name || t.clubName)?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            t.headCoachName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            t.lga?.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [teams, searchQuery]);

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Manage Registered Clubs</h2>
                    <p className="text-sm text-gray-500 mt-1">Review affiliation requests and manage active teams.</p>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full">
                <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-4 justify-between bg-gray-50/50">
                    <div className="relative w-full sm:w-96">
                        <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search clubs by name, coach, or regional area..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto w-full">
                    <table className="w-full text-left text-sm whitespace-nowrap min-w-[800px]">
                        <thead className="bg-gray-50 text-gray-500 font-semibold border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4">Club Details</th>
                                <th className="px-6 py-4">Head Coach</th>
                                <th className="px-6 py-4">LGA</th>
                                <th className="px-6 py-4">Category</th>
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
                                            <span>Loading clubs...</span>
                                        </div>
                                    </td>
                                </tr>
                            ) : filteredTeams.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-8 text-center text-gray-500">No clubs found</td>
                                </tr>
                            ) : (
                                filteredTeams.map((team) => (
                                    <tr key={team._id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4 font-bold text-gray-800">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-gray-100 flex shrink-0 items-center justify-center text-gray-400 overflow-hidden border border-gray-200">
                                                    {team.clubLogoUrl ? (
                                                        <img src={team.clubLogoUrl} alt="" className="w-full h-full object-cover" />
                                                    ) : (
                                                        <Shield className="w-4 h-4" />
                                                    )}
                                                </div>
                                                <span className="truncate max-w-[150px]">{team.name || team.clubName}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600 font-medium">{team.headCoachName || 'N/A'}</td>
                                        <td className="px-6 py-4 text-gray-600">{team.lga || 'N/A'}</td>
                                        <td className="px-6 py-4">
                                            <span className="text-xs font-semibold bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full border border-gray-200">{team.clubCategory || 'Academy'}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${team.status === 'Approved' ? 'bg-green-100 text-green-700 border border-green-200' :
                                                team.status === 'Pending' ? 'bg-yellow-100 text-yellow-700 border border-yellow-200' :
                                                    'bg-red-100 text-red-700 border border-red-200'
                                                }`}>
                                                {team.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => setSelectedTeam(team)}
                                                    className="p-2 text-primary hover:bg-primary/5 rounded-lg transition-colors border border-transparent hover:border-primary/20"
                                                    title="View Profile Details"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                                {team.status === 'Pending' && (
                                                    <div className="flex gap-1">
                                                        <button
                                                            onClick={() => setReviewMode({ id: team._id, status: 'Approved' })}
                                                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors border border-transparent hover:border-green-200"
                                                            title="Quick Approve"
                                                        >
                                                            <BadgeCheck className="w-4 h-4" />
                                                        </button>
                                                        <button
                                                            onClick={() => setReviewMode({ id: team._id, status: 'Rejected' })}
                                                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-200"
                                                            title="Quick Reject"
                                                        >
                                                            <X className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                )}
                                                <button
                                                    onClick={() => handleDelete(team._id)}
                                                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                    title="Delete Record"
                                                >
                                                    <Settings className="w-4 h-4" />
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

            {/* Club Details Modal */}
            <AdminModal
                isOpen={!!selectedTeam}
                onClose={() => setSelectedTeam(null)}
                title={selectedTeam?.name || selectedTeam?.clubName}
                subtitle={selectedTeam?.clubCategory || "Club Profile"}
                maxWidth="5xl"
                tabs={[
                    { id: 'general', label: 'Primary Details', icon: FileText },
                    { id: 'management', label: 'Personnel', icon: UsersIcon },
                    { id: 'legal', label: 'Certificates', icon: BadgeCheck },
                    { id: 'stadium', label: 'Infra & Kits', icon: Landmark },
                    { id: 'banking', label: 'Treasury', icon: Landmark }
                ]}
                activeTab={activeTab}
                onTabChange={setActiveTab}
                footer={
                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-3 text-sm text-gray-500">
                            <UserCog size={18} className="text-primary" />
                            <span>{selectedTeam?.reviewedBy ? `Last review by ${selectedTeam.reviewedBy}` : "Pending Review"}</span>
                        </div>
                        <div className="flex gap-2">
                            {selectedTeam?.status === 'Pending' && (
                                <>
                                    <button
                                        onClick={() => setReviewMode({ id: selectedTeam._id, status: 'Rejected' })}
                                        className="px-6 py-2 rounded-xl border border-red-200 text-red-600 font-bold hover:bg-red-50 transition-all text-sm uppercase tracking-wider"
                                    >
                                        Decline
                                    </button>
                                    <button
                                        onClick={() => setReviewMode({ id: selectedTeam._id, status: 'Approved' })}
                                        className="px-6 py-2 rounded-xl bg-green-600 text-white font-bold hover:bg-green-700 transition-all shadow-md shadow-green-600/20 text-sm uppercase tracking-wider"
                                    >
                                        Approve
                                    </button>
                                </>
                            )}
                            <button
                                onClick={() => setSelectedTeam(null)}
                                className="px-6 py-2 bg-white border border-gray-200 text-gray-600 font-bold rounded-xl hover:bg-gray-100 transition-all text-sm uppercase tracking-wider"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                }
            >
                {selectedTeam && (
                    <div className="space-y-10">
                        {/* Header Content */}
                        <div className="flex flex-col md:flex-row items-center gap-8 pb-8 border-b border-gray-100">
                            <div className="w-24 h-24 rounded-2xl bg-white border border-gray-100 p-3 shadow-sm flex items-center justify-center shrink-0">
                                {selectedTeam.clubLogoUrl ? (
                                    <img src={selectedTeam.clubLogoUrl} alt="" className="w-full h-full object-contain" />
                                ) : (
                                    <Building className="w-12 h-12 text-gray-200" />
                                )}
                            </div>
                            <div className="flex flex-wrap gap-4">
                                <div className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest ${selectedTeam.status === 'Approved' ? 'bg-green-50 text-green-700 border border-green-100' :
                                        selectedTeam.status === 'Pending' ? 'bg-yellow-50 text-yellow-700 border border-yellow-100' :
                                            'bg-red-50 text-red-700 border border-red-100'
                                    }`}>
                                    {selectedTeam.status}
                                </div>
                                <div className="px-4 py-2 bg-gray-50 text-gray-700 border border-gray-100 rounded-xl text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                                    <Trophy size={14} className="text-yellow-500" />
                                    {selectedTeam.clubCategory}
                                </div>
                            </div>
                        </div>

                        {activeTab === 'general' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                <div className="space-y-8">
                                    <SectionTitle title="Profile Overview" />
                                    <div className="space-y-6">
                                        <DataField label="Official Registered Name" value={selectedTeam.name || selectedTeam.clubName} />
                                        <DataField label="Standard Nickname" value={selectedTeam.shortName || selectedTeam.shortNameNickname} />
                                        <DataField label="Year Established" value={selectedTeam.establishmentYear || selectedTeam.yearOfEstablishment} />
                                        <DataField label="League Affiliation" value={selectedTeam.leagueLevel} />
                                    </div>
                                </div>
                                <div className="space-y-8">
                                    <SectionTitle title="Regional Info" />
                                    <div className="space-y-6">
                                        <DataField label="Headquarters Address" value={selectedTeam.registeredAddress} />
                                        <DataField label="Local Govt Area" value={selectedTeam.lga} />
                                        <DataField label="City / Zone" value={selectedTeam.city || selectedTeam.townCity} />
                                        <div className="grid grid-cols-2 gap-4">
                                            <DataField label="Official Line" value={selectedTeam.officialPhone} icon={<Phone size={14} />} />
                                            <DataField label="Official Email" value={selectedTeam.officialEmail} icon={<Mail size={14} />} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'management' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-6">
                                    <SectionTitle title="Governing Body" />
                                    <ManagementCard title="Chairman" name={selectedTeam.chairmanName} phone={selectedTeam.chairmanPhone} email={selectedTeam.chairmanEmail} />
                                    <ManagementCard title="Secretary General" name={selectedTeam.secretaryName} phone={selectedTeam.secretaryPhone} email={selectedTeam.secretaryEmail} />
                                </div>
                                <div className="space-y-6">
                                    <SectionTitle title="Technical Department" />
                                    <ManagementCard title="Head Coach" name={selectedTeam.headCoachName} phone={selectedTeam.headCoachPhone} badge={selectedTeam.headCoachLicenseLevel} />
                                    <ManagementCard title="Team Manager" name={selectedTeam.teamManagerName} phone={selectedTeam.teamManagerPhone} />
                                </div>
                            </div>
                        )}

                        {activeTab === 'legal' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <DocumentLink label="CAC Certificate" url={selectedTeam.cacRegistrationCertificateUrl} />
                                <DocumentLink label="Osun FA Affiliation" url={selectedTeam.osfaAffiliationCertificateUrl} />
                                <DocumentLink label="Club Constitution" url={selectedTeam.constitutionUrl} />
                                <DocumentLink label="Registration Letter" url={selectedTeam.applicationLetterUrl} />
                            </div>
                        )}

                        {activeTab === 'stadium' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                <div className="space-y-8">
                                    <SectionTitle title="Physical Assets" />
                                    <div className="space-y-6">
                                        <DataField label="Primary Stadium" value={selectedTeam.homeGroundName} />
                                        <DataField label="Physical Address" value={selectedTeam.stadiumAddress} />
                                        <DataField label="Secondary Grounds" value={selectedTeam.trainingGround} />
                                    </div>
                                </div>
                                <div className="space-y-8">
                                    <SectionTitle title="Kit Branding" />
                                    <div className="grid grid-cols-2 gap-6">
                                        <DataField label="Home Colors" value={selectedTeam.homeKitColor} />
                                        <DataField label="Away Colors" value={selectedTeam.awayKitColor} />
                                    </div>
                                    <DataField label="Reg. Squad Limit" value={selectedTeam.numberOfPlayers} />
                                </div>
                            </div>
                        )}

                        {activeTab === 'banking' && (
                            <div className="max-w-2xl mx-auto bg-gray-50 rounded-3xl p-8 border border-gray-100">
                                <SectionTitle title="Financial Records" icon={<Landmark size={16} />} />
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-6">
                                    <DataField label="Financial Institution" value={selectedTeam.bankName} />
                                    <DataField label="Account Holder" value={selectedTeam.accountName} />
                                    <DataField label="Account Number" value={selectedTeam.accountNumber} />
                                    <DataField label="Payment Ref" value={selectedTeam.paymentReference} />
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
                title={`${reviewMode?.status} Club Membership`}
                subtitle="Provide official administrative justification"
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
                            placeholder={reviewMode?.status === 'Approved' ? "e.g. Documentation verified." : "e.g. CAC Certificate is expired."}
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

function ManagementCard({ title, name, phone, email, badge }: { title: string, name?: string, phone?: string, email?: string, badge?: string }) {
    if (!name) return null;
    return (
        <div className="bg-white border border-gray-100 rounded-2xl p-5 hover:border-primary transition-all group shadow-sm">
            <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold text-primary px-2 py-1 bg-primary/5 rounded-lg uppercase tracking-widest">{title}</span>
                {badge && <span className="text-[10px] font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded-lg border border-gray-100">{badge}</span>}
            </div>
            <p className="font-bold text-gray-800 text-lg mb-4">{name}</p>
            <div className="space-y-2">
                {phone && (
                    <div className="flex items-center gap-3 text-gray-500 text-sm">
                        <Phone size={12} className="text-gray-300" />
                        <span className="font-medium">{phone}</span>
                    </div>
                )}
                {email && (
                    <div className="flex items-center gap-3 text-gray-500 text-sm">
                        <Mail size={12} className="text-gray-300" />
                        <span className="font-medium truncate">{email}</span>
                    </div>
                )}
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
