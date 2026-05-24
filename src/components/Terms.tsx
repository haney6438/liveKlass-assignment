import { HiXMark } from 'react-icons/hi2';
import "./Terms.css";
interface TermsProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function Terms({ isOpen, onClose }: TermsProps) {
    if (!isOpen) return null;

    return (
    <div onClick={onClose} className="terms-overlay">
      <div onClick={(e) => e.stopPropagation()} className="t-modal">
        <div className="b-modal-inner">
          <HiXMark onClick={onClose} className="t-modal-close"></HiXMark>
          <p>이용약관</p>
          <p>동의하지 않으면 해당 서비스에 제출할 수 없습니다.</p>
        </div>
      </div>
    </div>
    );
}
