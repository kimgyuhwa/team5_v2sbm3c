import React, { useContext,useEffect, useState } from "react";
import { GlobalContext } from "../components/GlobalContext";

const ReservationsManager = () => {
  const { userno } = useContext(GlobalContext);
  const { loginUser } = useContext(GlobalContext);
  console.log("reservation: " +  loginUser)
  const [reservations, setReservations] = useState([]);
  const [form, setForm] = useState({
    userno: "",
    placeno: "",
    start_time: "",
    end_time: "",
    placesinfo: "",
    status: "예약완료"
  });

  const API_BASE = "/reservations";

  // 전체 예약 조회
  const fetchReservations = async () => {
    const res = await fetch(API_BASE);
    const data = await res.json();
    setReservations(data);
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  // 입력 값 핸들링
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 예약 등록
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(API_BASE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    if (res.ok) {
      alert("예약 완료!");
      setForm({
        userno: "",
        placeno: "",
        start_time: "",
        end_time: "",
        placesinfo: "",
        status: "예약완료"
      });
      fetchReservations();
    }
  };

  // 예약 삭제
  const deleteReservation = async (id) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
    fetchReservations();
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">📅 예약 관리</h2>

      {/* 예약 등록 폼 */}
      <form onSubmit={handleSubmit} className="space-y-3 mb-8 border p-4 rounded-lg shadow">
        <div>
          <label>유저번호:</label>
          <input type="number" name="userno" value={form.userno} onChange={handleChange} className="border ml-2 px-2" required />
        </div>
        <div>
          <label>장소번호:</label>
          <input type="number" name="placeno" value={form.placeno} onChange={handleChange} className="border ml-2 px-2" required />
        </div>
        <div>
          <label>시작시간:</label>
          <input type="datetime-local" name="start_time" value={form.start_time} onChange={handleChange} className="border ml-2 px-2" required />
        </div>
        <div>
          <label>종료시간:</label>
          <input type="datetime-local" name="end_time" value={form.end_time} onChange={handleChange} className="border ml-2 px-2" required />
        </div>
        <div>
          <label>장소정보:</label>
          <input type="text" name="placesinfo" value={form.placesinfo} onChange={handleChange} className="border ml-2 px-2" />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-3 py-1 rounded">예약하기</button>
      </form>

      {/* 예약 목록 */}
      <div>
        <h3 className="font-semibold mb-2">예약 목록</h3>
        <ul className="space-y-2">
          {reservations.map((r) => (
            <li key={r.reservationno} className="border p-3 rounded-md">
              <p><strong>유저번호:</strong> {r.userno}</p>
              <p><strong>장소번호:</strong> {r.placeno}</p>
              <p><strong>시작시간:</strong> {r.start_time}</p>
              <p><strong>종료시간:</strong> {r.end_time}</p>
              <p><strong>장소정보:</strong> {r.placesinfo}</p>
              <p><strong>상태:</strong> {r.status}</p>
              <button onClick={() => deleteReservation(r.reservationno)} className="text-red-500 mt-1">삭제</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ReservationsManager;
