import React, { useState } from 'react';
import TalentCategoryCreateForm from './TalentCategoryCreateForm';
import TalentCategoryList from './TalentCategoryList';

const TalentCategory = () => {
  const [refreshKey, setRefreshKey] = useState(0);

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
