// src/firebaseConfig.js (새로운 파일로 만들면 관리하기 편해요)
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage'; // Storage를 사용할 거니까 불러옵니다.

// 위에서 복사한 firebaseConfig 정보를 붙여넣으세요.
const firebaseConfig = {
  apiKey: "AIzaSyDWrwDmv28MwM4yjuhkCD3TBmSJu3kzHiQ",
  authDomain: "team5-25417.firebaseapp.com",
  projectId: "team5-25417",
  storageBucket: "team5-25417.firebasestorage.app", // 이 값이 Cloud Storage 버킷 주소입니다.
  messagingSenderId: "975360334343",
  appId: "1:975360334343:web:8334bf1359724e08cd28a2",
};

//measurementId: "G-LLY4ND00L3"

// Firebase 앱 초기화
const app = initializeApp(firebaseConfig);

// Firebase Storage 서비스 인스턴스 가져오기
export const storage = getStorage(app); // 다른 파일에서 쓸 수 있도록 export 합니다.





