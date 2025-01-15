import { Stack } from 'expo-router';
import { ProfileProvider } from '../context/ProfileContext';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { serverAddress } from '@/components/Config';
import { NavigationContainer } from '@react-navigation/native';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    console.log('[RootLayout] 루트 레이아웃 초기화');

    const [fontsLoaded] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    });

    const handleAppStateChange = async (nextAppState: AppStateStatus) => {
        try {
            const userEmail = await AsyncStorage.getItem('userEmail');
            if (userEmail) {
                if (nextAppState === 'active') {
                    await updateUserStatus(userEmail, 'active');
                } else if (nextAppState === 'background') {
                    await updateUserStatus(userEmail, 'inactive');
                }
            }
        } catch (error) {
            console.error('Error handling app state change:', error);
        }
    };

    const updateUserStatus = async (userEmail: string, status: string) => {
        try {
            await axios.post(`${serverAddress}/api/chat/updateUserStatus`, {
                userEmail,
                status,
            });
        } catch (error) {
            console.error(`Failed to update status: ${error.message}`);
        }
    };

    useEffect(() => {
        const subscription = AppState.addEventListener('change', handleAppStateChange);
        return () => {
            subscription.remove();
        };
    }, []);

    if (!fontsLoaded) {
        console.log('[RootLayout] 폰트 로딩 중...');
        return null;
    }

    return (
        <ProfileProvider>
            <NavigationContainer
                onStateChange={(state) => {
                    console.log('[Navigation] 상태 변경:', state);
                }}
            >
                <Stack
                    screenOptions={{
                        headerShown: false,
                        animation: 'none',
                    }}
                >
                    <Stack.Screen name="(init)" options={{ gestureEnabled: true }} />
                    <Stack.Screen name="(join)" options={{ gestureEnabled: true }} />
                    <Stack.Screen name="(tabs)" options={{ gestureEnabled: false }} />
                </Stack>
            </NavigationContainer>
        </ProfileProvider>
    );
}
