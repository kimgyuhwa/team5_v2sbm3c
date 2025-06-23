// src/components/GlobalContext.js
import React, { createContext, useState ,useEffect } from 'react';

// Context 생성
const GlobalContext = createContext();

// Provider 정의
const GlobalProvider = ({ children }) => {
  const [sw, setSw] = useState(false);         // 로그인 여부
  const [userno, setUserno] = useState(0);     // 로그인한 사용자 고유번호

  
  // ✅ 페이지 로드 시 sessionStorage 확인
  useEffect(() => {
    const savedSw = sessionStorage.getItem('sw') === 'true';
    const savedUserno = parseInt(sessionStorage.getItem('userno') || '0');

    setSw(savedSw);
    setUserno(savedUserno);

    // ✅ 서버 세션도 검사해서 싱크 맞추기
    fetch(`/user/session`, { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        if (data.sw) {
          setSw(true);
          setUserno(data.userno);
          sessionStorage.setItem('sw', 'true');
          sessionStorage.setItem('userno', data.userno);
        } else {
          setSw(false);
          setUserno(0);
          sessionStorage.removeItem('sw');
          sessionStorage.removeItem('userno');
        }
      })
      .catch(err => console.error(err));
  }, []);


  return (
    <GlobalContext.Provider value={{ sw, setSw, userno, setUserno }}>
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalContext, GlobalProvider };