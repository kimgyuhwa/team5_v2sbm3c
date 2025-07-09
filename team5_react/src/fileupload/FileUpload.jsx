import axios from 'axios';

const uploadFile = async (file, targetType, talentno, profile) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('targetType', targetType);
  formData.append('talentno', talentno);  // 함수 매개변수로 전달받은 값 사용
  formData.append('profile', profile);

  const response = await axios.post('/api/file/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};


export default uploadFile;