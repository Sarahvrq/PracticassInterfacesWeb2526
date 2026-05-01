"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { User, Post } from "@/types";
import { getUserProfile, toggleFollow } from "@/lib/api/users";
import { PostCard } from "@/components/Post/Post";
import { likePost, retweetPost } from "@/lib/api/posts";
// @ts-ignore
import "./page.css";

const ProfilePage = () => {
  const { username } = useParams();
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [siguiendo, setSiguiendo] = useState(false);
  const [isMe, setIsMe] = useState(false);

  useEffect(() => {
    if (!username) return;
    getUserProfile(String(username))
      .then((data) => {
        setUser(data.user);
        setPosts(data.posts ?? []);
        setSiguiendo(data.siguiendo ?? false);
        try {
          const myUsername = document.cookie
            .split("; ")
            .find((row) => row.startsWith("username="))
            ?.split("=")[1];
          setIsMe(myUsername === data.user.username);
        } catch (e) {}
      })
      .catch((e) => {
        console.error("Profile error:", e);
        setError("Error cargando el perfil");
      })
      .finally(() => setLoading(false));
  }, [username]);

  const handleFollow = async () => {
    if (!user) return;
    try {
      const data = await toggleFollow(user._id);
      setSiguiendo(data.siguiendo);
    } catch (e) {}
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

  if (loading) return <p className="estadoMsg">Cargando perfil...</p>;
  if (error) return <p className="estadoMsg">{error}</p>;
  if (!user) return null;

  return (
    <div className="profileContainer">
      <div className="profileCard">
        <button className="botonVolver" onClick={() => router.back()}>
          ← Volver
        </button>
        <div className="profileAvatar">
          {user.username.charAt(0).toUpperCase()}
        </div>
        <div className="profileInfo">
          <h2 className="profileUsername">@{user.username}</h2>
          <p className="profileEmail">{user.email}</p>
        </div>
        {!isMe && (
          <button
            className={siguiendo ? "followBtn following" : "followBtn"}
            onClick={handleFollow}
          >
            {siguiendo ? "Dejar de seguir" : "Seguir"}
          </button>
        )}
      </div>

      <h3 className="postsTitle">Posts de @{user.username}</h3>

      <div className="profileFeed">
        {posts.length === 0 && (
          <p className="noPostsMsg">Este usuario no tiene posts aún</p>
        )}
        {posts.map((post) => (
          <PostCard key={post._id} post={post} onLike={handleLike} onRetweet={handleRetweet} />
        ))}
      </div>
    </div>
  );
};

export default ProfilePage;