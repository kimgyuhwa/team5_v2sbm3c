import React, { useState, useEffect, useContext } from 'react';
import { GlobalContext } from '../components/GlobalContext';
import { useNavigate } from 'react-router-dom';

function UserProfile() {
  const { userno, setSw, setUserno } = useContext(GlobalContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: '',
    name: '',
    email: '',
    phone: '',
    zipcode: '',
    address: '',
    language: '',
    location: '',
    bio: '',
    role: ''
  });

  // 사용자 정보 불러오기 (필요시 API 호출 추가)
  useEffect(() => {
    // 예: /user/session 혹은 /user/profile API 호출해서 초기값 세팅
    fetch('/user/session', { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        if (data.sw) {
          setForm(
            // ...form,
            // username: data.user.username || '',
            // name: data.user.name || '',
            // language: data.user.language || '',
            // 필요한 필드들 추가 세팅
            data.user
          );
          //console.log(data)
        }
      })
      .catch(console.error);
  }, []);

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value});
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/user/update', {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify(form),
      });
      const result = await res.json();
      if (result.sw) {
        alert('회원정보 수정 완료!');
      } else {
        alert('수정 실패: ' + result.msg);
      }
    } catch (err) {
      console.error(err);
      alert('오류가 발생했습니다.');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('정말 탈퇴하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) return;

    try {
      const res = await fetch('/user/delete', {
        method: 'DELETE',
        credentials: 'include',
      });
      const result = await res.json();
      if (result.sw) {
        alert('회원 탈퇴 완료!');
        setSw(false);
        setUserno(0);
        navigate('/');
      } else {
        alert('탈퇴 실패: ' + result.msg);
      }
    } catch (err) {
      console.error(err);
      alert('오류가 발생했습니다.');
    }
  };

  return (
    <div style={{ width: '50%', margin: '0 auto' }}>
      <h2>회원 정보 수정</h2>
      <form onSubmit={handleUpdate}>
        <input name="username"  placeholder="이름" value={form.username} onChange={handleChange} required/>
        <br />
        <input name="name" placeholder="닉네임" value={form.name} onChange={handleChange}/>
        <br />
        <input name="email" placeholder="이메일" value={form.email} onChange={handleChange} type="email"/>
        <br />
        <input name="phone" placeholder="전화번호" value={form.phone} onChange={handleChange}/>
        <br />
        <input name="zipcode" placeholder="우편번호" value={form.zipcode} onChange={handleChange}/>
        <br />
        <input name="address" placeholder="주소" value={form.address} onChange={handleChange}/>
        <br />
        <input name="language" placeholder="언어" value={form.language} onChange={handleChange}/>
        <br />
        <input name="location" placeholder="위치" value={form.location} onChange={handleChange}/>
        <br />
        <textarea name="bio" placeholder="자기소개" value={form.bio} onChange={handleChange}/>
        <br />
        {/*<input name="role" placeholder="역할" value={form.role} onChange={handleChange}/>
        <br />*/}
        <button type="submit">수정하기</button>
      </form>

      <hr />

      <button onClick={handleDelete} style={{ color: 'red' }}>
        회원 탈퇴
      </button>
    </div>
  );
}

export default UserProfile;