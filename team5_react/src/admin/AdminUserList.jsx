import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AdminUserList() {
  const [users, setUsers] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(0);  // 0부터 시작
  const [totalPages, setTotalPages] = useState(0);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('/user/admin/users', {
        params: {
          keyword: keyword.trim(),
          page: page,
          size: 5,
        },
      });
      setUsers(res.data.content);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error('유저 목록 불러오기 실패:', err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page]);

  const handleSearch = () => {
    setPage(0); // 검색 시 첫 페이지로 초기화
    fetchUsers();
  };

  const handleEdit = (user) => {
  // 간단히 prompt로 닉네임만 변경 예시
  const newUsername = prompt('새 닉네임 입력', user.username);
  if (!newUsername) return;

  axios.put(`/user/admin/update/${user.userno}`, {
    ...user,
    username: newUsername,
  }).then(() => {
    alert('수정 완료');
    fetchUsers();
  }).catch(() => {
    alert('수정 실패');
  });
};

const handleDelete = (userno) => {
  if (!window.confirm('정말 탈퇴시키겠습니까?')) return;

  axios.patch(`/user/${userno}/deactivate`)
    .then(() => {
      alert('삭제 완료');
      fetchUsers();
    })
    .catch(() => {
      alert('삭제 실패');
    });
};

  

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h2>관리자 - 사용자 목록</h2>

      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="아이디 또는 닉네임 검색"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          style={{ padding: '6px', marginRight: '8px', width: '300px' }}
        />
        <button onClick={handleSearch} style={{ padding: '6px 12px' }}>
          검색
        </button>
      </div>

      <table border="1" width="100%" cellPadding="8" style={{ borderCollapse: 'collapse' }}>
        <colgroup>
          <col style={{ width: '5%' }} />{/* 번호 */}
          <col style={{ width: '10%' }} />{/* 아이디 */}
          <col style={{ width: '10%' }} />{/* 닉네임 */}
          <col style={{ width: '10%' }} />{/* 이름 */}
          <col style={{ width: '20%' }} />{/* 학교명 */}
          <col style={{ width: '5%' }} />{/* 역할 */}
          <col style={{ width: '5%' }} />{/* 탈퇴여부 */}
          <col style={{ width: '15%' }} />{/* 이메일 */}
          <col style={{ width: '15%' }} />{/* 가입일 */}
          <col style={{ width: '5%' }} />{/* 관리 */}
        </colgroup>
        <thead>
          <tr>
            <th>번호</th>
            <th>아이디</th>
            <th>닉네임</th>
            <th>이름</th>
            <th>학교명</th>
            <th>역할</th>
            <th>이메일</th>
            <th>탈퇴여부</th>
            <th>가입일</th>
            <th>관리</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="10" style={{ textAlign: 'center' }}>사용자가 없습니다.</td>
            </tr>
          ) : (
            users.map(user => (
              <tr key={user.userno}>
                <td>{user.userno}</td>
                <td>{user.userId}</td>
                <td>{user.username}</td>
                <td>{user.name}</td>
                <td>{user.schoolname}</td>
                <td>{user.role}</td>
                <td>{user.email}</td>
                <th>{user.isDeleted ? "탈퇴" : "정상"}</th>
                <td style={{ whiteSpace: 'nowrap'}}>{user.createdAt?.substring(0, 10)}</td>
                <td >
                  {/* <button onClick={() => handleEdit(user)}>수정</button> */}
                  <button onClick={() => handleDelete(user.userno)}>삭제</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* 페이지네이션 */}
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        {[...Array(totalPages)].map((_, idx) => (
          <button
            key={idx}
            onClick={() => setPage(idx)}
            style={{
              margin: '0 4px',
              padding: '6px 10px',
              backgroundColor: page === idx ? '#007bff' : '#f1f1f1',
              color: page === idx ? 'white' : '#333',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            {idx + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default AdminUserList;
