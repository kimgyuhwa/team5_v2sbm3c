import React, { useEffect, useState, useRef } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import axios from "axios";

const SOCKET_URL = "/ws-chat";
const SESSION_API = "/user/session";

const ChatRoom = ({ chatRoomno = 21 }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [user, setUser] = useState(null);
  const [isConnected, setIsConnected] = useState(false); // 🔥 연결 여부
  const stompClient = useRef(null);

  useEffect(() => {
    // 1. 웹소켓 먼저 연결
    const socket = new SockJS(SOCKET_URL);
    stompClient.current = new Client({
      webSocketFactory: () => socket,
      onConnect: () => {
        console.log("✅ 웹소켓 연결 완료");
        setIsConnected(true); // 🔥 연결 완료 시 true

        // 채팅방 구독
        stompClient.current.subscribe(`/topic/chatroom/${chatRoomno}`, msg => {
          const message = JSON.parse(msg.body);
          setMessages(prev => [...prev, message]);
        });
      },
      onStompError: (frame) => {
        console.error("❌ STOMP 오류", frame);
      }
    });

    stompClient.current.activate();

    // 2. 세션 및 이전 메시지 로드
    axios.get(SESSION_API, { withCredentials: true }).then(res => {
      if (res.data.sw) {
        const loginUser = {
          userno: res.data.user.userno,
          username: res.data.user.username
        };
        console.log("세션 유저 확인:", loginUser);
        setUser(loginUser);

        axios.get(`/message/chatroom/${chatRoomno}`, { withCredentials: true })
          .then(res => setMessages(res.data))
          .catch(err => console.error("❌ 메시지 로딩 실패:", err));
      } else {
        alert("로그인이 필요합니다.");
      }
    });

    return () => {
      stompClient.current?.deactivate();
    };
  }, [chatRoomno]);

  const sendMessage = () => {
    if (!input.trim() || !user || !isConnected) return;

    const message = {
      chatRoomno,
      senderno: user.userno,
      userName: user.username,
      content: input
    };

    stompClient.current.publish({
      destination: "/app/chat.sendMessage",
      body: JSON.stringify(message)
    });

    setInput("");
  };

  return (
    <div>
      <h3>채팅방 #{chatRoomno} (User: {user?.username})</h3>

      {!isConnected ? (
        <div style={{ padding: 20, fontWeight: "bold" }}>🔌 채팅 서버에 연결 중입니다...</div>
      ) : (
        <>
          <div style={{ height: 300, overflowY: "auto", border: "1px solid black", marginBottom: 10 }}>
            {messages.map((msg, idx) => (
              <div key={idx}>
                <b>{msg.userName}</b>: {msg.content}
              </div>
            ))}
          </div>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="메시지 입력"
          />
          <button onClick={sendMessage}>전송</button>
        </>
      )}
    </div>
  );
};

export default ChatRoom;
