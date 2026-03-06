import { z } from "zod";

const fileSchema = z.any()
    .refine((file) => !file || file.length === 0 || file instanceof File || file instanceof FileList, "Please upload a valid file.")
    .optional();

export const clubFormSchema = z.object({
    // SECTION A: CLUB IDENTIFICATION
    clubName: z.string().min(2, "Club name is required"),
    shortName: z.string().optional(),
    yearOfEstablishment: z.string().min(4, "Year is required"),
    clubCategory: z.enum([
        "Professional",
        "Semi-Professional",
        "Amateur",
        "Academy",
        "School Team",
        "Community Club",
    ]),
    leagueLevel: z.enum([
        "NPFL",
        "NNL",
        "National Women's Championship",
        "NLO",
        "Osun State Youth League",
        "Osun State Women’s League",
        "Grassroots",
        "Others",
    ]),
    leagueOther: z.string().optional(),

    // SECTION B: CLUB LOCATION & CONTACT
    registeredAddress: z.string().min(5, "Address is required"),
    lga: z.string().min(2, "LGA is required"),
    townCity: z.string().min(2, "Town/City is required"),
    officialPhoneNumber: z.string().min(10, "Valid phone is required"),
    officialEmailAddress: z.string().email("Valid email is required"),
    websiteSocialMedia: z.string().optional(),

    // SECTION C: CLUB MANAGEMENT & OFFICIALS
    chairmanName: z.string().min(2, "Chairman name is required"),
    chairmanPhone: z.string().min(10, "Chairman phone is required"),
    chairmanEmail: z.string().email("Valid email is required").or(z.literal("")),

    secretaryName: z.string().min(2, "Secretary name is required"),
    secretaryPhone: z.string().min(10, "Secretary phone is required"),
    secretaryEmail: z.string().email("Valid email is required").or(z.literal("")),

    headCoachName: z.string().min(2, "Head coach name is required"),
    headCoachLicenseLevel: z.string().min(1, "License level is required"),
    headCoachPhone: z.string().min(10, "Head coach phone is required"),

    teamManagerName: z.string().min(2, "Team manager name is required"),
    teamManagerPhone: z.string().min(10, "Team manager phone is required"),

    // SECTION D: LEGAL & AFFILIATION UPLOADS
    cacRegistrationCertificate: fileSchema,
    osfaAffiliationCertificate: fileSchema,
    constitution: fileSchema,
    clubLogo: fileSchema,
    applicationLetter: fileSchema,

    // SECTION E: TEAM & FACILITIES
    homeGroundName: z.string().min(2, "Home ground is required"),
    stadiumAddress: z.string().min(5, "Stadium address is required"),
    trainingGround: z.string().optional(),
    homeKitColor: z.string().min(2, "Home kit color is required"),
    awayKitColor: z.string().min(2, "Away kit color is required"),
    reserveKitColor: z.string().optional(),
    numberOfPlayers: z.string().min(1, "Number of players is required"),
    youthTeamsAvailable: z.array(z.string()).optional(), // Assuming checkboxes

    // SECTION F: BANKING (CONFIDENTIAL)
    bankName: z.string().optional(),
    accountName: z.string().optional(),
    accountNumber: z.string().optional(),
    paymentReference: z.string().optional(),

    // SECTION G: DECLARATION
    declarationAccepted: z.boolean().refine((val) => val === true, {
        message: "You must accept the declaration",
    }),
    authorizedOfficerName: z.string().min(2, "Officer name is required"),
    authorizedOfficerPosition: z.string().min(2, "Officer position is required"),
    digitalSignature: z.string().min(2, "Digital signature is required"),
    date: z.string().min(1, "Date is required"),
});

export type ClubFormValues = z.infer<typeof clubFormSchema>;
