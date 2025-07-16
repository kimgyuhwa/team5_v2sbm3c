import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { X, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../components/GlobalContext';

function PlaceDetailPage() {
  const { placeno } = useParams();
  const [place, setPlace] = useState(null);
  const [schedules, setSchedules] = useState([]);
  const [reservations, setReservations] = useState([]); // For other user reservations
  const [activeTab, setActiveTab] = useState('timetable');
  const [showReservationPopup, setShowReservationPopup] = useState(false);
  const [reservationDetails, setReservationDetails] = useState({
    date: new Date().toISOString().split('T')[0],
    startTime: '09:00',
    endTime: '10:00',
    purpose: ''
  });
  const navigate = useNavigate();

  const { loginUser } = useContext(GlobalContext);

  const timeToMinutes = (timeStr) => {
    const [h, m] = timeStr.split(':').map(Number);
    return h * 60 + m;
  };

  useEffect(() => {
    axios.get(`/places/${placeno}`)
      .then(res => setPlace(res.data))
      .catch(err => console.error('장소 정보 로딩 실패', err));

    axios.get(`/class-schedule/by-place/${placeno}`)
      .then(res => setSchedules(res.data))
      .catch(err => console.error('스케줄 로딩 실패', err));

    // Mock fetching other reservations - replace with actual API call
    // setReservations([...]); 
  }, [placeno]);

  const getStatus = (day, hour) => {
    const slotStart = hour * 60;
    const slotEnd = (hour + 1) * 60;

    for (const schedule of schedules) {
      if (schedule.day !== day) continue;

      const scheduleStart = timeToMinutes(schedule.startTime);
      const scheduleEnd = timeToMinutes(schedule.endTime);

      if (Math.max(slotStart, scheduleStart) < Math.min(slotEnd, scheduleEnd)) {
        return { status: 'existing', schedule };
      }

      if ((scheduleStart > slotStart && scheduleStart < slotEnd + 30) || (scheduleEnd > slotStart - 30 && scheduleEnd < slotEnd)) {
         if(scheduleStart-slotEnd < 30 && scheduleStart-slotEnd > 0) return { status: 'blocked' };
         if(slotStart-scheduleEnd < 30 && slotStart-scheduleEnd > 0) return { status: 'blocked' };
      }
    }

    return { status: 'available' };
  };

  const isTimeSlotBlocked = (date, time) => {
    const dayMap = ['일', '월', '화', '수', '목', '금', '토'];
    const selectedDay = dayMap[new Date(date).getDay()];
    const slotStart = timeToMinutes(time);
    const slotEnd = slotStart + 30;

    // Check against class schedules with a 30-min buffer
    for (const schedule of schedules) {
        if (schedule.day !== selectedDay) continue;
        const scheduleStart = timeToMinutes(schedule.startTime) - 30;
        const scheduleEnd = timeToMinutes(schedule.endTime) + 30;
        if (Math.max(slotStart, scheduleStart) < Math.min(slotEnd, scheduleEnd)) {
            return true;
        }
    }

    // Check against other reservations without a buffer
    for (const reservation of reservations) {
        if (reservation.date !== date) continue;
        const reservationStart = timeToMinutes(reservation.startTime);
        const reservationEnd = timeToMinutes(reservation.endTime);
        if (Math.max(slotStart, reservationStart) < Math.min(slotEnd, reservationEnd)) {
            return true;
        }
    }

    return false;
  };

  if (!place) return <div>로딩 중...</div>;

  const handleReservationChange = (e) => {
    const { name, value } = e.target;
    setReservationDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleReservation = () => {
    const dayMap = ['일', '월', '화', '수', '목', '금', '토'];
    const selectedDay = dayMap[new Date(reservationDetails.date).getDay()];
    const reservationStart = timeToMinutes(reservationDetails.startTime);
    const reservationEnd = timeToMinutes(reservationDetails.endTime);

    if (reservationStart >= reservationEnd) {
      alert('종료 시간은 시작 시간보다 늦어야 합니다.');
      return;
    }

    if (!reservationDetails.purpose || reservationDetails.purpose.trim() === '') {
      alert('예약 목적을 반드시 입력해야 합니다.');
      return;
    }

    // Check against class schedules with buffer
    const scheduleConflict = schedules.find(schedule => {
      if (schedule.day !== selectedDay) return false;
      const scheduleStart = timeToMinutes(schedule.startTime) - 30;
      const scheduleEnd = timeToMinutes(schedule.endTime) + 30;
      return Math.max(reservationStart, scheduleStart) < Math.min(reservationEnd, scheduleEnd);
    });

    if (scheduleConflict) {
      alert('선택하신 시간은 기존 수업 시간과 30분 이상 떨어져 있어야 합니다.');
      return;
    }

    // Check against other reservations without buffer
    const reservationConflict = reservations.find(r => {
        if (r.date !== reservationDetails.date) return false;
        const existingStart = timeToMinutes(r.startTime);
        const existingEnd = timeToMinutes(r.endTime);
        return Math.max(reservationStart, existingStart) < Math.min(reservationEnd, existingEnd);
    });

    if (reservationConflict) {
        alert('선택하신 시간에 이미 다른 예약이 있습니다.');
        return;
    }

    console.log("Reservation confirmed:", reservationDetails);
    setShowReservationPopup(false);
  };

  const timeOptions = Array.from({ length: (22 - 9) * 2 + 1 }, (_, i) => {
    const totalMinutes = 9 * 60 + i * 30;
    const hour = Math.floor(totalMinutes / 60);
    const minute = totalMinutes % 60;
    return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
  });

  const startTimeOptions = timeOptions.slice(0, -1);
  const endTimeOptions = timeOptions;

  const renderTimetable = () => (
    <>
      {/* 시간표 그리드 */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        boxShadow: '0 4px 16px rgba(0,0,0,0.05)',
        border: '1px solid #e9ecef',
        overflow: 'hidden'
      }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{
                  backgroundColor: '#f8f9fa',
                  color: '#495057',
                  padding: '8px 4px',
                  fontWeight: '600',
                  fontSize: '11px',
                  minWidth: '60px',
                  textAlign: 'center'
                }}>
                  시간
                </th>
                {['월', '화', '수', '목', '금'].map(day => (
                  <th 
                    key={day}
                    style={{
                      backgroundColor: '#f8f9fa',
                      color: '#495057',
                      padding: '8px 4px',
                      fontWeight: '600',
                      fontSize: '11px',
                      minWidth: '80px',
                      textAlign: 'center',
                      borderLeft: '1px solid #e9ecef'
                    }}
                  >
                    {day}요일
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 13 }, (_, i) => i + 9).map(hour => (
                <tr key={hour} style={{ borderBottom: '1px solid #e9ecef' }}>
                  <td style={{
                    backgroundColor: '#f8f9fa',
                    padding: '8px 4px',
                    fontWeight: '500',
                    fontSize: '10px',
                    color: '#495057',
                    textAlign: 'center',
                    verticalAlign: 'middle'
                  }}>
                    {`${hour.toString().padStart(2, '0')}:00`}
                  </td>
                  {['월', '화', '수', '목', '금'].map(day => {
                    const { status, schedule } = getStatus(day, hour);

                    const getCellStyle = () => {
                      let style = {
                        padding: '8px 4px',
                        textAlign: 'center',
                        verticalAlign: 'middle',
                        borderLeft: '1px solid #e9ecef',
                        transition: 'all 0.2s',
                        position: 'relative',
                        height: '36px'
                      };
                      switch (status) {
                        case 'existing':
                          return { ...style, backgroundColor: '#007bff', color: 'white' };
                        case 'blocked':
                          return { ...style, backgroundColor: '#e9ecef', color: '#adb5bd' };
                        default: // available
                          return { ...style, backgroundColor: '#fff' };
                      }
                    };

                    return (
                      <td key={`${day}-${hour}`} style={getCellStyle()}>
                        {status === 'existing' && schedule && (
                          <div>
                            <div style={{ fontSize: '11px', fontWeight: '600' }}>{schedule.subject}</div>
                            <div style={{ fontSize: '9px', opacity: 0.9 }}>{place.hosu}</div>
                          </div>
                        )}
                        {status === 'blocked' && (
                           <X size={14} />
                        )}
                        {status === 'available' && (
                          <>
                          </>
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

      {/* 범례 */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '12px',
        marginTop: '16px'
      }}>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '16px',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '12px', height: '12px', backgroundColor: '#007bff', borderRadius: '3px' }}></div>
            <span style={{ fontSize: '11px', color: '#666' }}>기존 수업</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
             <div style={{ width: '12px', height: '12px', backgroundColor: '#e9ecef', borderRadius: '3px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><X size={10} color="#6c757d" /></div>
            <span style={{ fontSize: '11px', color: '#666' }}>예약 불가</span>
          </div>
        </div>
      </div>
    </>
  );

  const renderNotes = () => (
    <div style={{ padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '12px' }}>
      <h3 style={{ marginTop: 0, fontSize: '16px', fontWeight: 600 }}>강의실 사용 유의사항</h3>
      <ul style={{ paddingLeft: '20px', fontSize: '14px', lineHeight: 1.8, color: '#495057' }}>
        <li>강의실 사용 후에는 다음 사용자를 위해 깨끗하게 정리정돈을 해주시기 바랍니다.</li>
        <li>음식물 반입은 절대 금지입니다. (음료는 가능)</li>
        <li>기자재 사용에 각별히 주의해주시고, 파손 시 즉시 관리자에게 알려주시기 바랍니다.</li>
        <li>예약 시간은 30분 전후부터 예약 가능하며, 반드시 준수해주시기 바랍니다.</li>
        <li>사용 후 모든 전원은 반드시 꺼주시기 바랍니다.</li>
      </ul>
    </div>
  );

  const renderReservationPopup = () => {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000
      }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '24px',
          width: '450px',
          maxWidth: '90vw'
        }}>
          <h3 style={{ marginTop: 0, fontSize: '18px', fontWeight: 600 }}>강의실 예약</h3>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, marginBottom: '8px' }}>날짜</label>
            <input type="date" name="date" value={reservationDetails.date} onChange={handleReservationChange} style={inputStyle} />
          </div>
          <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, marginBottom: '8px' }}>시작 시간</label>
              <select name="startTime" value={reservationDetails.startTime} onChange={handleReservationChange} style={inputStyle}>
                {startTimeOptions.map(time => {
                  const isDisabled = isTimeSlotBlocked(reservationDetails.date, time);
                  return <option key={time} value={time} disabled={isDisabled} style={{ color: isDisabled ? '#adb5bd' : '#000' }}>{time}</option>
                })}
              </select>
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, marginBottom: '8px' }}>종료 시간</label>
              <select name="endTime" value={reservationDetails.endTime} onChange={handleReservationChange} style={inputStyle}>
                {endTimeOptions.map(time => {
                  const isDisabled = isTimeSlotBlocked(reservationDetails.date, time) || timeToMinutes(time) <= timeToMinutes(reservationDetails.startTime);
                  return <option key={time} value={time} disabled={isDisabled} style={{ color: isDisabled ? '#adb5bd' : '#000' }}>{time}</option>
                })}
              </select>
            </div>
          </div>
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, marginBottom: '8px' }}>예약 목적</label>
            <textarea name="purpose" value={reservationDetails.purpose} onChange={handleReservationChange} placeholder="예약 목적을 입력하세요." style={{ ...inputStyle, height: '80px' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
            <button onClick={() => setShowReservationPopup(false)} style={{ ...buttonStyle, backgroundColor: '#6c757d', margin: 0 }}>취소</button>
            <button onClick={handleReservation} style={{...buttonStyle, margin: 0}}>예약</button>
          </div>
        </div>
      </div>
    )
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'white', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '50px',
        padding: '20px',
        maxWidth: '1200px',
        margin: '0 auto',
        alignItems: 'flex-start'
      }}>
        {/* Main Content */}
        <div style={{ flex: 1, maxWidth: '750px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <p style={{
            fontSize:'24px', marginTop:'40px', textAlign: 'left', fontWeight: '600'
          }}>
            {loginUser?.schoolname}  강의실
          </p>
          
          {/* 그림 */}
          <div style={{
            height: '400px', 
            backgroundColor:'#f0f0f0', 
            borderRadius: '12px'
          }}>
          </div>
          
          {/* 탭 메뉴 */}
          <div style={{ display: 'flex', borderBottom: '2px solid #e9ecef' }}>
            <button 
              onClick={() => setActiveTab('timetable')}
              style={{
                padding: '10px 20px',
                border: 'none',
                backgroundColor: 'transparent',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: activeTab === 'timetable' ? '600' : '500',
                color: activeTab === 'timetable' ? '#007bff' : '#495057',
                borderBottom: activeTab === 'timetable' ? '2px solid #007bff' : 'none',
                marginBottom: '-2px'
              }}
            >
              강의실 시간표
            </button>
            <button 
              onClick={() => setActiveTab('notes')}
              style={{
                padding: '10px 20px',
                border: 'none',
                backgroundColor: 'transparent',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: activeTab === 'notes' ? '600' : '500',
                color: activeTab === 'notes' ? '#007bff' : '#495057',
                borderBottom: activeTab === 'notes' ? '2px solid #007bff' : 'none',
                marginBottom: '-2px'
              }}
            >
              유의사항
            </button>
          </div>

          {/* 탭 컨텐츠 */}
          <div style={{ marginTop: '20px' }}>
            {activeTab === 'timetable' ? renderTimetable() : renderNotes()}
          </div>

        </div>

        {/* Sidebar */}
        <div style={{
          width: '320px',
          position: 'sticky',
          alignItems: 'center',
          justifyContent: 'center',
          top: '40px'
        }}>
          <div style={{
            border: '1px solid #e9ecef',
            borderRadius: '12px',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}>
            <h3 style={{ marginTop: 0, fontSize: '18px', fontWeight: 600 }}>{place.placename}</h3>
            <p style={{ fontSize: '14px', color: '#495057', marginBottom: '24px' }}>{place.hosu}</p>
            <button style={buttonStyle} onClick={() => navigate('/place/PlacesPage')}>돌아가기</button>
            <button style={{...buttonStyle, marginTop: '10px'}} onClick={() => setShowReservationPopup(true)}>예약하기</button>
          </div>
        </div>
      </div>
      {showReservationPopup && renderReservationPopup()}
    </div>
  );
}

export default PlaceDetailPage;

const buttonStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  backgroundColor: '#007bff',
  color: 'white',
  padding: '12px 20px',
  border: 'none',
  borderRadius: '10px',
  fontSize: '16px',
  fontWeight: '600',
  cursor: 'pointer',
  transition: 'background-color 0.3s',
  outline: 'none',
  width: '80%',
  margin: '0 auto'
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  border: '1px solid #ced4da',
  borderRadius: '8px',
  fontSize: '14px',
  boxSizing: 'border-box'
};