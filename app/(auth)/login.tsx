import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Formik } from "formik";
import * as Yup from "yup";
import InputField from "@/components/form/InputField";
import PrimaryButton from "@/components/form/PrimaryButton";

const LoginSchema = Yup.object().shape({
  insuranceNumber: Yup.string().required("Insurance Number is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default function Login() {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <SafeAreaView className="bg-general-500 flex-1 justify-center items-center">
          <Image
            source={require("@/assets/images/InsureGeini.png")}
            className="w-52 h-52 mb-4"
            resizeMode="contain"
          />

          {/* Welcome Text */}
          <View className="mb-6 items-center">
            <Text className="text-xl font-bold text-gray-800">Welcome!</Text>
          </View>

          <Formik
            initialValues={{ insuranceNumber: "", password: "" }}
            validationSchema={LoginSchema}
            onSubmit={(values) => {
              console.log("Login Data:", values);
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
              <View className="w-4/5">
                <InputField
                  label="Insurance ID"
                  placeholder="Enter your insurance Id"
                  value={values.insuranceNumber}
                  onChangeText={handleChange("insuranceNumber")}
                  error={errors.insuranceNumber}
                  touched={touched.insuranceNumber}
                />

                <InputField
                  label="Password"
                  placeholder="Enter your password"
                  value={values.password}
                  onChangeText={handleChange("password")}
                  error={errors.password}
                  touched={touched.password}
                />

                <View className="mt-8">
                  <PrimaryButton onPress={() => handleSubmit()} text="Login" />
                </View>
              </View>
            )}
          </Formik>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
