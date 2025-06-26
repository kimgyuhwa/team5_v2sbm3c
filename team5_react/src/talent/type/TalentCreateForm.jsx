import React, { useState } from "react";
import axios from "axios";

export default function TalentCreateForm() {
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/talent_type/save", { name });
      setName("");
      window.location.reload(); // 단순 리로드로 갱신
    } catch (err) {
      alert("등록 실패: " + err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 flex gap-2">
      <input
        className="border p-2 rounded w-full"
        placeholder="재능 타입 이름 입력"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <button className="bg-blue-500 text-white px-4 py-2 rounded">등록</button>
    </form>
  );
}
