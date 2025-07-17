import { Search, User, ChevronDown, Settings, LogOut, Bell, Menu, Plus, MessageCircle, Star } from 'lucide-react';
import React, { useState, useContext,useEffect,useRef } from 'react';
import ReactDOM from 'react-dom';
import UserLogout from '../../user/UserLogout';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../GlobalContext';
import ChatRoom from '../../chat/ChatRoom';

function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isChatDropdownOpen, setIsChatDropdownOpen] = useState(false);
  const [isNotificationDropdownOpen, setIsNotificationDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const [chatList, setChatList] = useState([]);

  const [page, setPage] = useState(0);    //페이지
  const [notificationList, setNotificationList] = useState([]);  // 알림 목록
  const [unreadCount, setUnreadCount] = useState(); // 안읽은 알림 개수
  const [hasMore, setHasMore] = useState(true);   // 더불러올 알람없으면 false > 더보기 없어짐
  const eventSrcRef = useRef(null);  // 알림 SSE연결 객체 보관용
  const [openChatId, setOpenChatId] = useState(null); //  현재 열려 있는 채팅방

  const navigate = useNavigate();
  const { LoginUser, setSw, loginUser, setLoginUser } = useContext(GlobalContext);

  const isLoggedIn = !!loginUser;
  
  const handleMyPage = () => {
    navigate('/mypage/Mypage?tab=profile');  // 바로 navigate 호출
    setIsDropdownOpen(false);          // 드롭다운 닫기
  };

  const handleSetting = () => {
    navigate('/mypage/Mypage?tab=security')
    setIsDropdownOpen(false);
  };

  const handleReservation = () => {
    navigate('/mypage/Mypage?tab=history');
    setIsDropdownOpen(false);
  };

  const handleResearch = () => {
    navigate('/mypage/Mypage?tab=reservation');
    setIsDropdownOpen(false);
  };



  const userno = loginUser?.userno;
  const size = 3;  // 한번에 보여줄 알림 개수
 const loadMore = () => {
  fetch(`/notifications/user/${userno}?page=${page}&size=${size}`)
    .then(res => res.json())
    .then(data => {
      setNotificationList(prev => {
        // 중복 제거
        const newItems = data.filter(
          n => !prev.some(p => p.notificationno === n.notificationno)
        );
        const merged = [...prev, ...newItems];
        
        const noMore =
          newItems.length < size         // 마지막 페이지가 size 미만
          || merged.length >= unreadCount; // 혹은 화면에 쌓인 총합이 미확인 개수 이상

        setHasMore(!noMore);
        if (!noMore) return merged;      // 마지막 페이지라면 page++ 안 함

        return merged;
      });

      // hasMore가 true일 때만 page++
      setPage(prev => prev + 1);
    })
    .catch(console.error);
};

    useEffect(() => {
  if (isNotificationDropdownOpen && page === 0) {
        loadMore();
      }
    }, [isNotificationDropdownOpen]);
    

  useEffect(() => {
    if (!userno) {
      setChatList([]);
      setNotificationList([]);
      setUnreadCount(0);
      setHasMore(true);
      setPage(0);
      if (eventSrcRef.current) {
        eventSrcRef.current.close();
        eventSrcRef.current = null;
      }
      return;
    }
      /* ⭐ -------------  SSE 구독  -------------- */
  // 이미 열려 있으면 그대로 둔다
  if (!eventSrcRef.current) {
    const es = new EventSource(`/sse/notifications/${userno}`);
    eventSrcRef.current = es;

    // 일반 메시지 수신
    es.onmessage = (e) => {
      try {
        const payload = JSON.parse(e.data);          // back‑end 에서 보내준 DTO

        // 1) 목록 맨 앞에 추가
        setNotificationList((prev) => [payload, ...prev]);

        // 2) 뱃지 +1
        setUnreadCount((c) => (c ?? 0) + 1);
      } catch (_) { console.error('알림 파싱 오류'); }
    };

    // 오류(네트워크 등) → 15초 후 재연결 (최소 구현)
    es.onerror = () => {
      es.close();
      eventSrcRef.current = null;
      setTimeout(() => eventSrcRef.current ?? setHasMore((h) => h), 15000);
    };
  }
  /* ----------------------------------------- */

    // 채팅 목록 API 호출
   fetch(`/chatroom/user/${userno}/chatlist`, { credentials: 'include' })
    .then(res => res.json())
    .then(async rooms => {
      // rooms: [{ chatRoomno, roomName, createdAt }, ...]
      const withLast = await Promise.all(
        rooms.map(async r => {
          const res = await fetch(`/message/${r.chatRoomno}/last-message`);
          const last = await res.json();     // {content, createdAt}

          return {
            id: r.chatRoomno,
            name: r.roomName,
            senderName:last.senderName,
            lastMessage: last.content,
            time: new Date(last.createdAt || r.createdAt)
                     .toLocaleTimeString('ko-KR',{hour:'2-digit',minute:'2-digit'})
          };
        })
      );
      setChatList(withLast);
    })
    .catch(console.error);
    // //알림 목록 API 호출
    // fetch(`/notifications/user/${userno}?page=${page}&size=3`)
    //   .then(res => res.json())
    //   .then(data => {
    //     setNotificationList(data);
    //   })
    //   .catch(err => {
    //     console.error('알림 목록 API 호출 실패:', err);
    //     setNotificationList([]); // 에러 시 빈 배열
    //   });
    
      // 안읽은 알림 개수
      fetch(`/notifications/user/${userno}/unreadCount`)
      .then(res => res.json())
      .then(count => {
        setUnreadCount(count);
      })
      .catch(() => setUnreadCount(0));

      setHasMore(true);
      setPage(0);
  }, [userno]);

    // 채팅 아이템 클릭 시
  const handleOpenChat = (roomId) => {
    setIsChatDropdownOpen(false);  // 드롭다운 닫고
    setOpenChatId(roomId);         // 모달 열기
  };

  const handleCloseChat = () => setOpenChatId(null);

  const handleLogout = () => {
    fetch('/user/logout', { method: 'GET' })
      .then(result => result.text())
      .then(text => {
        console.log('->', text);
        setSw(false);
        setLoginUser(null);
        sessionStorage.removeItem('sw');
        sessionStorage.removeItem('loginUser');
        alert("로그아웃 되었습니다.");
        navigate('/');
      })
      .catch(err => {
        console.error(err);
        alert("로그아웃 중에 문제가 발생했습니다.");
      });
  };

  
  const handleMarkAllRead = () => {
  if (!userno) return;

  fetch(`/notifications/user/${userno}/readAll`, {
    method: 'PUT',
  })
    .then(res => {
       if (!res.ok) throw new Error('실패');
      // 읽음 처리 완료되면 최신 알림 목록 재요청
      return fetch(`/notifications/user/${userno}?page=0&size=3`)
    })
    .then(res => res.json())
    .then(data => {
      setNotificationList(data);
      setUnreadCount(0);
      setHasMore(data.length >= 3);
      setPage(1); // page 0 데이터 로드 완료이므로 1로 설정
    })
    .catch(err => {
      console.error('모두 읽음 처리 실패:', err);
      alert('모두 읽음 처리에 실패했습니다.');
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
          height: '50px'
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
                메인
              </h1>
            </a>
          </div>

          {/* 오른쪽 메뉴 영역 */}
           {isLoggedIn ? (
          /* ----- 로그인 상태 ----- */
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>

            {/* 채팅 아이콘 */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={handleChatClick}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  width: 44, height: 44,
                  backgroundColor: isChatDropdownOpen ? '#138496' : '#17a2b8',
                  color: 'white', border: 'none', borderRadius: '50%',
                  cursor: 'pointer', transition: 'all .3s', outline: 'none'
                }}
                onMouseOver={e => {
                  e.currentTarget.style.backgroundColor = '#138496';
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseOut={e => {
                  e.currentTarget.style.backgroundColor = isChatDropdownOpen ? '#138496' : '#17a2b8';
                  e.currentTarget.style.transform = 'scale(1)';
                }}>
                <MessageCircle size={20} />
              </button>

              {/* 채팅 드롭다운 */}
              {isChatDropdownOpen && (
                <div style={{
                  position: 'absolute', right: 0, marginTop: 8, width: 350,
                  backgroundColor: 'white', borderRadius: 10,
                  boxShadow: '0 8px 24px rgba(0,0,0,.1)',
                  border: '1px solid #e1e5e9', zIndex: 50, overflow: 'hidden'
                }}>
                  <div style={{
                    padding: '16px 20px', borderBottom: '1px solid #e1e5e9',
                    backgroundColor: '#f8f9fa', display: 'flex',
                    justifyContent: 'space-between', alignItems: 'center'
                  }}>
                    <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600, color: '#333' }}>
                      채팅 목록
                    </h3>
                  </div>

                  <div style={{ maxHeight: 300, overflowY: 'auto' }}>
                    {chatList.map(chat => (
                      <div key={chat.id}
                        onClick={() => handleOpenChat(chat.id)}
                        style={{
                          padding: '12px 20px', borderBottom: '1px solid #f1f3f4',
                          cursor: 'pointer', transition: 'background-color .2s'
                        }}
                        onMouseOver={e => e.currentTarget.style.backgroundColor = '#f8f9fa'}
                        onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}>
                        <div style={{
                          display: 'flex', justifyContent: 'space-between',
                          alignItems: 'center'
                        }}>
                          <span style={{ fontWeight: 600, color: '#333', fontSize: 14 }}>
                            {chat.name}
                          </span>
                          <span style={{ fontSize: 12, color: '#666' }}>
                            {chat.time}
                          </span>
                        </div>
                        <p style={{
                          margin: 0, fontSize: 13, color: '#666',
                          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'
                        }}>
                          {chat.senderName}:{chat.lastMessage}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 알림 아이콘 */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={handleNotificationClick}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  width: 44, height: 44,
                  backgroundColor: isNotificationDropdownOpen ? '#e0a800' : '#ffc107',
                  color: 'white', border: 'none', borderRadius: '50%',
                  cursor: 'pointer', transition: 'all .3s', outline: 'none'
                }}
                onMouseOver={e => {
                  e.currentTarget.style.backgroundColor = '#e0a800';
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseOut={e => {
                  e.currentTarget.style.backgroundColor = isNotificationDropdownOpen ? '#e0a800' : '#ffc107';
                  e.currentTarget.style.transform = 'scale(1)';
                }}>
                <Bell size={20} />
                {/* 뱃지: unreadCount > 0 일때만 */}
                {unreadCount > 0 && (
                  <span style={{
                    position: 'absolute', top: -2, right: -2,
                    backgroundColor: '#dc3545', color: 'white',
                    fontSize: 10, padding: '2px 6px', borderRadius: 10,
                    minWidth: 18, textAlign: 'center'
                  }}>
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* 알림 드롭다운 */}
              {isNotificationDropdownOpen && (
                <div style={{
                  position: 'absolute', right: 0, marginTop: 8, width: 380,
                  backgroundColor: 'white', borderRadius: 10,
                  boxShadow: '0 8px 24px rgba(0,0,0,.1)',
                  border: '1px solid #e1e5e9', zIndex: 50, overflow: 'hidden'
                }}>
                  <div style={{
                    padding: '16px 20px', borderBottom: '1px solid #e1e5e9',
                    backgroundColor: '#f8f9fa', display: 'flex',
                    justifyContent: 'space-between', alignItems: 'center'
                  }}>
                    <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600, color: '#333' }}>알림</h3>
                    <button onClick={handleMarkAllRead} style={{
                      background: 'none', border: 'none', color: '#ffc107',
                      fontSize: 12, cursor: 'pointer', textDecoration: 'underline'
                    }}>모두 읽음</button>
                  </div>

                  <div style={{ maxHeight: 350, overflowY: 'auto' }}>
                    {notificationList.length === 0 ? (
                      <div style={{
                        padding: 20, color: '#999', textAlign: 'center',
                        fontSize: 14, userSelect: 'none'
                      }}>알림이 없습니다.</div>
                    ) : (
                      notificationList.map(n => (
                        <div key={n.notificationno} style={{
                          padding: '12px 20px', borderBottom: '1px solid #f1f3f4',
                          cursor: 'pointer', transition: 'background-color .2s'
                        }}
                          onMouseOver={e => e.currentTarget.style.backgroundColor = '#f8f9fa'}
                          onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}>
                          <div style={{
                            display: 'flex', justifyContent: 'space-between',
                            alignItems: 'flex-start', marginBottom: 6
                          }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                              <div style={{
                                width: 8, height: 8, borderRadius: '50%',
                                backgroundColor:
                                  n.type === 'message' ? '#17a2b8' :
                                  n.type === 'update'  ? '#28a745' :
                                  n.type === 'meeting' ? '#ffc107' :
                                  n.type === 'system'  ? '#dc3545' : '#6c757d'
                              }} />
                              <span style={{ fontWeight: 600, color: '#333', fontSize: 14 }}>
                                {n.type}
                              </span>
                            </div>
                            <span style={{ fontSize: 12, color: '#666' }}>
                              {new Date(n.createdAt)
                                .toLocaleTimeString('ko-KR',{hour:'2-digit',minute:'2-digit'})}
                            </span>
                          </div>
                          <p style={{
                            margin: 0, fontSize: 13, color: '#666',
                            lineHeight: 1.4, paddingLeft: 16
                          }}>{n.message}</p>
                        </div>
                      ))
                    )}
                  </div>

                  {notificationList.length > 0 && hasMore && (
                    <div style={{ padding: '12px 20px', borderTop: '1px solid #e1e5e9' }}>
                      <button onClick={loadMore} style={{
                        width: '100%', padding: 8, backgroundColor: '#ffc107',
                        color: 'white', border: 'none', borderRadius: 6,
                        fontSize: 14, cursor: 'pointer',
                        transition: 'background-color .2s'
                      }}
                        onMouseOver={e => e.target.style.backgroundColor = '#e0a800'}
                        onMouseOut={e => e.target.style.backgroundColor = '#ffc107'}>
                        더보기
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* 프로필 드롭다운 */}
            <div style={{ position: 'relative' }}>
              <button onClick={toggleDropdown} style={{
                display: 'flex', alignItems: 'center', gap: 8,
                backgroundColor: '#007bff', color: 'white',
                padding: '8px 10px', border: 'none', borderRadius: 10,
                fontSize: 16, fontWeight: 600, cursor: 'pointer',
                transition: 'background-color .3s', outline: 'none'
              }}
                onMouseOver={e => e.currentTarget.style.backgroundColor = '#0056b3'}
                onMouseOut={e => e.currentTarget.style.backgroundColor = '#007bff'}>
                <User size={20} />
                {loginUser?.name}님
                <ChevronDown size={16} style={{
                  transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform .3s'
                }} />
              </button>

              {isDropdownOpen && (
                <div style={{
                  position: 'absolute', right: 0, marginTop: 4, width: 200,
                  backgroundColor: 'white', borderRadius: 10,
                  boxShadow: '0 8px 24px rgba(0,0,0,.1)',
                  border: '1px solid #e1e5e9', zIndex: 50, overflow: 'hidden'
                }}>
                  <div style={{ padding: '4px 0' }}>
                    <button onClick={handleMyPage} style={dropdownBtn}>
                      <User size={16} style={{ marginRight: 12 }} /> 프로필 보기
                    </button>
                    <button 
                    onClick={handleSetting}
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
                      <Settings size={16} style={{ marginRight: '12px' }} />
                      설정
                    </button>

                    <button
                    onClick={handleReservation}
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
                      <Star size={16} style={{ marginRight: '12px' }} />
                      예약 확인

                    </button>
                    <button 
                    onClick={handleResearch}
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
                      <Star size={16} style={{ marginRight: '12px' }} />
                      설문조사
                    </button>
                    <hr style={{ margin: '4px 0', border: 'none', borderTop: '1px solid #e1e5e9' }} />
                    <button onClick={handleLogout} style={{ ...dropdownBtn, color: '#dc3545' }}>
                      <LogOut size={16} style={{ marginRight: 12 }} /> 로그아웃
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* ----- 비로그인 상태 ----- */
          <div style={{ display: 'flex', gap: 12 }}>
            <button onClick={() => navigate('/user/login')} style={guestBtnStyle}>
              로그인
            </button>
            <button onClick={() => navigate('/user/register')}
              style={{ ...guestBtnStyle, backgroundColor: '#17a2b8', color: 'white', border: 'none' }}>
              회원가입
            </button>
          </div>
        )}
      </div>
    </div>

    {/* 채팅 모달 Portal */}
    {openChatId && ReactDOM.createPortal(
      <div style={{
        position: 'fixed', bottom: 20, right: 20,
        width: 400, height: 600, backgroundColor: 'white',
        border: '1px solid #ccc', borderRadius: 10,
        boxShadow: '0 8px 24px rgba(0,0,0,.2)',
        zIndex: 9999, display: 'flex', flexDirection: 'column'
      }}>
        <div style={{
          padding: 10, backgroundColor: '#007bff', color: 'white',
          borderTopLeftRadius: 10, borderTopRightRadius: 10,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center'
        }}>
          <span>채팅방 #{openChatId}</span>
          <button onClick={handleCloseChat} style={{
            background: 'transparent', color: 'white',
            border: 'none', fontSize: 16, cursor: 'pointer'
          }}>✕</button>
        </div>
        <div style={{ flex: 1, overflow: 'hidden' }}>
          <ChatRoom chatRoomno={openChatId.toString()} />
        </div>
      </div>,
      document.body
    )}
    </div>

    
  );

  
}
/* 공통 스타일 */
const dropdownBtn = {
  display: 'flex', alignItems: 'center', width: '100%',
  padding: '12px 16px', fontSize: 14, color: '#333',
  background: 'none', border: 'none', cursor: 'pointer',
  transition: 'background-color .2s'
};
const guestBtnStyle = {
  padding: '6px 14px', borderRadius: 8,
  border: '1px solid #007bff', backgroundColor: 'white',
  color: '#007bff', fontWeight: 600, cursor: 'pointer'
};
export default Header;