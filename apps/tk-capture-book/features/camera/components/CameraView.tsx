import { Ionicons } from "@expo/vector-icons";
import { CameraView as ExpoCameraView, CameraType } from "expo-camera";
import { useEffect, useRef } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

interface CameraViewProps {
  facing: CameraType;
  onFlipCamera: () => void;
  onPictureTaken?: (uri: string) => void;
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
        onPictureTaken?.(photo.uri);
      }
    } catch (error) {
      console.error("Failed to take picture:", error);
    }
  };

  return (
    <ExpoCameraView ref={cameraRef} facing={facing} style={styles.camera}>
      <View className="flex-1">
        <TouchableOpacity
          className="absolute items-center justify-center w-12 h-12 rounded-full bottom-8 right-8 bg-black/20"
          onPress={onFlipCamera}
        >
          <Ionicons name="sync-outline" size={28} color="white" />
        </TouchableOpacity>

        <View className="absolute left-0 right-0 items-center bottom-8">
          <TouchableOpacity
            className="items-center justify-center w-16 h-16 bg-white rounded-full"
            onPress={takePicture}
          >
            <View className="border-4 rounded-full w-14 h-14 border-sky-600" />
          </TouchableOpacity>
        </View>
      </View>
    </ExpoCameraView>
  );
}

const styles = StyleSheet.create({
  camera: {
    flex: 1,
  },
});
