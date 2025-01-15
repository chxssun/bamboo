import React from 'react';
import { TouchableOpacity, Text, BackHandler, Alert } from 'react-native';
import { Tabs } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useRouter } from 'expo-router';
import CustomTabBar from '../../components/navigation/CustomTabBar';
import { serverAddress } from '@/components/Config';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function TabLayout() {
    console.log('[TabLayout] 탭 레이아웃 렌더링');
    const router = useRouter();

    // 로그아웃 처리 함수
    const handleLogout = async () => {
        try {
            const userEmail = await AsyncStorage.getItem('userEmail');
            if (userEmail) {
                await axios.post(`${serverAddress}/api/chat/updateUserStatus`, {
                    userEmail,
                    status: 'inactive',
                });
            }
            await AsyncStorage.clear();
            Alert.alert('알림', '로그아웃 되었습니다.');
            router.replace('/(init)');
        } catch (error) {
            console.error('로그아웃 중 오류 발생:', error);
            Alert.alert('오류', '로그아웃 중 문제가 발생했습니다.');
        }
    };

    // 뒤로가기 버튼 처리
    React.useEffect(() => {
        const backAction = () => {
            Alert.alert('앱 종료', '앱을 종료하시겠습니까?', [
                {
                    text: '취소',
                    onPress: () => null,
                    style: 'cancel',
                },
                { text: '확인', onPress: () => BackHandler.exitApp() },
            ]);
            return true;
        };

        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
        return () => backHandler.remove();
    }, []);

    return (
        <Tabs
            screenOptions={{
                headerShown: true,
                tabBarStyle: { height: 60 },
            }}
            tabBar={(props) => {
                console.log('[TabLayout] CustomTabBar 렌더링');
                return <CustomTabBar {...props} />;
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: '대화하기',
                    headerTitleAlign: 'center',
                    tabBarIcon: ({ color }) => {
                        console.log('[TabLayout] 대화하기 탭 아이콘 렌더링');
                        return <Ionicons name="chatbubble-outline" size={24} color={color} />;
                    },
                }}
                listeners={{
                    tabPress: (e) => {
                        console.log('[TabLayout] 대화하기 탭 클릭됨');
                    },
                }}
            />
            <Tabs.Screen
                name="(diary)"
                options={{
                    title: '다이어리',
                    headerTitleAlign: 'center',
                    tabBarIcon: ({ color }) => <Ionicons name="book-outline" size={24} color={color} />,
                }}
            />
            <Tabs.Screen
                name="report"
                options={{
                    title: '보고서',
                    headerTitleAlign: 'center',
                    tabBarIcon: ({ color }) => <Ionicons name="bar-chart-outline" size={24} color={color} />,
                }}
            />
            <Tabs.Screen
                name="myPage"
                options={{
                    title: '마이페이지',
                    headerTitleAlign: 'center',
                    tabBarIcon: ({ color }) => <Ionicons name="person-outline" size={24} color={color} />,
                }}
            />
            <Tabs.Screen
                name="setting"
                options={{
                    title: '설정',
                    headerTitleAlign: 'center',
                    tabBarIcon: ({ color }) => <Ionicons name="settings-outline" size={24} color={color} />,
                    headerRight: () => (
                        <TouchableOpacity onPress={handleLogout} style={{ marginRight: 15 }}>
                            <Text style={{ color: '#00000', fontSize: 16 }}>로그아웃</Text>
                        </TouchableOpacity>
                    ),
                }}
            />
        </Tabs>
    );
}
