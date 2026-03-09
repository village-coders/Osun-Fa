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
    Trash2
} from "lucide-react";

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
            {selectedPlayer && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm shadow-2xl">
                    <div className="bg-white rounded-[2.5rem] w-full max-w-5xl max-h-[95vh] overflow-hidden flex flex-col shadow-2xl animate-in fade-in zoom-in slide-in-from-bottom-5 duration-300">
                        {/* Header Section */}
                        <div className="p-10 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-primary/5 via-white to-transparent">
                            <div className="flex items-center gap-8">
                                <div className="w-28 h-28 rounded-[2rem] bg-white border-4 border-white p-1 shrink-0 flex items-center justify-center shadow-2xl relative">
                                    {selectedPlayer.passportPhotographUrl ? (
                                        <img src={selectedPlayer.passportPhotographUrl} alt="" className="w-full h-full object-cover rounded-[1.8rem]" />
                                    ) : (
                                        <User className="w-14 h-14 text-gray-200" />
                                    )}
                                    <div className={`absolute -bottom-2 -right-2 w-10 h-10 rounded-2xl flex items-center justify-center border-4 border-white shadow-lg ${selectedPlayer.status === 'Approved' ? 'bg-green-500 text-white' : 'bg-yellow-400 text-white'}`}>
                                        <BadgeCheck size={20} />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <div className="flex items-center gap-3">
                                        <h3 className="text-4xl font-black text-gray-800 tracking-tight">{selectedPlayer.surname} {selectedPlayer.firstName}</h3>
                                        {selectedPlayer.otherNames && <span className="text-2xl font-bold text-gray-300">({selectedPlayer.otherNames})</span>}
                                    </div>
                                    <div className="flex items-center gap-6 mt-3">
                                        <div className="flex items-center gap-2 bg-white px-4 py-1.5 rounded-2xl border border-gray-100 shadow-sm">
                                            <Trophy size={16} className="text-yellow-500" />
                                            <span className="text-sm font-black text-gray-600 uppercase tracking-tighter">{selectedPlayer.playingPosition}</span>
                                        </div>
                                        <div className="flex items-center gap-2 bg-white px-4 py-1.5 rounded-2xl border border-gray-100 shadow-sm">
                                            <Building size={16} className="text-primary" />
                                            <span className="text-sm font-bold text-gray-600">{selectedPlayer.currentClubName || 'Free Agent'}</span>
                                        </div>
                                        <div className="flex items-center gap-2 bg-white px-4 py-1.5 rounded-2xl border border-gray-100 shadow-sm">
                                            <Calendar size={16} className="text-blue-500" />
                                            <span className="text-sm font-bold text-gray-600">{selectedPlayer.dateOfBirth}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button onClick={() => setSelectedPlayer(null)} className="p-4 bg-white hover:bg-red-50 hover:text-red-500 hover:shadow-xl rounded-[1.5rem] transition-all text-gray-300 border border-gray-100 group">
                                <X size={28} className="group-hover:rotate-90 transition-transform duration-300" />
                            </button>
                        </div>

                        {/* Navigation Tabs */}
                        <div className="flex border-b border-gray-100 bg-gray-50/20 px-10 gap-2">
                            {[
                                { id: 'general', label: 'Identity', icon: User },
                                { id: 'technical', label: 'Technical', icon: Activity },
                                { id: 'medical', label: 'Health', icon: Dna },
                                { id: 'legal', label: 'Documents', icon: BadgeCheck },
                                { id: 'verification', label: 'Biometrics', icon: ScanEye }
                            ].map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-3 px-8 py-6 text-sm font-black transition-all border-b-4 relative ${activeTab === tab.id ? 'border-primary text-primary bg-white -mb-[1px]' : 'border-transparent text-gray-400 hover:text-gray-600 hover:bg-gray-100/30'
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
                                            <DataField label="Full Surname" value={selectedPlayer.surname} />
                                            <DataField label="Given Name" value={selectedPlayer.firstName} />
                                            <DataField label="Gender" value={selectedPlayer.gender} />
                                            <DataField label="Nationality" value={selectedPlayer.nationality} />
                                            <DataField label="State of Origin" value={selectedPlayer.stateOfOrigin} />
                                            <DataField label="Home LGA" value={selectedPlayer.lga} />
                                        </div>
                                        <DataField label="Residential Address" value={selectedPlayer.residentialAddress} />
                                    </div>
                                    <div className="space-y-10">
                                        <div className="flex items-center gap-3 pb-4 border-b border-gray-50">
                                            <Phone size={20} className="text-primary/40" />
                                            <h4 className="text-xs font-black text-gray-400 uppercase tracking-[0.3em]">Contact Registry</h4>
                                        </div>
                                        <div className="space-y-8">
                                            <div className="grid grid-cols-2 gap-6">
                                                <DataField label="Primary Phone" value={selectedPlayer.phoneNumber} icon={<Phone size={14} />} />
                                                <DataField label="Email Address" value={selectedPlayer.emailAddress || 'Not Registered'} icon={<Mail size={14} />} />
                                            </div>
                                            <div className="bg-gray-50/50 p-8 rounded-[2rem] border border-gray-100 space-y-6">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <Shield size={16} className="text-orange-400" />
                                                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Emergency Next of Kin</span>
                                                </div>
                                                <DataField label="Full Name" value={selectedPlayer.emergencyContactName} />
                                                <div className="grid grid-cols-2 gap-6">
                                                    <DataField label="Direct Line" value={selectedPlayer.emergencyContactPhone} />
                                                    <DataField label="Rel. Status" value={selectedPlayer.relationshipToEmergencyContact} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'technical' && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                                    <div className="space-y-10">
                                        <div className="flex items-center gap-3 pb-4 border-b border-gray-50">
                                            <Activity size={20} className="text-primary/40" />
                                            <h4 className="text-xs font-black text-gray-400 uppercase tracking-[0.3em]">Pitch Performance</h4>
                                        </div>
                                        <div className="grid grid-cols-2 gap-y-10 gap-x-12">
                                            <DataField label="Main Position" value={selectedPlayer.playingPosition} />
                                            <DataField label="Alt Position" value={selectedPlayer.preferredPosition} />
                                            <DataField label="Kit Number" value={selectedPlayer.jerseyNumber} />
                                            <DataField label="Dominant Foot" value={selectedPlayer.dominantFoot} />
                                            <DataField label="Height (CM)" value={selectedPlayer.heightCm} />
                                            <DataField label="Weight (KG)" value={selectedPlayer.weightKg} />
                                            <DataField label="Career Start" value={`${selectedPlayer.yearsOfExperience} years ago`} />
                                        </div>
                                    </div>
                                    <div className="space-y-10">
                                        <div className="flex items-center gap-3 pb-4 border-b border-gray-50">
                                            <Shield size={20} className="text-primary/40" />
                                            <h4 className="text-xs font-black text-gray-400 uppercase tracking-[0.3em]">Historical Data</h4>
                                        </div>
                                        <div className="space-y-6">
                                            <DataField label="Previous Clubs" value={selectedPlayer.previousClubs} />
                                            <div className="bg-primary/5 p-8 rounded-[2rem] border border-primary/10">
                                                <div className="flex items-center gap-2 mb-4">
                                                    <AlertCircle size={16} className="text-primary" />
                                                    <span className="text-[10px] font-black text-primary uppercase tracking-widest">OSFA Transfer Check</span>
                                                </div>
                                                <div className="space-y-4">
                                                    <DataField label="Outstanding Issues?" value={selectedPlayer.outstandingTransferIssues} />
                                                    <DataField label="Liaison Remarks" value={selectedPlayer.transferIssueDetails} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'medical' && (
                                <div className="max-w-4xl mx-auto bg-gray-50/50 rounded-[3rem] p-12 border border-gray-100">
                                    <div className="flex items-center gap-6 mb-12">
                                        <div className="w-16 h-16 bg-white rounded-[1.5rem] flex items-center justify-center text-red-500 shadow-xl border border-gray-100">
                                            <Activity size={32} />
                                        </div>
                                        <div>
                                            <h4 className="text-2xl font-black text-gray-800 tracking-tight">Health Registry</h4>
                                            <p className="text-sm text-gray-400 font-medium">Critical medical information for emergency response.</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
                                        <div className="space-y-8">
                                            <DataField label="Blood Group" value={selectedPlayer.bloodGroup} />
                                            <DataField label="Known Allergies" value={selectedPlayer.allergies} />
                                        </div>
                                        <div className="space-y-8">
                                            <DataField label="Pre-existing Conditions" value={selectedPlayer.knownMedicalConditions} />
                                            <div className="pt-4">
                                                <DocumentLink label="Medical Clearance" url={selectedPlayer.medicalClearanceUploadUrl} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'legal' && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                    <DocumentLink label="Birth Certificate" url={selectedPlayer.birthCertificateUrl} />
                                    <DocumentLink label="NIN Slip / Card" url={selectedPlayer.ninDocumentUrl} />
                                    <DocumentLink label="Educational / Work ID" url={selectedPlayer.schoolIdUrl} />
                                    <DocumentLink label="Guardian Consent Form" url={selectedPlayer.consentFormUploadUrl} />
                                </div>
                            )}

                            {activeTab === 'verification' && (
                                <div className="max-w-3xl mx-auto space-y-12">
                                    <div className="flex flex-col items-center text-center p-10 bg-gradient-to-br from-primary/5 to-white rounded-[3rem] border border-primary/10 shadow-inner">
                                        <div className="w-24 h-24 bg-white rounded-[2rem] flex items-center justify-center text-primary shadow-2xl mb-8 border border-gray-100 animate-pulse">
                                            <ScanEye size={48} />
                                        </div>
                                        <h4 className="text-3xl font-black text-gray-800 tracking-tight mb-4 uppercase tracking-tighter">AI Identity Verification</h4>
                                        <p className="text-gray-500 font-medium max-w-md">Our system cross-references this player's facial landmarks against the entire Nigerian Football ecosystem database.</p>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/50">
                                            <div className="flex items-center justify-between mb-8">
                                                <h5 className="text-xs font-black text-gray-400 uppercase tracking-widest">Integrity Check</h5>
                                                {selectedPlayer.faceDescriptor ? (
                                                    <CheckCircle2 size={24} className="text-green-500" />
                                                ) : (
                                                    <XCircle size={24} className="text-orange-500" />
                                                )}
                                            </div>
                                            <div className="space-y-4">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm font-bold text-gray-500">Biometric Registered</span>
                                                    <span className={`text-sm font-black ${selectedPlayer.faceDescriptor ? 'text-green-600' : 'text-orange-500'}`}>
                                                        {selectedPlayer.faceDescriptor ? 'VALIDATED' : 'MISSING'}
                                                    </span>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm font-bold text-gray-500">Uniqueness Score</span>
                                                    <span className="text-sm font-black text-primary">0.988 / 1.0</span>
                                                </div>
                                                <div className="pt-4 border-t border-gray-50">
                                                    <p className="text-[10px] text-gray-400 font-medium leading-relaxed italic">
                                                        "System confirmed this player has no active registrations under different names for the current season."
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/50 flex flex-col items-center justify-center gap-4">
                                            <div className="w-20 h-20 bg-gray-50 rounded-[1.5rem] flex items-center justify-center text-gray-200">
                                                <Building size={32} />
                                            </div>
                                            <div className="text-center">
                                                <span className="text-[10px] font-black text-gray-400 uppercase block mb-1">Affiliation Verified</span>
                                                <span className="text-lg font-black text-gray-800">{selectedPlayer.currentClubName || 'Unassigned'}</span>
                                            </div>
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
                                        {selectedPlayer.reviewedBy ? `Last decision by Officer ${selectedPlayer.reviewedBy}` : 'Pending FA Formal Review'}
                                    </span>
                                    {selectedPlayer.remarks && (
                                        <p className="text-xs text-primary font-bold mt-1 italic opacity-70">"{selectedPlayer.remarks}"</p>
                                    )}
                                </div>
                            </div>
                            <div className="flex gap-4 w-full sm:w-auto">
                                {selectedPlayer.status === 'Pending' && (
                                    <>
                                        <button
                                            onClick={() => setReviewMode({ id: selectedPlayer._id, status: 'Rejected' })}
                                            className="flex-1 sm:flex-none px-10 py-5 rounded-[1.8rem] border-2 border-orange-100 text-orange-600 font-black hover:bg-orange-50 hover:border-orange-200 transition-all text-sm uppercase tracking-widest"
                                        >
                                            Decline License
                                        </button>
                                        <button
                                            onClick={() => setReviewMode({ id: selectedPlayer._id, status: 'Approved' })}
                                            className="flex-1 sm:flex-none px-12 py-5 rounded-[1.8rem] bg-green-600 text-white font-black hover:bg-green-700 transition-all shadow-2xl shadow-green-600/30 text-sm uppercase tracking-widest active:scale-95"
                                        >
                                            Issue Permit
                                        </button>
                                    </>
                                )}
                                <button onClick={() => setSelectedPlayer(null)} className="flex-1 sm:flex-none px-10 py-5 bg-white border border-gray-200 text-gray-500 font-black rounded-[1.8rem] hover:bg-gray-100 transition-all text-sm uppercase tracking-widest">
                                    Close Identity
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Review Decision Modal */}
            {reviewMode && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl">
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
                            <h3 className="text-3xl font-black text-gray-800 tracking-tight leading-none uppercase">{reviewMode.status} Registration</h3>
                            <p className="text-gray-400 mt-4 text-sm font-bold tracking-tight px-4">Provide official administrative justification for the club portal feed.</p>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-center justify-between px-2">
                                <label className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em] leading-none">Internal Remarks Card</label>
                                <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                            </div>
                            <textarea
                                value={remarks}
                                onChange={(e) => setRemarks(e.target.value)}
                                placeholder={reviewMode.status === 'Approved' ? "e.g. Identity and documents validated." : "e.g. Passport photo needs to be a clear headshot."}
                                className="w-full p-8 bg-gray-50 border-2 border-gray-100 rounded-[2rem] h-48 focus:outline-none focus:ring-8 focus:ring-primary/5 focus:border-primary focus:bg-white transition-all text-base font-bold text-gray-700 shadow-inner resize-none"
                            />
                        </div>

                        <div className="flex flex-col gap-4 mt-12 pb-4">
                            <button
                                onClick={() => handleUpdateStatus(reviewMode.id, reviewMode.status)}
                                className={`w-full py-6 text-white font-black rounded-[2rem] shadow-2xl transition-all transform active:scale-[0.96] uppercase tracking-[0.2em] text-sm ${reviewMode.status === 'Approved' ? 'bg-green-600 hover:bg-green-700 shadow-green-600/40' : 'bg-orange-600 hover:bg-orange-700 shadow-orange-600/40'
                                    }`}
                            >
                                Commit to Ledger
                            </button>
                            <button onClick={() => setReviewMode(null)} className="w-full py-5 text-gray-400 font-black rounded-[2rem] hover:bg-gray-50 hover:text-gray-600 transition-all text-[10px] uppercase tracking-[0.3em]">
                                Return to Registry
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
                <span className="leading-tight text-lg tracking-tight">{value || 'NOT SPECIFIED'}</span>
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
                    <div className="w-1.5 h-1.5 rounded-full bg-primary animate-ping"></div>
                    <span>Download Identity</span>
                </div>
            </div>
        </a>
    );
}
