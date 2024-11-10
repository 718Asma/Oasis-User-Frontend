export interface Student {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    profilePicture: string;
    dateOfBirth: string;
    gender: string;
    country: string;
    university: string;
    courseOfStudy: string;
    levelOfStudy: string;
    fieldOfStudy: string;
    isVerified: boolean;
}

export interface Scholarship {
    _id: string;
    title: string;
    description: string;
    benefits: string[];
    deadline: string;
    criteria: string[];
    documents: string[];
    location: string;
    provider: string;
    url: string;
    status: "Approved";
}

export interface Notif {
    _id: string;
    scholarshipId: string;
    date: string;
    message: string;
    isRead: boolean;
}