import React, { memo, useMemo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";

/* ============================
   MESSAGE ITEM (MÉMOÏSÉ)
   Ultra performant : aucun re-render inutile
============================ */
const MessageItem = memo(function MessageItem({ msg }) {

  // Plugins Markdown stabilisés (useMemo)
  const markdownPlugins = useMemo(() => [remarkGfm, remarkBreaks], []);

  return (
    <div className={`chat-message msg-appear ${msg.from === "user" ? "user" : "ia"}`}>
      
      <div className="bubble">

        {/* STREAMING TOKEN-BY-TOKEN */}
        {Array.isArray(msg.tokens) && msg.tokens.length > 0 && (
          <span className="streaming-token-container">
            {msg.tokens.map((token, i) => (
              <span key={i} className="streaming-token">{token}</span>
            ))}
          </span>
        )}

        {/* TEXTE FINAL MARKDOWN */}
        {msg.text && (
          <ReactMarkdown
            remarkPlugins={markdownPlugins}
            components={{
              p: ({ children }) => <p className="md-p">{children}</p>,
              ul: ({ children }) => <ul className="md-ul">{children}</ul>,
              ol: ({ children }) => <ol className="md-ol">{children}</ol>,
              li: ({ children }) => <li className="md-li">{children}</li>,
              h1: ({ children }) => <h1 className="md-h1">{children}</h1>,
              h2: ({ children }) => <h2 className="md-h2">{children}</h2>,
              h3: ({ children }) => <h3 className="md-h3">{children}</h3>,
              code: ({ children }) => <code className="md-code">{children}</code>,
              pre: ({ children }) => <pre className="md-pre">{children}</pre>,
            }}
          >
            {msg.text}
          </ReactMarkdown>
        )}

      </div>

      {msg.from === "ia" && (
        <div className="avatar ia-avatar right-avatar"></div>
      )}
    </div>
  );
});

/* ============================
   MESSAGES CHAT (MÉMOÏSÉ)
   Ultra performant : liste stable
============================ */
function MessagesChat({ messages, isTyping, chatRef }) {
  return (
    <div className="chat-messages" ref={chatRef}>

      {/* TYPING INDICATOR */}
      {isTyping && (
        <div className="chat-message ia msg-appear">
          <div className="typing-bubble">
            <span></span><span></span><span></span>
          </div>
          <div className="avatar ia-avatar right-avatar"></div>
        </div>
      )}

      {/* LISTE DES MESSAGES */}
      {messages.map((msg) => (
        <MessageItem key={msg.id} msg={msg} />
      ))}

    </div>
  );
}

export default memo(MessagesChat);
