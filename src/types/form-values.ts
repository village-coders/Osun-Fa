export interface ClubFormValues {
    // SECTION A: CLUB IDENTIFICATION
    clubLogo?: any;
    clubName: string;
    name?: string;
    shortName?: string;
    yearOfEstablishment: string;
    establishmentYear?: string;
    clubCategory: string;
    leagueLevel: string;
    leagueOther?: string;

    // SECTION B: CLUB LOCATION & CONTACT
    registeredAddress: string;
    lga: string;
    townCity: string;
    city?: string;
    officialPhoneNumber: string;
    officialPhone?: string;
    officialEmailAddress: string;
    officialEmail?: string;
    websiteSocialMedia?: string;

    // SECTION C: CLUB MANAGEMENT & OFFICIALS
    chairmanName: string;
    chairmanPhone: string;
    chairmanEmail?: string;
    secretaryName: string;
    secretaryPhone: string;
    secretaryEmail?: string;
    headCoachName: string;
    headCoachLicenseLevel: string;
    headCoachPhone: string;
    teamManagerName: string;
    teamManagerPhone: string;

    // SECTION D: LEGAL & AFFILIATION UPLOADS
    cacRegistrationCertificate?: any;
    osfaAffiliationCertificate?: any;
    constitution?: any;
    applicationLetter?: any;

    // SECTION E: TEAM & FACILITIES
    homeGroundName: string;
    stadiumAddress: string;
    trainingGround?: string;
    homeKitColor: string;
    awayKitColor: string;
    reserveKitColor?: string;
    numberOfPlayers: string;
    youthTeamsAvailable?: string[];

    // SECTION F: BANKING
    bankName?: string;
    accountName?: string;
    accountNumber?: string;
    paymentReference?: string;

    // SECTION G: DECLARATION
    declarationAccepted: boolean;
    authorizedOfficerName: string;
    authorizedOfficerPosition: string;
    digitalSignature: string;
    date: string;
}

export interface CoachFormValues {
    passportPhotograph?: any;
    surname: string;
    firstName: string;
    otherNames?: string;
    gender: string;
    dateOfBirth: string;
    placeOfBirth: string;
    nationality: string;
    stateOfOrigin: string;
    residentialAddress: string;
    lga: string;

    // Section B
    phoneNumber: string;
    emailAddress: string;
    alternativePhone?: string;
    emergencyContactName: string;
    emergencyContactPhone: string;

    // Section C
    ninDocument?: any;
    birthCertificate?: any;
    proofOfAddress?: any;

    // Section D
    highestCoachingQualification: string;
    qualificationOther?: string;
    issuingBody: string;
    issuingBodyOther?: string;
    certificateNumber?: string;
    yearObtained?: string;
    licenseExpiryDate?: string;
    certificateUpload?: any;

    // Section E
    primaryCoachingRole: string;
    roleOther?: string;
    specialization?: string;
    yearsOfExperience: string;
    currentClub?: string;
    clubRegistrationNumber?: string;
    previousClubs?: string;

    // Section F
    recentCoursesAttended?: string;
    yearsAttended?: string;
    cpdCertificatesUpload?: any;

    // Section G
    knownMedicalConditions?: string;
    medicalFitnessCertificate?: any;

    // Section H
    bankName?: string;
    accountName?: string;
    accountNumber?: string;
    paymentReference?: string;

    // Section I
    declarationAccepted: boolean;
    coachFullName: string;
    digitalSignature: string;
    date: string;
}

export interface PlayerFormValues {
    passportPhotograph?: any;
    surname: string;
    firstName: string;
    otherNames?: string;
    gender: string;
    dateOfBirth: string;
    placeOfBirth: string;
    nationality: string;
    stateOfOrigin: string;
    lga: string;
    registrationSeason: string;
    residentialAddress: string;

    // Section B
    phoneNumber: string;
    emailAddress?: string;
    emergencyContactName: string;
    emergencyContactPhone: string;
    relationshipToEmergencyContact: string;

    // Section C
    parentFullName?: string;
    parentPhoneNumber?: string;
    parentAddress?: string;
    consentFormUpload?: any;

    // Section D
    birthCertificate?: any;
    ninDocument?: any;
    schoolId?: any;

    // Section E
    currentClubName?: string;
    clubRegistrationNumber?: string;
    playingPosition: string;
    preferredPosition?: string;
    jerseyNumber?: string;
    dominantFoot: string;
    heightCm?: string;
    weightKg?: string;
    yearsOfExperience: string;

    // Section F
    previouslyRegisteredWithOSFA?: string;
    previousOsfaClub?: string;
    previousClubs?: string;
    outstandingTransferIssues?: string;
    transferIssueDetails?: string;

    // Section G
    bloodGroup?: string;
    allergies?: string;
    knownMedicalConditions?: string;
    medicalClearanceUpload?: any;

    // Section H
    highestEducationLevel?: string;
    schoolInstitutionEmployer?: string;

    // Section I
    declarationAccepted: boolean;
    playerName: string;
    digitalSignature: string;
    date: string;
    parentName?: string;
    parentSignature?: string;

    // Facial Recognition (internal)
    faceDescriptor?: number[];
}

export interface RefereeFormValues {
    passportPhotograph?: any;
    surname: string;
    firstName: string;
    otherNames?: string;
    gender: string;
    dateOfBirth: string;
    placeOfBirth: string;
    nationality: string;
    stateOfOrigin: string;
    residentialAddress: string;
    lga: string;

    // Section B
    phoneNumber: string;
    emailAddress: string;
    alternativePhone?: string;
    emergencyContactName: string;
    emergencyContactPhone: string;
    relationshipToEmergencyContact: string;

    // Section C
    ninDocument?: any;
    birthCertificate?: any;
    medicalFitnessCertificate?: any;

    // Section D
    refereeCategory: string;
    currentGrade: string;
    certificationBody: string;
    certificateNumber?: string;

    // Section E
    yearsOfExperience: string;
    highestCompetitionOfficiated: string;
    totalMatchesOfficiated?: string;
    recentMajorMatches?: string;

    // Section F
    lastFitnessTestDate?: string;
    fitnessTestResult?: string;
    lastAssessmentDate?: string;
    assessmentRating?: string;

    // Section G
    underSuspension: string;
    suspensionDetails?: string;
    previousDisciplinaryAction: string;
    disciplinaryDetails?: string;

    // Section H
    bankName?: string;
    accountName?: string;
    accountNumber?: string;
    paymentReference?: string;

    // Section I
    declarationAccepted: boolean;
    refereeFullName: string;
    digitalSignature: string;
    date: string;
}
