import { mockCourses } from "../mock/course"; /*변수,함수,배열*/
import type { CourseListResponse } from "../type/course"; /*인터페이스 타입*/

export const getCourses = (category?: string): CourseListResponse => {
    const filtered = category && category !== "all"
        ? mockCourses.filter(c => c.category === category)
        : mockCourses;

    return {
        courses: filtered,
        categories: ["all", "development", "design", "marketing", "business"],
    };
};