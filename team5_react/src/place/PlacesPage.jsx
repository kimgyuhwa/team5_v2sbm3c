    import React, { useState } from 'react';
import { Plus, Menu, MapPin, Star, Clock, Phone, Globe, Navigation } from 'lucide-react';
import Header from '../components/header/Header';
import PlaceSideBar from '../components/sidebar/PlaceSideBar';


const PlacePage = () => {
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);

  
  const handleCategoryClick = (categoryId, subcategoryId = null) => {
    setSelectedCategory({ categoryId, subcategoryId });
    setHoveredCategory(null);
  };

  const places = [
    {
      id: 1,
      name: '맛있는 한식당',
      category: 'restaurant',
      subcategory: 'korean',
      rating: 4.5,
      distance: '0.3km',
      address: '서울시 강남구 역삼동 123-45',
      phone: '02-1234-5678',
      hours: '11:00 - 22:00',
      image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=300&h=200&fit=crop',
      description: '전통 한식을 현대적으로 재해석한 맛있는 음식점입니다.'
    },
    {
      id: 2,
      name: '조용한 스터디카페',
      category: 'study',
      subcategory: 'studycafe',
      rating: 4.8,
      distance: '0.5km',
      address: '서울시 강남구 역삼동 234-56',
      phone: '02-2345-6789',
      hours: '24시간',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=200&fit=crop',
      description: '조용하고 깔끔한 환경에서 집중할 수 있는 스터디카페입니다.'
    },
    {
      id: 3,
      name: '이탈리안 레스토랑',
      category: 'restaurant',
      subcategory: 'western',
      rating: 4.3,
      distance: '0.7km',
      address: '서울시 강남구 역삼동 345-67',
      phone: '02-3456-7890',
      hours: '12:00 - 23:00',
      image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=300&h=200&fit=crop',
      description: '정통 이탈리안 요리를 맛볼 수 있는 레스토랑입니다.'
    },
    {
      id: 4,
      name: '게임랜드 PC방',
      category: 'entertainment',
      subcategory: 'pc_room',
      rating: 4.1,
      distance: '0.4km',
      address: '서울시 강남구 역삼동 456-78',
      phone: '02-4567-8901',
      hours: '24시간',
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=300&h=200&fit=crop',
      description: '최신 게임을 즐길 수 있는 깔끔한 PC방입니다.'
    }
  ];

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

  const filteredPlaces = selectedCategory 
    ? places.filter(place => {
        if (selectedCategory.subcategoryId) {
          return place.category === selectedCategory.categoryId && 
                 place.subcategory === selectedCategory.subcategoryId;
        }
        return place.category === selectedCategory.categoryId;
      })
    : places;

  return (
    
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f8f9fa',
      flexDirection: 'column',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>

      <Header />

      {/* ✅ 콘텐츠 부분은 row layout */}
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
      <div style={{
        flex: 1,
        maxWidth: '800px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
      }}>
        {/* 헤더 */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '20px',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
          padding: '30px'
        }}>
          <h1 style={{
            fontSize: '28px',
            fontWeight: '700',
            color: '#333',
            margin: 0,
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <MapPin size={32} />
            강의실 위치
          </h1>
          {selectedCategory && (
            <p style={{
              fontSize: '16px',
              color: '#666',
              margin: '10px 0 0 0'
            }}>
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
          {filteredPlaces.map((place) => (
            <div
              key={place.id}
              style={{
                backgroundColor: 'white',
                borderRadius: '16px',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.15)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.1)';
              }}
              onClick={() => setSelectedPlace(place)}
            >
              <div style={{
                height: '200px',
                backgroundImage: `url(${place.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'relative'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  color: 'white',
                  padding: '4px 8px',
                  borderRadius: '12px',
                  fontSize: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  <Navigation size={12} />
                  {place.distance}
                </div>
              </div>
              
              <div style={{ padding: '20px' }}>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  color: '#333',
                  margin: '0 0 8px 0'
                }}>
                  {place.name}
                </h3>
                
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '12px'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    <Star size={16} fill="#ffc107" color="#ffc107" />
                    <span style={{ fontSize: '14px', fontWeight: '500' }}>{place.rating}</span>
                  </div>
                  <span style={{ color: '#ccc' }}>•</span>
                  <span style={{ fontSize: '14px', color: '#666' }}>{place.address}</span>
                </div>
                
                <p style={{
                  fontSize: '14px',
                  color: '#777',
                  margin: '0 0 12px 0',
                  lineHeight: '1.4'
                }}>
                  {place.description}
                </p>
                
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  fontSize: '12px',
                  color: '#666'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={12} />
                    {place.hours}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Phone size={12} />
                    {place.phone}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredPlaces.length === 0 && (
          <div style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
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
  );
};

export default PlacePage;