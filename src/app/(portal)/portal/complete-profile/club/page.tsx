import ClubForm from "@/components/forms/ClubForm";

export const metadata = {
    title: "Club Registration | Osun FA",
    description: "Register your football club with the Osun FA.",
};

export default function ClubRegistrationPage() {
    return (
        <div className="min-h-screen bg-surface-dark pt-24 pb-12">
            <ClubForm />
        </div>
    );
}
