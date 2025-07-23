import React, { useEffect, useState } from "react";
import axios from "axios";

const RequestList = () => {
  const [requests, setRequests] = useState([]);
  const [searchType, setSearchType] = useState("");
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [sort, setSort] = useState("requestno");
  const [direction, setDirection] = useState("DESC");
  const [totalPages, setTotalPages] = useState(0);

  const fetchRequests = async () => {
    try {
      const params = {
        page,
        size,
        sort,
        direction,
      };

      if (searchType && keyword) {
        params.searchType = searchType;
        params.keyword = keyword;
      }

      const response = await axios.get("/request/list", { params });
      setRequests(response.data.content);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("요청 목록 불러오기 실패:", error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [page, size, sort, direction]);

  const handleSearch = () => {
    setPage(0);
    fetchRequests();
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">요청 목록</h2>

      {/* 검색창 */}
      <div className="flex gap-2 mb-4">
        <select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
          className="border p-2"
        >
          <option value="">검색 필드</option>
          <option value="talentTitle">재능 제목</option>
          <option value="userName">요청자 이름</option>
          <option value="status">상태</option>
          <option value="message">메시지</option>
        </select>
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="검색어 입력"
          className="border p-2 flex-1"
        />
        <button onClick={handleSearch} className="bg-blue-500 text-white px-4 py-2 rounded">
          검색
        </button>
      </div>

      {/* 정렬 */}
      <div className="flex gap-4 mb-4">
        <div>
          <label>정렬 기준:</label>
          <select value={sort} onChange={(e) => setSort(e.target.value)} className="ml-2 p-1 border">
            <option value="requestno">요청번호</option>
            <option value="userName">요청자</option>
            <option value="status">상태</option>
          </select>
        </div>
        <div>
          <label>정렬 방향:</label>
          <select
            value={direction}
            onChange={(e) => setDirection(e.target.value)}
            className="ml-2 p-1 border"
          >
            <option value="DESC">내림차순</option>
            <option value="ASC">오름차순</option>
          </select>
        </div>
      </div>

      {/* 목록 테이블 */}
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">요청번호</th>
            <th className="border p-2">재능 제목</th>
            <th className="border p-2">요청자</th>
            <th className="border p-2">상태</th>
            <th className="border p-2">메시지</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req) => (
            <tr key={req.requestno}>
              <td className="border p-2">{req.requestno}</td>
              <td className="border p-2">{req.talentTitle}</td>
              <td className="border p-2">{req.userName}</td>
              <td className="border p-2">{req.status}</td>
              <td className="border p-2">{req.message}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 페이지네이션 */}
      <div className="flex justify-center mt-4 gap-2">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
          disabled={page === 0}
          className="px-3 py-1 border rounded"
        >
          이전
        </button>
        <span className="px-3 py-1">
          {page + 1} / {totalPages}
        </span>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages - 1))}
          disabled={page >= totalPages - 1}
          className="px-3 py-1 border rounded"
        >
          다음
        </button>
      </div>
    </div>
  );
};

export default RequestList;
