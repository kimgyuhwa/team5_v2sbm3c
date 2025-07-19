import React from 'react';
import { Search, Calendar, Filter, Plus, X, Check } from 'lucide-react';

// UI를 위한 정적 데이터
const scheduleData = [
    { day: '월요일', time: '09:00:00 ~ 10:30:00', subject: '수학', location: '101호', type: 'occupied' },
    { day: '화요일', time: '11:00:00 ~ 12:30:00', subject: '국어', location: '104호', type: 'occupied' },
    { day: '수요일', time: '09:00:00 ~ 10:30:00', subject: '역사', location: '105호', type: 'occupied' },
    { day: '목요일', time: '11:00:00 ~ 12:30:00', subject: '미술', location: '미술실', type: 'occupied' },
    { day: '금요일', time: '09:00:00 ~ 10:30:00', subject: '컴퓨터', location: '컴퓨터실', type: 'occupied' }
];
const reservations = [
    { day: '수요일', time: '11:00:00 ~ 12:30:00', subject: '영어', location: '102호', type: 'reservation' }
];
const days = ['월요일', '화요일', '수요일', '목요일', '금요일'];
const timeSlots = ['09:00:00 ~ 10:30:00', '11:00:00 ~ 12:30:00'];

// 헬퍼 함수
const isOccupied = (day, time) => {
    return [...scheduleData, ...reservations].some(item => item.day === day && item.time === time);
};

const getScheduleItem = (day, time) => {
    return [...scheduleData, ...reservations].find(item => item.day === day && item.time === time);
};

// 사이드바 UI 컴포넌트
const ScheduleSideBar = () => {
    const categories = [
      { id: null, name: '전체', icon: '📅' },
      { id: '월요일', name: '월요일', icon: '🌙' },
      { id: '화요일', name: '화요일', icon: '🔥' },
      { id: '수요일', name: '수요일', icon: '💧' },
      { id: '목요일', name: '목요일', icon: '🌳' },
      { id: '금요일', name: '금요일', icon: '⭐' }
    ];
    const selectedDay = '수요일'; // 예시로 '수요일' 선택

    return (
      <div style={{
        width: '240px',
        backgroundColor: 'white',
        borderRadius: '16px',
        boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
        padding: '20px',
        height: 'fit-content',
        position: 'sticky',
        top: '30px'
      }}>
        <h2 style={{
          fontSize: '16px',
          fontWeight: '600',
          color: '#333',
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <Filter size={18} />
          요일별 필터
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => alert(`${category.name} 선택됨`)} // 기능 없음을 알림
              style={{
                padding: '8px 12px',
                border: 'none',
                borderRadius: '8px',
                backgroundColor: selectedDay === category.id ? '#007bff' : '#f8f9fa',
                color: selectedDay === category.id ? 'white' : '#333',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: '500',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                textAlign: 'left'
              }}
            >
              <span style={{ fontSize: '14px' }}>{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>
        <div style={{
          marginTop: '20px',
          padding: '16px',
          backgroundColor: '#f8f9fa',
          borderRadius: '10px'
        }}>
          <h3 style={{
            fontSize: '12px',
            fontWeight: '600',
            color: '#666',
            marginBottom: '8px'
          }}>
            📊 통계
          </h3>
          <div style={{ fontSize: '11px', color: '#777', lineHeight: '1.6' }}>
            <div>전체 수업: {scheduleData.length}개</div>
            <div>예약: {reservations.length}개</div>
          </div>
        </div>
      </div>
    );
};

// 메인 시간표 UI 컴포넌트
const WeeklyScheduleUI = () => {
  const selectedDay = null; // 전체 보기
  const showReservationModal = false; // 모달 기본적으로 닫힘

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f8f9fa', 
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' 
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '30px',
        padding: '20px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        
        <ScheduleSideBar />

        <div style={{ flex: 1, maxWidth: '700px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          <div style={{ 
            backgroundColor: 'white', 
            borderRadius: '16px', 
            boxShadow: '0 4px 16px rgba(0,0,0,0.1)', 
            padding: '20px' 
          }}>
            <h1 style={{ 
              fontSize: '22px', 
              fontWeight: '600', 
              color: '#333', 
              margin: 0, 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px',
              marginBottom: '16px'
            }}>
              <Calendar size={24} />
              {selectedDay ? `${selectedDay} ` : ''}시간표 예약
            </h1>

            <div style={{ position: 'relative' }}>
              <Search style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#999',
                zIndex: 1
              }} size={16} />
              <input
                type="text"
                placeholder="과목명이나 장소를 검색하세요..."  
                style={{
                  width: '100%',
                  padding: '12px 16px 12px 40px',
                  border: '2px solid #e1e5e9',
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'border-color 0.3s',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => e.target.style.borderColor = '#007bff'}
                onBlur={(e) => e.target.style.borderColor = '#e1e5e9'}
              />
            </div>
          </div>

          <div style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
            overflow: 'hidden'
          }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={{...}}>
                      시간
                    </th>
                    {days.map(day => (
                      <th key={day} style={{...}}>
                        {day}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {timeSlots.map((time, index) => (
                    <tr key={time} style={{ borderBottom: index < timeSlots.length - 1 ? '1px solid #e1e5e9' : 'none' }}>
                      <td style={{...}}>
                        {time.split(' ~ ')[0]}<br/>~<br/>{time.split(' ~ ')[1]}
                      </td>
                      {days.map(day => {
                        const occupied = isOccupied(day, time);
                        const scheduleItem = getScheduleItem(day, time);
                        const isReservation = scheduleItem?.type === 'reservation';
                        
                        return (
                          <td 
                            key={`${day}-${time}`}
                            style={{
                              padding: '12px 8px',
                              textAlign: 'center',
                              verticalAlign: 'middle',
                              borderLeft: '1px solid #e1e5e9',
                              backgroundColor: occupied 
                                ? (isReservation ? '#28a745' : '#007bff') 
                                : '#f8f9fa',
                              color: occupied ? 'white' : '#6c757d',
                              transition: 'all 0.2s',
                              cursor: 'pointer',
                              position: 'relative'
                            }}
                            onClick={() => alert(`(${day}, ${time}) 클릭됨`)}
                          >
                            {occupied ? (
                              <div>
                                <div style={{ fontSize: '12px', fontWeight: '600', marginBottom: '2px' }}>
                                  {scheduleItem.subject}
                                </div>
                                <div style={{ fontSize: '10px', opacity: 0.9 }}>
                                  {scheduleItem.location}
                                </div>
                                {isReservation && (
                                  <div style={{ position: 'absolute', top: '2px', right: '2px', fontSize: '8px', backgroundColor: 'rgba(255,255,255,0.3)', padding: '1px 4px', borderRadius: '8px' }}>
                                    예약
                                  </div>
                                )}
                              </div>
                            ) : (
                              <div style={{ fontSize: '20px', color: '#007bff', opacity: 0.6 }}>
                                <Plus size={16} />
                              </div>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            padding: '16px'
          }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{ width: '12px', height: '12px', backgroundColor: '#007bff', borderRadius: '3px' }}></div>
                    <span style={{ fontSize: '12px', color: '#666' }}>기존 수업</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{ width: '12px', height: '12px', backgroundColor: '#28a745', borderRadius: '3px' }}></div>
                    <span style={{ fontSize: '12px', color: '#666' }}>예약 완료</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Plus size={12} color="#007bff" />
                    <span style={{ fontSize: '12px', color: '#666' }}>예약 가능</span>
                </div>
            </div>
          </div>
        </div>
      </div>

      {showReservationModal && (
        <div style={{...}}> {/* Modal styles */}
          <div style={{...}}> {/* Modal content styles */}
            {/* Modal content here */}
          </div>
        </div>
      )}
    </div>
  );
};

export default WeeklyScheduleUI;
