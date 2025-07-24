import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ReviewPage from '../../review/ProfileReviewPage';

function UserProfilePage() {
  const { userno } = useParams();
  const [user, setUser] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [showReceived, setShowReceived] = useState(false);

  // 프로필 정보
  useEffect(() => {
    axios.get(`/user/public/detail/${userno}`)
      .then(res => {
        console.log("✅ 응답 데이터 확인:", res.data);
        setUser(res.data)})
      .catch(err => console.error("프로필 조회 실패", err));
  }, [userno]);

  // 작성한 리뷰 목록
  useEffect(() => {
    axios.get(`/user/admin/${userno}/reviews`)
      .then(res => {
        console.log("✅ 리뷰 응답 확인:", res.data.content);
        setReviews(res.data.content); // 🔹 리뷰 리스트만 추출
      })
      .catch(err => console.error("리뷰 조회 실패", err));
  }, [userno]);

  if (!user) return <div>로딩 중...</div>;

  return (
  <div className="max-w-2xl mx-auto mt-10 p-6 border rounded-xl shadow bg-white">
    <img
      src={user.profileImage ? `/uploads/user/${user.profileImage}` : "/default_profile.png"}
      alt="프로필"
      className="w-32 h-32 rounded-full object-cover mx-auto mb-4"
    />
    <h2 className="text-xl text-center font-bold">{user.username}</h2>
    <p className="text-center text-gray-600">{user.name} | {user.email}</p>

    {/* ⭐ 리뷰 컴포넌트 삽입 */}
    {/* <ReviewPage 
        receiverno={user.userno}
        showForm ={false}  // 리뷰 작성 폼
        showReceived ={showReceived}      // 받은 리뷰
        showSummary={!showReceived}    // 리뷰 요약
     /> */}

     {/* 🔘 버튼 토글 */}
      <div className="text-center mt-4">
        {!showReceived ? (
          <button
            onClick={() => setShowReceived(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            리뷰 자세히 보기
          </button>
        ) : (
          <button
            onClick={() => setShowReceived(false)}
            className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
          >
            닫기
          </button>
        )}
        {console.log('받은 리뷰 상태 : ', showReceived)}
      </div>

  </div>
);
}

export default UserProfilePage;
