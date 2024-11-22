import { View, Text } from "react-native";

export default function Login() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text className="text">This is login</Text>
      <Text className="text-3xl"> Login</Text>
    </View>
  );
}
