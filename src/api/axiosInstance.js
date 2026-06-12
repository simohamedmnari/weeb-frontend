import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL + "/api/",
  withCredentials: false,
  timeout: 15000,
});

/* ============================
   HELPERS
============================ */
function getAccessToken() {
  return localStorage.getItem("access");
}

function getRefreshToken() {
  return localStorage.getItem("refresh");
}

function saveAccessToken(token) {
  if (token) {
    localStorage.setItem("access", token);
  }
}

function forceLogout() {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
  window.location.href = "/login";
}

/* ============================
   REQUEST INTERCEPTOR
============================ */
api.interceptors.request.use(
  (config) => {
    const access = getAccessToken();
    const url = config.url || "";

    // 🔥 NE PAS envoyer de token sur l'assistant IA (endpoint public)
    if (url.startsWith("/assistant-ia")) {
      delete config.headers?.Authorization;
      return config;
    }

    // Pas d'Authorization sur login/register
    if (
      url.includes("/auth/login/") ||
      url.includes("/auth/register/")
    ) {
      delete config.headers?.Authorization;
      return config;
    }

    // Ajouter le token si présent
    if (access) {
      if (!config.headers) config.headers = {};
      config.headers.Authorization = `Bearer ${access}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/* ============================
   RESPONSE INTERCEPTOR
============================ */
api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config || {};

    if (!error.response) {
      console.warn("⚠ Erreur réseau ou timeout");
      return Promise.reject(error);
    }

    const status = error.response.status;
    const url = originalRequest.url || "";

    // Ne jamais retenter login/register
    if (
      url.includes("/auth/login/") ||
      url.includes("/auth/register/")
    ) {
      return Promise.reject(error);
    }

    // Empêcher les boucles
    if (originalRequest._retry) {
      return Promise.reject(error);
    }

    /* ============================
       401 → essayer refresh
    ============================ */
    if (status === 401) {
      const refresh = getRefreshToken();

      if (!refresh) {
        console.warn("Aucun refresh token → logout");
        forceLogout();
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      try {
        const res = await api.post("/auth/refresh/", { refresh });

        if (res.data.access) {
          saveAccessToken(res.data.access);
          if (!originalRequest.headers) originalRequest.headers = {};
          originalRequest.headers.Authorization = `Bearer ${res.data.access}`;
        }

        return api(originalRequest);
      } catch (refreshError) {
        console.warn("Refresh token invalide → logout");
        forceLogout();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

/* ============================
   ML — ANALYSE MESSAGE
============================ */
export function analyzeMessage(message) {
  return api.post("/contact/analyze/", { message });
}

/* ============================
   ML — CRÉER UNE PRÉDICTION
============================ */
export function createPrediction(data) {
  return api.post("/contact/predictions/", data);
}

export default api;
