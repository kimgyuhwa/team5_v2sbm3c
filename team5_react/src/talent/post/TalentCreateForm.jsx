import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TalentCreateForm = ({ onCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [language, setLanguage] = useState('');
  const [typeno, setTypeno] = useState('');
  const [cateGrpno, setCateGrpno] = useState(''); // 대분류 선택값
  const [categoryno, setCategoryno] = useState(''); // 소분류 선택값

  const [cateGrpList, setCateGrpList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [typeList, setTypeList] = useState([]);

  const loginUser = JSON.parse(localStorage.getItem('loginUser')); // userno 가져오기

  // 대분류 리스트 불러오기
  useEffect(() => {
    axios.get('/talent_cate_grp/list')
      .then(res => setCateGrpList(res.data.content))
      .catch(err => console.error('대분류 목록 불러오기 실패', err));
  }, []);

  // 대분류 변경 시 소분류 리스트 불러오기
  useEffect(() => {
    if (cateGrpno) {
      axios.get(`/talent_category/list-by-categrp/${cateGrpno}`)
      .then(res => {
        console.log('API 응답 전체:', res.data);
        setCategoryList(res.data);
      })
      .catch(err => {
        console.error('소분류 목록 불러오기 실패', err);
        setCategoryList([]);
      });
      setCategoryno('');
    } else {
      setCategoryList([]);
      setCategoryno('');
    }
  }, [cateGrpno]);

  // 타입 리스트 불러오기
  useEffect(() => {
    axios.get('/talent_type/list')
      .then(res => setTypeList(res.data.content))
      .catch(err => console.error('타입 목록 불러오기 실패', err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!loginUser?.userno) {
      alert('로그인이 필요합니다.');
      return;
    }
    if (!title.trim()) {
      alert('제목을 입력하세요.');
      return;
    }
    if (!typeno) {
      alert('타입을 선택하세요.');
      return;
    }
    if (!cateGrpno) {
      alert('대분류를 선택하세요.');
      return;
    }
    if (!categoryno) {
      alert('소분류를 선택하세요.');
      return;
    }

    const dto = {
      title,
      description,
      language,
      schoolno: 1, // 필요에 따라 변경
      userno: loginUser.userno,
      typeno: Number(typeno),
      categoryno: Number(categoryno),
    };

    try {
      const res = await axios.post('/talent/save', dto);
      alert('등록 성공!');
      // 초기화
      setTitle('');
      setDescription('');
      setLanguage('');
      setTypeno('');
      setCateGrpno('');
      setCategoryno('');
      setCategoryList([]);
      if (onCreated) onCreated();
    } catch (err) {
      alert('등록 실패: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>재능 등록</h3>

      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="제목"
        required
      />

      <input
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder="설명"
      />

      <input
        value={language}
        onChange={e => setLanguage(e.target.value)}
        placeholder="언어"
      />

      {/* 타입 선택 */}
      <select value={typeno} onChange={e => setTypeno(e.target.value)} required>
        <option value="">타입 선택</option>
        {typeList.map(type => (
          <option key={type.typeno} value={type.typeno}>{type.name}</option>
        ))}
      </select>

      {/* 대분류 선택 */}
      <select value={cateGrpno} onChange={e => setCateGrpno(e.target.value)} required>
        <option value="">대분류 선택</option>
        {cateGrpList.map(grp => (
          <option key={grp.cateGrpno} value={grp.cateGrpno}>{grp.name}</option>
        ))}
      </select>

      {/* 소분류 선택 */}
      <select value={categoryno} onChange={e => setCategoryno(e.target.value)} required disabled={!cateGrpno}>
        <option value="">소분류 선택</option>
        {categoryList.map(cat => (
          <option key={cat.categoryno} value={cat.categoryno}>{cat.name}</option>
        ))}
      </select>

      <button type="submit">등록</button>
    </form>
  );
};

export default TalentCreateForm;
