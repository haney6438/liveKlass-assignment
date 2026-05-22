import { Link } from "react-router-dom";

import Indicator from '../components/Indicator';

function Home() {
    return (
        <div>
            홈 화면
            <div>
                <Indicator/>
            </div>
            <div>
                <Link to="/step1">강의 선택 | </Link>
                <Link to="/step2">수강생 정보 입력 | </Link>
                <Link to="/step3">확인 및 제출</Link>
            </div>
        </div>
    );
}

export default Home;