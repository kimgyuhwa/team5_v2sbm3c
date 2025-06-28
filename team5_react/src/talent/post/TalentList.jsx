// src/talent/TalentList.jsx
import React, { useEffect, useState } from 'react';

const TalentList = ({ refresh, onUpdated, onDeleted }) => {
  const [talents, setTalents] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({});

  useEffect(() => {
    fetch('/talent/list')
      .then((res) => res.json())
      .then((data) => setTalents(data))
      .catch((e) => alert('목록 불러오기 실패: ' + e.message));
  }, [refresh]);

  const startEdit = (talent) => {
    setEditId(talent.talentno);
    setEditForm({
      title: talent.title,
      description: talent.description,
      language: talent.language,
      type: talent.type,
      category: talent.category,
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
        type: editForm.type ? Number(editForm.type) : null,
        category: editForm.category ? Number(editForm.category) : null,
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
            <th>타입 번호</th>
            <th>카테고리 번호</th>
            <th>관리</th>
          </tr>
        </thead>
        <tbody>
          {talents.map((t) =>
            editId === t.talentno ? (
              <tr key={t.talentno}>
                <td>{t.talentno}</td>
                <td>
                  <input
                    name="title"
                    value={editForm.title}
                    onChange={handleEditChange}
                    required
                  />
                </td>
                <td>
                  <input name="description" value={editForm.description} onChange={handleEditChange} />
                </td>
                <td>
                  <input name="language" value={editForm.language} onChange={handleEditChange} />
                </td>
                <td>
                  <input
                    name="type"
                    type="number"
                    value={editForm.type || ''}
                    onChange={handleEditChange}
                  />
                </td>
                <td>
                  <input
                    name="category"
                    type="number"
                    value={editForm.category || ''}
                    onChange={handleEditChange}
                  />
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
