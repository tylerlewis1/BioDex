import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AuthProvider, useAuth } from "../context/authContext";
import { UserProvider, useUser } from "@/context/userContext";
import {useEffect} from "react";
import "../../global.css";
function RootNavigator() {
  const { token, isLoading, removeKey} = useAuth();
  const { removeUser, id: userid } = useUser();
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/user/check-auth`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if(userid != data.user.userId){
          throw new Error("User ID mismatch");
        }
        if (!response.ok || data.auth === false) {
          throw new Error("Authentication invalid");
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        removeKey();
        removeUser();
      }
    };

    if (token) {
      checkAuth();
    }
  }, [token]);

  if (isLoading) return null;
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={Boolean(token)}>
        <Stack.Screen name="(tabs)" />
      </Stack.Protected>

      <Stack.Protected guard={!token}>
        <Stack.Screen name="(auth)" />
      </Stack.Protected>
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <UserProvider>
        <RootNavigator/>
        </UserProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
