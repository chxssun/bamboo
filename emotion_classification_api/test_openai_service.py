from langchain.schema import SystemMessage, HumanMessage
from openai_service import llm

def test_chat_api_connection():
    try:
        # 테스트 메시지
        test_message = [
            SystemMessage(content="Hello, this is a test message. Please respond."),
        ]
        
        # Chat API 호출
        response = llm.invoke(test_message)  # invoke 메서드를 사용
        if response and response.content:
            print("Chat API 연결 성공!")
            print(f"응답: {response.content}")
        else:
            print("Chat API가 유효하지 않은 응답을 반환했습니다.")
    except Exception as e:
        print(f"Chat API 연결 실패: {e}")

# 테스트 실행
if __name__ == "__main__":
    test_chat_api_connection()
