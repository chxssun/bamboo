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
                    console.warn('����� �̸����� ã�� �� �����ϴ�.');
                    return;
                }

                const response = await axios.get(`${serverAddress}/api/chat/getWordCloud`, {
                    params: { userEmail },
                    responseType: 'text',
                });

                if (response.data) {
                    setImageUrl(response.data);
                } else {
                    console.warn('����Ŭ���� �̹��� URL�� �����ϴ�.');
                }
            } catch (error) {
                console.error('����Ŭ���� ������ �������� ����:', error);
                setImageUrl(null);
            }
        };

        fetchWordCloud();
    }, []);

    return imageUrl;
};

export default useServerImage;
