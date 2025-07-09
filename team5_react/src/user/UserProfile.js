import React, { useState, useEffect, useContext } from 'react';
import { GlobalContext } from '../components/GlobalContext';
import { useNavigate } from 'react-router-dom';
import { User, Info, Phone, Mail, Edit, Trash2 } from 'lucide-react';

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

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetch('/user/session', { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        if (data.sw) {
          setForm(data.user);
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
        setIsEditing(false);
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
    <div style={{
      maxWidth: '800px',
      margin: '20px auto',
      padding: '20px',
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      border: '2px solid #e0f2fe',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '20px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b', fontSize: '14px' }}>
          <span>기본정보</span>
          <Info style={{ width: '16px', height: '16px' }} />
        </div>
        {!isEditing && (
          <button onClick={() => setIsEditing(true)} style={{
            padding: '8px 16px',
            backgroundColor: 'white',
            border: '1px solid #cbd5e1',
            borderRadius: '6px',
            color: '#64748b',
            fontSize: '14px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <Edit size={16} />
            정보수정
          </button>
        )}
      </div>

      {isEditing ? (
        <form onSubmit={handleUpdate}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <User style={{ width: '18px', height: '18px', color: '#64748b' }} />
              <input name="username" placeholder="이름" value={form.username} onChange={handleChange} required style={inputStyle} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <User style={{ width: '18px', height: '18px', color: '#64748b' }} />
              <input name="name" placeholder="닉네임" value={form.name} onChange={handleChange} style={inputStyle} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Mail style={{ width: '18px', height: '18px', color: '#64748b' }} />
              <input name="email" placeholder="이메일" value={form.email} onChange={handleChange} type="email" style={inputStyle} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Phone style={{ width: '18px', height: '18px', color: '#64748b' }} />
              <input name="phone" placeholder="전화번호" value={form.phone} onChange={handleChange} style={inputStyle} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Info style={{ width: '18px', height: '18px', color: '#64748b' }} />
              <input name="zipcode" placeholder="우편번호" value={form.zipcode} onChange={handleChange} style={inputStyle} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Info style={{ width: '18px', height: '18px', color: '#64748b' }} />
              <input name="address" placeholder="주소" value={form.address} onChange={handleChange} style={inputStyle} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Info style={{ width: '18px', height: '18px', color: '#64748b' }} />
              <input name="language" placeholder="언어" value={form.language} onChange={handleChange} style={inputStyle} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Info style={{ width: '18px', height: '18px', color: '#64748b' }} />
              <input name="location" placeholder="위치" value={form.location} onChange={handleChange} style={inputStyle} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Info style={{ width: '18px', height: '18px', color: '#64748b' }} />
              <textarea name="bio" placeholder="자기소개" value={form.bio} onChange={handleChange} style={{...inputStyle, height: '100px'}} />
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
            <button type="submit" style={buttonStyle}>저장</button>
            <button type="button" onClick={() => setIsEditing(false)} style={{...buttonStyle, backgroundColor: '#f1f5f9', color: '#475569'}}>취소</button>
          </div>
        </form>
      ) : (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '30px' }}>
            <div style={{ width: '60px', height: '60px', backgroundColor: '#e2e8f0', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <User style={{ width: '30px', height: '30px', color: '#94a3b8' }} />
            </div>
            <div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1e293b', marginBottom: '4px' }}>
                {form.username}
              </div>
              <div style={{ fontSize: '14px', color: '#64748b' }}>
                {form.email}
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <InfoRow icon={<User size={18} />} label="닉네임" value={form.name} />
            <InfoRow icon={<Phone size={18} />} label="전화번호" value={form.phone} />
            <InfoRow icon={<Mail size={18} />} label="이메일" value={form.email} />
            <InfoRow icon={<Info size={18} />} label="주소" value={`${form.address} (${form.zipcode})`} />
            <InfoRow icon={<Info size={18} />} label="언어" value={form.language} />
            <InfoRow icon={<Info size={18} />} label="위치" value={form.location} />
            <InfoRow icon={<Info size={18} />} label="자기소개" value={form.bio} />
          </div>
        </div>
      )}

      <hr style={{ margin: '30px 0', border: '1px solid #e2e8f0' }} />

      <button onClick={handleDelete} style={{
        padding: '8px 16px',
        backgroundColor: '#fee2e2',
        border: '1px solid #fecaca',
        borderRadius: '6px',
        color: '#dc2626',
        fontSize: '14px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
        <Trash2 size={16} />
        회원 탈퇴
      </button>
    </div>
  );
}

const InfoRow = ({ icon, label, value }) => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #e2e8f0' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      {icon}
      <span style={{ fontSize: '14px', color: '#1e293b' }}>{label}</span>
    </div>
    <span style={{ fontSize: '14px', color: '#64748b' }}>{value}</span>
  </div>
);

const inputStyle = {
  width: '100%',
  padding: '8px 12px',
  border: '1px solid #cbd5e1',
  borderRadius: '6px',
  fontSize: '14px'
};

const buttonStyle = {
  padding: '10px 20px',
  border: 'none',
  borderRadius: '6px',
  backgroundColor: '#0ea5e9',
  color: 'white',
  fontSize: '14px',
  cursor: 'pointer'
};

export default UserProfile;