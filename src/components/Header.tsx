import { Link } from "react-router-dom";

export default function Header() {
    return (
        
      <div
        style={{
            backgroundColor:'black',
            width: '100%',
            height: '8vh',
            display: 'flex',
            alignItems: 'flexstart'
        }}
      >
        <Link to ="/">라이브 클래스 FE-A</Link>
    </div>
    );
}
