import React, { useEffect, useState } from "react";
import axios from "axios";
import TalentUpdate from "./TalentUpdate";
import TalentDelete from "./TalentDelete";

export default function TalentTypeList() {
  const [data, setData] = useState([]);
  const [keyword, setKeyword] = useState("");

  const fetchData = async () => {
    const res = await axios.get(`/talent_type/list?keyword=${keyword}`);
    setData(res.data.content);
  };

  useEffect(() => {
    fetchData();
  }, [keyword]);

  return (
    <div>
      <input
        className="border p-2 rounded w-full mb-2"
        placeholder="검색어 입력"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">번호</th>
            <th className="border p-2">이름</th>
            <th className="border p-2">수정</th>
            <th className="border p-2">삭제</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.typeno}>
              <td className="border p-2 text-center">{item.typeno}</td>
              <td className="border p-2">{item.name}</td>
              <td className="border p-2 text-center">
                <TalentUpdate typeno={item.typeno} currentName={item.name} />
              </td>
              <td className="border p-2 text-center">
                <TalentDelete typeno={item.typeno} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}