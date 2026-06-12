import React, { useState, useRef, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { sendToAssistant } from "../../api/assistant";
import ZoneChat from "../ui/chat/ZoneChat";


// Message d’accueil
const WELCOME = {
  id: crypto.randomUUID(),
  from: "ia",
  text:
    "Bonjour 👋 Je suis ton assistant IA. Décris-moi ton idée d’article et je t’aide à la structurer et l’améliorer."
};

function AssistantIA({ messages, setMessages, onStartNewArticle }) {
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const chatRef = useRef(null);

  /* ============================
     SCROLL AUTO
  ============================ */
  const scrollToBottom = useCallback(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    const t = setTimeout(scrollToBottom, 0);
    return () => clearTimeout(t);
  }, [messages, scrollToBottom]);

  /* ============================
     RENDU DES LIENS
  ============================ */
  const renderText = useCallback((text) => {
    const trigger = "cliquez ici pour créer votre compte";

    if (!text.toLowerCase().includes(trigger)) return text;

    const [before, after] = text.split(trigger);

    return (
      <>
        {before}
        <Link to="/creer-compte" className="blink-link">
          créer votre compte
        </Link>
        {after}
      </>
    );
  }, []);

  /* ============================
     ENVOYER UN MESSAGE À L’IA
  ============================ */
  const sendMessage = useCallback(
    async (text) => {
      if (typeof text !== "string") return;
      if (!text.trim()) return;

      // Ajout du message utilisateur
      const userMessage = {
        id: crypto.randomUUID(),
        from: "user",
        text,
      };

      setMessages((prev) => [...prev, userMessage]);
      setIsTyping(true);

      try {
        const reply = await sendToAssistant({ topic: text });

        const iaMessage = {
          id: crypto.randomUUID(),
          from: "ia",
          text: reply?.article || "Je n’ai pas pu générer de réponse."
        };

        setMessages((prev) => [...prev, iaMessage]);

        // Sauvegarde pour "Charger depuis l’IA"
        localStorage.setItem("ia_reply", reply?.article || "");

      } catch (e) {
        console.error("Erreur assistant IA :", e);

        setMessages((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            from: "ia",
            text: "Erreur : impossible de contacter l’IA."
          }
        ]);
      }

      setIsTyping(false);
      setInput(""); // 🔥 input vidé proprement
    },
    [setMessages]
  );

  /* ============================
     RENDER
  ============================ */
  return (
    <ZoneChat
      messages={messages}
      isTyping={isTyping}
      chatRef={chatRef}
      input={input}
      setInput={setInput}
      sendMessage={sendMessage}
      renderMessageText={renderText}
      onStartNewArticle={onStartNewArticle}
    />
  );
}

export default React.memo(AssistantIA);
