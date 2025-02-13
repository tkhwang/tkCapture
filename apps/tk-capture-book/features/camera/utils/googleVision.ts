import * as FileSystem from "expo-file-system";

import { GOOGLE_CLOUD_VISION_API_URL } from "@/consts/appConsts";

export interface GoogleVisionResponse {
  text: string;
  confidence?: number;
}

/**
 * 이미지에서 텍스트를 추출하는 함수
 * @param imageUri 이미지 파일의 URI
 * @param apiKey Google Cloud Vision API 키
 * @returns 추출된 텍스트와 신뢰도
 */
export async function performOCR(imageUri: string, apiKey: string): Promise<GoogleVisionResponse> {
  try {
    // 이미지를 base64로 변환
    const imageBase64 = await convertImageToBase64(imageUri);

    // Google Cloud Vision API 요청 데이터 구성
    const body = {
      requests: [
        {
          image: {
            content: imageBase64,
          },
          features: [
            {
              type: "TEXT_DETECTION",
              maxResults: 1,
            },
          ],
        },
      ],
    };

    // API 요청
    const response = await fetch(`${GOOGLE_CLOUD_VISION_API_URL}?key=${apiKey}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    console.log("TCL: data", JSON.stringify(data));

    // 응답 처리
    if (data.responses && data.responses[0] && data.responses[0].textAnnotations) {
      const result = data.responses[0].textAnnotations[0];
      return {
        text: result.description || "",
        confidence: result.confidence,
      };
    }

    return { text: "" };
  } catch (error) {
    console.error("OCR Error:", error);
    throw new Error("Failed to perform OCR");
  }
}

/**
 * 이미지 파일을 base64로 변환
 */
async function convertImageToBase64(uri: string): Promise<string> {
  try {
    // 파일 읽기
    const base64 = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    return base64;
  } catch (error) {
    console.error("Error converting image to base64:", error);
    throw new Error("Failed to convert image to base64");
  }
}
