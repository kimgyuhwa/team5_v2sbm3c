// src/components/GlobalContext.js
import React, { createContext, useState } from 'react';

// Context 생성
const GlobalContext = createContext();

// Provider 정의
const GlobalProvider = ({ children }) => {
  const [sw, setSw] = useState(false);         // 로그인 여부
  const [userno, setUserno] = useState(0);     // 로그인한 사용자 고유번호

  return (
    <GlobalContext.Provider value={{ sw, setSw, userno, setUserno }}>
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalContext, GlobalProvider };