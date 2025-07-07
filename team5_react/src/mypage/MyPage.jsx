import React, { useState } from 'react';
import { User, Edit3, Info } from 'lucide-react';

// 더미 컴포넌트들
const MyPageSetting = () => (
  <div style={{ padding: '20px' }}>
    <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>내 프로필 설정</h2>
    <p>프로필 설정 페이지입니다.</p>
  </div>
);

const MyPageSurvey = () => (
  <div style={{ padding: '20px' }}>
    <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>이력관리</h2>
    <p>이력관리 페이지입니다.</p>
  </div>
);

const SecuritySettings = () => (
  <div>
    {/* 기본보안설정 */}
    <section style={{ marginBottom: '40px' }}>
      <h2 style={{ 
        fontSize: '16px', 
        fontWeight: 'bold', 
        marginBottom: '20px', 
        display: 'flex', 
        alignItems: 'center', 
        gap: '8px' 
      }}>
        기본보안설정
        <Info style={{ width: '16px', height: '16px', color: '#9ca3af' }} />
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 0',
          borderBottom: '1px solid #f3f4f6'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '20px', height: '20px', backgroundColor: '#d1d5db', borderRadius: '4px' }}></div>
            <span style={{ fontSize: '14px' }}>비밀번호</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{
              padding: '4px 8px',
              backgroundColor: '#dcfce7',
              color: '#16a34a',
              borderRadius: '4px',
              fontSize: '12px',
              fontWeight: '500'
            }}>수정</span>
          </div>
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 0',
          borderBottom: '1px solid #f3f4f6'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '20px', height: '20px', backgroundColor: '#d1d5db', borderRadius: '4px' }}></div>
            <span style={{ fontSize: '14px' }}>패스키 관리</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '14px' }}>0개</span>
            <button style={{
              padding: '4px 12px',
              backgroundColor: '#f3f4f6',
              border: '1px solid #d1d5db',
              borderRadius: '4px',
              fontSize: '12px',
              color: '#4b5563',
              cursor: 'pointer'
            }}>
              관리
            </button>
          </div>
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 0'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '20px', height: '20px', backgroundColor: '#d1d5db', borderRadius: '4px' }}></div>
            <span style={{ fontSize: '14px' }}>2단계 인증</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{
              padding: '4px 8px',
              backgroundColor: '#dcfce7',
              color: '#16a34a',
              borderRadius: '4px',
              fontSize: '12px',
              fontWeight: '500'
            }}>설정</span>
          </div>
        </div>
      </div>
    </section>

    {/* 로그인 차단 설정 */}
    <section style={{ marginBottom: '40px' }}>
      <h2 style={{ 
        fontSize: '16px', 
        fontWeight: 'bold', 
        marginBottom: '20px', 
        display: 'flex', 
        alignItems: 'center', 
        gap: '8px' 
      }}>
        로그인 차단 설정
        <Info style={{ width: '16px', height: '16px', color: '#9ca3af' }} />
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 0',
          borderBottom: '1px solid #f3f4f6'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '20px', height: '20px', backgroundColor: '#d1d5db', borderRadius: '4px' }}></div>
            <span style={{ fontSize: '14px' }}>타지역 로그인 차단</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '44px',
              height: '24px',
              borderRadius: '12px',
              cursor: 'pointer',
              transition: 'background-color 0.2s',
              backgroundColor: '#d1d5db',
              position: 'relative'
            }}>
              <div style={{
                width: '20px',
                height: '20px',
                backgroundColor: 'white',
                borderRadius: '50%',
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                transition: 'transform 0.2s',
                transform: 'translateX(2px)',
                marginTop: '2px'
              }}></div>
            </div>
          </div>
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 0'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '20px', height: '20px', backgroundColor: '#d1d5db', borderRadius: '4px' }}></div>
            <span style={{ fontSize: '14px' }}>해외 로그인 차단</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '44px',
              height: '24px',
              borderRadius: '12px',
              cursor: 'pointer',
              transition: 'background-color 0.2s',
              backgroundColor: '#22c55e',
              position: 'relative'
            }}>
              <div style={{
                width: '20px',
                height: '20px',
                backgroundColor: 'white',
                borderRadius: '50%',
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                transition: 'transform 0.2s',
                transform: 'translateX(20px)',
                marginTop: '2px'
              }}></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* 새 기기 로그인 알림 */}
    <section style={{ marginBottom: '40px' }}>
      <h2 style={{ 
        fontSize: '16px', 
        fontWeight: 'bold', 
        marginBottom: '20px', 
        display: 'flex', 
        alignItems: 'center', 
        gap: '8px' 
      }}>
        새 기기 로그인 알림
        <Info style={{ width: '16px', height: '16px', color: '#9ca3af' }} />
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 0',
          borderBottom: '1px solid #f3f4f6'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '20px', height: '20px', backgroundColor: '#d1d5db', borderRadius: '4px' }}></div>
            <span style={{ fontSize: '14px' }}>로그인 알림</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '44px',
              height: '24px',
              borderRadius: '12px',
              cursor: 'pointer',
              transition: 'background-color 0.2s',
              backgroundColor: '#d1d5db',
              position: 'relative'
            }}>
              <div style={{
                width: '20px',
                height: '20px',
                backgroundColor: 'white',
                borderRadius: '50%',
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                transition: 'transform 0.2s',
                transform: 'translateX(2px)',
                marginTop: '2px'
              }}></div>
            </div>
          </div>
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 0',
          borderBottom: '1px solid #f3f4f6'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '20px', height: '20px', backgroundColor: '#d1d5db', borderRadius: '4px' }}></div>
            <span style={{ fontSize: '14px' }}>로그인 알림 제외 목록</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button style={{
              padding: '4px 12px',
              backgroundColor: '#f3f4f6',
              border: '1px solid #d1d5db',
              borderRadius: '4px',
              fontSize: '12px',
              color: '#4b5563',
              cursor: 'pointer'
            }}>
              확인
            </button>
          </div>
        </div>

        <div style={{
          backgroundColor: '#f9fafb',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          padding: '16px',
          marginTop: '16px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '20px', height: '20px', backgroundColor: '#22c55e', borderRadius: '4px' }}></div>
              <span style={{ fontSize: '14px', color: '#16a34a', fontWeight: '500' }}>새로운 환경 로그인 알림 제공 중</span>
            </div>
            <button style={{
              padding: '4px 12px',
              backgroundColor: '#f3f4f6',
              border: '1px solid #d1d5db',
              borderRadius: '4px',
              fontSize: '12px',
              color: '#4b5563',
              cursor: 'pointer'
            }}>
              ▼
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default function MainPage() {
  const [currentPage, setCurrentPage] = useState('security');

  const renderContent = () => {
    switch (currentPage) {
      case 'profile':
        return <MyPageSetting />;
      case 'security':
        return <SecuritySettings />;
      case 'history':
        return <MyPageSurvey />;
      default:
        return <SecuritySettings />;
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f8f9fa',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      {/* 메인 컨테이너 */}
      <div style={{
        display: 'flex',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '20px',
        gap: '20px'
      }}>
        {/* 사이드바 */}
        <aside style={{
          width: '250px',
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: '20px',
          height: 'fit-content',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
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
          <div style={{ marginBottom: '30px' }}>
            <div 
              style={{ 
                fontSize: '16px', 
                fontWeight: 'bold', 
                marginBottom: '15px',
                cursor: 'pointer',
                borderBottom: currentPage === 'profile' ? '2px solid black' : 'none',
                paddingBottom: '8px'
              }}
              onClick={() => setCurrentPage('profile')}
            >
              내 프로필
            </div>
          </div>



          <div style={{ marginBottom: '30px' }}>
            <div 
              style={{
                fontSize: '16px',
                fontWeight: 'bold',
                marginBottom: '15px',
                paddingBottom: '8px',
                borderBottom: currentPage === 'security' ? '2px solid black' : 'none',
                cursor: 'pointer'
              }}
              onClick={() => setCurrentPage('security')}
            >
              설정
            </div>
            <div 
              style={{
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '16px',
                borderBottom: currentPage === 'history' ? '2px solid black' : 'none',
                marginBottom: '15px',
                paddingBottom: '8px'
              }}
              onClick={() => setCurrentPage('history')}
            >
              설문조사
            </div>
          </div>

          <div style={{ marginBottom: '30px' }}>
            <div style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '15px' }}>스마트폰 설정</div>
          </div>
        </aside>

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