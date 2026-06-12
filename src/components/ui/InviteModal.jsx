import React, { useState, useCallback } from "react";
import "../../styles/InviteModal.css";

function InviteModal({ inviteForm, setInviteForm, onClose }) {
  const [loading, setLoading] = useState(false);

  /* ============================
     HANDLERS STABILISÉS
     (évite re-renders inutiles)
  ============================ */

  const handleChangeLastName = useCallback(
    (e) => setInviteForm((prev) => ({ ...prev, lastName: e.target.value })),
    [setInviteForm]
  );

  const handleChangeFirstName = useCallback(
    (e) => setInviteForm((prev) => ({ ...prev, firstName: e.target.value })),
    [setInviteForm]
  );

  const handleChangeEmail = useCallback(
    (e) => setInviteForm((prev) => ({ ...prev, email: e.target.value })),
    [setInviteForm]
  );

  const handleChangePhone = useCallback(
    (e) => setInviteForm((prev) => ({ ...prev, phone: e.target.value })),
    [setInviteForm]
  );

  const handleSendInvite = useCallback(async () => {
    if (!inviteForm.email || !inviteForm.firstName) return;

    setLoading(true);

    try {
      // Simulation d'envoi
      await new Promise((resolve) => setTimeout(resolve, 800));
      onClose();
    } catch (err) {
      console.error("Erreur lors de l’envoi :", err);
    } finally {
      setLoading(false);
    }
  }, [inviteForm, onClose]);

  const handleInviteByLink = useCallback(() => {
    window.location.href = "/register?invite=true";
  }, []);

  /* ============================
     RENDER (PROTÉGÉ PAR React.memo)
  ============================ */
  return (
    <div className="invite-modal">
      <div className="invite-box modal-animate">

        <h3>Inviter une personne</h3>

        <input
          type="text"
          placeholder="Nom"
          value={inviteForm.lastName}
          onChange={handleChangeLastName}
        />

        <input
          type="text"
          placeholder="Prénom"
          value={inviteForm.firstName}
          onChange={handleChangeFirstName}
        />

        <input
          type="email"
          placeholder="Email"
          value={inviteForm.email}
          onChange={handleChangeEmail}
        />

        <input
          type="tel"
          placeholder="Téléphone portable"
          value={inviteForm.phone}
          onChange={handleChangePhone}
        />

        <button
          className="send-invite-btn"
          onClick={handleSendInvite}
          disabled={loading}
        >
          {loading ? "Envoi…" : "Envoyer l’invitation"}
        </button>

        <div className="separator">ou</div>

        <button className="link-invite-btn" onClick={handleInviteByLink}>
          Inviter par lien
        </button>

        <button className="close-btn" onClick={onClose}>
          Fermer
        </button>

      </div>
    </div>
  );
}

export default React.memo(InviteModal);
