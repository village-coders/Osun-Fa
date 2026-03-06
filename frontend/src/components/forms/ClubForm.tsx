"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { clubFormSchema, ClubFormValues } from "@/lib/validations/club";
import { useState } from "react";

export default function ClubForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ClubFormValues>({
        resolver: zodResolver(clubFormSchema),
    });

    const onSubmit = async (data: ClubFormValues) => {
        setIsSubmitting(true);
        try {
            console.log("Club Form Data Submitted:", data);
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
                <p className="text-gray-400">Your club registration details have been submitted and are pending review by OSFA administrators.</p>
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
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">Club / Team Registration</h1>
                <p className="text-gray-400">Complete the form below to register your club with the OSFA.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 relative">
                {/* SECTION A: CLUB IDENTIFICATION */}
                <div className={sectionClass}>
                    <h2 className={headingClass}>Section A: Club Identification</h2>

                    <div className="mb-6 flex flex-col items-center sm:items-start max-w-sm">
                        <label className={labelClass}>Club Logo</label>
                        <div className="mt-2 flex items-center gap-4 w-full relative">
                            <div className="w-24 h-24 shrink-0 rounded-full bg-black/40 border border-[rgba(255,255,255,0.1)] flex items-center justify-center overflow-hidden">
                                <svg className="w-8 h-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <input
                                type="file"
                                accept="image/*"
                                {...register("clubLogo")}
                                className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-dark file:text-accent hover:file:bg-black transition-colors cursor-pointer"
                            />
                        </div>
                        {errors.clubLogo && <p className={errorClass + " relative mt-1"}>{errors.clubLogo.message as string}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-4">
                        <div className="relative">
                            <label className={labelClass}>Club Name (Registered Name) <span className="text-red-500">*</span></label>
                            <input {...register("clubName")} className={`${inputClass} ${errors.clubName ? 'border-red-500' : 'border-[rgba(255,255,255,0.1)]'}`} />
                            {errors.clubName && <p className={errorClass}>{errors.clubName.message as string}</p>}
                        </div>
                        <div className="relative">
                            <label className={labelClass}>Short Name / Nickname</label>
                            <input {...register("shortName")} className={`${inputClass} border-[rgba(255,255,255,0.1)]`} />
                        </div>
                        <div className="relative">
                            <label className={labelClass}>Year of Establishment <span className="text-red-500">*</span></label>
                            <input type="number" {...register("yearOfEstablishment")} className={`${inputClass} ${errors.yearOfEstablishment ? 'border-red-500' : 'border-[rgba(255,255,255,0.1)]'}`} />
                            {errors.yearOfEstablishment && <p className={errorClass}>{errors.yearOfEstablishment.message as string}</p>}
                        </div>
                        <div className="relative">
                            <label className={labelClass}>Club Category <span className="text-red-500">*</span></label>
                            <select {...register("clubCategory")} className={`${inputClass} ${errors.clubCategory ? 'border-red-500' : 'border-[rgba(255,255,255,0.1)]'}`}>
                                <option value="">Select Category</option>
                                <option value="Professional">Professional</option>
                                <option value="Semi-Professional">Semi-Professional</option>
                                <option value="Amateur">Amateur</option>
                                <option value="Academy">Academy</option>
                                <option value="School Team">School Team</option>
                                <option value="Community Club">Community Club</option>
                            </select>
                            {errors.clubCategory && <p className={errorClass}>{errors.clubCategory.message as string}</p>}
                        </div>
                        <div className="relative">
                            <label className={labelClass}>League / Competition Level <span className="text-red-500">*</span></label>
                            <select {...register("leagueLevel")} className={`${inputClass} ${errors.leagueLevel ? 'border-red-500' : 'border-[rgba(255,255,255,0.1)]'}`}>
                                <option value="">Select League</option>
                                <option value="NPFL">NPFL</option>
                                <option value="NNL">NNL</option>
                                <option value="National Women's Championship">National Women's Championship</option>
                                <option value="NLO">NLO</option>
                                <option value="Osun State Youth League">Osun State Youth League</option>
                                <option value="Osun State Women’s League">Osun State Women’s League</option>
                                <option value="Grassroots">Grassroots</option>
                                <option value="Others">Others</option>
                            </select>
                            {errors.leagueLevel && <p className={errorClass}>{errors.leagueLevel.message as string}</p>}
                        </div>
                    </div>
                </div>

                {/* SECTION B: CLUB LOCATION */}
                <div className={sectionClass}>
                    <h2 className={headingClass}>Section B: Location & Contact Details</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-4">
                        <div className="relative md:col-span-2">
                            <label className={labelClass}>Registered Address <span className="text-red-500">*</span></label>
                            <textarea {...register("registeredAddress")} rows={2} className={`${inputClass} ${errors.registeredAddress ? 'border-red-500' : 'border-[rgba(255,255,255,0.1)]'}`} />
                            {errors.registeredAddress && <p className={errorClass}>{errors.registeredAddress.message as string}</p>}
                        </div>
                        <div className="relative">
                            <label className={labelClass}>LGA <span className="text-red-500">*</span></label>
                            <input {...register("lga")} className={`${inputClass} ${errors.lga ? 'border-red-500' : 'border-[rgba(255,255,255,0.1)]'}`} />
                            {errors.lga && <p className={errorClass}>{errors.lga.message as string}</p>}
                        </div>
                        <div className="relative">
                            <label className={labelClass}>Town / City <span className="text-red-500">*</span></label>
                            <input {...register("townCity")} className={`${inputClass} ${errors.townCity ? 'border-red-500' : 'border-[rgba(255,255,255,0.1)]'}`} />
                            {errors.townCity && <p className={errorClass}>{errors.townCity.message as string}</p>}
                        </div>
                        <div className="relative">
                            <label className={labelClass}>Official Phone Number <span className="text-red-500">*</span></label>
                            <input type="tel" {...register("officialPhoneNumber")} className={`${inputClass} ${errors.officialPhoneNumber ? 'border-red-500' : 'border-[rgba(255,255,255,0.1)]'}`} />
                            {errors.officialPhoneNumber && <p className={errorClass}>{errors.officialPhoneNumber.message as string}</p>}
                        </div>
                        <div className="relative">
                            <label className={labelClass}>Official Email Address <span className="text-red-500">*</span></label>
                            <input type="email" {...register("officialEmailAddress")} className={`${inputClass} ${errors.officialEmailAddress ? 'border-red-500' : 'border-[rgba(255,255,255,0.1)]'}`} />
                            {errors.officialEmailAddress && <p className={errorClass}>{errors.officialEmailAddress.message as string}</p>}
                        </div>
                    </div>
                </div>

                {/* SECTION C: CLUB MANAGEMENT */}
                <div className={sectionClass}>
                    <h2 className={headingClass}>Section C: Club Management & Officials</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-4">
                        <div className="relative">
                            <label className={labelClass}>Chairman / President Name <span className="text-red-500">*</span></label>
                            <input {...register("chairmanName")} className={`${inputClass} ${errors.chairmanName ? 'border-red-500' : 'border-[rgba(255,255,255,0.1)]'}`} />
                            {errors.chairmanName && <p className={errorClass}>{errors.chairmanName.message as string}</p>}
                        </div>
                        <div className="relative">
                            <label className={labelClass}>Chairman Phone <span className="text-red-500">*</span></label>
                            <input type="tel" {...register("chairmanPhone")} className={`${inputClass} ${errors.chairmanPhone ? 'border-red-500' : 'border-[rgba(255,255,255,0.1)]'}`} />
                            {errors.chairmanPhone && <p className={errorClass}>{errors.chairmanPhone.message as string}</p>}
                        </div>
                        <div className="relative">
                            <label className={labelClass}>Secretary Name <span className="text-red-500">*</span></label>
                            <input {...register("secretaryName")} className={`${inputClass} ${errors.secretaryName ? 'border-red-500' : 'border-[rgba(255,255,255,0.1)]'}`} />
                            {errors.secretaryName && <p className={errorClass}>{errors.secretaryName.message as string}</p>}
                        </div>
                        <div className="relative">
                            <label className={labelClass}>Secretary Phone <span className="text-red-500">*</span></label>
                            <input type="tel" {...register("secretaryPhone")} className={`${inputClass} ${errors.secretaryPhone ? 'border-red-500' : 'border-[rgba(255,255,255,0.1)]'}`} />
                            {errors.secretaryPhone && <p className={errorClass}>{errors.secretaryPhone.message as string}</p>}
                        </div>
                        <div className="relative">
                            <label className={labelClass}>Head Coach Name <span className="text-red-500">*</span></label>
                            <input {...register("headCoachName")} className={`${inputClass} ${errors.headCoachName ? 'border-red-500' : 'border-[rgba(255,255,255,0.1)]'}`} />
                            {errors.headCoachName && <p className={errorClass}>{errors.headCoachName.message as string}</p>}
                        </div>
                        <div className="relative">
                            <label className={labelClass}>Head Coach License Level <span className="text-red-500">*</span></label>
                            <input {...register("headCoachLicenseLevel")} className={`${inputClass} ${errors.headCoachLicenseLevel ? 'border-red-500' : 'border-[rgba(255,255,255,0.1)]'}`} />
                            {errors.headCoachLicenseLevel && <p className={errorClass}>{errors.headCoachLicenseLevel.message as string}</p>}
                        </div>
                        <div className="relative">
                            <label className={labelClass}>Team Manager Name <span className="text-red-500">*</span></label>
                            <input {...register("teamManagerName")} className={`${inputClass} ${errors.teamManagerName ? 'border-red-500' : 'border-[rgba(255,255,255,0.1)]'}`} />
                            {errors.teamManagerName && <p className={errorClass}>{errors.teamManagerName.message as string}</p>}
                        </div>
                        <div className="relative">
                            <label className={labelClass}>Team Manager Phone <span className="text-red-500">*</span></label>
                            <input type="tel" {...register("teamManagerPhone")} className={`${inputClass} ${errors.teamManagerPhone ? 'border-red-500' : 'border-[rgba(255,255,255,0.1)]'}`} />
                            {errors.teamManagerPhone && <p className={errorClass}>{errors.teamManagerPhone.message as string}</p>}
                        </div>
                    </div>
                </div>

                {/* SECTION D: LEGAL & AFFILIATION */}
                <div className={sectionClass}>
                    <h2 className={headingClass}>Section D: Legal & Affiliation Documents</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-4">
                        <div className="relative">
                            <label className={labelClass}>CAC Registration Certificate</label>
                            <input type="file" {...register("cacRegistrationCertificate")} className={`${inputClass} border-[rgba(255,255,255,0.1)] text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-dark file:text-accent hover:file:bg-black transition-colors cursor-pointer`} />
                        </div>
                        <div className="relative">
                            <label className={labelClass}>OSFA Affiliation Certificate</label>
                            <input type="file" {...register("osfaAffiliationCertificate")} className={`${inputClass} border-[rgba(255,255,255,0.1)] text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-dark file:text-accent hover:file:bg-black transition-colors cursor-pointer`} />
                        </div>
                        <div className="relative">
                            <label className={labelClass}>Club Constitution</label>
                            <input type="file" {...register("constitution")} className={`${inputClass} border-[rgba(255,255,255,0.1)] text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-dark file:text-accent hover:file:bg-black transition-colors cursor-pointer`} />
                        </div>
                        <div className="relative">
                            <label className={labelClass}>Application Letter</label>
                            <input type="file" {...register("applicationLetter")} className={`${inputClass} border-[rgba(255,255,255,0.1)] text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-dark file:text-accent hover:file:bg-black transition-colors cursor-pointer`} />
                        </div>
                    </div>
                </div>

                {/* SECTION E: TEAM & FACILITIES */}
                <div className={sectionClass}>
                    <h2 className={headingClass}>Section E: Team & Facilities</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-4">
                        <div className="relative">
                            <label className={labelClass}>Home Ground / Stadium Name <span className="text-red-500">*</span></label>
                            <input {...register("homeGroundName")} className={`${inputClass} ${errors.homeGroundName ? 'border-red-500' : 'border-[rgba(255,255,255,0.1)]'}`} />
                            {errors.homeGroundName && <p className={errorClass}>{errors.homeGroundName.message as string}</p>}
                        </div>
                        <div className="relative">
                            <label className={labelClass}>Stadium Address <span className="text-red-500">*</span></label>
                            <input {...register("stadiumAddress")} className={`${inputClass} ${errors.stadiumAddress ? 'border-red-500' : 'border-[rgba(255,255,255,0.1)]'}`} />
                            {errors.stadiumAddress && <p className={errorClass}>{errors.stadiumAddress.message as string}</p>}
                        </div>
                        <div className="relative col-span-1 md:col-span-2">
                            <label className={labelClass}>Training Ground</label>
                            <input {...register("trainingGround")} className={`${inputClass} border-[rgba(255,255,255,0.1)]`} />
                        </div>
                        <div className="relative">
                            <label className={labelClass}>Home Kit Color <span className="text-red-500">*</span></label>
                            <input {...register("homeKitColor")} className={`${inputClass} ${errors.homeKitColor ? 'border-red-500' : 'border-[rgba(255,255,255,0.1)]'}`} />
                            {errors.homeKitColor && <p className={errorClass}>{errors.homeKitColor.message as string}</p>}
                        </div>
                        <div className="relative">
                            <label className={labelClass}>Away Kit Color <span className="text-red-500">*</span></label>
                            <input {...register("awayKitColor")} className={`${inputClass} ${errors.awayKitColor ? 'border-red-500' : 'border-[rgba(255,255,255,0.1)]'}`} />
                            {errors.awayKitColor && <p className={errorClass}>{errors.awayKitColor.message as string}</p>}
                        </div>
                        <div className="relative">
                            <label className={labelClass}>Reserve Kit Color</label>
                            <input {...register("reserveKitColor")} className={`${inputClass} border-[rgba(255,255,255,0.1)]`} />
                        </div>
                        <div className="relative">
                            <label className={labelClass}>Number of Players <span className="text-red-500">*</span></label>
                            <input type="number" {...register("numberOfPlayers")} className={`${inputClass} ${errors.numberOfPlayers ? 'border-red-500' : 'border-[rgba(255,255,255,0.1)]'}`} />
                            {errors.numberOfPlayers && <p className={errorClass}>{errors.numberOfPlayers.message as string}</p>}
                        </div>
                    </div>
                </div>

                {/* SECTION F: BANKING & PAYMENT DETAILS */}
                <div className={sectionClass}>
                    <h2 className={headingClass}>Section F: Banking Information</h2>
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

                {/* SECTION G: DECLARATION */}
                <div className={sectionClass}>
                    <h2 className={headingClass}>Section G: Declaration & Consent</h2>
                    <div className="pb-4">
                        <p className="text-gray-400 text-sm mb-4">
                            I hereby declare that all information provided is true and correct to the best of my knowledge. I agree to abide by the rules and regulations of Osun State Football Association and related football bodies.
                        </p>
                        <div className="space-y-4">
                            <div>
                                <label className="flex items-start gap-3 text-white cursor-pointer">
                                    <input type="checkbox" {...register("declarationAccepted")} className="mt-1 w-5 h-5 accent-accent rounded" />
                                    <span>I confirm the above declaration and accept the terms and conditions. <span className="text-red-500">*</span></span>
                                </label>
                                {errors.declarationAccepted && <p className="text-red-500 text-xs mt-1">{errors.declarationAccepted.message as string}</p>}
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="relative">
                                    <label className={labelClass}>Authorized Officer Name <span className="text-red-500">*</span></label>
                                    <input {...register("authorizedOfficerName")} className={`${inputClass} ${errors.authorizedOfficerName ? 'border-red-500' : 'border-[rgba(255,255,255,0.1)]'}`} />
                                    {errors.authorizedOfficerName && <p className={errorClass}>{errors.authorizedOfficerName.message as string}</p>}
                                </div>
                                <div className="relative">
                                    <label className={labelClass}>Position <span className="text-red-500">*</span></label>
                                    <input {...register("authorizedOfficerPosition")} className={`${inputClass} ${errors.authorizedOfficerPosition ? 'border-red-500' : 'border-[rgba(255,255,255,0.1)]'}`} />
                                    {errors.authorizedOfficerPosition && <p className={errorClass}>{errors.authorizedOfficerPosition.message as string}</p>}
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
                        className="bg-accent text-primary-dark hover:bg-secondary px-8 py-3 rounded-full text-lg font-bold shadow-[0_0_15px_rgba(0,255,136,0.2)] transition-all disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed flex items-center gap-2"
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
