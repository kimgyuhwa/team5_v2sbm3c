import React, { useState } from "react";
import axios from "axios";

export default function TalentUpdate({ typeno, currentName }) {
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(currentName);

  const handleUpdate = async () => {
    try {
      await axios.put("/talent_type/update", { typeno, name });
      setEditMode(false);
      window.location.reload();
    } catch (err) {
      alert("수정 실패: " + err.message);
    }
  };

  return editMode ? (
    <div className="flex gap-1">
      <input
        className="border p-1 rounded"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button className="bg-green-500 text-white px-2" onClick={handleUpdate}>저장</button>
    </div>
  ) : (
    <button className="bg-yellow-400 px-2 py-1 rounded" onClick={() => setEditMode(true)}>
      수정
    </button>
  );
}