# review_ai_server.py
from flask import Flask, request, jsonify
from flask_cors import CORS # CORS 허용을 위해 필요
from langchain_openai import ChatOpenAI
from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import StrOutputParser
import os # API 키를 환경 변수에서 로드하기 위해 필요

app = Flask(__name__)
CORS(app) # 모든 Origin 허용 (개발 단계에서만 사용, 실제 운영 시에는 특정 Origin만 허용 권장)

# LangChain 초기화
# API 키를 환경 변수에서 가져오도록 설정 (예: OPENAI_API_KEY)
# 실제 사용 시에는 직접 코드에 넣지 말고 환경 변수에서 로드하는 것이 보안상 안전합니다.
llm = ChatOpenAI(model="gpt-4o-mini", temperature=0) # gpt-4o-mini 모델 사용

# 리뷰 요약 함수
def summarize_reviews(review_texts: list) -> str:
    """
    주어진 리뷰 텍스트 리스트를 종합하여 핵심 내용을 간결하게 요약합니다.
    """
    # ⭐⭐⭐ 이 부분을 수정해야 합니다. ⭐⭐⭐
    # 각 리뷰 텍스트의 앞뒤 공백을 제거하고, 빈 문자열이 된 리뷰는 제외합니다.
    cleaned_review_texts = [text.strip() for text in review_texts if text and text.strip()]
    
    print(f"summarize_reviews: 전처리 후 남은 리뷰 내용: {cleaned_review_texts}") # ⭐ 디버그 로그 추가 ⭐
    
    if not cleaned_review_texts: # 전처리 후 리스트가 비어있는지 확인
        print("summarize_reviews: 전처리 후 요약할 리뷰가 없습니다.") # ⭐ 디버그 로그 추가 ⭐
        return "요약할 리뷰가 없습니다."

    # 모든 리뷰 텍스트를 하나의 큰 문자열로 결합
    combined_reviews = "\n\n".join(cleaned_review_texts)
    
    print(f"summarize_reviews: 요약을 위해 결합된 최종 내용: \n---START---\n{combined_reviews}\n---END---") # ⭐ 디버그 로그 추가 ⭐
    
    # LangChain PromptTemplate을 사용하여 요약 프롬프트 정의
    prompt_template = PromptTemplate.from_template(
        "다음 리뷰 목록을 종합하여 핵심 내용을 간결하게 요약해줘:\n\n{content}"
    )
    
    # LangChain 체인 생성: 프롬프트 -> LLM -> 문자열 파서
    chain = prompt_template | llm | StrOutputParser()
    
    # 체인 실행 및 결과 반환
    summary = chain.invoke({"content": combined_reviews})
    
    print(f"summarize_reviews: LLM으로부터 받은 요약 결과: {summary}") # ⭐ 디버그 로그 추가 ⭐
    
    return summary

# ⭐ Flask API 엔드포인트 정의 ⭐
@app.route('/summarize-reviews', methods=['POST'])
def summarize_reviews_api():
    """
    POST 요청으로 리뷰 텍스트 리스트를 받아 AI로 요약한 후 반환하는 API 엔드포인트.
    요청 JSON 형식: {"reviewComments": ["리뷰1 내용", "리뷰2 내용", ...]}
    응답 JSON 형식: {"summary": "요약된 내용"}
    """
    data = request.json # 요청 바디에서 JSON 데이터 파싱
    print(f"Python AI Server - 요청 받은 원본 데이터: {data}")

    # 'reviewComments' 키가 없거나 데이터가 비어있으면 에러 반환
    if not data or 'reviewComments' not in data or not isinstance(data['reviewComments'], list):
        return jsonify({"error": "유효한 리뷰 데이터(reviewComments 리스트)가 제공되지 않았습니다."}), 400

    review_comments = data['reviewComments'] # 프런트에서 넘어온 리뷰 텍스트 리스트

    try:
        # summarize_reviews 함수 호출하여 요약 수행
        summary = summarize_reviews(review_comments)
        return jsonify({"summary": summary}) # 요약 결과를 JSON으로 반환
    except Exception as e:
        # 요약 중 예외 발생 시 에러 응답 반환
        print(f"리뷰 요약 중 오류 발생: {e}")
        return jsonify({"error": f"리뷰 요약 처리 중 서버 오류가 발생했습니다: {str(e)}"}), 500

if __name__ == '__main__':
    # Flask 앱 실행
    # 기본적으로 5000번 포트에서 실행됩니다.
    # debug=True는 개발 중에는 유용하지만, 실제 운영 환경에서는 False로 설정해야 합니다.
    app.run(port=5000, debug=True)