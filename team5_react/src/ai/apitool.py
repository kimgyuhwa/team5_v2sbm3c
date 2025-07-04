import os
from langchain_openai import ChatOpenAI
from langchain.agents import initialize_agent, Tool
from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import StrOutputParser

llm = ChatOpenAI(model="gpt-4o-mini", temperature=0)

def extract_key_info(text: str) -> str:
    prompt = PromptTemplate.from_template(
        "다음 문장에서 중요한 정보를 간단히 요약해서 한두 문장으로 알려줘:\n\n{text}"
    )
    chain = prompt | llm | StrOutputParser()
    return chain.invoke({"text": text})

# ✅ 도구 1: 번역
def translate_tool(input: str) -> str:
    # 예: "안녕하세요 영어 10살"
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

# ✅ 도구 3: 일반 응답
def chat_tool(input: str) -> str:
    prompt = PromptTemplate.from_template("너는 유용한 AI 도우미야. 사용자 메시지: {message}")
    chain = prompt | llm | StrOutputParser()
    return chain.invoke({"message": input})

# ✅ tools로 등록
tools = [
    Tool(name="번역", func=translate_tool, description="문장을 번역할 때 사용. 예: 안녕하세요 영어 10살"),
    Tool(name="요약", func=summarize_tool, description="긴 글을 요약할 때 사용"),
    Tool(name="질문응답", func=chat_tool, description="일반적인 질문에 답변")
]

# ✅ Agent 초기화
agent = initialize_agent(
    tools=tools,
    llm=llm,
    agent_type="openai-functions",
    verbose=True
)
