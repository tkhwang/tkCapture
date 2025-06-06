import React, { useEffect, useState } from "react";

import { Alert, Button, Text, TouchableOpacity, View } from "react-native";

import { useTranslation } from "react-i18next";

import { Ionicons } from "@expo/vector-icons";
import { CameraType, useCameraPermissions } from "expo-camera";
import * as MediaLibrary from "expo-media-library";

import { GOOGLE_CLOUD_API_KEY } from "@/consts/appConsts";
import { SelectedBookHeader } from "@/features/book/components/selected-book-header";
import { CameraView } from "@/features/camera/components/CameraView";
import { performOCR } from "@/features/camera/utils/googleVision";

export default function SentenceScreen() {
  const { t } = useTranslation();

  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [mediaPermission, requestMediaPermission] = MediaLibrary.usePermissions();
  const [recognizedText, setRecognizedText] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    // 미디어 라이브러리 권한 요청
    if (!mediaPermission?.granted) {
      requestMediaPermission();
    }
  }, [mediaPermission, requestMediaPermission]);

  if (!permission || !mediaPermission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View className="flex-1 justify-center">
        <Text className="pb-3 text-center">We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  if (!mediaPermission.granted) {
    return (
      <View className="flex-1 justify-center">
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
      setIsProcessing(true);

      // 사진을 미디어 라이브러리에 저장
      const asset = await MediaLibrary.createAssetAsync(uri);
      console.log("Picture saved to:", asset.uri);

      // Google Cloud Vision API로 텍스트 추출
      try {
        const ocrResult = await performOCR(uri, GOOGLE_CLOUD_API_KEY!);
        console.log("[+] OCR Result:", ocrResult);
        setRecognizedText(ocrResult.text);

        if (ocrResult.text) {
          // Alert.alert("텍스트 추출 완료", ocrResult.text);
        } else {
          Alert.alert("알림", "텍스트가 발견되지 않았습니다.");
        }
      } catch (error) {
        Alert.alert("OCR 오류", "텍스트 추출 중 오류가 발생했습니다.");
      }
    } catch (error) {
      Alert.alert("오류", "사진 저장 중 오류가 발생했습니다.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleBarcodeScanned = (data: string) => {
    // TODO: 스캔된 ISBN으로 원하는 작업 수행
    // 예: 책 정보 검색, 데이터베이스 저장 등
  };

  const handleTextRemoved = () => {
    setRecognizedText("");
  };

  return (
    <View className="flex-1 bg-background">
      <SelectedBookHeader screen={t("sentence.title")} />
      {permission?.granted ? (
        <>
          <CameraView
            facing={facing}
            onFlipCamera={handleFlipCamera}
            onPictureTaken={handlePictureTaken}
            onBarcodeScanned={handleBarcodeScanned}
          />
          {recognizedText ? (
            <View className="absolute bottom-0 left-0 right-0 bg-black/50">
              <View className="p-4">
                <Text className="text-white">{recognizedText}</Text>
              </View>
              <TouchableOpacity
                className="flex-row items-center justify-center space-x-2 border-t border-white/20 bg-black/80 p-4 active:bg-white/10"
                onPress={handleTextRemoved}
              >
                <Ionicons name="trash-outline" size={20} color="white" />
                <Text className="font-bold text-white">텍스트 지우기</Text>
              </TouchableOpacity>
            </View>
          ) : null}
          {isProcessing && (
            <View className="absolute inset-0 items-center justify-center bg-black/30">
              <Text className="text-white">처리 중...</Text>
            </View>
          )}
        </>
      ) : (
        <View className="flex-1 justify-center">
          <Text className="pb-3 text-center">카메라 권한이 필요합니다</Text>
          <Button onPress={requestPermission} title="권한 허용" />
        </View>
      )}
    </View>
  );
}
