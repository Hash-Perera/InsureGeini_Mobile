// import React, { useState } from "react";
// import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
// import { Camera } from "expo-camera";

// export default function CameraScreen() {
//   const [permission, requestPermission] = Camera.useCameraPermissions();
//   const [cameraRef, setCameraRef] = useState<Camera | null>(null);

//   if (!permission) {
//     // Camera permissions are still loading
//     return <View style={styles.messageContainer}><Text>Requesting camera permission...</Text></View>;
//   }

//   if (!permission.granted) {
//     // Camera permissions not granted
//     return (
//       <View style={styles.messageContainer}>
//         <Text>Camera permission is required to use this feature.</Text>
//         <TouchableOpacity onPress={requestPermission}>
//           <Text style={styles.buttonText}>Grant Permission</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }

//   const takePicture = async () => {
//     if (cameraRef) {
//       const photo = await cameraRef.takePictureAsync();
//       console.log("Photo URI:", photo.uri);
//       // Do something with the captured photo (e.g., preview or upload)
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Camera
//         ref={(ref) => setCameraRef(ref)}
//         style={styles.camera}
//         type={Camera.Constants.Type.back}
//       />
//       <TouchableOpacity style={styles.button} onPress={takePicture}>
//         <Text style={styles.buttonText}>Capture</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   messageContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   camera: {
//     flex: 1,
//   },
//   button: {
//     position: "absolute",
//     bottom: 20,
//     alignSelf: "center",
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     backgroundColor: "blue",
//     borderRadius: 10,
//   },
//   buttonText: {
//     color: "white",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
// });

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
