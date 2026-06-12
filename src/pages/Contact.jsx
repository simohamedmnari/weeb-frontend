import "../styles/Contact.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";

import { sendContact, createPrediction } from "../api/contact";
import { analyzeMessage } from "../api/analyze";

export default function Contact() {
  const navigate = useNavigate();

  /* ============================================================
     STATE STABLE
  ============================================================ */
  const [form, setForm] = useState({
    nom: "",
    prenom: "",
    adresse: "",
    email: "",
    message: ""
  });

  /* ============================================================
     MONTAGE : chargement localStorage
  ============================================================ */
  useEffect(() => {
    const saved = localStorage.getItem("contact_message");
    if (!saved) return;

    const loadSavedForm = () => {
      try {
        const data = JSON.parse(saved);

        setForm({
          nom: data.nom || "",
          prenom: data.prenom || "",
          adresse: data.adresse || "",
          email: data.email || "",
          message: data.message || ""
        });
      } catch (e) {
        console.error("Erreur parsing contact_message", e);
      }
    };

    loadSavedForm();
  }, []);

  /* ============================================================
     HANDLER STABILISÉ
  ============================================================ */
  const handleChange = useCallback((field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  }, []);

  /* ============================================================
     SUBMIT STABILISÉ
  ============================================================ */
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

      if (!isLoggedIn) {
        localStorage.setItem("contact_message", JSON.stringify(form));
        navigate("/login");
        return;
      }

      try {
        /* -----------------------------------------
           1) Envoi du message contact
        ----------------------------------------- */
        const resContact = await sendContact({
          first_name: form.prenom,
          last_name: form.nom,
          address: form.adresse,
          email: form.email,
          message: form.message,
          consent: true
        });

        const contactId = resContact.id;

        /* -----------------------------------------
           2) Analyse NLP simple
        ----------------------------------------- */
        await analyzeMessage(form.message);

        /* -----------------------------------------
           3) Prédiction ML — backend uniquement
              (on n’envoie plus prediction/confidence)
        ----------------------------------------- */
        await createPrediction({
          contact: contactId
        });

        alert("Message envoyé + analyse ML enregistrée !");
      } catch (err) {
        console.error(err);
        alert("Erreur lors de l'envoi du message.");
      }

      /* -----------------------------------------
         4) Reset propre
      ----------------------------------------- */
      localStorage.removeItem("contact_message");
      setForm({
        nom: "",
        prenom: "",
        adresse: "",
        email: "",
        message: ""
      });
    },
    [form, navigate]
  );

  /* ============================================================
     RENDER
  ============================================================ */
  return (
    <div className="contact-page">
      <div className="contact-header">
        <h1 className="contact-title">Votre avis compte !</h1>
        <p className="contact-subtitle">
          Votre retour est essentiel pour nous améliorer !
        </p>
      </div>

      <div className="contact-form-box">
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group underline">
              <label>Nom</label>
              <input
                type="text"
                value={form.nom}
                onChange={(e) => handleChange("nom", e.target.value)}
              />
            </div>

            <div className="form-group underline">
              <label>Prénom</label>
              <input
                type="text"
                value={form.prenom}
                onChange={(e) => handleChange("prenom", e.target.value)}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group boxed">
              <label>Adresse</label>
              <input
                type="text"
                value={form.adresse}
                onChange={(e) => handleChange("adresse", e.target.value)}
              />
            </div>

            <div className="form-group boxed">
              <label>Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
            </div>
          </div>

          <div className="form-group underline full-width">
            <label>Message</label>
            <textarea
              value={form.message}
              onChange={(e) => handleChange("message", e.target.value)}
            ></textarea>
          </div>

          <div className="form-footer">
            <button type="submit" className="contact-btn">
              Envoyer
            </button>

            <div className="radio-wrapper">
              <input type="checkbox" className="radio-input" />
              <span className="radio-custom"></span>

              <span className="radio-text">
                J’accepte le traitement de mes données.
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
