import React from "react";
import { View, Text, TouchableOpacity, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { useAuth } from "@/hooks/AuthContext";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
const tailwindConfig = require("../../tailwind.config");

export default function Home() {
  const { logout } = useAuth();
  const router = useRouter();
  const colors = tailwindConfig.theme.extend.colors;

  const handleProfile = () => {
    console.log("Profile button pressed");
  };

  const cards = [
    { id: 1, icon: "assignment", label: "Claim", route: "/claim" },
    { id: 2, icon: "history", label: "My Claims", route: "/claim" },
    { id: 3, icon: "support-agent", label: "Support", route: "/claim" },
    { id: 4, icon: "info-outline", label: "Info", route: "/claim" },
  ];

  return (
    <View style={{ flex: 1 }}>
      {/* Gradient Background */}
      <LinearGradient
        colors={[colors["custom-blue1"], colors["custom-blue2"], "white"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }} // Vertical gradient
        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
      />

      <SafeAreaView className="flex-1">
        {/* Header */}
        <View className="flex-col w-full h-96 p-4">
          {/* Header with Logout and Profile Buttons */}
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-white text-4xl font-bold p-2">Welcome!</Text>
            <View className="flex-row">
              <TouchableOpacity onPress={logout} className="p-2">
                <MaterialIcons name="logout" size={24} color="white" />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleProfile} className="p-2">
                <MaterialIcons name="account-circle" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </View>

          <View className="mb-4 p-2">
            <Text className="text-white text-2xl font-semibold">
              Hashan Perera
            </Text>
            <Text className="text-white text-lg">
              Insurance ID: YTRQEAYUU62
            </Text>
          </View>

          <View className="bg-white/20 rounded-lg p-4">
            <Text className="text-white text-xl font-semibold mb-2">
              Vehicle Details
            </Text>
            <Text className="text-white text-lg">Vehicle No: KM7537</Text>
            <Text className="text-white text-lg">Vehicle Model: Alto</Text>
          </View>
        </View>

        {/* Main Content */}
        <View className="flex-1 justify-center items-center bg-white">
          {/* Card Grid */}
          <View className="flex-row flex-wrap justify-center gap-4 w-full px-4">
            {cards.map((card) => (
              <TouchableOpacity
                key={card.id}
                className="bg-gray100 rounded-lg p-4 w-40 h-40 justify-center items-center"
                onPress={() => router.push("./claim")}
              >
                {/* Icon with Correct Type Casting */}
                <MaterialIcons
                  name={card.icon as keyof typeof MaterialIcons.glyphMap}
                  size={46}
                  color="#1978bb"
                />

                {/* Label */}
                <Text className="text-gray800 mt-2 font-medium">
                  {card.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
