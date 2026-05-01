"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Post } from "@/types";
import { getPostById, likePost, retweetPost, createComment } from "@/lib/api/posts";
// @ts-ignore
import "./page.css";

const PostDetail = () => {
  const { id } = useParams();
  const router = useRouter();

  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [comentario, setComentario] = useState("");
  const [posting, setPosting] = useState(false);

  useEffect(() => {
    getPostById(String(id))
      .then((data) => setPost(data))
      .catch(() => setError("Error cargando el post"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleLike = async () => {
    if (!post) return;
    try {
      const updated = await likePost(post._id);
      setPost(updated);
    } catch (e) {}
  };

  const handleRetweet = async () => {
    if (!post) return;
    try {
      const updated = await retweetPost(post._id);
      setPost(updated);
    } catch (e) {}
  };

  const handleComment = async () => {
    if (!post || !comentario.trim()) return;
    try {
      setPosting(true);
      const updated = await createComment(post._id, comentario);
      setPost(updated);
      setComentario("");
    } catch (e) {}
    finally {
      setPosting(false);
    }
  };

  if (loading) return <p className="estadoMsg">Cargando...</p>;
  if (error) return <p className="estadoMsg">{error}</p>;
  if (!post) return null;

  return (
    <div className="detalleContainer">

      <button className="botonVolver" onClick={() => router.back()}>
        ← Volver
      </button>

      <div className="postPrincipal">
        <div className="postHeader">
          <span className="postAuthor" onClick={() => router.push(`/profile/${post.autor._id}`)}>
            @{post.autor.username}
          </span>
          <span className="postFecha">
            {new Date(post.createdAt).toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" })}
          </span>
        </div>
        <p className="postContenido">{post.contenido}</p>
        <div className="postActions">
          <button className="actionBtn" onClick={handleLike}>❤️ {post.likes.length}</button>
          <button className="actionBtn" onClick={handleRetweet}>🔁 {post.retweets.length}</button>
        </div>
      </div>

      <div className="commentForm">
        <textarea
          placeholder="Escribe un comentario..."
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
          className="commentTextarea"
          rows={3}
        />
        <button className="commentBtn" onClick={handleComment} disabled={posting || !comentario.trim()}>
          {posting ? "Enviando..." : "Comentar"}
        </button>
      </div>

      <div className="commentsList">
        <h3 className="commentsTitle">Comentarios ({post.comentarios.length})</h3>
        {post.comentarios.length === 0 && (
          <p className="noComments">Sé el primero en comentar</p>
        )}
        {post.comentarios.map((c: any) => (
          <div key={c._id} className="commentCard">
            <div className="commentHeader">
              <span className="commentAuthor" onClick={() => router.push(`/profile/${c.autor._id}`)}>
                @{c.autor.username}
              </span>
              <span className="commentFecha">
                {new Date(c.fecha).toLocaleDateString("es-ES")}
              </span>
            </div>
            <p className="commentContenido">{c.contenido}</p>
          </div>
        ))}
      </div>

    </div>
  );
};

export default PostDetail;