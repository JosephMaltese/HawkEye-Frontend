import { Stack } from "expo-router";
import React, { useContext, useEffect } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity, ActivityIndicator, View } from 'react-native';
import { useRouter } from 'expo-router';
import { CoordinatesProvider } from './maps/CoordinatesContext';
import UserContext, { UserProvider } from './UserContext';

export default function RootLayout() {
  const router = useRouter();

  return (
    <UserProvider>
      <CoordinatesProvider>
        <RootNavigator />
      </CoordinatesProvider>
    </UserProvider>
  );
}

function RootNavigator() {
  const router = useRouter();
  const { user, loading } = useContext(UserContext);

  useEffect(() => {
    if (!loading) {
      if (user) {
        router.replace('/home'); // Redirect to home if user is logged in
      } else {
        router.replace('/'); // Redirect to index if user is not logged in
      }
    }
  }, [user, loading]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ title: 'Login' }} />
      <Stack.Screen name="signup" options={{ title: 'Sign Up' }} />
      <Stack.Screen name="verification" options={{ title: "Verify Your Account" }} />
      <Stack.Screen name="ProfileScreen" options={{ title: "Profile" }} />
      <Stack.Screen name="surveys" options={{ title: "Surveys" }} />
      <Stack.Screen name="addProperty" options={{ title: "Add Property" }} />
      <Stack.Screen name="PropertyDetailsScreen/[_id]" options={{ title: "Property Details", headerStyle: { backgroundColor: 'red' }, headerTintColor: 'white' }} />
      <Stack.Screen name="PropertiesScreen" options={{ title: "Properties", headerShown: false }} />
      <Stack.Screen name="home" options={{
        headerShown: false,
        headerRight: () => (
          <TouchableOpacity onPress={() => router.push('/ProfileScreen')}>
            <Ionicons name="person-circle-outline" size={30} style={{ marginRight: 10 }} />
          </TouchableOpacity>
        ),
        headerBackVisible: false,
        headerStyle: {
          backgroundColor: 'white',
        },
        headerTitle: "",
      }} />
    </Stack>
  );
}


