import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../style/TalentDetail.css';
import ReviewPage from '../../review/ReviewPage';
function TalentDetailPage() {
  const { talentno } = useParams();
  const [talent, setTalent] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`/talent/detail/${talentno}`)
      .then((res) => {
        if (!res.ok) throw new Error('서버 오류');
        return res.json();
      })
    //   .then(setTalent)
    //   .catch((e) => setError(e.message));
     .then((data) => {
      console.log("서버에서 받은 talent 데이터:", data); // 👈 이거 추가
      setTalent(data);
    })
  }, [talentno]);
  console.log(talent);
  if (error) return <div className="error-message">오류: {error}</div>;
  if (!talent) return <div className="loading-message">불러오는 중...</div>;

  return (
    <div className="talent-detail-box">
      <h2 className="talent-title">{talent.title}</h2>

      <div className="talent-info">
        <p><strong>설명:</strong> {talent.description}</p>
        <p><strong>작성자:</strong> {talent.userName}</p>
        <p><strong>타입:</strong> {talent.typeName}</p>
        <p><strong>카테고리:</strong> {talent.categoryName}</p>
        <p><strong>작성일:</strong> {talent.createdAt}</p>
        <p><strong>수정일:</strong> {talent.updatedAt}</p>
      </div>
        {console.log(talent)}
      {talent.fileInfos && (
        <div className="talent-images">
          {talent.fileInfos.map((file) => (
            <img
            key={file.fileno}
            src={`/uploads/talent/${file.storedFileName}`}
            alt={file.originalFileName}
            className="talent-image"
            />
          ))}
        </div>
      )}
      <ReviewPage receiverno={talent?.userno}/>
    </div>
    
  );
}

export default TalentDetailPage;
