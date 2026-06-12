// frontend/src/api/articles.js
import api from "./axiosInstance";

/**
 * GET /api/articles/
 * Récupérer tous les articles de l'utilisateur connecté
 */
export function getArticles() {
  return api.get("/articles/");
}

/**
 * GET /api/articles/<id>/
 * Récupérer un article par ID
 */
export function getArticle(id) {
  return api.get(`/articles/${id}/`);
}

/**
 * POST /api/articles/
 * Créer un article
 * Body attendu :
 * {
 *   "title": "",
 *   "content": ""
 * }
 */
export function createArticle(data) {
  return api.post("/articles/", data);
}

/**
 * PUT /api/articles/<id>/
 * Modifier un article
 */
export function updateArticle(id, data) {
  return api.put(`/articles/${id}/`, data);
}

/**
 * DELETE /api/articles/<id>/
 * Supprimer un article
 */
export function deleteArticle(id) {
  return api.delete(`/articles/${id}/`);
}
