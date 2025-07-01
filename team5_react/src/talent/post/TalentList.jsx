import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TalentList = ({ refresh, onUpdated, onDeleted }) => {
  const [talents, setTalents] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [typeList, setTypeList] = useState([]);
  const [cateGrpList, setCateGrpList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    fetch('/talent/list')
      .then((res) => res.json())
      .then((data) => setTalents(data))
      .catch((e) => alert('목록 불러오기 실패: ' + e.message));
  }, [refresh]);

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
        .catch(err => setCategoryList([]));
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
      typeno: talent.type,
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
    setEditForm((prev) => ({ ...prev, [name]: value }));
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
      const res = await fetch(`/talent/delete/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('삭제 실패');

      alert('삭제 완료');
      if (onDeleted) onDeleted();
    } catch (e) {
      alert('에러: ' + e.message);
    }
  };

  return (
    <div>
      <h3>재능 목록</h3>
      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>설명</th>
            <th>언어</th>
            <th>타입</th>
            <th>카테고리</th>
            <th>관리</th>
          </tr>
        </thead>
        <tbody>
          {talents.map((t) =>
            editId === t.talentno ? (
              <tr key={t.talentno}>
                <td>{t.talentno}</td>
                <td>
                  <input name="title" value={editForm.title} onChange={handleEditChange} required />
                </td>
                <td>
                  <input name="description" value={editForm.description} onChange={handleEditChange} />
                </td>
                <td>
                  <input name="language" value={editForm.language} onChange={handleEditChange} />
                </td>
                <td>
                  <select name="typeno" value={editForm.typeno} onChange={handleEditChange} required>
                    <option value="">타입 선택</option>
                    {typeList.map((type) => (
                      <option key={type.typeno} value={type.typeno}>{type.name}</option>
                    ))}
                  </select>
                </td>
                <td>
                  <select name="cateGrpno" value={editForm.cateGrpno} onChange={handleEditChange} required>
                    <option value="">대분류 선택</option>
                    {cateGrpList.map((grp) => (
                      <option key={grp.cateGrpno} value={grp.cateGrpno}>{grp.name}</option>
                    ))}
                  </select>
                  <br />
                  <select name="categoryno" value={editForm.categoryno} onChange={handleEditChange} required>
                    <option value="">소분류 선택</option>
                    {categoryList.map((cat) => (
                      <option key={cat.categoryno} value={cat.categoryno}>{cat.name}</option>
                    ))}
                  </select>
                </td>
                <td>
                  <button onClick={submitEdit}>저장</button>
                  <button onClick={cancelEdit}>취소</button>
                </td>
              </tr>
            ) : (
              <tr key={t.talentno}>
                <td>{t.talentno}</td>
                <td>{t.title}</td>
                <td>{t.description}</td>
                <td>{t.language}</td>
                <td>{t.type}</td>
                <td>{t.category}</td>
                <td>
                  <button onClick={() => startEdit(t)}>수정</button>
                  <button onClick={() => deleteTalent(t.talentno)}>삭제</button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TalentList;