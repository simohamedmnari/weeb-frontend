import React, { useState, useCallback } from "react";
import "@/styles/ModalArticlesList.css";

function ModalArticlesList({
  onClose,
  articles,
  onSelectArticle,
  onRenameArticle,
  onDeleteArticle,
  onCreateArticle
}) {
  const [renameId, setRenameId] = useState(null);
  const [renameValue, setRenameValue] = useState("");

  /* ============================
     HANDLERS STABILISÉS
     (évite re-renders inutiles)
  ============================ */

  const handleClose = useCallback(() => {
    onClose && onClose();
  }, [onClose]);

  const handleCreate = useCallback(() => {
    onCreateArticle && onCreateArticle();
  }, [onCreateArticle]);

  const handleSelect = useCallback(
    (article) => {
      onSelectArticle && onSelectArticle(article);
    },
    [onSelectArticle]
  );

  const handleDelete = useCallback(
    (id) => {
      onDeleteArticle && onDeleteArticle(id);
    },
    [onDeleteArticle]
  );

  const handleRenameStart = useCallback((article) => {
    setRenameId(article.id);
    setRenameValue(article.title);
  }, []);

  const handleRenameChange = useCallback((e) => {
    setRenameValue(e.target.value);
  }, []);

  const handleRenameCommit = useCallback(
    (articleId) => {
      onRenameArticle(articleId, renameValue);
      setRenameId(null);
    },
    [renameValue, onRenameArticle]
  );

  const handleRenameCancel = useCallback(() => {
    setRenameId(null);
  }, []);

  const handleRenameBlur = useCallback(
    (articleId) => {
      handleRenameCommit(articleId);
    },
    [handleRenameCommit]
  );

  const handleRenameKeyDown = useCallback(
    (e, articleId) => {
      if (e.key === "Enter") {
        handleRenameCommit(articleId);
      }
      if (e.key === "Escape") {
        handleRenameCancel();
      }
    },
    [handleRenameCommit, handleRenameCancel]
  );

  /* ============================
     RENDER (PROTÉGÉ PAR React.memo)
  ============================ */
  return (
    <div className="modal-overlay">
      <div className="modal-container">

        {/* HEADER */}
        <div className="modal-header">
          <h2>Mes articles</h2>
          <button className="close-btn" onClick={handleClose}>✕</button>
        </div>

        {/* BOUTON CREATION */}
        <div className="create-container">
          <button className="btn-create" onClick={handleCreate}>
            + Nouvel article
          </button>
        </div>

        {/* LISTE */}
        <div className="articles-list">
          {articles.length === 0 && (
            <p className="empty-text">Aucun article pour le moment.</p>
          )}

          {articles.map((article) => (
            <div key={article.id} className="article-row">

              {/* RENOMMAGE INLINE */}
              {renameId === article.id ? (
                <input
                  className="rename-input"
                  value={renameValue}
                  autoFocus
                  onChange={handleRenameChange}
                  onBlur={() => handleRenameBlur(article.id)}
                  onKeyDown={(e) => handleRenameKeyDown(e, article.id)}
                />
              ) : (
                <div
                  className="article-title"
                  onClick={() => handleSelect(article)}
                >
                  {article.title}
                </div>
              )}

              {/* ACTIONS */}
              <div className="actions">
                <button
                  className="action-btn"
                  onClick={() => handleRenameStart(article)}
                >
                  Renommer
                </button>

                <button
                  className="action-btn delete"
                  onClick={() => handleDelete(article.id)}
                >
                  Supprimer
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default React.memo(ModalArticlesList);
