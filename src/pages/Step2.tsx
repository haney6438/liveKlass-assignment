import { useNavigate } from "react-router-dom";

import Header from "../components/Header";
import Indicator from "../components/Indicator";

function Step2() {
    const navigate = useNavigate();
    return (
        <>
            <Header />
            <Indicator />
            <div className="container">
                <div className="content">
                    <p style={{ fontSize: '32px', fontWeight: 'bold' }}>Figma 8주 완성</p>
                </div>
                <div className="content">
                    <p style={{ fontSize: '32px' }}>신청자</p>
                    <div className="input-section"></div>
                    <div className="input-section"></div>
                    <div className="input-section"></div>
                    <div className="input-section"></div>
                </div>
                <div className="content">
                    <p style={{ fontSize: '32px' }}>단체 정보</p>
                    <div className="input-section"></div>
                    <div className="input-section"></div>
                    <div className="input-section"></div>
                    <div className="input-section"></div>
                </div>
                    <div className="btn2-section">
                        <button onClick={() => navigate('/step1')}>이전</button>
                        <button onClick={() => navigate('/step3')}>다음</button>
                    </div>
            </div>
        </>
    );
}

export default Step2;