import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { BackHandler } from 'react-native';
import { useRouter } from 'expo-router';
import LoginScreen from './login'; // 로그인 화면
import Tabs from '../(tabs)'; // 탭 네비게이터 (MainScreen 포함)

export default function JoinLayout() {
    const router = useRouter();

    useEffect(() => {
        const backAction = () => {
            router.back(); // 뒤로가기 버튼 누르면 이전 화면으로
            return true;
        };

        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
        return () => backHandler.remove();
    }, []);

    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{
                    title: '회원 가입',
                    headerShown: true,
                    headerTitleAlign: 'center',
                    gestureEnabled: true, // 제스처 허용
                }}
            />

            <Stack.Screen
                name="login"
                options={{
                    title: '로그인',
                    headerShown: true,
                    headerTitleAlign: 'center',
                    gestureEnabled: true, // 제스처 허용
                }}
            />

            {/* MainScreen 또는 Tabs 네비게이터 추가 */}
            <Stack.Screen
                name="(tabs)" // MainScreen 또는 Tabs로 설정
                options={{
                    title: '메인 화면',
                    headerShown: false, // 탭 네비게이터의 헤더를 숨기려면 false
                }}
            />

            <Stack.Screen
                name="index2"
                options={{
                    title: '회원 가입',
                    headerShown: true,
                    headerTitleAlign: 'center',
                }}
            />

            <Stack.Screen
                name="sendUserInfo"
                options={{
                    title: '회원 가입',
                    headerShown: true,
                    headerTitleAlign: 'center',
                }}
            />

            <Stack.Screen
                name="index3"
                options={{
                    title: '사용 설명서',
                    headerShown: true,
                    headerTitleAlign: 'center',
                }}
            />
        </Stack>
    );
}
