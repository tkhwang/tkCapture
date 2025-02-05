import { searchKakaoBooks } from "../api/vendors/search-kakao-books";
import {
  BookSearchAdapter,
  BookSearchItem,
  BookSearchParams,
  BookSearchResponse,
} from "../types/book-search-interface";

export class KakaoBookAdapter implements BookSearchAdapter {
  async search(params: BookSearchParams): Promise<BookSearchResponse> {
    const kakaoResponse = await searchKakaoBooks({
      query: params.query,
      page: params.page,
      size: params.size,
      sort: params.sort === "latest" ? "latest" : "accuracy",
    });

    const items: BookSearchItem[] = kakaoResponse.documents.map((doc) => ({
      title: doc.title,
      link: doc.url,
      thumbnail: doc.thumbnail,
      author: doc.authors.join(", "),
      isbn: doc.isbn,
      publisher: doc.publisher,
      description: doc.contents,
    }));

    return {
      total: kakaoResponse.meta.total_count,
      page: params.page || 1,
      size: params.size || 20,
      items,
    };
  }
}
