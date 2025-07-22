import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import uploadFile from "../../fileupload/FileUpload";
import { GlobalContext } from "../../components/GlobalContext";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ReviewPage from "../../review/ReviewPage";

function TalentDetailPage() {
  const { talentno } = useParams();
  const navigate = useNavigate();
  const { loginUser } = useContext(GlobalContext);

  const [talent, setTalent] = useState(null);
  const [error, setError] = useState(null);
  const [slideIndex, setSlideIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showReport, setShowReport] = useState(false);
  const [reportType, setReportType] = useState("");
  const [reportReason, setReportReason] = useState("");

  const isOwner = loginUser?.userno === talent?.userno;

  useEffect(() => {
    fetch(`/talent/detail/${talentno}`)
      .then((res) => {
        if (!res.ok) throw new Error("서버 오류");
        return res.json();
      })
      .then((data) => setTalent(data))
      .catch((e) => setError(e.message));
  }, [talentno]);

  const uniqueFiles = talent?.fileInfos
    ? [...new Map(talent.fileInfos.map((f) => [f.storedFileName, f])).values()]
    : [];

  const sliderSettings = {
    dots: false,
    arrows: uniqueFiles.length > 1,
    infinite: uniqueFiles.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: (index) => setSlideIndex(index),
  };

  const handleImageClick = (url) => {
    setSelectedImage(url);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  const startChat = async () => {
    if (!loginUser) return alert("로그인이 필요합니다.");
    if (!talent?.userno) return alert("상대방 정보가 없습니다.");
    try {
      const res = await axios.post("/chatroom/findOrCreate", null, {
        params: {
          senderId: loginUser.userno,
          receiverId: talent.userno,
          talentno: talent.talentno,
          title: talent.title,
        },
        withCredentials: true,
      });
      const chatRoomno = res.data.chatRoomno;
      navigate(`/chat/${chatRoomno}`);
    } catch (err) {
      alert("채팅방 오류: " + err.message);
    }
  };

  const deleteTalent = async () => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    try {
      const res = await fetch(`/talent/delete/${talent.talentno}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("삭제 실패");
      alert("삭제 완료");
      navigate("/talent");
    } catch (e) {
      alert("에러: " + e.message);
    }
  };

  const sendRequest = async () => {
    if (!loginUser) return alert("로그인이 필요합니다.");
    const dto = {
      talentno: talent.talentno,
      giverno: loginUser.userno,
      receiverno: talent.userno,
      status: "pending",
      message: "재능 요청합니다.",
    };
    try {
      await fetch("/request/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dto),
      });
      alert("요청 성공!");
    } catch (e) {
      alert("요청 실패: " + e.message);
    }
  };

  const submitReport = async () => {
    if (!loginUser) return alert("로그인이 필요합니다.");
    if (!reportReason.trim()) return alert("신고 사유를 입력하세요.");
    try {
      const res = await axios.post("/reports", {
        reporter: loginUser.userno,
        reported: talent.userno,
        reason: reportReason,
        reportType,
        targetId: talent.talentno,
      });
      if (res.status === 201) {
        alert("신고가 접수되었습니다.");
        setShowReport(false);
        setReportType("");
        setReportReason("");
        navigate("/components/main");
      }
    } catch (e) {
      if (e.response?.status === 409) {
        alert("이미 신고한 대상입니다.");
      } else {
        alert("신고 실패");
      }
    }
  };

  if (error) return <div className="text-center text-red-500">오류: {error}</div>;
  if (!talent) return <div className="text-center text-gray-500">불러오는 중...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-2xl shadow-md mt-10">
      <div className="grid md:grid-cols-2 gap-10">
        <div>
          {uniqueFiles.length === 1 ? (
            <img
              src={`/uploads/talent/${uniqueFiles[0].storedFileName}`}
              alt={uniqueFiles[0].originalFileName}
              onClick={() =>
                handleImageClick(`/uploads/talent/${uniqueFiles[0].storedFileName}`)
              }
              className="w-full h-[350px] object-cover rounded-xl cursor-pointer"
            />
          ) : (
            <>
              <Slider {...sliderSettings}>
                {uniqueFiles.map((file) => (
                  <img
                    key={file.fileno || file.storedFileName}
                    src={`/uploads/talent/${file.storedFileName}`}
                    alt={file.originalFileName}
                    onClick={() =>
                      handleImageClick(`/uploads/talent/${file.storedFileName}`)
                    }
                    className="w-full h-[350px] object-cover rounded-xl cursor-pointer"
                  />
                ))}
              </Slider>
              <div className="text-center mt-2 text-sm text-gray-500">
                {slideIndex + 1} / {uniqueFiles.length}
              </div>
            </>
          )}
        </div>

        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">{talent.title}</h1>
            <div className="text-sm text-gray-500 mb-4">
              {talent.cateGrpName} &gt; {talent.categoryName} • 조회수 {talent.viewCount}
            </div>
            <p className="text-gray-700 mb-6 whitespace-pre-wrap">{talent.description}</p>
          </div>
          <div className="flex gap-3">
            {!isOwner ? (
              <>
                <button className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700" onClick={startChat}>💬 채팅</button>
                <button className="px-4 py-2 bg-red-500 text-white rounded shadow hover:bg-red-600" onClick={() => setShowReport(true)}>🚨 신고</button>
                <button className="px-4 py-2 bg-green-600 text-white rounded shadow hover:bg-green-700" onClick={sendRequest}>📩 요청</button>
              </>
            ) : (
              <>
                <button className="px-4 py-2 bg-gray-300 text-black rounded shadow hover:bg-gray-400" onClick={() => navigate(`/talent/edit/${talent.talentno}`)}>✏️ 수정</button>
                <button className="px-4 py-2 bg-gray-300 text-black rounded shadow hover:bg-gray-400" onClick={deleteTalent}>🗑️ 삭제</button>
              </>
            )}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <img src={selectedImage} className="max-w-[90vw] max-h-[90vh] rounded shadow-lg" alt="상세 보기" />
          <button onClick={closeModal} className="absolute top-4 right-4 text-white text-xl">✕</button>
        </div>
      )}

      {showReport && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
          <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg relative">
            <h3 className="text-lg font-bold mb-4">🚨 신고하기</h3>
            <label className="block mb-2 font-semibold">신고 유형</label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-4"
            >
              <option value="">-- 선택하세요 --</option>
              <option value="욕설/비방">욕설/비방</option>
              <option value="광고/홍보">광고/홍보</option>
              <option value="음란/선정성">음란/선정성</option>
              <option value="사기/허위">사기/허위</option>
              <option value="중복/도배">중복/도배</option>
              <option value="기타">기타</option>
            </select>
            <label className="block mb-2 font-semibold">신고 사유</label>
            <textarea
              value={reportReason}
              onChange={(e) => setReportReason(e.target.value)}
              rows="5"
              placeholder="신고 사유를 입력하세요."
              className="w-full border border-gray-300 rounded p-2 mb-4"
            />
            <div className="flex justify-end gap-2">
              <button className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500" onClick={() => setShowReport(false)}>취소</button>
              <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700" onClick={submitReport}>제출</button>
            </div>
            <button onClick={() => setShowReport(false)} className="absolute top-2 right-2 text-xl">✕</button>
          </div>
        </div>
      )}

      <div className="mt-10">
        <ReviewPage receiverno={talent?.userno} />
      </div>
    </div>
  );
}

export default TalentDetailPage;
