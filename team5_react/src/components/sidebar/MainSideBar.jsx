import React, { useEffect,useContext,useState } from 'react';
import { Plus, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../GlobalContext';
import axios from "axios";


function MainSideBar() {
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const { loginUser , setSelectedCategoryNo, selectedCategoryNo } = useContext(GlobalContext);

  const [openCategory, setOpenCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  // console.log('MainSideBar - selectedCategoryNo:', selectedCategoryNo);
  // console.log('MainSideBar - categories:', categories);

  let currentDisplayName = '';
  if (selectedCategoryNo) {
    // Try to find it as a main category
    const mainCat = categories.find(cat => cat.id === selectedCategoryNo);
    if (mainCat) {
      currentDisplayName = mainCat.name;
    } else {
      // Try to find it as a subcategory
      for (const mainCategory of categories) {
        const subCat = mainCategory.subcategories.find(sub => sub.id === selectedCategoryNo);
        if (subCat) {
          currentDisplayName = `${mainCategory.name}/${subCat.name}`;
          break;
        }
      }
    }
  }
  // console.log('MainSideBar - currentDisplayName:', currentDisplayName);
  const handleCategoryClick = (categoryId, subcategoryId = null) => {
    console.log('카테고리 클릭:', categoryId, subcategoryId);
    if (subcategoryId !== null) {
      // console.log('Subcategory clicked:', subcategoryId);
      // 소분류 클릭한 경우 → 전역 상태 변경 및 드롭다운 닫기
      setSelectedCategoryNo(subcategoryId);
      // setOpenCategory(null); // Keep dropdown open after subcategory click
    } else {
      // 대분류만 클릭한 경우 → 드롭다운 토글 및 전역 상태 변경
      setOpenCategory(openCategory === categoryId ? null : categoryId); // Toggle dropdown
      setSelectedCategoryNo(categoryId); // Set to main category ID for main category click
    }
  };

  const handleClearCategory = () => {
    setSelectedCategoryNo(null);
    setOpenCategory(null);
  };
  
    const VerticalLineIcon = ({ height = 16, color = '#999' }) => (
    <svg
      width="2"
      height={height}
      viewBox={`0 0 2 ${height}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="0" y="0" width="2" height={height} fill={color} rx="1" />
    </svg>
  );
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
            icon: <VerticalLineIcon height={16} color="#999" />,
            subcategories: cateRes.data.map(c => ({
              id: c.categoryno,
              
              name: c.name
            }))
          };
        }));

        setCategories(result);
        // console.log('MainSideBar - Categories fetched:', result);
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
        backgroundColor:'white',
        gap: '20px'
        
      }}>
        
        {/* 위는  왼쪽 사이드바 - 버튼 2개 */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '20px',
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
              padding: '8px 8px',
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
              padding: '8px 8px',
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
              <span>강의실 보기</span> 
            </button>
          </div>
          
        </div>

      {/* 구분선 */}
      <div style={{ 
        height: '1px', 
        backgroundColor: '#e5e7eb'
      }}></div>

        {/* 카테고리 섹션 */}
        <div style={{
          backgroundColor: 'white',
          padding: '30px',
          position: 'relative'
        }}>
          {selectedCategoryNo && (
            <div style={{ marginBottom: '10px', textAlign: 'left' }}>
              <button
                onClick={handleClearCategory}
                style={{
                  padding: '5px 10px',
                  fontSize: '14px',
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s',
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0056b3'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#007bff'}
              >
                {currentDisplayName} X
              </button>
            </div>
          )}
          <h3 style={{
            fontSize: '22px',
            fontWeight: '600',
            color: '#333',
            marginBottom: '20px',
            textAlign: 'left'
          }}>
            재능 카테고리
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {categories.map((category) => (
              <div
                key={category.id}
                style={{ position: 'relative' }}
              >
                <div
                  onClick={() => handleCategoryClick(category.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                    padding: '12px 16px',
                    fontSize: '14px',
                    color: '#333',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s, border-radius 0.2s',
                    gap: '12px',
                    backgroundColor: openCategory === category.id ? '#f0f0f0' : 'transparent',
                    borderRadius: '5px',
                  }}
                >
                  <span style={{ fontSize: '16px' }}>{category.icon}</span>
                  <span style={{ fontWeight: '500' }}>{category.name}</span>
                </div>

                {/* 서브카테고리 드롭다운 */}
                {openCategory === category.id && (
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginLeft: '24px',
                    marginTop: '8px',
                    gap: '4px',
                  }}>
                    {category.subcategories.map((subcategory) => (
                      <div
                        key={subcategory.id}
                        onClick={() => handleCategoryClick(category.id, subcategory.id)}
                        style={{
                          display: 'block',
                          width: '100%',
                          padding: '8px 16px',
                          fontSize: '13px',
                          color: '#555',
                          cursor: 'pointer',
                          transition: 'background-color 0.2s, border-radius 0.2s',
                          textAlign: 'left',
                          backgroundColor: 'transparent',
                          borderRadius: '5px',
                        }}
                        onMouseOver={(e) => e.target.style.backgroundColor = '#f0f0f0'}
                        onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
                      >
                        {subcategory.name}
                      </div>
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
export default MainSideBar;