import { Link } from "react-router-dom"

import Header from "../components/Header";
import Indicator from "../components/Indicator";

function Step3() {
    return (
        <>
            <Header />
            <Indicator />
            <Link to="/complete"> 제출 </Link>
        </>
    );
}

export default Step3;