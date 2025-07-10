import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { GlobalContext } from '../../components/GlobalContext';
import { useNavigate } from 'react-router-dom';
import uploadFile from '../../fileupload/FileUpload'; 
import '../style/TalentList.css';

const TalentList = ({ refresh, onUpdated, onDeleted, searchQuery, selectedCategoryNo }) => {
  const [talents, setTalents] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(0);
  const [size] = useState(10);

  useEffect(() => {
    setPage(0);
  }, [selectedCategoryNo]);

  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [typeList, setTypeList] = useState([]);
  const [cateGrpList, setCateGrpList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);

  const { loginUser } = useContext(GlobalContext);
  const schoolno = loginUser?.schoolno;
  const navigate = useNavigate();

  const [selectedFiles, setSelectedFiles] = useState([]);

  const goToPage = (newPage) => {
    if (newPage < 0 || newPage >= totalPages) return;
    setPage(newPage);
  };

  // 목록 조회
  useEffect(() => {
    if (!schoolno) return;

    const params = new URLSearchParams();
    if (searchQuery?.trim()) params.append('keyword', searchQuery.trim());
    if (selectedCategoryNo) params.append('categoryno', selectedCategoryNo);
    params.append('page', page);
    params.append('size', size);
    params.append('schoolno', schoolno);

    axios
      .get(`/talent/search?${params.toString()}`)
      .then((res) => {
        setTalents(res.data.content || []);
        setTotalPages(res.data.totalPages || 1);
      })
      .catch((err) => alert('목록 불러오기 실패: ' + err.message));
  }, [refresh, schoolno, searchQuery, selectedCategoryNo, page, size]);

  // 타입, 대분류 목록 로드
  useEffect(() => {
    axios.get('/talent_type/list')
      .then(res => setTypeList(res.data.content))
      .catch(err => console.error('타입 목록 불러오기 실패', err));

    axios.get('/talent_cate_grp/list')
      .then(res => setCateGrpList(res.data.content))
      .catch(err => console.error('대분류 목록 불러오기 실패', err));
  }, []);

  // 소분류 목록은 editForm.cateGrpno 변경 시 갱신
  useEffect(() => {
    if (editForm.cateGrpno) {
      axios.get(`/talent_category/list-by-categrp/${editForm.cateGrpno}`)
        .then(res => setCategoryList(res.data))
        .catch(() => setCategoryList([]));
    } else {
      setCategoryList([]);
    }
  }, [editForm.cateGrpno]);

  const startEdit = (talent) => {
    setEditId(talent.talentno);
    setEditForm({
      title: talent.title,
      description: talent.description,
      typeno: talent.typeno || talent.type,
      cateGrpno: talent.cateGrpno,
      categoryno: talent.categoryno || talent.category,
    });
    setSelectedFiles([]);
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditForm({});
    setSelectedFiles([]);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setSelectedFiles(Array.from(e.target.files));
  };

  // 수정 제출
  const submitEdit = async () => {
  try {
    let uploadedFileData = [];

    if (selectedFiles.length > 0) {
      uploadedFileData = await uploadFile(selectedFiles, 'talent', editId, loginUser.profile);
    }

    // 기존 파일도 포함하려면 editForm이나 다른 상태에 기존 파일 리스트를 유지해야 함

    const dto = {
      talentno: editId,
      title: editForm.title,
      description: editForm.description,
      typeno: Number(editForm.typeno),
      categoryno: Number(editForm.categoryno),
      fileInfos: uploadedFileData,  // 전체 배열 전달
    };

    const res = await fetch('/talent/update', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dto),
    });

    if (!res.ok) throw new Error('수정 실패');

    alert('수정 성공!');
    setEditId(null);
    setEditForm({});
    setSelectedFiles([]);
    if (onUpdated) onUpdated();
  } catch (e) {
    alert('에러: ' + e.message);
  }
};


  const deleteTalent = async (id) => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;

    try {
      const res = await fetch(`/talent/delete/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('삭제 실패');
      alert('삭제 완료');
      if (onDeleted) onDeleted();
    } catch (e) {
      alert('에러: ' + e.message);
    }
  };

  const sendRequest = async (talent) => {
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
      const res = await axios.post('/request/save', dto);
      alert('요청 성공!');
      console.log(res.data);
    } catch (e) {
      console.log('보내는 요청:', dto);
      alert('요청 실패: ' + e.message);
    }
  };

  const handleGoDetail = (talentno) => {
    navigate(`/talent/detail/${talentno}`);
  };

  return (
    <div className="talent-posts-box">
      <h2 className="talent-posts-title">재능 목록</h2>
      {talents.length === 0 ? (
        <div className="no-results">목록이 없습니다.</div>
      ) : (
        talents.map((t) =>
          editId === t.talentno ? (
            <article key={t.talentno} className="talent-post-item">
              <header className="talent-post-header">
                <h3 className="talent-post-title">재능 수정 - {t.talentno}</h3>
              </header>
              <div>
                <input
                  name="title"
                  value={editForm.title || ''}
                  onChange={handleEditChange}
                  placeholder="제목"
                  required
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
                  required
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
                  required
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
                  required
                >
                  <option value="">소분류 선택</option>
                  {categoryList.map((cat) => (
                    <option key={cat.categoryno} value={cat.categoryno}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                <input type="file" multiple onChange={handleFileChange} />
              </div>
              <footer className="talent-post-footer" style={{ gap: '10px' }}>
                <button className="edit" onClick={submitEdit}>
                  저장
                </button>
                <button onClick={cancelEdit}>취소</button>
              </footer>
            </article>
          ) : (
            <article
              key={t.talentno}
              className="talent-post-item"
              onClick={() => handleGoDetail(t.talentno)}
              style={{ cursor: 'pointer' }}
            >
              {t.fileInfos && t.fileInfos.length > 0 && (
                <img
                  src={`/uploads/talent/${t.fileInfos[0].storedFileName}`}
                  alt={t.fileInfos[0].originalFileName}
                  className="talent-thumbnail"
                  onClick={(e) => e.stopPropagation()}
                />
              )}

              <div className="talent-post-content-wrapper">
                <div className="talent-post-texts">
                  <h3 className="talent-post-title">{t.title}</h3>
                  <p className="talent-post-content">{t.description || '[설명 없음]'}</p>
                </div>

                <div className="talent-post-actions-wrapper">
                  <button
                    className="btn edit-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      startEdit(t);
                    }}
                  >
                    수정
                  </button>
                  <button
                    className="btn delete-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteTalent(t.talentno);
                    }}
                  >
                    삭제
                  </button>
                  <button
                    className="btn request-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      sendRequest(t);
                    }}
                  >
                    요청
                  </button>
                </div>
              </div>
            </article>
          )
        )
      )}

      <div style={{ marginTop: 20, textAlign: 'center' }}>
        <button onClick={() => goToPage(page - 1)} disabled={page <= 0}>
          이전
        </button>
        <span style={{ margin: '0 10px' }}>
          {page + 1} / {totalPages}
        </span>
        <button onClick={() => goToPage(page + 1)} disabled={page + 1 >= totalPages}>
          다음
        </button>
      </div>
    </div>
  );
};

export default TalentList;
