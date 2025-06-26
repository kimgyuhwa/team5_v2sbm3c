import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TalentCategoryItem from './TalentCategoryItem';

const TalentCategoryList = ({ refresh }) => {
  const [listData, setListData] = useState(null);
  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(0);
  const size = 10;
  const [loading, setLoading] = useState(false);

  const fetchList = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/talent_category/list', {
        params: { keyword, page, size, sort: 'categoryno,desc' },
      });
      setListData(res.data);
    } catch (error) {
      console.error('목록 조회 실패', error);
      alert('목록 조회 실패');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchList();
  }, [refresh, page, keyword]);

  const totalPages = listData ? listData.totalPages : 0;

  return (
    <div>
      <h3>소분류 카테고리 목록</h3>
      <input
        placeholder="검색어 입력"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      {loading && <p>로딩 중...</p>}

      {listData && (
        <>
          <ul>
  {listData.content.map((item) => (
    <TalentCategoryItem
      key={item.categoryno}
      category={item}
      onDeleted={fetchList}
      onUpdated={fetchList}
    />
  ))}
</ul>
          <div>
            페이지:{' '}
            {[...Array(totalPages)].map((_, idx) => (
              <button key={idx} disabled={page === idx} onClick={() => setPage(idx)}>
                {idx + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default TalentCategoryList;
