import React, { useEffect } from 'react';
import { TouchableOpacity, Text, BackHandler, Alert } from 'react-native';
import { Tabs } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useRouter } from 'expo-router';
import { ProfileProvider } from '../../context/ProfileContext';
import CustomTabBar from '../../components/navigation/CustomTabBar';
import { serverAddress } from '@/components/Config';

export default function TabLayout() {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            const userEmail = await AsyncStorage.getItem('userEmail');
            if (userEmail) {
                await axios.post(`${serverAddress}/api/chat/updateUserStatus`, {
                    userEmail,
                    status: "inactive",
                });
            }
            await AsyncStorage.clear();
            Alert.alert("알림", "로그아웃 되었습니다.");
            router.replace("../(init)");
        } catch (error) {
            console.error("로그아웃 중 오류 발생:", error);
            Alert.alert("오류", "로그아웃 중 문제가 발생했습니다.");
        }
    };

    useEffect(() => {
        const backAction = () => {
            BackHandler.exitApp();
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();
    }, []);

    return (
        <ProfileProvider>
            <Tabs
                tabBar={(props) => <CustomTabBar {...props} />}
                screenOptions={{
                    gestureEnabled: false, // iOS에서 뒤로가기 제스처 비활성화
                }}
            >
                <Tabs.Screen
                    name="index"
                    options={{
                        title: "대화하기",
                        headerTitleAlign: "center",
                        gestureEnabled: false, // 각 화면에 대한 설정도 추가
                    }}
                />
                <Tabs.Screen
                    name="(diary)"
                    options={{
                        title: "다이어리",
                        headerTitleAlign: "center",
                        gestureEnabled: false,
                    }}
                />
                <Tabs.Screen
                    name="myPage"
                    options={{
                        title: "마이 페이지",
                        headerTitleAlign: "center",
                        gestureEnabled: false,
                    }}
                />
                <Tabs.Screen
                    name="report"
                    options={{
                        title: "보고서",
                        headerTitleAlign: "center",
                        gestureEnabled: false,
                    }}
                />
                <Tabs.Screen
                    name="setting"
                    options={{
                        title: "설정",
                        headerTitleAlign: "center",
                        gestureEnabled: false,
                        headerRight: () => (
                            <TouchableOpacity onPress={handleLogout}>
                                <Text style={{ color: 'black', marginRight: 10 }}>로그아웃</Text>
                            </TouchableOpacity>
                        ),
                    }}
                />
            </Tabs>
        </ProfileProvider>
    );
}
