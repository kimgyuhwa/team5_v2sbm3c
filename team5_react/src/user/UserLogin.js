import React, { useState, useContext, useEffect } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../components/GlobalContext';
import { getIP } from '../components/Tool';

function enter_chk(event, nextTag) {
  if (event.keyCode === 13) {
    document.getElementById(nextTag).focus();
  }
}

function UserLogin() {
  const [id, setId] = useState('');
  const [saveId, setSaveId] = useState(false);
  const [passwd, setPasswd] = useState('');
  const [savePasswd, setSavePasswd] = useState(false);
  const { sw, setSw, userno, setUserno } = useContext(GlobalContext);
  const navigate = useNavigate();
  const idChange = (e) => {
    setId(e.target.value);
    if (saveId === true) {
       localStorage.setItem('savedUserId', id);
    }
  };
  
  const passwdChange = (e) => {
    setPasswd(e.target.value);
    if (savePasswd === true) {
       localStorage.setItem('savedUserPasswd', passwd);
    }
  };
  
  const saveIdChange = (e) => {
    setSaveId(e.target.checked);
    if (e.target.checked === true) {
       localStorage.setItem('savedUserId', id);
    } else {
       localStorage.removeItem('savedUserId');
    }
  };
  
  const savePasswdChange = (e) => {
    setSavePasswd(e.target.checked);
    if (e.target.checked === true) {
       localStorage.setItem('savedUserPasswd', passwd);
    } else {
       localStorage.removeItem('savedUserPasswd');
    }
  };

  useEffect(() => {

    
    const storedId = localStorage.getItem('savedUserId');
    const storedPasswd = localStorage.getItem('savedUserPasswd');

    if (storedId) {
      setId(storedId);
      setSaveId(true);
    }

    if (storedPasswd) {
      setPasswd(storedPasswd);
      setSavePasswd(true);
    }

    fetch(`/user/session`, {
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => {
        if (data.sw) {
          setSw(true);
          setUserno(data.userno);
          sessionStorage.setItem('sw', 'true');
          sessionStorage.setItem('userno', data.userno);
        } else {
          setSw(false);
          setUserno(null);
        }
      })
      .catch(err => console.error("세션 복원 오류:", err));
    
  }, []);

  const send = (event) => {
    // 실제 환경에서는 fetch API 사용
    // 데모용으로 간단한 로직 처리
    console.log('로그인 시도:', { userId: id, password: passwd });
    
    // 데모용 로그인 성공 처리
    if (id && passwd) {
      setSw(true);
      setUserno(1);
      alert('로그인 성공! (데모)');
    } else {
      alert('아이디와 패스워드를 입력해주세요.');
    }
  };

  const test = () => {
    setId('kimgyuhwa123');
    setPasswd('1234');
  };

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center',
      alignItems: 'center', 
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
      fontFamily: 'Arial, sans-serif',
    }}>
      {sw === true ? (
        // 완료했을때 바뀌는 이미지 가운데 정렬
        <div style={{ display: 'flex', width: '100%', gap: '50px', justifyContent: 'center',alignItems: 'center' }}>
          <div style={{
            width: '600px',
            height: '400px',
            backgroundColor: 'white',
            borderRadius: '20px',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            fontSize: '18px',
            color: '#333'
          }}>
            <div style={{ marginBottom: '20px' }}>
              사용자 로그인 성공했습니다.
            </div>
            <button 
              onClick={() => navigate('/components/main')} // 홈으로 이동
              
              style={{
                padding: '12px 24px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                cursor: 'pointer',
                textDecoration: 'none'
              }}
            >
              메인으로 돌아가기
            </button>
          </div>
          
          {/* 성공 화면 옆 이미지 */}
          <div style={{
            width: '600px',
            height: '400px',
            backgroundColor: '#e8f4f8',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <svg width="450" height="350" viewBox="0 0 300 200">
              {/* 배경 그라데이션 */}
              <defs>
                <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{stopColor:'#667eea', stopOpacity:1}} />
                  <stop offset="100%" style={{stopColor:'#764ba2', stopOpacity:1}} />
                </linearGradient>
                <linearGradient id="sunGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{stopColor:'#ffd89b', stopOpacity:1}} />
                  <stop offset="100%" style={{stopColor:'#19547b', stopOpacity:1}} />
                </linearGradient>
              </defs>
              
              {/* 하늘 배경 */}
              <rect width="300" height="200" fill="url(#bgGradient)" />
              
              {/* 태양 */}
              <circle cx="220" cy="60" r="25" fill="url(#sunGradient)" />
              
              {/* 구름들 */}
              <g fill="rgba(255,255,255,0.8)">
                <ellipse cx="80" cy="50" rx="20" ry="12" />
                <ellipse cx="95" cy="45" rx="25" ry="15" />
                <ellipse cx="110" cy="50" rx="18" ry="10" />
                
                <ellipse cx="180" cy="35" rx="15" ry="8" />
                <ellipse cx="190" cy="32" rx="18" ry="10" />
                <ellipse cx="200" cy="35" rx="12" ry="7" />
              </g>
              
              {/* 산들 */}
              <polygon points="0,200 50,120 100,200" fill="#4a5568" />
              <polygon points="80,200 130,100 180,200" fill="#2d3748" />
              <polygon points="160,200 200,130 240,200" fill="#4a5568" />
              <polygon points="220,200 260,110 300,200" fill="#2d3748" />
              
              {/* 나무들 */}
              <g>
                <rect x="40" y="160" width="6" height="40" fill="#8b4513" />
                <ellipse cx="43" cy="150" rx="15" ry="20" fill="#228b22" />
                
                <rect x="120" y="150" width="8" height="50" fill="#8b4513" />
                <ellipse cx="124" cy="140" rx="18" ry="25" fill="#32cd32" />
                
                <rect x="250" y="165" width="5" height="35" fill="#8b4513" />
                <ellipse cx="252" cy="155" rx="12" ry="18" fill="#228b22" />
              </g>
            </svg>
          </div>
        </div>
      ) : (
        // 로그인 전 폼들 가운데 정렬 
        <div style={{ display: 'flex', width: '100%', gap: '50px', justifyContent: 'center',alignItems: 'center'}}>
          <div style={{
            width: '600px',
            height: '400px',
            backgroundColor: 'white',
            borderRadius: '20px',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
            padding: '30px',
            boxSizing: 'border-box'
          }}>
            <h3 style={{ 
              textAlign: 'center', 
              marginBottom: '25px', 
              color: '#333',
              fontSize: '22px',
              fontWeight: '600'
            }}>
              사용자 로그인
            </h3>
            
            <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <div style={{ marginBottom: '12px' }}>
                <input
                  type="text"
                  id="id"
                  placeholder="아이디"
                  name="id"
                  autoFocus={true}
                  onKeyDown={e => enter_chk(e, 'passwd')}
                  onChange={idChange}
                  value={id}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '2px solid #e1e5e9',
                    borderRadius: '10px',
                    fontSize: '16px',
                    outline: 'none',
                    transition: 'border-color 0.3s',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#007bff'}
                  onBlur={(e) => e.target.style.borderColor = '#e1e5e9'}
                />
              </div>
              
              <div style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', fontSize: '14px' }}>
                <input
                  type="checkbox"
                  id="saveId"
                  checked={saveId}
                  onChange={saveIdChange}
                  style={{ marginRight: '8px' }}
                />
                <label htmlFor="saveId" style={{ color: '#666', cursor: 'pointer' }}>아이디 저장</label>
              </div>

              <div style={{ marginBottom: '12px' }}>
                <input
                  type="password"
                  id="passwd"
                  placeholder="패스워드"
                  name="passwd"
                  onKeyDown={e => enter_chk(e, 'btnSend')}
                  onChange={passwdChange}
                  value={passwd}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '2px solid #e1e5e9',
                    borderRadius: '10px',
                    fontSize: '16px',
                    outline: 'none',
                    transition: 'border-color 0.3s',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#007bff'}
                  onBlur={(e) => e.target.style.borderColor = '#e1e5e9'}
                />
              </div>
              
              <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', fontSize: '14px' }}>
                <input
                  type="checkbox"
                  id="savePasswd"
                  checked={savePasswd}
                  onChange={savePasswdChange}
                  style={{ marginRight: '8px' }}
                />
                <label htmlFor="savePasswd" style={{ color: '#666', cursor: 'pointer' }}>패스워드 저장</label>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                <button 
                  id="btnSend" 
                  onClick={send}
                  style={{
                    flex: '1',
                    padding: '12px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '10px',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s'
                  }}
                  onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
                  onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
                >
                  로그인
                </button>
                <button 
                  id="btnTest" 
                  type="button" 
                  onClick={test}
                  style={{
                    flex: '1',
                    padding: '12px',
                    backgroundColor: '#6c757d',
                    color: 'white',
                    border: 'none',
                    borderRadius: '10px',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s'
                  }}
                  onMouseOver={(e) => e.target.style.backgroundColor = '#545b62'}
                  onMouseOut={(e) => e.target.style.backgroundColor = '#6c757d'}
                >
                  테스트 계정
                </button>
              </div>
              
              <div style={{ textAlign: 'center' }}>
                <button 
                  type="button"
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#007bff',
                    fontSize: '14px',
                    cursor: 'pointer',
                    textDecoration: 'underline'
                  }}
                  onClick={() => alert('아이디 찾기 페이지로 이동 (데모)')}
                >
                  아이디 찾기
                </button>
              </div>
            </div>
          </div>
          
          {/* 로그인 폼 옆 이미지 */}
          <div style={{
            width: '600px',
            height: '400px',
            backgroundColor: '#f8f9fa',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <svg width="450" height="350" viewBox="0 0 350 250">
              {/* 배경 그라데이션 */}
              <defs>
                <linearGradient id="loginBg" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{stopColor:'#a8edea', stopOpacity:1}} />
                  <stop offset="100%" style={{stopColor:'#fed6e3', stopOpacity:1}} />
                </linearGradient>
                <linearGradient id="deviceGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{stopColor:'#667eea', stopOpacity:1}} />
                  <stop offset="100%" style={{stopColor:'#764ba2', stopOpacity:1}} />
                </linearGradient>
                <filter id="shadow">
                  <feDropShadow dx="3" dy="3" stdDeviation="5" flood-color="rgba(0,0,0,0.2)"/>
                </filter>
              </defs>
              
              {/* 배경 */}
              <rect width="450" height="350" fill="url(#loginBg)" />
              
              {/* 노트북 */}
              <g transform="translate(50, 80)">
                {/* 노트북 화면 */}
                <rect x="0" y="0" width="160" height="100" rx="8" fill="#2d3748" filter="url(#shadow)" />
                <rect x="8" y="8" width="144" height="84" rx="4" fill="#1a202c" />
                
                {/* 화면 내용 - 로그인 화면 */}
                <rect x="20" y="20" width="120" height="60" rx="4" fill="white" />
                <rect x="30" y="30" width="100" height="8" rx="2" fill="#e2e8f0" />
                <rect x="30" y="42" width="100" height="8" rx="2" fill="#e2e8f0" />
                <rect x="30" y="54" width="60" height="12" rx="4" fill="#4299e1" />
                
                {/* 노트북 키보드 */}
                <rect x="0" y="100" width="160" height="60" rx="8" fill="#4a5568" filter="url(#shadow)" />
                <rect x="10" y="110" width="140" height="40" rx="4" fill="#2d3748" />
                
                {/* 키보드 키들 */}
                <g fill="#718096">
                  <rect x="15" y="115" width="6" height="6" rx="1" />
                  <rect x="25" y="115" width="6" height="6" rx="1" />
                  <rect x="35" y="115" width="6" height="6" rx="1" />
                  <rect x="45" y="115" width="6" height="6" rx="1" />
                  <rect x="55" y="115" width="6" height="6" rx="1" />
                  <rect x="65" y="115" width="6" height="6" rx="1" />
                  <rect x="75" y="115" width="6" height="6" rx="1" />
                  <rect x="85" y="115" width="6" height="6" rx="1" />
                  <rect x="95" y="115" width="6" height="6" rx="1" />
                  <rect x="105" y="115" width="6" height="6" rx="1" />
                  <rect x="115" y="115" width="6" height="6" rx="1" />
                  <rect x="125" y="115" width="6" height="6" rx="1" />
                  <rect x="135" y="115" width="6" height="6" rx="1" />
                  
                  <rect x="20" y="125" width="6" height="6" rx="1" />
                  <rect x="30" y="125" width="6" height="6" rx="1" />
                  <rect x="40" y="125" width="6" height="6" rx="1" />
                  <rect x="50" y="125" width="6" height="6" rx="1" />
                  <rect x="60" y="125" width="6" height="6" rx="1" />
                  <rect x="70" y="125" width="6" height="6" rx="1" />
                  <rect x="80" y="125" width="6" height="6" rx="1" />
                  <rect x="90" y="125" width="6" height="6" rx="1" />
                  <rect x="100" y="125" width="6" height="6" rx="1" />
                  <rect x="110" y="125" width="6" height="6" rx="1" />
                  <rect x="120" y="125" width="6" height="6" rx="1" />
                  <rect x="130" y="125" width="6" height="6" rx="1" />
                  
                  <rect x="25" y="135" width="6" height="6" rx="1" />
                  <rect x="35" y="135" width="6" height="6" rx="1" />
                  <rect x="45" y="135" width="40" height="6" rx="1" />
                  <rect x="90" y="135" width="6" height="6" rx="1" />
                  <rect x="100" y="135" width="6" height="6" rx="1" />
                  <rect x="110" y="135" width="6" height="6" rx="1" />
                  <rect x="120" y="135" width="6" height="6" rx="1" />
                </g>
              </g>
              
              {/* 스마트폰 */}
              <g transform="translate(250, 60)">
                <rect x="0" y="0" width="60" height="120" rx="12" fill="#1a202c" filter="url(#shadow)" />
                <rect x="5" y="10" width="50" height="100" rx="8" fill="#2d3748" />
                
                {/* 화면 내용 */}
                <rect x="10" y="15" width="40" height="90" rx="4" fill="white" />
                
                {/* 앱 아이콘들 */}
                <circle cx="20" cy="25" r="4" fill="#4299e1" />
                <circle cx="30" cy="25" r="4" fill="#48bb78" />
                <circle cx="40" cy="25" r="4" fill="#ed8936" />
                
                <circle cx="20" cy="38" r="4" fill="#9f7aea" />
                <circle cx="30" cy="38" r="4" fill="#f56565" />
                <circle cx="40" cy="38" r="4" fill="#38b2ac" />
                
                {/* 하단 바 */}
                <rect x="15" y="90" width="20" height="3" rx="1.5" fill="#cbd5e0" />
              </g>
              
              {/* 보안 자물쇠 아이콘 */}
              <g transform="translate(280, 20)">
                <rect x="0" y="15" width="30" height="25" rx="4" fill="#2b6cb0" />
                <rect x="5" y="20" width="20" height="15" rx="2" fill="#3182ce" />
                <circle cx="15" cy="10" r="8" fill="none" stroke="#2b6cb0" strokeWidth="3" />
                <circle cx="15" cy="27" r="2" fill="white" />
              </g>
              
              {/* 떠다니는 점들 */}
              <g fill="#667eea" opacity="0.6">
                <circle cx="30" cy="30" r="2" />
                <circle cx="320" cy="40" r="3" />
                <circle cx="80" cy="220" r="2" />
                <circle cx="300" cy="200" r="2" />
                <circle cx="40" cy="180" r="1.5" />
                <circle cx="320" cy="180" r="1.5" />
              </g>
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserLogin;