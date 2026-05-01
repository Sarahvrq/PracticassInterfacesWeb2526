"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login, register } from "@/lib/api/auth";
// @ts-ignore
import "./page.css";

const LoginPage = () => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [regUsername, setRegUsername] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await login(loginEmail, loginPassword);
      document.cookie = `token=${data.token}; path=/`;
      document.cookie = `userId=${data.user._id}; path=/`;
      document.cookie = `username=${data.user.username}; path=/`;
      router.push("/");
    } catch (e: any) {
      setError("Email o contraseña incorrectos");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await register(regUsername, regEmail, regPassword);
      document.cookie = `token=${data.token}; path=/`;
      document.cookie = `userId=${data.user._id}; path=/`;
      document.cookie = `username=${data.user.username}; path=/`;
      router.push("/");
    } catch (e: any) {
      setError("Error al crear la cuenta");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="loginContainer">
      <h1 className="loginTitle">NebrijaSocial</h1>

      <div className="toggleButtons">
        <button
          className={isLogin ? "toggleBtn active" : "toggleBtn"}
          onClick={() => setIsLogin(true)}
        >
          Iniciar sesión
        </button>
        <button
          className={isLogin ? "toggleBtn" : "toggleBtn active"}
          onClick={() => setIsLogin(false)}
        >
          Crear cuenta
        </button>
      </div>

      {error && <p className="errorMsg">{error}</p>}

      {isLogin ? (
        <div className="form">
          <input
            type="email"
            placeholder="Email"
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
          />
          <button
            className="submitBtn"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "Cargando..." : "Entrar"}
          </button>
        </div>
      ) : (
        <div className="form">
          <input
            type="text"
            placeholder="Username"
            value={regUsername}
            onChange={(e) => setRegUsername(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={regEmail}
            onChange={(e) => setRegEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={regPassword}
            onChange={(e) => setRegPassword(e.target.value)}
          />
          <button
            className="submitBtn"
            onClick={handleRegister}
            disabled={loading}
          >
            {loading ? "Cargando..." : "Registrarse"}
          </button>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
