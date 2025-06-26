// TalentCateGrpUpdateForm.jsx
import React, { useState } from 'react';
import axios from 'axios';

const TalentCateGrpUpdateForm = ({ grp, onUpdated, onCancel }) => {
  const [name, setName] = useState(grp.name);
  const [message, setMessage] = useState('');

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const dto = {
        cateGrpno: grp.cateGrpno,
        name: name
      };
      await axios.put('/talent_cate_grp/update', dto);
      setMessage('수정 완료');
      onUpdated();
    } catch (error) {
      console.error('수정 실패', error);
      setMessage('수정 중 오류');
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

export default TalentCateGrpUpdateForm;