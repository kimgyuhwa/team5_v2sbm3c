import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TalentCategoryCreateForm = ({ onCreated }) => {
  const [name, setName] = useState('');
  const [cateGrpno, setCateGrpNo] = useState('');
  const [message, setMessage] = useState('');
  const [cateGrpList, setCateGrpList] = useState([]); // 대분류 목록 상태

  useEffect(() => {
    // 대분류 목록을 API로 받아오기
    axios.get('/talent_cate_grp/list')
      .then(res => setCateGrpList(res.data.content)) // API 구조에 맞게 조정
      .catch(err => console.error('대분류 목록 조회 실패', err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!cateGrpno) {
      setMessage('대분류를 선택하세요.');
      return;
    }

    try {
      const dto = {
        name,
        cateGrpno: Number(cateGrpno),
      };

      const response = await axios.post('/talent_category/save', dto);
      setMessage(`등록 성공: ${response.data.name}`);
      setName('');
      setCateGrpNo('');
      if (onCreated) onCreated();
    } catch (error) {
      console.error('등록 실패', error);
      setMessage('등록 중 오류가 발생했습니다.');
    }
  };

  return (
    <div>
      <h2>카테고리 소분류 등록</h2>
      <form onSubmit={handleSubmit}>
        <label>
          대분류 선택:
          <select value={cateGrpno} onChange={(e) => setCateGrpNo(e.target.value)} required>
            <option value="">-- 선택 --</option>
            {cateGrpList.map(grp => (
              <option key={grp.cateGrpno} value={grp.cateGrpno}>{grp.name}</option>
            ))}
          </select>
        </label>
        <br />
        <label>
          소분류 이름:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">등록</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default TalentCategoryCreateForm;
