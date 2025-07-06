from flask import Flask, request, jsonify
from flask_cors import CORS
import apitool  # agent가 정의된 파일

app = Flask(__name__)
CORS(app)

import requests

@app.post("/chat")
def chat_proc():
    data = request.json
    message = data.get("message", "")
    user_id = data.get("userId")  # React에서 넘겨줘야 함

    result = apitool.agent.invoke({"input": message})
    output = result["output"]

    # 🔥 주요 내용 저장 조건 예시 (원하는 조건으로 바꿔도 됨)
    if user_id and len(output) > 20:  # 대충 요약/번역 결과라면
        try:
            save_res = requests.post("http://localhost:8080/api/chatbot/save", json={
                "userno": user_id,
                "content": output
            })
            print("✅ Spring에 저장 결과:", save_res.json())
        except Exception as e:
            print("❌ 저장 실패:", e)

    return jsonify({"res": output})


app.run(host="0.0.0.0", port=5000, debug=True)
