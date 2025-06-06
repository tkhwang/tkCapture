import { useEffect, useRef } from "react";

import { StyleSheet, TouchableOpacity, View, Alert } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { CameraView as ExpoCameraView, CameraType } from "expo-camera";

interface CameraViewProps {
  facing: CameraType;
  onFlipCamera: () => void;
  onPictureTaken: (uri: string) => void;
  onBarcodeScanned?: (data: string) => void;
}

export function CameraView({
  facing,
  onFlipCamera,
  onPictureTaken,
  onBarcodeScanned,
}: CameraViewProps) {
  const cameraRef = useRef<ExpoCameraView>(null);

  useEffect(() => {
    // 바코드 스캔 리스너 등록
    const subscription = ExpoCameraView.onModernBarcodeScanned((event) => {
      // ISBN 바코드는 보통 EAN-13 또는 ISBN 형식입니다
      if (event.type === "ean13" || event.type === "isbn") {
        onBarcodeScanned?.(event.data);
      }
    });

    // 컴포넌트 언마운트 시 리스너 제거
    return () => {
      subscription.remove();
    };
  }, [onBarcodeScanned]);

  const takePicture = async () => {
    if (!cameraRef.current) return;

    try {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 1,
        skipProcessing: true,
      });

      if (photo && photo.uri) {
        onPictureTaken(photo.uri);
      }
    } catch (error) {
      console.error("Failed to take picture:", error);
      Alert.alert("오류", "사진 촬영 중 오류가 발생했습니다.");
    }
  };

  return (
    // <View style={styles.container}>
    <View className="flex-1">
      <ExpoCameraView ref={cameraRef} facing={facing} style={styles.camera}>
        <View className="flex-1">
          <TouchableOpacity
            className="absolute bottom-8 right-8 h-12 w-12 items-center justify-center rounded-full bg-black/20"
            onPress={onFlipCamera}
          >
            <Ionicons name="sync-outline" size={28} color="white" />
          </TouchableOpacity>

          <View className="absolute bottom-8 left-0 right-0 items-center">
            <TouchableOpacity
              className="h-16 w-16 items-center justify-center rounded-full bg-white"
              onPress={takePicture}
            >
              <View className="h-14 w-14 rounded-full border-4 border-sky-600" />
            </TouchableOpacity>
          </View>
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
