import { searchNaverBooks } from "../api/vendors/search-naver-books";
import {
  BookSearchAdapter,
  BookSearchItem,
  BookSearchParams,
  BookSearchResponse,
} from "../types/book-search-interface";

import { Book } from "@/features/book-search/models/book";

export class NaverBookAdapter implements BookSearchAdapter {
  async search(params: BookSearchParams): Promise<BookSearchResponse> {
    const naverResponse = await searchNaverBooks({
      query: params.query,
      display: params.size,
      start: params.page,
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
