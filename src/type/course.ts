export interface Course {
    id: string;
    title: string;
    description: string;
    category: string;       // "development" | "design" | "marketing" | "business"
    price: number;
    maxCapacity: number;
    currentEnrollment: number;
    startDate: string;      // ISO 8601
    endDate: string;        // ISO 8601
    instructor: string;
    image?:string; //이미지 추가
}

export interface CourseListResponse {
    courses: Course[];
    categories: string[];
}

