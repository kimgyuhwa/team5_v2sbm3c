import React, { useEffect, useState, useRef, useContext } from "react";
import { useParams } from "react-router-dom";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import axios from "axios";
import { GlobalContext } from "../components/GlobalContext";

const SOCKET_URL = "http://localhost:9093/ws-chat";

export default function ChatRoom({ chatRoomno: propChatRoomno }) {
  const { chatRoomno: paramChatRoomno } = useParams();
  const chatRoomno = propChatRoomno || paramChatRoomno;
  const { loginUser } = useContext(GlobalContext);

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const stompClient = useRef(null);
  const scrollRef = useRef(null);
  const [talentTitle, setTalentTitle] = useState("");
  const [pendingRequest, setPendingRequest] = useState(null);
  const [members, setMembers] = useState([]);


  useEffect(() => {
    if (!chatRoomno) return;

    axios.get(`/chatroom/${chatRoomno}`, { withCredentials: true })
      .then(res => {
        const room = res.data;
        if (room.talentno) {
          axios.get(`/talent/${room.talentno}`)
            .then(talentRes => setTalentTitle(talentRes.data.title))
            .catch(console.error);
        }
      })
      .catch(console.error);
  }, [chatRoomno]);

  useEffect(() => {
    if (!chatRoomno || !loginUser?.userno) return;

    const socket = new SockJS(SOCKET_URL);
    stompClient.current = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      onConnect: () => {
        console.log("✅ WebSocket 연결됨");
        setIsConnected(true);

        stompClient.current.subscribe(`/topic/chatroom/${chatRoomno}`, msg => {
          const message = JSON.parse(msg.body);

          if (message?.type === "REQUEST" && message?.status === "pending") {
            if (Number(message.receiverno) === Number(loginUser.userno)) {
              setPendingRequest(message);
            }
          } else if (message?.type === "SYSTEM") {
            setMessages(prev => [...prev, {
              userName: message.userName,
              content: message.content,
              senderno: null,
              type: "SYSTEM"
            }]);
          } else {
            setMessages(prev => [...prev, message]);
          }
        });
      },
    });

    stompClient.current.activate();

    axios.get(`/message/chatroom/${chatRoomno}`, { withCredentials: true })
      .then(res => setMessages(res.data))
      .catch(console.error);

    return () => {
      stompClient.current?.deactivate();
      console.log("❌ WebSocket 연결 해제");
    };
  }, [chatRoomno, loginUser?.userno]);

  useEffect(() => {
    if (!chatRoomno || !loginUser?.userno) return;

    axios.get(`/request/chatroom/${chatRoomno}`)
      .then(res => {
        const req = res.data;
        if (req?.status === "pending" && req.receiverno === loginUser.userno) {
          setPendingRequest(req);
        }
      })
      .catch(console.error);
  }, [chatRoomno, loginUser?.userno]);

  useEffect(() => {
    axios.get(`/chatroom/${chatRoomno}/members`)
      .then(res => {
        console.log('-> 채팅방 멤버 data: ', res.data);
        setMembers(res.data); // members: [{userno, username, joinedAt}, ...]
      })
      .catch(console.error);
  }, [chatRoomno]);


  const handleAccept = async () => {
    try {
      await axios.patchaxios.get(`/chatmember/chatroom/${chatRoomno}/members`);
      alert("요청을 수락했습니다!");
      setPendingRequest(null);
    } catch (err) {
      alert("요청 수락 실패");
    }
  };

  const handleReject = async () => {
    try {
      await axios.patch(`/request/${pendingRequest.requestno}/reject`);
      alert("요청을 거절했습니다.");
      setPendingRequest(null);
    } catch (err) {
      alert("요청 거절 실패");
    }
  };

  const handleRequest = async () => {
    if (!loginUser?.userno || !chatRoomno) return;

    try {
      const res = await axios.get(`/chatroom/${chatRoomno}?loginUserno=${loginUser.userno}`, { withCredentials: true });
      const room = res.data;

      if (!room.talentno) {
        alert("요청 가능한 게시물이 없습니다.");
        return;
      }

      const dto = {
        talentno: room.talentno,
        giverno: loginUser.userno,
        receiverno: room.receiverno,
        message: `${talentTitle} 요청을 보냅니다.`,
        chatRoomno: room.chatRoomno,
      };

      const saveRes = await axios.post('/request/save', dto);
      alert('요청이 전송되었습니다!');
      console.log('요청 결과:', saveRes.data);

    } catch (error) {
      console.error("요청 전송 실패", error);
      alert('요청 전송 실패');
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;

    const message = {
      chatRoomno: Number(chatRoomno),
      senderno: loginUser.userno,
      userName: loginUser.username,
      content: input,
    };

    stompClient.current.publish({
      destination: "/app/chat.sendMessage",
      body: JSON.stringify(message),
    });

    setInput("");
  };

  return (
    <div className="max-w-md mx-auto flex flex-col max-h-[800px] border shadow-lg rounded-lg">
      {/* 상단 */}
      <div className="bg-blue-600 text-white p-4 font-bold flex justify-between items-center">
        <div>💬 채팅방 #{chatRoomno}</div>
        <div>{loginUser?.username}</div>
        <div>
          <h3 className="font-semibold mb-2">현재 참여자 ({members.length}명)</h3>
          <ul className="text-sm text-gray-700">
            {members.map(member => (
              <li key={member.userno}>👤 {member.username}</li>
            ))}
          </ul>
        </div>

        <button
          onClick={handleRequest}
          className="ml-auto text-sm bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
        >
          요청하기
        </button>
      </div>

      {/* 게시물 정보 */}
      {talentTitle && (
        <div className="px-4 py-1 text-sm text-gray-600 bg-blue-50 border-b">
          📌 게시물: <span className="font-semibold">{talentTitle}</span>
        </div>
      )}

      {/* 메시지 리스트 */}
      <div ref={scrollRef} className="overflow-y-auto bg-gray-50 p-4 h-[560px]">
        {messages.length === 0 ? (
          <div className="text-center text-gray-400 mt-20">
            아직 메시지가 없습니다. 대화를 시작해보세요!
          </div>
        ) : (
          messages.map((msg, idx) => {
            if (msg.type?.toUpperCase() === "SYSTEM") {
              return (
                <div key={idx} className="text-center text-xs text-gray-500 my-2">
                  📢 {msg.content}
                </div>
              );
            }

            const isMine = msg.senderno === loginUser?.userno;
            return (
              <div key={idx} className={`flex ${isMine ? "justify-end" : "justify-start"} mb-2`}>
                <div className={`max-w-xs px-4 py-2 rounded-lg ${isMine ? "bg-blue-500 text-white" : "bg-white border"}`}>
                  <span className="block text-sm font-semibold">{msg.userName}</span>
                  <span>{msg.content}</span>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* 입력창 */}
      <div className="p-4 border-t flex gap-2">
        <input
          className="flex-1 border rounded px-3 py-2"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && sendMessage()}
          placeholder="메시지를 입력하세요"
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          전송
        </button>
      </div>

      {/* 요청 수락/거절 박스 */}
      {pendingRequest && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative my-2 mx-4">
          <strong className="font-bold">📩 요청 알림: </strong>
          <span className="block sm:inline">{pendingRequest.message}</span>
          <div className="mt-2 flex gap-2">
            <button onClick={handleAccept} className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">수락</button>
            <button onClick={handleReject} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">거절</button>
          </div>
        </div>
      )}
    </div>
  );
}
