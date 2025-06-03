import { Ionicons } from "@expo/vector-icons";
import { CameraType, useCameraPermissions } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, Button, TouchableOpacity, View } from "react-native";

import { Text } from "@/components/ui/text";
import { GOOGLE_CLOUD_API_KEY } from "@/consts/appConsts";
import { CameraView } from "@/features/camera/components/CameraView";
import { performOCR } from "@/features/camera/utils/googleVision";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/providers/auth-provider";

export default function BookCaptureScreen() {
  const { t } = useTranslation();

  const { id: bookId } = useLocalSearchParams();
  const { user } = useAuth();

  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [mediaPermission, requestMediaPermission] = MediaLibrary.usePermissions();
  const [recognizedText, setRecognizedText] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (!mediaPermission?.granted) {
      requestMediaPermission();
    }
  }, [mediaPermission]);

  if (!permission || !mediaPermission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View className="flex-1 justify-center">
        <Text className="pb-3 text-center">
          {t("capture.camera_permission", "We need your permission to show the camera")}
        </Text>
        <Button
          onPress={requestPermission}
          title={t("capture.grant_permission", "Grant Permission")}
        />
      </View>
    );
  }

  if (!mediaPermission.granted) {
    return (
      <View className="flex-1 justify-center">
        <Text className="pb-3 text-center">
          {t("capture.media_permission", "We need your permission to save photos")}
        </Text>
        <Button
          onPress={requestMediaPermission}
          title={t("capture.grant_permission", "Grant Permission")}
        />
      </View>
    );
  }

  const handleFlipCamera = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };

  const handlePictureTaken = async (uri: string) => {
    try {
      setIsProcessing(true);

      // Perform OCR on the image
      const result = await performOCR(uri, GOOGLE_CLOUD_API_KEY!);

      if (result && result.text) {
        setRecognizedText(result.text);
      } else {
        Alert.alert(
          t("capture.error_title", "Error"),
          t("capture.no_text_found", "No text could be recognized in this image."),
        );
      }
    } catch (error) {
      console.error("OCR Error:", error);
      Alert.alert(
        t("capture.error_title", "Error"),
        t("capture.ocr_error", "Failed to process the image."),
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSaveText = async () => {
    if (!recognizedText || !bookId || !user) return;

    try {
      setIsProcessing(true);

      const { error } = await supabase.from("book_highlights").insert({
        book_id: bookId,
        user_id: user.id,
        content: recognizedText,
        source: "camera",
      });

      if (error) {
        throw error;
      }

      Alert.alert(
        t("capture.success_title", "Success"),
        t("capture.text_saved", "Text has been saved successfully!"),
      );

      // Clear the recognized text
      setRecognizedText("");
    } catch (error) {
      console.error("Save Error:", error);
      Alert.alert(
        t("capture.error_title", "Error"),
        t("capture.save_error", "Failed to save the captured text."),
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const handleTextRemoved = () => {
    setRecognizedText("");
  };

  return (
    <View className="flex-1">
      {permission?.granted ? (
        <>
          <CameraView
            facing={facing}
            onFlipCamera={handleFlipCamera}
            onPictureTaken={handlePictureTaken}
          />
          {recognizedText ? (
            <View className="absolute bottom-0 left-0 right-0 bg-black/50">
              <View className="p-4">
                <Text className="text-white">{recognizedText}</Text>
              </View>
              <View className="flex-row justify-between border-t border-white/20 bg-black/80 p-4">
                <TouchableOpacity
                  className="flex-row items-center space-x-2 p-2 active:bg-white/10"
                  onPress={handleTextRemoved}
                >
                  <Ionicons name="trash-outline" size={20} color="white" />
                  <Text className="text-white">{t("capture.discard", "Discard")}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className="flex-row items-center space-x-2 p-2 active:bg-white/10"
                  onPress={handleSaveText}
                >
                  <Ionicons name="save-outline" size={20} color="white" />
                  <Text className="text-white">{t("capture.save", "Save")}</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : null}
          {isProcessing && (
            <View className="absolute inset-0 items-center justify-center bg-black/30">
              <Text className="text-white">{t("capture.processing", "Processing...")}</Text>
            </View>
          )}
        </>
      ) : (
        <View className="flex-1 justify-center">
          <Text className="pb-3 text-center">
            {t("capture.camera_permission", "Camera permission is required")}
          </Text>
          <Button
            onPress={requestPermission}
            title={t("capture.grant_permission", "Grant Permission")}
          />
        </View>
      )}
    </View>
  );
}
