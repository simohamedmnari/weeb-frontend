import Hero from "../components/Hero";
import Trust from "../components/Trust";
import SectionRessources from "../components/SectionRessources";
import SectionTendances from "../components/SectionTendances";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main className="container">
      <Hero />
      <Trust />
      <SectionRessources />
      <SectionTendances />

      {/* ============================
          CTA FINAL — CONVERSION
      ============================ */}
      <section
        className="home-final-cta"
        style={{
          textAlign: "center",
          margin: "40px 0",
        }}
      >
        <h2
          className="ressources-title"
          style={{
            marginBottom: "20px",
          }}
        >
          <span className="violet line1">Prêt à créer vos articles ?</span>
        </h2>

        <p
          style={{
            fontSize: "18px",
            color: "white",
            opacity: 0.85,
            marginBottom: "30px",
            maxWidth: "750px",
            marginInline: "auto",
            lineHeight: "1.5",
          }}
        >
          Rédigez vos premiers articles plus vite que vous ne l’imaginez.
          Laissez l’IA vous aider à structurer, améliorer et professionnaliser vos contenus.
          Votre progression commence maintenant.
        </p>

        <Link
          to="/membre/projets/1"
          className="btn-primary"
          style={{
            padding: "14px 28px",
            fontSize: "18px",
            borderRadius: "8px",
            textDecoration: "none",
            display: "inline-block",
            marginBottom: "15px",
          }}
        >
          Commencer à rédiger
        </Link>

        <br />

        <Link
          to="/membre/projets/1"
          className="btn-outline"
          style={{
            padding: "12px 24px",
            fontSize: "16px",
            borderRadius: "8px",
            textDecoration: "none",
            display: "inline-block",
            marginTop: "10px",
          }}
        >
          Rejoindre l’aventure
        </Link>
      </section>
    </main>
  );
}
