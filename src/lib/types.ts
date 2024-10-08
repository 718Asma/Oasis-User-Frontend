export interface Student {
    id: string;
    profilePicture: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    country: string;
    dateOfBirth: Date;
    levelOfEducation: string;
    fieldOfStudy: string;
}

export interface Scholarship {
    id: string;
    title: string;
    description: string;
    eligibility: string;
    deadline: Date;
    location: string;
    provider: string;
    startDate: Date;
    imageUrl: string;
    status: "approved";
}