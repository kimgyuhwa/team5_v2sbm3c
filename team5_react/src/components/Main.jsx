import React, { useContext, useState } from 'react';
import { Search } from 'lucide-react';

import Header from './header/Header';
import MainSideBar from './sidebar/MainSideBar';
import { GlobalContext } from './GlobalContext';
import '../style/MainPage.css';
import TalentList from '../talent/post/TalentList';
import TalentCreateForm from '../talent/post/TalentCreateForm';
import ChatWidget from '../ai/ChatWidget';

export default function MainPage() {
  const { loginUser, selectedCategoryNo } = useContext(GlobalContext); 
  const [searchQuery, setSearchQuery] = useState('');
  const [refresh, setRefresh] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  

  const triggerRefresh = () => setRefresh((prev) => !prev);

  const handleUpdated = () => {
    setRefresh((prev) => !prev);
  };

  const handleDeleted = () => {
    setRefresh((prev) => !prev);
  };

  const searchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  
  console.log("🚀 selectedCategoryNo in MainPage:", selectedCategoryNo);


  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter') {
      // Enter 눌렀을 때, 현재는 별도 동작 없고 검색어 상태만 변경되므로
      // TalentList가 searchQuery 변경에 따라 목록 다시 가져감
      e.preventDefault();
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#f8f9fa ',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <Header />

      {/* 사이드바 영역 */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '50px',
          padding: '30px 20px',
          maxWidth: '1400px',
          margin: '0 auto',
        }}
      >
        <MainSideBar />

        {/* 중앙 컨텐츠 영역 */}
        <div
          style={{
            flex: 1,
            maxWidth: '800px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          {/* 검색창 */}
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '20px',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
              padding: '20px',
              boxSizing: 'border-box',
            }}
          >
            <div style={{ position: 'relative' }}>
              <div style={{ textAlign: 'left', marginBottom: '10px' }}>
                홈 {'>'} 재능
              </div>
              <div style={{ position: 'relative' }}>
                <Search
                  style={{
                    position: 'absolute',
                    left: '16px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#999',
                    zIndex: 1,
                  }}
                  size={20}
                />
                <input
                  type="text"
                  placeholder="게시물을 검색하세요..."
                  value={searchQuery}
                  onChange={searchChange}
                  onKeyDown={handleSearchKeyDown}
                  style={{
                    width: '100%',
                    padding: '15px 20px 15px 50px',
                    border: '2px solid #e1e5e9',
                    borderRadius: '10px',
                    fontSize: '16px',
                    outline: 'none',
                    transition: 'border-color 0.3s',
                    boxSizing: 'border-box',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = '#007bff')}
                  onBlur={(e) => (e.target.style.borderColor = '#e1e5e9')}
                />
              </div>
            </div>
          </div>

          {showCreateForm && (
            <TalentCreateForm
              onCreated={() => {
                setShowCreateForm(false);
                triggerRefresh();
              }}
            />
          )}

          <TalentList
            refresh={refresh}
            onUpdated={handleUpdated}
            onDeleted={handleDeleted}
            searchQuery={searchQuery}
            selectedCategoryNo={selectedCategoryNo}
          />

          <ChatWidget />
        </div>
      </div>
    </div>
  );
}
