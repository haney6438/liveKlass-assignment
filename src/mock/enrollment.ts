import type { EnrollmentResponse } from "../type/enrollment";

export const mockEnrollments: EnrollmentResponse[] = [];

export const addEnrollment = (enrollment: EnrollmentResponse) => {
    mockEnrollments.push(enrollment);
};

// // 이미 신청된 강의 DUPLICATE_ENROLLMENT
// export const findEnrollmentByCourseId = (courseId: string) => {
//     return mockEnrollments.find(e => e.courseId === courseId);
// };