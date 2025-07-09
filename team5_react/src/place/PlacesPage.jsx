import React, { useState, useEffect, useContext } from 'react';
import { Plus, Menu, MapPin, Star, Clock, Phone, Navigation } from 'lucide-react';
import Header from '../components/header/Header';
import PlaceSideBar from '../components/sidebar/PlaceSideBar';
import axios from 'axios';
import { GlobalContext } from '../components/GlobalContext';

const PlacePage = () => {
  const { loginUser } = useContext(GlobalContext); // 로그인 유저 정보 (schoolno 등)
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null); // {categoryId, subcategoryId}
  const [places, setPlaces] = useState([]);  // 장소 목록 (API에서 받아옴)
  const [categories, setCategories] = useState([]); // 학교 관 + 장소 카테고리
  

  // 학교 관 + 장소 카테고리 불러오기 (PlaceSideBar가 사용하는 카테고리)
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const schoolno = loginUser?.schoolno;
        if (!schoolno) return;

        // 1. 학교 관 목록 조회
        const gwanRes = await axios.get(`/places/list-by-school/${schoolno}`);
        const gwanList = gwanRes.data;

        // 2. 각 학교 관별 장소 목록 조회
        const categoryResult = await Promise.all(
          gwanList.map(async (gwan) => {
            const placeRes = await axios.get(`/places/list-by-school-and-gwan`, {
              params: { schoolno, schoolgwanno: gwan.schoolgwanno }
            });

            return {
              id: gwan.schoolgwanno,
              name: gwan.schoolgwanname,
              icon: '🏫',
              subcategories: placeRes.data.map(place => ({
                id: place.placeno,
                name: place.placename
              }))
            };
          })
        );

        setCategories(categoryResult);
      } catch (error) {
        console.error('카테고리 불러오기 실패', error);
      }
    };

    fetchCategories();
  }, [loginUser]);

  // selectedCategory 가 바뀔 때마다 장소 목록 다시 불러오기
  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        if (!selectedCategory) {
          setPlaces([]);
          return;
        }
        const schoolno = loginUser?.schoolno;
        if (!schoolno) return;

        // categoryId: 관 번호, subcategoryId: 장소 번호
        if (selectedCategory.subcategoryId) {
          // 하위 장소 단일 선택 시 (장소 상세 혹은 특정 장소만)
          // API에 따라 필요하면 호출 가능
          // 여기서는 예시로 한 장소만 필터링하는 경우:
          // 실제 API가 없으면 client filtering 가능
          setPlaces(prev =>
            prev.filter(p => p.placeno === selectedCategory.subcategoryId)
          );
        } else {
          // 관(카테고리) 선택 시 해당 관의 모든 장소 불러오기
          const res = await axios.get(`/places/list-by-school-and-gwan`, {
            params: {
              schoolno,
              schoolgwanno: selectedCategory.categoryId
            }
          });
          setPlaces(res.data);
        }
      } catch (error) {
        console.error('장소 불러오기 실패', error);
      }
    };

    fetchPlaces();
  }, [selectedCategory, loginUser]);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      <Header />

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '50px',
        padding: '30px 20px',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>

        <PlaceSideBar 
          categories={categories} 
          setSelectedCategory={setSelectedCategory} 
        />

        {/* 중앙 컨텐츠 영역 */}
        <div style={{ flex: 1, maxWidth: '800px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* 헤더 */}
          <div style={{ backgroundColor: 'white', borderRadius: '20px', boxShadow: '0 8px 24px rgba(0,0,0,0.1)', padding: '30px' }}>
            <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#333', margin: 0, display: 'flex', alignItems: 'center', gap: '12px' }}>
              <MapPin size={32} />
              강의실 위치
            </h1>
            {selectedCategory && (
              <p style={{ fontSize: '16px', color: '#666', margin: '10px 0 0 0' }}>
                {categories.find(c => c.id === selectedCategory.categoryId)?.name}
                {selectedCategory.subcategoryId &&
                  ` > ${categories.find(c => c.id === selectedCategory.categoryId)
                    ?.subcategories.find(s => s.id === selectedCategory.subcategoryId)?.name}`
                }
              </p>
            )}
          </div>

          {/* 장소 목록 */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: '20px'
          }}>
            {places.length > 0 ? (
              places.map(place => (
                <div
                  key={place.placeno}
                  style={{
                    backgroundColor: 'white',
                    borderRadius: '16px',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    transition: 'transform 0.2s, box-shadow 0.2s'
                  }}
                >
                  <div style={{
                    height: '200px',
                    backgroundImage: `url(${place.image || 'https://via.placeholder.com/300x200'})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    position: 'relative'
                  }}>
                    <div style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      backgroundColor: 'rgba(0,0,0,0.7)',
                      color: 'white',
                      padding: '4px 8px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      <Navigation size={12} />
                      {place.distance || '-'}
                    </div>
                  </div>

                  <div style={{ padding: '20px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#333', margin: '0 0 8px 0' }}>{place.placename}</h3>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                      {/* 평점, 주소 등 필요시 추가 */}
                      <span style={{ fontSize: '14px', color: '#666' }}>{place.address || ''}</span>
                    </div>

                    <p style={{ fontSize: '14px', color: '#777', margin: '0 0 12px 0', lineHeight: '1.4' }}>
                      {place.description || ''}
                    </p>

                    {/* 추가 정보들(운영 시간, 전화번호 등)도 필요하면 표시 */}
                  </div>
                </div>
              ))
            ) : (
              <div style={{
                backgroundColor: 'white',
                borderRadius: '16px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                padding: '60px',
                textAlign: 'center'
              }}>
                <MapPin size={48} color="#ccc" style={{ marginBottom: '16px' }} />
                <h3 style={{ fontSize: '18px', color: '#666', margin: 0 }}>
                  선택한 카테고리에 해당하는 장소가 없습니다
                </h3>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlacePage;
