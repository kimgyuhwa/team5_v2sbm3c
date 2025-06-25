// src/pages/UserRegister.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function UserRegister() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    userId: '',
    password: '',
    username: '',
    name: '',
    email: '',
    phone: '',
    zipcode: '',
    address: '',
    language: '',
    location: '',
    bio: '',
    role: '',
    schoolId: '', // 학교 선택 시 사용
  });

  const [idCheckMsg, setIdCheckMsg] = useState('');
  const [isIdChecked, setIsIdChecked] = useState(false); // 중복확인 완료 여부

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
     if (e.target.name === 'userId') {
      setIsIdChecked(false);   // 아이디 변경되면 다시 중복 확인 필요
      setIdCheckMsg('');
    }
  };

  // 아이디 중복 확인 함수
  const checkIdDuplicate = async () => {
    if (!form.userId.trim()) {
      setIdCheckMsg('아이디를 입력하세요.');
      return;
    }
    try {
      const res = await fetch(`/user/checkId?userId=${encodeURIComponent(form.userId)}`);
      const data = await res.json(); // { sw: true/false, msg: '...' } 형태 가정
      if (data.sw === true) {
        setIdCheckMsg('사용 가능한 아이디입니다.');
        setIsIdChecked(true);
      } else {
        setIdCheckMsg('이미 사용 중인 아이디입니다.');
        setIsIdChecked(false);
      }
    } catch (err) {
      setIdCheckMsg('오류가 발생했습니다. 다시 시도하세요.');
      setIsIdChecked(false);
    }
  };

  //카카오 주소 검색
  const handlePostcode = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        // 주소 선택 시
        setForm({
          ...form,
          zipcode: data.zonecode,
          address: data.roadAddress || data.jibunAddress,
        });
      },
    }).open();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/user/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });
      const text = await res.text();
      console.log(text);
      alert('회원가입 성공!');
      navigate('/login'); // 가입 후 로그인 페이지로 이동
    } catch (err) {
      console.error(err);
      alert('회원가입 실패');
    }
  };

  return (
    <div style={{ width: '50%', margin: '0 auto' }}>
      <h2>회원가입</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input name="userId" placeholder="아이디" value={form.userId} onChange={handleChange} required/>
          <button type="button" onClick={checkIdDuplicate} style={{ marginLeft: '10px' }}> 중복확인 </button>
        </div>
        <div style={{ color: isIdChecked ? 'green' : 'red', marginTop: '5px' }}> {idCheckMsg} </div>
        <input name="password" type="password" placeholder="비밀번호" value={form.password} onChange={handleChange} required /><br />
        <input name="username" placeholder="이름" value={form.username} onChange={handleChange} required /><br />
        <input name="name" placeholder="닉네임" value={form.name} onChange={handleChange} /><br />
        <input name="email" placeholder="이메일" value={form.email} onChange={handleChange} /><br />
        <input name="phone" placeholder="전화번호" value={form.phone} onChange={handleChange} /><br />
        {/* 우편번호 API 영역 */}
        <input name="zipcode" placeholder="우편번호" value={form.zipcode} readOnly />
        <button type="button" onClick={handlePostcode} style={{ marginLeft: '10px' }}>주소 찾기</button><br />
        <input name="address" placeholder="주소" value={form.address} readOnly /><br />
        {/* 우편번호 API 영역 */}
        <input name="language" placeholder="언어" value={form.language} onChange={handleChange} /><br />
        <input name="location" placeholder="위치" value={form.location} onChange={handleChange} /><br />
        <textarea name="bio" placeholder="자기소개" value={form.bio} onChange={handleChange} /><br />
        {/* <input name="role" placeholder="역할 (ex: USER)" value={form.role} onChange={handleChange} /><br /> */}
        {/* <input name="schoolId" placeholder="학교 ID" value={form.schoolId} onChange={handleChange} /><br /> */}
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
}

export default UserRegister;
