import React, { useContext, useState } from 'react';
import { Search, User, ChevronDown, Settings, LogOut, Bell, Menu, Plus, MessageCircle } from 'lucide-react';

import { useNavigate } from 'react-router-dom';
import '../style/MainPage.css';
import TalentList from '../talent/post/TalentList';
import TalentCreateForm from '../talent/post/TalentCreateForm';
import ChatWidget from '../ai/ChatWidget';
import MyPageSideBar from '../components/sidebar/MyPageSideBar';
import SearchBar from '../searchBar/SearchBar';
import { GlobalContext } from '../components/GlobalContext';
import Header from '../components/header/Header';


export default function MainPage() {
  const { loginUser } = useContext(GlobalContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);

  
  const toggleCreateForm = () => setShowCreateForm((prev) => !prev);
  const triggerRefresh = () => setRefresh((prev) => !prev);

    const handleUpdated = () => {
  setRefresh(prev => !prev);  // refresh 값 토글해서 useEffect 다시 실행
  };

  const handleDeleted = () => {
    setRefresh(prev => !prev);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSearch = (event) => {
    if (event.keyCode === 13) {
      console.log('검색어:', searchQuery);
    }
  };


  const searchChange = (e) => {
    setSearchQuery(e.target.value);
  };



  return (
    <div style={{
      minHeight: '100vh',
      
      backgroundColor: '#f8f9fa ',
      fontFamily: 'Arial, sans-serif'
    }}>
      <Header />


        {/* 사이드바 영역 */}
        <div style={{
          justifyContent: 'center',
          gap: '50px',
          padding: '30px 20px',
          margin: '0 auto'
        }}>
          <div style={{
            
          }}>
          </div>

        <MyPageSideBar />

        {/* 중앙 컨텐츠 영역 */}
        
        <div style={{
          flex: 1,
          maxWidth: '800px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}>
          


          {showCreateForm && (
            <TalentCreateForm
              onCreated={() => {
                setShowCreateForm(false); // 작성 후 폼 닫기
                triggerRefresh();         // 리스트 새로고침
              }}
            />
          )}

          

            <ChatWidget />
          
        </div>
      </div>
    </div>
  );
}
