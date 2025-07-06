import React, { useState, useContext  } from 'react';
import { GlobalContext } from '../components/GlobalContext';

function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const { loginUser } = useContext(GlobalContext);

  // 서버에 메시지 보내고 응답 받기
  const sendMessage = async () => {
    if (!input.trim()) return;

    // 사용자가 보낸 메시지 추가
    setMessages([...messages, { from: 'user', text: input }]);

    // API 호출
    const res = await fetch('http://localhost:5000/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: input, userno: loginUser?.userno }),
    });
    const data = await res.json();

    // 챗봇 응답 추가
    setMessages((prev) => [...prev, { from: 'bot', text: data.res }]);
    setInput('');
  };

  return (
    <>
      {/* 챗봇 버튼 */}
      <button
        style={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          borderRadius: '50%',
          width: 60,
          height: 60,
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          cursor: 'pointer',
          fontSize: 24,
        }}
        onClick={() => setIsOpen(!isOpen)}
      >
        💬
      </button>

      {/* 챗봇 패널 */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: 90,
            right: 20,
            width: 300,
            height: 400,
            backgroundColor: '#fff',
            border: '1px solid #ccc',
            borderRadius: 8,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div
            style={{
              flex: 1,
              padding: 10,
              overflowY: 'auto',
              borderBottom: '1px solid #ddd',
            }}
          >
            {messages.map((msg, idx) => (
              <div
                key={idx}
                style={{
                  textAlign: msg.from === 'user' ? 'right' : 'left',
                  marginBottom: 10,
                }}
              >
                <span
                  style={{
                    display: 'inline-block',
                    padding: '8px 12px',
                    borderRadius: 20,
                    backgroundColor: msg.from === 'user' ? '#007bff' : '#eee',
                    color: msg.from === 'user' ? 'white' : 'black',
                    maxWidth: '80%',
                    wordBreak: 'break-word',
                  }}
                >
                  {msg.text}
                </span>
              </div>
            ))}
          </div>
          <div style={{ padding: 10, display: 'flex' }}>
            <input
              style={{ flex: 1, padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') sendMessage();
              }}
            />
            <button
              onClick={sendMessage}
              style={{
                marginLeft: 8,
                padding: '8px 12px',
                borderRadius: 4,
                border: 'none',
                backgroundColor: '#007bff',
                color: 'white',
                cursor: 'pointer',
              }}
            >
              전송
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default ChatWidget;
