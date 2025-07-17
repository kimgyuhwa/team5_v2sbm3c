import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { GlobalContext } from '../../components/GlobalContext';
import '../style/TalentCreateForm.css';

const TalentCreateForm = ({ onCreated }) => {
  // 기존 상태
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [typeno, setTypeno] = useState('');
  const [cateGrpno, setCateGrpno] = useState('');
  const [categoryno, setCategoryno] = useState('');
  const [cateGrpList, setCateGrpList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [typeList, setTypeList] = useState([]);
  const { loginUser } = useContext(GlobalContext);

  // 추가: 파일 상태 관리
 const [selectedFiles, setSelectedFiles] = useState([]);


  useEffect(() => {
    axios.get('/talent_cate_grp/list')
      .then(res => setCateGrpList(res.data.content))
      .catch(err => console.error('대분류 목록 불러오기 실패', err));
  }, []);

  useEffect(() => {
    if (cateGrpno) {
      axios.get(`/talent_category/list-by-categrp/${cateGrpno}`)
        .then(res => setCategoryList(res.data))
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

  useEffect(() => {
    axios.get('/talent_type/list')
      .then(res => setTypeList(res.data.content))
      .catch(err => console.error('타입 목록 불러오기 실패', err));
  }, []);

  // 파일 선택 핸들러
  const handleFileChange = (e) => {
    setSelectedFiles(Array.from(e.target.files)); // 다중 파일을 배열로 저장
  };


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

  try {
    // 1. 재능 저장 (파일 제외)
    const dto = {
      title,
      description,
      schoolno: loginUser.schoolno,
      userno: loginUser.userno,
      typeno: Number(typeno),
      categoryno: Number(categoryno),
    };

    const saveRes = await axios.post('/talent/save', dto);
    const savedTalent = saveRes.data; // 등록된 재능 정보 (talentno 포함)

    // 2. 파일 업로드 (파일이 있으면)
    if (selectedFiles.length > 0) {
      const formData = new FormData();
      selectedFiles.forEach((file) => {
        formData.append('files', file);
      });
      formData.append('targetType', 'talent');
      formData.append('talentno', savedTalent.talentno); // 여기 반드시 등록된 talentno 넣기
      formData.append('profile', 'attachment');

      await axios.post('/api/file/upload-multiple', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    }

    alert('등록 성공!');

    // 초기화
    setTitle('');
    setDescription('');
    setTypeno('');
    setCateGrpno('');
    setCategoryno('');
    setCategoryList([]);
    setSelectedFiles([]);

    if (onCreated) onCreated();

  } catch (err) {
    alert('등록 실패: ' + (err.response?.data?.message || err.message));
  }
};

  return (
    <form onSubmit={handleSubmit} className="talent-create-form">
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

      <select value={typeno} onChange={e => setTypeno(e.target.value)} required>
        <option value="">타입 선택</option>
        {typeList.map(type => (
          <option key={type.typeno} value={type.typeno}>{type.name}</option>
        ))}
      </select>

      <select value={cateGrpno} onChange={e => setCateGrpno(e.target.value)} required>
        <option value="">대분류 선택</option>
        {cateGrpList.map(grp => (
          <option key={grp.cateGrpno} value={grp.cateGrpno}>{grp.name}</option>
        ))}
      </select>

      <select value={categoryno} onChange={e => setCategoryno(e.target.value)} required disabled={!cateGrpno}>
        <option value="">소분류 선택</option>
        {categoryList.map(cat => (
          <option key={cat.categoryno} value={cat.categoryno}>{cat.name}</option>
        ))}
      </select>

      {/* 파일 업로드 input 추가 */}
      <input
        type="file"
        multiple
        onChange={handleFileChange}
        accept="image/*"
      />


      <div className="form-button-group">
        <button type="submit">등록</button>
        <button type="close" onClick={() => onCreated?.()}>닫기</button>
      </div>

    </form>
  );
};

export default TalentCreateForm;
