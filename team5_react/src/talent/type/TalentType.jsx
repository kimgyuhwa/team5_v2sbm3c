import React from "react";
import TalentTypeList from "./TalentTypeList";
import TalentCreateForm from "./TalentCreateForm";

export default function TalentType() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">재능 타입 관리</h1>
      <TalentCreateForm />
      <TalentTypeList />
    </div>
  );
}
