import { Redirect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';

export default function Index() {
    const [isLoading, setIsLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        checkLoginStatus();
    }, []);

    const checkLoginStatus = async () => {
        try {
            const userEmail = await AsyncStorage.getItem('userEmail');
            setIsLoggedIn(!!userEmail);
        } catch (error) {
            console.error('로그인 상태 확인 실패:', error);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#4a9960" />
            </View>
        );
    }

    return <Redirect href={isLoggedIn ? '/(tabs)' : '/(init)'} />;
}
