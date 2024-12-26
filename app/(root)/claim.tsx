import React, { useState } from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
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

export default function Claim() {
  // const [capturedFrontImage, setCapturedFrontImage] = useState("");
  // const [capturedBackImage, setCapturedBackImage] = useState("");
  const [cameraMode, setCameraMode] = useState<"NIC_FRONT" | "NIC_BACK" | null>(
    null
  );

  const [formState, setFormState] = useState({
    insuranceId: "",
    password: "",
    nicFront: "",
    nicBack: "",
  });

  const ClaimSchema = Yup.object().shape({
    insuranceId: Yup.string().required("Insurance Number is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleCloseCamera = () => {
    setCameraMode(null);
  };

  const handleCapture = (uri: string) => {
    if (cameraMode === "NIC_FRONT") {
      // setCapturedFrontImage(uri);
      setFormState((prev) => ({
        ...prev,
        nicFront: uri,
      }));
    } else if (cameraMode === "NIC_BACK") {
      // setCapturedBackImage(uri);
      setFormState((prev) => ({
        ...prev,
        nicBack: uri,
      }));
    }
    setCameraMode(null);
  };

  const handleOpenCamera = (mode: "NIC_FRONT" | "NIC_BACK") => {
    setCameraMode(mode);
  };

  return (
    // <SafeAreaView className="flex-1">
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
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
                  <InputField
                    label="Insurance ID"
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

                  <InputField
                    label="Password"
                    placeholder="Enter your password"
                    value={values.password}
                    onChangeText={(text) => {
                      handleChange("password")(text);
                      setFormState((prev) => ({
                        ...prev,
                        password: text,
                      }));
                    }}
                    error={errors.password}
                    touched={touched.password}
                  />

                  <View className="p-4 bg-white rounded-lg shadow-md">
                    <Text className="text-lg font-semibold mb-4 text-gray-800">
                      NIC Images
                    </Text>

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
                          onPress={() => handleOpenCamera("NIC_FRONT")}
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
                          onPress={() => handleOpenCamera("NIC_BACK")}
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
    </TouchableWithoutFeedback>
    // </SafeAreaView>
  );
}
