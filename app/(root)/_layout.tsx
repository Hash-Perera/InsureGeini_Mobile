import { Stack } from "expo-router";

export default function HomeLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="home"
        options={{ headerShown: false, headerTitle: "Home" }}
      />
      <Stack.Screen
        name="claim"
        options={{ headerShown: true, headerTitle: "New Claim" }}
      />
    </Stack>
  );
}
