import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import uploadFile from '../../fileupload/FileUpload';
import { GlobalContext } from '../../components/GlobalContext';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function TalentDetailPage() {
  const { talentno } = useParams();
  const navigate = useNavigate();
  const { loginUser } = useContext(GlobalContext);

  const [talent, setTalent] = useState(null);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [typeList, setTypeList] = useState([]);
  const [cateGrpList, setCateGrpList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [slideIndex, setSlideIndex] = useState(0);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);


  const isOwner = loginUser?.userno && talent?.userno && loginUser.userno === talent.userno;

  // 1️⃣ 데이터 가져오기
  useEffect(() => {
    fetch(`/talent/detail/${talentno}`)
      .then((res) => {
        if (!res.ok) throw new Error('서버 오류');
        return res.json();
      })
      .then((data) => setTalent(data))
      .catch((e) => setError(e.message));
  }, [talentno]);

//   useEffect(() => {
//   console.log("로그인 사용자:", loginUser?.userno);
//   console.log("게시물 작성자:", talent?.userno);
//   console.log("isOwner:", isOwner);
// }, [talent, loginUser]);

  useEffect(() => {
    fetch('/talent_type/list').then(res => res.json()).then(data => setTypeList(data.content || []));
    fetch('/talent_cate_grp/list').then(res => res.json()).then(data => setCateGrpList(data.content || []));
  }, []);

  useEffect(() => {
    if (editForm.cateGrpno) {
      fetch(`/talent_category/list-by-categrp/${editForm.cateGrpno}`)
        .then(res => res.json())
        .then(data => setCategoryList(data));
    } else {
      setCategoryList([]);
    }
  }, [editForm.cateGrpno]);

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  
  // 2️⃣ 수정 폼 관련
  const startEdit = () => {
    setEditMode(true);
    setEditForm({
      title: talent.title,
      description: talent.description,
      typeno: talent.typeno || talent.type,
      cateGrpno: talent.cateGrpno,
      categoryno: talent.categoryno || talent.category,
    });
  };

  const cancelEdit = () => {
    setEditMode(false);
    setEditForm({});
    setSelectedFiles([]);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setSelectedFiles(Array.from(e.target.files));
  };

  const submitEdit = async () => {
    try {
      let uploadedFileData = [];
      if (selectedFiles.length > 0) {
        uploadedFileData = await uploadFile(selectedFiles, 'talent', talent.talentno, loginUser.profile);
      }

      const dto = {
        talentno: talent.talentno,
        title: editForm.title,
        description: editForm.description,
        typeno: Number(editForm.typeno),
        categoryno: Number(editForm.categoryno),
        fileInfos: uploadedFileData,
      };

      const res = await fetch('/talent/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dto),
      });

      if (!res.ok) throw new Error('수정 실패');

      alert('수정 성공!');
      setEditMode(false);
      setEditForm({});
      setSelectedFiles([]);
      navigate(0); // 새로고침
    } catch (e) {
      alert('에러: ' + e.message);
    }
  };

  // 3️⃣ 기타 기능
  const deleteTalent = async () => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;

    try {
      const res = await fetch(`/talent/delete/${talent.talentno}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('삭제 실패');
      alert('삭제 완료');
      navigate('/talent');
    } catch (e) {
      alert('에러: ' + e.message);
    }
  };

  const sendRequest = async () => {
    if (!loginUser) {
      alert('로그인이 필요합니다.');
      return;
    }

    const dto = {
      talentno: talent.talentno,
      giverno: loginUser.userno,
      receiverno: talent.userno,
      status: 'pending',
      message: '재능 요청합니다.',
    };

    try {
      await fetch('/request/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dto),
      });
      alert('요청 성공!');
    } catch (e) {
      alert('요청 실패: ' + e.message);
    }
  };

  if (error) return <div className="text-center text-red-500 mt-10">오류: {error}</div>;
  if (!talent) return <div className="text-center text-gray-500 mt-10">불러오는 중...</div>;

  // ✅ 파일 중복 제거
  const uniqueFiles = talent.fileInfos ? [...new Map(talent.fileInfos.map(f => [f.fileno, f])).values()] : [];

  // ✅ 슬라이더 옵션
  const sliderSettings = {
    // dots: uniqueFiles.length > 1,
    dots : false,
    arrows: uniqueFiles.length > 1,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: index => setSlideIndex(index),
  };

  return (
  <div className="max-w-4xl mx-auto p-8 bg-white rounded-2xl shadow-lg">
    {editMode ? (
      <>
        <h2 className="text-2xl font-bold mb-6 text-blue-600">재능 수정</h2>
        <div className="grid grid-cols-1 gap-4">
          <input name="title" value={editForm.title || ''} onChange={handleEditChange} placeholder="제목"
            className="w-full p-3 border border-gray-300 rounded" />
          <textarea name="description" value={editForm.description || ''} onChange={handleEditChange}
            placeholder="설명" rows="4" className="w-full p-3 border border-gray-300 rounded" />
          <select name="typeno" value={editForm.typeno || ''} onChange={handleEditChange}
            className="w-full p-3 border border-gray-300 rounded">
            <option value="">타입 선택</option>
            {typeList.map((type) => (
              <option key={type.typeno} value={type.typeno}>{type.name}</option>
            ))}
          </select>
          <select name="cateGrpno" value={editForm.cateGrpno || ''} onChange={handleEditChange}
            className="w-full p-3 border border-gray-300 rounded">
            <option value="">대분류 선택</option>
            {cateGrpList.map((grp) => (
              <option key={grp.cateGrpno} value={grp.cateGrpno}>{grp.name}</option>
            ))}
          </select>
          <select name="categoryno" value={editForm.categoryno || ''} onChange={handleEditChange}
            className="w-full p-3 border border-gray-300 rounded">
            <option value="">소분류 선택</option>
            {categoryList.map((cat) => (
              <option key={cat.categoryno} value={cat.categoryno}>{cat.name}</option>
            ))}
          </select>
          <input type="file" multiple onChange={handleFileChange} className="w-full" />
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <button className="px-5 py-2 bg-green-600 text-white rounded hover:bg-green-700 shadow"
            onClick={submitEdit}>저장</button>
          <button className="px-5 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 shadow"
            onClick={cancelEdit}>취소</button>
        </div>
      </>
    ) : (
      <>
        <div className="flex justify-between items-center mb-4">
          <div className="inline-block bg-gray-200 text-xs text-gray-600 px-3 py-1 rounded-full">
            {talent.cateGrpName} &gt; {talent.categoryName}
          </div>
          <div className="text-xs text-gray-500">
            조회수: {talent.viewCount}
          </div>
        </div>

        {uniqueFiles.length === 1 ? (
          <img
            src={`/uploads/talent/${uniqueFiles[0].storedFileName}`}
            alt={uniqueFiles[0].originalFileName}
            onClick={() => handleImageClick(`/uploads/talent/${uniqueFiles[0].storedFileName}`)}
            className="mb-4 rounded-xl shadow-lg w-full md:w-[600px] h-[300px] object-contain mx-auto cursor-pointer"
          />
        ) : (
          <>
            <Slider {...sliderSettings} className="max-w-[400px] h-auto mx-auto object-contain">
              {uniqueFiles.map((file) => (
                <img
                  key={file.fileno}
                  src={`/uploads/talent/${file.storedFileName}`}
                  alt={file.originalFileName}
                  onClick={() => handleImageClick(`/uploads/talent/${file.storedFileName}`)}
                  className="max-w-[400px] h-auto mx-auto object-contain cursor-pointer"
                />
              ))}
            </Slider>
            <div className="text-center text-xs text-gray-500 mb-4">
              {slideIndex + 1} / {uniqueFiles.length}
            </div>
          </>
        )}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
            <div className="relative">
              <img src={selectedImage} alt="크게보기" className="max-h-[90vh] max-w-[90vw] rounded-lg shadow-lg" />
              <button
                onClick={closeModal}
                className="absolute top-2 right-2 bg-white text-black px-2 py-1 rounded-full shadow"
              >
                ✕
              </button>
            </div>
            <div
              onClick={closeModal}
              className="absolute inset-0"
            ></div>
          </div>
        )}



        <h1 className="text-3xl font-bold text-gray-900 mb-4">{talent.title}</h1>

        <div className="bg-gray-50 p-6 rounded-lg mb-6 text-gray-700 leading-relaxed">
          {talent.description}
        </div>

        <div className="flex justify-end gap-3">
          {isOwner && (
            <>
              <button className="px-5 py-2 bg-green-600 text-white rounded hover:bg-green-700 shadow"
                onClick={startEdit}>수정</button>
              <button className="px-5 py-2 bg-red-600 text-white rounded hover:bg-red-700 shadow"
                onClick={deleteTalent}>삭제</button>
            </>
          )}

          {/* 요청 버튼 (사용 안 할 시 주석 처리) */}
          {/* 
          <button className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 shadow"
            onClick={sendRequest}>요청</button>
          */}
        </div>
      </>
    )}
  </div>
);


}

export default TalentDetailPage;
