import { useState, useEffect, useCallback, useMemo } from "react";
import api from "../api/axiosInstance";
import UserContext from "./UserContextBase";

export default function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  /* ============================
     LOGOUT STABILISÉ
     (évite re-renders inutiles)
  ============================ */
  const logoutUser = useCallback(() => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setUser(null);
  }, []);

  /* ============================
     CHARGEMENT UTILISATEUR
     Cycle de vie : MONTAGE + DÉMONTAGE
  ============================ */
  useEffect(() => {
    let mounted = true;

    const loadUser = async () => {
      const access = localStorage.getItem("access");

      if (!access) {
        if (mounted) setLoadingUser(false);
        return;
      }

      try {
        const res = await api.get("/auth/me/");
        if (mounted) setUser(res.data);
      } catch {
        console.warn("Impossible de charger l'utilisateur");
        if (mounted) logoutUser();
      }

      if (mounted) setLoadingUser(false);
    };

    loadUser();

    return () => {
      mounted = false;
    };
  }, [logoutUser]);

  /* ============================
     VALUE STABILISÉE
     (évite re-renders de TOUTE l’app)
  ============================ */
  const contextValue = useMemo(
    () => ({
      user,
      setUser,
      loadingUser,
      logoutUser,
      isLoggedIn: !!user,
    }),
    [user, loadingUser, logoutUser]
  );

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
}
