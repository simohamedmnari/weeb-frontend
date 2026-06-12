import api from "./axiosInstance";

/**
 * REGISTER
 * Le backend NE renvoie PAS de token.
 */
export async function register(data) {
  try {
    const response = await api.post("/auth/register/", data);
    return response.data;
  } catch (error) {
    console.error("Erreur register :", error);
    throw error;
  }
}

/**
 * LOGIN
 * Renvoie : { access: "TOKEN" }
 */
export async function login(data) {
  try {
    const response = await api.post("/auth/login/", data);

    if (response.data.access) {
      localStorage.setItem("access", response.data.access);
    }

    return response.data;
  } catch (error) {
    console.error("Erreur login :", error);
    throw error;
  }
}

/**
 * REFRESH TOKEN
 * Ton api.md dit : body obligatoire { refresh }
 */
export async function refreshToken(refresh) {
  try {
    const response = await api.post("/auth/refresh/", { refresh });

    if (response.data.access) {
      localStorage.setItem("access", response.data.access);
    }

    return response.data;
  } catch (error) {
    console.error("Erreur refreshToken :", error);
    throw error;
  }
}

/**
 * LOGOUT
 */
export async function logout() {
  try {
    await api.post("/auth/logout/");
    localStorage.removeItem("access");
    return true;
  } catch (error) {
    console.error("Erreur logout :", error);
    throw error;
  }
}

/**
 * GET USER CONNECTÉ
 */
export async function getMe() {
  try {
    const response = await api.get("/auth/me/");
    return response.data;
  } catch (error) {
    console.error("Erreur getMe :", error);
    throw error;
  }
}
