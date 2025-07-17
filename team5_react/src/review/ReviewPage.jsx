import React, { useContext,useEffect, useState } from 'react';
import { FaStar } from "react-icons/fa";
import axios from 'axios';
import { GlobalContext } from '../components/GlobalContext';
const ReviewPage = ({receiverno}) => {
  const {userno: giverno, loginUser} = useContext(GlobalContext);
  const [receivedReviews, setReceivedReviews] = useState([]);
  const [givenReviews, setGivenReviews] = useState([]);
  const [receivedPage, setReceivedPage] = useState(0); // 현재 페이지
  const [receivedTotalPages, setReceivedTotalPages] = useState(0); // 총 페이지 수
  const [form, setForm] = useState({
    receiver: receiverno,
    rating: '',
    comments: ''
  });

  console.log(giverno)
  console.log(loginUser?.name)
  const context = useContext(GlobalContext);
console.log('GlobalContext:', context);

  // 받은 리뷰 가져오기
  // const fetchReceived = async () => {
  //   const res = await axios.get(`/reviews/receiver/${receiverno}`);
  //   setReceivedReviews(res.data);
  // };
  const fetchReceived = async (page = 0) => {
  const res = await axios.get(`/reviews/receiver/${receiverno}`, {
    params: { page, size: 3},
  });
  setReceivedReviews(res.data);
  setReceivedTotalPages(res.data.totalPages);
  setReceivedPage(res.data.number);
};

  // 작성한 리뷰 가져오기
  const fetchGiven = async () => {
    const res = await axios.get(`/reviews/giver/${giverno}`);
    setGivenReviews(res.data);
  };

  // 리뷰 작성
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      giver: giverno,
      givername: loginUser?.username,
      receiver: parseInt(form.receiver),
      rating: parseInt(form.rating),
      comments: form.comments
    };
    await axios.post('/reviews', data);
    setForm({ receiver: '', rating: '', comments: '' });
    fetchGiven();
  };
  //props받을떄 {receiverno} 괄호안하니까 객체로받아버림 ㄷㄷ
  //console.log("receiverUserno:", receiverno); 
  useEffect(() => {
    fetchReceived();
    fetchGiven();
  }, [giverno]);

  // 리뷰 평점 평균,  이제 ai로 리뷰 데이터해서 리뷰요약들 해야됨
  const avg =
    receivedReviews.length > 0
      ? (
          receivedReviews.reduce((sum, r) => sum + r.rating, 0) /
          receivedReviews.length
        ).toFixed(1) // 소수 1자리
      : null;

  const renderStars = (score) => {
  const max = 5;
  const filled = '★'.repeat(score); // 채워진 별
  const empty = '☆'.repeat(max - score); // 빈 별
  return (
    <span className="text-yellow-500 text-lg">
      {filled}
      <span className="text-gray-300">{empty}</span>
    </span>
  );
};

const StarRatingInput = ({ rating, setRating }) => {
  return (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <FaStar
          key={star}
          size={30}
          className={`cursor-pointer ${
            rating >= star ? "text-yellow-400" : "text-gray-300"
          }`}
          onClick={() => setRating(star)}
        />
      ))}
    </div>
  );
};

/* ----------------- 1. 이름 마스킹 함수 ----------------- */
const maskName = (name = "") => {
  if (name.length <= 1) return name;           // 한 글자짜리는 그대로
  return name[0] + "*".repeat(name.length - 1);
};
console.log(receivedReviews)

  return (
    <div className="p-6 mt-10 border-t border-gray-300">
      {/* 평균 평점 표시 */}
      {avg && (
        <div className="mb-4 text-xl font-semibold text-yellow-600">
          ⭐ 평균 평점: {avg} / 5
        </div>
      )}

      {/* ✏️ 리뷰 작성 — 나 자신(글쓴이)에게는 숨김 */}
    {giverno !== receiverno && (
      <>
        <h2 className="text-lg font-semibold mb-2">✏️ 리뷰 작성</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <StarRatingInput
            rating={form.rating}
            setRating={(val) => setForm({ ...form, rating: val })}
          />
          <textarea
            placeholder="코멘트 입력"
            className="border p-2 w-full rounded"
            rows={4}
            value={form.comments}
            onChange={(e) => setForm({ ...form, comments: e.target.value })}
            required
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            리뷰 등록
          </button>
        </form>
      </>
    )}

      <h2 className="text-xl font-bold mb-4 text-gray-800">💬 받은 리뷰</h2>
      {receivedReviews.length === 0 ? (
        <p className="text-gray-500">아직 등록된 리뷰가 없습니다.</p>
      ) : (
        <ul className="space-y-4">
          {receivedReviews.map((r) => (
            <li key={r.reviewno} className="p-4 border rounded-lg bg-gray-50 shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">작성자: {maskName(r.givername)}</span><br/>
                <span className="text-yellow-500 font-semibold">{renderStars(r.rating)} {r.rating}점</span>
              </div>
              <p className="text-gray-700">{r.comments}</p>
              <div className="text-xs text-gray-400 mt-2">{new Date(r.createdAt).toLocaleTimeString('ko-KR', {
          hour: '2-digit',
          minute: '2-digit',
        })}</div>
            </li>
          ))}
        </ul>
      )}

      
    </div>
  );
};

export default ReviewPage;
