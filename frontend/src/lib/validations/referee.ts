import { z } from "zod";

const maxFileSize = 5 * 1024 * 1024; // 5MB

// Helper to check file size if a file is provided
const fileSchema = z.any()
    .refine((file) => !file || file.length === 0 || file instanceof File || file instanceof FileList, "Please upload a valid file.")
    .optional();

export const refereeFormSchema = z.object({
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
    relationshipToEmergencyContact: z.string().min(2, "Relationship is required"),

    // SECTION C: IDENTIFICATION & DOCUMENT UPLOADS (Handled as generic any/file for now)
    passportPhotograph: fileSchema,
    ninDocument: fileSchema,
    birthCertificate: fileSchema,
    medicalFitnessCertificate: fileSchema,

    // SECTION D: REFEREE CLASSIFICATION & CERTIFICATION
    refereeCategory: z.enum([
        "Center Referee",
        "Assistant Referee",
        "Futsal Referee",
        "Beach Soccer Referee",
        "Instructor / Assessor",
    ]),
    currentGrade: z.enum([
        "State Referee",
        "National Referee",
        "Elite Referee",
        "Youth Referee",
        "Beginner",
    ]),
    certificationBody: z.enum(["OSUN FA", "NFF", "CAF", "FIFA"]),
    certificateNumber: z.string().optional(),
    yearCertified: z.string().optional(),
    licenseExpiryDate: z.string().optional(),
    certificationUpload: fileSchema,

    // SECTION E: EXPERIENCE & MATCH HISTORY
    yearsOfExperience: z.string().min(1, "Years of experience is required"),
    highestCompetitionOfficiated: z.enum([
        "Grassroots",
        "State League",
        "NLO",
        "NNL",
        "NPFL",
        "NWFL",
        "International",
    ]),
    totalMatchesOfficiated: z.string().optional(),
    recentMajorMatches: z.string().optional(),

    // SECTION F: FITNESS & ASSESSMENT
    lastFitnessTestDate: z.string().optional(),
    fitnessTestResult: z.enum(["Passed", "Failed", "Pending"]).optional(),
    lastAssessmentDate: z.string().optional(),
    assessmentRating: z.enum(["Excellent", "Good", "Average", "Needs Improvement"]).optional(),

    // SECTION G: DISCIPLINARY RECORD
    underSuspension: z.enum(["Yes", "No"]),
    suspensionDetails: z.string().optional(),
    previousDisciplinaryAction: z.enum(["Yes", "No"]),
    disciplinaryDetails: z.string().optional(),

    // SECTION H: BANKING & PAYMENT DETAILS (OPTIONAL)
    bankName: z.string().optional(),
    accountName: z.string().optional(),
    accountNumber: z.string().optional(),
    paymentReference: z.string().optional(),

    // SECTION I: DECLARATION
    declarationAccepted: z.boolean().refine((val) => val === true, {
        message: "You must accept the declaration",
    }),
    refereeFullName: z.string().min(2, "Referee full name is required"),
    digitalSignature: z.string().min(2, "Digital signature is required"),
    date: z.string().min(1, "Date is required"),
});

export type RefereeFormValues = z.infer<typeof refereeFormSchema>;
