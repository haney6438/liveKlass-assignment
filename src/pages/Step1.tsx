import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./Step1.css";
import Header from "../components/Header";
import Indicator from "../components/Indicator";

import { FaUser, FaUsers } from "react-icons/fa";
import { getCourses } from "../api/courseApi";
import type { Course } from "../type/course";

function Step1() {
    const navigate = useNavigate();

    const [courses, setCourses] = useState<Course[]>([]);
    const [category, setCategory] = useState<string>("all");

    const [userCourse, setUserCourse] = useState<string | null>(null);
    const [userType, setUserType] = useState<'personal' | 'group'>();

    const filteredCourses = courses.filter((course) =>
        category === "all" ? true : course.category === category);
    const selectedCourse = courses.find((course) =>
        course.id === userCourse);

    useEffect(() => {
        const result = getCourses("all");
        setCourses(result.courses);
    }, []);

    return (
        <>
            <Header />
            <Indicator />
            <div className="container">
                <div className="content">
                    <p style={{ fontSize: '32px', fontWeight: 'bold' }}>강의 목록</p>
                    <div className="course-page">
                        <span>수강할 강의를 선택하세요.</span>
                    </div>
                    <div className="course-category">
                        <button onClick={() => setCategory("all")}>All</button>
                        <button onClick={() => setCategory("development")}>개발</button>
                        <button onClick={() => setCategory("design")}>디자인</button>
                        <button onClick={() => setCategory("marketing")}>마케팅</button>
                        <button onClick={() => setCategory("business")}>비즈니스</button>
                    </div>
                    <div className="course-list">
                        {filteredCourses.map((course) => (
                            <div className={userCourse === course.id ? 'course selected' : 'course'} key={course.id}
                                onClick={() => setUserCourse(course.id)}>
                                <div className="course-img-wrap">
                                    <div className={course.currentEnrollment/course.maxCapacity>=0.8? 
                                        'course-badge vi':'course-badge'}>
                                        🔥마감임박
                                    </div>
                                    {course.image && (
                                        <img
                                            className="course-img"
                                            alt={course.title}
                                            src={course.image}
                                            onError={(e) => {
                                                e.currentTarget.style.display = 'none';
                                            }}
                                        />
                                    )}
                                </div>
                                <p style={{ fontSize: '20px', fontWeight: 'bold' }}>{course.title}</p>
                                <p style={{ fontSize: '14px' }}>교육기간 | {course.startDate} ~ {course.endDate}</p>
                                <p style={{ fontSize: '14px' }}>가격 | {course.price.toLocaleString()}원</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="content">
                    <p style={{ fontSize: '32px', fontWeight: 'bold' }}>선택한 강의</p>
                    {selectedCourse ? (
                        <div className="info">
                            <p>강의명: {selectedCourse.title}</p>
                            <p>교육기간: {selectedCourse.startDate} ~ {selectedCourse.endDate}</p>
                            <p>가격: {selectedCourse.price.toLocaleString()}원</p>
                            <p>남은 인원: {selectedCourse.currentEnrollment}/{selectedCourse.maxCapacity}</p>
                            <p>강사: {selectedCourse.instructor}</p>
                        </div>
                    ) : (
                        <div className="info" />
                    )}
                </div>
                <div className="content">
                    <p style={{ fontSize: '32px', fontWeight: 'bold' }}>신청 유형</p>
                    <div className="type-section">
                        <div className={userType === 'personal' ? 'type selected' : 'type'}
                            onClick={() => setUserType('personal')}
                        >
                            <FaUser size={32} />
                            <p style={{ fontSize: '14px' }}> 개인 신청</p>
                        </div>
                        <div className={userType === 'group' ? 'type selected' : 'type'}
                            onClick={() => setUserType('group')}
                        >
                            <FaUsers size={32} />
                            <p style={{ fontSize: '14px' }}> 단체 신청</p>
                        </div>

                    </div>
                </div>
                <button onClick={() => navigate('/step2', {
                    state: {
                        courseId: userCourse,
                        type: userType
                    }
                })}>다음</button>
            </div>
        </>
    );
}

export default Step1;