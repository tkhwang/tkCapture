import { Book } from "@/features/book/models/book";

import { searchNaverBooks } from "../api/vendors/search-naver-books";
import {
  BookSearchAdapter,
  BookSearchItem,
  BookSearchParams,
  BookSearchResponse,
} from "../types/book-search-interface";

export class NaverBookAdapter implements BookSearchAdapter {
  async search(params: BookSearchParams): Promise<BookSearchResponse> {
    const page = params.page ?? 1;
    const size = params.size ?? 10;
    const naverResponse = await searchNaverBooks({
      query: params.query,
      display: size,
      // Naver API uses the starting index (1-based) rather than page number
      start: (page - 1) * size + 1,
      sort: params.sort === "latest" ? "date" : "sim",
    });

    const books: BookSearchItem[] = naverResponse.items.map((book) =>
      Book.fromBookSearchItem({
        title: book.title.replace(/<[^>]*>/g, ""),
        link: book.link,
        thumbnail: book.image,
        author: book.author,
        isbn: book.isbn,
        publisher: book.publisher,
        description: book.description,
      }),
    );

    return {
      total: naverResponse.total,
      page: params.page || 1,
      size: params.size || 10,
      items: books,
    };
  }
}
