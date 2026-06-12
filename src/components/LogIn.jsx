import React, { useState, useContext, useEffect, useRef } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import api from "../api/axiosInstance";
import UserContext from "../context/UserContextBase";
import "../styles/login.css";

export default function LogIn() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser, isLoggedIn } = useContext(UserContext);

  const emailRef = useRef(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  /* ============================================
     REDIRECTION SI DÉJÀ CONNECTÉ
     (corrigé : useLocation → FINI les redirections fantômes)
  ============================================ */
  useEffect(() => {
    if (!isLoggedIn) return;

    // Empêche la redirection automatique depuis la page Contact
    if (location.pathname === "/contact") return;

    const id = localStorage.getItem("currentArticleId") || 1;
    navigate(`/membre/projets/${id}`, { replace: true });

  }, [isLoggedIn, navigate, location.pathname]);

  /* ============================================
     FOCUS AUTOMATIQUE SUR L’EMAIL
  ============================================ */
  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  /* ============================================
     SUBMIT LOGIN
  ============================================ */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    if (!cleanEmail) return setError("Veuillez entrer votre email.");
    if (!cleanPassword) return setError("Veuillez entrer votre mot de passe.");

    setLoading(true);

    try {
      // LOGIN
      const res = await api.post("/auth/login/", {
        email: cleanEmail,
        password: cleanPassword,
      });

      const { access } = res.data;
      localStorage.setItem("access", access);
      localStorage.setItem("isLoggedIn", "true"); // ✔ déjà corrigé, on garde

      // RÉCUPÉRATION USER
      const meRes = await api.get("/auth/me/");
      setUser(meRes.data);

      // REDIRECTION IA
      const id = localStorage.getItem("currentArticleId") || 1;
      navigate(`/membre/projets/${id}`, { replace: true });

    } catch (err) {
      console.error("Erreur login:", err);

      if (err.response?.status === 400) setError("Email et mot de passe requis.");
      else if (err.response?.status === 401) setError("Identifiants incorrects.");
      else setError("Erreur serveur. Réessayez plus tard.");

    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-wrapper">
      <section className="login-figma-box">
        <div className="login-inner-box">

          <h2 className="login-figma-title">Se connecter</h2>

          {error && (
            <p className="login-error">{error}</p>
          )}

          <form className="login-figma-form" onSubmit={handleSubmit}>

            {/* EMAIL */}
            <div className="login-field">
              <label htmlFor="email" className="login-label">Email</label>

              <input
                ref={emailRef}
                type="email"
                id="email"
                className="login-input"
                autoComplete="off"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
              />

              <div className="login-underline"></div>
            </div>

            {/* PASSWORD */}
            <div className="login-field">
              <label htmlFor="password" className="login-label">Mot de passe</label>

              <input
                type="password"
                id="password"
                className="login-input"
                autoComplete="off"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
              />

              <div className="login-underline"></div>
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              className="login-figma-button"
              disabled={loading}
            >
              {loading ? "Connexion..." : "Se connecter"}
            </button>
          </form>

          <Link to="/reset-password" className="login-forgot">
            Mot de passe oublié ?
          </Link>

          <div className="login-create">
            <p>
              Vous n’avez pas de compte ?{" "}
              <Link to="/creer-compte">Créer un compte</Link>
            </p>
          </div>

        </div>
      </section>
    </main>
  );
}
