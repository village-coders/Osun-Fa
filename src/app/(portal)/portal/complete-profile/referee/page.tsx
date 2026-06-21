import RefereeForm from "@/components/forms/RefereeForm";

export const metadata = {
    title: "Referee Registration | Osun FA",
    description: "Register as a football referee with the Osun FA.",
};

export default function RefereeRegistrationPage() {
    return (
        <div className="min-h-screen pt-24 pb-12">
            <RefereeForm />
        </div>
    );
}
