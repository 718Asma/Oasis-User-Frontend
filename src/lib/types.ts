export interface Activity {
    id: string;
    action: string;
    scholarshipTitle: string;
    timestamp: string;
}

export interface Scholarship {
    id: string;
    title: string;
    description: string;
    eligibility: string;
    deadline: string;
    location: string;
    provider: string;
    startDate: string;
    imageUrl: string;
    status: "pending" | "approved" | "rejected";
}

export interface ScholarshipProps extends Scholarship {
    handleAction: (id: string, action: "approve" | "reject") => void;
}
