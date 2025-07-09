from flask import Flask, request, jsonify
from flask_cors import CORS
import apitool  # agent 정의된 모듈

app = Flask(__name__)
CORS(app)

@app.post("/chat")
def chat_proc():
    data = request.json
    message = data.get("message", "")
    userno = data.get("userno")  # React에서 보내주는 사용자 번호

    # userno를 agent에 전달
    apitool.CURRENT_USERNO = userno

    # ✅ agent 실행
    result = apitool.agent.invoke({"input": message, "userno": userno})
    output = result["output"]

    # ✅ 시스템 메시지 필터링
    if "Agent stopped due to" in output:
        output = "죄송해요! 제가 질문을 잘 이해하지 못했어요. 궁금한 점을 조금 더 자세히 알려주실 수 있을까요?"

    return jsonify({"res": output})

app.run(host="0.0.0.0", port=5000, debug=True)
