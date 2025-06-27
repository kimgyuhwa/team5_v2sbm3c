import React from "react";
import TalentTypeList from "./TalentTypeList";
import TalentCreateForm from "./TalentCreateForm";

export default function TalentType() {
  const loginUser = JSON.parse(localStorage.getItem("loginUser"));
  // console.log(loginUser);
  if (!loginUser || loginUser.role !== "admin") {
    return <div>접근 권한이 없습니다.</div>;
    
  }
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">재능 타입 관리</h1>
      <TalentCreateForm />
      <TalentTypeList />
    </div>
  );
}
