import { addEnrollment } from "../mock/enrollment";
import type { PersonalEnrollmentRequest, GroupEnrollmentRequest, EnrollmentResponse } from "../type/enrollment";

type EnrollmentRequest = PersonalEnrollmentRequest | GroupEnrollmentRequest;

export const postEnrollment = (req: EnrollmentRequest): EnrollmentResponse => {
    const response: EnrollmentResponse = {
        enrollmentId: Math.random().toString(36).substring(2, 10).toUpperCase(),
        status: "confirmed",
        enrolledAt: new Date().toISOString(),
    };

    addEnrollment(response);
    return response;
};