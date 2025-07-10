// import React, { useEffect, useState } from "react";


// const PlacesList = () => {
//   const [places, setPlaces] = useState([]);
//   const [selectedPlace, setSelectedPlace] = useState(null);
//   const [schoolGwanNo, setSchoolGwanNo] = useState(61);  // 이건 고르는거 안해서 하드코딩햇음
//   const API_BASE = "/places";

//   // 특정 학교관 번호로 강의실 목록 조회
//   const fetchPlaces = async () => {
//     try {
//       const res = await fetch(`${API_BASE}/schoolgwan/${schoolGwanNo}`);
//       const data = await res.json();
//       setPlaces(data);
//     } catch (err) {
//       console.error("강의실 목록 불러오기 실패:", err);
//     }
//   };

//   // 상세 강의실 보기
//   const fetchPlaceDetail = async (placeno) => {
//     try {
//       const res = await fetch(`${API_BASE}/${placeno}`);
//       const data = await res.json();
//       setSelectedPlace(data);
//     } catch (err) {
//       console.error("강의실 상세 정보 불러오기 실패", err);
//     }
//   };

//   useEffect(() => {
//     fetchPlaces();
//   }, []);

//   return (
//     <div className="p-6 max-w-3xl mx-auto">
//       <h2 className="text-2xl font-bold mb-4">🏫 강의실 목록</h2>

//       <ul className="space-y-3 mb-6">
//         {places.map((place) => (
//           <li key={place.placeno} className="border p-3 rounded-md shadow-sm">
//             <p><strong>강의실 이름:</strong> {place.placename}</p>
//             <p><strong>호수:</strong> {place.hosu}</p>
//             <button
//               onClick={() => fetchPlaceDetail(place.placeno)}
//               className="mt-2 text-blue-500 underline"
//             >
//               상세 보기
//             </button>
//           </li>
//         ))}
//       </ul>

//       {/* 선택된 강의실 상세 */}
//       {selectedPlace && (
//         <div className="border-t pt-4 mt-4">
//           <h3 className="text-xl font-semibold mb-2">📘 강의실 상세 정보</h3>
//           <p><strong>강의실 번호:</strong> {selectedPlace.placeno}</p>
//           <p><strong>이름:</strong> {selectedPlace.placename}</p>
//           <p><strong>호수:</strong> {selectedPlace.hosu}</p>
//           <p><strong>시작 시간:</strong> {selectedPlace.start_time}</p>
//           <p><strong>종료 시간:</strong> {selectedPlace.end_time}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PlacesList;
