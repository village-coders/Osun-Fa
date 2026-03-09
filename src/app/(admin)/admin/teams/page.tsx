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
            {selectedTeam && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm shadow-2xl">
                    <div className="bg-white rounded-[2rem] w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl animate-in fade-in zoom-in duration-200">
                        {/* Header */}
                        <div className="p-8 border-b border-gray-100 flex items-center justify-between bg-primary/5">
                            <div className="flex items-center gap-6">
                                <div className="w-20 h-20 rounded-[1.5rem] bg-white border border-gray-100 p-3 shrink-0 flex items-center justify-center shadow-sm">
                                    {selectedTeam.clubLogoUrl ? (
                                        <img src={selectedTeam.clubLogoUrl} alt="" className="w-full h-full object-contain" />
                                    ) : (
                                        <Building className="w-10 h-10 text-gray-300" />
                                    )}
                                </div>
                                <div>
                                    <h3 className="text-3xl font-extrabold text-gray-800 tracking-tight">{selectedTeam.name || selectedTeam.clubName}</h3>
                                    <div className="flex items-center gap-4 mt-2">
                                        <span className={`px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${selectedTeam.status === 'Approved' ? 'bg-green-100 text-green-700' :
                                                selectedTeam.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-red-100 text-red-700'
                                            }`}>
                                            {selectedTeam.status}
                                        </span>
                                        <span className="text-gray-400 text-sm font-semibold flex items-center gap-1.5 bg-white px-3 py-1 rounded-full border border-gray-100">
                                            <Trophy size={14} className="text-yellow-500" />
                                            {selectedTeam.clubCategory}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <button onClick={() => setSelectedTeam(null)} className="p-3 hover:bg-white hover:shadow-md rounded-full transition-all text-gray-400 hover:text-red-500">
                                <X size={28} />
                            </button>
                        </div>

                        {/* Tabs */}
                        <div className="flex border-b border-gray-100 bg-gray-50/30 px-8">
                            {[
                                { id: 'general', label: 'Primary Details', icon: FileText },
                                { id: 'management', label: 'Personnel', icon: UsersIcon },
                                { id: 'legal', label: 'Certificates', icon: BadgeCheck },
                                { id: 'stadium', label: 'Infra & Kits', icon: Landmark },
                                { id: 'banking', label: 'Treasury', icon: Landmark }
                            ].map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-2.5 px-6 py-5 text-sm font-bold transition-all border-b-2 relative ${activeTab === tab.id ? 'border-primary text-primary bg-white shadow-[0_4px_20px_-10px_rgba(var(--primary-rgb),0.3)]' : 'border-transparent text-gray-400 hover:text-gray-600 hover:bg-gray-100/50'
                                        }`}
                                >
                                    <tab.icon size={18} />
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        {/* Body */}
                        <div className="flex-1 overflow-y-auto p-10 bg-white custom-scrollbar">
                            {activeTab === 'general' && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                    <div className="space-y-8">
                                        <h4 className="text-xs font-black text-primary/40 uppercase tracking-[0.2em]">Profile Overview</h4>
                                        <div className="space-y-6">
                                            <DataField label="Official Registered Name" value={selectedTeam.name || selectedTeam.clubName} />
                                            <DataField label="Standard Nickname" value={selectedTeam.shortName || selectedTeam.shortNameNickname} />
                                            <DataField label="Year Established" value={selectedTeam.establishmentYear || selectedTeam.yearOfEstablishment} />
                                            <DataField label="League Affiliation" value={selectedTeam.leagueLevel} />
                                        </div>
                                    </div>
                                    <div className="space-y-8">
                                        <h4 className="text-xs font-black text-primary/40 uppercase tracking-[0.2em]">Regional Info</h4>
                                        <div className="space-y-6">
                                            <DataField label="Headquarters Address" value={selectedTeam.registeredAddress} />
                                            <DataField label="Local Govt Area" value={selectedTeam.lga} />
                                            <DataField label="City / Zone" value={selectedTeam.city || selectedTeam.townCity} />
                                            <div className="grid grid-cols-2 gap-4">
                                                <DataField label="Official Line" value={selectedTeam.officialPhone || selectedTeam.officialPhoneNumber} icon={<Phone size={14} />} />
                                                <DataField label="Official Email" value={selectedTeam.officialEmail || selectedTeam.officialEmailAddress} icon={<Mail size={14} />} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'management' && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                    <div className="space-y-8">
                                        <h4 className="text-xs font-black text-primary/40 uppercase tracking-[0.2em]">Governing Body</h4>
                                        <div className="space-y-6">
                                            <ManagementCard title="Chairman" name={selectedTeam.chairmanName} phone={selectedTeam.chairmanPhone} email={selectedTeam.chairmanEmail} />
                                            <ManagementCard title="Secretary General" name={selectedTeam.secretaryName} phone={selectedTeam.secretaryPhone} email={selectedTeam.secretaryEmail} />
                                        </div>
                                    </div>
                                    <div className="space-y-8">
                                        <h4 className="text-xs font-black text-primary/40 uppercase tracking-[0.2em]">Technical Department</h4>
                                        <div className="space-y-6">
                                            <ManagementCard title="Head Coach" name={selectedTeam.headCoachName} phone={selectedTeam.headCoachPhone} badge={selectedTeam.headCoachLicenseLevel} />
                                            <ManagementCard title="Team Manager" name={selectedTeam.teamManagerName} phone={selectedTeam.teamManagerPhone} />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'legal' && (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    <DocumentLink label="CAC Certificate" url={selectedTeam.cacRegistrationCertificateUrl} />
                                    <DocumentLink label="OSFA Affiliation" url={selectedTeam.osfaAffiliationCertificateUrl} />
                                    <DocumentLink label="Club Constitution" url={selectedTeam.constitutionUrl} />
                                    <DocumentLink label="Registration Letter" url={selectedTeam.applicationLetterUrl} />
                                </div>
                            )}

                            {activeTab === 'stadium' && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                    <div className="space-y-8">
                                        <h4 className="text-xs font-black text-primary/40 uppercase tracking-[0.2em]">Physical Assets</h4>
                                        <div className="space-y-6">
                                            <DataField label="Primary Stadium" value={selectedTeam.homeGroundName} />
                                            <DataField label="Physical Address" value={selectedTeam.stadiumAddress} />
                                            <DataField label="Secondary Grounds" value={selectedTeam.trainingGround} />
                                        </div>
                                    </div>
                                    <div className="space-y-8">
                                        <h4 className="text-xs font-black text-primary/40 uppercase tracking-[0.2em]">Kit Branding</h4>
                                        <div className="space-y-6">
                                            <div className="grid grid-cols-2 gap-6">
                                                <DataField label="Home Colors" value={selectedTeam.homeKitColor} />
                                                <DataField label="Away Colors" value={selectedTeam.awayKitColor} />
                                            </div>
                                            <DataField label="Reg. Squad Limit" value={selectedTeam.numberOfPlayers} />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'banking' && (
                                <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-10 border border-gray-100 max-w-2xl shadow-sm">
                                    <div className="flex items-center gap-4 mb-10">
                                        <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                                            <Landmark size={24} />
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-extrabold text-gray-800">Financial Records</h4>
                                            <p className="text-sm text-gray-400">Official banking details for fee payments.</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                                        <DataField label="Financial Institution" value={selectedTeam.bankName} />
                                        <DataField label="Account Holder" value={selectedTeam.accountName} />
                                        <DataField label="Account Number" value={selectedTeam.accountNumber} />
                                        <DataField label="Affiliation Payment Ref" value={selectedTeam.paymentReference} />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="p-8 border-t border-gray-100 bg-gray-50/50 flex flex-col sm:flex-row justify-between items-center gap-6">
                            <div className="flex items-center gap-3">
                                <div className="p-2.5 bg-white rounded-xl shadow-sm border border-gray-100">
                                    <UserCog size={20} className="text-primary" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Audit Trail</span>
                                    <span className="text-sm font-bold text-gray-700">{selectedTeam.reviewedBy ? `Last action by ${selectedTeam.reviewedBy}` : 'Unreviewed Application'}</span>
                                </div>
                            </div>
                            <div className="flex gap-4 w-full sm:w-auto">
                                {selectedTeam.status === 'Pending' && (
                                    <>
                                        <button
                                            onClick={() => setReviewMode({ id: selectedTeam._id, status: 'Rejected' })}
                                            className="flex-1 sm:flex-none px-8 py-3.5 rounded-2xl border-2 border-orange-100 text-orange-600 font-extrabold hover:bg-orange-50 hover:border-orange-200 transition-all text-sm"
                                        >
                                            Decline Application
                                        </button>
                                        <button
                                            onClick={() => setReviewMode({ id: selectedTeam._id, status: 'Approved' })}
                                            className="flex-1 sm:flex-none px-10 py-3.5 rounded-2xl bg-green-600 text-white font-extrabold hover:bg-green-700 transition-all shadow-xl shadow-green-600/20 text-sm"
                                        >
                                            Approve Member
                                        </button>
                                    </>
                                )}
                                <button onClick={() => setSelectedTeam(null)} className="flex-1 sm:flex-none px-8 py-3.5 bg-white border border-gray-200 text-gray-600 font-extrabold rounded-2xl hover:bg-gray-50 transition-all text-sm">
                                    Exit View
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Review Decision Modal */}
            {reviewMode && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
                    <div className="bg-white rounded-[2.5rem] w-full max-w-md p-10 animate-in slide-in-from-bottom-8 duration-300 shadow-2xl overflow-hidden relative">
                        <div className="absolute top-0 right-0 p-8">
                            <button onClick={() => setReviewMode(null)} className="text-gray-300 hover:text-gray-500 transition-colors">
                                <X size={24} />
                            </button>
                        </div>

                        <div className="mb-10 text-center">
                            <div className={`w-20 h-20 mx-auto rounded-3xl flex items-center justify-center mb-6 ${reviewMode.status === 'Approved' ? 'bg-green-50 text-green-600 shadow-lg shadow-green-600/10' : 'bg-orange-50 text-orange-600 shadow-lg shadow-orange-600/10'}`}>
                                <AlertCircle size={40} />
                            </div>
                            <h3 className="text-2xl font-black text-gray-800 tracking-tight">{reviewMode.status} Club Membership</h3>
                            <p className="text-gray-500 mt-2 font-medium">Please provide an official justification for this decision.</p>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between px-1">
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest leading-none">Internal Remarks</label>
                                <span className="text-[10px] font-bold text-gray-300 italic">Sent to Club Dashboard</span>
                            </div>
                            <textarea
                                value={remarks}
                                onChange={(e) => setRemarks(e.target.value)}
                                placeholder={reviewMode.status === 'Approved' ? "e.g. Documentation verified. Application is sufficient." : "e.g. CAC Certificate is expired. Please re-upload."}
                                className="w-full p-5 bg-gray-50 border border-gray-100 rounded-3xl h-40 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary focus:bg-white transition-all text-sm font-semibold text-gray-700"
                            />
                        </div>

                        <div className="flex flex-col gap-3 mt-10">
                            <button
                                onClick={() => handleUpdateStatus(reviewMode.id, reviewMode.status)}
                                className={`w-full py-5 text-white font-black rounded-3xl shadow-2xl transition-all transform active:scale-[0.98] ${reviewMode.status === 'Approved' ? 'bg-green-600 hover:bg-green-700 shadow-green-600/30' : 'bg-orange-600 hover:bg-orange-700 shadow-orange-600/30'
                                    }`}
                            >
                                Execute Decision
                            </button>
                            <button onClick={() => setReviewMode(null)} className="w-full py-4 text-gray-400 font-black rounded-3xl hover:bg-gray-100 hover:text-gray-600 transition-all text-xs uppercase tracking-widest">
                                Reconsider Settings
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
            <span className="text-[10px] font-black text-gray-400 uppercase block mb-1.5 tracking-widest opacity-60">{label}</span>
            <div className="flex items-center gap-2.5 text-gray-800 font-bold group-hover:text-primary transition-all">
                {icon && <span className="text-primary/40 group-hover:text-primary transition-colors">{icon}</span>}
                <span className="leading-tight">{value || 'Not provided'}</span>
            </div>
        </div>
    );
}

function ManagementCard({ title, name, phone, email, badge }: { title: string, name?: string, phone?: string, email?: string, badge?: string }) {
    if (!name) return null;
    return (
        <div className="bg-white border border-gray-100 rounded-[1.5rem] p-6 shadow-sm hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all group overflow-hidden relative">
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-500"></div>
            <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-black text-primary px-3 py-1.5 bg-primary/10 rounded-lg uppercase tracking-widest leading-none outline outline-1 outline-white shadow-sm">{title}</span>
                    {badge && <span className="text-[10px] font-black text-gray-400 bg-gray-50 px-2.5 py-1.5 rounded-lg border border-gray-100">{badge}</span>}
                </div>
                <p className="font-extrabold text-gray-800 text-xl mb-4 group-hover:text-primary transition-colors">{name}</p>
                <div className="space-y-2">
                    {phone && (
                        <div className="flex items-center gap-3 text-gray-400 group-hover:text-gray-600 transition-colors">
                            <div className="w-7 h-7 bg-gray-50 rounded-lg flex items-center justify-center text-gray-300 group-hover:text-primary/50 transition-colors shadow-sm">
                                <Phone size={12} />
                            </div>
                            <span className="text-sm font-bold">{phone}</span>
                        </div>
                    )}
                    {email && (
                        <div className="flex items-center gap-3 text-gray-400 group-hover:text-gray-600 transition-colors">
                            <div className="w-7 h-7 bg-gray-50 rounded-lg flex items-center justify-center text-gray-300 group-hover:text-primary/50 transition-colors shadow-sm">
                                <Mail size={12} />
                            </div>
                            <span className="text-sm font-bold truncate">{email}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function DocumentLink({ label, url }: { label: string, url?: string }) {
    if (!url) {
        return (
            <div className="bg-gray-50/50 border-2 border-dashed border-gray-100 rounded-[2rem] p-8 flex flex-col items-center justify-center gap-4 h-full opacity-60">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-gray-200 shadow-inner">
                    <AlertCircle size={28} />
                </div>
                <div className="text-center">
                    <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">{label}</p>
                    <p className="text-sm font-bold text-gray-300 mt-1 italic">MISSING RECORD</p>
                </div>
            </div>
        );
    }
    return (
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white border border-gray-100 rounded-[2rem] p-8 flex flex-col items-center justify-center gap-5 h-full hover:border-primary hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2 transition-all group overflow-hidden relative shadow-sm"
        >
            <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <ExternalLink size={18} className="text-primary/30" />
            </div>
            <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all transform group-hover:rotate-6 shadow-sm">
                <FileText size={32} />
            </div>
            <div className="text-center">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1 group-hover:text-primary/60 transition-colors">{label}</p>
                <div className="flex items-center justify-center gap-1.5 text-primary text-sm font-black">
                    <span className="leading-none">Open Document</span>
                </div>
            </div>
        </a>
    );
}
