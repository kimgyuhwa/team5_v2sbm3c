import React, { useState, useContext, useEffect } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../components/GlobalContext';
import { getIP } from '../components/Tool';

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
  const { sw, setSw, userno, setUserno } = useContext(GlobalContext);

  const idChange = (e) => {
    setId(e.target.value);
    if (saveId === true) {
      localStorage.setItem('savedUserId', id);
    }
  };
  const passwdChange = (e) => {
    setPasswd(e.target.value);
    if (savePasswd === true) {
      localStorage.setItem('savedUserPasswd', passwd);
    }
  };
  const saveIdChange = (e) => {
    setSaveId(e.target.checked);
    if (e.target.checked === true) {
      localStorage.setItem('savedUserId', id);
    } else {
      localStorage.removeItem('savedUserId');
    }
  };
  const savePasswdChange = (e) => {
    setSavePasswd(e.target.checked);
    if (e.target.checked === true) {
      localStorage.setItem('savedUserPasswd', passwd);
    } else {
      localStorage.removeItem('savedUserPasswd');
    }
  };

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
  }, []);

  const send = (event) => {
    fetch(`http://${getIP()}:9093/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
       credentials: "include", 
      body: JSON.stringify({ userId: id, password: passwd })
    })
      .then(result => result.text()) // 문자열 반환
      .then(text => {
        console.log('->', text);
        if (text.includes('성공')) {
          // 성공이면 세션에서 정보 가져옴
          fetch(`http://${getIP()}:9093/user/session`)
            .then(res => res.json())
            .then(data => {
              console.log('session ->', data);
              setSw(true);
              setUserno(data.userno);
            });
        } else {
          alert('아이디 또는 패스워드가 일치하지 않습니다.\n다시 시도해주세요.');
        }
      })
      .catch(err => console.error(err));

    event.preventDefault();
  };

  const test = () => {
    setId('testuser');
    setPasswd('1234');
  };

  return (
    <>
      {sw === true ? (
        <div>
          사용자 로그인 성공했습니다.<br />
          <Link to="/">메인으로 돌아가기</Link>
        </div>
      ) : (
        <>
          <h3>사용자 로그인</h3>
          <form onSubmit={send} style={{ margin: '10px auto', width: '30%', textAlign: 'left' }}>
            <div className="mb-3 mt-3">
              <label className="form-label">아이디:</label>
              <input
                type="text"
                className="form-control"
                id="id"
                placeholder="아이디"
                name="id"
                autoFocus='autoFocus'
                onKeyDown={e => enter_chk(e, 'passwd')}
                onChange={idChange}
                value={id}
              />
            </div>
            <div className="mb-3">
              <input
                type="checkbox"
                id="saveId"
                checked={saveId}
                className="form-check-input"
                onChange={saveIdChange}
              />
              <label className="form-check-label" htmlFor='saveId'>아이디 저장</label>
            </div>
            <div className="mb-3">
              <label className="form-label">패스워드:</label>
              <input
                type="password"
                className="form-control"
                id="passwd"
                placeholder="패스워드"
                name="passwd"
                onKeyDown={e => enter_chk(e, 'btnSend')}
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
              <label className="form-check-label" htmlFor='savePasswd'>패스워드 저장</label>
            </div>
            <div style={{ textAlign: 'center' }}>
              <button id='btnSend' type="submit" className="btn btn-primary" style={{ marginRight: '10px' }}>로그인</button>
              <button id='btnTest' type="button" className="btn btn-primary" onClick={test}>테스트 계정</button>
            </div>
          </form>
        </>
      )}
    </>
  );
}

export default UserLogin;