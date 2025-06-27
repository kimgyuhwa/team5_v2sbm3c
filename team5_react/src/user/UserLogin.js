import React, { useState, useContext, useEffect } from 'react';
import '../App.css';
import { useNavigate, Link } from 'react-router-dom';
import { GlobalContext } from '../components/GlobalContext';

function enter_chk(event, nextTag) {
  if (event.keyCode === 13) {
    document.getElementById(nextTag).focus();
  }
}

function UserLogin() {
  const [id, setId] = useState('');
  const [saveId, setSaveId] = useState(false);
  const [passwd, setPasswd] = useState('');
  const [savePasswd, setSavePasswd] = useState(false);

  const { sw, setSw, userno, setUserno, loginUser, setLoginUser } = useContext(GlobalContext);
  const navigate = useNavigate();

  useEffect(() => {
    const storedId = localStorage.getItem('savedUserId');
    const storedPasswd = localStorage.getItem('savedUserPasswd');

    if (storedId) {
      setId(storedId);
      setSaveId(true);
    }

    if (storedPasswd) {
      setPasswd(storedPasswd);
      setSavePasswd(true);
    }

    fetch(`/user/session`, {
      credentials: 'include',
    }).catch((err) => console.error('세션 복원 오류:', err));
  }, []);

  const idChange = (e) => {
    const value = e.target.value;
    setId(value);
    if (saveId) {
      localStorage.setItem('savedUserId', value);
    }
  };

  const passwdChange = (e) => {
    const value = e.target.value;
    setPasswd(value);
    if (savePasswd) {
      localStorage.setItem('savedUserPasswd', value);
    }
  };

  const saveIdChange = (e) => {
    const checked = e.target.checked;
    setSaveId(checked);
    if (checked) {
      localStorage.setItem('savedUserId', id);
    } else {
      localStorage.removeItem('savedUserId');
    }
  };

  const savePasswdChange = (e) => {
    const checked = e.target.checked;
    setSavePasswd(checked);
    if (checked) {
      localStorage.setItem('savedUserPasswd', passwd);
    } else {
      localStorage.removeItem('savedUserPasswd');
    }
  };

  const send = (event) => {
    event.preventDefault();
    if (!id || !passwd) {
      alert('아이디와 패스워드를 입력해주세요.');
      return;
    }

    fetch(`/user/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ userId: id, password: passwd }),
    })
      .then((res) => res.text())
      .then((text) => {
        if (text.includes('성공')) {
          fetch(`/user/session`)
            .then((res) => res.json())
            .then((data) => {
              localStorage.setItem(
                'loginUser',
                JSON.stringify({
                  userno: data.userno,
                  username: data.username,
                  role: data.role,
                })
              );
              setLoginUser({
                userno: data.userno,
                username: data.username,
                role: data.role,
              });
              setSw(true);
              setUserno(data.userno);
            });
        } else {
          alert('로그인 실패: 아이디 또는 비밀번호가 일치하지 않습니다.');
          setSw(false);
          setUserno(null);
        }
      })
      .catch((err) => {
        console.error('로그인 오류:', err);
        alert('서버 오류가 발생했습니다.');
      });
  };

  const test = () => {
    setId('testId');
    setPasswd('1234');
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      {sw === true ? (
        <div style={{ display: 'flex', gap: '50px', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ width: '600px', height: '400px', backgroundColor: 'white', borderRadius: '20px', boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', fontSize: '18px', color: '#333' }}>
            <div style={{ marginBottom: '20px' }}>사용자 로그인 성공했습니다.</div>
            <button
              onClick={() => navigate('/components/main')}
              style={{
                padding: '12px 24px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                cursor: 'pointer',
              }}
            >
              메인으로 돌아가기
            </button>
          </div>
          {/* 옆 이미지 생략 가능 */}
        </div>
      ) : (
        <form onSubmit={send} style={{ margin: '10px auto', width: '30%', textAlign: 'left' }}>
          <h3 style={{ textAlign: 'center' }}>사용자 로그인</h3>
          <div className="mb-3 mt-3">
            <label className="form-label">아이디:</label>
            <input
              type="text"
              className="form-control"
              id="id"
              placeholder="아이디"
              name="id"
              autoFocus
              onKeyDown={(e) => enter_chk(e, 'passwd')}
              onChange={idChange}
              value={id}
            />
          </div>
          <div className="mb-3">
            <input type="checkbox" id="saveId" checked={saveId} className="form-check-input" onChange={saveIdChange} />
            <label className="form-check-label" htmlFor="saveId">
              아이디 저장
            </label>
          </div>
          <div className="mb-3">
            <label className="form-label">패스워드:</label>
            <input
              type="password"
              className="form-control"
              id="passwd"
              placeholder="패스워드"
              name="passwd"
              onKeyDown={(e) => enter_chk(e, 'btnSend')}
              onChange={passwdChange}
              value={passwd}
            />
          </div>
          <div className="mb-3">
            <input
              type="checkbox"
              id="savePasswd"
              checked={savePasswd}
              className="form-check-input"
              onChange={savePasswdChange}
            />
            <label className="form-check-label" htmlFor="savePasswd">
              패스워드 저장
            </label>
          </div>
          <div style={{ textAlign: 'center' }}>
            <button id="btnSend" type="submit" className="btn btn-primary" style={{ marginRight: '10px' }}>
              로그인
            </button>
            <button type="button" className="btn btn-secondary" onClick={test}>
              테스트 계정
            </button>
            <div style={{ marginTop: '10px' }}>
              <Link to="/user/univCert" style={{ marginRight: '10px' }}>
                학교 인증하기
              </Link>
              <Link to="/user/findId">아이디 찾기</Link>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}

export default UserLogin;
