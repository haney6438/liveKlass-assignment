import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import './Step3.css';
import Header from "../components/Header";
import Indicator from "../components/Indicator";
import Terms from "../components/Terms";

import { IoIosArrowForward } from "react-icons/io";

import { getCourses } from "../api/courseApi";
import { postEnrollment } from "../api/enrollmentApi";

function Step3() {
    const navigate = useNavigate();
    const location = useLocation();

    const { courseId, type, applicant, group } = location.state;

    const findcourses = getCourses("all").courses;
    const userCourse = findcourses.find((course) =>
        course.id === courseId);
    const [open, setOpen] = useState(false);

    //유효성 검증
    const [agree, setAgree] = useState(false);
    const [termsViewed, setTermsViewed] = useState(false);

    return (
        <>
            <Header />
            <Indicator />
            <div className="container">
                <div className="content">
                    <div className="check-section1">
                        <div className="edit" onClick={() => navigate('/step1')}>
                            수정
                        </div>
                        <div className="img-wrap">
                            {userCourse?.image && (
                                <img
                                    className="course-img"
                                    alt={userCourse?.title}
                                    src={userCourse?.image}
                                    onError={(e) => {
                                        e.currentTarget.style.display = 'none';
                                    }}
                                />
                            )}
                        </div>
                        <div className="info-wrap">
                            <p>강의명: {userCourse?.title}</p>
                            <p>교육기간: {userCourse?.startDate} ~ {userCourse?.endDate}</p>
                            <p>가격: {userCourse?.price.toLocaleString()}원</p>
                            <p>남은 인원: {userCourse?.currentEnrollment}/{userCourse?.maxCapacity}</p>
                            <p>강사: {userCourse?.instructor}</p>
                        </div>
                    </div>

                    <div className="check-section2">
                        <div className="edit" onClick={() => navigate('/step2')}>
                            수정
                        </div>
                        <div className="indi-wrap">
                            <p style={{ fontSize: '20px', fontWeight: 'bold' }}>신청자</p>
                            <p style={{ fontSize: '14px' }}>이름: {applicant?.name}</p>
                            <p style={{ fontSize: '14px' }}>이메일:{applicant?.email}</p>
                            <p style={{ fontSize: '14px' }}>전화번호: {applicant?.phone}</p>
                            <p style={{ fontSize: '14px' }}>수강동기:{applicant?.motivation}</p>
                        </div>
                        <div className={type === 'group' ? 'group-wrap vi' : 'group-wrap'}>
                            <p style={{ fontSize: '20px', fontWeight: 'bold' }}>단체</p>
                            <p style={{ fontSize: '14px' }}>단체명: {group?.organizationName}</p>
                            <p style={{ fontSize: '14px' }}>신청 인원: {group?.headCount}</p>
                            <p style={{ fontSize: '14px' }}>참가자 명단: </p>
                            {group?.participants.map((participant: { name: string; email: string }, index: number) => (
                                <div key={index}>
                                    <p style={{ fontSize: '14px' }}>{participant.name} | {participant.email}</p>
                                </div>
                            ))}
                            <p style={{ fontSize: '14px' }}>담당자 연락처: {group?.contactPerson}</p>
                        </div>
                    </div>
                </div>
                <div className="terms-section">
                    <div className="terms" onClick={() => { setOpen(true); setTermsViewed(true); }}>
                        <p style={{ fontSize: '14px' }}>이용약관(필수)</p>
                        <IoIosArrowForward size={14} />
                    </div>
                    <Terms isOpen={open} onClose={() => setOpen(false)} />
                    <input
                        type="checkbox"
                        checked={agree}
                        disabled={!termsViewed}
                        onChange={(e) => setAgree(e.target.checked)}
                    />
                </div>
                <div className="submit-section">
                    <button className='btn-next' onClick={() => {
                        if (!agree) {
                            alert('이용약관에 동의해주세요.');
                            return;
                        }
                        const response = postEnrollment(
                            type === 'group'
                                ? { courseId, type, applicant, group, agreedToTerms: true }
                                : { courseId, type, applicant, agreedToTerms: true }
                        );

                        if ('code' in response) {
                            alert(response.message);
                            return;
                        }
                        navigate('/complete', {
                            state: {
                                courseId,
                                type,
                                applicant,
                                group,
                                enrollmentId: response.enrollmentId
                            }
                        });
                    }}>제출</button>

                </div>
            </div>
        </>
    );
}

export default Step3;