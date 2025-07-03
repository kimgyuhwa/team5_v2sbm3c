# apitool.py

import os
import json
from openai import OpenAI

client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))

# 공통 답변 함수
def answer(role, prompt, format, llm='gpt-4.1-nano', output='json'):
    if output.lower() == 'json':
        response = client.chat.completions.create(
            model=llm,
            messages=[
                {'role': 'system', 'content': role},
                {'role': 'user', 'content': prompt + '\n\n출력 형식(json): ' + format}
            ],
            n=1,
            max_tokens=3000,
            temperature=0,
            response_format={ "type": "json_object" }
        )
    else:
        response = client.chat.completions.create(
            model=llm,
            messages=[
                {'role': 'system', 'content': role},
                {'role': 'user', 'content': prompt}
            ],
            n=1,
            max_tokens=3000,
            temperature=0
        )
    
    return json.loads(response.choices[0].message.content)

# ✅ 번역 기능
def translate(sentence, lang, age, llm='gpt-4.1-mini'):
    prompt = f'아래 문장을 {age}살 수준의 {lang}로 번역해줘.\n\n{sentence}'
    format = '''
    {
        "res": "번역된 문장"
    }
    '''
    return answer('너는 번역가야', prompt, format, llm)

# ✅ 요약 기능
def summarize(content, llm='gpt-4.1-mini'):
    prompt = f'아래 글을 3줄로 요약해줘:\n\n{content}'
    format = '''
    {
        "res": "요약된 문장"
    }
    '''
    return answer('너는 요약 전문가야', prompt, format, llm)

# ✅ 일반 질문 응답 기능
def general_chat(message, llm='gpt-4.1-mini'):
    prompt = f"{message}"
    format = '''
    {
        "res": "질문에 대한 답변"
    }
    '''
    return answer('너는 유용한 AI 도우미야', prompt, format, llm)
