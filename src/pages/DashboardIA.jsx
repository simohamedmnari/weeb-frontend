import React, { useState, useContext, useCallback } from "react";
import UserContext from "../context/UserContextBase";

// CSS DESIGN
import "../styles/DashboardIA.css";

// UI
import MenuGauche from "../components/ui/MenuGauche";
import InviteModal from "../components/ui/InviteModal";

// MÉTIER
import ArticlesManager from "../components/articles/ArticlesManager";
import AssistantIA from "../components/assistant/AssistantIA";

function DashboardIA() {
  const { user } = useContext(UserContext);
  const isVisitor = !user;

  /* ============================
     INVITATION
  ============================ */
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteForm, setInviteForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: ""
  });

  /* ============================
     CHAT IA
  ============================ */
  const [messages, setMessages] = useState([]);

  const handleMessagesLoaded = useCallback((msgs) => {
    setMessages(msgs);
  }, []);

  const handleResetChat = useCallback((text) => {
    setMessages([
      {
        id: crypto.randomUUID(),
        from: "ia",
        text
      }
    ]);
  }, []);

  /* ============================
     REFRESH ARTICLES
  ============================ */
  const [refreshArticlesFn, setRefreshArticlesFn] = useState(null);

  const handleExposeRefresh = useCallback((fn) => {
    setRefreshArticlesFn(() => fn);
  }, []);

  const handleSavedArticle = useCallback(() => {
    refreshArticlesFn && refreshArticlesFn();
  }, [refreshArticlesFn]);

  /* ============================
     HANDLERS MENU ↔ ARTICLES
  ============================ */
  const [menuHandlers, setMenuHandlers] = useState({
    openExisting: null,
    openCreate: null
  });

  const handleSelectArticleFromMenu = useCallback((openExisting, openCreate) => {
    setMenuHandlers({
      openExisting,
      openCreate
    });
  }, []);

  /* ============================
     RENDER — LAYOUT IA GLOBAL
  ============================ */
  return (
    <div className="layout-ia">
      <div className="main-ia">

        <div className="copilot-layout">

          {/* MENU GAUCHE */}
          <MenuGauche
            user={user}
            getInitials={(f, l) =>
              `${f?.charAt(0)?.toUpperCase() || ""}${l?.charAt(0)?.toUpperCase() || ""}`
            }
            onStartNewArticle={menuHandlers.openCreate}
            onSelectArticle={menuHandlers.openExisting}
            onOpenInvite={() => setShowInviteModal(true)}
            onExposeRefresh={handleExposeRefresh}
          />

          {/* ZONE CENTRALE */}
          <div className="contenu-projet">
            <div className="copilot-chat">

              <div className="chat-header">
                <div className="header-left">
                  <h2>Assistant IA</h2>
                  <p>Ton assistant IA pour t’aider à rédiger tes articles.</p>
                </div>
              </div>

              <AssistantIA
                messages={messages}
                setMessages={setMessages}
                onStartNewArticle={menuHandlers.openCreate}
              />

            </div>
          </div>

          {/* ARTICLES (CRUD) */}
          <ArticlesManager
            isVisitor={isVisitor}
            onMessagesLoaded={handleMessagesLoaded}
            onResetChat={handleResetChat}
            onSelectArticleFromMenu={handleSelectArticleFromMenu}
            onSaved={handleSavedArticle}
          />

          {/* INVITATION */}
          {showInviteModal && (
            <InviteModal
              inviteForm={inviteForm}
              setInviteForm={setInviteForm}
              sendInvite={() => setShowInviteModal(false)}
              onClose={() => setShowInviteModal(false)}
            />
          )}

        </div>
      </div>
    </div>
  );
}

export default React.memo(DashboardIA);
