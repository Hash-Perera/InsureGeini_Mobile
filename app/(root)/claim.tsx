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
import Modal from "react-native-modal";
import { ClaimService } from "@/services/claim.service";
const tailwindConfig = require("../../tailwind.config");

const enum ECameraMode {
  NIC_FRONT = "NIC_FRONT",
  NIC_BACK = "NIC_BACK",
  DRI_FRONT = "DRI_FRONT",
  DRI_BACK = "DRI_BACK",
  INS_FRONT = "INS_FRONT",
  INS_BACK = "INS_BACK",
}

export default function Claim() {
  const colors = tailwindConfig.theme.extend.colors;
  const claimService = ClaimService;

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

  const handleSubmit = async (values: any) => {
    console.log(formState);

    const formData = new FormData();

    const dataObject = {
      insuranceId: formState.insuranceId,
      nicNo: formState.nicNo,
      drivingLicenseNo: formState.drivingLicenseNo,
    };
    formData.append("dto", JSON.stringify(dataObject));

    // Append files if available
    const appendFile = (key: string, uri: string, filename: string) => {
      formData.append(key, {
        uri,
        name: filename,
        type: "image/png",
      } as any);
    };

    if (formState.insuranceFront) {
      appendFile(
        "insuranceFront",
        formState.insuranceFront,
        "insurance_front.png"
      );
    }

    if (formState.insuranceBack) {
      appendFile(
        "insuranceBack",
        formState.insuranceBack,
        "insurance_back.png"
      );
    }

    if (formState.nicFront) {
      appendFile("nicFront", formState.nicFront, "nic_front.png");
    }

    if (formState.nicBack) {
      appendFile("nicBack", formState.nicBack, "nic_back.png");
    }

    if (formState.drivingLicenseFront) {
      appendFile(
        "drivingLicenseFront",
        formState.drivingLicenseFront,
        "driving_license_front.png"
      );
    }

    if (formState.drivingLicenseBack) {
      appendFile(
        "drivingLicenseBack",
        formState.drivingLicenseBack,
        "driving_license_back.png"
      );
    }

    await claimService
      .submitClaim(formData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <SafeAreaView className="flex-1 ">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          className="p-5"
          keyboardShouldPersistTaps="handled"
        >
          <Formik
            initialValues={formState}
            validationSchema={ClaimSchema}
            onSubmit={handleSubmit}
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

                    <TouchableOpacity
                      className="p-2 rounded-md bg-blue-100"
                      onPress={() => handleOpenCamera(ECameraMode.INS_FRONT)}
                    >
                      <MaterialIcons
                        name="camera-alt"
                        size={24}
                        color={colors["custom-blue2"]}
                      />
                    </TouchableOpacity>
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

                    <TouchableOpacity
                      className="p-2 rounded-md bg-blue-100"
                      onPress={() => handleOpenCamera(ECameraMode.INS_BACK)}
                    >
                      <MaterialIcons
                        name="camera-alt"
                        size={24}
                        color={colors["custom-blue2"]}
                      />
                    </TouchableOpacity>
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

                    <TouchableOpacity
                      className="p-2 rounded-md bg-blue-100"
                      onPress={() => handleOpenCamera(ECameraMode.NIC_FRONT)}
                    >
                      <MaterialIcons
                        name="camera-alt"
                        size={24}
                        color={colors["custom-blue2"]}
                      />
                    </TouchableOpacity>
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

                    <TouchableOpacity
                      className="p-2 rounded-md bg-blue-100"
                      onPress={() => handleOpenCamera(ECameraMode.NIC_BACK)}
                    >
                      <MaterialIcons
                        name="camera-alt"
                        size={24}
                        color={colors["custom-blue2"]}
                      />
                    </TouchableOpacity>
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

                    <TouchableOpacity
                      className="p-2 rounded-md bg-blue-100"
                      onPress={() => handleOpenCamera(ECameraMode.DRI_FRONT)}
                    >
                      <MaterialIcons
                        name="camera-alt"
                        size={24}
                        color={colors["custom-blue2"]}
                      />
                    </TouchableOpacity>
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
                    {/* <View className="flex-row gap-4">
                      </View> */}
                    <TouchableOpacity
                      className="p-2 rounded-md bg-blue-100"
                      onPress={() => handleOpenCamera(ECameraMode.DRI_BACK)}
                    >
                      <MaterialIcons
                        name="camera-alt"
                        size={24}
                        color={colors["custom-blue2"]}
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                <View className="mt-8">
                  <PrimaryButton onPress={() => handleSubmit()} text="Submit" />
                </View>
              </View>
            )}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>

      <Modal
        isVisible={cameraMode !== null}
        style={{ margin: 0, justifyContent: "flex-end" }}
        onBackdropPress={handleCloseCamera}
      >
        <View style={{ height: "60%", backgroundColor: "white" }}>
          <CameraComponent
            onCapture={handleCapture}
            onClose={handleCloseCamera}
          />
        </View>
      </Modal>
    </SafeAreaView>
  );
}
