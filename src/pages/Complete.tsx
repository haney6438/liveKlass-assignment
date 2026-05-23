import { Link } from "react-router-dom"

import './Complete.css';
import { MdOutlineCelebration, MdHorizontalRule } from "react-icons/md";

function Complete() {
    return (
        <>
            <div className="container">
                <div className="sub-container">
                    <div className="notice-section">
                        <MdOutlineCelebration size={64} />
                        <p>신청되었습니다</p>
                        <p style={{ fontSize: '14px' }}>DI502JDF3</p>
                        <MdHorizontalRule size={32} />
                    </div>
                    <div className="check-section2">
                        <div className="indi-wrap">
                            <p style={{ fontSize: '14px', fontWeight: 'bold' }}>신청자</p>
                            <p style={{ fontSize: '10px' }}>이름: </p>
                            <p style={{ fontSize: '10px' }}>이메일:</p>
                            <p style={{ fontSize: '10px' }}>전화번호: </p>
                            <p style={{ fontSize: '10px' }}>수강동기:</p>
                        </div>
                        <div className="group-wrap">
                            <p style={{ fontSize: '14px', fontWeight: 'bold' }}>단체</p>
                            <p style={{ fontSize: '10px' }}>단체명: </p>
                            <p style={{ fontSize: '10px' }}>신청 인원:</p>
                            <p style={{ fontSize: '10px' }}>참가자 명단: </p>
                        </div>
                    </div>
                    <Link to="/">확인 </Link>
                </div>
            </div>
        </>
    );
}

export default Complete;