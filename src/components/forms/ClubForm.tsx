"use client";

import { useForm } from "react-hook-form";
import { ClubFormValues } from "@/types/form-values";
import { useState } from "react";
import userApi from "@/lib/api";
import { toast } from "react-hot-toast";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function ClubForm() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<ClubFormValues>({
        // CRITICAL: Initialize as an empty array to prevent .includes() errors
        defaultValues: {
            youthTeamsAvailable: [],
            clubCategory: "",
            leagueLevel: "",
        }
    });

    // Watch the checkboxes for the UI check
    const watchedYouthTeams = watch("youthTeamsAvailable") || [];

    const onSubmit = async (data: ClubFormValues) => {
        setIsSubmitting(true);
        try {
            const formData = new FormData();

            // Clean handling of all fields
            Object.entries(data).forEach(([key, value]) => {
                if (value instanceof FileList) {
                    if (value.length > 0) formData.append(key, value[0]);
                }
                // Handle Arrays (Checkboxes) correctly for FormData
                else if (Array.isArray(value)) {
                    value.forEach((item) => formData.append(key, item));
                }
                else if (value !== undefined && value !== null && value !== '') {
                    formData.append(key, String(value));
                }
            });

            // Backward compatibility aliases
            if (data.clubName) formData.append('name', data.clubName);
            if (data.townCity) formData.append('city', data.townCity);
            if (data.yearOfEstablishment) formData.append('establishmentYear', String(data.yearOfEstablishment));
            if (data.officialPhoneNumber) formData.append('officialPhone', data.officialPhoneNumber);
            if (data.officialEmailAddress) formData.append('officialEmail', data.officialEmailAddress);

            const token = Cookies.get("portalToken");

            const res = await userApi.put("/clubs/update-profile", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${token}`
                },
            });

            toast.success("Club profile created successfully!");
            setSubmitSuccess(true);

            setTimeout(() => {
                router.push("/portal/team");
            }, 1000);
        } catch (error: any) {
            console.error(error);
            toast.error(error.response?.data?.message || "Registration failed. Please check your connection.");
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
                <h3 className="text-2xl font-bold text-white mb-2">Profile Created!</h3>
                <p className="text-gray-400">Your club profile has been saved. Redirecting you to your dashboard...</p>
                <button
                    onClick={() => router.push('/portal/team')}
                    className="mt-6 bg-accent text-primary-dark hover:bg-secondary px-6 py-2 rounded-full font-bold transition-colors"
                >
                    Go to Dashboard
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

            <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-8 relative">
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
                            <input {...register("clubName", { required: "Club name is required" })} className={`${inputClass} ${errors.clubName ? 'border-red-500' : 'border-[rgba(255,255,255,0.1)]'}`} />
                            {errors.clubName && <p className={errorClass}>{errors.clubName.message}</p>}
                        </div>
                        <div className="relative">
                            <label className={labelClass}>Short Name / Nickname</label>
                            <input {...register("shortName")} className={`${inputClass} border-[rgba(255,255,255,0.1)]`} />
                        </div>
                        <div className="relative">
                            <label className={labelClass}>Year of Establishment <span className="text-red-500">*</span></label>
                            <input type="number" {...register("yearOfEstablishment", { required: "Year is required" })} className={`${inputClass} ${errors.yearOfEstablishment ? 'border-red-500' : 'border-[rgba(255,255,255,0.1)]'}`} />
                            {errors.yearOfEstablishment && <p className={errorClass}>{errors.yearOfEstablishment.message}</p>}
                        </div>
                        <div className="relative">
                            <label className={labelClass}>Club Category <span className="text-red-500">*</span></label>
                            <select {...register("clubCategory", { required: "Category is required" })} className={`${inputClass} ${errors.clubCategory ? 'border-red-500' : 'border-[rgba(255,255,255,0.1)]'}`}>
                                <option value="">Select Category</option>
                                <option value="Professional">Professional</option>
                                <option value="Semi-Professional">Semi-Professional</option>
                                <option value="Amateur">Amateur</option>
                                <option value="Academy">Academy</option>
                                <option value="School Team">School Team</option>
                                <option value="Community Club">Community Club</option>
                            </select>
                            {errors.clubCategory && <p className={errorClass}>{errors.clubCategory.message}</p>}
                        </div>
                        <div className="relative">
                            <label className={labelClass}>League / Competition Level <span className="text-red-500">*</span></label>
                            <select {...register("leagueLevel", { required: "League is required" })} className={`${inputClass} ${errors.leagueLevel ? 'border-red-500' : 'border-[rgba(255,255,255,0.1)]'}`}>
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
                            {errors.leagueLevel && <p className={errorClass}>{errors.leagueLevel.message}</p>}
                        </div>
                        <div className="relative">
                            <label className={labelClass}>If Others (League)</label>
                            <input {...register("leagueOther")} className={`${inputClass} border-[rgba(255,255,255,0.1)]`} />
                        </div>
                    </div>
                </div>

                {/* SECTION B: LOCATION */}
                <div className={sectionClass}>
                    <h2 className={headingClass}>Section B: Location & Contact Details</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-4">
                        <div className="relative md:col-span-2">
                            <label className={labelClass}>Registered Address <span className="text-red-500">*</span></label>
                            <textarea {...register("registeredAddress", { required: "Address is required" })} rows={2} className={`${inputClass} ${errors.registeredAddress ? 'border-red-500' : 'border-[rgba(255,255,255,0.1)]'}`} />
                            {errors.registeredAddress && <p className={errorClass}>{errors.registeredAddress.message}</p>}
                        </div>
                        <div className="relative">
                            <label className={labelClass}>LGA <span className="text-red-500">*</span></label>
                            <input {...register("lga", { required: "LGA is required" })} className={`${inputClass} ${errors.lga ? 'border-red-500' : 'border-[rgba(255,255,255,0.1)]'}`} />
                            {errors.lga && <p className={errorClass}>{errors.lga.message}</p>}
                        </div>
                        <div className="relative">
                            <label className={labelClass}>Town / City <span className="text-red-500">*</span></label>
                            <input {...register("townCity", { required: "Town/City is required" })} className={`${inputClass} ${errors.townCity ? 'border-red-500' : 'border-[rgba(255,255,255,0.1)]'}`} />
                            {errors.townCity && <p className={errorClass}>{errors.townCity.message}</p>}
                        </div>
                        <div className="relative">
                            <label className={labelClass}>Official Phone Number <span className="text-red-500">*</span></label>
                            <input type="tel" {...register("officialPhoneNumber", { required: "Phone is required" })} className={`${inputClass} ${errors.officialPhoneNumber ? 'border-red-500' : 'border-[rgba(255,255,255,0.1)]'}`} />
                            {errors.officialPhoneNumber && <p className={errorClass}>{errors.officialPhoneNumber.message}</p>}
                        </div>
                        <div className="relative">
                            <label className={labelClass}>Official Email Address <span className="text-red-500">*</span></label>
                            <input type="email" {...register("officialEmailAddress", { required: "Email is required" })} className={`${inputClass} ${errors.officialEmailAddress ? 'border-red-500' : 'border-[rgba(255,255,255,0.1)]'}`} />
                            {errors.officialEmailAddress && <p className={errorClass}>{errors.officialEmailAddress.message}</p>}
                        </div>
                        <div className="relative col-span-1 md:col-span-2">
                            <label className={labelClass}>Website or Social Media Page</label>
                            <input {...register("websiteSocialMedia")} className={`${inputClass} border-[rgba(255,255,255,0.1)]`} />
                        </div>
                    </div>
                </div>

                {/* SECTION C: MANAGEMENT */}
                <div className={sectionClass}>
                    <h2 className={headingClass}>Section C: Club Management & Officials</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-4">
                        <div className="relative">
                            <label className={labelClass}>Chairman / President Name <span className="text-red-500">*</span></label>
                            <input {...register("chairmanName", { required: "Chairman name is required" })} className={`${inputClass} ${errors.chairmanName ? 'border-red-500' : 'border-[rgba(255,255,255,0.1)]'}`} />
                            {errors.chairmanName && <p className={errorClass}>{errors.chairmanName.message}</p>}
                        </div>
                        <div className="relative">
                            <label className={labelClass}>Chairman Phone <span className="text-red-500">*</span></label>
                            <input type="tel" {...register("chairmanPhone", { required: "Chairman phone is required" })} className={`${inputClass} ${errors.chairmanPhone ? 'border-red-500' : 'border-[rgba(255,255,255,0.1)]'}`} />
                            {errors.chairmanPhone && <p className={errorClass}>{errors.chairmanPhone.message}</p>}
                        </div>
                        <div className="relative">
                            <label className={labelClass}>Chairman Email</label>
                            <input type="email" {...register("chairmanEmail")} className={`${inputClass} ${errors.chairmanEmail ? 'border-red-500' : 'border-[rgba(255,255,255,0.1)]'}`} />
                            {errors.chairmanEmail && <p className={errorClass}>{errors.chairmanEmail.message as string}</p>}
                        </div>
                        <div className="relative">
                            <label className={labelClass}>Secretary Name <span className="text-red-500">*</span></label>
                            <input {...register("secretaryName", { required: "Secretary name is required" })} className={`${inputClass} ${errors.secretaryName ? 'border-red-500' : 'border-[rgba(255,255,255,0.1)]'}`} />
                            {errors.secretaryName && <p className={errorClass}>{errors.secretaryName.message}</p>}
                        </div>
                        <div className="relative">
                            <label className={labelClass}>Secretary Phone <span className="text-red-500">*</span></label>
                            <input type="tel" {...register("secretaryPhone", { required: "Secretary phone is required" })} className={`${inputClass} ${errors.secretaryPhone ? 'border-red-500' : 'border-[rgba(255,255,255,0.1)]'}`} />
                            {errors.secretaryPhone && <p className={errorClass}>{errors.secretaryPhone.message}</p>}
                        </div>
                        <div className="relative">
                            <label className={labelClass}>Secretary Email</label>
                            <input type="email" {...register("secretaryEmail")} className={`${inputClass} ${errors.secretaryEmail ? 'border-red-500' : 'border-[rgba(255,255,255,0.1)]'}`} />
                            {errors.secretaryEmail && <p className={errorClass}>{errors.secretaryEmail.message as string}</p>}
                        </div>
                        <div className="relative">
                            <label className={labelClass}>Head Coach Name <span className="text-red-500">*</span></label>
                            <input {...register("headCoachName", { required: "Head coach name is required" })} className={`${inputClass} ${errors.headCoachName ? 'border-red-500' : 'border-[rgba(255,255,255,0.1)]'}`} />
                            {errors.headCoachName && <p className={errorClass}>{errors.headCoachName.message}</p>}
                        </div>
                        <div className="relative">
                            <label className={labelClass}>Head Coach License Level <span className="text-red-500">*</span></label>
                            <input {...register("headCoachLicenseLevel")} className={`${inputClass} ${errors.headCoachLicenseLevel ? 'border-red-500' : 'border-[rgba(255,255,255,0.1)]'}`} />
                            {errors.headCoachLicenseLevel && <p className={errorClass}>{errors.headCoachLicenseLevel.message as string}</p>}
                        </div>
                        <div className="relative">
                            <label className={labelClass}>Head Coach Phone <span className="text-red-500">*</span></label>
                            <input type="tel" {...register("headCoachPhone")} className={`${inputClass} ${errors.headCoachPhone ? 'border-red-500' : 'border-[rgba(255,255,255,0.1)]'}`} />
                            {errors.headCoachPhone && <p className={errorClass}>{errors.headCoachPhone.message as string}</p>}
                        </div>
                        <div className="relative">
                            <label className={labelClass}>Team Manager Name <span className="text-red-500">*</span></label>
                            <input {...register("teamManagerName", { required: "Team manager name is required" })} className={`${inputClass} ${errors.teamManagerName ? 'border-red-500' : 'border-[rgba(255,255,255,0.1)]'}`} />
                            {errors.teamManagerName && <p className={errorClass}>{errors.teamManagerName.message}</p>}
                        </div>
                        <div className="relative">
                            <label className={labelClass}>Team Manager Phone <span className="text-red-500">*</span></label>
                            <input type="tel" {...register("teamManagerPhone")} className={`${inputClass} ${errors.teamManagerPhone ? 'border-red-500' : 'border-[rgba(255,255,255,0.1)]'}`} />
                            {errors.teamManagerPhone && <p className={errorClass}>{errors.teamManagerPhone.message as string}</p>}
                        </div>
                    </div>
                </div>

                {/* SECTION D: DOCUMENTS */}
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
                            <input {...register("homeGroundName", { required: "Home ground is required" })} className={`${inputClass} ${errors.homeGroundName ? 'border-red-500' : 'border-[rgba(255,255,255,0.1)]'}`} />
                            {errors.homeGroundName && <p className={errorClass}>{errors.homeGroundName.message}</p>}
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
                            <input type="number" {...register("numberOfPlayers", { required: "Number of players is required" })} className={`${inputClass} ${errors.numberOfPlayers ? 'border-red-500' : 'border-[rgba(255,255,255,0.1)]'}`} />
                            {errors.numberOfPlayers && <p className={errorClass}>{errors.numberOfPlayers.message}</p>}
                        </div>
                        <div className="relative col-span-1 md:col-span-2">
                            <label className={labelClass}>Youth Teams Available</label>
                            <div className="flex flex-wrap gap-4 mt-2">
                                {["U-13", "U-15", "U-17", "U-19", "Women's Team"].map((team) => (
                                    <label key={team} className="flex items-center gap-2 text-white cursor-pointer">
                                        <input
                                            type="checkbox"
                                            value={team}
                                            {...register("youthTeamsAvailable")}
                                            // DEFENSIVE CHECK: Ensure we only call .includes on an array
                                            checked={Array.isArray(watchedYouthTeams) && watchedYouthTeams.includes(team)}
                                            className="w-4 h-4 accent-accent rounded"
                                        /> {team}
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* SECTION F: BANKING */}
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
                            I hereby declare that all information provided is true and correct to the best of my knowledge.
                        </p>
                        <div className="space-y-4">
                            <div>
                                <label className="flex items-start gap-3 text-white cursor-pointer">
                                    <input type="checkbox" {...register("declarationAccepted", { required: "You must accept the declaration" })} className="mt-1 w-5 h-5 accent-accent rounded" />
                                    <span>I confirm the above declaration and accept the terms and conditions. <span className="text-red-500">*</span></span>
                                </label>
                                {errors.declarationAccepted && <p className="text-red-500 text-xs mt-1">{errors.declarationAccepted.message}</p>}
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
                        {isSubmitting ? "Submitting Form..." : "Submit Registration"}
                    </button>
                </div>
            </form>
        </div>
    );
}