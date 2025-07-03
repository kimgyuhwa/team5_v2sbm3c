from flask import Flask, request, jsonify #, render_template
from flask_cors import CORS
import apitool

app = Flask(__name__)
CORS(app)

# 위젯처럼 띄울거여서 필요없음
# @app.get('/chat') # http://192.168.12.141:5000/translator
# def translator_form():
#     return render_template('chat.html') # /templates/translator.html

@app.post('/chat')
def chat_proc():
    data = request.json
    message = data['message']

    # 번역 요청 예: "번역: 안녕하세요 영어 10살"
    if message.startswith('번역:'):
        try:
            _, rest = message.split('번역:', 1)
            sentence, lang, age = rest.strip().rsplit(' ', 2)
        except ValueError:
            return jsonify({'res': '번역 형식이 잘못되었어요. 예: 번역: 안녕하세요 영어 10살'})

        response = apitool.translate(sentence, lang, age)
        return jsonify(response)

    # 요약 요청 예: "요약: 긴 글 ..."
    elif message.startswith('요약:'):
        content = message.replace('요약:', '').strip()
        response = apitool.summarize(content)
        return jsonify(response)

    # 일반 질문
    else:
        response = apitool.general_chat(message)
        return jsonify(response)

app.run(host="0.0.0.0", port=5000, debug=True)

'''
(base) C:\kd\ws_java\team5_v2sbm3c\team5_react>activate ai
(ai) C:\kd\ws_java\team5_v2sbm3c\team5_react\ai>cd ai
(ai) C:\kd\ws_java\team5_v2sbm3c\team5_react\ai>python translator.py
'''