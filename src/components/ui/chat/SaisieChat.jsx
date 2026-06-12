import React, { useState, useCallback } from "react";

function SaisieChat({ input, setInput, sendMessage }) {
  const [isSending, setIsSending] = useState(false);

  /* ============================
     HANDLERS STABILISÉS
     (évite re-renders inutiles)
  ============================ */

  const handleInputChange = useCallback(
    (e) => setInput(e.target.value),
    [setInput]
  );

  const handleSend = useCallback(async () => {
    if (!input.trim() || isSending) return;

    setIsSending(true);

    try {
      await sendMessage(input);
      setInput(""); // vider l’input après envoi
    } finally {
      setIsSending(false);
    }
  }, [input, isSending, sendMessage, setInput]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend]
  );

  /* ============================
     RENDER (PROTÉGÉ PAR React.memo)
  ============================ */
  return (
    <div className="chat-input">

      <input
        type="text"
        placeholder="Décris ton projet ou pose une question…"
        value={input}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />

      <div
        className={`send-arrow ${isSending ? "sending" : ""}`}
        onClick={handleSend}
      >
        {isSending ? "…" : "➤"}
      </div>

    </div>
  );
}

export default React.memo(SaisieChat);
