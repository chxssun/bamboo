import { useState, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { serverAddress } from './Config';

const useServerImage = () => {
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    useEffect(() => {
        const fetchWordCloud = async () => {
            try {
                const userEmail = await AsyncStorage.getItem('userEmail');
                if (!userEmail) {
                    console.warn('사용자 이메일을 찾을 수 없습니다.');
                    return;
                }

                const response = await axios.get(`${serverAddress}/api/chat/getWordCloud`, {
                    params: { userEmail },
                    responseType: 'text',
                });

                if (response.data) {
                    setImageUrl(response.data);
                } else {
                    console.warn('워드클라우드 이미지 URL이 없습니다.');
                }
            } catch (error) {
                console.error('워드클라우드 데이터 가져오기 실패:', error);
                setImageUrl(null);
            }
        };

        fetchWordCloud();
    }, []);

    return imageUrl;
};

export default useServerImage;
