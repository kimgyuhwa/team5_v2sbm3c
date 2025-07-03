import React, { useContext,useState } from 'react';
import { Search, User, ChevronDown, Settings, LogOut, Bell, Menu, Plus, MessageCircle } from 'lucide-react';
import SearchBar from '../searchBar/SearchBar';
import { useNavigate } from 'react-router-dom';
import Header from './header/Header';
import MainSideBar from './sidebar/MainSideBar';
import { GlobalContext } from './GlobalContext';

export default function MainPage() {
  const { loginUser } = useContext(GlobalContext);
  //console.log("main:" , loginUser);
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