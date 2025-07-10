import React from 'react';
import { User, Edit3 } from 'lucide-react';

const MyPageSideBar = ({ currentPage, setCurrentPage }) => {
  return (
    <aside style={{
      width: '260px',
      backgroundColor: 'white',
      borderRadius: '15px',
      padding: '30px 20px',
      height: 'fit-content',
      boxShadow: '0 8px 8px rgba(0, 0, 0, 0.1)',
    }}>
      {/* 프로필 섹션 */}
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <div style={{
          width: '80px',
          height: '80px',
          backgroundColor: '#e5e7eb',
          borderRadius: '50%',
          margin: '0 auto 15px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative'
        }}>
          <User style={{ width: '40px', height: '40px', color: '#9ca3af' }} />
          <div style={{
            position: 'absolute',
            bottom: '0',
            right: '0',
            width: '24px',
            height: '24px',
            backgroundColor: '#4b5563',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Edit3 style={{ width: '12px', height: '12px', color: 'white' }} />
          </div>
        </div>
        <div style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '4px' }}>김규화</div>
        <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '30px' }}>kimgyuhwa52@naver.com</div>
      </div>

      {/* 구분선 */}
      <div style={{ 
        height: '1px', 
        backgroundColor: '#e5e7eb', 
        margin: '20px 0' 
      }}></div>

      {/* 메뉴 섹션 */}
      <div style={{ marginBottom: '20px' }}>
        <div 
          style={{ 
            fontSize: '18px', 
            fontWeight: 'bold',   
            cursor: 'pointer',
            display: 'inline-block',
            borderBottom: currentPage === 'profile' ? '2px solid black' : 'none',
            paddingBottom: '8px'
          }}
          onClick={() => setCurrentPage('profile')}
        >
          내 프로필
        </div>
      </div>
      
        <div style={{ marginBottom: '20px' }}>
        <div 
          style={{
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '18px',
            borderBottom: currentPage === 'history' ? '2px solid black' : 'none',
            display: 'inline-block',
            paddingBottom: '8px'
            
          }}
          onClick={() => setCurrentPage('history')}
        >
          설문조사
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <div 
          style={{
            fontSize: '18px',
            fontWeight: 'bold',
            paddingBottom: '8px',
            display: 'inline-block',
            borderBottom: currentPage === 'security' ? '2px solid black' : 'none',
            cursor: 'pointer'
          }}
          onClick={() => setCurrentPage('security')}
        >
          설정
        </div>
      </div>
      
    </aside>
  );
};

export default MyPageSideBar;