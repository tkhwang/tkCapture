import { CameraType, useCameraPermissions } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { useEffect, useState } from "react";
import { Alert, Button, Text, View } from "react-native";

import { CameraView } from "@/features/camera/components/CameraView";

export default function CameraScreen() {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [mediaPermission, requestMediaPermission] = MediaLibrary.usePermissions();

  useEffect(() => {
    // 미디어 라이브러리 권한 요청
    if (!mediaPermission?.granted) {
      requestMediaPermission();
    }
  }, [mediaPermission]);

  if (!permission || !mediaPermission) {
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

  if (!mediaPermission.granted) {
    return (
      <View className="justify-center flex-1">
        <Text className="pb-3 text-center">We need your permission to save photos</Text>
        <Button onPress={requestMediaPermission} title="grant permission" />
      </View>
    );
  }

  const handleFlipCamera = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };

  const handlePictureTaken = async (uri: string) => {
    try {
      // 먼저 사진을 미디어 라이브러리에 저장
      const asset = await MediaLibrary.createAssetAsync(uri);

      // tkCaptureBook 앨범이 있는지 확인하고 없으면 생성
      const albums = await MediaLibrary.getAlbumsAsync();
      const tkCaptureBookAlbum = albums.find((album) => album.title === "tkCaptureBook");

      if (tkCaptureBookAlbum) {
        // 기존 앨범에 사진 추가
        await MediaLibrary.addAssetsToAlbumAsync([asset], tkCaptureBookAlbum.id, false);
      } else {
        // 새 앨범 생성 후 사진 추가
        await MediaLibrary.createAlbumAsync("tkCaptureBook", asset, false);
      }

      Alert.alert("Success", "Photo saved to tkCaptureBook album");
    } catch (error) {
      console.error("Failed to save photo:", error);
      Alert.alert("Error", "Failed to save photo");
    }
  };

  const handleBarcodeScanned = (data: string) => {
    console.log("Barcode scanned:", data);
    // TODO: 스캔된 ISBN으로 원하는 작업 수행
    // 예: 책 정보 검색, 데이터베이스 저장 등
  };

  return (
    <View className="justify-center flex-1">
      <CameraView
        facing={facing}
        onFlipCamera={handleFlipCamera}
        onPictureTaken={handlePictureTaken}
        onBarcodeScanned={handleBarcodeScanned}
      />
    </View>
  );
}
