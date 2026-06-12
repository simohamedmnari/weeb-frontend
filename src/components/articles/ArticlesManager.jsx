import React, { useState, useCallback, useEffect } from "react";
import { getArticle } from "@/api/articles";

import ModalCreateArticle from "../modals/dashboard/ModalCreateArticle";

function ArticlesManager({
  isVisitor,
  onMessagesLoaded,
  onResetChat,
  onSelectArticleFromMenu,
  onSaved
}) {

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingArticleId, setEditingArticleId] = useState(null);

  /* ============================
     OUVERTURE D’UN ARTICLE EXISTANT
     (handler stabilisé)
  ============================ */
  const handleSelectFromMenu = useCallback(async (article) => {
    if (isVisitor) return;

    try {
      const res = await getArticle(article.id);
      const data = res.data;

      // Message IA dans le chat
      onMessagesLoaded([
        {
          from: "ia",
          text: `Tu travailles sur l’article : ${data.title}`
        }
      ]);

      setEditingArticleId(article.id);
      setShowCreateModal(true);

    } catch (err) {
      console.error("Erreur chargement article :", err);
    }
  }, [isVisitor, onMessagesLoaded]);

  /* ============================
     CRÉATION D’UN NOUVEL ARTICLE
     (handler stabilisé)
  ============================ */
  const handleOpenCreate = useCallback(() => {
    if (isVisitor) {
      onResetChat("Cliquez ici pour créer votre compte");
      return;
    }

    setEditingArticleId(null);
    setShowCreateModal(true);
  }, [isVisitor, onResetChat]);

  /* ============================
     CONNECTER AU MENU GAUCHE
     (useEffect propre, dépendances stables)
  ============================ */
  useEffect(() => {
    if (onSelectArticleFromMenu) {
      onSelectArticleFromMenu(handleSelectFromMenu, handleOpenCreate);
    }
  }, [onSelectArticleFromMenu, handleSelectFromMenu, handleOpenCreate]);

  /* ============================
     RENDER
  ============================ */
  return (
    <>
      {showCreateModal && (
        <ModalCreateArticle
          articleId={editingArticleId}
          onClose={() => setShowCreateModal(false)}
          onSaved={onSaved}   // déclenche refreshArticles() dans DashboardIA
        />
      )}
    </>
  );
}

export default React.memo(ArticlesManager);
