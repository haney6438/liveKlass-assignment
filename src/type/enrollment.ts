// 개인 신청
export interface PersonalEnrollmentRequest {
    courseId: string;
    type: "personal";
    applicant: {
        name: string;
        email: string;
        phone: string;
        motivation?: string;
    };
    agreedToTerms: boolean;
}

// 단체 신청
export interface GroupEnrollmentRequest {
    courseId: string;
    type: "group";
    applicant: {
        name: string;
        email: string;
        phone: string;
        motivation?: string;
    };
    group: {
        organizationName: string;
        headCount: number;
        participants: Array<{ name: string; email: string }>;
        contactPerson: string;
    };
    agreedToTerms: boolean;
}

export interface EnrollmentResponse {
    enrollmentId: string;
    status: "confirmed" | "pending";
    enrolledAt: string;
}