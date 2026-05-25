import { addEnrollment } from "../mock/enrollment";
import { mockCourses } from "../mock/course";
import type { PersonalEnrollmentRequest, GroupEnrollmentRequest, EnrollmentResponse } from "../type/enrollment";
import type { ErrorResponse } from "../type/error";

type EnrollmentRequest = PersonalEnrollmentRequest | GroupEnrollmentRequest;

export const postEnrollment = (req: EnrollmentRequest): EnrollmentResponse | ErrorResponse => {
    const response: EnrollmentResponse = {
        enrollmentId: Math.random().toString(36).substring(2, 10).toUpperCase(),
        status: "confirmed",
        enrolledAt: new Date().toISOString(),
    };
    // 정원 초과
    const full = mockCourses.find(c => c.id === req.courseId);
    if (full && full.currentEnrollment >= full.maxCapacity) {
        return {
            code: 'COURSE_FULL',
            message: '정원이 초과되었습니다.'
        };
    }
    // // 이미 신청된 강의 DUPLICATE_ENROLLMENT
    // const duplicate = mockCourses.find(e => e.courseId === req.courseId);
    // if (duplicate){
    //     return {
    //         code: 'DUPLICATE_ENROLLMENT',
    //         message: '이미 신청된 강의입니다.'
    //     }
    // }

    // 입력값 오류 INVALID_INPUT (신청자)
    if (!req.applicant.name || !req.applicant.email || !req.applicant.phone) {
        return {
            code: 'INVALID_INPUT',
            message: '입력값이 올바르지 않습니다.',
            details: {
                name: !req.applicant.name ? '이름은 필수항목입니다.' : '',
                email: !req.applicant.email ? '이메일은 필수항목입니다.' : '',
                phone: !req.applicant.phone ? '전화번호는 필수항목입니다.' : '',
            }
        };
    }
    // 입력값 오류 INVALID_INPUT (단체)
    if (req.type === 'group' && (!req.group.organizationName || !req.group.contactPerson)) {
        return {
            code: 'INVALID_INPUT',
            message: '입력값이 올바르지 않습니다.',
            details: {
                organizationName: !req.group.organizationName ? '단체명은 필수항목입니다.' : '',
                participants: !req.group.participants ? '참가자 입력은 필수항목입니다.' : '',
                contactPerson: !req.group.contactPerson ? '담당자 연락처는 필수항목입니다.' : '',
            }
        };
    }

    addEnrollment(response);
    return response;
};