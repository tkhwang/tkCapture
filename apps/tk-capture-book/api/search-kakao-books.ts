import axios from "axios";

import { KakaoBookResponse, KakaoBookSearchParams } from "@/types/book/kakao-book";

const KAKAO_API_URL = "https://dapi.kakao.com/v3/search/book";

// Kakao API 클라이언트 인스턴스 생성
const kakaoApiClient = axios.create({
  baseURL: KAKAO_API_URL,
  headers: {
    Authorization: `KakaoAK ${process.env.EXPO_PUBLIC_KAKAO_REST_API_KEY!}`,
  },
});

export async function searchKakaoBooks(params: KakaoBookSearchParams): Promise<KakaoBookResponse> {
  const { data } = await kakaoApiClient.get("", {
    params: {
      query: params.query,
      sort: params.sort || "accuracy", // accuracy (정확도순) or latest (발간일순)
      page: params.page || 1,
      size: params.size || 20,
      target: params.target, // title (제목), isbn (ISBN), publisher (출판사), person(인명)
    },
  });
  return data;
}
