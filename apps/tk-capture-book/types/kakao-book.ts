export interface KakaoBookSearchParams {
  query: string;
  sort?: "accuracy" | "latest";
  page?: number;
  size?: number;
  target?: "title" | "isbn" | "publisher" | "person";
}

export interface KakaoBookResponse {
  meta: {
    is_end: boolean;
    pageable_count: number;
    total_count: number;
  };
  documents: {
    authors: string[];
    contents: string;
    datetime: string;
    isbn: string;
    price: number;
    publisher: string;
    sale_price: number;
    status: string;
    thumbnail: string;
    title: string;
    translators: string[];
    url: string;
  }[];
}
