import ClubForm from "@/components/forms/ClubForm";

export const metadata = {
    title: "Club Registration | OSFA",
    description: "Register your football club with the OSFA.",
};

export default function ClubRegistrationPage() {
    return (
        <div className="min-h-screen bg-surface-dark pt-24 pb-12">
            <ClubForm />
        </div>
    );
}
