import { searchKakaoBooks } from "../api/vendors/search-kakao-books";
import {
  BookSearchAdapter,
  BookSearchItem,
  BookSearchParams,
  BookSearchResponse,
} from "../types/book-search-interface";

import { Book } from "@/features/book-search/models/book";

export class KakaoBookAdapter implements BookSearchAdapter {
  async search(params: BookSearchParams): Promise<BookSearchResponse> {
    const kakaoResponse = await searchKakaoBooks({
      query: params.query,
      page: params.page,
      size: params.size,
      sort: params.sort === "latest" ? "latest" : "accuracy",
    });

    const books: BookSearchItem[] = kakaoResponse.documents.map((book) =>
      Book.fromBookSearchItem({
        title: book.title,
        link: book.url,
        thumbnail: book.thumbnail,
        author: book.authors.join(", "),
        isbn: book.isbn,
        publisher: book.publisher,
        description: book.contents,
      }),
    );

    return {
      total: kakaoResponse.meta.total_count,
      page: params.page || 1,
      size: params.size || 20,
      items: books,
    };
  }
}
