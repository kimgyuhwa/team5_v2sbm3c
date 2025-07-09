import React, { useState, useEffect, useContext } from 'react';
import { Plus, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GlobalContext } from '../GlobalContext'; // loginUser에서 schoolno 얻기 위해

function PlaceSideBar({ setSelectedCategory }) {
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const { loginUser } = useContext(GlobalContext);  // 로그인 사용자 정보

  const handleCategoryClick = (categoryId, subcategoryId = null) => {
    setSelectedCategory({ categoryId, subcategoryId });
    setHoveredCategory(null);
  };

  // 학교번호 기반 장소 카테고리 불러오기
  useEffect(() => {
    const fetchPlaceCategories = async () => {
      try {
        const schoolno = loginUser?.schoolno;
        if (!schoolno) return;

        // 1. 학교관 목록 조회
        const gwanRes = await axios.get(`/places/list-by-school/${schoolno}`);
        const gwanList = gwanRes.data;
        
        // 2. 각 학교관별 장소 목록 조회
        const result = await Promise.all(
          gwanList.map(async (gwan) => {
            const placeRes = await axios.get(`/places/list-by-school-and-gwan`, {
              params: {
                schoolno: loginUser.schoolno,
                schoolgwanno: gwan.schoolgwanno
              }
            });
            
            return {
              id: gwan.schoolgwanno,
              name: gwan.schoolgwanname,
              icon: '🏫', // 예시 아이콘
              subcategories: placeRes.data.map(place => ({
                id: place.placeno,
                name: place.placename
              }))
            };
          })
        );
        
        setCategories(result);
      } catch (error) {
        console.error('장소 카테고리 불러오기 실패', error);
      }
    };

    fetchPlaceCategories();
  }, [loginUser]);

  return (
    <div style={{ width: '300px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* 상단 */}
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
          {loginUser?.schoolname}
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <button style={buttonStyle} onClick={() => navigate('/place/create')}>
            <Plus size={20} />
            <span>내 장소 등록</span>
          </button>

          <button style={buttonStyle} onClick={() => navigate('/components/Main')}>
            <Menu size={20} />
            <span>카테고리 보기</span>
          </button>
        </div>
      </div>

      {/* 카테고리 */}
      <div style={categoryBoxStyle}>
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

              {hoveredCategory === category.id && (
                <div style={dropdownStyle}>
                  {category.subcategories.map((subcategory) => (
                    <button
                      key={subcategory.id}
                      onClick={() => handleCategoryClick(category.id, subcategory.id)}
                      style={subCategoryStyle}
                      onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
                      onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      {subcategory.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PlaceSideBar;

// 스타일 분리
const buttonStyle = {
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
};

const categoryBoxStyle = {
  backgroundColor: 'white',
  borderRadius: '20px',
  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
  padding: '30px',
  boxSizing: 'border-box',
  position: 'relative'
};

const dropdownStyle = {
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
};

const subCategoryStyle = {
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
};
