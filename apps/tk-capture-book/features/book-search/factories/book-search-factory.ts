import { KakaoBookAdapter } from "../adapters/kakao-book-adapter";
import { NaverBookAdapter } from "../adapters/naver-book-adapter";
import { BookSearchAdapter } from "../types/book-search-interface";

export type BookSearchProvider = "kakao" | "naver";

export function createBookSearchAdapter(provider: BookSearchProvider): BookSearchAdapter {
  switch (provider) {
    case "kakao":
      return new KakaoBookAdapter();
    case "naver":
      return new NaverBookAdapter();
    default:
      throw new Error(`Unsupported provider: ${provider}`);
  }
}
