// src/talent/category/TalentCategoryUpdateForm.jsx
import React, { useState } from 'react';
import axios from 'axios';

const TalentCategoryUpdateForm = ({ category, onUpdated, onCancel }) => {
  const [name, setName] = useState(category.name);
  const [message, setMessage] = useState('');
  console.log('category:', category);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const dto = {
        categoryno: category.categoryno,
        name: name,
        cateGrpno: category.cateGrp.cateGrpno  // 대분류 그대로 유지
      };

      await axios.put('/talent_category/update', dto);
      setMessage('수정 완료');
      if (onUpdated) onUpdated();
    } catch (err) {
      console.error('수정 실패', err);
      setMessage('수정 중 오류 발생');
    }
  };

  return (
    <form onSubmit={handleUpdate}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <button type="submit">저장</button>
      <button type="button" onClick={onCancel}>취소</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default TalentCategoryUpdateForm;
