"use client";

import { useState, useEffect, useCallback } from "react";
import { Users, Save, Loader2, User, X, Info } from "lucide-react";
import userApi from "@/lib/api";
import toast from "react-hot-toast";

const FORMATIONS = ["4-4-2", "4-3-3", "3-5-2", "4-2-3-1", "5-3-2"];

const FORMATION_LAYOUTS: any = {
    "4-4-2": [
        { role: "GK", top: "85%", left: "50%" },
        { role: "RB", top: "65%", left: "85%" },
        { role: "RCB", top: "70%", left: "62%" },
        { role: "LCB", top: "70%", left: "38%" },
        { role: "LB", top: "65%", left: "15%" },
        { role: "RM", top: "40%", left: "85%" },
        { role: "RCM", top: "45%", left: "60%" },
        { role: "LCM", top: "45%", left: "40%" },
        { role: "LM", top: "40%", left: "15%" },
        { role: "RST", top: "15%", left: "60%" },
        { role: "LST", top: "15%", left: "40%" },
    ],
    "4-3-3": [
        { role: "GK", top: "85%", left: "50%" },
        { role: "RB", top: "65%", left: "85%" },
        { role: "RCB", top: "70%", left: "62%" },
        { role: "LCB", top: "70%", left: "38%" },
        { role: "LB", top: "65%", left: "15%" },
        { role: "RCM", top: "45%", left: "75%" },
        { role: "CDM", top: "50%", left: "50%" },
        { role: "LCM", top: "45%", left: "25%" },
        { role: "RW", top: "15%", left: "85%" },
        { role: "ST", top: "10%", left: "50%" },
        { role: "LW", top: "15%", left: "15%" },
    ],
    // ... (Keep your other formation layouts here)
};

export default function SquadLineupPage() {
    const [players, setPlayers] = useState<any[]>([]);
    const [squad, setSquad] = useState<any>({
        formation: "4-4-2",
        startingEleven: [],
        substitutes: [],
        reserves: []
    });
    const [loading, setLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [playersRes, squadRes] = await Promise.all([
                    userApi.get('/players/my-players'),
                    userApi.get('/squad')
                ]);
                setPlayers(playersRes.data);
                if (squadRes.data && squadRes.data.formation) {
                    setSquad(squadRes.data);
                }
            } catch (error) {
                toast.error("Failed to load squad data");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const assignPlayerToPosition = (player: any, index: number) => {
        const layout = FORMATION_LAYOUTS[squad.formation];

        // 1. Remove this specific player from ANY current position (Starters, Subs, or Reserves)
        let newStarting = squad.startingEleven.filter((p: any) => (p.player?._id || p.player) !== player._id);
        const newSubs = squad.substitutes.filter((p: any) => (p?._id || p) !== player._id);
        const newRes = squad.reserves.filter((p: any) => (p?._id || p) !== player._id);

        // 2. Clear the target position if someone else is already there
        newStarting = newStarting.filter((p: any) => p.position !== layout[index].role);

        // 3. Add the player to the new position
        newStarting.push({
            player: player,
            position: layout[index].role
        });

        setSquad((prev: any) => ({
            ...prev,
            startingEleven: newStarting,
            substitutes: newSubs,
            reserves: newRes
        }));
        toast.success(`${player.playerName} assigned to ${layout[index].role}`);
    };

    const moveToSubs = (player: any) => {
        if (squad.substitutes.some((p: any) => (p?._id || p) === player._id)) return;
        setSquad((prev: any) => ({
            ...prev,
            substitutes: [...prev.substitutes, player],
            startingEleven: prev.startingEleven.filter((p: any) => (p.player?._id || p.player) !== player._id),
            reserves: prev.reserves.filter((p: any) => (p?._id || p) !== player._id)
        }));
    };

    const moveToReserves = (player: any) => {
        if (squad.reserves.some((p: any) => (p?._id || p) === player._id)) return;
        setSquad((prev: any) => ({
            ...prev,
            reserves: [...prev.reserves, player],
            startingEleven: prev.startingEleven.filter((p: any) => (p.player?._id || p.player) !== player._id),
            substitutes: prev.substitutes.filter((p: any) => (p?._id || p) !== player._id)
        }));
    };

    const removeFromAll = (playerId: string) => {
        setSquad((prev: any) => ({
            ...prev,
            startingEleven: prev.startingEleven.filter((p: any) => (p.player?._id || p.player) !== playerId),
            substitutes: prev.substitutes.filter((p: any) => (p?._id || p) !== playerId),
            reserves: prev.reserves.filter((p: any) => (p?._id || p) !== playerId)
        }));
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const payload = {
                formation: squad.formation,
                startingEleven: squad.startingEleven.map((p: any) => ({
                    player: p.player?._id || p.player,
                    position: p.position
                })),
                substitutes: squad.substitutes.map((p: any) => p?._id || p),
                reserves: squad.reserves.map((p: any) => p?._id || p)
            };
            await userApi.post('/squad', payload);
            toast.success("Squad lineup saved!");
        } catch (error) {
            toast.error("Failed to save squad");
        } finally {
            setIsSaving(false);
        }
    };

    const availablePlayers = players.filter(p =>
        !squad.startingEleven.some((s: any) => (s.player?._id || s.player) === p._id) &&
        !squad.substitutes.some((s: any) => (s?._id || s) === p._id) &&
        !squad.reserves.some((s: any) => (s?._id || s) === p._id)
    );

    if (loading) return (
        <div className="flex flex-col items-center justify-center min-h-[400px]">
            <Loader2 className="w-10 h-10 animate-spin text-green-500 mb-4" />
            <p className="text-gray-500 tracking-widest uppercase">Organizing Squad...</p>
        </div>
    );

    const currentLayout = FORMATION_LAYOUTS[squad.formation] || FORMATION_LAYOUTS["4-4-2"];

    return (
        <div className="max-w-7xl mx-auto space-y-8 pb-20 p-4">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                        <Users className="text-green-500" /> Squad Lineup
                    </h1>
                    <p className="text-gray-400">Tactically organize your team for the next match.</p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="bg-green-500 text-black font-black px-8 py-3 rounded-xl flex items-center gap-2 hover:bg-green-400 transition-all disabled:opacity-50"
                >
                    {isSaving ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} />}
                    {isSaving ? "SAVING..." : "SAVE LINEUP"}
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Pitch Area */}
                <div className="lg:col-span-8 space-y-8">
                    <div className="relative aspect-3/4 md:aspect-4/3 w-full bg-[#1a472a] rounded-[30px] border-6 border-white/20 overflow-hidden shadow-2xl">
                        {/* Field Markings */}
                        <div className="absolute inset-0 border-2 border-white/10 m-4 pointer-events-none" />
                        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/10" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-2 border-white/10 rounded-full" />

                        {/* Formation Selector */}
                        <div className="absolute top-8 right-8 z-10">
                            <select
                                value={squad.formation}
                                onChange={(e) => setSquad({ ...squad, formation: e.target.value })}
                                className="bg-black/60 backdrop-blur-md border border-white/20 text-white rounded-xl px-4 py-2 font-bold"
                            >
                                {FORMATIONS.map(f => <option key={f} value={f}>{f}</option>)}
                            </select>
                        </div>

                        {/* Player Slots */}
                        {currentLayout.map((slot: any, idx: number) => {
                            const playerItem = squad.startingEleven.find((p: any) => p.position === slot.role);
                            return (
                                <div
                                    key={idx}
                                    style={{ top: slot.top, left: slot.left }}
                                    className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group"
                                >
                                    <div className={`w-12 h-12 md:w-16 md:h-16 rounded-full border-2 transition-all relative ${playerItem ? 'border-green-400 scale-110' : 'border-white/10 border-dashed'}`}>
                                        {playerItem ? (
                                            <>
                                                <img
                                                    src={playerItem.player?.passportPhotographUrl || "/placeholder-user.png"}
                                                    className="w-full h-full object-cover rounded-full"
                                                    alt=""
                                                />
                                                <button
                                                    onClick={() => removeFromAll(playerItem.player?._id || playerItem.player)}
                                                    className="absolute -top-1 -right-1 bg-red-500 p-1 rounded-full text-white scale-0 group-hover:scale-100 transition-transform"
                                                >
                                                    <X size={10} />
                                                </button>
                                            </>
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-white/10"><User /></div>
                                        )}
                                    </div>
                                    <span className="text-[10px] font-bold text-white mt-1 uppercase bg-black/40 px-2 rounded">
                                        {playerItem ? playerItem.player?.playerName : slot.role}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Selection Sidebar */}
                <div className="lg:col-span-4 h-[800px] flex flex-col bg-black/20 rounded-3xl p-4 border border-white/5">
                    <h3 className="text-xl font-bold text-white mb-2">Squad Pool</h3>
                    <div className="bg-blue-500/10 border border-blue-500/20 p-3 rounded-xl mb-4 flex gap-2">
                        <Info size={16} className="text-blue-400 shrink-0" />
                        <p className="text-[10px] text-blue-300 font-medium">Click a position role button (e.g. GK, ST) on a player card to assign them to the pitch.</p>
                    </div>

                    <div className="flex-1 overflow-y-auto space-y-3 custom-scrollbar pr-2">
                        {availablePlayers.map((player) => (
                            <div key={player._id} className="bg-white/5 border border-white/10 p-3 rounded-2xl hover:border-green-500/50 transition-colors">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 rounded-lg bg-gray-800 overflow-hidden">
                                        <img src={player.passportPhotographUrl || "/placeholder-user.png"} className="w-full h-full object-cover" alt="" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-white font-bold text-sm truncate">{player.playerName}</h4>
                                        <p className="text-xs text-gray-500">{player.playingPosition}</p>
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-1">
                                    {currentLayout.map((slot: any, sIdx: number) => (
                                        <button
                                            key={sIdx}
                                            onClick={() => assignPlayerToPosition(player, sIdx)}
                                            className="px-2 py-1 bg-black/40 rounded text-[9px] text-gray-400 hover:text-green-400 hover:bg-green-400/10"
                                        >
                                            {slot.role}
                                        </button>
                                    ))}
                                </div>
                                <div className="flex gap-2 mt-2 pt-2 border-t border-white/5">
                                    <button onClick={() => moveToSubs(player)} className="flex-1 py-1 text-[9px] bg-white/5 rounded text-gray-400 hover:text-white">BENCH</button>
                                    <button onClick={() => moveToReserves(player)} className="flex-1 py-1 text-[9px] bg-white/5 rounded text-gray-400 hover:text-white">RESERVE</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}