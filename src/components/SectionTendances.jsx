import "../styles/tendances.css";
import { FiArrowRight } from "react-icons/fi";
import GoGoGoIA from "../assets/GoGoGoIA.png";
import { Link } from "react-router-dom";

export default function SectionTendances() {
  return (
    <section
      className="tendances"
      role="region"
      aria-label="Section présentant ce que vous allez créer avec Weeb"
    >
      <div className="tendances-box">

        {/* Bloc gauche : image */}
        <div className="tendances-left">
          <div className="tendances-image-wrapper">
            <img
              src={GoGoGoIA}
              alt="Utilisateur rédigeant un article assisté par IA"
              className="tendances-image img-3d"
            />
          </div>
        </div>

        {/* Bloc droit : texte + bouton */}
        <div className="tendances-right">

          <h3 className="tendances-caption">
            Ce que vous allez créer
          </h3>

          <h2 className="tendances-title">
            Des articles professionnels, clairs et optimisés
          </h2>

          <p className="tendances-text">
            Avec Weeb, vous créez des <strong>articles complets</strong>, des 
            <strong> contenus professionnels</strong>, des <strong>pages optimisées</strong>, 
            des <strong>plans d’articles</strong> et des <strong>textes reformulés</strong> grâce à l’IA.
            <br /><br />
            Chaque article peut être <strong>amélioré</strong>, <strong>réécrit</strong>, 
            <strong>structuré</strong> ou <strong>généré entièrement</strong> par l’assistant IA.
            Votre assistant analyse votre style, comprend vos intentions et vous guide pour produire 
            des contenus plus clairs, plus fluides et plus professionnels.
          </p>

          <Link
            to="/membre/projets/1"
            className="tendances-btn"
            aria-label="Explorer ce que vous pouvez créer avec Weeb"
          >
            Découvrir ce que vous pouvez créer

            <FiArrowRight
              className="tendances-btn-icon"
              aria-hidden="true"
            />
          </Link>

        </div>

      </div>
    </section>
  );
}
