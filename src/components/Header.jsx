import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import UserContext from "../context/UserContextBase";
import "../styles/header.css";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const { user, logoutUser } = useContext(UserContext);
  const isLoggedIn = !!user;

  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;

  const isHome = path === "/";
  const isContact = path === "/contact";
  const isLogin = path === "/login";
  const isCreerCompte = path === "/creer-compte";
  const isRessources = path === "/ressources";
  const isResetPassword = path === "/reset-password";

  const handleLogout = () => {
    logoutUser();
    navigate("/");
  };

  return (
    <header className="header" role="banner">
      <div className="container">
        <div className="header-box">

          {/* GAUCHE */}
          <div className="nav-left">

            {/* LOGO */}
            <Link to="/" className="logo">weeb</Link>

            {/* NAVIGATION DESKTOP */}
            <nav className="nav-links desktop-only">

              {isHome && (
                <>
                  <Link className="nav-link" to="/">À propos</Link>
                  <Link className="nav-link" to="/contact">Contact</Link>
                </>
              )}

              {isContact && (
                <>
                  <Link className="nav-link" to="/">Accueil</Link>
                  <Link className="nav-link" to="/contact">Contact</Link>
                </>
              )}

              {isLogin && (
                <Link className="nav-link" to="/">Accueil</Link>
              )}

              {/* Pages où on ne montre pas de liens */}
              {isCreerCompte && null}
              {isRessources && null}
              {isResetPassword && null}

            </nav>
          </div>

          {/* DROITE DESKTOP */}
          <div className="btn-group desktop-only">

            {isLoggedIn ? (
              <button className="btn-outline" onClick={handleLogout}>
                Déconnexion
              </button>
            ) : (
              <>
                <Link className="btn-outline" to="/login">Se connecter</Link>
                <Link className="btn-primary" to="/creer-compte">Créer un compte</Link>
              </>
            )}

          </div>

          {/* HAMBURGER MOBILE */}
          <button
            className="hamburger mobile-only"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span></span><span></span><span></span>
          </button>

        </div>

        {/* MENU MOBILE */}
        {menuOpen && (
          <div id="mobile-menu" className="mobile-menu">

            {!isCreerCompte && (
              <Link className="mobile-link" to="/" onClick={() => setMenuOpen(false)}>
                Accueil
              </Link>
            )}

            {isHome && (
              <>
                <Link className="mobile-link" to="/" onClick={() => setMenuOpen(false)}>
                  À propos
                </Link>
                <Link className="mobile-link" to="/contact" onClick={() => setMenuOpen(false)}>
                  Contact
                </Link>
              </>
            )}

            {isContact && (
              <Link className="mobile-link" to="/contact" onClick={() => setMenuOpen(false)}>
                Contact
              </Link>
            )}

            {/* SI CONNECTÉ */}
            {isLoggedIn && (
              <button
                className="mobile-link"
                onClick={() => {
                  setMenuOpen(false);
                  handleLogout();
                }}
              >
                Déconnexion
              </button>
            )}

            {/* SI NON CONNECTÉ */}
            {!isLoggedIn && (
              <>
                <Link
                  className="mobile-link"
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                >
                  Se connecter
                </Link>

                <Link
                  className="btn-primary mobile-btn"
                  to="/creer-compte"
                  onClick={() => setMenuOpen(false)}
                >
                  Créer un compte
                </Link>
              </>
            )}

          </div>
        )}

      </div>
    </header>
  );
}
