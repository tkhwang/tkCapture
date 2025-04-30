import { BookSearchItem } from "@/features/book/types/book-search-interface";
import { TablesInsert, Database } from "@/types/types_db";

// Define the BookStatus type from the Supabase schema
type BookStatus = Database["public"]["Enums"]["book_status"];

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
    public readonly book_status: BookStatus,
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
      "unread", // Default book_status
    );
  }

  toDatabase(owner_id: string): TablesInsert<"books"> {
    return {
      owner_id,
      title: this.title,
      link: this.link,
      thumbnail: this.thumbnail,
      author: this.author,
      isbn: this.isbn,
      publisher: this.publisher,
      description: this.description,
      book_status: this.book_status,
    };
  }
}
