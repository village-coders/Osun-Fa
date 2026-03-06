import { z } from "zod";

const fileSchema = z.any()
    .refine((file) => !file || file.length === 0 || file instanceof File || file instanceof FileList, "Please upload a valid file.")
    .optional();

export const playerFormSchema = z.object({
    // SECTION A: PERSONAL INFORMATION
    surname: z.string().min(2, "Surname is required"),
    firstName: z.string().min(2, "First name is required"),
    otherNames: z.string().optional(),
    gender: z.enum(["Male", "Female"]),
    dateOfBirth: z.string().min(1, "Date of birth is required"),
    placeOfBirth: z.string().min(2, "Place of birth is required"),
    nationality: z.string().min(2, "Nationality is required"),
    stateOfOrigin: z.string().min(2, "State of origin is required"),
    lga: z.string().min(2, "Local Government Area is required"),
    residentialAddress: z.string().min(5, "Residential address is required"),

    // SECTION B: CONTACT INFORMATION
    phoneNumber: z.string().min(10, "Valid phone number is required"),
    emailAddress: z.string().email("Valid email address is required").or(z.literal("")),
    emergencyContactName: z.string().min(2, "Emergency contact name is required"),
    emergencyContactPhone: z.string().min(10, "Emergency contact phone is required"),
    relationshipToEmergencyContact: z.string().min(2, "Relationship is required"),

    // SECTION C: NEXT OF KIN / PARENT (FOR MINORS) - Optional overall, but might validate conditionally later
    parentFullName: z.string().optional(),
    parentPhoneNumber: z.string().optional(),
    parentAddress: z.string().optional(),
    consentFormUpload: fileSchema,

    // SECTION D: PLAYER IDENTIFICATION
    passportPhotograph: fileSchema,
    birthCertificate: fileSchema,
    ninDocument: fileSchema,
    schoolId: fileSchema,

    // SECTION E: FOOTBALL PROFILE
    currentClubName: z.string().optional(),
    clubRegistrationNumber: z.string().optional(),
    playingPosition: z.enum([
        "Goalkeeper",
        "Defender",
        "Midfielder",
        "Forward",
    ]),
    preferredPosition: z.string().optional(),
    jerseyNumber: z.string().optional(),
    dominantFoot: z.enum(["Right", "Left", "Both"]),
    heightCm: z.string().optional(),
    weightKg: z.string().optional(),
    yearsOfExperience: z.string().min(1, "Years of experience is required"),

    // SECTION F: REGISTRATION & TRANSFER HISTORY
    previouslyRegisteredWithOSFA: z.enum(["Yes", "No"]),
    previousOsfaClub: z.string().optional(),
    previousClubs: z.string().optional(),
    outstandingTransferIssues: z.enum(["Yes", "No"]),
    transferIssueDetails: z.string().optional(),

    // SECTION G: MEDICAL (CONFIDENTIAL)
    bloodGroup: z.string().optional(),
    knownMedicalConditions: z.string().optional(),
    allergies: z.string().optional(),
    medicalClearanceUpload: fileSchema,

    // SECTION H: EDUCATION / OCCUPATION (OPTIONAL)
    highestEducationLevel: z.enum(["Primary", "Secondary", "Tertiary", "None"]).optional(),
    schoolInstitutionEmployer: z.string().optional(),

    // SECTION I: DECLARATION
    declarationAccepted: z.boolean().refine((val) => val === true, {
        message: "You must accept the declaration",
    }),
    playerName: z.string().min(2, "Player name is required"),
    digitalSignature: z.string().min(2, "Digital signature is required"),
    date: z.string().min(1, "Date is required"),
    parentName: z.string().optional(),
    parentSignature: z.string().optional(),
});

export type PlayerFormValues = z.infer<typeof playerFormSchema>;
