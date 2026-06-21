import CoachForm from "@/components/forms/CoachForm";

export const metadata = {
    title: "Coach Registration | Osun FA",
    description: "Register as a football coach with the Osun FA.",
};

export default function CoachRegistrationPage() {
    return (
        <div className="min-h-screen pt-24 pb-12">
            <CoachForm />
        </div>
    );
}
