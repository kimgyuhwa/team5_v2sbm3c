import React, { useContext,useEffect, useState } from 'react';
import axios from 'axios';
import { GlobalContext } from '../components/GlobalContext';
const ReviewPage = ({receiverno}) => {
  const {userno: giverno} = useContext(GlobalContext);
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

  return (
    <div className="p-6 mt-10 border-t border-gray-300">
      <h2 className="text-lg font-semibold mt-10 mb-2 text-gray-800">✏️ 리뷰 작성</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="number"
          placeholder="평점 (1~5)"
          min={1}
          max={5}
          className="border p-2 w-full rounded"
          value={form.rating}
          onChange={(e) => setForm({ ...form, rating: e.target.value })}
          required
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

      <h2 className="text-xl font-bold mb-4 text-gray-800">💬 받은 리뷰</h2>
      {receivedReviews.length === 0 ? (
        <p className="text-gray-500">아직 등록된 리뷰가 없습니다.</p>
      ) : (
        <ul className="space-y-4">
          {receivedReviews.map((r) => (
            <li key={r.reviewno} className="p-4 border rounded-lg bg-gray-50 shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">작성자 ID: {r.givername}</span><br/>
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
