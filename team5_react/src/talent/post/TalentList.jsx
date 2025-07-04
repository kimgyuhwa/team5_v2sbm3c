import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { GlobalContext } from '../../components/GlobalContext';
import '../style/TalentList.css';

const TalentList = ({ refresh, onUpdated, onDeleted }) => {
  const [talents, setTalents] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [typeList, setTypeList] = useState([]);
  const [cateGrpList, setCateGrpList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const { loginUser , selectedCategoryNo } = useContext(GlobalContext);
  const schoolno = loginUser?.schoolno;
  //const categoryno = categoryList?.categoryno;
  

  useEffect(() => {
  if (!schoolno) return;

  const url = selectedCategoryNo
    ? `/talent/list-by-school-and-category?schoolno=${schoolno}&categoryno=${selectedCategoryNo}`  // <-- 이거 새로 추가
    : `/talent/list-by-school/${schoolno}`;  // 기존 로직

  fetch(url)
    .then((res) => {
      if (!res.ok) throw new Error('서버 응답 오류: ' + res.status);
      return res.json();
    })
    .then((data) => setTalents(data))
    .catch((e) => alert('목록 불러오기 실패: ' + e.message));
  }, [refresh, schoolno, selectedCategoryNo]); // categoryId 변화 감지

  useEffect(() => {
    axios.get('/talent_type/list')
      .then(res => setTypeList(res.data.content))
      .catch(err => console.error('타입 목록 불러오기 실패', err));

    axios.get('/talent_cate_grp/list')
      .then(res => setCateGrpList(res.data.content))
      .catch(err => console.error('대분류 목록 불러오기 실패', err));
  }, []);

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
      language: talent.language,
      typeno: talent.type,       // 주의: 기존엔 t.type, 맞으면 사용
      cateGrpno: talent.cateGrpno,
      categoryno: talent.category,
    });
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditForm({});
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };

  const submitEdit = async () => {
    try {
      const dto = {
        talentno: editId,
        title: editForm.title,
        description: editForm.description,
        language: editForm.language,
        typeno: Number(editForm.typeno),
        categoryno: Number(editForm.categoryno),
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
      alert("로그인이 필요합니다.");
      return;
    }

    const dto = {
      talentno: talent.talentno,
      giverno: loginUser.userno,
      receiverno: talent.userno,
      status: 'pending',
      message: '재능 요청합니다.'
    };

    try {
      const res = await axios.post('/request/save', dto);
      alert('요청 성공!');
      console.log(res.data);
    } catch (e) {
      console.log("보내는 요청:", dto);
      alert('요청 실패: ' + e.message);
    }
  };

  return (
    <div className="talent-posts-box">
      <h2 className="talent-posts-title">재능 목록</h2>
      {talents.length === 0 ? (
        <div className="no-results">목록이 없습니다.</div>
      ) : (
        talents.map(t =>
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
                <input
                  name="language"
                  value={editForm.language || ''}
                  onChange={handleEditChange}
                  placeholder="언어"
                />
                <select
                  name="typeno"
                  value={editForm.typeno || ''}
                  onChange={handleEditChange}
                  required
                >
                  <option value="">타입 선택</option>
                  {typeList.map(type => (
                    <option key={type.typeno} value={type.typeno}>{type.name}</option>
                  ))}
                </select>
                <select
                  name="cateGrpno"
                  value={editForm.cateGrpno || ''}
                  onChange={handleEditChange}
                  required
                >
                  <option value="">대분류 선택</option>
                  {cateGrpList.map(grp => (
                    <option key={grp.cateGrpno} value={grp.cateGrpno}>{grp.name}</option>
                  ))}
                </select>
                <select
                  name="categoryno"
                  value={editForm.categoryno || ''}
                  onChange={handleEditChange}
                  required
                >
                  <option value="">소분류 선택</option>
                  {categoryList.map(cat => (
                    <option key={cat.categoryno} value={cat.categoryno}>{cat.name}</option>
                  ))}
                </select>
              </div>
              <footer className="talent-post-footer" style={{ gap: '10px' }}>
                <button className="edit" onClick={submitEdit}>저장</button>
                <button onClick={cancelEdit}>취소</button>
              </footer>
            </article>
          ) : (
            <article key={t.talentno} className="talent-post-item">
              <header className="talent-post-header">
                <h3 className="talent-post-title">{t.title}</h3>
              </header>
              <p className="talent-post-content">{t.description}</p>
              <footer className="talent-post-footer">
                <span className="talent-post-author">언어: {t.language}</span>
                <div className="talent-post-actions" style={{ gap: '6px' }}>
                  <button className="edit" onClick={() => startEdit(t)}>수정</button>
                  <button className="delete" onClick={() => deleteTalent(t.talentno)}>삭제</button>
                  <button className="request" onClick={() => sendRequest(t)}>요청</button>
                </div>
              </footer>
            </article>
          )
        )
      )}
    </div>
  );
};

export default TalentList;
