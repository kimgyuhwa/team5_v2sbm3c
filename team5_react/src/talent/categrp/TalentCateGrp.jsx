import TalentCateGrpCreateForm from './TalentCateGrpCreateForm';
import TalentCateGrpList from './TalentCateGrpList';
import { GlobalContext } from '../../components/GlobalContext';
import React, { useState, useContext } from 'react';

const TalentCateGrp = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  const { loginUser } = useContext(GlobalContext);

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