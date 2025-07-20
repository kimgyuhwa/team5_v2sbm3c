import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { User, Mail, School, Shield, ArrowRight, Check } from "lucide-react";

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">대학교 인증</h1>
          <p className="text-gray-600">학교 이메일로 본인인증을 진행해주세요</p>
        </div>

        {/* 진행 단계 표시 */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
              step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-400'
            }`}>
              <Mail className="w-4 h-4" />
            </div>

            <div className={`h-1 w-12 ${step >= 1 ? 'bg-blue-600' : 'bg-gray-200'}`} />

            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
              step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-400'
            }`}>
              <User className="w-4 h-4" />
            </div>

            <div className={`h-1 w-12 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`} />

            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
              step >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-400'
            }`}>
              <Check className="w-4 h-4" />
            </div>
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-500">
            <span>이메일 전송</span>
            <span>인증 완료</span>
          </div>
        </div>

        {/* 메인 카드 */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="p-8">
            {step === 1 ? (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    학교 이메일
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      placeholder="example@university.ac.kr"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    대학교 이름
                  </label>
                  <div className="relative">
                    <School className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="홍익대학교"
                      value={schoolName}
                      onChange={(e) => setSchoolName(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    />
                  </div>
                </div>

                <button
                  onClick={sendEmail}
                  disabled={!email || !schoolName}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <span>인증 메일 보내기</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    인증 메일을 확인해주세요
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {email}로 인증번호가 발송되었습니다
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    인증번호
                  </label>
                  <input
                    type="text"
                    placeholder="6자리 인증번호를 입력하세요"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-center text-lg font-mono"
                  />
                </div>

                <button
                  onClick={verifyCode}
                  disabled={!code}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-indigo-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <Check className="w-4 h-4" />
                  <span>인증 확인</span>
                </button>

                <button
                  onClick={() => setStep(1)}
                  className="w-full text-gray-600 py-2 text-sm hover:text-gray-800 transition-colors"
                >
                  이메일 주소 변경하기
                </button>
              </div>
            )}
          </div>
        </div>


      </div>
    </div>
  );
}

export default UnivCertPage;