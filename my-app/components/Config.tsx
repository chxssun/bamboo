// 기본 IP 주소 설정
const Addr = "192.168.0.17";  // 필요 시 Add 값을 수정할 수 있음

// API 주소 설정
export const serverAddress = `http://${Addr}:8082`;

// API에서 Ngrok URL을 가져오는 함수
const fetchNgrokUrl = async () => {
  try {
    const response = await fetch(`${serverAddress}/api/chat/getNgrokUrl`);  // 백엔드의 ngrok URL 엔드포인트
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const ngrokUrl = await response.text();  // 반환된 ngrok URL을 텍스트로 받음
    return ngrokUrl;  // Ngrok URL 반환
  } catch (error) {
    console.error("Ngrok URL을 가져오는 중 오류 발생:", error);
    return null;
  }
};

// 워드 클라우드 주소를 동적으로 설정하는 함수
const getWCAddr = async () => {
  try {
    const ngrokUrl = await fetchNgrokUrl();
    if (ngrokUrl) {
      return `${ngrokUrl}/generate_wordcloud`;  // Ngrok URL을 사용해 워드 클라우드 URL을 설정
    } else {
      throw new Error("Ngrok URL을 가져오지 못했습니다.");
    }
  } catch (error) {
    console.error("워드 클라우드 주소를 설정하는 중 오류 발생:", error);
    return null;
  }
};

// 테스트용 함수 호출
getWCAddr().then((WCAddr) => {
  if (WCAddr) {
    console.log("워드 클라우드 주소:", WCAddr);
  } else {
    console.log("Ngrok URL을 가져오지 못해 워드 클라우드 주소를 설정할 수 없습니다.");
  }
});
