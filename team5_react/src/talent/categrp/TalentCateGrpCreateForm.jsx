// TalentCateGrpCreateForm.jsx
import React, { useState } from 'react';
import axios from 'axios';

const TalentCateGrpCreateForm = () => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const dto = { name };  // 백엔드에서 @RequestBody TalentCateGrpCreateDTO 받아줌

      const response = await axios.post('/talent_cate_grp/save', dto);
      setMessage(`등록 성공: ${response.data.name}`);
      setName('');
    } catch (error) {
      console.error('등록 실패', error);
      setMessage('등록 중 오류가 발생했습니다.');
    }
  };

  return (
    <div>
      <h2>카테고리 대분류 등록</h2>
      <form onSubmit={handleSubmit}>
        <label>
          카테고리 이름:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <button type="submit">등록</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default TalentCateGrpCreateForm;
