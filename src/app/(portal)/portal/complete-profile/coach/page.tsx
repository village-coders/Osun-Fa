import CoachForm from "@/components/forms/CoachForm";

export const metadata = {
    title: "Coach Registration | OSFA",
    description: "Register as an official OSFA coach.",
};

export default function CoachRegistrationPage() {
    return (
        <div className="min-h-screen bg-surface-dark pt-24 pb-12">
            <CoachForm />
        </div>
    );
}
