// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GlobalProvider,GlobalContext } from './components/GlobalContext';
import Menu from './components/Menu';
import Home from './components/Home';
import UserLogin from './user/UserLogin';
import UserLogout from './user/UserLogout';
import UserSession from './user/UserSession';
import UserRegister from './user/UserRegister';
import UserProfile from './user/UserProfile';
import FindUserId from './user/FindUserId';
import ChatRoom from './chat/ChatRoom';
import TalentCateGrp from './talent/categrp/TalentCateGrp';
import TalentCategory from './talent/category/TalentCategory';
import TalentType from './talent/type/TalentType';
<<<<<<< HEAD
import Talent from './talent/post/Talent';
=======
import UnivCertPage from './user/UnivCertPage';
import ReviewPage from './review/ReviewPage';
>>>>>>> 49ee96a0445d501b4105cbe814237517a83e933e

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
          <Route path="/user/register" element={<UserRegister />} />  
          <Route path="/user/profile" element={<UserProfile />} />  
          <Route path="/user/findId" element={<FindUserId />} /> 
          <Route path="/user/univCert" element={<UnivCertPage />} /> 
          <Route path="/chat" element={<ChatRoom />} /> 
<<<<<<< HEAD
          <Route path="/talent/post" element={<Talent />} />

          <Route path="/talent/type" element={<TalentType />} />
          <Route path="/talent/category" element={<TalentCategory />} />
          <Route path="/talent/categrp" element={<TalentCateGrp />} />
=======
          <Route path="/talent/categrp" element={<TalentCateGrp />} /> 
          <Route path="/talent/category" element={<TalentCategory />} /> 
          <Route path="/talent/type" element={<TalentType />} /> 
          <Route path="/review/review" element={<ReviewPage />} /> 
>>>>>>> 49ee96a0445d501b4105cbe814237517a83e933e
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