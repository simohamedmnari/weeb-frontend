/**
 * Module Contact API
 * -------------------
 * Objectif : fournir des fonctions PURES, STABLES, PRÉDICTIBLES.
 * Aucun état React, aucune dépendance, aucune recréation inutile.
 * Compatible avec React.memo, useCallback, useMemo.
 */

import api from "./axiosInstance";

/* ============================================================
   1) ENVOYER UN MESSAGE CONTACT (RGPD)
   Endpoint : POST /contact/
   ============================================================ */
export async function sendContact(data) {
  // Fonction pure → aucune dépendance, aucune recréation
  const response = await api.post("/contact/", data);
  return response.data;
}

/* ============================================================
   2) RÉCUPÉRER TOUS LES MESSAGES (ADMIN)
   Endpoint : GET /contact/messages/
   ============================================================ */
export async function getAllMessages() {
  const response = await api.get("/contact/messages/");
  return response.data;
}

/* ============================================================
   3) CRÉER UNE PRÉDICTION ML (ADMIN)
   Endpoint : POST /contact/predictions/
   ============================================================ */
export async function createPrediction(data) {
  const response = await api.post("/contact/predictions/", data);
  return response.data;
}

/* ============================================================
   4) RÉCUPÉRER LES PRÉDICTIONS D’UN CONTACT (ADMIN)
   Endpoint : GET /contact/<id>/predictions/
   ============================================================ */
export async function getPredictions(contactId) {
  const response = await api.get(`/contact/${contactId}/predictions/`);
  return response.data;
}
