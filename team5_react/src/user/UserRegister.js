// src/pages/UserRegister.js
import React, { useState, useEffect } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';

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

  const location = useLocation(); // 👈 추가
  const certifiedEmail = location.state?.email || '';
  const certifiedSchool = location.state?.schoolName || '';

  useEffect(() => {
    if (certifiedEmail || certifiedSchool) {
      setForm(prev => ({
        ...prev,
        email: certifiedEmail || '',
        schoolId: certifiedSchool || ''
      }));
    }
  }, [certifiedEmail, certifiedSchool]);

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
    <div style={{ 
      width: '30%', 
      
      margin: '0 auto', 
      padding: '30px',
      backgroundColor: 'white',
      borderRadius: '30px',
      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)'
    }}>
      <h2 style={{ 
        textAlign: 'center', 
        color: '#333', 
        marginBottom: '30px' 
      }}>
        회원가입
      </h2>
      
      <div onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <input 
              name="userId" 
              placeholder="아이디 *" 
              value={form.userId} 
              onChange={handleChange} 
              required
              style={{
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '14px',
                flex: 1
              }}
            />
            <button 
              type="button" 
              onClick={checkIdDuplicate} 
              style={{ 
                marginLeft: '10px',
                padding: '12px 16px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            > 
              중복확인 
            </button>
          </div>
          {idCheckMsg && (
            <div style={{ 
              color: isIdChecked ? 'green' : 'red', 
              marginTop: '5px',
              fontSize: '12px'
            }}> 
              {idCheckMsg} 
            </div>
          )}
        </div>

        <input 
          name="password" 
          type="password" 
          placeholder="비밀번호 *" 
          value={form.password} 
          onChange={handleChange} 
          required 
          style={{
            width: '100%',
            padding: '12px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '14px',
            marginBottom: '15px',
            boxSizing: 'border-box'
          }}
        />

        <input 
          name="username" 
          placeholder="이름 *" 
          value={form.username} 
          onChange={handleChange} 
          required 
          style={{
            width: '100%',
            padding: '12px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '14px',
            marginBottom: '15px',
            boxSizing: 'border-box'
          }}
        />

        <input 
          name="name" 
          placeholder="닉네임" 
          value={form.name} 
          onChange={handleChange} 
          style={{
            width: '100%',
            padding: '12px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '14px',
            marginBottom: '15px',
            boxSizing: 'border-box'
          }}
        />

        <input 
          name="email" 
          type="email"
          placeholder="이메일" 
          value={form.email} 
          onChange={handleChange} 
          style={{
            width: '100%',
            padding: '12px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '14px',
            marginBottom: '15px',
            boxSizing: 'border-box'
          }}
        />

        <input 
          name="phone" 
          placeholder="전화번호" 
          value={form.phone} 
          onChange={handleChange} 
          style={{
            width: '100%',
            padding: '12px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '14px',
            marginBottom: '15px',
            boxSizing: 'border-box'
          }}
        />

        <div style={{ marginBottom: '15px' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <input 
              name="zipcode" 
              placeholder="우편번호" 
              value={form.zipcode} 
              readOnly 
              style={{
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '14px',
                flex: 1,
                backgroundColor: '#f5f5f5'
              }}
            />
            <button 
              type="button" 
              onClick={handlePostcode} 
              style={{ 
                marginLeft: '10px',
                padding: '12px 16px',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              주소 찾기
            </button>
          </div>
        </div>

        <input 
          name="address" 
          placeholder="주소" 
          value={form.address} 
          readOnly 
          style={{
            width: '100%',
            padding: '12px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '14px',
            marginBottom: '15px',
            boxSizing: 'border-box',
            backgroundColor: '#f5f5f5'
          }}
        />

        <input 
          name="language" 
          placeholder="언어" 
          value={form.language} 
          onChange={handleChange} 
          style={{
            width: '100%',
            padding: '12px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '14px',
            marginBottom: '15px',
            boxSizing: 'border-box'
          }}
        />

        <input 
          name="location" 
          placeholder="위치" 
          value={form.location} 
          onChange={handleChange} 
          style={{
            width: '100%',
            padding: '12px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '14px',
            marginBottom: '15px',
            boxSizing: 'border-box'
          }}
        />

        <textarea 
          name="bio" 
          placeholder="자기소개" 
          value={form.bio} 
          onChange={handleChange} 
          style={{
            width: '100%',
            padding: '12px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '14px',
            marginBottom: '15px',
            boxSizing: 'border-box',
            minHeight: '80px',
            resize: 'vertical'
          }}
        />

        <input 
          name="schoolName" 
          placeholder="학교 이름" 
          value={form.schoolName} 
          onChange={handleChange} 
          style={{
            width: '100%',
            padding: '12px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '14px',
            marginBottom: '20px',
            boxSizing: 'border-box'
          }}
        />

        <button 
          type="submit" 
          style={{
            width: '100%',
            padding: '15px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'background-color 0.3s'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
        >
          회원가입
        </button>
      </div>
    </div>
  );
}

export default UserRegister;
