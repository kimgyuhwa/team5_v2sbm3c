import React, { useState, useEffect, useContext } from 'react';
import { GlobalContext } from '../components/GlobalContext';
import { useNavigate } from 'react-router-dom';
import { User, Info, Phone, Mail, Edit, Trash2 } from 'lucide-react';

function UserProfile() {
  const { userno, setSw, setUserno, loginUser } = useContext(GlobalContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: loginUser.username,
    name: loginUser.name,
    email: loginUser.email,
    phone: loginUser.phone,
    zipcode: loginUser.zipcode,
    address: loginUser.address,
    language: loginUser.language,
    location: loginUser.location,
    bio: loginUser.bio,
    role: loginUser.role,
    profileImage: loginUser.profileImage  // ⭐ 프로필 이미지 파일명
  });

<<<<<<< HEAD
  const [profileFile, setProfileFile] = useState(null); // ⭐ 업로드할 파일
  const baseUrl = "/uploads/";

  // 사용자 정보 불러오기 (필요시 API 호출 추가)
  useEffect(() => {
     if (loginUser) {
    setForm(loginUser);
    console.log("✅ loginUser 정보:", loginUser);
  }
  }, [loginUser]);
=======
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
>>>>>>> 5998394bba037a6ce0c40723d5d62b42aec6112e

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value});
  };

 const handleFileChange = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  setProfileFile(file); // 파일 상태 저장

  const formData = new FormData();
  formData.append('file', file);
  formData.append('purpose', 'PROFILE');
  formData.append('targetType', 'USER');
  formData.append('targetId', userno);

  try {
    const res = await fetch('/fileupload/upload', {
      method: 'POST',
      credentials: 'include',
      body: formData,
    });

    const result = await res.json();
    if (result && result.storedFileName) {
      const updatedForm = { ...form, profileImage: result.storedFileName };
      setForm(updatedForm);

      // loginUser에도 반영 (선택사항, sessionStorage 업데이트 용)
      loginUser.profileImage = result.storedFileName;
      sessionStorage.setItem('loginUser', JSON.stringify(loginUser));
      
    } else {
      alert('업로드 실패');
    }
  } catch (err) {
    console.error(err);
    alert('업로드 중 오류 발생');
  }
};

  const handleProfileUpload = async () => {
    if (!profileFile) return alert('업로드할 파일을 선택하세요.');

    const formData = new FormData();
    formData.append('file', profileFile);
    formData.append('purpose', 'PROFILE');
    formData.append('targetType', 'USER');
    formData.append('targetId', userno);

    try {
      const res = await fetch('/fileupload/upload', {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });
      const result = await res.json();
<<<<<<< HEAD
      if (result && result.storedFileName) {
        setForm({ ...form, profileImage: result.storedFileName });  // ⭐ 상태에 반영
=======
      if (result.sw) {
        alert('회원정보 수정 완료!');
        setIsEditing(false);
>>>>>>> 5998394bba037a6ce0c40723d5d62b42aec6112e
      } else {
        alert('업로드 실패');
      }
    } catch (err) {
      console.error(err);
      alert('업로드 중 오류 발생');
    }
  };

  const handleUpdate = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  for (const key in form) {
    formData.append(key, form[key]);
  }
  if (profileFile) {
    formData.append('profileImage', profileFile); // 🔥 한 번에 업로드
  }

  try {
    const res = await fetch('/user/update', {
      method: 'POST',
      body: formData,
      credentials: 'include',
    });

    const result = await res.json();
    if (result.sw) {
      alert('회원정보 수정 완료!');
    } else {
      alert('수정 실패: ' + result.msg);
    }
  } catch (err) {
    console.error(err);
    alert('오류 발생');
  }
};


  const handleDelete = async () => {
    if (!window.confirm('정말 탈퇴하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) return;

    try {
      const res = await fetch(`/users/${userno}/deactivate`, {
        method: 'patch',
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
console.log("프로필 이미지 파일명:", loginUser.profileImage);
  return (
<<<<<<< HEAD
  <div style={{ width: '400px', margin: '0 auto', padding: '20px' }}>
    <h2 style={{ textAlign: 'center' }}>회원 정보 수정</h2>

    <div style={{ textAlign: 'center', marginBottom: '20px' }}>
      <img
        src={form.profileImage ? baseUrl + loginUser.profileImage : '/uploads/default-profile.png'}
        alt="프로필"
        style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '50%' }}
      />
      <div style={{ marginTop: '10px' }}>
        <input type="file" onChange={handleFileChange} accept="image/*" />
      </div>
    </div>

    <form onSubmit={handleUpdate}>
      {[
        ['username', '이름'],
        ['name', '닉네임'],
        ['email', '이메일', 'email'],
        ['phone', '전화번호'],
        ['zipcode', '우편번호'],
        ['address', '주소'],
        ['language', '언어'],
        ['location', '위치'],
      ].map(([name, label, type = 'text']) => (
        <div key={name} style={{ marginBottom: '10px' }}>
          <label htmlFor={name} style={{ display: 'block', fontWeight: 'bold' }}>{label}</label>
          <input
            id={name}
            name={name}
            type={type}
            value={form[name]}
            onChange={handleChange}
            style={{ width: '100%', padding: '6px' }}
            required={name === 'username'}
          />
        </div>
      ))}

      <div style={{ marginBottom: '10px' }}>
        <label htmlFor="bio" style={{ display: 'block', fontWeight: 'bold' }}>자기소개</label>
        <textarea
          id="bio"
          name="bio"
          value={form.bio}
          onChange={handleChange}
          rows={3}
          style={{ width: '100%', padding: '6px' }}
        />
      </div>

      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button type="submit" style={{ padding: '8px 16px' }}>수정하기</button>
      </div>
    </form>

    <hr style={{ margin: '30px 0' }} />

    <div style={{ textAlign: 'center' }}>
      <button onClick={handleDelete} style={{ color: 'red', background: 'none', border: '1px solid red', padding: '8px 16px' }}>
=======
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
>>>>>>> 5998394bba037a6ce0c40723d5d62b42aec6112e
        회원 탈퇴
      </button>
    </div>
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