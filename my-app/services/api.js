import axios from 'axios';

// Axios 인스턴스 생성
const api = axios.create({
    baseURL: process.env.API_BASE_URL || 'https://your-production-server.com',
    timeout: 10000, // 10초
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // CORS 요청에 쿠키 포함
});

// 요청 인터셉터
api.interceptors.request.use(
    (config) => {
        // 토큰을 로컬 스토리지에서 가져오기
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// 응답 인터셉터
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            alert('로그인이 필요합니다.');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;
