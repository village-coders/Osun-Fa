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
    User,
    Shield,
    Trophy,
    BadgeCheck,
    AlertCircle,
    X,
    ExternalLink,
    Landmark,
    Building,
    Users as UsersIcon,
    UserCog,
    Search,
    Loader2,
    Calendar,
    MapPin,
    Dna,
    Activity,
    ScanEye,
    CheckCircle2,
    XCircle,
    Trash2,
    FileSearch,
    Fingerprint
} from "lucide-react";
import AdminModal from "@/components/AdminModal";

export default function AdminPlayersPage() {
    const [players, setPlayers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedPlayer, setSelectedPlayer] = useState<any>(null);
    const [reviewMode, setReviewMode] = useState<{ id: string, status: string } | null>(null);
    const [remarks, setRemarks] = useState("");
    const [activeTab, setActiveTab] = useState("general");

    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                const res = await api.get('/players');
                setPlayers(res.data);
            } catch (error) {
                toast.error("Failed to load players");
            } finally {
                setLoading(false);
            }
        };
        fetchPlayers();
    }, []);

    const handleUpdateStatus = async (id: string, status: string) => {
        try {
            await api.put(`/players/${id}/status`, { status, remarks });
            setPlayers(players.map(p => p._id === id ? { ...p, status, remarks } : p));
            toast.success(`Player ${status.toLowerCase()}`);
            setReviewMode(null);
            setRemarks("");
            if (selectedPlayer?._id === id) {
                setSelectedPlayer({ ...selectedPlayer, status, remarks });
            }
        } catch (error) {
            toast.error("Failed to update status");
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this player?")) return;
        try {
            await api.delete(`/players/${id}`);
            setPlayers(players.filter(p => p._id !== id));
            toast.success("Player deleted");
        } catch (error) {
            toast.error("Failed to delete player");
        }
    };

    const filteredPlayers = useMemo(() => {
        return players.filter(p =>
            (p.surname + " " + p.firstName + " " + (p.otherNames || "")).toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.playerName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.currentClubName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.lga?.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [players, searchQuery]);

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Player Registry</h2>
                    <p className="text-sm text-gray-500 mt-1">Manage official player licenses and transfers.</p>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full">
                <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-4 justify-between bg-gray-50/50">
                    <div className="relative w-full sm:w-96">
                        <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by name, club, or regional area..."
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
                                <th className="px-6 py-4">Player Details</th>
                                <th className="px-6 py-4">Club / Affiliation</th>
                                <th className="px-6 py-4">Position</th>
                                <th className="px-6 py-4">Verification</th>
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
                                            <span>Scanning database...</span>
                                        </div>
                                    </td>
                                </tr>
                            ) : filteredPlayers.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-8 text-center text-gray-500">No players matched your search</td>
                                </tr>
                            ) : (
                                filteredPlayers.map((player) => (
                                    <tr key={player._id} className="hover:bg-gray-50/50 transition-colors group">
                                        <td className="px-6 py-4 font-bold text-gray-800">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-gray-100 flex shrink-0 items-center justify-center text-gray-400 overflow-hidden border border-gray-200 shadow-sm transition-transform group-hover:scale-110">
                                                    {player.passportPhotographUrl ? (
                                                        <img src={player.passportPhotographUrl} alt="" className="w-full h-full object-cover" />
                                                    ) : (
                                                        <User className="w-5 h-5" />
                                                    )}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="truncate max-w-[180px] font-extrabold">{player.playerName || `${player.surname} ${player.firstName}`}</span>
                                                    <span className="text-[10px] text-gray-400 uppercase tracking-widest">{player.dateOfBirth}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600 font-medium">
                                            <div className="flex flex-col">
                                                <span className="truncate max-w-[150px]">{player.currentClubName || 'Released / FA'}</span>
                                                <span className="text-[10px] text-primary/60 font-bold uppercase">{player.clubRegistrationNumber || 'REG-PENDING'}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="text-gray-600 font-bold">{player.playingPosition}</span>
                                                <span className="text-[10px] text-gray-400 capitalize">{player.dominantFoot} Foot</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                {player.faceDescriptor && player.faceDescriptor.length > 0 ? (
                                                    <div className="flex items-center gap-1.5 px-2 py-0.5 bg-blue-50 text-blue-600 rounded-md border border-blue-100 text-[10px] font-black uppercase">
                                                        <ScanEye size={12} />
                                                        Bio-Verified
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center gap-1.5 px-2 py-0.5 bg-orange-50 text-orange-600 rounded-md border border-orange-100 text-[10px] font-black uppercase">
                                                        <AlertCircle size={12} />
                                                        No Face Data
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${player.status === 'Approved' ? 'bg-green-100 text-green-700 border border-green-200' :
                                                player.status === 'Pending' ? 'bg-yellow-100 text-yellow-700 border border-yellow-200' :
                                                    'bg-red-100 text-red-700 border border-red-200'
                                                }`}>
                                                {player.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => { setSelectedPlayer(player); setActiveTab("general"); }}
                                                    className="p-2 text-primary hover:bg-primary/5 rounded-lg transition-colors border border-transparent hover:border-primary/20"
                                                    title="View Full Identity"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                                {player.status === 'Pending' && (
                                                    <div className="flex gap-1">
                                                        <button
                                                            onClick={() => setReviewMode({ id: player._id, status: 'Approved' })}
                                                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors border border-transparent hover:border-green-200"
                                                            title="Approve Member"
                                                        >
                                                            <BadgeCheck className="w-4 h-4" />
                                                        </button>
                                                        <button
                                                            onClick={() => setReviewMode({ id: player._id, status: 'Rejected' })}
                                                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-200"
                                                            title="Revoke Application"
                                                        >
                                                            <XCircle className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                )}
                                                <button
                                                    onClick={() => handleDelete(player._id)}
                                                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                    title="Purge Record"
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

            {/* Player Details Modal */}
            <AdminModal
                isOpen={!!selectedPlayer}
                onClose={() => setSelectedPlayer(null)}
                title={`${selectedPlayer?.surname} ${selectedPlayer?.firstName}`}
                subtitle={selectedPlayer?.otherNames ? `(${selectedPlayer.otherNames})` : "Official Player Identity"}
                maxWidth="6xl"
                tabs={[
                    { id: 'general', label: 'Identity', icon: User },
                    { id: 'technical', label: 'Technical', icon: Activity },
                    { id: 'medical', label: 'Health', icon: Dna },
                    { id: 'legal', label: 'Documents', icon: BadgeCheck },
                    { id: 'verification', label: 'Biometrics', icon: ScanEye }
                ]}
                activeTab={activeTab}
                onTabChange={setActiveTab}
                footer={
                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-3 text-sm text-gray-500">
                            <UserCog size={18} className="text-primary" />
                            <span>{selectedPlayer?.reviewedBy ? `Last review by ${selectedPlayer.reviewedBy}` : "Pending Review"}</span>
                        </div>
                        <div className="flex gap-2">
                            {selectedPlayer?.status === 'Pending' && (
                                <>
                                    <button
                                        onClick={() => setReviewMode({ id: selectedPlayer._id, status: 'Rejected' })}
                                        className="px-6 py-2 rounded-xl border border-red-200 text-red-600 font-bold hover:bg-red-50 transition-all text-sm uppercase tracking-wider"
                                    >
                                        Reject
                                    </button>
                                    <button
                                        onClick={() => setReviewMode({ id: selectedPlayer._id, status: 'Approved' })}
                                        className="px-6 py-2 rounded-xl bg-green-600 text-white font-bold hover:bg-green-700 transition-all shadow-md shadow-green-600/20 text-sm uppercase tracking-wider"
                                    >
                                        Approve
                                    </button>
                                </>
                            )}
                            <button
                                onClick={() => setSelectedPlayer(null)}
                                className="px-6 py-2 bg-white border border-gray-200 text-gray-600 font-bold rounded-xl hover:bg-gray-100 transition-all text-sm uppercase tracking-wider"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                }
            >
                {selectedPlayer && (
                    <div className="space-y-10">
                        {/* Header Content (Photo & Position) */}
                        <div className="flex flex-col md:flex-row items-center gap-8 pb-8 border-b border-gray-100">
                            <div className="w-32 h-32 rounded-3xl bg-gray-50 border-4 border-white shadow-xl overflow-hidden shrink-0">
                                {selectedPlayer.passportPhotographUrl ? (
                                    <img src={selectedPlayer.passportPhotographUrl} alt="" className="w-full h-full object-cover" />
                                ) : (
                                    <User className="w-full h-full p-8 text-gray-200" />
                                )}
                            </div>
                            <div className="flex flex-wrap gap-4">
                                <div className="px-4 py-2 bg-yellow-50 text-yellow-700 border border-yellow-100 rounded-xl text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                                    <Trophy size={14} />
                                    {selectedPlayer.playingPosition}
                                </div>
                                <div className="px-4 py-2 bg-blue-50 text-blue-700 border border-blue-100 rounded-xl text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                                    <Building size={14} />
                                    {selectedPlayer.currentClubName || "Free Agent"}
                                </div>
                                <div className="px-4 py-2 bg-primary/5 text-primary border border-primary/10 rounded-xl text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                                    <BadgeCheck size={14} />
                                    {selectedPlayer.status}
                                </div>
                            </div>
                        </div>

                        {/* Tab Content */}
                        {activeTab === 'general' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                <div className="space-y-8">
                                    <SectionTitle title="Personal Profile" icon={<User size={16} />} />
                                    <div className="grid grid-cols-2 gap-6">
                                        <DataField label="Surname" value={selectedPlayer.surname} />
                                        <DataField label="First Name" value={selectedPlayer.firstName} />
                                        <DataField label="Gender" value={selectedPlayer.gender} />
                                        <DataField label="Nationality" value={selectedPlayer.nationality} />
                                        <DataField label="State of Origin" value={selectedPlayer.stateOfOrigin} />
                                        <DataField label="LGA" value={selectedPlayer.lga} />
                                    </div>
                                    <DataField label="Residential Address" value={selectedPlayer.residentialAddress} />
                                </div>
                                <div className="space-y-8">
                                    <SectionTitle title="Contact Registry" icon={<Phone size={16} />} />
                                    <div className="grid grid-cols-2 gap-6">
                                        <DataField label="Phone" value={selectedPlayer.phoneNumber} icon={<Phone size={14} />} />
                                        <DataField label="Email" value={selectedPlayer.emailAddress} icon={<Mail size={14} />} />
                                    </div>
                                    <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 space-y-6">
                                        <SectionTitle title="Guardian / Next of Kin" icon={<Shield size={14} />} />
                                        <DataField label="Full Name" value={selectedPlayer.emergencyContactName} />
                                        <div className="grid grid-cols-2 gap-6">
                                            <DataField label="Phone" value={selectedPlayer.emergencyContactPhone} />
                                            <DataField label="Relationship" value={selectedPlayer.relationshipToEmergencyContact} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'technical' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                <div className="space-y-8">
                                    <SectionTitle title="Pitch Performance" icon={<Activity size={16} />} />
                                    <div className="grid grid-cols-2 gap-6">
                                        <DataField label="Main Position" value={selectedPlayer.playingPosition} />
                                        <DataField label="Alt Position" value={selectedPlayer.preferredPosition} />
                                        <DataField label="Kit Number" value={selectedPlayer.jerseyNumber} />
                                        <DataField label="Dominant Foot" value={selectedPlayer.dominantFoot} />
                                        <DataField label="Height (CM)" value={selectedPlayer.heightCm} />
                                        <DataField label="Weight (KG)" value={selectedPlayer.weightKg} />
                                    </div>
                                </div>
                                <div className="space-y-8">
                                    <SectionTitle title="Historical Data" icon={<FileSearch size={16} />} />
                                    <DataField label="Previous Clubs" value={selectedPlayer.previousClubs} />
                                    <div className="bg-primary/5 rounded-2xl p-6 border border-primary/10">
                                        <SectionTitle title="Transfer Verification" icon={<AlertCircle size={14} />} />
                                        <div className="grid grid-cols-1 gap-4 mt-4">
                                            <DataField label="Outstanding Issues?" value={selectedPlayer.outstandingTransferIssues} />
                                            <DataField label="Admin Remarks" value={selectedPlayer.transferIssueDetails} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'medical' && (
                            <div className="max-w-3xl mx-auto bg-gray-50 rounded-3xl p-8 border border-gray-100">
                                <SectionTitle title="Health Registry" icon={<Activity size={16} />} />
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-8">
                                    <div className="space-y-6">
                                        <DataField label="Blood Group" value={selectedPlayer.bloodGroup} />
                                        <DataField label="Known Allergies" value={selectedPlayer.allergies} />
                                    </div>
                                    <div className="space-y-6">
                                        <DataField label="Pre-existing Conditions" value={selectedPlayer.knownMedicalConditions} />
                                        <DocumentLink label="Medical Clearance" url={selectedPlayer.medicalClearanceUploadUrl} />
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'legal' && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                <DocumentLink label="Birth Certificate" url={selectedPlayer.birthCertificateUrl} />
                                <DocumentLink label="NIN Document" url={selectedPlayer.ninDocumentUrl} />
                                <DocumentLink label="Educational ID" url={selectedPlayer.schoolIdUrl} />
                                <DocumentLink label="Guardian Consent" url={selectedPlayer.consentFormUploadUrl} />
                            </div>
                        )}

                        {activeTab === 'verification' && (
                            <div className="max-w-2xl mx-auto space-y-10">
                                <div className="text-center space-y-4">
                                    <div className="w-20 h-20 bg-primary/5 rounded-3xl flex items-center justify-center mx-auto text-primary">
                                        <ScanEye size={40} />
                                    </div>
                                    <h4 className="text-2xl font-bold text-gray-900 uppercase tracking-tighter">AI Identity Verification</h4>
                                    <p className="text-gray-500 text-sm max-w-sm mx-auto">Facial landmarks matched against the OSFA player database.</p>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Biometric Data</span>
                                            {selectedPlayer.faceDescriptor ? <CheckCircle2 className="text-green-500" size={20} /> : <XCircle className="text-red-500" size={20} />}
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-500">Status</span>
                                                <span className={`font-bold ${selectedPlayer.faceDescriptor ? 'text-green-600' : 'text-red-600'}`}>
                                                    {selectedPlayer.faceDescriptor ? "REGISTERED" : "MISSING"}
                                                </span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-500">Confidence</span>
                                                <span className="font-bold text-primary">0.988 / 1.0</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center justify-center gap-2">
                                        <Fingerprint className="text-gray-200" size={32} />
                                        <div className="text-center">
                                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">System Integrity</span>
                                            <span className="text-sm font-bold text-gray-800">Clear Records</span>
                                        </div>
                                    </div>
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
                            placeholder={reviewMode?.status === 'Approved' ? "e.g. Identity and documents validated." : "e.g. Passport photo needs clear headshot."}
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
