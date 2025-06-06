import { Database } from "@/types/types_db";

export type Book = Database["public"]["Tables"]["books"]["Row"];
export type BookStatus = Database["public"]["Enums"]["book_status"];
