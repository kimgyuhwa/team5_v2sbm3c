import React, { useEffect, useState, useRef, useContext } from "react";
import { useParams } from "react-router-dom";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import axios from "axios";
import { GlobalContext } from "../components/GlobalContext";

const SOCKET_URL = "http://192.168.12.141:9093/ws-chat";

export default function ChatRoom() {
  const { chatRoomno } = useParams();
  const { loginUser } = useContext(GlobalContext);

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const stompClient = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    const socket = new SockJS(SOCKET_URL);
    stompClient.current = new Client({
      webSocketFactory: () => socket,
      onConnect: () => {
        console.log("✅ 연결");
        setIsConnected(true);
        stompClient.current.subscribe(`/topic/chatroom/${chatRoomno}`, msg => {
          const message = JSON.parse(msg.body);
          setMessages(prev => [...prev, message]);
        });
      },
    });

    stompClient.current.activate();

    if (loginUser) {
      axios.get(`/message/chatroom/${chatRoomno}`, { withCredentials: true })
        .then(res => setMessages(res.data))
        .catch(console.error);
    }

    return () => stompClient.current?.deactivate();
  }, [chatRoomno, loginUser]);

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

  useEffect(() => {
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  return (
    <div className="max-w-md mx-auto flex flex-col max-h-[800px] border shadow-lg rounded-lg">
      {/* 상단 */}
      <div className="bg-blue-600 text-white p-4 font-bold flex justify-between items-center">
        <div>💬 채팅방 #{chatRoomno}</div>
        <div>{loginUser?.username}</div>
      </div>

      {/* 메시지 리스트 */}
      <div ref={scrollRef} className="overflow-y-auto bg-gray-50 p-4 h-[800px]">
        {messages.map((msg, idx) => {
          const isMine = msg.senderno === loginUser?.userno;
          return (
            <div key={idx} className={`flex ${isMine ? "justify-end" : "justify-start"} mb-2`}>
              <div className={`max-w-xs px-4 py-2 rounded-lg ${isMine ? "bg-blue-500 text-white" : "bg-white border"}`}>
                <span className="block text-sm font-semibold">{msg.userName}</span>
                <span>{msg.content}</span>
              </div>
            </div>
          );
        })}
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
    </div>
  );
}
