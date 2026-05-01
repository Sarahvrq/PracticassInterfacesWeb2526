"use client";

import { useRouter } from "next/navigation";
// @ts-ignore
import "./Header.css";

export const Header = () => {
  const router = useRouter();

  const getUserId = () => {
    if (typeof window === "undefined") return null;
    return document.cookie
      .split("; ")
      .find((row) => row.startsWith("userId="))
      ?.split("=")[1];
  };

  const handleLogout = () => {
    document.cookie = "token=; path=/; max-age=0";
    document.cookie = "userId=; path=/; max-age=0";
    document.cookie = "username=; path=/; max-age=0";
    router.push("/login");
  };

  return (
    <header className="header">
      <div className="headerLogo" onClick={() => router.push("/")}>
        <div className="headerLogoCircle">N</div>
        <span>Nebrija<strong>Social</strong></span>
      </div>
      <div className="headerActions">
        <button className="headerBtn" onClick={() => router.push("/")}>
          🏠
        </button>
        <button className="headerBtn" onClick={() => {
          const id = getUserId();
          if (id) router.push(`/profile/${id}`);
        }}>
          👤
        </button>
        <button className="headerBtn" onClick={handleLogout}>
          🚪
        </button>
      </div>
    </header>
  );
};