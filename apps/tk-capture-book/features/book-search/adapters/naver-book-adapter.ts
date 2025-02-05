import { searchNaverBooks } from "../api/vendors/search-naver-books";
import {
  BookSearchAdapter,
  BookSearchItem,
  BookSearchParams,
  BookSearchResponse,
} from "../types/book-search-interface";

export class NaverBookAdapter implements BookSearchAdapter {
  async search(params: BookSearchParams): Promise<BookSearchResponse> {
    const naverResponse = await searchNaverBooks({
      query: params.query,
      display: params.size,
      start: params.page,
      sort: params.sort === "latest" ? "date" : "sim",
    });

    const items: BookSearchItem[] = naverResponse.items.map((item) => ({
      title: item.title.replace(/<[^>]*>/g, ""),
      link: item.link,
      thumbnail: item.image,
      author: item.author,
      isbn: item.isbn,
      publisher: item.publisher,
      description: item.description,
    }));

    return {
      total: naverResponse.total,
      page: params.page || 1,
      size: params.size || 10,
      items,
    };
  }
}
