import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout() {
  const location = useLocation();

  // sécurisation détection de l’assistant IA
  const isIA = location.pathname.startsWith("/membre/projets/");

  if (isIA) {
    // Assistant IA doit être rendu SANS le layout global
    return <Outlet />;
  }

  // Reste du site utilise le layout normal
  return (
    <div className="app-layout layout-default">
      <Header />
      <main className="main-container">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
