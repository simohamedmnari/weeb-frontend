import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";

function BarreHaut() {
  const navigate = useNavigate();

  /* ============================
     HANDLER STABILISÉ
     (évite re-renders inutiles)
  ============================ */
  const handleReturnToChat = useCallback(() => {
    const id = localStorage.getItem("currentArticleId");

    if (id) {
      navigate(`/membre/projets/${id}`);
    } else {
      navigate("/membre/projets/1");
    }
  }, [navigate]);

  /* ============================
     RENDER (PROTÉGÉ PAR React.memo)
  ============================ */
  return (
    <div className="chat-header">

      {/* Zone gauche — Retour au tableau de bord */}
      <div
        className="header-left"
        onClick={handleReturnToChat}
        style={{ cursor: "pointer" }}
      >
        <h2>Assistant IA</h2>
        <p>Ton assistant IA pour t’aider à rédiger tes articles.</p>
      </div>

      {/* Zone centrale */}
      <div className="header-center"></div>

      {/* Zone droite */}
      <div className="header-right"></div>

    </div>
  );
}

export default React.memo(BarreHaut);
