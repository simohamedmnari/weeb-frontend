import React, { useEffect, useState, useCallback } from "react";
import "../../styles/MenuGauche.css";
import { getArticles, updateArticle, deleteArticle } from "@/api/articles";

function MenuGauche({ onStartNewArticle, onSelectArticle, onOpenInvite, onExposeRefresh }) {
  const [articles, setArticles] = useState([]);

  /* ============================
     CHARGEMENT INITIAL
     (Cycle de vie : MONTAGE + DÉMONTAGE)
  ============================ */
  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        const res = await getArticles();
        if (mounted) setArticles(res.data);
      } catch (err) {
        console.error("Erreur chargement articles :", err);
      }
    };

    load();
    return () => {
      mounted = false;
    };
  }, []);

  /* ============================
     RAFRAICHIR LA LISTE
     (handler stabilisé)
  ============================ */
  const refreshArticles = useCallback(async () => {
    try {
      const res = await getArticles();
      setArticles(res.data);
    } catch (err) {
      console.error("Erreur refresh articles :", err);
    }
  }, []);

  /* ============================
     EXPOSE refreshArticles AU PARENT
     (useEffect propre)
  ============================ */
  useEffect(() => {
    if (onExposeRefresh) {
      onExposeRefresh(refreshArticles);
    }
  }, [onExposeRefresh, refreshArticles]);

  /* ============================
     RENOMMER
     (handler stabilisé)
  ============================ */
  const rename = useCallback(async (article) => {
    const t = window.prompt("Nouveau titre :", article.title);
    if (!t) return;

    await updateArticle(article.id, { title: t });

    const res = await getArticles();
    setArticles(res.data);
  }, []);

  /* ============================
     SUPPRIMER
     (handler stabilisé)
  ============================ */
  const remove = useCallback(async (article) => {
    if (!window.confirm("Supprimer cet article ?")) return;

    await deleteArticle(article.id);

    const res = await getArticles();
    setArticles(res.data);
  }, []);

  /* ============================
     MENU 3 POINTS
     (handler stabilisé)
  ============================ */
  const dots = useCallback(
    (article) => {
      const c = window.prompt("1 = Renommer\n2 = Supprimer");
      if (c === "1") rename(article);
      if (c === "2") remove(article);
    },
    [rename, remove]
  );

  /* ============================
     INVITATION
     (handler stabilisé)
  ============================ */
  const handleInvite = useCallback(() => {
    onOpenInvite && onOpenInvite();
  }, [onOpenInvite]);

  /* ============================
     RENDER (PROTÉGÉ PAR React.memo)
  ============================ */
  return (
    <aside className="copilot-menu">
      <div className="weeb-logo" onClick={() => (window.location.href = "/")}>
        weeb
      </div>

      <div className="menu-section-title">Création</div>

      <div
        className="menu-item-minimal create-article-btn"
        onClick={onStartNewArticle}
      >
        Créer un article +
      </div>

      <div className="articles-list-simple">
        {articles.map((a) => (
          <div key={a.id} className="article-row-simple">
            <div
              className="article-title-simple"
              onClick={() => onSelectArticle(a)}
            >
              {a.title}
            </div>

            <button className="dots-btn" onClick={() => dots(a)}>
              ⋮
            </button>
          </div>
        ))}
      </div>

      <div className="menu-bottom">
        <div className="menu-item-minimal invite-btn" onClick={handleInvite}>
          Inviter une personne
        </div>
      </div>
    </aside>
  );
}

export default React.memo(MenuGauche);
