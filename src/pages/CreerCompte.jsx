import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosInstance";
import UserContext from "../context/UserContextBase";
import "../styles/register.css";

export default function CreerCompte() {
  const navigate = useNavigate();
  const { setUser, isLoggedIn } = useContext(UserContext);

  const [showWelcome, setShowWelcome] = useState(false);

  // -----------------------------------------
  // REDIRECTION SI DÉJÀ CONNECTÉ
  // -----------------------------------------
  useEffect(() => {
    if (isLoggedIn && !showWelcome) {
      const id = localStorage.getItem("currentArticleId") || 1;
      navigate(`/membre/projets/${id}`, { replace: true });
    }
  }, [isLoggedIn, showWelcome, navigate]);

  // -----------------------------------------
  // RÉCUPÉRATION DES DONNÉES CONTACT (OPTIONNEL)
  // -----------------------------------------
  const detectedTag = localStorage.getItem("selectedTag") || "";

  let contactData = {};
  const savedMessage = localStorage.getItem("contact_message");

  if (savedMessage) {
    try {
      contactData = JSON.parse(savedMessage);
    } catch (e) {
      console.error("Erreur parsing contact_message", e);
    }
  }

  // -----------------------------------------
  // FORMULAIRE
  // -----------------------------------------
  const [formData, setFormData] = useState({
    nom: contactData.nom || "",
    prenom: contactData.prenom || "",
    email: contactData.email || "",
    telephone: "",
    password: "",
    confirmPassword: "",
    rgpd: false,
    theme: detectedTag,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // -----------------------------------------
  // HANDLE CHANGE
  // -----------------------------------------
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  // -----------------------------------------
  // SUBMIT FORMULAIRE
  // -----------------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {};

    const nom = formData.nom.trim();
    const prenom = formData.prenom.trim();
    const email = formData.email.trim().toLowerCase();
    const telephone = formData.telephone.replace(/\s/g, "");
    const password = formData.password;
    const confirmPassword = formData.confirmPassword;

    // VALIDATIONS
    if (!nom) newErrors.nom = "Champ obligatoire";
    if (!prenom) newErrors.prenom = "Champ obligatoire";

    if (!email) {
      newErrors.email = "Champ obligatoire";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Format email invalide";
    }

    if (!telephone) {
      newErrors.telephone = "Champ obligatoire";
    } else if (!/^\d{10}$/.test(telephone)) {
      newErrors.telephone = "Numéro invalide (10 chiffres)";
    }

    if (password.length < 8 || password.length > 10) {
      newErrors.password = "Le mot de passe doit contenir entre 8 et 10 caractères.";
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Les mots de passe ne correspondent pas";
    }

    if (!formData.rgpd) {
      newErrors.rgpd = "Vous devez accepter les conditions";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    // -----------------------------------------
    // REQUÊTE BACKEND
    // -----------------------------------------
    setLoading(true);

    try {
      const res = await api.post("/auth/register/", {
        email,
        password,
        password2: confirmPassword,
        first_name: prenom,
        last_name: nom,
        phone: telephone,
        theme: formData.theme || "general",
      });

      const { access } = res.data;

      // Stockage token
      localStorage.setItem("access", access);

      // Récupération du user
      const me = await api.get("/auth/me/");
      setUser(me.data);

      // Nettoyage contact
      localStorage.removeItem("contact_message");

      // Affichage modal bienvenue
      setShowWelcome(true);

    } catch (err) {
      console.error("Erreur backend:", err.response?.data || err);

      let backendErrors = {};

      if (err.response?.data) {
        const data = err.response.data;

        const normalize = (field) =>
          Array.isArray(field) ? field.join(" ") : field;

        if (data.email) backendErrors.email = normalize(data.email);
        if (data.first_name) backendErrors.prenom = normalize(data.first_name);
        if (data.last_name) backendErrors.nom = normalize(data.last_name);
        if (data.phone) backendErrors.telephone = normalize(data.phone);
        if (data.password) backendErrors.password = normalize(data.password);
        if (data.non_field_errors)
          backendErrors.global = normalize(data.non_field_errors);

        setErrors(backendErrors);
      } else {
        setErrors({ global: "Erreur serveur. Réessayez plus tard." });
      }
    } finally {
      setLoading(false);
    }
  };

  // -----------------------------------------
  // REDIRECTION APRÈS MODAL BIENVENUE
  // -----------------------------------------
  const closeModalAndRedirect = () => {
    setShowWelcome(false);

    setTimeout(() => {
      const id = localStorage.getItem("currentArticleId") || 1;
      navigate(`/membre/projets/${id}`);
    }, 80);
  };

  // -----------------------------------------
  // RENDER
  // -----------------------------------------
  return (
    <div className="register-page">
      {showWelcome && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h2 className="modal-title">Bienvenue dans votre espace IA</h2>

            <p className="modal-text">
              Votre inscription est confirmée ! Votre espace personnel est maintenant activé.
              Vous pouvez commencer à décrire votre projet IA afin que l’assistant puisse
              analyser vos besoins et vous proposer un plan personnalisé.
            </p>

            <button
              onClick={closeModalAndRedirect}
              className="modal-close-btn"
            >
              Décrire mon projet IA
            </button>
          </div>
        </div>
      )}

      <div className="register-header">
        <h1>
          Votre <span className="register-highlight">espace</span> dédié vous attend
          <span style={{ color: "#9333EA" }}>!</span>
        </h1>

        <p>Créez votre compte gratuitement pour accéder à votre espace IA personnalisé.</p>

        {detectedTag && (
          <p className="detected-tag">Thématique détectée : {detectedTag}</p>
        )}
      </div>

      <form className="register-form" onSubmit={handleSubmit}>
        {errors.global && <p className="error">{errors.global}</p>}

        <div className="form-group">
          <label>Nom</label>
          <input
            type="text"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            placeholder="Votre nom"
            className="register-input"
          />
          {errors.nom && <span className="error">{errors.nom}</span>}
        </div>

        <div className="form-group">
          <label>Prénom</label>
          <input
            type="text"
            name="prenom"
            value={formData.prenom}
            onChange={handleChange}
            placeholder="Votre prénom"
            className="register-input"
          />
          {errors.prenom && <span className="error">{errors.prenom}</span>}
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="exemple@mail.com"
            className="register-input"
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label>Téléphone</label>
          <input
            type="text"
            name="telephone"
            value={formData.telephone}
            onChange={handleChange}
            placeholder="06 00 00 00 00"
            className="register-input"
          />
          {errors.telephone && <span className="error">{errors.telephone}</span>}
        </div>

        <input type="hidden" name="theme" value={formData.theme} />

        <div className="form-group">
          <label>Mot de passe (8 à 10 caractères)</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Votre mot de passe"
            className="register-input"
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>

        <div className="form-group">
          <label>Confirmer le mot de passe</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirmez"
            className="register-input"
          />
          {errors.confirmPassword && (
            <span className="error">{errors.confirmPassword}</span>
          )}
        </div>

        <div className="form-checkbox">
          <input
            type="checkbox"
            name="rgpd"
            checked={formData.rgpd}
            onChange={handleChange}
          />
          <label>
            J’accepte les conditions d’utilisation et la politique de confidentialité.
          </label>
        </div>
        {errors.rgpd && <span className="error">{errors.rgpd}</span>}

        <button
          type="submit"
          className="btn-primary register-btn"
          disabled={loading}
        >
          {loading ? "Création..." : "Créer mon compte"}
        </button>
      </form>
    </div>
  );
}
