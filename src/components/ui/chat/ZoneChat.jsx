import React, { useCallback, useRef, useEffect } from "react";
import "../../../styles/Chat.css";


function ZoneChat({
  messages,
  isTyping,
  chatRef,
  input,
  setInput,
  sendMessage,
  renderMessageText,
  onStartNewArticle
}) {

  /* ============================
     TEXTAREA AUTO-EXPAND (STABLE)
  ============================ */
  const textareaRef = useRef(null);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;

    el.style.height = "auto";
    el.style.height = el.scrollHeight + "px";
  }, [input]);

  /* ============================
     HANDLERS STABILISÉS
  ============================ */

  const handleInputChange = useCallback(
    (e) => {
      setInput(e.target.value);
    },
    [setInput]
  );

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();

        // Sécurisation : empêcher l’envoi vide
        if (!input || !input.trim()) return;

        // Envoi garanti d’une string
        sendMessage(String(input));
      }
    },
    [sendMessage, input]
  );

  const handleSend = useCallback(
    () => {
      // Sécurisation : empêcher l’envoi vide
      if (!input || !input.trim()) return;

      // Envoi garanti d’une string
      sendMessage(String(input));
    },
    [sendMessage, input]
  );

  const handleStartArticle = useCallback(
    () => onStartNewArticle && onStartNewArticle(),
    [onStartNewArticle]
  );

  /* ============================
     RENDER (PROTÉGÉ PAR React.memo)
  ============================ */
  return (
    <>
      {/* MESSAGES */}
      <div className="chat-messages" ref={chatRef}>
        {messages.map((msg) => (
          <div key={msg.id} className={`chat-message ${msg.from} msg-appear`}>
            {msg.from === "ia" && <div className="avatar ia-avatar" />}

            <div className="bubble">
              {renderMessageText ? renderMessageText(msg.text) : msg.text}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="chat-message ia">
            <div className="avatar ia-avatar" />
            <div className="typing-bubble">
              <span></span><span></span><span></span>
            </div>
          </div>
        )}
      </div>

      {/* INPUT */}
      <div className="chat-input">
        <div className="chat-input-inner">

          {/* BOUTON + */}
          <div className="plus-btn" onClick={handleStartArticle}>
            +
          </div>

          {/* TEXTAREA */}
          <textarea
            ref={textareaRef}
            placeholder="Décris ton projet ou pose une question…"
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            rows={1}
          />

          {/* ENVOYER */}
          <div className="send-arrow" onClick={handleSend}>
            ➤
          </div>

        </div>
      </div>
    </>
  );
}

export default React.memo(ZoneChat);
