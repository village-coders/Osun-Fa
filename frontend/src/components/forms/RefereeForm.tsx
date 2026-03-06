"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { refereeFormSchema, RefereeFormValues } from "@/lib/validations/referee";
import { useState } from "react";

export default function RefereeForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RefereeFormValues>({
        resolver: zodResolver(refereeFormSchema),
    });

    const onSubmit = async (data: RefereeFormValues) => {
        setIsSubmitting(true);
        try {
            // In a real application, you would send FormData to your API here
            console.log("Referee Form Data Submitted:", data);

            // Simulate API call
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
                <p className="text-gray-400">Your referee registration details have been submitted and are pending review by OSFA administrators.</p>
                <button
                    onClick={() => window.location.href = '/'}
                    className="mt-6 bg-accent text-primary-dark hover:bg-secondary px-6 py-2 rounded-full font-bold transition-colors"
                >
                    Return Home
                </button>
            </div>
        );
    }

    // Common input styles
    const inputClass = "w-full bg-black/50 border focus:border-accent rounded-lg px-4 py-2.5 text-white outline-none transition-colors";
    const labelClass = "block text-sm font-medium text-gray-400 mb-1.5";
    const errorClass = "text-red-500 text-xs mt-1 absolute";
    const sectionClass = "glass-dark p-6 rounded-2xl mb-8 border border-[rgba(255,255,255,0.05)]";
    const headingClass = "text-xl font-bold text-accent mb-6 flex items-center gap-2 border-b border-[rgba(255,255,255,0.1)] pb-3";

    return (
        <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6">
            <div className="mb-10 text-center">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">Referee Registration</h1>
                <p className="text-gray-400">Complete the form below to register as an official OSFA referee.</p>
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
                            <label className={labelClass}>Alternative Phone</label>
                            <input type="tel" {...register("alternativePhone")} className={`${inputClass} border-[rgba(255,255,255,0.1)]`} />
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
                        <div className="relative">
                            <label className={labelClass}>Relationship to Contact <span className="text-red-500">*</span></label>
                            <input {...register("relationshipToEmergencyContact")} className={`${inputClass} ${errors.relationshipToEmergencyContact ? 'border-red-500' : 'border-[rgba(255,255,255,0.1)]'}`} />
                            {errors.relationshipToEmergencyContact && <p className={errorClass}>{errors.relationshipToEmergencyContact.message as string}</p>}
                        </div>
                    </div>
                </div>

                {/* SECTION C: IDENTIFICATION & DOCUMENT UPLOADS */}
                <div className={sectionClass}>
                    <h2 className={headingClass}>Section C: Identification Documents</h2>
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
                            <label className={labelClass}>Medical Fitness Certificate</label>
                            <input type="file" {...register("medicalFitnessCertificate")} className={`${inputClass} border-[rgba(255,255,255,0.1)] text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-dark file:text-accent hover:file:bg-black transition-colors cursor-pointer`} />
                        </div>
                    </div>
                </div>

                {/* SECTION D: REFEREE CLASSIFICATION */}
                <div className={sectionClass}>
                    <h2 className={headingClass}>Section D: Referee Classification & Certification</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-4">
                        <div className="relative">
                            <label className={labelClass}>Referee Category <span className="text-red-500">*</span></label>
                            <select {...register("refereeCategory")} className={`${inputClass} ${errors.refereeCategory ? 'border-red-500' : 'border-[rgba(255,255,255,0.1)]'}`}>
                                <option value="">Select Category</option>
                                <option value="Center Referee">Center Referee</option>
                                <option value="Assistant Referee">Assistant Referee</option>
                                <option value="Futsal Referee">Futsal Referee</option>
                                <option value="Beach Soccer Referee">Beach Soccer Referee</option>
                                <option value="Instructor / Assessor">Instructor / Assessor</option>
                            </select>
                            {errors.refereeCategory && <p className={errorClass}>{errors.refereeCategory.message as string}</p>}
                        </div>
                        <div className="relative">
                            <label className={labelClass}>Current Grade/Level <span className="text-red-500">*</span></label>
                            <select {...register("currentGrade")} className={`${inputClass} ${errors.currentGrade ? 'border-red-500' : 'border-[rgba(255,255,255,0.1)]'}`}>
                                <option value="">Select Grade</option>
                                <option value="State Referee">State Referee</option>
                                <option value="National Referee">National Referee</option>
                                <option value="Elite Referee">Elite Referee</option>
                                <option value="Youth Referee">Youth Referee</option>
                                <option value="Beginner">Beginner</option>
                            </select>
                            {errors.currentGrade && <p className={errorClass}>{errors.currentGrade.message as string}</p>}
                        </div>
                        <div className="relative">
                            <label className={labelClass}>Certification Body <span className="text-red-500">*</span></label>
                            <select {...register("certificationBody")} className={`${inputClass} ${errors.certificationBody ? 'border-red-500' : 'border-[rgba(255,255,255,0.1)]'}`}>
                                <option value="">Select Body</option>
                                <option value="OSUN FA">OSUN FA</option>
                                <option value="NFF">NFF</option>
                                <option value="CAF">CAF</option>
                                <option value="FIFA">FIFA</option>
                            </select>
                            {errors.certificationBody && <p className={errorClass}>{errors.certificationBody.message as string}</p>}
                        </div>
                        <div className="relative">
                            <label className={labelClass}>Certificate Number</label>
                            <input {...register("certificateNumber")} className={`${inputClass} border-[rgba(255,255,255,0.1)]`} />
                        </div>
                    </div>
                </div>

                {/* SECTION E: EXPERIENCE */}
                <div className={sectionClass}>
                    <h2 className={headingClass}>Section E: Experience & Match History</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-4">
                        <div className="relative">
                            <label className={labelClass}>Years of Experience <span className="text-red-500">*</span></label>
                            <input type="number" {...register("yearsOfExperience")} className={`${inputClass} ${errors.yearsOfExperience ? 'border-red-500' : 'border-[rgba(255,255,255,0.1)]'}`} />
                            {errors.yearsOfExperience && <p className={errorClass}>{errors.yearsOfExperience.message as string}</p>}
                        </div>
                        <div className="relative">
                            <label className={labelClass}>Highest Competition Officiated <span className="text-red-500">*</span></label>
                            <select {...register("highestCompetitionOfficiated")} className={`${inputClass} ${errors.highestCompetitionOfficiated ? 'border-red-500' : 'border-[rgba(255,255,255,0.1)]'}`}>
                                <option value="">Select Competition</option>
                                <option value="Grassroots">Grassroots</option>
                                <option value="State League">State League</option>
                                <option value="NLO">NLO</option>
                                <option value="NNL">NNL</option>
                                <option value="NPFL">NPFL</option>
                                <option value="NWFL">NWFL</option>
                                <option value="International">International</option>
                            </select>
                            {errors.highestCompetitionOfficiated && <p className={errorClass}>{errors.highestCompetitionOfficiated.message as string}</p>}
                        </div>
                    </div>
                </div>

                {/* SECTION F: FITNESS & ASSESSMENT */}
                <div className={sectionClass}>
                    <h2 className={headingClass}>Section F: Fitness & Assessment</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-4">
                        <div className="relative">
                            <label className={labelClass}>Last Fitness Test Date</label>
                            <input type="date" {...register("lastFitnessTestDate")} className={`${inputClass} border-[rgba(255,255,255,0.1)]`} />
                        </div>
                        <div className="relative">
                            <label className={labelClass}>Fitness Test Result</label>
                            <select {...register("fitnessTestResult")} className={`${inputClass} border-[rgba(255,255,255,0.1)]`}>
                                <option value="">Select Result</option>
                                <option value="Passed">Passed</option>
                                <option value="Failed">Failed</option>
                                <option value="Pending">Pending</option>
                            </select>
                        </div>
                        <div className="relative">
                            <label className={labelClass}>Last Assessment Date</label>
                            <input type="date" {...register("lastAssessmentDate")} className={`${inputClass} border-[rgba(255,255,255,0.1)]`} />
                        </div>
                        <div className="relative">
                            <label className={labelClass}>Assessment Rating</label>
                            <select {...register("assessmentRating")} className={`${inputClass} border-[rgba(255,255,255,0.1)]`}>
                                <option value="">Select Rating</option>
                                <option value="Excellent">Excellent</option>
                                <option value="Good">Good</option>
                                <option value="Average">Average</option>
                                <option value="Needs Improvement">Needs Improvement</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* SECTION G: DISCIPLINARY */}
                <div className={sectionClass}>
                    <h2 className={headingClass}>Section G: Disciplinary Record</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-4">
                        <div className="relative">
                            <label className={labelClass}>Currently Under Suspension? <span className="text-red-500">*</span></label>
                            <div className="flex gap-4 mt-2">
                                <label className="flex items-center gap-2 text-white">
                                    <input type="radio" value="Yes" {...register("underSuspension")} className="w-4 h-4 accent-accent" /> Yes
                                </label>
                                <label className="flex items-center gap-2 text-white">
                                    <input type="radio" value="No" {...register("underSuspension")} className="w-4 h-4 accent-accent" /> No
                                </label>
                            </div>
                            {errors.underSuspension && <p className={errorClass + " -bottom-5"}>{errors.underSuspension.message as string}</p>}
                        </div>
                        <div className="relative">
                            <label className={labelClass}>Previous Disciplinary Action? <span className="text-red-500">*</span></label>
                            <div className="flex gap-4 mt-2">
                                <label className="flex items-center gap-2 text-white">
                                    <input type="radio" value="Yes" {...register("previousDisciplinaryAction")} className="w-4 h-4 accent-accent" /> Yes
                                </label>
                                <label className="flex items-center gap-2 text-white">
                                    <input type="radio" value="No" {...register("previousDisciplinaryAction")} className="w-4 h-4 accent-accent" /> No
                                </label>
                            </div>
                            {errors.previousDisciplinaryAction && <p className={errorClass + " -bottom-5"}>{errors.previousDisciplinaryAction.message as string}</p>}
                        </div>
                    </div>
                </div>

                {/* SECTION H: BANKING & PAYMENT DETAILS */}
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
                    <h2 className={headingClass}>Section I: Declaration & Code of Conduct</h2>
                    <div className="pb-4">
                        <p className="text-gray-400 text-sm mb-4">
                            I hereby declare that the information provided is accurate and complete. I agree to abide by the Laws of the Game and the regulations of Osun State Football Association, NFF, CAF, and FIFA. I consent to data processing in accordance with OSFA Data Protection Policy.
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
                                    <label className={labelClass}>Referee Full Name <span className="text-red-500">*</span></label>
                                    <input {...register("refereeFullName")} className={`${inputClass} ${errors.refereeFullName ? 'border-red-500' : 'border-[rgba(255,255,255,0.1)]'}`} />
                                    {errors.refereeFullName && <p className={errorClass}>{errors.refereeFullName.message as string}</p>}
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
