import React, { useState } from 'react';
import TalentCategoryCreateForm from './TalentCategoryCreateForm';
import TalentCategoryList from './TalentCategoryList';

const TalentCategory = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  const loginUser = JSON.parse(localStorage.getItem("loginUser"));

  if (!loginUser || loginUser.role !== "admin") {
    return <div>접근 권한이 없습니다.</div>;
  }

  const triggerRefresh = () => setRefreshKey((prev) => prev + 1);

  return (
    <div>
      <TalentCategoryCreateForm onCreated={triggerRefresh} />
      <hr />
      <TalentCategoryList refresh={refreshKey} />
    </div>
  );
};

export default TalentCategory;
