import os
import requests
from langchain_openai import ChatOpenAI
from langchain.agents import initialize_agent, Tool
from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain.prompts.chat import ChatPromptTemplate, SystemMessagePromptTemplate, HumanMessagePromptTemplate

# ✅ 시스템 메시지: 항상 한국어로, 친절하고 핵심 요약 잘함
system_template = "너는 항상 한국어로 답변하고, 친절하며 핵심을 잘 요약해주는 AI야. 영어로 해달라는 요청이 아니면 영어로 답변하지 마."
system_prompt = SystemMessagePromptTemplate.from_template(system_template)
human_prompt = HumanMessagePromptTemplate.from_template("{message}")
chat_prompt = ChatPromptTemplate.from_messages([system_prompt, human_prompt])

# ✅ LLM 초기화
llm = ChatOpenAI(model="gpt-4o-mini", temperature=0)
CURRENT_USERNO = None

# ✅ 요약 필터 함수
def is_valid_summary(text: str) -> bool:
    text = text.strip().lower()
    return (
        text and
        text not in ["", "없음", "중요한 정보가 없습니다"] and
        not text.startswith("사용자") and
        len(text) >= 5
    )

# ✅ 도구 1: 번역
def translate_tool(input: str) -> str:
    try:
        sentence, lang, age = input.strip().rsplit(' ', 2)
    except:
        return "형식이 잘못되었습니다. 예: 안녕하세요 영어 10살"
    
    prompt = PromptTemplate.from_template("다음 문장을 {age}살 수준의 {lang}로 번역해줘:\n\n{sentence}")
    chain = prompt | llm | StrOutputParser()
    return chain.invoke({"sentence": sentence, "lang": lang, "age": age})

# ✅ 도구 2: 요약
def summarize_tool(input: str) -> str:
    prompt = PromptTemplate.from_template("다음 글을 3줄로 요약해줘:\n\n{content}")
    chain = prompt | llm | StrOutputParser()
    return chain.invoke({"content": input})

# ✅ 도구 3: 일반 대화
def chat_tool(input: dict) -> str:
    message = input["input"]
    userno = input.get("userno")

    # ✅ 1. system+human prompt로 응답 생성
    chat_chain = chat_prompt | llm | StrOutputParser()
    response = chat_chain.invoke({"message": message})

    # ✅ 2. 중요 정보 추출 프롬프트
    summary_prompt = PromptTemplate.from_template(
        """
        아래는 사용자의 메시지입니다:

        "{text}"

        이 문장에서 개인적인 사실, 성향, 요청, 선호, 목표 등 사용자에 대한 실제 정보를 추출해 간단히 요약해줘.
        
        단, 아래와 같은 일반적인 질문, 반문, 되묻는 말, 인사, 자기소개는 절대로 요약하지 마:
        - "안녕하세요"
        - "어떻게 도와줄까요?"
        - "궁금한 게 있으신가요?"
        - "질문이 있으신가요?"
        - "무엇을 원하시나요?"

        중요하지 않은 문장은 '없음' 또는 '' 빈 문자열로 응답해.
        """
    )
    summary_chain = summary_prompt | llm | StrOutputParser()
    key_info = summary_chain.invoke({"text": message})

    # ✅ 3. 중요한 정보일 때만 저장
    if is_valid_summary(key_info) and userno:
        try:
            requests.post("http://localhost:9093/chatbot/api/save", json={
                "userno": userno,
                "content": key_info
            })
            print("✅ 저장된 중요 정보:", key_info)
        except Exception as e:
            print("❌ 저장 실패:", e)

    return response

# ✅ tools로 등록
tools = [
    Tool(
        name="질문응답",
        func=lambda input: chat_tool({"input": input, "userno": CURRENT_USERNO}),
        description="일반적인 질문에 답변"
    )
    # 필요한 경우 번역/요약 도구도 추가 가능
]

# ✅ Agent 초기화
agent = initialize_agent(
    tools=tools,
    llm=llm,
    agent_type="openai-functions",
    verbose=True,
    max_iterations=2
)
