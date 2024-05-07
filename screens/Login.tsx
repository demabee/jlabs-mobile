import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { Button, Icon, Input } from '@rneui/themed';
import { Colors } from '../styles/theme';
import axios from 'axios';
import ErrorMessages from '../components/ErrorMessages';
import { useNavigation } from '@react-navigation/native';
import { type NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAuthStore } from '../store/useAuthStore';

type ErrorType = {
  status?: boolean,
  message?: string,
}

const { height } = Dimensions.get('window');
const Login = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const {
    control,
    formState: { errors, isValid },
    handleSubmit
  } = useForm();
  const { setToken, setUser, setIsAuth } = useAuthStore();
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<ErrorType>();
  const showIcon = showPassword ? 'eye' : 'eye-off';

  const onLogin = async (data: any) => {
    try {
      setLoading(true);
      const res = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/login`, data);
      const { data: userRes, token, status } = res.data;
      setToken(token);
      setIsAuth(status);
      setUser(userRes);
    } catch (error: any) {
      console.error('errors', error.response.data);
      setError(error.response.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {error && (
        <ErrorMessages error={error.message as string} />
      )}
      <View>
        <Controller
          name="email"
          rules={{
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address'
            }
          }}
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              value={value}
              placeholder="Email"
              onBlur={onBlur}
              onChangeText={onChange}
              errorMessage={errors.email?.message?.toString()}
              errorStyle={{ fontSize: 10 }}
              renderErrorMessage={false}
            />
          )}
        />
      </View>
      <View>
        <Controller
          name="password"
          rules={{ required: 'Password is required' }}
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              value={value}
              placeholder="Password"
              onBlur={onBlur}
              onChangeText={onChange}
              errorMessage={errors.password?.message?.toString()}
              secureTextEntry={!showPassword}
              rightIcon={
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Icon name={showIcon} type="material-community" color={Colors.primaryBlue} />
                </TouchableOpacity>
              }
              renderErrorMessage={false}
            />
          )}
        />
      </View>
      <Button
        title="Login"
        onPress={handleSubmit(onLogin)}
        loading={loading}
        disabled={!isValid && loading}
      />
    </View>
  )
}

export default Login


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    gap: height * 0.012
  },
});