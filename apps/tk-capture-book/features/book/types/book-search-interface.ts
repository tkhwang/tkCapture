export type BookSearchProvider = "naver" | "kakao";

export interface BookSearchItem {
  title: string;
  link: string;
  thumbnail: string;
  author: string;
  isbn: string;
  publisher: string;
  description: string;
}

export interface BookSearchResponse {
  total: number;
  page: number;
  size: number;
  items: BookSearchItem[];
}

export interface BookSearchParams {
  query: string;
  page?: number;
  size?: number;
  sort?: "accuracy" | "latest";
}

export interface BookSearchAdapter {
  search(params: BookSearchParams): Promise<BookSearchResponse>;
}
