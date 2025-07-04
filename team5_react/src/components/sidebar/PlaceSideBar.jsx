import React, { useState } from 'react';
import { Plus, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


function PlaceSideBar({setSelectedCategory}) {
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const navigate = useNavigate();
  
  const handleCategoryClick = (categoryId, subcategoryId = null) => {
    setSelectedCategory({ categoryId, subcategoryId });
    setHoveredCategory(null);
  };
  
  // 카테고리 데이터 
const categories = [
    {
      id: 'restaurant',
      name: '음식점',
      icon: '🍽️',
      subcategories: [
        { id: 'korean', name: '한식' },
        { id: 'western', name: '양식' },
        { id: 'chinese', name: '중식' },
        { id: 'japanese', name: '일식' },
        { id: 'cafe', name: '카페/디저트' }
      ]
    },
    {
      id: 'study',
      name: '스터디',
      icon: '📚',
      subcategories: [
        { id: 'library', name: '도서관' },
        { id: 'studycafe', name: '스터디카페' },
        { id: 'reading_room', name: '독서실' },
        { id: 'group_study', name: '그룹스터디룸' }
      ]
    },
    {
      id: 'entertainment',
      name: '오락',
      icon: '🎮',
      subcategories: [
        { id: 'karaoke', name: '노래방' },
        { id: 'pc_room', name: 'PC방' },
        { id: 'bowling', name: '볼링장' },
        { id: 'movie', name: '영화관' }
      ]
    },
    {
      id: 'shopping',
      name: '쇼핑',
      icon: '🛍️',
      subcategories: [
        { id: 'mall', name: '쇼핑몰' },
        { id: 'bookstore', name: '서점' },
        { id: 'convenience', name: '편의점' },
        { id: 'market', name: '마트' }
      ]
    }
  ];




  return (

      <div style={{
        width: '300px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
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
              backgroundColor: '#007bff',
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
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0056b3'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#007bff'}
            >
              <Plus size={20} />
              <span>내 글 등록</span>
            </button>
            
            <button style={{
              
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              backgroundColor: '#007bff',
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
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0056b3'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#007bff'}
            onClick={() => navigate('/components/Main')}
            >
              <Menu size={20} />
              <span>카테고리 보기</span>
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
            장소 카테고리
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
                    overflow: 'hidden'
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
                          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
                          onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
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
  );
};

export default PlaceSideBar;