import { booksQuery } from "./books";

export const resolvers = {
  Query: {
    books: booksQuery
  }
}