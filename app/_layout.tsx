import { Stack } from "expo-router";
import "../global.css";
import { AuthProvider } from "@/hooks/AuthContext";
import Toast from "react-native-toast-message";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen name="(root)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen
          name="widgets/camera"
          options={{
            headerShown: true,
            headerTitle: "Camera",
            headerBackTitle: "Back",
          }}
        />
      </Stack>
      <Toast />
    </AuthProvider>
  );
}
