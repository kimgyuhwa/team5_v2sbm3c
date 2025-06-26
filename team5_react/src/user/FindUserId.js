import React, { useState } from 'react';
import '../App.css';

function FindUserId() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [code, setCode] = useState(''); // 사용자가 입력할 인증번호
  const [isCodeSent, setIsCodeSent] = useState(false); // 인증번호 발송 여부
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  // 1) 인증번호 발송
  const handleSendCode = async () => {
    setError(null);
    setResult(null);

    if (!username || !email) {
      alert('이름과 이메일을 입력하세요.');
      return;
    }

    try {
      const response = await fetch('/user/sendCode', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email }),
      });

      const data = await response.json();
      if (data.sw) {
        alert('이메일로 인증번호를 보냈습니다.');
        setIsCodeSent(true);
      } else {
        setError(data.msg || '인증번호 발송 실패');
      }
    } catch (err) {
      setError('네트워크 오류가 발생했습니다.');
    }
  };

  // 2) 인증번호 확인 & 아이디 찾기
  const handleVerifyCode = async () => {
    setError(null);

    if (!code) {
      alert('인증번호를 입력하세요.');
      return;
    }

    try {
      const response = await fetch('/user/verifyCode', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, code }),
      });

      const data = await response.json();
      if (data.sw) {
        setResult(data.userId);
      } else {
        setError(data.msg || '인증 실패');
      }
    } catch (err) {
      setError('네트워크 오류가 발생했습니다.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto' }}>
      <h2>아이디 찾기</h2>
      <div>
        <label>이름:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="이름 입력"
        />
      </div>
      <div>
        <label>이메일:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="이메일 입력"
        />
      </div>
      <button onClick={handleSendCode}>인증번호 받기</button>

      {isCodeSent && (
        <>
          <div style={{ marginTop: '10px' }}>
            <label>인증번호:</label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="인증번호 입력"
            />
          </div>
          <button onClick={handleVerifyCode}>인증번호 확인</button>
        </>
      )}

      {result && (
        <div style={{ marginTop: '20px', color: 'green' }}>
          찾으신 아이디: <b>{result}</b>
        </div>
      )}

      {error && (
        <div style={{ marginTop: '20px', color: 'red' }}>
          오류: {error}
        </div>
      )}
    </div>
  );
}

export default FindUserId;