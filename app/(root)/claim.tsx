import React, { useState } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { SafeAreaView } from "react-native-safe-area-context";
import InputField from "@/components/form/InputField";
import PrimaryButton from "@/components/form/PrimaryButton";
import { MaterialIcons } from "@expo/vector-icons";
import CameraComponent from "@/components/single-snap-camera";

const enum ECameraMode {
  NIC_FRONT = "NIC_FRONT",
  NIC_BACK = "NIC_BACK",
  DRI_FRONT = "DRI_FRONT",
  DRI_BACK = "DRI_BACK",
  INS_FRONT = "INS_FRONT",
  INS_BACK = "INS_BACK",
}

export default function Claim() {
  const [cameraMode, setCameraMode] = useState<ECameraMode | null>(null);

  const [formState, setFormState] = useState({
    insuranceId: "",
    insuranceFront: "",
    insuranceBack: "",
    nicNo: "",
    nicFront: "",
    nicBack: "",
    drivingLicenseNo: "",
    drivingLicenseFront: "",
    drivingLicenseBack: "",
  });

  const ClaimSchema = Yup.object().shape({
    insuranceId: Yup.string().required("Insurance Number is required"),
    nicNo: Yup.string().required("NIC No is required"),
  });

  const handleCloseCamera = () => {
    setCameraMode(null);
  };

  const handleCapture = (uri: string) => {
    setFormState((prev) => {
      switch (cameraMode) {
        case "NIC_FRONT":
          return { ...prev, nicFront: uri };
        case "NIC_BACK":
          return { ...prev, nicBack: uri };
        case "DRI_FRONT":
          return { ...prev, drivingLicenseFront: uri };
        case "DRI_BACK":
          return { ...prev, drivingLicenseBack: uri };
        case "INS_FRONT":
          return { ...prev, insuranceFront: uri };
        case "INS_BACK":
          return { ...prev, insuranceBack: uri };
        default:
          return prev;
      }
    });

    setCameraMode(null);
  };

  const handleOpenCamera = (mode: ECameraMode) => {
    setCameraMode(mode);
  };

  return (
    <SafeAreaView className="flex-1 ">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        {cameraMode ? (
          <CameraComponent
            onCapture={handleCapture}
            onClose={handleCloseCamera}
          />
        ) : (
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
            className="p-5"
            keyboardShouldPersistTaps="handled"
          >
            <Formik
              initialValues={formState}
              validationSchema={ClaimSchema}
              onSubmit={(values) => {
                console.log("Form submitted with values:", values);
              }}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
              }) => (
                <View className="w-full self-center">
                  <View className="p-4 bg-white rounded-lg ">
                    <Text className="text-lg font-semibold text-gray-800">
                      Insurance Details
                    </Text>

                    <InputField
                      label=""
                      placeholder="Enter your insurance Id"
                      value={values.insuranceId}
                      onChangeText={(text) => {
                        handleChange("insuranceId")(text);
                        setFormState((prev) => ({
                          ...prev,
                          insuranceId: text,
                        }));
                      }}
                      error={errors.insuranceId}
                      touched={touched.insuranceId}
                    />

                    {/* Front Section */}
                    <View className="flex-row justify-between items-center mb-4 p-3 border border-gray-200 rounded-lg">
                      <View className="flex-row justify-between items-center">
                        <Text className="text-sm text-gray-500 font-medium">
                          Front
                        </Text>

                        {formState.insuranceFront && (
                          <Image
                            source={{
                              uri: formState.insuranceFront,
                            }}
                            className="h-8 w-14 ms-4"
                            resizeMode="contain"
                          />
                        )}
                      </View>

                      <View className="flex-row gap-4">
                        <TouchableOpacity
                          className="p-2 rounded-md bg-blue-100"
                          onPress={() =>
                            handleOpenCamera(ECameraMode.INS_FRONT)
                          }
                        >
                          <MaterialIcons
                            name="camera-alt"
                            size={24}
                            color="blue"
                          />
                        </TouchableOpacity>
                        <TouchableOpacity className="p-2 rounded-md bg-red-100">
                          <MaterialIcons name="edit" size={24} color="red" />
                        </TouchableOpacity>
                      </View>
                    </View>

                    {/* Back Section */}
                    <View className="flex-row justify-between items-center p-3 border border-gray-200 rounded-lg">
                      <View className="flex-row justify-between items-center">
                        <Text className="text-sm text-gray-500 font-medium">
                          Back
                        </Text>

                        {formState.insuranceBack && (
                          <Image
                            source={{
                              uri: formState.insuranceBack,
                            }}
                            className="h-8 w-14 ms-4"
                            resizeMode="contain"
                          />
                        )}
                      </View>
                      <View className="flex-row gap-4">
                        <TouchableOpacity
                          className="p-2 rounded-md bg-blue-100"
                          onPress={() => handleOpenCamera(ECameraMode.INS_BACK)}
                        >
                          <MaterialIcons
                            name="camera-alt"
                            size={24}
                            color="blue"
                          />
                        </TouchableOpacity>
                        <TouchableOpacity className="p-2 rounded-md bg-red-100">
                          <MaterialIcons name="edit" size={24} color="red" />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>

                  <View className="p-4 bg-white rounded-lg  mt-3">
                    <Text className="text-lg font-semibold text-gray-800">
                      NIC Details
                    </Text>

                    <InputField
                      label=""
                      placeholder="Enter your NIC number"
                      value={values.nicNo}
                      onChangeText={(text) => {
                        handleChange("nicNo")(text);
                        setFormState((prev) => ({
                          ...prev,
                          nicNo: text,
                        }));
                      }}
                      error={errors.nicNo}
                      touched={touched.nicNo}
                    />

                    {/* Front Section */}
                    <View className="flex-row justify-between items-center mb-4 p-3 border border-gray-200 rounded-lg">
                      <View className="flex-row justify-between items-center">
                        <Text className="text-sm text-gray-500 font-medium">
                          Front
                        </Text>

                        {formState.nicFront && (
                          <Image
                            source={{
                              uri: formState.nicFront,
                            }}
                            className="h-8 w-14 ms-4"
                            resizeMode="contain"
                          />
                        )}
                      </View>

                      <View className="flex-row gap-4">
                        <TouchableOpacity
                          className="p-2 rounded-md bg-blue-100"
                          onPress={() =>
                            handleOpenCamera(ECameraMode.NIC_FRONT)
                          }
                        >
                          <MaterialIcons
                            name="camera-alt"
                            size={24}
                            color="blue"
                          />
                        </TouchableOpacity>
                        <TouchableOpacity className="p-2 rounded-md bg-red-100">
                          <MaterialIcons name="edit" size={24} color="red" />
                        </TouchableOpacity>
                      </View>
                    </View>

                    {/* Back Section */}
                    <View className="flex-row justify-between items-center p-3 border border-gray-200 rounded-lg">
                      <View className="flex-row justify-between items-center">
                        <Text className="text-sm text-gray-500 font-medium">
                          Back
                        </Text>

                        {formState.nicBack && (
                          <Image
                            source={{
                              uri: formState.nicBack,
                            }}
                            className="h-8 w-14 ms-4"
                            resizeMode="contain"
                          />
                        )}
                      </View>
                      <View className="flex-row gap-4">
                        <TouchableOpacity
                          className="p-2 rounded-md bg-blue-100"
                          onPress={() => handleOpenCamera(ECameraMode.NIC_BACK)}
                        >
                          <MaterialIcons
                            name="camera-alt"
                            size={24}
                            color="blue"
                          />
                        </TouchableOpacity>
                        <TouchableOpacity className="p-2 rounded-md bg-red-100">
                          <MaterialIcons name="edit" size={24} color="red" />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>

                  <View className="p-4 bg-white rounded-lg  mt-3">
                    <Text className="text-lg font-semibold text-gray-800">
                      Driving Licence Details
                    </Text>

                    <InputField
                      label=""
                      placeholder="Enter your Driving license number"
                      value={values.drivingLicenseNo}
                      onChangeText={(text) => {
                        handleChange("drivingLicenseNo")(text);
                        setFormState((prev) => ({
                          ...prev,
                          drivingLicenseNo: text,
                        }));
                      }}
                      error={errors.drivingLicenseNo}
                      touched={touched.drivingLicenseNo}
                    />

                    {/* Front Section */}
                    <View className="flex-row justify-between items-center mb-4 p-3 border border-gray-200 rounded-lg">
                      <View className="flex-row justify-between items-center">
                        <Text className="text-sm text-gray-500 font-medium">
                          Front
                        </Text>

                        {formState.drivingLicenseFront && (
                          <Image
                            source={{
                              uri: formState.drivingLicenseFront,
                            }}
                            className="h-8 w-14 ms-4"
                            resizeMode="contain"
                          />
                        )}
                      </View>

                      <View className="flex-row gap-4">
                        <TouchableOpacity
                          className="p-2 rounded-md bg-blue-100"
                          onPress={() =>
                            handleOpenCamera(ECameraMode.DRI_FRONT)
                          }
                        >
                          <MaterialIcons
                            name="camera-alt"
                            size={24}
                            color="blue"
                          />
                        </TouchableOpacity>
                        <TouchableOpacity className="p-2 rounded-md bg-red-100">
                          <MaterialIcons name="edit" size={24} color="red" />
                        </TouchableOpacity>
                      </View>
                    </View>

                    {/* Back Section */}
                    <View className="flex-row justify-between items-center p-3 border border-gray-200 rounded-lg">
                      <View className="flex-row justify-between items-center">
                        <Text className="text-sm text-gray-500 font-medium">
                          Back
                        </Text>

                        {formState.drivingLicenseBack && (
                          <Image
                            source={{
                              uri: formState.drivingLicenseBack,
                            }}
                            className="h-8 w-14 ms-4"
                            resizeMode="contain"
                          />
                        )}
                      </View>
                      <View className="flex-row gap-4">
                        <TouchableOpacity
                          className="p-2 rounded-md bg-blue-100"
                          onPress={() => handleOpenCamera(ECameraMode.DRI_BACK)}
                        >
                          <MaterialIcons
                            name="camera-alt"
                            size={24}
                            color="blue"
                          />
                        </TouchableOpacity>
                        <TouchableOpacity className="p-2 rounded-md bg-red-100">
                          <MaterialIcons name="edit" size={24} color="red" />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>

                  <View className="mt-8">
                    <PrimaryButton
                      onPress={() => handleSubmit()}
                      text="Submit"
                    />
                  </View>
                </View>
              )}
            </Formik>
          </ScrollView>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
