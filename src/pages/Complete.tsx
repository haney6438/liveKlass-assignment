import { Link } from "react-router-dom"

import { MdOutlineCelebration, MdHorizontalRule } from "react-icons/md";

function Complete() {
    return (
        <>
            <div className="container">
                <div className="sub-container">
                    <div className="notice-section">
                        <MdOutlineCelebration size={64} />
                        <p>수강신청 되었습니다 </p>
                        <p>DI502JDF3</p>
                        <MdHorizontalRule size={64} />
                    </div>
                    <div className="check-section2">
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
                    <Link to="/">홈화면 </Link>
                </div>
            </div>
        </>
    );
}

export default Complete;