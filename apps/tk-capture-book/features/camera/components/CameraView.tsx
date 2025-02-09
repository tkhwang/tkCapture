import { Ionicons } from "@expo/vector-icons";
import { CameraView as ExpoCameraView, CameraType } from "expo-camera";
import { StyleSheet, TouchableOpacity, View } from "react-native";

interface CameraViewProps {
  facing: CameraType;
  onFlipCamera: () => void;
}

export function CameraView({ facing, onFlipCamera }: CameraViewProps) {
  return (
    <View className="justify-center flex-1">
      <ExpoCameraView facing={facing} style={styles.camera}>
        <View className="flex-1">
          <TouchableOpacity
            className="absolute items-center justify-center w-12 h-12 rounded-full bottom-8 right-8 bg-black/20"
            onPress={onFlipCamera}
          >
            <Ionicons name="sync-outline" size={28} color="white" />
          </TouchableOpacity>
        </View>
      </ExpoCameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  camera: {
    flex: 1,
  },
});
