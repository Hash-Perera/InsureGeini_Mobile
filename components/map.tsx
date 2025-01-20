import React, { useEffect, useState } from "react";
import { View, Text, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

type GoogleMapProps = {
  onLocationChange: (location: { latitude: number; longitude: number }) => void;
};

export default function GoogleMap({ onLocationChange }: GoogleMapProps) {
  const [region, setRegion] = useState<{
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  } | null>(null);

  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const requestLocationPermission = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied.");
      Alert.alert("Permission Denied", "Location access is required.");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;
    const newRegion = {
      latitude,
      longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    };

    setRegion(newRegion);
    onLocationChange({ latitude, longitude }); // Update location in the parent component
  };

  useEffect(() => {
    requestLocationPermission();
  }, []);

  if (!region) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Loading Map...</Text>
        {errorMsg && <Text>{errorMsg}</Text>}
      </View>
    );
  }

  return (
    <View className="h-40 mt-5 border border-gray-200 rounded-lg overflow-hidden">
      <MapView
        style={{ width: "100%", height: "100%" }}
        region={region}
        showsUserLocation
      >
        <Marker
          coordinate={{
            latitude: region.latitude,
            longitude: region.longitude,
          }}
        />
      </MapView>
    </View>
  );
}
