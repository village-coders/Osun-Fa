import RefereeForm from "@/components/forms/RefereeForm";

export const metadata = {
    title: "Referee Registration | OSFA",
    description: "Register as an official OSFA referee.",
};

export default function RefereeRegistrationPage() {
    return (
        <div className="min-h-screen bg-surface-dark pt-24 pb-12">
            <RefereeForm />
        </div>
    );
}
