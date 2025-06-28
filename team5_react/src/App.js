// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GlobalProvider,GlobalContext } from './components/GlobalContext';
import Menu from './components/Menu';
import Home from './components/Home';
import UserLogin from './user/UserLogin';
import UserLogout from './user/UserLogout';
import UserSession from './user/UserSession';

function App() {
  return (
     <GlobalProvider>
    <div className="App">
      <BrowserRouter>
        <Menu />
        <hr />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user/login" element={<UserLogin />} />
          <Route path="/user/logout" element={<UserLogout />} />
          <Route path="/user/session" element={<UserSession />} />  
        </Routes>
        <hr />
        <div style={{ textAlign: 'center', margin: '20px 0' }}>
          &copy; 2025 My User System
        </div>
      </BrowserRouter>
    </div>
    </GlobalProvider>
  );
}

export default App;