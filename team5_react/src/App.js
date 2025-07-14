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
import TalentCreateForm from './talent/post/TalentCreateForm';
import TalentCategory from './talent/category/TalentCategory';
import TalentDetailPage from './talent/post/TalentDetailPage';
import TalentType from './talent/type/TalentType';
import Talent from './talent/post/Talent';
import ReservationsManager from './reservation/Reservation';
import MainPage from './components/Main';
import UnivCertPage from './user/UnivCertPage';
import ReviewPage from './review/ReviewPage';
import PlacesPage from './place/PlacesPage';
import MyPage from './mypage/MyPage';
import MyChatBotListPage from './mypage/MyChatBotListPage';
import AdminUserList from './admin/AdminUserList';
import Header from './components/header/Header'



function App() {
  return (
     <GlobalProvider>
    <div className="App">
      <BrowserRouter>
        <Menu />
        <Header />
        <hr />
        <Routes>
          <Route path="/" element={<Home />} />
          {/** 관리자 페이지 */}
          <Route path="/admin/user" element={<AdminUserList />} />  
          {/** 회원 */}
          <Route path="/mypage/MyPage" element={<MyPage />} />  
          <Route path="/components/Main" element={<MainPage />} />
          <Route path="/user/login" element={<UserLogin />} />
          <Route path="/user/logout" element={<UserLogout />} />
          <Route path="/user/session" element={<UserSession />} /> 
          <Route path="/user/register" element={<UserRegister />} />  
          <Route path="/user/profile" element={<UserProfile />} />  
          <Route path="/user/findId" element={<FindUserId />} /> 
          <Route path="/user/findPwd" element={<FindUserPwd />} />
          <Route path="/user/univCert" element={<UnivCertPage />} /> 
          <Route path="/review/review" element={<ReviewPage />} />
          {/** 재능 */}
          <Route path="/talent/post" element={<Talent />} />
          <Route path="/talent/type" element={<TalentType />} />
          <Route path="/talent/category" element={<TalentCategory />} /> 
          <Route path="/talent/type" element={<TalentType />} /> 
          <Route path="/talent/categrp" element={<TalentCateGrp />} />
          <Route path="/talent/TalentCreateForm" element={<TalentCreateForm />} />
          {/** 장소 */}
          <Route path="/place/PlacesPage" element={<PlacesPage />} />
          {/* <Route path='/reservation/Place' element={<PlacesList />} />  << 이거머임? 없음파일이*/}  
          <Route path='/reservation/Reservation' element={<ReservationsManager />} />  
           {/** 채팅 */}
          <Route path="/chat" element={<ChatRoom />} /> 
          <Route path="/chatroom/:chatRoomno" element={<ChatRoom />} /> 
           {/** 챗봇 */}
          <Route path="/mypage/chatbot-list" element={<MyChatBotListPage />} />
          <Route path="/talent/detail/:talentno" element={<TalentDetailPage />} />
          <Route path="/mypage/MyPage" element={<MyPage />} />

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