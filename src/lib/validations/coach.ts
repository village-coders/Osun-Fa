import { z } from "zod";

const fileSchema = z.any()
    .refine((file) => !file || file.length === 0 || file instanceof File || file instanceof FileList, "Please upload a valid file.")
    .optional();

export const coachFormSchema = z.object({
    // SECTION A: PERSONAL INFORMATION
    surname: z.string().min(2, "Surname is required"),
    firstName: z.string().min(2, "First name is required"),
    otherNames: z.string().optional(),
    gender: z.enum(["Male", "Female", "Prefer not to say"]),
    dateOfBirth: z.string().min(1, "Date of birth is required"),
    placeOfBirth: z.string().min(2, "Place of birth is required"),
    nationality: z.string().min(2, "Nationality is required"),
    stateOfOrigin: z.string().min(2, "State of origin is required"),
    lga: z.string().min(2, "Local Government Area is required"),
    residentialAddress: z.string().min(5, "Residential address is required"),

    // SECTION B: CONTACT INFORMATION
    phoneNumber: z.string().min(10, "Valid phone number is required"),
    emailAddress: z.string().email("Valid email address is required"),
    alternativePhone: z.string().optional(),
    emergencyContactName: z.string().min(2, "Emergency contact name is required"),
    emergencyContactPhone: z.string().min(10, "Emergency contact phone is required"),

    // SECTION C: IDENTIFICATION
    passportPhotograph: fileSchema,
    ninDocument: fileSchema,
    birthCertificate: fileSchema,
    proofOfAddress: fileSchema,

    // SECTION D: COACHING QUALIFICATIONS
    highestCoachingQualification: z.enum(["CAF D", "CAF C", "CAF B", "CAF A", "CAF Pro", "Other"]),
    qualificationOther: z.string().optional(),
    issuingBody: z.enum(["NFF", "CAF", "FIFA", "Other"]),
    issuingBodyOther: z.string().optional(),
    certificateNumber: z.string().optional(),
    yearObtained: z.string().optional(),
    licenseExpiryDate: z.string().optional(),
    certificateUpload: fileSchema,

    // SECTION E: COACHING PROFILE
    primaryCoachingRole: z.enum([
        "Head Coach",
        "Assistant Coach",
        "Goalkeeper Coach",
        "Fitness Coach",
        "Youth Coach",
        "Technical Director",
        "Other",
    ]),
    roleOther: z.string().optional(),
    specialization: z.string().optional(),
    yearsOfExperience: z.string().min(1, "Years of experience is required"),
    currentClub: z.string().optional(),
    clubRegistrationNumber: z.string().optional(),
    previousClubs: z.string().optional(),

    // SECTION F: CPD
    recentCoursesAttended: z.string().optional(),
    yearsAttended: z.string().optional(),
    cpdCertificatesUpload: fileSchema,

    // SECTION G: MEDICAL (OPTIONAL)
    knownMedicalConditions: z.string().optional(),
    medicalFitnessCertificate: fileSchema,

    // SECTION H: BANKING (OPTIONAL)
    bankName: z.string().optional(),
    accountName: z.string().optional(),
    accountNumber: z.string().optional(),
    paymentReference: z.string().optional(),

    // SECTION I: DECLARATION
    declarationAccepted: z.boolean().refine((val) => val === true, {
        message: "You must accept the declaration",
    }),
    coachFullName: z.string().min(2, "Coach full name is required"),
    digitalSignature: z.string().min(2, "Digital signature is required"),
    date: z.string().min(1, "Date is required"),
});

export type CoachFormValues = z.infer<typeof coachFormSchema>;
