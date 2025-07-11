// src/components/FileUploader.jsx
import React, { useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebaseConfig'; // 위에서 export한 storage 인스턴스를 가져옵니다.

function FileUploader() {
  const [selectedFile, setSelectedFile] = useState(null); // 사용자가 선택한 파일
  const [uploadProgress, setUploadProgress] = useState(0); // 업로드 진행률

  // **(사용자가 누를 것 1)**: 파일 선택 창 열기
  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]); // 선택된 파일을 state에 저장
      setUploadProgress(0); // 새 파일 선택 시 진행률 초기화
    }
  };

  // **(사용자가 누를 것 2)**: 파일 업로드 시작 버튼
  const handleUpload = () => {
    if (!selectedFile) {
      alert("먼저 업로드할 파일을 선택해주세요!");
      return;
    }

    // 1. Firebase Storage에 파일을 저장할 '위치' 지정하기
    // 예: 'images/고객님이선택한파일이름.jpg'
    const storageRef = ref(storage, `images/${selectedFile.name}`);

    // 2. 업로드 작업 시작!
    const uploadTask = uploadBytesResumable(storageRef, selectedFile);

    // 3. 업로드 진행 상황 모니터링 (선택 사항이지만 유용해요!)
    uploadTask.on('state_changed',
      (snapshot) => {
        // 현재 업로드된 바이트 / 총 바이트 * 100
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress); // 진행률을 state에 업데이트해서 화면에 표시
        console.log('업로드 진행률: ' + progress.toFixed(2) + '%');
      },
      (error) => {
        // 업로드 중 에러 발생 시
        console.error("파일 업로드 중 오류 발생:", error);
        alert(`파일 업로드 실패: ${error.message}`);
      },
      () => {
        // 업로드 완료 시!
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("파일 업로드 성공! 다운로드 URL:", downloadURL);
          alert("파일 업로드 성공! URL: " + downloadURL);
          setSelectedFile(null); // 업로드 완료 후 파일 선택 초기화
          // 이제 이 downloadURL을 Cloud Firestore 같은 데이터베이스에 저장하여
          // 나중에 앱에서 이 이미지를 불러올 수 있도록 할 수 있습니다!
        });
      }
    );
  };

  return (
    <div>
      <h3>Firebase 파일 업로드</h3>
      {/* 📸 이 input 요소를 "눌러서" 컴퓨터에서 파일을 선택합니다 */}
      <input type="file" onChange={handleFileChange} />

      {selectedFile && (
        <p>선택된 파일: **{selectedFile.name}**</p>
      )}

      {/* 🚀 이 버튼을 "눌러서" 선택된 파일을 Firebase Storage에 업로드합니다 */}
      <button onClick={handleUpload} disabled={!selectedFile}>
        업로드 시작
      </button>

      {uploadProgress > 0 && uploadProgress < 100 && (
        <p>업로드 중: {uploadProgress.toFixed(2)}%</p>
      )}
      {uploadProgress === 100 && <p>업로드 완료!</p>}
    </div>
  );
}

export default FileUploader;
