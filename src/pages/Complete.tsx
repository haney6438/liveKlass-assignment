import { Link, useLocation } from "react-router-dom";

import './Complete.css';

import { MdOutlineCelebration, MdHorizontalRule } from "react-icons/md";

import { getCourses } from "../api/courseApi";

function Complete() {
    const location = useLocation();
    const { courseId, type, applicant, group, enrollmentId } = location.state;
    const findcourses = getCourses("all").courses;
    const userCourse = findcourses.find((course) =>
        course.id === courseId);
    return (
        <>
            <div className="container">
                <div className="sub-container">
                    <div className="notice-section">
                        <MdOutlineCelebration size={64} />
                        <p>신청되었습니다</p>
                        <p style={{ fontSize: '14px' }}>{enrollmentId}</p>
                        <MdHorizontalRule size={32} />
                    </div>
                    <div className="check-section2">
                        <div className="course-wrap">
                            <p style={{ fontSize: '16px', fontWeight: 'bold' }}>{userCourse?.title}</p>
                        </div>
                        <div className="indi-wrap">
                            <p style={{ fontSize: '14px', fontWeight: 'bold' }}>신청자</p>
                            <p>이름: {applicant?.name}</p>
                            <p>이메일: {applicant?.email}</p>
                            <p>전화번호: {applicant?.phone}</p>
                            <p>수강동기: {applicant?.motivation}</p>
                        </div>
                        <div className={type === 'group' ? 'group-wrap vi' : 'group-wrap'}>
                            <p style={{ fontSize: '14px', fontWeight: 'bold' }}>단체</p>
                            <p style={{ fontSize: '10px' }}>단체명: {group?.organizationName}</p>
                            <p style={{ fontSize: '10px' }}>신청 인원: {group?.headCount}</p>
                            <p style={{ fontSize: '10px' }}>참가자 명단: </p>
                            {group?.participants.map((participant: { name: string; email: string }, index: number) => (
                                <div key={index}>
                                    <p style={{ fontSize: '10px' }}>{participant.name} / {participant.email}</p>
                                </div>
                            ))}
                            <p style={{ fontSize: '10px' }}>담당자 연락처: {group?.contactPerson}</p>
                        </div>
                    </div>
                    <div className="content">
                        <p></p>
                    </div>
                    <Link to="/">확인 </Link>
                </div>
            </div>
        </>
    );
}

export default Complete;