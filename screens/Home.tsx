import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useAuthStore } from '../store/useAuthStore';
import { Button, SearchBar } from '@rneui/themed';
import axios from 'axios';
import * as Network from 'expo-network';
import MapView from 'react-native-maps';

const { height } = Dimensions.get('window');

const Home = () => {
  const { token, user, clearAuthStore } = useAuthStore();
  const [loading, setLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');

  const onLogout = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/logout`, {
        id: user!.id
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json'
        }
      });
      if (res.data.status) {
        clearAuthStore();
      }
    } catch (error: any) {
      console.error(error.response.data);
    } finally {
      setLoading(false);
    }
  }, [user]);

  const getIpAddress = async () => {
    const ip = await Network.getIpAddressAsync();
    const geoloc = await axios.get(`https://ipinfo.io/${ip}/geo`);
    console.log(ip, geoloc);
  };

  const updateSearch = (search: string) => {
    setSearch(search);
  };

  useEffect(() => {
    (async () => {
      Promise.all([
        await getIpAddress(),
      ])
    })()
  }, []);

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="Type Here..."
        onChangeText={updateSearch}
        value={search}
        round
      />
      <MapView style={styles.map} />
      <Button
        title="Logout"
        onPress={onLogout}
        loading={loading}
        disabled={loading}
      />
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    gap: height * 0.012
  },
  map: {
    width: '100%',
    height: 500,
  },
})