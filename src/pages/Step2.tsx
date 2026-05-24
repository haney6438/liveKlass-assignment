import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import './Step2.css';
import Header from "../components/Header";
import Indicator from "../components/Indicator";

import { getCourses } from "../api/courseApi";
import type { Course } from "../type/course";
import { postEnrollment } from "../api/enrollmentApi";
import type { PersonalEnrollmentRequest, GroupEnrollmentRequest } from "../type/enrollment";

function Step2() {
    const navigate = useNavigate();
    const location = useLocation();

    const { courseId, type } = location.state;

    const findcourses = getCourses("all").courses;
    const userCourse = findcourses.find((course) =>
        course.id === courseId);

    // 신청자
    const [applicant, setApplicant] = useState<PersonalEnrollmentRequest['applicant']>({
        name: '',
        email: '',
        phone: '',
        motivation: ''
    });

    // 단체
    const [group, setGroup] = useState<GroupEnrollmentRequest['group']>({
        organizationName: '',
        headCount: 0,
        participants: [],
        contactPerson: ''
    });

    return (
        <>
            <Header />
            <Indicator />
            <div className="container">
                <div className="content">
                    <p style={{ fontSize: '32px', fontWeight: 'bold' }}>
                        {userCourse?.title}
                        <span> - {type === 'personal' ? '개인' : '단체'}</span></p>
                    <p style={{ fontSize: '14px' }}>(*)표시는 필수입력 사항입니다.</p>
                </div>

                <div className="content">
                    <p style={{ fontSize: '32px' }}>신청자</p>
                    <div className="input-section">
                        <label><span>*</span>이름 </label>
                        <div className="input">
                            <input className="name-input" type="text" value={applicant.name}
                                onChange={(e) => setApplicant(prev => ({ ...prev, name: e.target.value }))}
                                placeholder="이름을 입력하세요" />
                            <p>이름은 필수항목입니다</p>
                        </div></div>
                    <div className="input-section">
                        <label><span>*</span>이메일 </label>
                        <input type="email" placeholder="중복된 이메일 사용은 불가합니다" /></div>
                    <div className="input-section">
                        <label><span>*</span>전화번호 </label>
                        <input type="tel" placeholder="한국 전화번호 형식만 가능합니다" /></div>
                    <div className="input-section">
                        <label>수강 동기</label>
                        <textarea placeholder="수강 동기를 입력하세요 (최대 300자)" /></div>
                </div>

                <div className={type === 'group' ? 'content' : 'content invi'}>
                    <p style={{ fontSize: '32px' }}>단체 정보</p>
                    <div className="input-section">
                        <label><span>*</span>단체명 </label>
                        <div className="input">
                            <input className="name-input" type="text" placeholder="단체명을 입력하세요" />
                            <p>단체명은 필수항목입니다</p>
                        </div></div>

                    <div className="input-section">
                        <label><span>*</span>신청 인원수 </label>
                        <div className="counter">
                            <button>-</button>
                            <input type="number" placeholder="최대 10명" />
                            <button>+</button>
                        </div>
                    </div>

                    <div className="input-section">
                        <label><span>*</span>참가자 명단 </label>
                        <div className="group-section">
                            <div className="group-info">
                                <input type="text" placeholder="이름을 입력하세요" />
                                <input type="email" placeholder="중복된 이메일 사용은 불가합니다" /></div>
                            <div className="group-info">
                                <input type="text" placeholder="이름을 입력하세요" />
                                <input type="email" placeholder="중복된 이메일 사용은 불가합니다" /></div>
                        </div>
                    </div>

                    <div className="input-section">
                        <label><span>*</span>담당자 연락처 </label>
                        <input type="tel" placeholder="한국 전화번호 형식만 가능합니다" />
                    </div>
                </div>
                <div className="btn2-section">
                    <button onClick={() => navigate('/step1')}>이전</button>
                    <button onClick={() => navigate('/step3', {
                        state: {
                            courseId,
                            type,
                            applicant
                        }
                    })}>다음</button>
                </div>
            </div >
        </>
    );
}

export default Step2;