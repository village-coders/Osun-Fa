"use client";

import { useForm } from "react-hook-form";
import { PlayerFormValues } from "@/types/form-values";
import { useState } from "react";
import userApi from "@/lib/api";
import { toast } from "react-hot-toast";
import PhotoCapture from "./PhotoCapture";

export default function PlayerForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<PlayerFormValues>();

    const onSubmit = async (data: PlayerFormValues) => {
        setIsSubmitting(true);
        try {
            const formData = new FormData();
            Object.entries(data).forEach(([key, value]) => {
                if (value instanceof FileList) {
                    if (value.length > 0) formData.append(key, value[0]);
                } else if (value !== undefined && value !== null && value !== '') {
                    formData.append(key, String(value));
                }
            });

            const res = await userApi.post("/players/register", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            console.log(res.data);
            toast.success("Player registration submitted successfully!");
            setSubmitSuccess(true);
        } catch (error: any) {
            console.error(error);
            toast.error(error.response?.data?.message || "Registration failed. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const onError = (errors: any) => {
        console.error("Form validation errors:", errors);
        toast.error("Please fill all required fields correctly.");
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

            <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-8 relative">
                {/* SECTION A: PERSONAL INFO */}
                <div className={sectionClass}>
                    <h2 className={headingClass}>Section A: Personal Information</h2>

                    <div className="mb-6 flex flex-col w-full max-w-xl">
                        <label className={labelClass}>Passport Photograph <span className="text-red-500">*</span></label>
                        <p className="text-xs text-gray-400 mb-4">Please upload a clear headshot or take a photo using your webcam. This is required for facial recognition.</p>

                        <PhotoCapture
                            onPhotoCaptured={(file: File) => {
                                // Manually set the value for the form
                                const dataTransfer = new DataTransfer();
                                dataTransfer.items.add(file);
                                const fileList = dataTransfer.files;

                                // Create a mock event to pass to the onChange handler
                                const event = {
                                    target: {
                                        name: "passportPhotograph",
                                        value: fileList
                                    }
                                };

                                // Register handles the rest if we just pass the file list directly to its onChange
                                const { onChange } = register("passportPhotograph", { required: "Passport photograph is required" });
                                onChange(event as any);
                            }}
                        />
                        {errors.passportPhotograph && <p className={errorClass + " relative mt-1"}>{errors?.passportPhotograph?.message?.toString()}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-4">
                        <div className="relative">
                            <label className={labelClass}>Surname <span className="text-red-500">*</span></label>
                            <input {...register("surname", { required: "Surname is required" })} className={`${inputClass} ${errors.surname ? 'border-red-500' : 'border-[rgba(255,255,255,0.1)]'}`} />
                            {errors.surname && <p className={errorClass}>{errors.surname.message}</p>}
                        </div>
                        <div className="relative">
                            <label className={labelClass}>First Name <span className="text-red-500">*</span></label>
                            <input {...register("firstName", { required: "First name is required" })} className={`${inputClass} ${errors.firstName ? 'border-red-500' : 'border-[rgba(255,255,255,0.1)]'}`} />
                            {errors.firstName && <p className={errorClass}>{errors.firstName.message}</p>}
                        </div>
                        <div className="relative">
                            <label className={labelClass}>Other Name(s)</label>
                            <input {...register("otherNames")} className={`${inputClass} border-[rgba(255,255,255,0.1)]`} />
                        </div>
                        <div className="relative">
                            <label className={labelClass}>Gender <span className="text-red-500">*</span></label>
                            <select {...register("gender", { required: "Gender is required" })} className={`${inputClass} ${errors.gender ? 'border-red-500' : 'border-[rgba(255,255,255,0.1)]'}`}>
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                            {errors.gender && <p className={errorClass}>{errors.gender.message}</p>}
                        </div>
                        <div className="relative">
                            <label className={labelClass}>Date of Birth <span className="text-red-500">*</span></label>
                            <input type="date" {...register("dateOfBirth", { required: "Date of birth is required" })} className={`${inputClass} ${errors.dateOfBirth ? 'border-red-500' : 'border-[rgba(255,255,255,0.1)]'}`} />
                            {errors.dateOfBirth && <p className={errorClass}>{errors.dateOfBirth.message}</p>}
                        </div>
                        <div className="relative">
                            <label className={labelClass}>Place of Birth <span className="text-red-500">*</span></label>
                            <input {...register("placeOfBirth", { required: "Place of birth is required" })} className={`${inputClass} ${errors.placeOfBirth ? 'border-red-500' : 'border-[rgba(255,255,255,0.1)]'}`} />
                            {errors.placeOfBirth && <p className={errorClass}>{errors.placeOfBirth.message}</p>}
                        </div>
                        <div className="relative">
                            <label className={labelClass}>Nationality <span className="text-red-500">*</span></label>
                            <input {...register("nationality", { required: "Nationality is required" })} defaultValue="Nigerian" className={`${inputClass} ${errors.nationality ? 'border-red-500' : 'border-[rgba(255,255,255,0.1)]'}`} />
                            {errors.nationality && <p className={errorClass}>{errors.nationality.message}</p>}
                        </div>
                        <div className="relative">
                            <label className={labelClass}>State of Origin <span className="text-red-500">*</span></label>
                            <input {...register("stateOfOrigin", { required: "State is required" })} className={`${inputClass} ${errors.stateOfOrigin ? 'border-red-500' : 'border-[rgba(255,255,255,0.1)]'}`} />
                            {errors.stateOfOrigin && <p className={errorClass}>{errors.stateOfOrigin.message}</p>}
                        </div>
                        <div className="relative">
                            <label className={labelClass}>LGA <span className="text-red-500">*</span></label>
                            <input {...register("lga", { required: "LGA is required" })} className={`${inputClass} ${errors.lga ? 'border-red-500' : 'border-[rgba(255,255,255,0.1)]'}`} />
                            {errors.lga && <p className={errorClass}>{errors.lga.message}</p>}
                        </div>
                        <div className="relative">
                            <label className={labelClass}>Registration Season <span className="text-red-500">*</span></label>
                            <select {...register("registrationSeason", { required: "Season is required" })} className={`${inputClass} ${errors.registrationSeason ? 'border-red-500' : 'border-[rgba(255,255,255,0.1)]'}`}>
                                <option value="">Select Season</option>
                                <option value="2023/2024">2023/2024</option>
                                <option value="2024/2025">2024/2025</option>
                                <option value="2025/2026">2025/2026</option>
                            </select>
                            {errors.registrationSeason && <p className={errorClass}>{errors.registrationSeason.message}</p>}
                        </div>
                        <div className="relative md:col-span-2">
                            <label className={labelClass}>Residential Address <span className="text-red-500">*</span></label>
                            <textarea {...register("residentialAddress", { required: "Address is required" })} rows={2} className={`${inputClass} ${errors.residentialAddress ? 'border-red-500' : 'border-[rgba(255,255,255,0.1)]'}`} />
                            {errors.residentialAddress && <p className={errorClass}>{errors.residentialAddress.message}</p>}
                        </div>
                    </div>
                </div>

                {/* SECTION B: CONTACT INFORMATION */}
                <div className={sectionClass}>
                    <h2 className={headingClass}>Section B: Contact Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-4">
                        <div className="relative">
                            <label className={labelClass}>Phone Number <span className="text-red-500">*</span></label>
                            <input type="tel" {...register("phoneNumber", { required: "Phone is required" })} className={`${inputClass} ${errors.phoneNumber ? 'border-red-500' : 'border-[rgba(255,255,255,0.1)]'}`} />
                            {errors.phoneNumber && <p className={errorClass}>{errors.phoneNumber.message}</p>}
                        </div>
                        <div className="relative">
                            <label className={labelClass}>Email Address (Optional)</label>
                            <input type="email" {...register("emailAddress")} className={`${inputClass} ${errors.emailAddress ? 'border-red-500' : 'border-[rgba(255,255,255,0.1)]'}`} />
                            {errors.emailAddress && <p className={errorClass}>{errors.emailAddress.message}</p>}
                        </div>
                        <div className="relative md:col-span-2">
                            <label className={labelClass}>Emergency Contact Name <span className="text-red-500">*</span></label>
                            <input {...register("emergencyContactName", { required: "Emergency contact name is required" })} className={`${inputClass} ${errors.emergencyContactName ? 'border-red-500' : 'border-[rgba(255,255,255,0.1)]'}`} />
                            {errors.emergencyContactName && <p className={errorClass}>{errors.emergencyContactName.message}</p>}
                        </div>
                        <div className="relative">
                            <label className={labelClass}>Emergency Contact Phone <span className="text-red-500">*</span></label>
                            <input type="tel" {...register("emergencyContactPhone", { required: "Emergency contact phone is required" })} className={`${inputClass} ${errors.emergencyContactPhone ? 'border-red-500' : 'border-[rgba(255,255,255,0.1)]'}`} />
                            {errors.emergencyContactPhone && <p className={errorClass}>{errors.emergencyContactPhone.message}</p>}
                        </div>
                        <div className="relative">
                            <label className={labelClass}>Relationship to Player <span className="text-red-500">*</span></label>
                            <input {...register("relationshipToEmergencyContact", { required: "Relationship is required" })} className={`${inputClass} ${errors.relationshipToEmergencyContact ? 'border-red-500' : 'border-[rgba(255,255,255,0.1)]'}`} />
                            {errors.relationshipToEmergencyContact && <p className={errorClass}>{errors.relationshipToEmergencyContact.message}</p>}
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
                            <label className={labelClass}>Club Registration Number</label>
                            <input {...register("clubRegistrationNumber")} className={`${inputClass} border-[rgba(255,255,255,0.1)]`} />
                        </div>
                        <div className="relative">
                            <label className={labelClass}>Playing Position <span className="text-red-500">*</span></label>
                            <select {...register("playingPosition", { required: "Playing position is required" })} className={`${inputClass} ${errors.playingPosition ? 'border-red-500' : 'border-[rgba(255,255,255,0.1)]'}`}>
                                <option value="">Select Position</option>
                                <option value="Goalkeeper">Goalkeeper</option>
                                <option value="Defender">Defender</option>
                                <option value="Midfielder">Midfielder</option>
                                <option value="Forward">Forward</option>
                            </select>
                            {errors.playingPosition && <p className={errorClass}>{errors.playingPosition.message}</p>}
                        </div>
                        <div className="relative">
                            <label className={labelClass}>Preferred Position</label>
                            <input {...register("preferredPosition")} className={`${inputClass} border-[rgba(255,255,255,0.1)]`} />
                        </div>
                        <div className="relative">
                            <label className={labelClass}>Jersey Number</label>
                            <input type="number" {...register("jerseyNumber")} className={`${inputClass} border-[rgba(255,255,255,0.1)]`} />
                        </div>
                        <div className="relative">
                            <label className={labelClass}>Dominant Foot <span className="text-red-500">*</span></label>
                            <select {...register("dominantFoot", { required: "Dominant foot is required" })} className={`${inputClass} ${errors.dominantFoot ? 'border-red-500' : 'border-[rgba(255,255,255,0.1)]'}`}>
                                <option value="">Select Dominant Foot</option>
                                <option value="Right">Right</option>
                                <option value="Left">Left</option>
                                <option value="Both">Both</option>
                            </select>
                            {errors.dominantFoot && <p className={errorClass}>{errors.dominantFoot.message}</p>}
                        </div>
                        <div className="relative">
                            <label className={labelClass}>Height (cm)</label>
                            <input type="number" {...register("heightCm")} className={`${inputClass} border-[rgba(255,255,255,0.1)]`} />
                        </div>
                        <div className="relative">
                            <label className={labelClass}>Weight (kg)</label>
                            <input type="number" {...register("weightKg")} className={`${inputClass} border-[rgba(255,255,255,0.1)]`} />
                        </div>
                        <div className="relative">
                            <label className={labelClass}>Years of Experience <span className="text-red-500">*</span></label>
                            <input type="number" {...register("yearsOfExperience", { required: "Experience is required" })} className={`${inputClass} ${errors.yearsOfExperience ? 'border-red-500' : 'border-[rgba(255,255,255,0.1)]'}`} />
                            {errors.yearsOfExperience && <p className={errorClass}>{errors.yearsOfExperience.message}</p>}
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
                                    <input type="checkbox" {...register("declarationAccepted", { required: "You must accept the declaration" })} className="mt-1 w-5 h-5 accent-accent rounded" />
                                    <span>I confirm the above declaration and accept the terms and conditions. <span className="text-red-500">*</span></span>
                                </label>
                                {errors.declarationAccepted && <p className="text-red-500 text-xs mt-1">{errors.declarationAccepted.message}</p>}
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="relative">
                                    <label className={labelClass}>Player Name <span className="text-red-500">*</span></label>
                                    <input {...register("playerName", { required: "Player name is required" })} className={`${inputClass} ${errors.playerName ? 'border-red-500' : 'border-[rgba(255,255,255,0.1)]'}`} />
                                    {errors.playerName && <p className={errorClass}>{errors.playerName.message}</p>}
                                </div>
                                <div className="relative">
                                    <label className={labelClass}>Digital Signature <span className="text-red-500">*</span></label>
                                    <input {...register("digitalSignature", { required: "Signature is required" })} placeholder="Type Full Name" className={`${inputClass} ${errors.digitalSignature ? 'border-red-500' : 'border-[rgba(255,255,255,0.1)]'}`} />
                                    {errors.digitalSignature && <p className={errorClass}>{errors.digitalSignature.message}</p>}
                                </div>
                                <div className="relative">
                                    <label className={labelClass}>Date <span className="text-red-500">*</span></label>
                                    <input type="date" {...register("date", { required: "Date is required" })} className={`${inputClass} ${errors.date ? 'border-red-500' : 'border-[rgba(255,255,255,0.1)]'}`} />
                                    {errors.date && <p className={errorClass}>{errors.date.message}</p>}
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
