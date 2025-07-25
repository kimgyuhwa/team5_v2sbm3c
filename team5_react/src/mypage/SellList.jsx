import React, { useEffect, useState } from "react";
import { Search, Filter, ChevronDown, ChevronUp, MessageSquare, User, Star, Clock } from 'lucide-react';

const RequestList = () => {
  const [requests, setRequests] = useState([]);
  const [searchType, setSearchType] = useState("");
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [sort, setSort] = useState("requestno");
  const [direction, setDirection] = useState("DESC");
  const [totalPages, setTotalPages] = useState(0);
  const [expandedItem, setExpandedItem] = useState(null);

  const fetchRequests = async () => {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        size: size.toString(),
        sort,
        direction,
      });

      if (searchType && keyword) {
        params.append('searchType', searchType);
        params.append('keyword', keyword);
      }

      const response = await fetch(`/request/list?${params}`);
      const data = await response.json();
      console.log("Data",data)
      setRequests(data.content);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("거래 목록 불러오기 실패:", error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [page, size, sort, direction]);

  const handleSearch = () => {
    setPage(0);
    fetchRequests();
  };

  const toggleExpanded = (id) => {
    setExpandedItem(expandedItem === id ? null : id);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case '거래중': return 'bg-blue-100 text-blue-800';
      case '완료': return 'bg-green-100 text-green-800';
      case '취소': return 'bg-red-100 text-red-800';
      case '대기': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">거래 목록</h1>
        <p className="text-gray-600">재능 거래 목록을 확인하고 관리하세요!</p>
      </div>

      {/* 검색 및 필터 영역 */}
      <div className="mb-6 space-y-4 bg-gray-50 p-4 rounded-lg">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="검색어 입력..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="text-gray-400 w-5 h-5" />
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
            >
              <option value="">검색 필드</option>
              <option value="talentTitle">재능 제목</option>
              <option value="userName">거래자 이름</option>
              <option value="status">상태</option>
              <option value="message">메시지</option>
            </select>
          </div>
          <button 
            onClick={handleSearch} 
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            검색
          </button>
        </div>

        {/* 정렬 옵션 */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex items-center gap-2">
            <span className="text-gray-600">정렬 기준:</span>
            <select 
              value={sort} 
              onChange={(e) => setSort(e.target.value)} 
              className="px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="requestno">거래번호</option>
              <option value="userName">거래자</option>
              <option value="status">상태</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-600">정렬 방향:</span>
            <select
              value={direction}
              onChange={(e) => setDirection(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="DESC">내림차순</option>
              <option value="ASC">오름차순</option>
            </select>
          </div>
        </div>
      </div>

      {/* 거래 리스트 */}
      <div className="space-y-4">
        {requests?.length > 0 ? (
          requests.map((request) => (
            <div
              key={request.requestno}
              className="border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              {console.log("requestsettes",request)}
              <div
                className="p-4 cursor-pointer"
                onClick={() => toggleExpanded(request.requestno)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="text-left">
                      <div className="flex items-center text-gray-800 font-medium mb-1">
                        <Star className="w-4 h-4 mr-2 text-yellow-500" />
                        {request.talentTitle}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <User className="w-4 h-4 mr-1" />
                        거래자: {request.userName}
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(request.status)}`}>
                      {request.status}
                    </span>
                    {expandedItem === request.requestno ? 
                      <ChevronUp className="w-5 h-5 text-gray-400" /> : 
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    }
                  </div>
                </div>
              </div>

              {/* 확장된 상세 정보 */}
              {expandedItem === request.requestno && (
                <div className="px-4 pb-4 border-t border-gray-100">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="font-medium">거래번호: #{request.requestno}</span>
                      </div>
                    </div>
                    <div>
                      <div className="mb-2">
                        <span className="text-gray-600 flex items-center">
                          <MessageSquare className="w-4 h-4 mr-1" />
                          메시지:
                        </span>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-gray-700">
                          {request.message}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-600 mb-2">거래가 없습니다</h3>
            <p className="text-gray-500">검색 조건을 변경하거나 새로운 거래를 추가해보세요.</p>
          </div>
        )}
      </div>

      {/* 페이지네이션 */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-8 gap-2">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
            disabled={page === 0}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            이전
          </button>
          <span className="px-4 py-2 text-gray-600 font-medium">
            {page + 1} / {totalPages}
          </span>
          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages - 1))}
            disabled={page >= totalPages - 1}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:cursor-not-allowed transition-colors"
          >
            다음
          </button>
        </div>
      )}
    </div>
  );
};

export default RequestList;