import { Stack } from 'expo-router';
import { ProfileProvider } from '../context/ProfileContext';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { AppState, AppStateStatus } from 'react-native';
import { serverAddress } from '@/components/Config';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

// 스플래시 스크린 자동 숨김 방지
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    // 폰트 로딩 상태 관리
    const [fontsLoaded] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    });

    const handleAppStateChange = async (nextAppState: AppStateStatus) => {
        try {
            console.log(`[AppState Change] New AppState: ${nextAppState}`);
            const userEmail = await AsyncStorage.getItem('userEmail');

            if (userEmail) {
                if (nextAppState === 'active') {
                    await updateUserStatus(userEmail, 'active');
                } else if (nextAppState === 'background') {
                    await updateUserStatus(userEmail, 'inactive');
                }
            } else {
                console.warn('[AppState Change] No user email found in AsyncStorage.');
            }
        } catch (error) {
            console.error('[AppState Change] Error handling app state change:', error);
        }
    };

    const updateUserStatus = async (userEmail: string, status: string) => {
        try {
            await axios.post(`${serverAddress}/api/chat/updateUserStatus`, {
                userEmail,
                status,
            });
        } catch (error) {
            console.error(`[User Status Update] Failed to update status: ${error.message}`);
        }
    };

    // 앱 상태 변경 감지
    useEffect(() => {
        const subscription = AppState.addEventListener('change', handleAppStateChange);

        // 초기 상태 설정
        (async () => {
            try {
                const userEmail = await AsyncStorage.getItem('userEmail');
                if (userEmail) {
                    const initialState = AppState.currentState === 'active' ? 'active' : 'inactive';
                    await updateUserStatus(userEmail, initialState);
                }
            } catch (error) {
                console.error('[Initial State] Error updating initial user status:', error);
            }
        })();

        return () => {
            subscription.remove();
        };
    }, []);

    // 폰트 로딩 완료 시 스플래시 스크린 숨김
    useEffect(() => {
        if (fontsLoaded) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    // 폰트가 로드되지 않았으면 null 반환
    if (!fontsLoaded) {
        return null;
    }

    return (
        <ProfileProvider>
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="(init)" options={{ gestureEnabled: true }} />
                <Stack.Screen name="(join)" options={{ gestureEnabled: true }} />
                <Stack.Screen name="(tabs)" options={{ gestureEnabled: false }} />
            </Stack>
        </ProfileProvider>
    );
}
