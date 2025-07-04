import React, { useContext, useState } from 'react';
import { Search, User, ChevronDown, Settings, LogOut, Bell, Menu, Plus, MessageCircle } from 'lucide-react';

import SearchBar from '../searchBar/SearchBar';
import { useNavigate } from 'react-router-dom';
import Header from './header/Header';
import MainSideBar from './sidebar/MainSideBar';
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



  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f8f9fa ',
      fontFamily: 'Arial, sans-serif'
    }}>
      <Header />
        

        {/* 사이드바 영역 */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '50px',
          padding: '30px 20px',
          maxWidth: '1400px',
          margin: '0 auto'
        }}>

        <MainSideBar />

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
        </div>
      
      </div>
    </div>
  );
}