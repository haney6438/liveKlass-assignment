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
        headCount: 2,
        participants: [{ name: '', email: '' }, { name: '', email: '' }],
        contactPerson: ''
    });

    //명단 생성 
    const handleAddPerson = () => {
        if (group.headCount >= 10) return;
        setGroup(prev => ({
            ...prev,
            headCount: prev.headCount + 1,
            participants: [...prev.participants, { name: '', email: '' }]
        }));
    };
    const handleRemovePerson = () => {
        if (group.headCount <= 2) return;
        setGroup(prev => ({
            ...prev,
            headCount: prev.headCount - 1,
            participants: prev.participants.slice(0, -1)
        }));
    };

    //유효성 검증
    const [errors, setErrors] = useState({
        name: '',
        email: '',
        phone: '',
        organizationName: '',
        contactPerson: '',
    });
    const [participantErrors, setParticipantErrors] = useState<{
        name: string;
        email: string
    }[]>(group.participants.map(() => ({ name: '', email: '' }))
    );

    const handleValidate = () => {
        const nameError = validateName(applicant.name);
        const emailError = validateEmail(applicant.email);
        const phoneError = validatePhone(applicant.phone);
        //단체
        const organizationNameError = type === 'group' ? validateName(group.organizationName) : '';
        const contactPersonError = type === 'group' ? validatePhone(group.contactPerson) : '';
        //참가자 명단
        const participantErrs = group.participants.map((p) => ({
            name: type === 'group' ? validateName(p.name) : '',
            email: type === 'group' ? validateEmail(p.email) : '',
        }));
        setParticipantErrors(participantErrs);
        const hasParticipantError = participantErrs.some(p => p.name || p.email);

        setErrors({
            name: nameError,
            email: emailError,
            phone: phoneError,
            organizationName: organizationNameError,
            contactPerson: contactPersonError,
        });


        if (nameError || emailError || phoneError || organizationNameError || contactPersonError || hasParticipantError) {
            const firstErrorField = nameError ? 'name'
                : emailError ? 'email'
                    : phoneError ? 'phone'
                        : organizationNameError ? 'organizationName'
                            : 'contactPerson';

            document.getElementById(firstErrorField)?.focus();

            alert('입력한 정보를 다시 확인해주세요.');

            return false;
        }

        return true;
    };
    //이름
    const validateName = (name: string) => {
        if (!name.trim()) {
            return '필수항목입니다.';
        }

        if (name.trim().length < 2) {
            return '이름은 2글자 이상이어야 합니다.';
        }

        return '';
    };
    //이메일
    const validateEmail = (email: string) => {
        if (!email.trim()) {
            return '이메일은 필수항목입니다.';
        }

        const emailRegex = /^[^\s@]{1,64}@[^\s@]+\.[^\s@]{2,}$/;
        if (!emailRegex.test(email) || email.length > 320) {
            return '올바른 이메일 형식이 아닙니다.';
        }

        return '';
    };
    //전화번호
    const validatePhone = (phone: string) => {
        if (!phone.trim()) {
            return '필수항목입니다.';
        }

        const phoneRegex = /^0\d{1,2}-?\d{3,4}-?\d{4}$/;
        if (!phoneRegex.test(phone)) {
            return '올바른 전화번호 형식이 아닙니다.';
        }

        return '';
    };

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
                            <input
                                id="name"
                                className={errors.name ? 'short-input error' : 'short-input'}
                                type="text"
                                value={applicant.name}
                                onChange={(e) => setApplicant(prev => ({ ...prev, name: e.target.value }))}
                                onBlur={() => setErrors(prev => ({ ...prev, name: validateName(applicant.name) }))}
                                placeholder="이름을 입력하세요"
                            />
                            {errors.name && (
                                <p>{errors.name}</p>
                            )}
                        </div>
                    </div>

                    <div className="input-section">
                        <label><span>*</span>이메일 </label>
                        <div className="input">
                            <input
                                id="email"
                                name='perM'
                                className={errors.email ? 'long-input error' : 'long-input'}
                                type="text"
                                value={applicant.email}
                                onChange={(e) => setApplicant(prev => ({ ...prev, email: e.target.value }))}
                                onBlur={() => setErrors(prev => ({ ...prev, email: validateEmail(applicant.email) }))}
                                placeholder="중복된 이메일 사용은 불가합니다"
                            />
                            {errors.email && (
                                <p>{errors.email}</p>
                            )}
                        </div>
                    </div>

                    <div className="input-section">
                        <label><span>*</span>전화번호 </label>
                        <div className="input">
                            <input
                                id="phone"
                                className={errors.phone ? 'long-input error' : 'long-input'}
                                type="text"
                                value={applicant.phone}
                                onChange={(e) => setApplicant(prev => ({ ...prev, phone: e.target.value }))}
                                onBlur={() => setErrors(prev => ({ ...prev, phone: validatePhone(applicant.phone) }))}
                                placeholder="한국 전화번호 형식만 가능합니다"
                            />
                            {errors.phone && (
                                <p>{errors.phone}</p>
                            )}
                        </div>
                    </div>

                    <div className="input-section">
                        <label>수강 동기</label>
                        <div className="input">
                            <textarea value={applicant.motivation}
                                onChange={(e) => setApplicant(prev => ({ ...prev, motivation: e.target.value }))}
                                placeholder="수강 동기를 입력하세요 (최대 300자)" />
                            <p style={{ fontSize: '10px', color: applicant.motivation && applicant.motivation.length >= 300 ? 'red' : 'gray' }}>
                                {applicant.motivation?.length ?? 0}/300
                            </p>
                        </div>
                    </div>
                </div>

                <div className={type === 'group' ? 'content' : 'content invi'}>
                    <p style={{ fontSize: '32px' }}>단체 정보</p>
                    <div className="input-section">
                        <label><span>*</span>단체명 </label>
                        <div className="input">
                            <input
                                id="organizationName"
                                className={errors.organizationName ? 'short-input error' : 'short-input'}
                                type="text"
                                value={group.organizationName}
                                onChange={(e) => setGroup(prev => ({ ...prev, organizationName: e.target.value }))}
                                onBlur={() => setErrors(prev => ({ ...prev, organizationName: validateName(group.organizationName) }))}
                                placeholder="단체명을 입력하세요"
                            />
                            {errors.organizationName && (
                                <p>{errors.organizationName}</p>
                            )}
                        </div>
                    </div>

                    <div className="input-section">
                        <label><span>*</span>신청 인원수 </label>
                        <div className="counter">
                            <button onClick={handleRemovePerson}>-</button>
                            <input type="number" value={group.headCount} placeholder="최대 10명" />
                            <button onClick={handleAddPerson}>+</button>
                        </div>
                    </div>

                    <div className="input-section">
                        <label><span>*</span>참가자 명단 </label><div className="group-section">
                            {group.participants.map((participant, index) => (
                                <div className="group-info" key={index}>
                                    <input
                                        className={participantErrors[index]?.name ? 'n-input error' : 'n-input'}
                                        type="text"
                                        value={participant.name}
                                        onChange={(e) => {
                                            const updated = [...group.participants];
                                            updated[index] = { ...updated[index], name: e.target.value };
                                            setGroup(prev => ({ ...prev, participants: updated }));
                                        }}
                                        onBlur={() => {
                                            const updated = [...participantErrors];
                                            updated[index] = { ...updated[index], name: validateName(participant.name) };
                                            setParticipantErrors(updated);
                                        }}
                                        placeholder="이름을 입력하세요"
                                    />
                                    <input
                                        name='groupM'
                                        className={participantErrors[index]?.email ? 'e-input error' : 'e-input'}
                                        type="email"
                                        value={participant.email}
                                        placeholder="중복된 이메일 사용은 불가합니다"
                                        onChange={(e) => {
                                            const updated = [...group.participants];
                                            updated[index] = { ...updated[index], email: e.target.value };
                                            setGroup(prev => ({ ...prev, participants: updated }));
                                        }}
                                        onBlur={() => {
                                            const updated = [...participantErrors];
                                            updated[index] = { ...updated[index], email: validateEmail(participant.email) };
                                            setParticipantErrors(updated);
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="input-section">
                        <label><span>*</span>담당자 연락처 </label>
                        <div className="input">
                            <input
                                id="contactPerson"
                                className={errors.contactPerson ? 'long-input error' : 'long-input'}
                                type="text"
                                value={group.contactPerson}
                                onChange={(e) => setGroup(prev => ({ ...prev, contactPerson: e.target.value }))}
                                onBlur={() => setErrors(prev => ({ ...prev, contactPerson: validatePhone(group.contactPerson) }))}
                                placeholder="한국 전화번호 형식만 가능합니다"
                            />
                            {errors.contactPerson && (
                                <p>{errors.contactPerson}</p>
                            )}
                        </div>
                    </div>
                </div>
                <div className="btn2-section">
                    <button onClick={() => navigate('/step1')}>이전</button>
                    <button
                        onClick={() => {
                            const isValid = handleValidate();

                            if (!isValid) return;

                            navigate('/step3', {
                                state: {
                                    courseId,
                                    type,
                                    applicant,
                                    group
                                }
                            });
                        }}
                    >
                        다음
                    </button>
                </div>
            </div >
        </>
    );
}

export default Step2;