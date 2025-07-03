import React, { useContext, useState } from 'react';
import { Search, User, ChevronDown, Settings, LogOut, Bell, Menu, Plus, MessageCircle } from 'lucide-react';
import { GlobalContext } from './GlobalContext';
import '../style/MainPage.css';
import TalentList from '../talent/post/TalentList';
import TalentCreateForm from '../talent/post/TalentCreateForm';
import ChatWidget from '../ai/ChatWidget';

export default function MainPage() {
  const { loginUser } = useContext(GlobalContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);

  
  const toggleCreateForm = () => setShowCreateForm((prev) => !prev);
  const triggerRefresh = () => setRefresh((prev) => !prev);

  // // 샘플 게시물 데이터
  // const [posts, setPosts] = useState([
  //   {
  //     id: 1,
  //     title: "첫 번째 게시물 나중에 바꿔야함",
  //     content: "이것은 첫 번째 게시물의 내용입니다. 리액트로 만든 메인페이지가 잘 작동하고 있습니다.",
  //     author: "사용자1",
  //     date: "2025-06-27",
  //     likes: 12
  //   },
  //   {
  //     id: 2,
  //     title: "두 번째 게시물",
  //     content: "두 번째 게시물입니다. 검색 기능과 다양한 컴포넌트들이 포함되어 있습니다.",
  //     author: "사용자2",
  //     date: "2025-06-26",
  //     likes: 8
  //   },
  //   {
  //     id: 3,
  //     title: "세 번째 게시물",
  //     content: "마지막 게시물입니다. 반응형 디자인으로 모바일에서도 잘 보입니다.",
  //     author: "사용자3",
  //     date: "2025-06-25",
  //     likes: 15
  //   }
  // ]);
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

  // const filteredPosts = posts.filter(post =>
  //   post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //   post.content.toLowerCase().includes(searchQuery.toLowerCase())
  // );

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
    <div className="main-container">
      <header className="header">
        <div className="header-inner">
          <div className="header-flex">
            <div className="logo">
              <a href="/components/main">
                <h1>로고 누르면 메인</h1>
              </a>
            </div>

            <div className="menu-area">
              <button
                className="icon-button chat"
                onClick={() => console.log('채팅 버튼 클릭')}
              >
                <MessageCircle size={20} />
                <span className="badge">3</span>
              </button>

              <button
                className="icon-button notification"
                onClick={() => console.log('알림 버튼 클릭')}
              >
                <Bell size={20} />
                <span className="badge">7</span>
              </button>

              <div style={{ position: 'relative' }}>
                <button
                  className="my-page-btn"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <User size={20} />
                  <span>마이페이지</span>
                  <ChevronDown
                    size={16}
                    style={{
                      transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.3s',
                    }}
                  />
                </button>

                {isDropdownOpen && (
                  <div className="dropdown-menu">
                    <div>
                      <button className="dropdown-item">
                        <User size={16} style={{ marginRight: '12px' }} />
                        프로필 보기
                      </button>
                      <button className="dropdown-item">
                        <Settings size={16} style={{ marginRight: '12px' }} />
                        설정
                      </button>
                      <button className="dropdown-item">
                        <Bell size={16} style={{ marginRight: '12px' }} />
                        알림
                      </button>
                      <hr className="dropdown-divider" />
                      <button className="dropdown-item logout">
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
      </header>

      <main className="main-content">
        <aside className="sidebar">
          <div className="sidebar-box">
            <h2 className="school-name">{loginUser.schoolname}</h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <button className="sidebar-button green" onClick={toggleCreateForm}>
                <Plus size={20} />
                <span>내 글 등록</span>
              </button>

              <button className="sidebar-button purple">
                <Menu size={20} />
                <span>장소보기</span>
              </button>
            </div>
          </div>

          <div className="sidebar-box">
            <h3 className="category-title">카테고리</h3>

            <div className="category-list">
              {categories.map((category) => (
                <div
                  key={category.id}
                  style={{ position: 'relative' }}
                  onMouseEnter={() => setHoveredCategory(category.id)}
                  onMouseLeave={() => setHoveredCategory(null)}
                >
                  <button
                    onClick={() => handleCategoryClick(category.id)}
                    className={`category-btn ${
                      hoveredCategory === category.id ? 'hovered' : ''
                    }`}
                  >
                    <span style={{ fontSize: '16px' }}>{category.icon}</span>
                    <span style={{ fontWeight: '500' }}>{category.name}</span>
                  </button>

                  {hoveredCategory === category.id && (
                    <div className="subcategory-dropdown">
                      <div>
                        {category.subcategories.map((subcategory) => (
                          <button
                            key={subcategory.id}
                            onClick={() => handleCategoryClick(category.id, subcategory.id)}
                            className="subcategory-item"
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
        </aside>

        <section className="content-area">
          <div className="search-box">
            <div className="search-path">홈 {'>'} 재능</div>
            <div className="search-input-wrapper">
              <Search className="search-icon" size={20} />
              <input
                type="text"
                placeholder="게시물을 검색하세요..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.keyCode === 13) console.log('검색어:', searchQuery);
                }}
                className="search-input"
              />
            </div>
          </div>

          {/* <div className="posts-box">
            <h2 className="posts-title">
              {searchQuery ? `"${searchQuery}" 검색 결과` : '최근 게시물'}
            </h2>

            {filteredPosts.length === 0 ? (
              <div className="no-results">검색 결과가 없습니다.</div>
            ) : (
              filteredPosts.map((post) => (
                <article key={post.id} className="post-item">
                  <header className="post-header">
                    <h3 className="post-title">{post.title}</h3>
                    <time className="post-date">{post.date}</time>
                  </header>
                  <p className="post-content">{post.content}</p>
                  <footer className="post-footer">
                    <span className="post-author">작성자: {post.author}</span>
                    <div className="post-actions">
                      <button className="likes" onMouseOver={(e) => e.target.style.color = '#c82333'} onMouseOut={(e) => e.target.style.color = '#dc3545'}>
                        ❤️ {post.likes}
                      </button>
                      <button className="comments" onMouseOver={(e) => e.target.style.color = '#0056b3'} onMouseOut={(e) => e.target.style.color = '#007bff'}>
                        댓글
                      </button>
                      <button className="share" onMouseOver={(e) => e.target.style.color = '#495057'} onMouseOut={(e) => e.target.style.color = '#6c757d'}>
                        공유
                      </button>
                    </div>
                  </footer>
                </article>
              ))
            )}
          </div> */}
          {showCreateForm && (
            <TalentCreateForm
              onCreated={() => {
                setShowCreateForm(false); // 작성 후 폼 닫기
                triggerRefresh();         // 리스트 새로고침
              }}
            />
          )}

          <div className="posts-box">
            {/* <h2> 이런 제목은 TalentList 내부에서 관리하거나 여기에 그대로 놔도 됩니다 */}
            <TalentList
              refresh={refresh}
              onUpdated={handleUpdated}
              onDeleted={handleDeleted}
            />
            <ChatWidget />
          </div>
        </section>
      </main>
    </div>
  );
}
