import { StyleSheet, Text, View } from "react-native";

export function AppName() {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.tk]}>tk</Text>
      <Text style={[styles.text, styles.capture]}>Capture</Text>
      <Text style={[styles.text, styles.book]}>Book</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 100,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  text: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    letterSpacing: 2,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  tk: {
    color: "#fff",
  },
  capture: {
    color: "#00cec9", // Green color for camera app
  },
  book: {
    color: "#fff", // Amber color for book series
  },
});
