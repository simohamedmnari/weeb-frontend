import { Navigate } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../context/UserContextBase";

export default function PrivateRoute({ children }) {
  const { loadingUser, isLoggedIn } = useContext(UserContext);

  if (loadingUser) {
    return (
      <div className="private-loading">
        Chargement de votre espace...
      </div>
    );
  }

  // Pages réellement privées (ne touche plus l’assistant IA)
  const isPrivatePage =
    window.location.pathname.startsWith("/dashboard") ||
    window.location.pathname.startsWith("/profil") ||
    window.location.pathname.startsWith("/historique") ||
    window.location.pathname.startsWith("/parametres");

  // Si pas connecté → redirection
  if (!isLoggedIn && isPrivatePage) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
