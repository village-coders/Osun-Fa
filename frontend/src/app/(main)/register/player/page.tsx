import PlayerForm from "@/components/forms/PlayerForm";

export const metadata = {
    title: "Player Registration | OSFA",
    description: "Register as a player in OSFA competitions.",
};

export default function PlayerRegistrationPage() {
    return (
        <div className="min-h-screen bg-surface-dark pt-24 pb-12">
            <PlayerForm />
        </div>
    );
}
