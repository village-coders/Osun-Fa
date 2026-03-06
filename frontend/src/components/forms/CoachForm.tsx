"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { coachFormSchema, CoachFormValues } from "@/lib/validations/coach";
import { useState } from "react";

export default function CoachForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CoachFormValues>({
        resolver: zodResolver(coachFormSchema),
    });

    const onSubmit = async (data: CoachFormValues) => {
        setIsSubmitting(true);
        try {
            console.log("Coach Form Data Submitted:", data);
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
                <p className="text-gray-400">Your coach registration details have been submitted and are pending review by OSFA administrators.</p>
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
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">Coach Registration</h1>
                <p className="text-gray-400">Complete the form below to register as an official OSFA coach.</p>
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
                                <option value="Prefer not to say">Prefer not to say</option>
                            </select>
                            {errors.gender && <p className={errorClass}>{errors.gender.message as string}</p>}
                        </div>
                        <div className="relative">
                            <label className={labelClass}>Date of Birth <span className="text-red-500">*</span></label>
                            <input type="date" {...register("dateOfBirth")} className={`${inputClass} ${errors.dateOfBirth ? 'border-red-500' : 'border-[rgba(255,255,255,0.1)]'}`} />
                            {errors.dateOfBirth && <p className={errorClass}>{errors.dateOfBirth.message as string}</p>}
                        </div>
                        <div className="relative">
                            <label className={labelClass}>Place of Birth <span className="text-red-500">*</span></label>
                            <input {...register("placeOfBirth")} className={`${inputClass} ${errors.placeOfBirth ? 'border-red-500' : 'border-[rgba(255,255,255,0.1)]'}`} />
                            {errors.placeOfBirth && <p className={errorClass}>{errors.placeOfBirth.message as string}</p>}
                        </div>
                        <div className="relative">
                            <label className={labelClass}>Nationality <span className="text-red-500">*</span></label>
                            <input {...register("nationality")} defaultValue="Nigerian" className={`${inputClass} ${errors.nationality ? 'border-red-500' : 'border-[rgba(255,255,255,0.1)]'}`} />
                            {errors.nationality && <p className={errorClass}>{errors.nationality.message as string}</p>}
                        </div>
                        <div className="relative">
                            <label className={labelClass}>State of Origin <span className="text-red-500">*</span></label>
                            <input {...register("stateOfOrigin")} className={`${inputClass} ${errors.stateOfOrigin ? 'border-red-500' : 'border-[rgba(255,255,255,0.1)]'}`} />
                            {errors.stateOfOrigin && <p className={errorClass}>{errors.stateOfOrigin.message as string}</p>}
                        </div>
                        <div className="relative md:col-span-2">
                            <label className={labelClass}>Residential Address <span className="text-red-500">*</span></label>
                            <textarea {...register("residentialAddress")} rows={2} className={`${inputClass} ${errors.residentialAddress ? 'border-red-500' : 'border-[rgba(255,255,255,0.1)]'}`} />
                            {errors.residentialAddress && <p className={errorClass}>{errors.residentialAddress.message as string}</p>}
                        </div>
                        <div className="relative">
                            <label className={labelClass}>LGA <span className="text-red-500">*</span></label>
                            <input {...register("lga")} className={`${inputClass} ${errors.lga ? 'border-red-500' : 'border-[rgba(255,255,255,0.1)]'}`} />
                            {errors.lga && <p className={errorClass}>{errors.lga.message as string}</p>}
                        </div>
                    </div>
                </div>

                {/* SECTION B: CONTACT INFO */}
                <div className={sectionClass}>
                    <h2 className={headingClass}>Section B: Contact Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-4">
                        <div className="relative">
                            <label className={labelClass}>Phone Number <span className="text-red-500">*</span></label>
                            <input type="tel" {...register("phoneNumber")} className={`${inputClass} ${errors.phoneNumber ? 'border-red-500' : 'border-[rgba(255,255,255,0.1)]'}`} />
                            {errors.phoneNumber && <p className={errorClass}>{errors.phoneNumber.message as string}</p>}
                        </div>
                        <div className="relative">
                            <label className={labelClass}>Email Address <span className="text-red-500">*</span></label>
                            <input type="email" {...register("emailAddress")} className={`${inputClass} ${errors.emailAddress ? 'border-red-500' : 'border-[rgba(255,255,255,0.1)]'}`} />
                            {errors.emailAddress && <p className={errorClass}>{errors.emailAddress.message as string}</p>}
                        </div>
                        <div className="relative">
                            <label className={labelClass}>Emergency Contact Name <span className="text-red-500">*</span></label>
                            <input {...register("emergencyContactName")} className={`${inputClass} ${errors.emergencyContactName ? 'border-red-500' : 'border-[rgba(255,255,255,0.1)]'}`} />
                            {errors.emergencyContactName && <p className={errorClass}>{errors.emergencyContactName.message as string}</p>}
                        </div>
                        <div className="relative">
                            <label className={labelClass}>Emergency Contact Phone <span className="text-red-500">*</span></label>
                            <input type="tel" {...register("emergencyContactPhone")} className={`${inputClass} ${errors.emergencyContactPhone ? 'border-red-500' : 'border-[rgba(255,255,255,0.1)]'}`} />
                            {errors.emergencyContactPhone && <p className={errorClass}>{errors.emergencyContactPhone.message as string}</p>}
                        </div>
                    </div>
                </div>

                {/* SECTION C: IDENTIFICATION */}
                <div className={sectionClass}>
                    <h2 className={headingClass}>Section C: Identification & Documents</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-4">
                        <div className="relative">
                            <label className={labelClass}>NIN Document</label>
                            <input type="file" {...register("ninDocument")} className={`${inputClass} border-[rgba(255,255,255,0.1)] text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-dark file:text-accent hover:file:bg-black transition-colors cursor-pointer`} />
                        </div>
                        <div className="relative">
                            <label className={labelClass}>Birth Certificate</label>
                            <input type="file" {...register("birthCertificate")} className={`${inputClass} border-[rgba(255,255,255,0.1)] text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-dark file:text-accent hover:file:bg-black transition-colors cursor-pointer`} />
                        </div>
                        <div className="relative">
                            <label className={labelClass}>Proof of Address</label>
                            <input type="file" {...register("proofOfAddress")} className={`${inputClass} border-[rgba(255,255,255,0.1)] text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-dark file:text-accent hover:file:bg-black transition-colors cursor-pointer`} />
                        </div>
                    </div>
                </div>

                {/* SECTION D: COACHING QUALIFICATIONS */}
                <div className={sectionClass}>
                    <h2 className={headingClass}>Section D: Coaching Qualifications & Licensing</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-4">
                        <div className="relative">
                            <label className={labelClass}>Highest Coaching Qualification <span className="text-red-500">*</span></label>
                            <select {...register("highestCoachingQualification")} className={`${inputClass} ${errors.highestCoachingQualification ? 'border-red-500' : 'border-[rgba(255,255,255,0.1)]'}`}>
                                <option value="">Select Qualification</option>
                                <option value="CAF D">CAF D</option>
                                <option value="CAF C">CAF C</option>
                                <option value="CAF B">CAF B</option>
                                <option value="CAF A">CAF A</option>
                                <option value="CAF Pro">CAF Pro</option>
                                <option value="Other">Other</option>
                            </select>
                            {errors.highestCoachingQualification && <p className={errorClass}>{errors.highestCoachingQualification.message as string}</p>}
                        </div>
                        <div className="relative">
                            <label className={labelClass}>If Other (Qualification)</label>
                            <input {...register("qualificationOther")} className={`${inputClass} border-[rgba(255,255,255,0.1)]`} />
                        </div>
                        <div className="relative">
                            <label className={labelClass}>Issuing Body <span className="text-red-500">*</span></label>
                            <select {...register("issuingBody")} className={`${inputClass} ${errors.issuingBody ? 'border-red-500' : 'border-[rgba(255,255,255,0.1)]'}`}>
                                <option value="">Select Issuing Body</option>
                                <option value="NFF">NFF</option>
                                <option value="CAF">CAF</option>
                                <option value="FIFA">FIFA</option>
                                <option value="Other">Other</option>
                            </select>
                            {errors.issuingBody && <p className={errorClass}>{errors.issuingBody.message as string}</p>}
                        </div>
                        <div className="relative">
                            <label className={labelClass}>If Other (Issuing Body)</label>
                            <input {...register("issuingBodyOther")} className={`${inputClass} border-[rgba(255,255,255,0.1)]`} />
                        </div>
                        <div className="relative">
                            <label className={labelClass}>Certificate Number</label>
                            <input {...register("certificateNumber")} className={`${inputClass} border-[rgba(255,255,255,0.1)]`} />
                        </div>
                        <div className="relative">
                            <label className={labelClass}>Year Obtained</label>
                            <input type="number" {...register("yearObtained")} className={`${inputClass} border-[rgba(255,255,255,0.1)]`} />
                        </div>
                    </div>
                </div>

                {/* SECTION E: COACHING PROFILE */}
                <div className={sectionClass}>
                    <h2 className={headingClass}>Section E: Coaching Profile</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-4">
                        <div className="relative">
                            <label className={labelClass}>Primary Coaching Role <span className="text-red-500">*</span></label>
                            <select {...register("primaryCoachingRole")} className={`${inputClass} ${errors.primaryCoachingRole ? 'border-red-500' : 'border-[rgba(255,255,255,0.1)]'}`}>
                                <option value="">Select Role</option>
                                <option value="Head Coach">Head Coach</option>
                                <option value="Assistant Coach">Assistant Coach</option>
                                <option value="Goalkeeper Coach">Goalkeeper Coach</option>
                                <option value="Fitness Coach">Fitness Coach</option>
                                <option value="Youth Coach">Youth Coach</option>
                                <option value="Technical Director">Technical Director</option>
                                <option value="Other">Other</option>
                            </select>
                            {errors.primaryCoachingRole && <p className={errorClass}>{errors.primaryCoachingRole.message as string}</p>}
                        </div>
                        <div className="relative">
                            <label className={labelClass}>Years of Experience <span className="text-red-500">*</span></label>
                            <input type="number" {...register("yearsOfExperience")} className={`${inputClass} ${errors.yearsOfExperience ? 'border-red-500' : 'border-[rgba(255,255,255,0.1)]'}`} />
                            {errors.yearsOfExperience && <p className={errorClass}>{errors.yearsOfExperience.message as string}</p>}
                        </div>
                        <div className="relative">
                            <label className={labelClass}>Current Club</label>
                            <input {...register("currentClub")} className={`${inputClass} border-[rgba(255,255,255,0.1)]`} />
                        </div>
                        <div className="relative">
                            <label className={labelClass}>Previous Club(s)</label>
                            <input {...register("previousClubs")} className={`${inputClass} border-[rgba(255,255,255,0.1)]`} />
                        </div>
                    </div>
                </div>

                {/* SECTION F: CPD */}
                <div className={sectionClass}>
                    <h2 className={headingClass}>Section F: Continuing Professional Development (CPD)</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-4">
                        <div className="relative">
                            <label className={labelClass}>Recent Courses Attended</label>
                            <input {...register("recentCoursesAttended")} className={`${inputClass} border-[rgba(255,255,255,0.1)]`} />
                        </div>
                        <div className="relative">
                            <label className={labelClass}>Year(s) Attended</label>
                            <input {...register("yearsAttended")} className={`${inputClass} border-[rgba(255,255,255,0.1)]`} />
                        </div>
                        <div className="relative md:col-span-2">
                            <label className={labelClass}>CPD Certificates Upload</label>
                            <input type="file" multiple {...register("cpdCertificatesUpload")} className={`${inputClass} border-[rgba(255,255,255,0.1)] text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-dark file:text-accent hover:file:bg-black transition-colors cursor-pointer`} />
                        </div>
                    </div>
                </div>

                {/* SECTION G: MEDICAL (OPTIONAL) */}
                <div className={sectionClass}>
                    <h2 className={headingClass}>Section G: Medical Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-4">
                        <div className="relative md:col-span-2">
                            <label className={labelClass}>Known Medical Conditions</label>
                            <textarea {...register("knownMedicalConditions")} rows={2} className={`${inputClass} border-[rgba(255,255,255,0.1)]`} />
                        </div>
                        <div className="relative md:col-span-2">
                            <label className={labelClass}>Medical Fitness Certificate</label>
                            <input type="file" {...register("medicalFitnessCertificate")} className={`${inputClass} border-[rgba(255,255,255,0.1)] text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-dark file:text-accent hover:file:bg-black transition-colors cursor-pointer`} />
                        </div>
                    </div>
                </div>

                {/* SECTION H: BANKING (OPTIONAL) */}
                <div className={sectionClass}>
                    <h2 className={headingClass}>Section H: Banking Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-4">
                        <div className="relative">
                            <label className={labelClass}>Bank Name</label>
                            <input {...register("bankName")} className={`${inputClass} border-[rgba(255,255,255,0.1)]`} />
                        </div>
                        <div className="relative">
                            <label className={labelClass}>Account Name</label>
                            <input {...register("accountName")} className={`${inputClass} border-[rgba(255,255,255,0.1)]`} />
                        </div>
                        <div className="relative">
                            <label className={labelClass}>Account Number</label>
                            <input {...register("accountNumber")} className={`${inputClass} border-[rgba(255,255,255,0.1)]`} />
                        </div>
                        <div className="relative">
                            <label className={labelClass}>Payment Reference</label>
                            <input {...register("paymentReference")} className={`${inputClass} border-[rgba(255,255,255,0.1)]`} />
                        </div>
                    </div>
                </div>

                {/* SECTION I: DECLARATION */}
                <div className={sectionClass}>
                    <h2 className={headingClass}>Section I: Declaration & Professional Conduct</h2>
                    <div className="pb-4">
                        <p className="text-gray-400 text-sm mb-4">
                            I hereby declare that all information provided is true and correct. I agree to abide by the statutes, codes of ethics, and technical regulations of Osun State Football Association, NFF, CAF, and FIFA.
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
                                    <label className={labelClass}>Coach Full Name <span className="text-red-500">*</span></label>
                                    <input {...register("coachFullName")} className={`${inputClass} ${errors.coachFullName ? 'border-red-500' : 'border-[rgba(255,255,255,0.1)]'}`} />
                                    {errors.coachFullName && <p className={errorClass}>{errors.coachFullName.message as string}</p>}
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
