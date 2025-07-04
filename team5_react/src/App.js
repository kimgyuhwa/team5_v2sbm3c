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
import FindUserPwd from './user/FindUserPwd';
import ChatRoom from './chat/ChatRoom';
import TalentCateGrp from './talent/categrp/TalentCateGrp';
import TalentCategory from './talent/category/TalentCategory';
import TalentType from './talent/type/TalentType';
import Talent from './talent/post/Talent';
import ReservationsManager from './reservation/Reservation';
import PlacesList from './place/Place';
import MainPage from './components/Main';
import UnivCertPage from './user/UnivCertPage';
import ReviewPage from './review/ReviewPage';
import PlacesPage from './place/PlacesPage';
import TalentCreateForm from './talent/post/TalentCreateForm';

function App() {
  return (
     <GlobalProvider>
    <div className="App">
      <BrowserRouter>
        <Menu />
        <hr />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/components/Main" element={<MainPage />} />
          <Route path="/user/login" element={<UserLogin />} />
          <Route path="/user/logout" element={<UserLogout />} />
          <Route path="/user/session" element={<UserSession />} /> 
          <Route path="/user/register" element={<UserRegister />} />  
          <Route path="/user/profile" element={<UserProfile />} />  
          <Route path="/user/findId" element={<FindUserId />} /> 
          <Route path="/user/findPwd" element={<FindUserPwd />} />
          <Route path="/user/univCert" element={<UnivCertPage />} /> 
          <Route path="/chat" element={<ChatRoom />} /> 
          <Route path="/talent/post" element={<Talent />} />
          <Route path="/talent/type" element={<TalentType />} />
          <Route path="/talent/category" element={<TalentCategory />} />
          <Route path="/talent/TalentCreateForm" element={<TalentCreateForm />} />
          <Route path="/place/PlacesPage" element={<PlacesPage />} />
          <Route path="/talent/categrp" element={<TalentCateGrp />} />
          <Route path='/reservation/Reservation' element={<ReservationsManager />} /> 
          <Route path='/reservation/Place' element={<PlacesList />} /> 
          <Route path="/talent/categrp" element={<TalentCateGrp />} /> 
          <Route path="/talent/category" element={<TalentCategory />} /> 
          <Route path="/talent/type" element={<TalentType />} /> 
          <Route path="/review/review" element={<ReviewPage />} />
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