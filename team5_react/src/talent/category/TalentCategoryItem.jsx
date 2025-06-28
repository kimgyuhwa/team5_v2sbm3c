// TalentCategoryItem.jsx
import React, { useState } from 'react';
import axios from 'axios';
import TalentCategoryUpdateForm from './TalentCategoryUpdateForm';

const TalentCategoryItem = ({ category, onDeleted, onUpdated }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = async () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      try {
        await axios.delete(`/talent_category/delete/${category.categoryno}`);
        onDeleted();
      } catch (err) {
        console.error('삭제 실패', err);
        alert('삭제 중 오류');
      }
    }
  };

  return (
    <div>
      {isEditing ? (
        <TalentCategoryUpdateForm
          category={category}
          onUpdated={() => {
            setIsEditing(false);
            onUpdated();
          }}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <>
          <span>{category.name} (대분류: {category.cateGrpName}) </span>
          <button onClick={() => setIsEditing(true)}>수정</button>
          <button onClick={handleDelete}>삭제</button>
        </>
      )}
    </div>
  );
};

export default TalentCategoryItem;
