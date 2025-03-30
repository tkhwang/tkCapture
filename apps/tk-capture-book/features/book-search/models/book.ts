import { BookSearchItem } from "@/features/book-search/types/book-search-interface";

/**
 * Book model
 * - convert vendor's book data to our book data
 * - works as ACL (Anti-Corruption Layer)
 *
 * @export
 * @class Book
 * @implements {BookSearchItem}
 */
export class Book implements BookSearchItem {
  private constructor(
    public readonly title: string,
    public readonly link: string,
    public readonly thumbnail: string,
    public readonly author: string,
    public readonly isbn: string,
    public readonly publisher: string,
    public readonly description: string,
  ) {}

  static fromBookSearchItem(item: BookSearchItem): Book {
    return new Book(
      item.title,
      item.link,
      item.thumbnail,
      item.author,
      item.isbn,
      item.publisher,
      item.description,
    );
  }
}
