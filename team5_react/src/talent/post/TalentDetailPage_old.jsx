import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../style/TalentDetail.css';
import uploadFile from '../../fileupload/FileUpload';
import { GlobalContext } from '../../components/GlobalContext';


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

  useEffect(() => {
    fetch(`/talent/detail/${talentno}`)
      .then((res) => {
        if (!res.ok) throw new Error('서버 오류');
        return res.json();
      })
      .then((data) => setTalent(data))
      .catch((e) => setError(e.message));
  }, [talentno]);

  // 타입, 대분류 가져오기
  useEffect(() => {
    fetch('/talent_type/list')
      .then(res => res.json())
      .then(data => setTypeList(data.content || []));
    fetch('/talent_cate_grp/list')
      .then(res => res.json())
      .then(data => setCateGrpList(data.content || []));
  }, []);

  // 소분류 가져오기
  useEffect(() => {
    if (editForm.cateGrpno) {
      fetch(`/talent_category/list-by-categrp/${editForm.cateGrpno}`)
        .then(res => res.json())
        .then(data => setCategoryList(data));
    } else {
      setCategoryList([]);
    }
  }, [editForm.cateGrpno]);

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
      navigate(0); // 새로고침해서 최신 데이터 표시
    } catch (e) {
      alert('에러: ' + e.message);
    }
  };

  const deleteTalent = async () => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;

    try {
      const res = await fetch(`/talent/delete/${talent.talentno}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('삭제 실패');
      alert('삭제 완료');
      navigate('/talent'); // 삭제 후 목록으로 이동
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

  if (error) return <div>오류: {error}</div>;
  if (!talent) return <div>불러오는 중...</div>;

  return (
    <div className="talent-detail-box">
      {editMode ? (
        <>
          <h2>재능 수정</h2>
          <input
            name="title"
            value={editForm.title || ''}
            onChange={handleEditChange}
            placeholder="제목"
          />
          <input
            name="description"
            value={editForm.description || ''}
            onChange={handleEditChange}
            placeholder="설명"
          />
          <select
            name="typeno"
            value={editForm.typeno || ''}
            onChange={handleEditChange}
          >
            <option value="">타입 선택</option>
            {typeList.map((type) => (
              <option key={type.typeno} value={type.typeno}>
                {type.name}
              </option>
            ))}
          </select>
          <select
            name="cateGrpno"
            value={editForm.cateGrpno || ''}
            onChange={handleEditChange}
          >
            <option value="">대분류 선택</option>
            {cateGrpList.map((grp) => (
              <option key={grp.cateGrpno} value={grp.cateGrpno}>
                {grp.name}
              </option>
            ))}
          </select>
          <select
            name="categoryno"
            value={editForm.categoryno || ''}
            onChange={handleEditChange}
          >
            <option value="">소분류 선택</option>
            {categoryList.map((cat) => (
              <option key={cat.categoryno} value={cat.categoryno}>
                {cat.name}
              </option>
            ))}
          </select>
          <input type="file" multiple onChange={handleFileChange} />

          <div>
            <button onClick={submitEdit}>저장</button>
            <button onClick={cancelEdit}>취소</button>
          </div>
        </>
      ) : (
        <>
          <h2>{talent.title}</h2>
          <p>{talent.description}</p>
          <p>작성자: {talent.userName}</p>
          <p>타입: {talent.typeName}</p>
          <p>카테고리: {talent.categoryName}</p>

          {talent.fileInfos?.length > 0 && (
            <div>
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

          <div className="talent-detail-actions">
            <button className="btn edit-btn" onClick={startEdit}>수정</button>
            <button className="btn delete-btn" onClick={deleteTalent}>삭제</button>
            <button className="btn request-btn" onClick={sendRequest}>요청</button>
          </div>
        </>
      )}
    </div>
  );
}

export default TalentDetailPage;
