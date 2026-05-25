import { useLocation } from "react-router-dom";
import { BsCircle, BsCircleFill, BsCheckCircle, BsDashLg } from "react-icons/bs";
import './Indicator.css';

function Indicator() {
    const location = useLocation();

    const titleMap: Record<string, string> = {
        '/step1': '강의 선택',
        '/step2': '정보 입력',
        '/step3': '신청 정보 확인',
    };
    const title = titleMap[location.pathname] ?? '강의 선택';

    const stepMap: Record<string, number> = {
        '/step1': 1,
        '/step2': 2,
        '/step3': 3,
    };
    const step = stepMap[location.pathname] ?? '1';

    return (
        <>
            <div className="indicator">
                <div className="title-section">
                    <p style={{ fontSize: '28px' }}>{title}</p>
                </div>
                <div className="step-section">
                    {step > 1 ? <BsCheckCircle size={20} color="var(--lk-purple-light)"/> : <BsCircleFill size={20} color="var(--lk-purple)" />}
                    <BsDashLg size={20} color="var(--gray3)"/>
                    {step > 2 ? <BsCheckCircle size={20} color="var(--lk-blue)"/> : 
                    step === 2 ? <BsCircleFill size={20} color="var(--lk-blue)"/> : <BsCircle size={20} color="var(--lk-blue)"/>}
                    <BsDashLg size={20} color="var(--gray3)"/>
                    {step === 3 ? <BsCircleFill size={20} color="var(--lk-green)"/> : <BsCircle size={20} color="var(--lk-green)"/>}
                </div>

            </div>
        </>
    )
}

export default Indicator;