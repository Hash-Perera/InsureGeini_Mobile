import { useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";

export default function ClaimDetails() {
  const { id } = useLocalSearchParams(); // Get the ID from the URL

  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-lg font-bold">Claim Details</Text>
      <Text className="text-gray-500">Claim ID: {id}</Text>
    </View>
  );
}
