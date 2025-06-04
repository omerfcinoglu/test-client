import { Author } from "./IAuthor";

export interface Post {
  _id: string;
  title: string;
  content: string;
  author: Author;
  date: string;
}
