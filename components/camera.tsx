import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function CameraCompnent() {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});

// import React, { useState, useRef } from "react";
// import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
// import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
// import { PermissionStatus } from "expo-modules-core";

// export default function CameraComponent() {
//   const [type, setType] = useState("back");
//   const [permission, requestPermission] = useCameraPermissions();
//   const [capturedImage, setCapturedImage] = useState<string | null>(null);
//   const cameraRef = useRef<CameraView | null>(null); // Camera reference

//   // Check for permissions
//   if (!permission) {
//     return <View style={styles.container} />;
//   }

//   if (permission.status !== PermissionStatus.GRANTED) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.message}>
//           We need your permission to use the camera.
//         </Text>
//         <TouchableOpacity
//           style={styles.permissionButton}
//           onPress={requestPermission}
//         >
//           <Text style={styles.permissionText}>Grant Permission</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }

//   // Toggle camera type (front/back)
//   const toggleCameraType = () => {
//     setType((current) => (current === "back" ? "front" : "back"));
//   };

//   // Capture image and save URI
//   const takePicture = async () => {
//     if (cameraRef.current) {
//       const photo = await cameraRef.current.takePictureAsync();
//       //   setCapturedImage(photo.uri);
//     }
//   };

//   // Reset captured image to retake
//   const resetCapturedImage = () => {
//     setCapturedImage(null);
//   };

//   return (
//     <View style={styles.container}>
//       {capturedImage ? (
//         // Preview the captured image
//         <View style={styles.previewContainer}>
//           <Image source={{ uri: capturedImage }} style={styles.previewImage} />
//           <View style={styles.previewButtons}>
//             <TouchableOpacity
//               style={styles.button}
//               onPress={resetCapturedImage}
//             >
//               <Text style={styles.text}>Retake</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       ) : (
//         // Camera view
//         <CameraView style={styles.camera} ref={cameraRef}>
//           <View style={styles.controls}>
//             <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
//               <Text style={styles.text}>Flip</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.button} onPress={takePicture}>
//               <Text style={styles.text}>Capture</Text>
//             </TouchableOpacity>
//           </View>
//         </CameraView>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     backgroundColor: "#000",
//   },
//   message: {
//     textAlign: "center",
//     padding: 10,
//     fontSize: 16,
//     color: "#fff",
//   },
//   permissionButton: {
//     backgroundColor: "#1978bb",
//     padding: 12,
//     borderRadius: 8,
//     alignSelf: "center",
//   },
//   permissionText: {
//     color: "#fff",
//     fontWeight: "bold",
//     textAlign: "center",
//   },
//   camera: {
//     flex: 1,
//     justifyContent: "flex-end",
//   },
//   controls: {
//     flexDirection: "row",
//     justifyContent: "space-evenly",
//     paddingBottom: 20,
//   },
//   button: {
//     backgroundColor: "rgba(0,0,0,0.5)",
//     padding: 10,
//     borderRadius: 10,
//   },
//   text: {
//     color: "#fff",
//     fontSize: 16,
//   },
//   previewContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#000",
//   },
//   previewImage: {
//     width: "100%",
//     height: "80%",
//     resizeMode: "contain",
//   },
//   previewButtons: {
//     flexDirection: "row",
//     justifyContent: "space-evenly",
//     width: "100%",
//     marginTop: 20,
//   },
// });
