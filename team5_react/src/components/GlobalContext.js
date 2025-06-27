import React, { createContext, useState } from 'react';

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  const [sw, setSw] = useState(false);         // 로그인 여부
  const [userno, setUserno] = useState(0);     // 사용자 고유번호
  const [loginUser, setLoginUser] = useState(null); // 로그인한 유저 정보 (객체)

  return (
    <GlobalContext.Provider value={{ sw, setSw, userno, setUserno, loginUser, setLoginUser }}>
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalContext, GlobalProvider };
