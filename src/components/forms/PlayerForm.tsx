"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { playerFormSchema, PlayerFormValues } from "@/lib/validations/player";
import { useState } from "react";

export default function PlayerForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<PlayerFormValues>({
        resolver: zodResolver(playerFormSchema),
    });

    const onSubmit = async (data: PlayerFormValues) => {
        setIsSubmitting(true);
        try {
            console.log("Player Form Data Submitted:", data);
            await new Promise((resolve) => setTimeout(resolve, 1500));
            setSubmitSuccess(true);
        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (submitSuccess) {
        return (
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-8 text-center max-w-2xl mx-auto my-12">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Registration Successful!</h3>
                <p className="text-gray-400">Your player registration details have been submitted and are pending review by OSFA administrators.</p>
                <button
                    onClick={() => window.location.href = '/'}
                    className="mt-6 bg-accent text-primary-dark hover:bg-secondary px-6 py-2 rounded-full font-bold transition-colors"
                >
                    Return Home
                </button>
            </div>
        );
    }

    const inputClass = "w-full bg-black/50 border focus:border-accent rounded-lg px-4 py-2.5 text-white outline-none transition-colors";
    const labelClass = "block text-sm font-medium text-gray-400 mb-1.5";
    const errorClass = "text-red-500 text-xs mt-1 absolute";
    const sectionClass = "glass-dark p-6 rounded-2xl mb-8 border border-[rgba(255,255,255,0.05)]";
    const headingClass = "text-xl font-bold text-accent mb-6 flex items-center gap-2 border-b border-[rgba(255,255,255,0.1)] pb-3";

    return (
        <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6">
            <div className="mb-10 text-center">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">Player Registration</h1>
                <p className="text-gray-400">Complete the form below to register as a player in OSFA competitions.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 relative">
                {/* SECTION A: PERSONAL INFO */}
                <div className={sectionClass}>
                    <h2 className={headingClass}>Section A: Personal Information</h2>

                    <div className="mb-6 flex flex-col items-center sm:items-start max-w-sm">
                        <label className={labelClass}>Passport Photograph</label>
                        <div className="mt-2 flex items-center gap-4 w-full relative">
                            <div className="w-24 h-24 shrink-0 rounded-full bg-black/40 border border-[rgba(255,255,255,0.1)] flex items-center justify-center overflow-hidden">
                                <svg className="w-8 h-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <input
                                type="file"
                                accept="image/*"
                                {...register("passportPhotograph")}
                                className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-dark file:text-accent hover:file:bg-black transition-colors cursor-pointer"
                            />
                        </div>
                        {errors.passportPhotograph && <p className={errorClass + " relative mt-1"}>{errors.passportPhotograph.message as string}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-4">
                        <div className="relative">
                            <label className={labelClass}>Surname <span className="text-red-500">*</span></label>
                            <input {...register("surname")} className={`${inputClass} ${errors.surname ? 'border-red-500' : 'border-[rgba(255,255,255,0.1)]'}`} />
                            {errors.surname && <p className={errorClass}>{errors.surname.message as string}</p>}
                        </div>
                        <div className="relative">
                            <label className={labelClass}>First Name <span className="text-red-500">*</span></label>
                            <input {...register("firstName")} className={`${inputClass} ${errors.firstName ? 'border-red-500' : 'border-[rgba(255,255,255,0.1)]'}`} />
                            {errors.firstName && <p className={errorClass}>{errors.firstName.message as string}</p>}
                        </div>
                        <div className="relative">
                            <label className={labelClass}>Other Name(s)</label>
                            <input {...register("otherNames")} className={`${inputClass} border-[rgba(255,255,255,0.1)]`} />
                        </div>
                        <div className="relative">
                            <label className={labelClass}>Gender <span className="text-red-500">*</span></label>
                            <select {...register("gender")} className={`${inputClass} ${errors.gender ? 'border-red-500' : 'border-[rgba(255,255,255,0.1)]'}`}>
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                            {errors.gender && <p className={errorClass}>{errors.gender.message as string}</p>}
                        </div>
                        <div className="relative">
                            <label className={labelClass}>Date of Birth <span className="text-red-500">*</span></label>
                            <input type="date" {...register("dateOfBirth")} className={`${inputClass} ${errors.dateOfBirth ? 'border-red-500' : 'border-[rgba(255,255,255,0.1)]'}`} />
                            {errors.dateOfBirth && <p className={errorClass}>{errors.dateOfBirth.message as string}</p>}
                        </div>
                        <div className="relative md:col-span-2">
                            <label className={labelClass}>Residential Address <span className="text-red-500">*</span></label>
                            <textarea {...register("residentialAddress")} rows={2} className={`${inputClass} ${errors.residentialAddress ? 'border-red-500' : 'border-[rgba(255,255,255,0.1)]'}`} />
                            {errors.residentialAddress && <p className={errorClass}>{errors.residentialAddress.message as string}</p>}
                        </div>
                    </div>
                </div>

                {/* SECTION B: CONTACT INFORMATION */}
                <div className={sectionClass}>
                    <h2 className={headingClass}>Section B: Contact Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-4">
                        <div className="relative">
                            <label className={labelClass}>Phone Number <span className="text-red-500">*</span></label>
                            <input type="tel" {...register("phoneNumber")} className={`${inputClass} ${errors.phoneNumber ? 'border-red-500' : 'border-[rgba(255,255,255,0.1)]'}`} />
                            {errors.phoneNumber && <p className={errorClass}>{errors.phoneNumber.message as string}</p>}
                        </div>
                        <div className="relative">
                            <label className={labelClass}>Email Address (Optional)</label>
                            <input type="email" {...register("emailAddress")} className={`${inputClass} ${errors.emailAddress ? 'border-red-500' : 'border-[rgba(255,255,255,0.1)]'}`} />
                            {errors.emailAddress && <p className={errorClass}>{errors.emailAddress.message as string}</p>}
                        </div>
                        <div className="relative md:col-span-2">
                            <label className={labelClass}>Emergency Contact Name <span className="text-red-500">*</span></label>
                            <input {...register("emergencyContactName")} className={`${inputClass} ${errors.emergencyContactName ? 'border-red-500' : 'border-[rgba(255,255,255,0.1)]'}`} />
                            {errors.emergencyContactName && <p className={errorClass}>{errors.emergencyContactName.message as string}</p>}
                        </div>
                        <div className="relative">
                            <label className={labelClass}>Emergency Contact Phone <span className="text-red-500">*</span></label>
                            <input type="tel" {...register("emergencyContactPhone")} className={`${inputClass} ${errors.emergencyContactPhone ? 'border-red-500' : 'border-[rgba(255,255,255,0.1)]'}`} />
                            {errors.emergencyContactPhone && <p className={errorClass}>{errors.emergencyContactPhone.message as string}</p>}
                        </div>
                        <div className="relative">
                            <label className={labelClass}>Relationship to Player <span className="text-red-500">*</span></label>
                            <input {...register("relationshipToEmergencyContact")} className={`${inputClass} ${errors.relationshipToEmergencyContact ? 'border-red-500' : 'border-[rgba(255,255,255,0.1)]'}`} />
                            {errors.relationshipToEmergencyContact && <p className={errorClass}>{errors.relationshipToEmergencyContact.message as string}</p>}
                        </div>
                    </div>
                </div>

                {/* SECTION C: NEXT OF KIN / PARENT (FOR MINORS) */}
                <div className={sectionClass}>
                    <h2 className={headingClass}>Section C: Next of Kin / Parent Guardian</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-4">
                        <div className="relative">
                            <label className={labelClass}>Parent/Guardian Full Name</label>
                            <input {...register("parentFullName")} className={`${inputClass} border-[rgba(255,255,255,0.1)]`} />
                        </div>
                        <div className="relative">
                            <label className={labelClass}>Parent/Guardian Phone</label>
                            <input {...register("parentPhoneNumber")} className={`${inputClass} border-[rgba(255,255,255,0.1)]`} />
                        </div>
                        <div className="relative md:col-span-2">
                            <label className={labelClass}>Parent/Guardian Address</label>
                            <textarea {...register("parentAddress")} rows={2} className={`${inputClass} border-[rgba(255,255,255,0.1)]`} />
                        </div>
                        <div className="relative md:col-span-2">
                            <label className={labelClass}>Consent Form Upload</label>
                            <input type="file" {...register("consentFormUpload")} className={`${inputClass} border-[rgba(255,255,255,0.1)] text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-dark file:text-accent hover:file:bg-black transition-colors cursor-pointer`} />
                        </div>
                    </div>
                </div>

                {/* SECTION D: PLAYER IDENTIFICATION */}
                <div className={sectionClass}>
                    <h2 className={headingClass}>Section D: Participant Identification</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-4">
                        <div className="relative">
                            <label className={labelClass}>Birth Certificate</label>
                            <input type="file" {...register("birthCertificate")} className={`${inputClass} border-[rgba(255,255,255,0.1)] text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-dark file:text-accent hover:file:bg-black transition-colors cursor-pointer`} />
                        </div>
                        <div className="relative">
                            <label className={labelClass}>NIN Document</label>
                            <input type="file" {...register("ninDocument")} className={`${inputClass} border-[rgba(255,255,255,0.1)] text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-dark file:text-accent hover:file:bg-black transition-colors cursor-pointer`} />
                        </div>
                        <div className="relative">
                            <label className={labelClass}>School ID</label>
                            <input type="file" {...register("schoolId")} className={`${inputClass} border-[rgba(255,255,255,0.1)] text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-dark file:text-accent hover:file:bg-black transition-colors cursor-pointer`} />
                        </div>
                    </div>
                </div>

                {/* SECTION E: FOOTBALL PROFILE */}
                <div className={sectionClass}>
                    <h2 className={headingClass}>Section E: Football Profile</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-4">
                        <div className="relative">
                            <label className={labelClass}>Current Club Name</label>
                            <input {...register("currentClubName")} className={`${inputClass} border-[rgba(255,255,255,0.1)]`} />
                        </div>
                        <div className="relative">
                            <label className={labelClass}>Playing Position <span className="text-red-500">*</span></label>
                            <select {...register("playingPosition")} className={`${inputClass} ${errors.playingPosition ? 'border-red-500' : 'border-[rgba(255,255,255,0.1)]'}`}>
                                <option value="">Select Position</option>
                                <option value="Goalkeeper">Goalkeeper</option>
                                <option value="Defender">Defender</option>
                                <option value="Midfielder">Midfielder</option>
                                <option value="Forward">Forward</option>
                            </select>
                            {errors.playingPosition && <p className={errorClass}>{errors.playingPosition.message as string}</p>}
                        </div>
                        <div className="relative">
                            <label className={labelClass}>Dominant Foot <span className="text-red-500">*</span></label>
                            <select {...register("dominantFoot")} className={`${inputClass} ${errors.dominantFoot ? 'border-red-500' : 'border-[rgba(255,255,255,0.1)]'}`}>
                                <option value="">Select Dominant Foot</option>
                                <option value="Right">Right</option>
                                <option value="Left">Left</option>
                                <option value="Both">Both</option>
                            </select>
                            {errors.dominantFoot && <p className={errorClass}>{errors.dominantFoot.message as string}</p>}
                        </div>
                        <div className="relative">
                            <label className={labelClass}>Years of Experience <span className="text-red-500">*</span></label>
                            <input type="number" {...register("yearsOfExperience")} className={`${inputClass} ${errors.yearsOfExperience ? 'border-red-500' : 'border-[rgba(255,255,255,0.1)]'}`} />
                            {errors.yearsOfExperience && <p className={errorClass}>{errors.yearsOfExperience.message as string}</p>}
                        </div>
                    </div>
                </div>

                {/* SECTION F: REGISTRATION & TRANSFER HISTORY */}
                <div className={sectionClass}>
                    <h2 className={headingClass}>Section F: Registration & Transfer History</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-4">
                        <div className="relative">
                            <label className={labelClass}>Previously Registered with OSFA?</label>
                            <select {...register("previouslyRegisteredWithOSFA")} className={`${inputClass} border-[rgba(255,255,255,0.1)]`}>
                                <option value="">Select</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                        </div>
                        <div className="relative">
                            <label className={labelClass}>Previous OSFA Club</label>
                            <input {...register("previousOsfaClub")} className={`${inputClass} border-[rgba(255,255,255,0.1)]`} />
                        </div>
                        <div className="relative md:col-span-2">
                            <label className={labelClass}>Previous Clubs History</label>
                            <textarea {...register("previousClubs")} rows={2} className={`${inputClass} border-[rgba(255,255,255,0.1)]`} />
                        </div>
                        <div className="relative">
                            <label className={labelClass}>Outstanding Transfer Issues?</label>
                            <select {...register("outstandingTransferIssues")} className={`${inputClass} border-[rgba(255,255,255,0.1)]`}>
                                <option value="">Select</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                        </div>
                        <div className="relative">
                            <label className={labelClass}>Transfer Issue Details</label>
                            <input {...register("transferIssueDetails")} className={`${inputClass} border-[rgba(255,255,255,0.1)]`} />
                        </div>
                    </div>
                </div>

                {/* SECTION G: MEDICAL (CONFIDENTIAL) */}
                <div className={sectionClass}>
                    <h2 className={headingClass}>Section G: Medical Details</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-4">
                        <div className="relative">
                            <label className={labelClass}>Blood Group</label>
                            <input {...register("bloodGroup")} className={`${inputClass} border-[rgba(255,255,255,0.1)]`} />
                        </div>
                        <div className="relative">
                            <label className={labelClass}>Allergies</label>
                            <input {...register("allergies")} className={`${inputClass} border-[rgba(255,255,255,0.1)]`} />
                        </div>
                        <div className="relative md:col-span-2">
                            <label className={labelClass}>Known Medical Conditions</label>
                            <textarea {...register("knownMedicalConditions")} rows={2} className={`${inputClass} border-[rgba(255,255,255,0.1)]`} />
                        </div>
                        <div className="relative md:col-span-2">
                            <label className={labelClass}>Medical Clearance Upload</label>
                            <input type="file" {...register("medicalClearanceUpload")} className={`${inputClass} border-[rgba(255,255,255,0.1)] text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-dark file:text-accent hover:file:bg-black transition-colors cursor-pointer`} />
                        </div>
                    </div>
                </div>

                {/* SECTION H: EDUCATION / OCCUPATION */}
                <div className={sectionClass}>
                    <h2 className={headingClass}>Section H: Education & Occupation</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-4">
                        <div className="relative">
                            <label className={labelClass}>Highest Education Level</label>
                            <select {...register("highestEducationLevel")} className={`${inputClass} border-[rgba(255,255,255,0.1)]`}>
                                <option value="">Select Level</option>
                                <option value="None">None</option>
                                <option value="Primary">Primary</option>
                                <option value="Secondary">Secondary</option>
                                <option value="Tertiary">Tertiary</option>
                            </select>
                        </div>
                        <div className="relative">
                            <label className={labelClass}>School/Institution/Employer</label>
                            <input {...register("schoolInstitutionEmployer")} className={`${inputClass} border-[rgba(255,255,255,0.1)]`} />
                        </div>
                    </div>
                </div>

                {/* SECTION I: DECLARATION */}
                <div className={sectionClass}>
                    <h2 className={headingClass}>Section I: Declaration & Consent</h2>
                    <div className="pb-4">
                        <p className="text-gray-400 text-sm mb-4">
                            I confirm that the information provided is accurate and complete. I agree to comply with the rules and regulations of Osun State Football Association and related governing bodies.
                        </p>
                        <div className="space-y-4">
                            <div>
                                <label className="flex items-start gap-3 text-white cursor-pointer">
                                    <input type="checkbox" {...register("declarationAccepted")} className="mt-1 w-5 h-5 accent-accent rounded" />
                                    <span>I confirm the above declaration and accept the terms and conditions. <span className="text-red-500">*</span></span>
                                </label>
                                {errors.declarationAccepted && <p className="text-red-500 text-xs mt-1">{errors.declarationAccepted.message as string}</p>}
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="relative">
                                    <label className={labelClass}>Player Name <span className="text-red-500">*</span></label>
                                    <input {...register("playerName")} className={`${inputClass} ${errors.playerName ? 'border-red-500' : 'border-[rgba(255,255,255,0.1)]'}`} />
                                    {errors.playerName && <p className={errorClass}>{errors.playerName.message as string}</p>}
                                </div>
                                <div className="relative">
                                    <label className={labelClass}>Digital Signature <span className="text-red-500">*</span></label>
                                    <input {...register("digitalSignature")} placeholder="Type Full Name" className={`${inputClass} ${errors.digitalSignature ? 'border-red-500' : 'border-[rgba(255,255,255,0.1)]'}`} />
                                    {errors.digitalSignature && <p className={errorClass}>{errors.digitalSignature.message as string}</p>}
                                </div>
                                <div className="relative">
                                    <label className={labelClass}>Date <span className="text-red-500">*</span></label>
                                    <input type="date" {...register("date")} className={`${inputClass} ${errors.date ? 'border-red-500' : 'border-[rgba(255,255,255,0.1)]'}`} />
                                    {errors.date && <p className={errorClass}>{errors.date.message as string}</p>}
                                </div>
                            </div>

                            <div className="pt-4 border-t border-[rgba(255,255,255,0.1)] mt-6">
                                <h3 className="text-white font-semibold mb-4 text-sm">For Minors (Under 18)</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="relative">
                                        <label className={labelClass}>Parent/Guardian Name</label>
                                        <input {...register("parentName")} className={`${inputClass} border-[rgba(255,255,255,0.1)]`} />
                                    </div>
                                    <div className="relative">
                                        <label className={labelClass}>Parent/Guardian Signature</label>
                                        <input {...register("parentSignature")} placeholder="Type Full Name" className={`${inputClass} border-[rgba(255,255,255,0.1)]`} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end pt-4 pb-12">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-accent text-primary-dark hover:bg-secondary px-8 py-3 rounded-full text-lg font-bold shadow-[0_0_15px_rgba(0,255,136,0.2)] transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        {isSubmitting ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-primary-dark" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Submitting Form...
                            </>
                        ) : "Submit Registration"}
                    </button>
                </div>
            </form>
        </div>
    );
}
