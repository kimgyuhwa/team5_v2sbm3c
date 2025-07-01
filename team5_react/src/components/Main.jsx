import React, { useState } from 'react';
import { Search, User, ChevronDown, Settings, LogOut, Bell, Menu, Plus, MessageCircle } from 'lucide-react';
import SearchBar from '../searchBar/SearchBar';


export default function MainPage() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredCategory, setHoveredCategory] = useState(null);
  // 샘플 게시물 데이터
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "첫 번째 게시물 나중에 바꿔야함",
      content: "이것은 첫 번째 게시물의 내용입니다. 리액트로 만든 메인페이지가 잘 작동하고 있습니다.",
      author: "사용자1",
      date: "2025-06-27",
      likes: 12
    },
    {
      id: 2,
      title: "두 번째 게시물",
      content: "두 번째 게시물입니다. 검색 기능과 다양한 컴포넌트들이 포함되어 있습니다.",
      author: "사용자2",
      date: "2025-06-26",
      likes: 8
    },
    {
      id: 3,
      title: "세 번째 게시물",
      content: "마지막 게시물입니다. 반응형 디자인으로 모바일에서도 잘 보입니다.",
      author: "사용자3",
      date: "2025-06-25",
      likes: 15
    }
  ]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSearch = (event) => {
    if (event.keyCode === 13) {
      console.log('검색어:', searchQuery);
    }
  };

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const searchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleChatClick = () => {
    console.log('채팅 버튼 클릭');
  };

  const handleNotificationClick = () => {
    console.log('알림 버튼 클릭');
  };

    // 카테고리 데이터
  const categories = [
    {
      id: 1,
      name: '학업',
      icon: '📚',
      subcategories: [
        { id: 11, name: '수업 정보' },
        { id: 12, name: '시험 정보' },
        { id: 13, name: '과제 도움' },
        { id: 14, name: '학점 관리' }
      ]
    },
    {
      id: 2,
      name: '동아리',
      icon: '🎭',
      subcategories: [
        { id: 21, name: '동아리 모집' },
        { id: 22, name: '동아리 활동' },
        { id: 23, name: '공연/전시' },
        { id: 24, name: '봉사활동' }
      ]
    },
    {
      id: 3,
      name: '취업',
      icon: '💼',
      subcategories: [
        { id: 31, name: '인턴십' },
        { id: 32, name: '취업 정보' },
        { id: 33, name: '자격증' },
        { id: 34, name: '스펙 관리' }
      ]
    },
    {
      id: 4,
      name: '생활',
      icon: '🏠',
      subcategories: [
        { id: 41, name: '기숙사' },
        { id: 42, name: '맛집 정보' },
        { id: 43, name: '교통 정보' },
        { id: 44, name: '알바 정보' }
      ]
    },
    {
      id: 5,
      name: '자유게시판',
      icon: '💬',
      subcategories: [
        { id: 51, name: '잡담' },
        { id: 52, name: '질문' },
        { id: 53, name: '후기' },
        { id: 54, name: '건의사항' }
      ]
    }
  ];

  const handleCategoryClick = (categoryId, subcategoryId = null) => {
    console.log('카테고리 클릭:', categoryId, subcategoryId);
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* 헤더 */}
      <div style={{
        backgroundColor: 'white',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        borderBottom: '1px solid #e1e5e9'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 20px'
        }}>
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
              <button
                onClick={handleChatClick}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '48px',
                  height: '48px',
                  backgroundColor: '#17a2b8',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  outline: 'none',
                  position: 'relative'
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = '#138496';
                  e.target.style.transform = 'scale(1.05)';
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = '#17a2b8';
                  e.target.style.transform = 'scale(1)';
                }}
              >
                <MessageCircle size={20} />
                {/* 채팅 알림 뱃지 (옵션) */}
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

              {/* 알림 아이콘 버튼 */}
              <button
                onClick={handleNotificationClick}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '48px',
                  height: '48px',
                  backgroundColor: '#ffc107',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  outline: 'none',
                  position: 'relative'
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = '#e0a800';
                  e.target.style.transform = 'scale(1.05)';
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = '#ffc107';
                  e.target.style.transform = 'scale(1)';
                }}
              >
                <Bell size={20} />
                {/* 알림 뱃지 (옵션) */}
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
                  7
                </span>
              </button>

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
                  onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
                  onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
                >
                  <User size={20} />
                  <span>마이페이지</span>
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
                      <button style={{
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

      {/* 메인 컨텐츠 */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '50px',
        padding: '30px 20px',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        
        {/* 왼쪽 사이드바 - 버튼 2개 */}
        <div style={{
          width: '300px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '20px',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
            padding: '30px',
            boxSizing: 'border-box'
          }}>
            
            <h2 style={{
              fontSize: '30px',
              fontWeight: '600',
              color: '#333',
              marginBottom: '20px',
              textAlign: 'center'
            }}>
              솔데 대학교
            </h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <button style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                backgroundColor: '#28a745',
                color: 'white',
                padding: '15px 20px',
                border: 'none',
                borderRadius: '10px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'background-color 0.3s',
                outline: 'none'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#1e7e34'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#28a745'}
              >
                <Plus size={20} />
                <span>내 글 등록</span>
              </button>
              
              <button style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                backgroundColor: '#6f42c1',
                color: 'white',
                padding: '15px 20px',
                border: 'none',
                borderRadius: '10px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'background-color 0.3s',
                outline: 'none'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#5a2d91'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#6f42c1'}
              >
                <Menu size={20} />
                <span>장소보기</span>
              </button>
            </div>
          </div>



          {/* 카테고리 섹션 */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '20px',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
            padding: '30px',
            boxSizing: 'border-box',
            position: 'relative'
          }}>
            <h3 style={{
              fontSize: '20px',
              fontWeight: '600',
              color: '#333',
              marginBottom: '20px',
              textAlign: 'center'
            }}>
              카테고리
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {categories.map((category) => (
                <div
                  key={category.id}
                  style={{ position: 'relative' }}
                  onMouseEnter={() => setHoveredCategory(category.id)}
                  onMouseLeave={() => setHoveredCategory(null)}
                >
                  <button
                    onClick={() => handleCategoryClick(category.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      width: '100%',
                      padding: '12px 16px',
                      backgroundColor: hoveredCategory === category.id ? '#f8f9fa' : 'transparent',
                      border: '1px solid #e1e5e9',
                      borderRadius: '10px',
                      fontSize: '14px',
                      color: '#333',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      outline: 'none',
                      gap: '12px'
                    }}
                  >
                    <span style={{ fontSize: '16px' }}>{category.icon}</span>
                    <span style={{ fontWeight: '500' }}>{category.name}</span>
                  </button>

                  {/* 서브카테고리 드롭다운 */}
                  {hoveredCategory === category.id && (
                    <div style={{
                      position: 'absolute',
                      left: 0,
                      top: '100%',
                      marginLeft: '12px',
                      width: '180px',
                      backgroundColor: 'white',
                      borderRadius: '12px',
                      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
                      border: '1px solid #e1e5e9',
                      zIndex: 100,
                      overflow: 'hidden',
                      animation: 'slideDown 0.2s ease-out'
                    }}>
                      <div style={{ padding: '8px 0' }}>
                        {category.subcategories.map((subcategory) => (
                          <button
                            key={subcategory.id}
                            onClick={() => handleCategoryClick(category.id, subcategory.id)}
                            style={{
                              display: 'block',
                              width: '100%',
                              padding: '10px 16px',
                              fontSize: '13px',
                              color: '#555',
                              background: 'none',
                              border: 'none',
                              cursor: 'pointer',
                              transition: 'background-color 0.2s',
                              textAlign: 'left'
                            }}
                            onMouseOver={(e) => e.target.style.backgroundColor = '#f8f9fa'}
                            onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
                          >
                            {subcategory.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        

        </div>

        {/* 중앙 컨텐츠 영역 */}
        <div style={{
          flex: 1,
          maxWidth: '800px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}>
          {/* 검색창 */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '20px',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
            padding: '20px',
            boxSizing: 'border-box'
          }}>
            <div style={{ position: 'relative' }}>
              <div style={{textAlign: 'left', marginBottom: '10px'}} >
              홈 {'>'} 재능
              </div>
              <div style={{ position: 'relative' }}>
                <Search style={{
                  position: 'absolute',
                  left: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#999',
                  zIndex: 1
                }} size={20} />
                <input
                  type="text"
                  placeholder="게시물을 검색하세요..."  
                  value={searchQuery}
                  onChange={searchChange}
                  onKeyDown={handleSearch}
                  style={{
                    width: '100%',
                    padding: '15px 20px 15px 50px',
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
            </div>
            
            {/*여기는 게시물 검색 밑부분 */}
          </div>

          {/* 게시물 영역 */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '20px',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
            padding: '20px',
            boxSizing: 'border-box'

          }}>
            <h2 style={{
              fontWeight: '550',
              color: '#333',
              marginTop: '20px',
              marginBottom: '20px'
            }}>
              {searchQuery ? `"${searchQuery}" 검색 결과` : '최근 게시물'}
            </h2>
            
            {filteredPosts.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '30px',
                color: '#666',
                fontSize: '16px'
              }}>
                검색 결과가 없습니다.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>   {/* 게시물 하나하나 */}
                {filteredPosts.map((post) => (
                  <div key={post.id} style={{
                    border: '1px solid #e1e5e9',
                    borderRadius: '15px',
                    padding: '25px',
                    transition: 'box-shadow 0.3s, transform 0.2s',
                    cursor: 'pointer'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                  >
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: '15px'
                    }}>
                      <h3 style={{
                        fontSize: '20px',
                        fontWeight: '600',
                        color: '#333',
                        margin: 0
                      }}>
                        {post.title}
                      </h3>
                      <span style={{ fontSize: '14px', color: '#666' }}>{post.date}</span>
                    </div>
                    <p style={{
                      color: '#555',
                      marginBottom: '20px',
                      marginLeft: '20px',
                      lineHeight: '1.6',
                      fontSize: '16px',
                      textAlign: 'left'
                    }}>
                      {post.content}
                    </p>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <span style={{ fontSize: '14px', color: '#666' }}>작성자: {post.author}</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <button style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          background: 'none',
                          border: 'none',
                          color: '#dc3545',
                          cursor: 'pointer',
                          fontSize: '14px',
                          transition: 'color 0.2s'
                        }}
                        onMouseOver={(e) => e.target.style.color = '#c82333'}
                        onMouseOut={(e) => e.target.style.color = '#dc3545'}
                        >
                          <span>❤️</span>
                          <span>{post.likes}</span>
                        </button>
                        <button style={{
                          background: 'none',
                          border: 'none',
                          color: '#007bff',
                          cursor: 'pointer',
                          fontSize: '14px',
                          transition: 'color 0.2s'
                        }}
                        onMouseOver={(e) => e.target.style.color = '#0056b3'}
                        onMouseOut={(e) => e.target.style.color = '#007bff'}
                        >
                          댓글
                        </button>
                        <button style={{
                          background: 'none',
                          border: 'none',
                          color: '#6c757d',
                          cursor: 'pointer',
                          fontSize: '14px',
                          transition: 'color 0.2s'
                        }}
                        onMouseOver={(e) => e.target.style.color = '#495057'}
                        onMouseOut={(e) => e.target.style.color = '#6c757d'}
                        >
                          공유
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}