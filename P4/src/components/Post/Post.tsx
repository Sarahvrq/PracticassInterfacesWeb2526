"use client";

import { useRouter } from "next/navigation";
import { Post } from "@/types";
// @ts-ignore
import "./Post.css";

type Props = {
  post: Post;
  onLike: (id: string) => void;
  onRetweet: (id: string) => void;
};

export const PostCard = ({ post, onLike, onRetweet }: Props) => {
  const router = useRouter();

  return (
    <div className="postCard" onClick={() => router.push(`/post/${post._id}`)}>
      <div className="postHeader">
        <span
          className="postAuthor"
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/profile/${post.autor._id}`);
          }}
        >
          @{post.autor.username}
        </span>
        <span className="postFecha">
          {new Date(post.createdAt).toLocaleDateString("es-ES", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </span>
      </div>
      <p className="postContenido">{post.contenido}</p>
      <div className="postActions" onClick={(e) => e.stopPropagation()}>
        <button className="actionBtn" onClick={() => onLike(post._id)}>
          ❤️ {post.likes.length}
        </button>
        <button className="actionBtn" onClick={() => onRetweet(post._id)}>
          🔁 {post.retweets.length}
        </button>
      </div>
    </div>
  );
};
