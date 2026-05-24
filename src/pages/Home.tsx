import { Link } from "react-router-dom";

function Home() {
    return (
        <div>
            라이브 클래스 FE-A
            <Link to="/step1">강의 보러가기</Link>
        </div>
    );
}

export default Home;