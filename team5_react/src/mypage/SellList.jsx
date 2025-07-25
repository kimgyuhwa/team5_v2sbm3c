import React, { useEffect, useContext, useState } from "react";
import { Search, Filter, ChevronDown, ChevronUp, MessageSquare, User, Star, Clock, ShoppingCart, DollarSign, FileText } from 'lucide-react';
import { GlobalContext } from '../components/GlobalContext';
import axios from 'axios';
import { Link } from 'react-router-dom';

const RequestList = ({userno}) => {
  const [activeTab, setActiveTab] = useState('purchases'); // 'purchases' or 'sales'
  const [searchType, setSearchType] = useState("");
  const [keyword, setKeyword] = useState("");
  const [sort, setSort] = useState("requestno");
  const [direction, setDirection] = useState("DESC");
  const [expandedItem, setExpandedItem] = useState(null);
  const [purchases, setPurchases] = useState([]);
  const [sales, setSales] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const { loginUser } = useContext(GlobalContext); 


  useEffect(() => {
    // 구매내역 요청
    axios.get(`/request/purchases/${loginUser.userno}`)
    .then((res) => {
      setPurchases(res.data);
    })
    .catch((err) => {
      console.error('멘토내역 가져오기 실패:', err);
    });

    // 판매내역 요청
    axios.get(`/request/sales/${loginUser.userno}`)
      .then((res) => {
        setSales(res.data);
      })
      .catch((err) => {
        console.error('멘토내역 가져오기 실패:', err);
      });
  }, [userno]);

  // 현재 활성 탭에 따른 데이터 필터링 및 정렬
  useEffect(() => {
    let currentData = activeTab === 'purchases' ? purchases : sales;
    
    // 검색 필터링
    if (keyword && searchType) {
      currentData = currentData.filter(item => {
        const value = item[searchType];
        return value && value.toString().toLowerCase().includes(keyword.toLowerCase());
      });
    }

    // 정렬
    currentData = [...currentData].sort((a, b) => {
      let aValue = a[sort];
      let bValue = b[sort];
      
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }
      
      if (direction === 'ASC') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredData(currentData);
  }, [loginUser,activeTab, purchases, sales, keyword, searchType, sort, direction]);

  const handleSearch = () => {
    // 검색 로직은 useEffect에서 자동으로 처리됨
  };

  const toggleExpanded = (id) => {
    setExpandedItem(expandedItem === id ? null : id);
  };

    const getStatusText = (status) => {
    switch (status) {
      case 'accepted': return '거래중';
      case 'completed': return '완료';
      case 'rejected': return '취소';
      case 'pending': return '대기';
      default: return status;
    }
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
    <div className="flex flex-col md:flex-row gap-6">
      <div className="flex-1 bg-white rounded-xl shadow-sm p-6 min-h-[400px] max-h-[80vh] overflow-y-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">나의 거래목록</h1>
          
          {/* 탭 메뉴 */}
          <div className="flex border-b border-gray-200 mt-4">

            <button
              className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
                activeTab === 'purchases'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('purchases')}
            >
              <div className="flex items-center gap-2">
                구매내역 ({purchases.length})
              </div>
            </button>

            <button
              className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
                activeTab === 'sales'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('sales')}
            >
              <div className="flex items-center gap-2">
                판매내역 ({sales.length})
              </div>
            </button>
            
          </div>
        </div>

        {/* 검색 및 필터 영역 */}
        <div className="mb-6 space-y-4 bg-gray-50 p-4 rounded-lg sticky top-0 z-10">
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
                <option value="status">상태</option>
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
          {filteredData.length > 0 ? (
            filteredData.map((request) => (
              <div
                key={request.requestno}
                className="border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div
                  className="p-4 cursor-pointer flex items-center justify-between"
                  onClick={() => toggleExpanded(request.requestno)}
                >
                  <div className="flex items-start">
                    <div className="text-left">
                        <div className="flex items-center text-gray-800 font-medium mb-1">
                          <FileText className="w-4 h-4 mr-2 text-blue-600" />
                          게시물 : {request.talentTitle}
                        </div>
                        <div className="flex items-center text-gray-600">
                          <User className="w-4 h-4 mr-1" />
                          {activeTab === 'purchases' ? '멘토' : '멘티'}: {activeTab === 'purchases' ? request.receivername : request.givername}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(request.status)}`}>
                        {getStatusText(request.status)}
                      </span>
                      {expandedItem === request.requestno ? (
                        <ChevronUp className="w-5 h-5 text-gray-400" /> 
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      )}
                     </div>
                  </div>
                

                {/* 확장된 상세 정보 */}
                {expandedItem === request.requestno && (
                  <div className="px-4 pb-4 border-t border-gray-100">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 text-gray-400 mr-2" />
                          <span className="font-medium">
                            <Link to={`/talent/detail/${request.talentno}`} className="text-blue-600 hover:underline">
                              게시물: {request.talentTitle}
                            </Link>
                          </span>
                        </div>
                        <div className="flex items-center">
                          {activeTab === 'purchases' ? 
                            <ShoppingCart className="w-4 h-4 text-blue-500 mr-2" /> :
                            <DollarSign className="w-4 h-4 text-green-500 mr-2" />
                          }
                          <span className="text-sm text-gray-600">
                            {activeTab === 'purchases' ? '받은 멘토링' : '판매한 서비스'}
                          </span>
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
              <h3 className="text-lg font-medium text-gray-600 mb-2">
                {activeTab === 'purchases' ? '멘토 내역이' : '멘티 내역이'} 없습니다
              </h3>
              <p className="text-gray-500">
                검색 조건을 변경하거나 새로운 거래를 추가해보세요.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RequestList;