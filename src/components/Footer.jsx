import "../styles/footer.css";
import { Link } from "react-router-dom";
import {
  FaYoutube,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn
} from "react-icons/fa";

export default function Footer() {
  const currentId = localStorage.getItem("currentArticleId") || 1;
  const assistantLink = `/membre/projets/${currentId}`;

  return (
    <footer className="footer" role="contentinfo">

      <div className="footer-top">

        {/* LOGO */}
        <div className="footer-col">
          <Link to="/" className="footer-title footer-logo">
            weeb
          </Link>
        </div>

        {/* ASSISTANT IA */}
        <div className="footer-col">
          <h3 className="footer-title">Assistant IA</h3>
          <ul className="footer-links">
            <li><Link to={assistantLink}>Espace IA</Link></li>
            <li><Link to={assistantLink}>Automatisation</Link></li>
            <li><Link to={assistantLink}>Agents IA</Link></li>
          </ul>
        </div>

        {/* COMPTE */}
        <div className="footer-col">
          <h3 className="footer-title">Compte</h3>
          <ul className="footer-links">
            <li><Link to="/login">Se connecter</Link></li>
            <li><Link to="/creer-compte">Créer un compte</Link></li>
          </ul>
        </div>

        {/* CONTACT */}
        <div className="footer-col">
          <h3 className="footer-title">Contact</h3>
          <ul className="footer-links">
            <li><Link to="/contact">Nous contacter</Link></li>
          </ul>
        </div>

        {/* LÉGAL */}
        <div className="footer-col">
          <h3 className="footer-title">Légal</h3>
          <ul className="footer-links">
            <li><Link to="/legal">Mentions légales</Link></li>
            <li><Link to="/cgu">Conditions d’utilisation</Link></li>
            <li><Link to="/privacy">Confidentialité</Link></li>
          </ul>
        </div>

      </div>

      {/* BAS DU FOOTER */}
      <div className="footer-bottom">
        <p className="footer-copy">© 2025 Weeb, Inc. Tous droits réservés.</p>

        <div className="footer-socials">
          <FaYoutube className="footer-icon" />
          <FaFacebookF className="footer-icon" />
          <FaTwitter className="footer-icon" />
          <FaInstagram className="footer-icon" />
          <FaLinkedinIn className="footer-icon" />
        </div>
      </div>

    </footer>
  );
}
