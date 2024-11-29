import React from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  ScrollView,
  Button,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { SafeAreaView } from "react-native-safe-area-context";
import InputField from "@/components/form/InputField";
import PrimaryButton from "@/components/form/PrimaryButton";
import { BASE_URL } from "@/constants/server";
import Toast from "react-native-toast-message";
import CameraCompnent from "@/components/camera";
import { useRouter } from "expo-router";

const ClaimSchema = Yup.object().shape({
  insuranceId: Yup.string().required("Insurance Number is required"),
  password: Yup.string().required("Password is required"),
});

export default function Claim() {
  const router = useRouter();

  const navigateToCamera = () => {
    router.push("../widgets/camera");
  };

  return (
    // <SafeAreaView className="flex-1">
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          className="p-5"
        >
          <Formik
            initialValues={{ insuranceId: "", password: "" }}
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
                  onChangeText={handleChange("insuranceId")}
                  error={errors.insuranceId}
                  touched={touched.insuranceId}
                />

                <InputField
                  label="Password"
                  placeholder="Enter your password"
                  value={values.password}
                  onChangeText={handleChange("password")}
                  error={errors.password}
                  touched={touched.password}
                />
                <InputField
                  label="Password"
                  placeholder="Enter your password"
                  value={values.password}
                  onChangeText={handleChange("password")}
                  error={errors.password}
                  touched={touched.password}
                />
                <InputField
                  label="Password"
                  placeholder="Enter your password"
                  value={values.password}
                  onChangeText={handleChange("password")}
                  error={errors.password}
                  touched={touched.password}
                />
                <InputField
                  label="Password"
                  placeholder="Enter your password"
                  value={values.password}
                  onChangeText={handleChange("password")}
                  error={errors.password}
                  touched={touched.password}
                />

                {/* <CameraCompnent /> */}

                <Button title="Open Camera" onPress={navigateToCamera} />

                <View className="mt-8">
                  <PrimaryButton onPress={() => handleSubmit()} text="Submit" />
                </View>
              </View>
            )}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
    // </SafeAreaView>
  );
}
