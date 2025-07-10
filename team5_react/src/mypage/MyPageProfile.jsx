import React, { useState } from 'react';
import { User, Info, Phone, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MyPageProfile = () => {
  const navigate = useNavigate();
  const [isToggleOn, setIsToggleOn] = useState(true);

  const handleMyInfo = () => {
    navigate('/user/profile');
  }

  return (
    <div style={{
      maxWidth: '800px',
      margin: '20px auto',
      padding: '20px',
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      border: '2px solid #e0f2fe',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* 헤더 */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginBottom: '20px',
        color: '#64748b',
        fontSize: '14px'
      }}>
        <span>기본정보</span>
        <Info style={{ width: '16px', height: '16px' }} />
      </div>

      {/* 프로필 섹션 */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '30px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <div style={{
            width: '60px',
            height: '60px',
            backgroundColor: '#e2e8f0',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <User style={{ width: '30px', height: '30px', color: '#94a3b8' }} />
          </div>
          <div>
            <div style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#1e293b',
              marginBottom: '4px'
            }}>
              김규화
            </div>
            <div style={{
              fontSize: '14px',
              color: '#64748b'
            }}>
              kimgyuhwa52@naver.com
            </div>
          </div>
        </div>
        <button 
        onClick={handleMyInfo}
        style={{
          padding: '8px 16px',
          backgroundColor: 'white',
          border: '1px solid #cbd5e1',
          borderRadius: '6px',
          color: '#64748b',
          fontSize: '14px',
          cursor: 'pointer'
        }}>
          
          정보수정
        </button>
      </div>

      {/* 연락처 정보 */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 0',
          borderBottom: '1px solid #e2e8f0'
        }}>
        </div>
      </div>

      {/* 토글 스위치 */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '25px'
      }}>
        <span style={{ fontSize: '14px', color: '#1e293b' }}>
          이 번호로 로그인하기
        </span>
        <div 
          style={{
            width: '48px',
            height: '24px',
            backgroundColor: isToggleOn ? '#06b6d4' : '#cbd5e1',
            borderRadius: '12px',
            cursor: 'pointer',
            position: 'relative',
            transition: 'background-color 0.2s'
          }}
          onClick={() => setIsToggleOn(!isToggleOn)}
        >
          <div style={{
            width: '20px',
            height: '20px',
            backgroundColor: 'white',
            borderRadius: '50%',
            position: 'absolute',
            top: '2px',
            left: isToggleOn ? '26px' : '2px',
            transition: 'left 0.2s',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
          }}></div>
        </div>
      </div>

      {/* 이메일 목록 */}
      <div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 0',
          borderBottom: '1px solid #e2e8f0'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Mail style={{ width: '18px', height: '18px', color: '#64748b' }} />
            <span style={{ fontSize: '14px', color: '#1e293b' }}>
              ki*******@n*******.com
            </span>
          </div>
          <button style={{
            padding: '4px 12px',
            backgroundColor: 'white',
            border: '1px solid #cbd5e1',
            borderRadius: '4px',
            color: '#64748b',
            fontSize: '12px',
            cursor: 'pointer'
          }}>
            수정
          </button>
        </div>
        
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 0'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Mail style={{ width: '18px', height: '18px', color: '#64748b' }} />
            <span style={{ fontSize: '14px', color: '#1e293b' }}>
              gg******@g*******.com
            </span>
          </div>
          <button style={{
            padding: '4px 12px',
            backgroundColor: 'white',
            border: '1px solid #cbd5e1',
            borderRadius: '4px',
            color: '#64748b',
            fontSize: '12px',
            cursor: 'pointer'
          }}>
            수정
          </button>
        </div>
      </div>

      <div style={{
        color : 'black',
        padding: '4px 12px'
      }}>
      </div>
    </div>
  );
};

export default MyPageProfile;

