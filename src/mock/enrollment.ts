import type { EnrollmentResponse } from "../type/enrollment";

export const mockEnrollments: EnrollmentResponse[] = [];

export const addEnrollment = (enrollment: EnrollmentResponse) => {
    mockEnrollments.push(enrollment);
};