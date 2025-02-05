import { Claim } from "@/models/claim.model";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, ScrollView, Image, FlatList } from "react-native";
import AppLoader from "@/components/apploader";

//! Services
import { ClaimService } from "@/services/claim.service";
import MapView, { Marker } from "react-native-maps";
import React from "react";
import { statusColors } from "@/constants/geini-colors";

export default function ClaimDetails() {
  const { id } = useLocalSearchParams();

  //! Get claims from the server
  const [claim, setClaim] = useState<Claim>({});
  const [isLoading, setIsLoading] = useState(true);

  //! Fetch claims from the server
  useEffect(() => {
    const fetchClaims = async () => {
      try {
        const response = await ClaimService.getClaimById(id as any);
        setClaim(response.data.data);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchClaims();
  }, []);

  return (
    <>
      <AppLoader visible={isLoading} message="Loading..." />
      <ScrollView className="flex-1 bg-gray-100 p-5">
        <View className="bg-white p-5 rounded-lg shadow-md mb-4">
          <Text className="text-lg font-bold text-gray-800">
            Claim ID: {claim._id}
          </Text>
          <View className="flex-row items-center mt-2">
            <Text
              className={`px-3 py-1 text-xs font-bold rounded-full 
                ${statusColors[claim.status || "Pending"].bg} 
                ${statusColors[claim.status || "Pending"].text}`}
            >
              {claim.status}
            </Text>
          </View>
        </View>

        {/* Insurance Info */}
        <View className="bg-white p-5 rounded-lg shadow-md mb-4">
          <Text className="text-lg font-semibold text-gray-800 mb-2">
            Insurance Details
          </Text>
          <Text className="text-gray-600">
            🔹 Insurance ID: {claim.insuranceId}
          </Text>
          <Text className="text-gray-600">🆔 NIC No: {claim.nicNo}</Text>
          <Text className="text-gray-600">
            🚗 License No: {claim.drivingLicenseNo}
          </Text>
        </View>

        {/* Damage Details */}
        <View className="bg-white p-5 rounded-lg shadow-md mb-4">
          <Text className="text-lg font-semibold text-gray-800 mb-2">
            Damage Details
          </Text>
          <Text className="text-gray-600">
            🔹 Damaged Areas:{" "}
            {claim.damagedAreas ? claim.damagedAreas.join(", ") : "N/A"}
          </Text>

          {/* Map */}
          {claim.location && (
            <MapView
              style={{ height: 150, borderRadius: 10, marginTop: 10 }}
              initialRegion={{
                latitude: claim.location.latitude,
                longitude: claim.location.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
            >
              <Marker
                coordinate={{
                  latitude: claim.location.latitude,
                  longitude: claim.location.longitude,
                }}
                title="Accident Location"
              />
            </MapView>
          )}
        </View>

        {/* Image Sections */}
        <View className="bg-white p-5 rounded-lg shadow-md mb-4">
          <Text className="text-lg font-semibold text-gray-800 mb-2">
            Uploaded Images
          </Text>

          {/* Insurance Images */}
          <Text className="text-gray-600 font-medium">
            📄 Insurance Documents
          </Text>
          <View className="flex-row gap-2 mt-2">
            <Image
              source={{ uri: claim.insuranceFront }}
              className="h-24 w-24 rounded-md"
            />
            <Image
              source={{ uri: claim.insuranceBack }}
              className="h-24 w-24 rounded-md"
            />
          </View>

          {/* NIC Images */}
          <Text className="text-gray-600 font-medium mt-4">
            🆔 NIC Documents
          </Text>
          <View className="flex-row gap-2 mt-2">
            <Image
              source={{ uri: claim.nicFront }}
              className="h-24 w-24 rounded-md"
            />
            <Image
              source={{ uri: claim.nicBack }}
              className="h-24 w-24 rounded-md"
            />
          </View>

          {/* License Images */}
          <Text className="text-gray-600 font-medium mt-4">
            🚗 License Documents
          </Text>
          <View className="flex-row gap-2 mt-2">
            <Image
              source={{ uri: claim.drivingLicenseFront }}
              className="h-24 w-24 rounded-md"
            />
            <Image
              source={{ uri: claim.drivingLicenseBack }}
              className="h-24 w-24 rounded-md"
            />
          </View>

          {/* Vehicle Images */}
          <Text className="text-gray-600 font-medium mt-4">
            🚘 Vehicle Details
          </Text>
          <View className="flex-row gap-2 mt-2">
            <Image
              source={{ uri: claim.frontLicencePlate }}
              className="h-24 w-24 rounded-md"
            />
            <Image
              source={{ uri: claim.backLicencePlate }}
              className="h-24 w-24 rounded-md"
            />
          </View>

          {/* Damage Images */}
          <Text className="text-gray-600 font-medium mt-4">
            ⚠️ Damage Images
          </Text>
          <FlatList
            horizontal
            data={claim.damageImages}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <Image
                source={{ uri: item }}
                className="h-24 w-24 rounded-md m-2"
              />
            )}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </ScrollView>
    </>
  );
}
