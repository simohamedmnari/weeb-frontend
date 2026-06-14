import "./App.css";
import "./styles/responsive.css";

import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";

import Layout from "./components/Layout";
import ScrollToTop from "./components/ScrollToTop";

// Pages publiques
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import CreerCompte from "./pages/CreerCompte";
import ResetPassword from "./pages/ResetPassword";

// Login
import LogIn from "./components/LogIn";

// Nouvelle page Assistant IA / Espace membre
import DashboardIA from "./pages/DashboardIA";

export default function App() {

  // Effet 3D sur les images
  useEffect(() => {
    const handleScroll = () => {
      const images = document.querySelectorAll(".img-3d");
      images.forEach((img) => {
        const speed = 0.15;
        const offset = window.scrollY * speed;
        img.style.transform = `translateY(${offset}px)`;
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <ScrollToTop />

      <Routes>
        <Route element={<Layout />}>

          {/* Pages publiques */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/creer-compte" element={<CreerCompte />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/contact" element={<Contact />} />

          {/* Assistant IA — PUBLIC */}
          <Route
            path="/membre/projets/:id"
            element={<DashboardIA />}
          />

        </Route>
      </Routes>
    </>
  );
}
