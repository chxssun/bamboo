import { ThemeProvider, DarkTheme, DefaultTheme  } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { AppState, AppStateStatus } from 'react-native';
import { serverAddress } from "@/components/Config";

// SplashScreen 자동 숨김 방지
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

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
      const response = await axios.post(`${serverAddress}/api/chat/updateUserStatus`, {
        userEmail,
        status,
      });
    } catch (error) {
      console.error(`[User Status Update] Failed to update status: ${error.message}`);
    }
  };

  useEffect(() => {
    const subscription = AppState.addEventListener('change', handleAppStateChange);

    (async () => {
      try {
        const userEmail = await AsyncStorage.getItem('userEmail');
        if (userEmail) {
          const initialState = AppState.currentState === 'active' ? 'active' : 'inactive';
          await updateUserStatus(userEmail, initialState);
        } else {
          console.warn('[Initial State] No user email found in AsyncStorage.');
        }
      } catch (error) {
        console.error('[Initial State] Error updating initial user status:', error);
      }
    })();

    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack initialRouteName="(init)">
        <Stack.Screen name="(init)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(join)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
}
