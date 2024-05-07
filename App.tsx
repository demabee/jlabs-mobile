import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MainRoutes from './navigation/MainRoutes';
import { ThemeProvider, createTheme } from '@rneui/themed';
import { mainTheme } from './styles/theme';
import { useAuthStore } from './store/useAuthStore';
import AuthRoute from './navigation/AuthRoute';
import axios from 'axios';
import { useCallback, useEffect } from 'react';

export default function App() {
  const theme = createTheme({ ...mainTheme });
  const { token, isAuth, setUser, setIsAuth, clearAuthStore } = useAuthStore();

  const checkIfAuth = useCallback(async () => {
    try {
      const res = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/auth-check`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json'
        }
      });
      const { data, status } = res.data
      setUser(data);
      setIsAuth(status);
      return status;
    } catch (error: any) {
      // console.error(error.response.data);
      clearAuthStore();
    }
  }, [isAuth]);

  useEffect(() => {
    (async () => {
      Promise.all([
        await checkIfAuth()
      ])
    })();
  }, [isAuth]);
  console.log(isAuth);

  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        <StatusBar style="auto" />
        <NavigationContainer>
          {!isAuth ?
            <MainRoutes />
            :
            <AuthRoute />
          }
        </NavigationContainer>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
