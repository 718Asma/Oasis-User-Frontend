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
    location: string;
    provider: string;
    value: number;
    deadline: string;
    banner: string;
    description: string;
    applicationStartDate: Date;
    country: string;
    minAge: number;
    levelOfEducation: string;
    fieldOfStudy: string;
}
