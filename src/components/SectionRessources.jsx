import "../styles/ressources.css";
import { FiArrowRight } from "react-icons/fi";
import CreationIAProfessionnelle from "../assets/CreationIAProfessionnelle.png";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function SectionRessources() {

  useEffect(() => {
    const element = document.querySelector(".scroll-reveal");

    const handleScroll = () => {
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight - 100;

      if (isVisible) {
        element.classList.add("visible");
        window.removeEventListener("scroll", handleScroll);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      className="ressources"
      role="region"
      aria-label="Section présentant l’accompagnement IA personnalisé"
    >
      {/* ====== TITRE FULL WIDTH ====== */}
      <div className="ressources-header">
        <h3 className="ressources-subtitle">
          UN ACCOMPAGNEMENT IA QUI APPREND DE VOUS
        </h3>

        <h2 className="ressources-title">
          <span className="violet line1">Progressez avec un assistant qui</span>
          <span className="violet line2">améliore votre manière d’écrire</span>
        </h2>
      </div>

      {/* ====== 2 COLONNES ====== */}
      <div className="ressources-box">

        {/* Bloc gauche */}
        <div className="ressources-left">
          <p className="ressources-text">
            Weeb ne se limite pas à générer du texte. L’assistant analyse votre manière
            d’écrire, comprend votre style et vous propose des améliorations adaptées grâce
            à sa <strong>mémoire IA persistante</strong>.
            <br /><br />
            Vous créez vos propres articles, pages, contenus professionnels et textes optimisés
            en quelques secondes, avec des suggestions intelligentes pour améliorer la clarté,
            la structure et l’impact de vos écrits.
            <br /><br />
            <strong>L’objectif : transformer vos idées en contenus professionnels, cohérents et
            percutants, tout en gagnant du temps et en progressant dans votre rédaction.</strong>
            <br /><br />
            Ici, la performance se mesure dans le réel : ce que vous écrivez, vous l’améliorez.
          </p>

          <Link
            to="/membre/projets/1"
            className="ressources-btn blink scroll-reveal"
            aria-label="Découvrir l’assistant IA pour la rédaction"
          >
            Découvrir l’assistant de rédaction
            <FiArrowRight
              className="ressources-btn-icon arrow-animate"
              aria-hidden="true"
            />
          </Link>
        </div>

        {/* Bloc droit */}
        <div className="ressources-right">
          <img
            src={CreationIAProfessionnelle}
            alt="Création d’articles assistée par IA"
            className="ressources-image img-3d"
          />
        </div>

      </div>
    </section>
  );
}
