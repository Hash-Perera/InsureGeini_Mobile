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
import GoogleMap from "@/components/map";
import VoiceRecorder from "@/components/voice-recorder";
import CheckboxGroup from "@/components/form/MultipleCheckboxes";
import MultiImageCameraComponent from "@/components/multiple-snap-camera";
import CameraInput from "@/components/form/CameraInput";
const tailwindConfig = require("../../../tailwind.config");
//! Services
import { ClaimService } from "@/services/claim.service";
import AppLoader from "@/components/apploader";
import { useRouter } from "expo-router";
import DropdownField from "@/components/form/Dropdown";

const enum ECameraMode {
  NIC_FRONT = "NIC_FRONT",
  NIC_BACK = "NIC_BACK",
  DRI_FRONT = "DRI_FRONT",
  DRI_BACK = "DRI_BACK",
  INS_FRONT = "INS_FRONT",
  INS_BACK = "INS_BACK",
  DRI_FACE = "DRI_FACE",
  DAMAGE = "DAMAGE",
  LIC_PLATE_FRONT = "LIC_PLATE_FRONT",
  LIC_PLATE_BACK = "LIC_PLATE_BACK",
  VIN_NUMBER = "VIN_NUMBER",
  VEHICLE_FRONT = "VEHICLE_FRONT",
}

const options = [
  { label: "Front", value: "Front" },
  { label: "Back", value: "Back" },
  { label: "Left Side", value: "Left Side" },
  { label: "Right Side", value: "Right Side" },
];

export default function Claim() {
  const colors = tailwindConfig.theme.extend.colors;
  const claimService = ClaimService;

  const [cameraMode, setCameraMode] = useState<ECameraMode | null>(null);
  const [camSettings, setCamSettings] = useState({
    cardHeight: 40,
    cardWidth: 70,
    displayText: "Align the License Here",
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const [formState, setFormState] = useState({
    insuranceId: "",
    vehicleId: "",
    insuranceFront: "",
    insuranceBack: "",
    nicNo: "",
    nicFront: "",
    nicBack: "",
    drivingLicenseNo: "",
    drivingLicenseFront: "",
    drivingLicenseBack: "",
    driverFace: "",
    frontLicencePlate: "",
    backLicencePlate: "",
    damagedAreas: [] as string[],
    location: {
      latitude: 0,
      longitude: 0,
    },
    damageImages: [] as string[],
    audio: "",
    vinNum: "",
    vinNumber: "",
    vehicleFront: "",
  });

  const ClaimSchema = Yup.object().shape({
    insuranceId: Yup.string().required("Insurance Number is required"),
    nicNo: Yup.string().required("NIC No is required"),
    drivingLicenseNo: Yup.string().required("Driving License No is required"),
    // insuranceFront: Yup.string().required("Insurance Front image is required"),
    // insuranceBack: Yup.string().required("Insurance Back image is required"),
  });

  const handleCloseCamera = () => {
    setCameraMode(null);
  };

  const handleCapture = (uri: any) => {
    setFormState((prev) => {
      switch (cameraMode) {
        case "NIC_FRONT":
          setCameraMode(null);
          return { ...prev, nicFront: uri };
        case "NIC_BACK":
          setCameraMode(null);
          return { ...prev, nicBack: uri };
        case "DRI_FRONT":
          setCameraMode(null);
          return { ...prev, drivingLicenseFront: uri };
        case "DRI_BACK":
          setCameraMode(null);
          return { ...prev, drivingLicenseBack: uri };
        case "INS_FRONT":
          setCameraMode(null);
          return { ...prev, insuranceFront: uri };
        case "INS_BACK":
          setCameraMode(null);
          return { ...prev, insuranceBack: uri };
        case "DRI_FACE":
          setCameraMode(null);
          return { ...prev, driverFace: uri };
        case "LIC_PLATE_FRONT":
          setCameraMode(null);
          return { ...prev, frontLicencePlate: uri };
        case "LIC_PLATE_BACK":
          setCameraMode(null);
          return { ...prev, backLicencePlate: uri };
        case "VIN_NUMBER":
          setCameraMode(null);
          return { ...prev, vinNumber: uri };
        case "VEHICLE_FRONT":
          setCameraMode(null);
          return { ...prev, vehicleFront: uri };
        case "DAMAGE":
          return { ...prev, damageImages: uri };

        default:
          return prev;
      }
    });
  };

  const handleOpenCamera = (mode: ECameraMode, settings?: any) => {
    if (settings) {
      setCamSettings(settings);
    }
    setCameraMode(mode);
  };

  //! Submit Claim Request ======================================>
  const handleSubmit = async (values: any) => {
    console.log("Handle submit executed");
    setIsLoading(true);

    const formData = new FormData();

    const dataObject = {
      insuranceId: formState.insuranceId,
      vehicleId: formState.vehicleId,
      nicNo: formState.nicNo,
      drivingLicenseNo: formState.drivingLicenseNo,
      damagedAreas: formState.damagedAreas,
      location: formState.location,
      vinNum: formState.vinNum,
    };
    formData.append("dto", JSON.stringify(dataObject));

    //! Append files if available -------------------------------->
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

    if (formState.driverFace) {
      appendFile("driverFace", formState.driverFace, "driver_face.png");
    }

    if (formState.frontLicencePlate) {
      appendFile(
        "frontLicencePlate",
        formState.frontLicencePlate,
        "front_licence_plate.png"
      );
    }

    if (formState.backLicencePlate) {
      appendFile(
        "backLicencePlate",
        formState.backLicencePlate,
        "back_licence_plate.png"
      );
    }

    if (formState.vinNumber) {
      appendFile("vinNumber", formState.vinNumber, "vin_number.png");
    }

    if (formState.damageImages.length > 0) {
      formState.damageImages.forEach((uri, index) => {
        appendFile("damageImages", uri, `damage_${index}.png`);
      });
    }

    //adding audio file
    if (formState.audio) {
      formData.append("audio", {
        uri: formState.audio,
        name: `audio.mp3`,
        type: "audio/mp3",
      } as any);
    }

    if (formState.vehicleFront) {
      appendFile("vehicleFront", formState.vehicleFront, "vehicle_front.png");
    }

    await claimService
      .submitClaim(formData)
      .then((res) => {
        router.push("/my-claims" as any);
      })
      .catch((err) => {
        console.log(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  //! ===============================================================================
  //! ===============================================================================
  return (
    <SafeAreaView className="flex-1 ">
      <AppLoader visible={isLoading} message="Loading..." />
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
              setFieldValue,
            }) => (
              <View className="self-center w-full">
                <View className="p-4 bg-white rounded-lg ">
                  <Text className="text-lg font-semibold text-gray-800">
                    Vehicle Front Image
                  </Text>

                  <CameraInput
                    label="Front"
                    imageUri={formState.vehicleFront}
                    onPress={() =>
                      handleOpenCamera(ECameraMode.VEHICLE_FRONT, {
                        cardHeight: 70,
                        cardWidth: 70,
                        displayText: "Align the card Here",
                      })
                    }
                    colors={colors}
                    error={errors.vehicleFront}
                    touched={touched.vehicleFront}
                  />

                  <Text className="text-lg font-semibold text-gray-800 mt-3">
                    Insurance Details
                  </Text>

                  <DropdownField
                    label="Select Vehicle"
                    value={values.vehicleId}
                    onChangeSelect={(value) => {
                      handleChange("vehicleId")(value);
                      setFormState((prev) => ({
                        ...prev,
                        vehicleId: value,
                      }));
                    }}
                  />

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
                  <CameraInput
                    label="Front"
                    imageUri={formState.insuranceFront}
                    onPress={() =>
                      handleOpenCamera(ECameraMode.INS_FRONT, {
                        cardHeight: 40,
                        cardWidth: 70,
                        displayText: "Align the card Here",
                      })
                    }
                    colors={colors}
                    error={errors.insuranceFront}
                    touched={touched.insuranceFront}
                  />

                  {/* Back Section */}
                  <CameraInput
                    label="Back"
                    imageUri={formState.insuranceBack}
                    onPress={() =>
                      handleOpenCamera(ECameraMode.INS_BACK, {
                        cardHeight: 40,
                        cardWidth: 70,
                        displayText: "Align the card Here",
                      })
                    }
                    colors={colors}
                    error={errors.insuranceBack}
                    touched={touched.insuranceBack}
                  />
                </View>

                <View className="p-4 mt-3 bg-white rounded-lg">
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
                  <CameraInput
                    label="Front"
                    imageUri={formState.nicFront}
                    onPress={() =>
                      handleOpenCamera(ECameraMode.NIC_FRONT, {
                        cardHeight: 40,
                        cardWidth: 70,
                        displayText: "Align the card Here",
                      })
                    }
                    colors={colors}
                  />

                  {/* Back Section */}
                  <CameraInput
                    label="Back"
                    imageUri={formState.nicBack}
                    onPress={() =>
                      handleOpenCamera(ECameraMode.NIC_BACK, {
                        cardHeight: 40,
                        cardWidth: 70,
                        displayText: "Align the card Here",
                      })
                    }
                    colors={colors}
                  />
                </View>

                <View className="p-4 mt-3 bg-white rounded-lg">
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
                  <CameraInput
                    label="Front"
                    imageUri={formState.drivingLicenseFront}
                    onPress={() =>
                      handleOpenCamera(ECameraMode.DRI_FRONT, {
                        cardHeight: 40,
                        cardWidth: 70,
                        displayText: "Align the card Here",
                      })
                    }
                    colors={colors}
                  />

                  {/* Back Section */}
                  <CameraInput
                    label="Back"
                    imageUri={formState.drivingLicenseBack}
                    onPress={() =>
                      handleOpenCamera(ECameraMode.DRI_BACK, {
                        cardHeight: 40,
                        cardWidth: 70,
                        displayText: "Align the card Here",
                      })
                    }
                    colors={colors}
                  />

                  <Text className="mt-4 text-lg font-semibold text-gray-800">
                    Driver Face
                  </Text>

                  {/* Back Section */}
                  <CameraInput
                    label="Face"
                    imageUri={formState.driverFace}
                    onPress={() =>
                      handleOpenCamera(ECameraMode.DRI_FACE, {
                        cardHeight: 70,
                        cardWidth: 70,
                        displayText: "Align the card Here",
                      })
                    }
                    colors={colors}
                  />
                </View>
                <View className="p-4 mt-3 bg-white rounded-lg">
                  <Text className="mt-4 text-lg font-semibold text-gray-800">
                    VIN Number
                  </Text>

                  <InputField
                    label=""
                    placeholder="VIN number"
                    value={values.vinNum}
                    onChangeText={(text) => {
                      handleChange("vinNum")(text);
                      setFormState((prev) => ({
                        ...prev,
                        vinNum: text,
                      }));
                    }}
                    error={errors.vinNum}
                    touched={touched.vinNum}
                  />

                  <CameraInput
                    label="VIN Number"
                    imageUri={formState.vinNumber}
                    onPress={() =>
                      handleOpenCamera(ECameraMode.VIN_NUMBER, {
                        cardHeight: 40,
                        cardWidth: 70,
                        displayText: "Align Here",
                      })
                    }
                    colors={colors}
                  />

                  <Text className="mt-4 text-lg font-semibold text-gray-800">
                    License Plate Details
                  </Text>

                  <CameraInput
                    label="Front"
                    imageUri={formState.frontLicencePlate}
                    onPress={() =>
                      handleOpenCamera(ECameraMode.LIC_PLATE_FRONT, {
                        cardHeight: 40,
                        cardWidth: 70,
                        displayText: "Align Here",
                      })
                    }
                    colors={colors}
                  />
                  <CameraInput
                    label="Back"
                    imageUri={formState.backLicencePlate}
                    onPress={() =>
                      handleOpenCamera(ECameraMode.LIC_PLATE_BACK, {
                        cardHeight: 40,
                        cardWidth: 70,
                        displayText: "Align Here",
                      })
                    }
                    colors={colors}
                  />

                  <View className="mt-4"></View>

                  <CheckboxGroup
                    title="Damaged Areas"
                    options={options}
                    selectedValues={formState.damagedAreas}
                    onChange={(selectedValues) =>
                      setFormState((prev) => ({
                        ...prev,
                        damagedAreas: selectedValues,
                      }))
                    }
                  />

                  <Text className="mt-4 text-lg font-semibold text-gray-800">
                    Accident Location
                  </Text>

                  <GoogleMap
                    onLocationChange={({ latitude, longitude }) => {
                      setFormState((prevState) => ({
                        ...prevState,
                        location: { latitude, longitude },
                      }));
                    }}
                  />

                  <Text className="mt-10 text-lg font-semibold text-gray-800">
                    Incident Voice Note
                  </Text>
                  <VoiceRecorder setFormState={setFormState} />

                  <Text className="mt-10 text-lg font-semibold text-gray-800">
                    Accident Images
                  </Text>

                  <TouchableOpacity
                    className="flex-row items-center justify-center p-2 mt-4 bg-blue-100 rounded-md"
                    onPress={() => handleOpenCamera(ECameraMode.DAMAGE)}
                  >
                    <MaterialIcons
                      name="camera-alt"
                      size={24}
                      color={colors["custom-blue2"]}
                    />
                  </TouchableOpacity>

                  {formState.damageImages.length > 0 && (
                    <ScrollView
                      horizontal
                      className="w-full h-24 mt-2 bg-gray-200"
                      contentContainerStyle={{
                        alignItems: "center",
                        paddingHorizontal: 10,
                      }}
                      showsHorizontalScrollIndicator={false}
                    >
                      {formState.damageImages.map((uri, index) => (
                        <View key={index} className="relative mr-4">
                          <Image
                            source={{ uri }}
                            className="w-20 h-20 rounded-md"
                            style={{ resizeMode: "cover" }}
                          />
                        </View>
                      ))}
                    </ScrollView>
                  )}
                </View>

                <View className="mt-10 mb-8">
                  <PrimaryButton onPress={() => handleSubmit()} text="Submit" />
                </View>
              </View>
            )}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>

      <Modal
        isVisible={cameraMode !== null && cameraMode !== ECameraMode.DAMAGE}
        style={{ margin: 0, justifyContent: "flex-end" }}
        onBackdropPress={handleCloseCamera}
      >
        <View style={{ height: "60%", backgroundColor: "white" }}>
          <CameraComponent
            onCapture={handleCapture}
            onClose={handleCloseCamera}
            cardHeight={camSettings.cardHeight}
            cardWidth={camSettings.cardWidth}
            displayText={camSettings.displayText}
          />
        </View>
      </Modal>
      <Modal
        isVisible={cameraMode === ECameraMode.DAMAGE}
        style={{ margin: 0, justifyContent: "flex-end" }}
        onBackdropPress={handleCloseCamera}
      >
        <View style={{ height: "60%", backgroundColor: "white" }}>
          <MultiImageCameraComponent
            onClose={handleCloseCamera}
            onImagesChange={handleCapture}
            initialImages={formState.damageImages}
            cardWidth={80}
            cardHeight={50}
            displayText="Align Document Here"
          />
        </View>
      </Modal>
    </SafeAreaView>
  );
}
