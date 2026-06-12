/**
 * Module Predictions API
 * -----------------------
 * Objectif : fonction PURE, STABLE, PRÉDICTIBLE.
 * Aucun état React, aucune dépendance, aucune recréation inutile.
 */

import api from "./axiosInstance";

/* ============================================================
   CRÉER UNE PRÉDICTION ML
   Endpoint : POST /contact/predictions/
   ============================================================ */
export async function createPrediction(data) {
  const response = await api.post("/contact/predictions/", data);
  return response.data;
}
