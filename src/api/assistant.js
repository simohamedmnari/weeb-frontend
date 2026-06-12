/**
 * Module API Assistant IA
 * ------------------------
 * Objectif : fournir des fonctions PURES, STABLES, PRÉDICTIBLES.
 * Aucun état, aucun effet secondaire, aucune dépendance React.
 * Compatible avec React.memo, useCallback et les règles de performance.
 */

import api from "./axiosInstance";

/* ============================================================
   1) Fonction : sendToAssistant
   - Pure
   - Stable
   - Aucun objet recréé inutilement
   - Compatible Django (slash final obligatoire)
   ============================================================ */
export async function sendToAssistant(params) {
  try {
    // Appel API strict, aucune transformation inutile
    const response = await api.post("/assistant-ia/", params);
    return response.data;
  } catch (error) {
    // Log minimal, pas de bruit
    console.error("Erreur assistant.js (sendToAssistant) :", error);
    throw error; // Laisse React gérer l’erreur
  }
}

/* ============================================================
   2) Fonction : improveArticleAPI
   - Pure
   - Stable
   - Aucun objet recréé inutilement
   - Compatible Django (slash final obligatoire)
   ============================================================ */
export async function improveArticleAPI(params) {
  try {
    const response = await api.post("/assistant-ia/improve/", params);
    return response.data;
  } catch (error) {
    console.error("Erreur assistant.js (improveArticleAPI) :", error);
    throw error;
  }
}
