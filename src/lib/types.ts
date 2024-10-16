export interface Student {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    dateOfBirth: string;
    gender: string;
    country: string;
    university: string;
    courseOfStudy: string;
    yearOfStudy: string;
    levelOfStudy: string;
    fieldOfStudy: string;
    isEligibleForNeedBasedScholarships: boolean;
    isVerified: boolean;
    profilePicture: string;
}

export interface Scholarship {
    _id: string;
    title: string;
    description: string;
    reward: string;
    amount: string;
    deadline: string;
    criteria: Criteria | null;
    location: string;
    imageUrl: string;
    url: string;
    status: "Approved";
}

export interface Criteria {
    Non_US?: string;
    GPA?: string;
    Accredited_University?: string;
    Minimum_Age?: string;
}