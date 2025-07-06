import { Search, User, ChevronDown, Settings, LogOut, Bell, Menu, Plus, MessageCircle } from 'lucide-react';
import React, { useState } from 'react';
import UserLogout from '../../user/UserLogout';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { GlobalContext } from '../GlobalContext';

function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isChatDropdownOpen, setIsChatDropdownOpen] = useState(false);
  const [isNotificationDropdownOpen, setIsNotificationDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const { setSw, setUserno, setLoginUser } = useContext(GlobalContext);

  const handleMyPage = () => {
    navigate('/mypage/MyPage');
  }
const handleLogout = () => {
  fetch('/user/logout', {
    method: 'GET'
  })
    .then(result => result.text())
    .then(text => {
      console.log('->', text);
      setSw(false);
      setUserno(0);
      setLoginUser(null);
      sessionStorage.removeItem('sw');
      sessionStorage.removeItem('userno');
      localStorage.removeItem('loginUser');

      alert("로그아웃 되었습니다.");
      navigate('/'); // 로그아웃 후 홈으로 이동
    })
    .catch(err => {
      console.error(err);
      alert("로그아웃 중에 문제가 발생했습니다..");
    });

};

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const searchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleChatClick = () => {
    setIsChatDropdownOpen(!isChatDropdownOpen);
    setIsNotificationDropdownOpen(false); // 다른 드롭다운 닫기
  };

  const handleNotificationClick = () => {
    setIsNotificationDropdownOpen(!isNotificationDropdownOpen);
    setIsChatDropdownOpen(false); // 다른 드롭다운 닫기
  };

  // 샘플 채팅 데이터
  const chatList = [
    { id: 1, name: '김철수', lastMessage: '안녕하세요! 문의사항이 있어서 연락드려요.', time: '2분 전', unread: 2 },
    { id: 2, name: '이영희', lastMessage: '프로젝트 진행상황은 어떻게 되나요?', time: '1시간 전', unread: 1 },
    { id: 3, name: '박민수', lastMessage: '내일 회의 시간 변경 가능한가요?', time: '3시간 전', unread: 0 },
  ];

  // 샘플 알림 데이터
  const notificationList = [
    { id: 1, title: '새로운 메시지', content: '김철수님이 메시지를 보냈습니다.', time: '5분 전', type: 'message' },
    { id: 2, title: '프로젝트 업데이트', content: '프로젝트 A의 상태가 변경되었습니다.', time: '30분 전', type: 'update' },
    { id: 3, title: '회의 알림', content: '오후 3시 팀 회의가 예정되어 있습니다.', time: '1시간 전', type: 'meeting' },
    { id: 4, title: '시스템 공지', content: '시스템 점검이 예정되어 있습니다.', time: '2시간 전', type: 'system' },
  ];

  

  return (
    <div style={{
      backgroundColor: 'white',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      borderBottom: '1px solid #e1e5e9'
    }}>
      {/* 헤더 오브젝트 거리 */}
      <div style={{
        maxWidth: '1500px',
        margin: '0 auto',
        padding: '0 20px'
      }}>
        {/* 헤더 크기 */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '64px'
        }}>
          {/* 로고 */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <a href='/components/main'>
              <h1 style={{
                fontSize: '24px',
                fontWeight: '700',
                color: '#333',
                margin: 0
              }}>
                로고 누르면 메인
              </h1>
            </a>
          </div>

          {/* 오른쪽 메뉴 영역 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* 채팅 아이콘 버튼 */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={handleChatClick}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '48px',
                  height: '48px',
                  backgroundColor: isChatDropdownOpen ? '#138496' : '#17a2b8',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  outline: 'none',
                  position: 'relative'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#138496';
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = isChatDropdownOpen ? '#138496' : '#17a2b8';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <MessageCircle size={20} />
                {/* 채팅 알림 뱃지 */}
                <span style={{
                  position: 'absolute',
                  top: '-2px',
                  right: '-2px',
                  backgroundColor: '#dc3545',
                  color: 'white',
                  fontSize: '10px',
                  padding: '2px 6px',
                  borderRadius: '10px',
                  minWidth: '18px',
                  textAlign: 'center'
                }}>
                  3
                </span>
              </button>

              {/* 채팅 드롭다운 메뉴 */}
              {isChatDropdownOpen && (  
                <div style={{
                  position: 'absolute',
                  right: 0,
                  marginTop: '8px',
                  width: '350px',
                  backgroundColor: 'white',
                  borderRadius: '10px',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
                  border: '1px solid #e1e5e9',
                  zIndex: 50,
                  overflow: 'hidden'
                }}>
                  <div style={{ 
                    padding: '16px 20px', 
                    borderBottom: '1px solid #e1e5e9',
                    backgroundColor: '#f8f9fa',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '600', color: '#333' }}>
                      채팅 목록
                    </h3>
                    <span style={{ fontSize: '12px', color: '#666' }}>
                      {chatList.filter(chat => chat.unread > 0).length}개의 새 메시지
                    </span>
                  </div>
                  <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                    {chatList.map(chat => (
                      <div key={chat.id} style={{
                        padding: '12px 20px',
                        borderBottom: '1px solid #f1f3f4',
                        cursor: 'pointer',
                        transition: 'background-color 0.2s',
                        backgroundColor: chat.unread > 0 ? '#f8f9ff' : 'transparent'
                      }}
                      onMouseOver={(e) => e.target.style.backgroundColor = '#f8f9fa'}
                      onMouseOut={(e) => e.target.style.backgroundColor = chat.unread > 0 ? '#f8f9ff' : 'transparent'}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                          <span style={{ fontWeight: '600', color: '#333', fontSize: '14px' }}>
                            {chat.name}
                          </span>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '12px', color: '#666' }}>
                              {chat.time}
                            </span>
                            {chat.unread > 0 && (
                              <span style={{
                                backgroundColor: '#17a2b8',
                                color: 'white',
                                fontSize: '10px',
                                padding: '2px 6px',
                                borderRadius: '10px',
                                minWidth: '16px',
                                textAlign: 'center'
                              }}>
                                {chat.unread}
                              </span>
                            )}
                          </div>
                        </div>
                        <p style={{ 
                          margin: 0, 
                          fontSize: '13px', 
                          color: '#666',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}>
                          {chat.lastMessage}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div style={{ padding: '12px 20px', borderTop: '1px solid #e1e5e9' }}>
                    <button style={{
                      width: '100%',
                      padding: '8px',
                      backgroundColor: '#17a2b8',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '14px',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s'
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#138496'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#17a2b8'}
                    >
                      모든 채팅 보기
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* 알림 아이콘 버튼 */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={handleNotificationClick}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '48px',
                  height: '48px',
                  backgroundColor: isNotificationDropdownOpen ? '#e0a800' : '#ffc107',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  outline: 'none',
                  position: 'relative'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#e0a800';
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = isNotificationDropdownOpen ? '#e0a800' : '#ffc107';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <Bell size={20} />
                {/* 알림 뱃지 */}
                <span style={{
                  position: 'absolute',
                  top: '-2px',
                  right: '-2px',
                  backgroundColor: '#dc3545',
                  color: 'white',
                  fontSize: '10px',
                  padding: '2px 6px',
                  borderRadius: '10px',
                  minWidth: '18px',
                  textAlign: 'center'
                }}>
                  4
                </span>
              </button>

              {/* 알림 드롭다운 메뉴 */}
              {isNotificationDropdownOpen && (
                <div style={{
                  position: 'absolute',
                  right: 0,
                  marginTop: '8px',
                  width: '380px',
                  backgroundColor: 'white',
                  borderRadius: '10px',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
                  border: '1px solid #e1e5e9',
                  zIndex: 50,
                  overflow: 'hidden'
                }}>
                  <div style={{ 
                    padding: '16px 20px', 
                    borderBottom: '1px solid #e1e5e9',
                    backgroundColor: '#f8f9fa',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '600', color: '#333' }}>
                      알림
                    </h3>
                    <button style={{
                      backgroundColor: 'transparent',
                      border: 'none',
                      color: '#ffc107',
                      fontSize: '12px',
                      cursor: 'pointer',
                      textDecoration: 'underline'
                    }}>
                      모두 읽음
                    </button>
                  </div>
                  <div style={{ maxHeight: '350px', overflowY: 'auto' }}>
                    {notificationList.map(notification => (
                      <div key={notification.id} style={{
                        padding: '12px 20px',
                        borderBottom: '1px solid #f1f3f4',
                        cursor: 'pointer',
                        transition: 'background-color 0.2s'
                      }}
                      onMouseOver={(e) => e.target.style.backgroundColor = '#f8f9fa'}
                      onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{
                              width: '8px',
                              height: '8px',
                              backgroundColor: notification.type === 'message' ? '#17a2b8' : 
                                             notification.type === 'update' ? '#28a745' :
                                             notification.type === 'meeting' ? '#ffc107' :
                                             notification.type === 'system' ? '#dc3545' : '#6c757d',
                              borderRadius: '50%',
                              flexShrink: 0
                            }}></div>
                            <span style={{ fontWeight: '600', color: '#333', fontSize: '14px' }}>
                              {notification.title}
                            </span>
                          </div>
                          <span style={{ fontSize: '12px', color: '#666', flexShrink: 0 }}>
                            {notification.time}
                          </span>
                        </div>
                        <p style={{ 
                          margin: 0, 
                          fontSize: '13px', 
                          color: '#666',
                          lineHeight: '1.4',
                          paddingLeft: '16px'
                        }}>
                          {notification.content}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div style={{ padding: '12px 20px', borderTop: '1px solid #e1e5e9' }}>
                    <button style={{
                      width: '100%',
                      padding: '8px',
                      backgroundColor: '#ffc107',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '14px',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s'
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#e0a800'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#ffc107'}
                    >
                      모든 알림 보기
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* 마이페이지 드롭다운 메뉴 */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={toggleDropdown}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: '#007bff',
                  color: 'white',
                  padding: '12px 20px',
                  border: 'none',
                  borderRadius: '10px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s',
                  outline: 'none'
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0056b3'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#007bff'}
              >
                <User size={20} />
                마이페이지
                <ChevronDown size={16} style={{
                  transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s'
                }} />
              </button>
                
              {/* 드롭다운 메뉴 */}
              {isDropdownOpen && (
                <div style={{
                  position: 'absolute',
                  right: 0,
                  marginTop: '8px',
                  width: '200px',
                  backgroundColor: 'white',
                  borderRadius: '10px',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
                  border: '1px solid #e1e5e9',
                  zIndex: 50,
                  overflow: 'hidden'
                }}>
                  <div style={{ padding: '4px 0' }}>
                    <button 
                    onClick={handleMyPage}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      width: '100%',
                      padding: '12px 16px',
                      fontSize: '14px',
                      color: '#333',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s'
                    }}
                    
                    onMouseOver={(e) => e.target.style.backgroundColor = '#f8f9fa'}
                    onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
                    >
                      <User size={16} style={{ marginRight: '12px' }} />
                      프로필 보기
                      
                    </button>
                    <button style={{
                      display: 'flex',
                      alignItems: 'center',
                      width: '100%',
                      padding: '12px 16px',
                      fontSize: '14px',
                      color: '#333',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s'
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#f8f9fa'}
                    onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
                    >
                      <Settings size={16} style={{ marginRight: '12px' }} />
                      설정
                    </button>
                    <button style={{
                      display: 'flex',
                      alignItems: 'center',
                      width: '100%',
                      padding: '12px 16px',
                      fontSize: '14px',
                      color: '#333',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s'
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#f8f9fa'}
                    onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
                    >
                      <Bell size={16} style={{ marginRight: '12px' }} />
                      알림
                    </button>
                    <hr style={{ margin: '4px 0', border: 'none', borderTop: '1px solid #e1e5e9' }} />
                    <button 
                    
                    onClick={handleLogout}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      width: '100%',
                      padding: '12px 16px',
                      fontSize: '14px',
                      color: '#dc3545',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s'
                    }}
                    
                    onMouseOver={(e) => e.target.style.backgroundColor = '#f8f9fa'}
                    onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
                    >
                      <LogOut size={16} style={{ marginRight: '12px' }} />
                      
                      로그아웃
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;