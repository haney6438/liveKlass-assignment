import { useNavigate } from "react-router-dom";

import Header from "../components/Header";
import Indicator from "../components/Indicator";

function Step2() {
    const navigate = useNavigate();
    return (
        <>
            <Header />
            <Indicator />
            <button onClick={() => navigate('/step3')}>다음</button>
        </>
    );
}

export default Step2;