/**
 * Module Analyze API
 * -------------------
 * Objectif : fonction PURE, STABLE, PRÉDICTIBLE.
 * Aucun état React, aucune dépendance, aucune recréation inutile.
 */

import api from "./axiosInstance";

/* ============================================================
   ANALYSE NLP D’UN MESSAGE
   Endpoint : POST /contact/analyze/
   ============================================================ */
export async function analyzeMessage(message) {
  const response = await api.post("/contact/analyze/", { message });
  return response.data;
}
