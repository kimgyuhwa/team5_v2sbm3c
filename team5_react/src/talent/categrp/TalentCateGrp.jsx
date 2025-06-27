import React, { useState } from 'react';
import TalentCateGrpCreateForm from './TalentCateGrpCreateForm';
import TalentCateGrpList from './TalentCateGrpList';

const TalentCateGrp = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  const loginUser = JSON.parse(localStorage.getItem("loginUser"));

  if (!loginUser || loginUser.role !== "admin") {
    return <div>접근 권한이 없습니다.</div>;
  }

  const triggerRefresh = () => setRefreshKey((prev) => prev + 1);

  return (
    <div>
      <TalentCateGrpCreateForm onCreated={triggerRefresh} />
      <hr />
      <TalentCateGrpList refresh={refreshKey} />
    </div>
  );
};

export default TalentCateGrp;