import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

interface CameraInputProps {
  label: string;
  imageUri: string;
  onPress: () => void;
  colors: any;
  error?: string;
  touched?: boolean;
}

export default function CameraInput({
  label,
  imageUri,
  onPress,
  colors,
  error,
  touched,
}: CameraInputProps) {
  return (
    <>
      <View className="flex-row justify-between items-center p-3 border border-gray-200 rounded-lg mt-4">
        <View className="flex-row justify-between items-center">
          <Text className="text-sm text-gray-500 font-medium">{label}</Text>

          {imageUri && (
            <Image
              source={{
                uri: imageUri,
              }}
              className="h-8 w-14 ms-4"
              resizeMode="contain"
            />
          )}
        </View>

        <TouchableOpacity
          className="p-2 rounded-md bg-blue-100"
          onPress={onPress}
        >
          <MaterialIcons
            name="camera-alt"
            size={24}
            color={colors["custom-blue2"]}
          />
        </TouchableOpacity>
      </View>
      {error && touched && (
        <Text className="text-red-500 text-sm mt-1 ">{error}</Text>
      )}
    </>
  );
}
