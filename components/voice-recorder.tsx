// import React, { useState, useEffect } from "react";
// import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
// import { Audio } from "expo-av";
// import { Ionicons, MaterialIcons } from "@expo/vector-icons";
// import { ProgressBar } from "react-native-paper";

// const recordingOptions = {
//   android: {
//     extension: ".m4a",
//     outputFormat: 2, // MPEG_4
//     audioEncoder: 3, // AAC
//     sampleRate: 44100,
//     numberOfChannels: 2,
//     bitRate: 128000,
//   },
//   ios: {
//     extension: ".m4a",
//     audioQuality: 0, // High quality
//     sampleRate: 44100,
//     numberOfChannels: 2,
//     bitRate: 128000,
//     linearPCMBitDepth: 16,
//     linearPCMIsBigEndian: false,
//     linearPCMIsFloat: false,
//   },
//   web: {
//     mimeType: "audio/webm",
//     bitsPerSecond: 128000,
//     numberOfAudioChannels: 2,
//     sampleRate: 44100,
//   },
// };

// export default function VoiceRecorder() {
//   const [recording, setRecording] = useState<Audio.Recording | null>(null);
//   const [recordingUri, setRecordingUri] = useState<string | null>(null);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [sound, setSound] = useState<Audio.Sound | null>(null);
//   const [playbackProgress, setPlaybackProgress] = useState(0);

//   // Start recording
//   const startRecording = async () => {
//     try {
//       console.log("Requesting permissions...");
//       const { granted } = await Audio.requestPermissionsAsync();
//       if (!granted) {
//         Alert.alert("Permission required", "Please grant audio permissions.");
//         return;
//       }

//       console.log("Configuring audio...");
//       await Audio.setAudioModeAsync({
//         allowsRecordingIOS: true,
//         playsInSilentModeIOS: true,
//       });

//       console.log("Starting recording...");
//       const recording = new Audio.Recording();
//       await recording.prepareToRecordAsync(recordingOptions);
//       await recording.startAsync();
//       setRecording(recording);
//       console.log("Recording started.");
//     } catch (error) {
//       console.error("Failed to start recording:", error);
//     }
//   };

//   // Stop recording
//   const stopRecording = async () => {
//     console.log("Stopping recording...");
//     try {
//       if (!recording) return;

//       await recording.stopAndUnloadAsync();
//       const uri = recording.getURI();
//       setRecordingUri(uri);
//       console.log("Recording stopped and saved to:", uri);
//       setRecording(null);
//     } catch (error) {
//       console.error("Failed to stop recording:", error);
//     }
//   };

//   // Play recording
//   const playRecording = async () => {
//     try {
//       if (!recordingUri) return;

//       console.log("Playing recording...");
//       const { sound } = await Audio.Sound.createAsync({ uri: recordingUri });
//       setSound(sound);
//       setIsPlaying(true);
//       await sound.playAsync();
//       sound.setOnPlaybackStatusUpdate((status) => {
//         if (status.isLoaded && !status.isPlaying) {
//           setIsPlaying(false);
//         }
//       });
//     } catch (error) {
//       console.error("Failed to play recording:", error);
//     }
//   };

//   // Stop playback
//   const stopPlayback = async () => {
//     if (sound) {
//       await sound.stopAsync();
//       setIsPlaying(false);
//     }
//   };

//   // Delete recording
//   const deleteRecording = () => {
//     setRecordingUri(null);
//     setPlaybackProgress(0);
//     Alert.alert("Deleted", "Recording has been deleted.");
//   };

//   // Cleanup sound object on unmount
//   useEffect(() => {
//     return () => {
//       if (sound) {
//         sound.unloadAsync();
//       }
//     };
//   }, [sound]);

//   return (
//     <View className="flex-1 justify-center items-center bg-gray-100">
//       {!recordingUri && !recording && (
//         <TouchableOpacity
//           className="bg-blue-500 p-4 rounded-full flex-row justify-center items-center"
//           onPress={startRecording}
//         >
//           <MaterialIcons name="mic" size={24} color="white" />
//           <Text className="text-white font-bold ml-2">Record</Text>
//         </TouchableOpacity>
//       )}

//       {recording && (
//         <TouchableOpacity
//           className="bg-red-500 p-4 rounded-full flex-row justify-center items-center"
//           onPress={stopRecording}
//         >
//           <MaterialIcons name="stop" size={24} color="white" />
//           <Text className="text-white font-bold ml-2">Stop</Text>
//         </TouchableOpacity>
//       )}

//       {recordingUri && !recording && (
//         <>
//           <View className="w-4/5 mt-4">
//             <ProgressBar progress={playbackProgress} color="#007bff" />
//             <Text className="text-gray-600 text-center mt-2">
//               {playbackProgress * 100}% played
//             </Text>
//           </View>

//           <View className="flex-row mt-6 space-x-4">
//             <TouchableOpacity
//               className="bg-green-500 p-4 rounded-full flex-row justify-center items-center"
//               onPress={playRecording}
//             >
//               <Ionicons
//                 name={isPlaying ? "pause" : "play"}
//                 size={24}
//                 color="white"
//               />
//               <Text className="text-white font-bold ml-2">
//                 {isPlaying ? "Pause" : "Play"}
//               </Text>
//             </TouchableOpacity>

//             <TouchableOpacity
//               className="bg-gray-500 p-4 rounded-full flex-row justify-center items-center"
//               onPress={deleteRecording}
//             >
//               <Ionicons name="trash" size={24} color="white" />
//               <Text className="text-white font-bold ml-2">Delete</Text>
//             </TouchableOpacity>
//           </View>
//         </>
//       )}
//     </View>
//   );
// }

import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, Alert, ScrollView } from "react-native";
import { Audio } from "expo-av";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

const recordingOptions = {
  android: {
    extension: ".m4a",
    outputFormat: 2, // MPEG_4
    audioEncoder: 3, // AAC
    sampleRate: 44100,
    numberOfChannels: 2,
    bitRate: 128000,
  },
  ios: {
    extension: ".m4a",
    audioQuality: 0, // High quality
    sampleRate: 44100,
    numberOfChannels: 2,
    bitRate: 128000,
    linearPCMBitDepth: 16,
    linearPCMIsBigEndian: false,
    linearPCMIsFloat: false,
  },
  web: {
    mimeType: "audio/webm",
    bitsPerSecond: 128000,
    numberOfAudioChannels: 2,
    sampleRate: 44100,
  },
};

export default function VoiceRecorder() {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [recordingUri, setRecordingUri] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [waveBars, setWaveBars] = useState<number[]>([]);
  const [playbackProgress, setPlaybackProgress] = useState(0); // Progress of audio
  const [playedSeconds, setPlayedSeconds] = useState(0); // Played time in seconds
  const [recordingSeconds, setRecordingSeconds] = useState(0); // Recording time in seconds

  const scrollViewRef = useRef<ScrollView>(null);
  const intervalMap = useRef<Map<Audio.Recording, NodeJS.Timeout>>(new Map()); // Map to track intervals for recordings

  // Start recording
  const startRecording = async () => {
    try {
      const { granted } = await Audio.requestPermissionsAsync();
      if (!granted) {
        Alert.alert("Permission required", "Please grant audio permissions.");
        return;
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(recordingOptions);
      await recording.startAsync();
      setRecording(recording);
      setWaveBars([]); // Reset wave bars when a new recording starts
      setRecordingSeconds(0); // Reset the recording timer

      // Start recording timer
      const interval = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);

      // Store the interval in the map
      intervalMap.current.set(recording, interval);
    } catch (error) {
      console.error("Failed to start recording:", error);
    }
  };

  // Stop recording
  const stopRecording = async () => {
    try {
      if (!recording) return;

      // Clear the interval for this recording
      const interval = intervalMap.current.get(recording);
      if (interval) {
        clearInterval(interval);
        intervalMap.current.delete(recording);
      }

      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      setRecordingUri(uri);
      setRecording(null);
    } catch (error) {
      console.error("Failed to stop recording:", error);
    }
  };

  // Play recording
  const playRecording = async () => {
    try {
      if (!recordingUri) return;

      const { sound } = await Audio.Sound.createAsync({ uri: recordingUri });
      setSound(sound);
      setIsPlaying(true);

      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded) {
          const progress = status.durationMillis
            ? status.positionMillis / status.durationMillis
            : 0;
          setPlaybackProgress(progress);
          setPlayedSeconds(Math.floor(status.positionMillis / 1000));

          // Automatically scroll to match the playback progress
          if (scrollViewRef.current) {
            const totalBars = waveBars.length;
            const scrollPosition = progress * totalBars * 6 - 50; // 6 is approx bar width+spacing
            scrollViewRef.current.scrollTo({
              x: scrollPosition,
              animated: true,
            });
          }

          if (status.didJustFinish) {
            setIsPlaying(false);
          }
        }
      });

      await sound.playAsync();
    } catch (error) {
      console.error("Failed to play recording:", error);
    }
  };

  const deleteRecording = async () => {
    try {
      // Stop and unload the sound if it's playing
      if (sound) {
        await sound.stopAsync();
        await sound.unloadAsync();
        setSound(null);
      }

      // Clear the state
      setRecordingUri(null);
      setWaveBars([]);
      setPlaybackProgress(0);
      setPlayedSeconds(0);
      setRecordingSeconds(0);

      Alert.alert("Deleted", "Recording has been deleted.");
    } catch (error) {
      console.error("Failed to delete recording:", error);
    }
  };

  // Stop playback
  const stopPlayback = async () => {
    if (sound) {
      await sound.stopAsync();
      setIsPlaying(false);
    }
  };

  // Generate wave bars dynamically during recording
  useEffect(() => {
    if (recording) {
      const interval = setInterval(() => {
        setWaveBars((prev) => [...prev, Math.random() * 50 + 10]); // Add random bar height
        scrollViewRef.current?.scrollToEnd({ animated: true }); // Auto-scroll to the end during recording
      }, 500); // Add a new bar every 500ms

      return () => clearInterval(interval);
    }
  }, [recording]);

  // Cleanup sound object on unmount
  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }

      // Clear all intervals in the map
      intervalMap.current.forEach((interval) => clearInterval(interval));
      intervalMap.current.clear();
    };
  }, [sound]);

  return (
    <View className="flex-1 justify-center items-center bg-gray-100">
      {/* Wave Animation */}
      <View
        style={{
          width: "90%",
          height: 100,
          backgroundColor: "#f0f0f0",
          borderRadius: 10,
          padding: 10,
          overflow: "hidden",
        }}
      >
        <ScrollView
          horizontal
          ref={scrollViewRef}
          showsHorizontalScrollIndicator={false}
        >
          <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
            {waveBars.map((height, index) => {
              const isPlayed = index < playbackProgress * waveBars.length;
              return (
                <View
                  key={index}
                  style={{
                    width: 4,
                    height,
                    backgroundColor: isPlayed ? "#00ff00" : "#007bff", // Played portion is green
                    borderRadius: 2,
                    marginHorizontal: 2,
                  }}
                />
              );
            })}
          </View>
        </ScrollView>
      </View>

      {/* Recording Timer */}
      {recording && (
        <Text className="text-gray-600 mt-2">
          Recording: {recordingSeconds}s
        </Text>
      )}

      {/* Playback Timer */}
      {recordingUri && !recording && (
        <Text className="text-gray-600 mt-2">Played: {playedSeconds}s</Text>
      )}

      {/* Recording and Playback Buttons */}
      {!recordingUri && !recording && (
        <TouchableOpacity
          className="bg-blue-500 p-4 rounded-full mt-6"
          onPress={startRecording}
        >
          <MaterialIcons name="mic" size={24} color="white" />
        </TouchableOpacity>
      )}

      {recording && (
        <TouchableOpacity
          className="bg-red-500 p-4 rounded-full mt-6"
          onPress={stopRecording}
        >
          <MaterialIcons name="stop" size={24} color="white" />
        </TouchableOpacity>
      )}

      {recordingUri && !recording && (
        <View className="flex-row mt-6 space-x-4">
          <TouchableOpacity
            className="bg-green-500 p-4 rounded-full"
            onPress={isPlaying ? stopPlayback : playRecording}
          >
            <Ionicons
              name={isPlaying ? "pause" : "play"}
              size={24}
              color="white"
            />
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-gray-500 p-4 rounded-full"
            onPress={() => {
              deleteRecording(); // Properly execute the delete function
            }}
          >
            <Ionicons name="trash" size={24} color="white" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
