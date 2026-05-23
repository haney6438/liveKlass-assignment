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

    useEffect(() => {
        const result = getCourses(category);
        setCourses(result.courses);
    }, [category]);

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
                        <button onClick={()=>setCategory("all")}>All</button>
                        <button onClick={()=>setCategory("development")}>개발</button>
                        <button onClick={()=>setCategory("design")}>디자인</button>
                        <button onClick={()=>setCategory("marketing")}>마케팅</button>
                        <button onClick={()=>setCategory("business")}>비즈니스</button>
                    </div>
                    <div className="course-list">
                        {courses.map((course)=>(
                        <div className="course" key={course.id}>
                            <div className="course-img-wrap">
                                <div className="course-badge">
                                    🔥마감임박
                                </div>
                                {course.image&&(
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
                    <div className="info">
                            {/* <p>강의명: {course.title}</p>
                            <p>교육기간: {course.startDate} ~ {course.endDate}</p>
                            <p>가격: {course.price.toLocaleString()}원</p>
                            <p>남은 인원: {course.currentEnrollment}/{course.maxCapacity}</p>
                            <p>강사: {course.instructor}</p> */}
                    </div>
                </div>
                <div className="content">
                    <p style={{ fontSize: '32px', fontWeight: 'bold' }}>신청 유형</p>
                    <div className="type-section">
                        <div className="type">
                            <FaUser size={32} />
                            <p style={{ fontSize: '14px' }}> 개인 신청</p>
                        </div>
                        <div className="type">
                            <FaUsers size={32} />
                            <p style={{ fontSize: '14px' }}> 단체 신청</p>
                        </div>

                    </div>
                </div>
                <div className="btn-section">
                    <button onClick={() => navigate('/step2')}>다음</button>
                </div>
            </div></>
    );
}

export default Step1;