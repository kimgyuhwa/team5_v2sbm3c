import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PlaceDetail = () => {
  const { placeno } = useParams();
  const [place, setPlace] = useState(null);

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const response = await axios.get(`/places/${placeno}`);
        setPlace(response.data);
      } catch (err) {
        console.error('장소 불러오기 실패', err);
      }
    };

    if (placeno) {
      fetchPlace();
    }
  }, [placeno]);

  if (!place) {
    return <div>로딩 중...</div>;
  }

  return (
    <div style={{ padding: '40px' }}>
      <h1>{place.placename}</h1>
      {/*<p>{place.description}</p>
      <p>주소: {place.address}</p>
      <p>시간: {place.start_time} ~ {place.end_time}</p>*/}

      <div className="text-xs text-gray-400"> {new Date(place.start_time).toLocaleTimeString('ko-KR', {
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      })}</div>
      ~
      <div className="text-xs text-gray-400"> {new Date(place.end_time).toLocaleTimeString('ko-KR', {
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      })}</div>
    </div>
  );
};

export default PlaceDetail;
