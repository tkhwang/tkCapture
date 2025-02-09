import { CameraType, useCameraPermissions } from "expo-camera";
import { useState } from "react";
import { Button, Text, View } from "react-native";

import { CameraView } from "@/features/camera/components/CameraView";

export default function CameraScreen() {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View className="justify-center flex-1">
        <Text className="pb-3 text-center">We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  const handleFlipCamera = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };

  const handlePictureTaken = (uri: string) => {
    console.log("Picture taken:", uri);
    // TODO: 여기서 촬영된 사진으로 원하는 작업 수행
    // 예: 사진 저장, 서버 업로드, 이미지 분석 등
  };

  const handleBarcodeScanned = (data: string) => {
    console.log("Barcode scanned:", data);
    // TODO: 스캔된 ISBN으로 원하는 작업 수행
    // 예: 책 정보 검색, 데이터베이스 저장 등
  };

  return (
    <CameraView
      facing={facing}
      onFlipCamera={handleFlipCamera}
      onPictureTaken={handlePictureTaken}
      onBarcodeScanned={handleBarcodeScanned}
    />
  );
}
