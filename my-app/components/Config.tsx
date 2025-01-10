// 기본 IP 주소 설정
const Addr = "192.168.0.17";  // 필요 시 Add 값을 수정할 수 있음

// 워드 클라우드 주소
const WordCloudAddr = "https://ef5e-112-121-238-29.ngrok-free.app/predict";

// API 주소 설정
export const serverAddress = `http://${Addr}:8082`;

// 워드클라우드 주소
export const WCAddr = WordCloudAddr.replace('predict', 'generate_wordcloud');