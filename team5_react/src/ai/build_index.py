from llama_index.core import SimpleDirectoryReader, VectorStoreIndex, Settings
from llama_index.embeddings.openai import OpenAIEmbedding
from llama_index.llms.openai import OpenAI
from llama_index.core.node_parser import SimpleNodeParser
from llama_index.core.text_splitter import TokenTextSplitter

# ✅ 최신 버전에서는 text_splitter 따로 선언 X
#    SimpleNodeParser는 기본 Splitter 내장

node_parser = SimpleNodeParser()

# ✅ 전역 Settings
Settings.llm = OpenAI(model="gpt-4o-mini")
Settings.embed_model = OpenAIEmbedding()
Settings.node_parser = node_parser

# ✅ 데이터 로드
documents = SimpleDirectoryReader("./data").load_data()
print(documents)
print(type(documents[0]))

# ✅ 인덱스 빌드
index = VectorStoreIndex.from_documents(documents)

# ✅ 저장
index.storage_context.persist("./storage")
print("✅ 벡터 인덱스 빌드 완료! ./storage 폴더에 저장됐습니다.")
