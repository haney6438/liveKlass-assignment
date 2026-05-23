import { Link, useNavigate } from "react-router-dom"

import './Step3.css';
import Header from "../components/Header";
import Indicator from "../components/Indicator";
// import Terms from "../components/Terms";

import { IoIosArrowForward } from "react-icons/io";
import img1 from "../img/img1.png";

function Step3() {
    const navigate=useNavigate();

    return (
        <>
            <Header />
            <Indicator />
            <div className="container">
                <div className="content">
                    <div className="check-section1">
                        <div className="edit" onClick={()=>navigate('/step1')}>
                            수정
                        </div>
                        <div className="img-wrap">
                            <div className="lec-remain">
                                🔥마감임박
                            </div>
                            <img
                                className="lec-img"
                                alt="img1"
                                src={img1}
                                onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                }}
                            />
                        </div>
                        <div className="info-wrap">
                            <p style={{ fontSize: '20px', fontWeight: 'bold' }}>Figma 8주 완성</p>
                            <p style={{ fontSize: '14px' }}>교육기간 | 26.05.22 ~ 26.07.10</p>
                            <p style={{ fontSize: '14px' }}>가격 | 18,000원</p>
                        </div>
                    </div>

                    <div className="check-section2">
                        <div className="edit" onClick={()=>navigate('/step2')}>
                            수정
                        </div>
                        <div className="indi-wrap">
                            <p style={{ fontSize: '20px', fontWeight: 'bold' }}>신청자</p>
                            <p style={{ fontSize: '14px' }}>이름: </p>
                            <p style={{ fontSize: '14px' }}>이메일:</p>
                            <p style={{ fontSize: '14px' }}>전화번호: </p>
                            <p style={{ fontSize: '14px' }}>수강동기:</p>
                        </div>
                        <div className="group-wrap">
                            <p style={{ fontSize: '20px', fontWeight: 'bold' }}>단체</p>
                            <p style={{ fontSize: '14px' }}>단체명: </p>
                            <p style={{ fontSize: '14px' }}>신청 인원:</p>
                            <p style={{ fontSize: '14px' }}>참가자 명단: </p>
                        </div>
                    </div>
                </div>
                <div className="terms-section">
                    <div className="terms">
                        <p style={{ fontSize: '14px' }}>이용약관(필수)</p>
                        <IoIosArrowForward size={14} />
                    </div>
                    <input type="checkbox" />
                </div>
                <div className="submit-section">
                    <button onClick={() => navigate('/complete')}>제출</button>

                </div>
            </div>
        </>
    );
}

export default Step3;