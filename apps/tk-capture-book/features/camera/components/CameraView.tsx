import { CameraView as ExpoCameraView, CameraType } from "expo-camera";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface CameraViewProps {
  facing: CameraType;
  onFlipCamera: () => void;
}

export function CameraView({ facing, onFlipCamera }: CameraViewProps) {
  return (
    <View style={styles.container}>
      <ExpoCameraView style={styles.camera}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={onFlipCamera}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
        </View>
      </ExpoCameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
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
