import React, { useState, useEffect, useCallback } from "react";
import "@/styles/ModalCreateArticle.css";

import {
  getArticle,
  createArticle,
  updateArticle,
  deleteArticle
} from "@/api/articles";

import { improveArticleAPI } from "@/api/assistant";

function ModalCreateArticle({ articleId = null, onClose, onSaved }) {
  const [saving, setSaving] = useState(false);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  /* ============================
     RESET DU MODAL À L’OUVERTURE
     (évite le recyclage de texte)
  ============================ */
  useEffect(() => {
    if (!articleId) {
      setTitle("");
      setContent("");
    }
  }, [articleId]);

  /* ============================
     CHARGER ARTICLE EXISTANT
     (montage + mise à jour)
  ============================ */
  useEffect(() => {
    if (!articleId) return;

    let mounted = true;

    const fetchArticle = async () => {
      try {
        const res = await getArticle(articleId);
        if (!mounted) return;

        const data = res.data;
        setTitle(data.title || "");
        setContent(data.content || "");
      } catch (err) {
        console.error("Erreur chargement article :", err);
      }
    };

    fetchArticle();

    return () => {
      mounted = false;
    };
  }, [articleId]);

  /* ============================
     HANDLERS STABILISÉS
     (évite les re-renders inutiles)
  ============================ */

  const handleTitleChange = useCallback(
    (e) => setTitle(e.target.value),
    []
  );

  const handleContentChange = useCallback(
    (e) => setContent(e.target.value),
    []
  );

  /* ============================
     SAUVEGARDE (CREATE + UPDATE)
     (fonction stable + dépendances propres)
  ============================ */
  const handleSave = useCallback(async () => {
    if (!title.trim()) return;

    setSaving(true);

    try {
      if (articleId) {
        await updateArticle(articleId, { title, content });
      } else {
        await createArticle({ title, content });
      }

      onSaved && onSaved();
      onClose();

    } catch (err) {
      console.error("Erreur sauvegarde article :", err);
    } finally {
      setSaving(false);
    }
  }, [title, content, articleId, onSaved, onClose]);

  /* ============================
     SUPPRESSION
     (fonction stable)
  ============================ */
  const handleDelete = useCallback(async () => {
    if (!articleId) return;
    if (!window.confirm("Supprimer cet article ?")) return;

    try {
      await deleteArticle(articleId);

      onSaved && onSaved();
      onClose();

    } catch (err) {
      console.error("Erreur suppression article :", err);
    }
  }, [articleId, onSaved, onClose]);

  /* ============================
     IA : AMÉLIORER LE TEXTE EXISTANT
     (fonction stable + dépendance content)
  ============================ */
  const handleImproveWithIA = useCallback(async () => {
    if (!content.trim()) return;

    try {
      const reply = await improveArticleAPI({
        content,
        audience: "grand public",
        tone: "neutre",
        length: "moyen",
      });

      const improved =
        reply?.improved ||
        reply?.article ||
        reply?.response ||
        reply?.text ||
        "";

      if (improved) {
        setContent(improved);
      }

    } catch (err) {
      console.error("Erreur amélioration IA :", err);
    }
  }, [content]);

  /* ============================
     IA : GÉNÉRER UN NOUVEL ARTICLE
     (fonction stable + dépendance title)
  ============================ */
  const handleGenerateNewArticle = useCallback(async () => {
    if (!title.trim()) return;

    try {
      // 1. On vide l’ancien texte
      setContent("");

      // 2. On demande un NOUVEL article complet
      const reply = await improveArticleAPI({
        content: `Génère un article complet sur : ${title}`,
        audience: "grand public",
        tone: "neutre",
        length: "moyen",
      });

      const generated =
        reply?.improved ||
        reply?.article ||
        reply?.response ||
        reply?.text ||
        "";

      if (generated) {
        setContent(generated);
      }

    } catch (err) {
      console.error("Erreur génération IA :", err);
    }
  }, [title]);

  /* ============================
     RENDER
  ============================ */
  return (
    <div className="modal-overlay">
      <div className="modal-premium">

        {/* HEADER */}
        <div className="modal-header">
          <h2>{articleId ? "Modifier l’article" : "Créer un article"}</h2>

          <div className="header-actions">
            {articleId && (
              <button className="btn-danger" onClick={handleDelete}>
                Supprimer
              </button>
            )}

            <button className="btn-close" onClick={onClose}>✕</button>
          </div>
        </div>

        {/* BODY */}
        <div className="modal-body">

          <input
            className="modal-input"
            placeholder="Titre de l’article"
            value={title}
            onChange={handleTitleChange}
          />

          <textarea
            className="modal-textarea"
            placeholder="Contenu de l’article…"
            value={content}
            onChange={handleContentChange}
            rows={14}
          />

          <div className="editor-actions">

            <button className="btn-primary" onClick={handleSave} disabled={saving}>
              {saving ? "Enregistrement…" : "Enregistrer"}
            </button>

            <button className="btn-secondary" onClick={handleImproveWithIA}>
              Améliorer avec l’IA
            </button>

            <button className="btn-secondary" onClick={handleGenerateNewArticle}>
              Générer un nouvel article IA
            </button>

          </div>
        </div>

      </div>
    </div>
  );
}

export default React.memo(ModalCreateArticle);
