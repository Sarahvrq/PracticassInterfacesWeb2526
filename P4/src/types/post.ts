export type Author = {
  _id: string;
  username: string;
};

export type Post = {
  _id: string;
  contenido: string;
  autor: Author;
  likes: string[];
  retweets: string[];
  comentarios: string[];
  createdAt: string;
  updatedAt: string;
};

export type HomeResponse = {
  posts: Post[];
  pagina: number;
  totalPaginas: number;
  totalPosts: number;
};