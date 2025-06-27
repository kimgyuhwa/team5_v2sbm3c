import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function UnivCertPage() {
  const [email, setEmail] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  // 1. 인증 메일 보내기
  const sendEmail = async () => {
    try {
      await axios.post("/user/univ/sendCode", {
        email,
        schoolName
      });
      alert("인증 메일이 발송되었습니다.");
      setStep(2);
    } catch (err) {
      alert("인증 메일 전송 실패");
    }
  };

  // 2. 인증번호 확인
  const verifyCode = async () => {
    try {
      const res = await axios.post("/user/univ/verifyCode", {
        email,
        schoolName,
        code: parseInt(code),
      });

      if (res.data.includes("성공")) {
        alert("인증 성공!");
        // 회원가입 페이지로 이동 + state에 이메일과 학교이름 전달
        navigate("/user/register", {
          state: {
            email,
            schoolName
          }
        });
      } else {
        alert("인증 실패");
      }
    } catch (err) {
      alert("인증 오류 발생");
    }
  };

  return (
    <div>
      <h2>대학교 인증</h2>
      <input
        placeholder="학교 이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="대학교 이름"
        value={schoolName}
        onChange={(e) => setSchoolName(e.target.value)}
      />
      {step === 1 ? (
        <button onClick={sendEmail}>인증 메일 보내기</button>
      ) : (
        <>
          <input
            placeholder="인증번호"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <button onClick={verifyCode}>인증 확인</button>
        </>
      )}
    </div>
  );
}

export default UnivCertPage;