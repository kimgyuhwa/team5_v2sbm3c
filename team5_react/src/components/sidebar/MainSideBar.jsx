import React, { useEffect,useContext,useState } from 'react';
import { Plus, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../GlobalContext';
import axios from "axios";


function MainSideBar() {
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const { loginUser , setSelectedCategoryNo } = useContext(GlobalContext);
  const navigate = useNavigate();
  const handleCategoryClick = (categoryId, subcategoryId = null) => {
    console.log('카테고리 클릭:', categoryId, subcategoryId);
    if (subcategoryId !== null) {
    // 소분류 클릭한 경우 → 전역 상태 변경
    setSelectedCategoryNo(subcategoryId);
  } else {
    // 대분류만 클릭한 경우 → 전체 보이게 하려면 null 설정
    setSelectedCategoryNo(null);
  }
  };
  
useEffect(() => {
    const fetchCategories = async () => {
      try {
        const grpRes = await axios.get('/talent_cate_grp/list?keyword=');
        const cateGrpList = grpRes.data.content; // Page 객체의 content만 꺼냄

        const result = await Promise.all(cateGrpList.map(async (grp) => {
          const cateRes = await axios.get(`/talent_category/list-by-categrp/${grp.cateGrpno}`);
          return {
            id: grp.cateGrpno,
            name: grp.name,
            icon: '📁', // 임시 아이콘
            subcategories: cateRes.data.map(c => ({
              id: c.categoryno,
              name: c.name
            }))
          };
        }));

        setCategories(result);
      } catch (error) {
        console.error('카테고리 불러오기 실패', error);
      }
    };

    fetchCategories();
  }, []);



  return (
    

      
      
      <div style={{
        width: '300px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
      }}>
        {/* 위는  왼쪽 사이드바 - 버튼 2개 */}
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
            onClick={() => navigate('/talent/TalentCreateForm')}
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
              onClick={() => navigate('/place/PlacesPage')}
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
            재능 카테고리
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
    
  );

}
export default MainSideBar;