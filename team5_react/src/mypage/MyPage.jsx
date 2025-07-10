import React, { useState } from 'react';
import { Info } from 'lucide-react';
import Header from '../components/header/Header';
import MyPageSideBar from './MyPageSideBar';
import SecuritySettings from './MyPageSetting';
import MyPageProfile from './MyPageProfile';
import MyPageSurvey from './MyPageSurvey';



export default function MainPage() {
  const [currentPage, setCurrentPage] = useState('security');

  const renderContent = () => {
    switch (currentPage) {
      case 'profile':
        return <MyPageProfile />;
      case 'security':
        return <SecuritySettings />;
      case 'history':
        return <MyPageSurvey />;
      default:
        return <MyPageProfile />;
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f8f9fa',
      fontFamily: 'Arial, sans-serif'
    }}>
      <Header />
      {/* 메인 컨테이너 */}
      <div style={{
        display: 'flex',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '30px 20px',
        gap: '20px'
      }}>
        {/* 사이드바 컴포넌트 */}
        <MyPageSideBar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      
        {/* 메인 콘텐츠 */}
        <main style={{
          flex: 1,
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: '30px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          {renderContent()}

        </main>
      </div>
    </div>
  );
}
