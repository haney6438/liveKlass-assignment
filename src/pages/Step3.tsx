import { Link } from "react-router-dom"

import './Step3.css';
import Header from "../components/Header";
import Indicator from "../components/Indicator";
// import Terms from "../components/Terms";

import img1 from "../img/img1.png";

function Step3() {
    return (
        <>
            <Header />
            <Indicator />
            <div className="container">
                <div className="content">
                    <div className="check-section1">
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
                        <div className="indi-wrap">

                        </div>
                        <div className="group-wrap">

                        </div>
                    </div>
                </div>
                <div className="content">

                </div>
                <div className="content">
                    <Link to="/complete"> 제출 </Link>
                </div>
            </div>
        </>
    );
}

export default Step3;