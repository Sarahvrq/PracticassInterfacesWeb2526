"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Post, HomeResponse } from "@/types";
import { getAllPosts, createPost, likePost, retweetPost } from "@/lib/api/posts";
import { PostCard } from "@/components/Post/Post";
// @ts-ignore
import "./page.css";

const Home = () => {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [pagina, setPagina] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [contenido, setContenido] = useState("");
  const [posting, setPosting] = useState(false);

  const fetchPosts = async (page: number) => {
    try {
      setLoading(true);
      const data: HomeResponse = await getAllPosts(page);
      setPosts((prev) => {
        const existingIds = new Set(prev.map((p) => p._id));
        const newPosts = data.posts.filter((p) => !existingIds.has(p._id));
        return [...prev, ...newPosts];
      });
      setPagina(data.pagina);
      setTotalPaginas(data.totalPaginas);
    } catch (e: any) {
      setError("Error cargando los posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];
    if (!token) {
      router.push("/login");
      return;
    }
    fetchPosts(1);
  }, []);

  const handleCreatePost = async () => {
    if (!contenido.trim()) return;
    try {
      setPosting(true);
      const newPost = await createPost(contenido);
      setPosts((prev) => [newPost, ...prev]);
      setContenido("");
    } catch (e: any) {
      setError("Error publicando el post");
    } finally {
      setPosting(false);
    }
  };

  const handleLike = async (id: string) => {
    try {
      const updated = await likePost(id);
      setPosts((prev) => prev.map((p) => (p._id === id ? updated : p)));
    } catch (e) {}
  };

  const handleRetweet = async (id: string) => {
    try {
      const updated = await retweetPost(id);
      setPosts((prev) => prev.map((p) => (p._id === id ? updated : p)));
    } catch (e) {}
  };

  return (
    <div className="mainContainer">
      <h1 className="tituloPrincipal">🏠 Inicio</h1>

      <div className="createPost">
        <textarea
          placeholder="¿Qué está pasando?"
          value={contenido}
          onChange={(e) => setContenido(e.target.value)}
          className="postTextarea"
          rows={3}
          maxLength={280}
        />
        <div className="postFormFooter">
          <span className="charCounter">{contenido.length}/280</span>
          <button
            className="postBtn"
            onClick={handleCreatePost}
            disabled={posting || !contenido.trim()}
          >
            {posting ? "Publicando..." : "Publicar"}
          </button>
        </div>
      </div>

      {error && <p style={{ color: "#e53e3e", textAlign: "center" }}>{error}</p>}

      <div className="feed">
        {posts.map((post) => (
          <PostCard key={post._id} post={post} onLike={handleLike} onRetweet={handleRetweet} />
        ))}
      </div>

      {loading && <p style={{ textAlign: "center", color: "#999" }}>Cargando...</p>}

      {!loading && pagina < totalPaginas && (
        <button className="loadMoreBtn" onClick={() => fetchPosts(pagina + 1)}>
          Cargar más
        </button>
      )}
    </div>
  );
};

export default Home;