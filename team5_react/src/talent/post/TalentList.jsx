// TalentList.js
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { GlobalContext } from '../../components/GlobalContext'; // GlobalContext 경로 확인
import { useNavigate } from 'react-router-dom';
import uploadFile from '../../fileupload/FileUpload';

const TalentList = ({ refresh, onUpdated, onDeleted, searchQuery }) => {
    // ⭐ selectedCateGrpno 추가 ⭐
    const { loginUser, selectedCategoryNo, setSelectedCategoryNo, selectedCateGrpno, triggerTalentListRefresh } = useContext(GlobalContext);
    const [talents, setTalents] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [page, setPage] = useState(0);
    const [size] = useState(10);

    // selectedCategoryNo 또는 selectedCateGrpno가 변경될 때 페이지를 0으로 초기화
    useEffect(() => { setPage(0); }, [selectedCategoryNo, selectedCateGrpno]);

    const [editId, setEditId] = useState(null);
    const [editForm, setEditForm] = useState({});
    const [typeList, setTypeList] = useState([]);
    const [cateGrpList, setCateGrpList] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    // const [selectedCateGrpno, setSelectedCateGrpno] = useState(null); // 이 상태는 이제 GlobalContext에서 관리

    const schoolno = loginUser?.schoolno;
    const navigate = useNavigate();
    const [selectedFiles, setSelectedFiles] = useState([]);

    const goToPage = (newPage) => {
        if (newPage < 0 || newPage >= totalPages) return;
        setPage(newPage);
    };

    useEffect(() => {
        if (!schoolno) {
            setTalents([]);
            setTotalPages(1);
            return;
        }

        const params = new URLSearchParams();
        if (searchQuery?.trim()) params.append('keyword', searchQuery.trim());

        // ⭐ 핵심 변경: cateGrpno와 categoryno를 백엔드 로직에 맞게 보냅니다 ⭐
        if (selectedCateGrpno !== null) { // 대분류 ID가 GlobalContext에 있다면 (대분류 선택)
            params.append('cateGrpno', selectedCateGrpno);
        }
        if (selectedCategoryNo !== null) { // 소분류 ID가 GlobalContext에 있다면 (소분류 선택)
            params.append('categoryno', selectedCategoryNo);
        }
        // else if (selectedCategoryNo !== null) { // 이 로직은 이제 위 `if (selectedCateGrpno !== null)`과 분리하여 독립적으로 처리
        //     params.append('categoryno', selectedCategoryNo);
        // }


        params.append('page', page);
        params.append('size', size);
        params.append('schoolno', schoolno);

        console.log("요청 파라미터:", params.toString());

        axios.get(`/talent/search?${params.toString()}`)
            .then(res => {
                const fetchedTalents = res.data.content || [];
                setTotalPages(res.data.totalPages || 1);

                const filtered = fetchedTalents.filter(t =>
                    (loginUser && loginUser.userno === t.userno) || !t.blocked
                );
                setTalents(filtered);
            })
            .catch(err => {
                console.error('목록 불러오기 실패:', err);
                alert('목록 불러오기 실패: ' + err.message);
            });
    }, [refresh, schoolno, searchQuery, selectedCategoryNo, selectedCateGrpno, page, size, loginUser]); // ⭐ selectedCateGrpno를 의존성 배열에 추가 ⭐

    useEffect(() => {
        axios.get('/talent_type/list').then(res => setTypeList(res.data.content));
        // 대분류 목록을 가져올 때, 모든 카테고리 정보도 함께 포함하여 저장합니다.
        // 이는 MainSideBar에서 사용될 수 있는 구조이므로 TalentList에서 직접 쓸 필요는 없지만,
        // 드롭다운 등을 위해 데이터를 미리 로드하는 차원에서 유지.
        axios.get('/talent_cate_grp/list')
            .then(async (res) => {
                const grpList = res.data.content;
                const grpListWithCategories = await Promise.all(grpList.map(async (grp) => {
                    const cateRes = await axios.get(`/talent_category/list-by-categrp/${grp.cateGrpno}`);
                    return { ...grp, categories: cateRes.data };
                }));
                setCateGrpList(grpListWithCategories);
            });
    }, []);

    useEffect(() => {
        if (editForm.cateGrpno) {
            axios.get(`/talent_category/list-by-categrp/${editForm.cateGrpno}`)
                .then(res => setCategoryList(res.data))
                .catch(() => setCategoryList([]));
        } else {
            setCategoryList([]);
        }
    }, [editForm.cateGrpno]);

    const startEdit = (talent) => {
        setEditId(talent.talentno);
        setEditForm({
            title: talent.title,
            description: talent.description,
            typeno: talent.typeno || talent.type,
            cateGrpno: talent.cateGrpno,
            categoryno: talent.categoryno || talent.category,
        });
        setSelectedFiles([]);
    };

    const cancelEdit = () => {
        setEditId(null);
        setEditForm({});
        setSelectedFiles([]);
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditForm(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setSelectedFiles(Array.from(e.target.files));
    };

    const submitEdit = async () => {
        try {
            let uploadedFileData = [];
            if (selectedFiles.length > 0) {
                uploadedFileData = await uploadFile(selectedFiles, 'talent', editId, loginUser.profile);
            }
            const dto = {
                talentno: editId,
                title: editForm.title,
                description: editForm.description,
                typeno: Number(editForm.typeno),
                categoryno: Number(editForm.categoryno),
                fileInfos: uploadedFileData,
            };
            const res = await fetch('/talent/update', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dto),
            });
            if (!res.ok) throw new Error('수정 실패');
            alert('수정 성공!');
            setEditId(null);
            setEditForm({});
            setSelectedFiles([]);
            if (onUpdated) onUpdated();
            triggerTalentListRefresh(); // 목록 갱신 트리거
        } catch (e) {
            alert('에러: ' + e.message);
        }
    };

    const deleteTalent = async (id) => {
        if (!window.confirm('정말 삭제하시겠습니까?')) return;
        try {
            const res = await fetch(`/talent/delete/${id}`, { method: 'DELETE' });
            if (!res.ok) throw new Error('삭제 실패');
            alert('삭제 완료');
            if (onDeleted) onDeleted();
            triggerTalentListRefresh(); // 목록 갱신 트리거
        } catch (e) {
            alert('에러: ' + e.message);
        }
    };

    const sendRequest = async (talent) => {
        if (!loginUser) {
            alert('로그인이 필요합니다.');
            return;
        }
        const dto = {
            talentno: talent.talentno,
            giverno: loginUser.userno,
            receiverno: talent.userno,
            status: 'pending',
            message: '재능 요청합니다.',
        };
        try {
            await axios.post('/request/save', dto);
            alert('요청 성공!');
        } catch (e) {
            alert('요청 실패: ' + e.message);
        }
    };

    const handleGoDetail = (talentno) => {
        navigate(`/talent/detail/${talentno}`);
    };

    return (
        <div className="w-full p-6 bg-white rounded-2xl shadow">
            <h2 className="text-xl font-bold mb-6 text-center">재능 목록</h2>
            {talents.length === 0 ? (
                <div className="text-center text-gray-500">목록이 없습니다.</div>
            ) : (
                talents.map(t =>
                    editId === t.talentno ? (
                        <article key={t.talentno} className="border p-4 rounded-lg mb-4">
                            <header className="mb-4">
                                <h3 className="text-lg font-semibold">재능 수정 - {t.talentno}</h3>
                            </header>
                            <div className="flex flex-col gap-2">
                                <input name="title" value={editForm.title || ''} onChange={handleEditChange}
                                    placeholder="제목" required
                                    className="border p-2 rounded w-full" />
                                <input name="description" value={editForm.description || ''} onChange={handleEditChange}
                                    placeholder="설명" className="border p-2 rounded w-full" />
                                <select name="typeno" value={editForm.typeno || ''} onChange={handleEditChange}
                                    required className="border p-2 rounded w-full">
                                    <option value="">타입 선택</option>
                                    {typeList.map((type) => (
                                        <option key={type.typeno} value={type.typeno}>{type.name}</option>
                                    ))}
                                </select>
                                <select name="cateGrpno" value={editForm.cateGrpno || ''} onChange={handleEditChange}
                                    required className="border p-2 rounded w-full">
                                    <option value="">대분류 선택</option>
                                    {cateGrpList.map((grp) => (
                                        <option key={grp.cateGrpno} value={grp.cateGrpno}>{grp.name}</option>
                                    ))}
                                </select>
                                <select name="categoryno" value={editForm.categoryno || ''} onChange={handleEditChange}
                                    required className="border p-2 rounded w-full">
                                    <option value="">소분류 선택</option>
                                    {categoryList.map((cat) => (
                                        <option key={cat.categoryno} value={cat.categoryno}>{cat.name}</option>
                                    ))}
                                </select>
                                <input type="file" multiple onChange={handleFileChange}
                                    className="border p-2 rounded w-full" />
                            </div>
                            <footer className="flex gap-2 mt-4">
                                <button onClick={submitEdit}
                                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded shadow">저장</button>
                                <button onClick={cancelEdit}
                                    className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded shadow">취소</button>
                            </footer>
                        </article>
                    ) : (
                        <article key={t.talentno}
                            onClick={() => handleGoDetail(t.talentno)}
                            className="relative flex items-center justify-between gap-4 border px-5 py-4 rounded-lg mb-4 hover:shadow cursor-pointer">
                            {t.fileInfos && t.fileInfos.length > 0 && (
                                <img src={`/uploads/talent/${t.fileInfos[0].storedFileName}`}
                                    alt={t.fileInfos[0].originalFileName}
                                    className="w-24 h-24 object-cover rounded shadow"
                                    onClick={(e) => e.stopPropagation()} />
                            )}
                            {/* 오른쪽 상단 카테고리 */}
                            <div className="absolute top-4 right-6 text-xs text-gray-500">
                                {t.cateGrpName} &gt; {t.categoryName}
                            </div>
                            <div className="flex-1 text-left px-4">
                                <h3 className="font-semibold text-lg">{t.title}</h3>
                                <p className="text-gray-500">{t.description || '[설명 없음]'}</p>
                                {/* 조회수 */}
                                <div className="text-right text-xs text-gray-400 mt-2">
                                    조회수 : {t.viewCount}
                                </div>
                            </div>
                        </article>
                    )
                )
            )}

            <div className="flex justify-center items-center gap-4 mt-6">
                <button onClick={() => goToPage(page - 1)} disabled={page <= 0}
                    className="px-4 py-1 rounded bg-gray-200 disabled:opacity-50">이전</button>
                <span>{page + 1} / {totalPages}</span>
                <button onClick={() => goToPage(page + 1)} disabled={page + 1 >= totalPages}
                    className="px-4 py-1 rounded bg-gray-200 disabled:opacity-50">다음</button>
            </div>
        </div>
    );
};

export default TalentList;