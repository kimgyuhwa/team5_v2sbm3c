import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ReviewPage = ({ userno }) => {
  const [receivedReviews, setReceivedReviews] = useState([]);
  const [givenReviews, setGivenReviews] = useState([]);
  const [form, setForm] = useState({
    receiver: '',
    rating: '',
    comments: ''
  });

  // 받은 리뷰 가져오기
  const fetchReceived = async () => {
    const res = await axios.get(`/reviews/receiver/${userno}`);
    setReceivedReviews(res.data);
  };

  // 작성한 리뷰 가져오기
  const fetchGiven = async () => {
    const res = await axios.get(`/reviews/giver/${userno}`);
    setGivenReviews(res.data);
  };

  // 리뷰 작성
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      giver: userno,
      receiver: parseInt(form.receiver),
      rating: parseInt(form.rating),
      comments: form.comments
    };
    await axios.post('/reviews', data);
    setForm({ receiver: '', rating: '', comments: '' });
    fetchGiven();
  };

  useEffect(() => {
    fetchReceived();
    fetchGiven();
  }, [userno]);

  return (
    <div className="p-4 max-w-3xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold">내가 받은 리뷰</h2>
      <ul className="space-y-2">
        {receivedReviews.map((r) => (
          <li key={r.reviewno} className="p-2 border rounded shadow-sm">
            <strong>작성자 ID:</strong> {r.giver} <br />
            <strong>평점:</strong> {r.rating}점 <br />
            <strong>내용:</strong> {r.comments} <br />
            <small>{r.createdAt}</small>
          </li>
        ))}
      </ul>

      <h2 className="text-2xl font-bold mt-8">내가 작성한 리뷰</h2>
      <ul className="space-y-2">
        {givenReviews.map((r) => (
          <li key={r.reviewno} className="p-2 border rounded shadow-sm">
            <strong>대상 ID:</strong> {r.receiver} <br />
            <strong>평점:</strong> {r.rating}점 <br />
            <strong>내용:</strong> {r.comments} <br />
            <small>{r.createdAt}</small>
          </li>
        ))}
      </ul>

      <h2 className="text-xl font-semibold mt-10">리뷰 작성</h2>
      <form onSubmit={handleSubmit} className="space-y-2">
        <input
          type="number"
          placeholder="리뷰 대상자 ID"
          className="border p-2 w-full"
          value={form.receiver}
          onChange={(e) => setForm({ ...form, receiver: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="평점 (1~5)"
          className="border p-2 w-full"
          value={form.rating}
          onChange={(e) => setForm({ ...form, rating: e.target.value })}
          required
        />
        <textarea
          placeholder="코멘트"
          className="border p-2 w-full"
          rows={4}
          value={form.comments}
          onChange={(e) => setForm({ ...form, comments: e.target.value })}
          required
        ></textarea>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          리뷰 작성
        </button>
      </form>
    </div>
  );
};

export default ReviewPage;
