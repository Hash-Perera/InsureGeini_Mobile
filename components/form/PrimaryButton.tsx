import React from "react";
import { TouchableOpacity, Text, GestureResponderEvent } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface PrimaryButtonProps {
  onPress: (event: GestureResponderEvent) => void;
  text: string;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ onPress, text }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="w-full rounded-md overflow-hidden"
    >
      <LinearGradient
        colors={["#1978bb", "#3cc6ef"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        className="flex justify-center items-center"
      >
        <Text className="text-white font-bold text-lg text-center p-4">
          {text}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default PrimaryButton;
