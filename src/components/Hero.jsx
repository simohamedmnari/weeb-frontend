import "../styles/hero.css";
import heroIllustration from "../assets/PortraitSiMNARI_WeebPremium.png";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section
      className="hero"
      role="region"
      aria-label="Section d’introduction du site présentant l’accompagnement IA"
    >
      <div className="container">
        <div className="hero-box">

          {/* ============================
              CONTENU TEXTE
          ============================ */}
          <div className="hero-content">
            <h1 className="hero-title">
              <span className="line-1">Votre assistant IA</span><br />
              <span className="hero-web">pour créer vos articles</span><br />
              <span className="hero-facettes">et accélérer votre rédaction</span>
            </h1>

            <p className="hero-text">
              <strong>Weeb est un assistant IA conçu pour vous aider à rédiger, améliorer et structurer vos articles</strong>{" "}
              en quelques secondes. Vous créez, modifiez et organisez vos contenus dans une interface moderne,
              avec un assistant qui vous guide étape par étape.
              <br /><br />
              Weeb analyse vos idées, comprend votre style et vous propose des améliorations, des reformulations
              et des plans adaptés. Grâce à son <strong>IA intégrée</strong>, vous gagnez du temps, vous progressez plus vite
              et vous produisez des contenus professionnels.
            </p>

            <div className="hero-buttons">
              <Link
                to="/membre/projets/1"
                className="btn-primary hero-btn"
                aria-label="Créer votre premier article"
              >
                Créer votre premier article
              </Link>

              <Link
                to="/membre/projets/1"
                className="btn-outline hero-btn hero-btn-newsletter"
                aria-label="Découvrir l’assistant IA"
              >
                <span>Découvrir l’assistant</span>
                <span>IA intégré</span>
              </Link>
            </div>
          </div>

          {/* ============================
              IMAGE + MOTS FLOTTANTS
          ============================ */}
          <div className="hero-image-wrapper">

            <img
              src={heroIllustration}
              alt="Portrait professionnel de Si M'NARI dans un bureau moderne, style premium"
              className="hero-image img-3d"
            />

            <div
              className="floating-words"
              aria-hidden="true"
            >
              <span className="word">Rédaction IA</span>
              <span className="word">Amélioration</span>
              <span className="word">Reformulation</span>
              <span className="word">Plan d’article</span>
              <span className="word">Génération IA</span>
              <span className="word">Articles pro</span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
