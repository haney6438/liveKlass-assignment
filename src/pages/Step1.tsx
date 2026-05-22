import { useNavigate } from "react-router-dom";

import "./Step1.css";
import Header from "../components/Header";
import Indicator from "../components/Indicator";

import img1 from "../img/img1.png";
import { FaUser, FaUsers } from "react-icons/fa";

function Step1() {
    const navigate = useNavigate();

    return (
        <>
            <Header />
            <div className="container">
                <Indicator />
                <div className="content">
                    <p style={{ fontSize: '32px', fontWeight: 'bold' }}>강의 목록</p>
                    <div className="lec-page">
                        <span>수강할 강의를 선택하세요.</span>
                        <button>이전</button>
                        <button>다음</button>
                    </div>
                    <div className="lec-category">
                        <button>All</button>
                        <button>개발</button>
                        <button>디자인</button>
                        <button>마케팅</button>
                        <button>비즈니스</button>
                    </div>
                    <div className="lec-list">
                        <div className="lec">
                            <div className="lec-img-wrap">
                                <img
                                    className="lec-img"
                                    alt="img1"
                                    src={img1}
                                    onError={(e) => {
                                        e.currentTarget.style.display = 'none';
                                    }}
                                />
                            </div>
                            <p style={{ fontSize: '20px', fontWeight: 'bold' }}>Figma 8주 완성</p>
                            <p style={{ fontSize: '14px' }}>교육기간 | 26.05.22 ~ 26.07.10</p>
                            <p style={{ fontSize: '14px' }}>가격 | 18,000원</p>
                        </div>

                    </div>
                </div>
                <div className="content">
                    <p style={{ fontSize: '32px', fontWeight: 'bold' }}>선택한 강의</p>
                    <div className="info">
                        제목: 백엔드 개발 과정
                        가격: 25,000 원
                        일정: 2026.05.22 - 2026.06.22
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