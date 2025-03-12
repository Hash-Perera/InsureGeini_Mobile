import { Claim, Report } from "@/models/claim.model";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity,
  Linking,
} from "react-native";
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
  const [report, setReport] = useState<Report | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  //! Fetch claims from the server
  useEffect(() => {
    const fetchClaims = async () => {
      try {
        const response = await ClaimService.getClaimById(id as string);
        setClaim(response.data.data);
        setReport(response.data.report);
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
      <ScrollView className="flex-1 p-5 bg-gray-100">
        <View className="p-5 mb-4 bg-white rounded-lg shadow-md">
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
        <View className="p-5 mb-4 bg-white rounded-lg shadow-md">
          <Text className="mb-2 text-lg font-semibold text-gray-800">
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
        <View className="p-5 mb-4 bg-white rounded-lg shadow-md">
          <Text className="mb-2 text-lg font-semibold text-gray-800">
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
        <View className="p-5 mb-4 bg-white rounded-lg shadow-md">
          <Text className="mb-2 text-lg font-semibold text-gray-800">
            Uploaded Images
          </Text>

          {/* Insurance Images */}
          <Text className="font-medium text-gray-600">
            📄 Insurance Documents
          </Text>
          <View className="flex-row gap-2 mt-2">
            <Image
              source={{ uri: claim.insuranceFront }}
              className="w-24 h-24 rounded-md"
            />
            <Image
              source={{ uri: claim.insuranceBack }}
              className="w-24 h-24 rounded-md"
            />
          </View>

          {/* NIC Images */}
          <Text className="mt-4 font-medium text-gray-600">
            🆔 NIC Documents
          </Text>
          <View className="flex-row gap-2 mt-2">
            <Image
              source={{ uri: claim.nicFront }}
              className="w-24 h-24 rounded-md"
            />
            <Image
              source={{ uri: claim.nicBack }}
              className="w-24 h-24 rounded-md"
            />
          </View>

          {/* License Images */}
          <Text className="mt-4 font-medium text-gray-600">
            🚗 License Documents
          </Text>
          <View className="flex-row gap-2 mt-2">
            <Image
              source={{ uri: claim.drivingLicenseFront }}
              className="w-24 h-24 rounded-md"
            />
            <Image
              source={{ uri: claim.drivingLicenseBack }}
              className="w-24 h-24 rounded-md"
            />
          </View>

          {/* Vehicle Images */}
          <Text className="mt-4 font-medium text-gray-600">
            🚘 Vehicle Details
          </Text>
          <View className="flex-row gap-2 mt-2">
            <Image
              source={{ uri: claim.frontLicencePlate }}
              className="w-24 h-24 rounded-md"
            />
            <Image
              source={{ uri: claim.backLicencePlate }}
              className="w-24 h-24 rounded-md"
            />
          </View>

          {/* Damage Images */}
          <Text className="mt-4 font-medium text-gray-600">
            ⚠️ Damage Images
          </Text>
          <FlatList
            horizontal
            data={claim.damageImages}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <Image
                source={{ uri: item }}
                className="w-24 h-24 m-2 rounded-md"
              />
            )}
            showsHorizontalScrollIndicator={false}
          />
        </View>

        {/* Report */}
        {report && (
          <View className="p-5 mb-4 bg-white rounded-lg shadow-md">
            <Text className="mb-2 text-lg font-semibold text-gray-800">
              Reports
            </Text>
            <Text className="text-gray-600">
              Status :
              {report?.status === "Approved" ? (
                <Text className="font-semibold text-green-500"> Approved </Text>
              ) : (
                <Text className="text-red-500"> Rejected </Text>
              )}
            </Text>
            {/* Incident report PDF */}

            <Text className="mt-2 font-medium text-gray-600">
              📄 Incident Report
            </Text>
            {/* download pdf */}
            <TouchableOpacity
              onPress={() => {
                Linking.openURL(report?.incidentReport);
              }}
              className="flex-row items-center mt-2"
            >
              <Text className="text-blue-500">View PDF</Text>
            </TouchableOpacity>

            <Text className="mt-2 font-medium text-gray-600">
              📄 Decision Report
            </Text>
            {/* download pdf */}
            <TouchableOpacity
              onPress={() => {
                Linking.openURL(report?.decisionReport);
              }}
              className="flex-row items-center mt-2"
            >
              <Text className="text-blue-500">View PDF</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </>
  );
}
