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
          <pre>{`제 1 조 [목적]
본 약관은 라이브클래스 수강 신청 서비스 이용과 관련하여 필요한 사항을 규정합니다.

제 2 조 [수강 신청]
수강생은 강의 선택 후 신청 정보를 입력하여 수강 신청을 완료할 수 있습니다.
개인 신청과 단체 신청(2~10명)이 가능합니다.

제 3 조 [개인정보 수집]
수강 신청 시 이름, 이메일, 전화번호를 수집하며 신청 처리 목적으로만 사용합니다.

제 4 조 [신청 취소]
수강 신청 완료 후 취소는 고객센터를 통해 문의하시기 바랍니다.`}
          </pre>
        </div>
      </div>
    </div>
    );
}
