import React, { createContext, useState, useEffect } from 'react'

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  const [sw, setSw] = useState(false);         // 로그인 여부
  const [userno, setUserno] = useState(0);     // 사용자 고유번호
  const [loginUser, setLoginUser] = useState(null); // 로그인한 유저 정보 (객체)

  useEffect(() => {
    fetch('/user/session', {
      method: 'GET',
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        if (data.sw && data.user) {
          setSw(true);
          setUserno(data.user.userno);
          setLoginUser(data.user);
          localStorage.setItem('loginUser', JSON.stringify(data.user)); // 선택
        } else {
          setSw(false);
          setUserno(0);
          setLoginUser(null);
        }
      })
      .catch(err => {
        console.error('세션 확인 실패:', err);
      });
  }, []);

  return (
    <GlobalContext.Provider value={{ sw, setSw, userno, setUserno, loginUser, setLoginUser }}>
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalContext, GlobalProvider };
