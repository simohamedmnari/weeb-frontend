import "../styles/trust.css";

import SmartFinder from "../assets/SmartFinder.png";
import Zoomerr from "../assets/Zoomerr.png";
import Schells from "../assets/Schells.png";
import Waves from "../assets/Waves.png";
import ArtVenue from "../assets/ArtVenue.png";

export default function Trust() {
  return (
    <section className="trust">
      <div className="trust-box">
        <div className="trust-title-wrapper">
          <h2 className="trust-title">Ils nous font confiance</h2>
        </div>

        <div className="trust-logos">
          <div className="trust-logo">
            <img src={SmartFinder} alt="SmartFinder" className="img-3d" />
            <span>SmartFinder</span>
          </div>

          <div className="trust-logo">
            <img src={Zoomerr} alt="Zoomerr" className="img-3d" />
            <span>Zoomerr</span>
          </div>

          <div className="trust-logo">
            <img src={Schells} alt="Schells" className="img-3d" />
            <span>Schells</span>
          </div>

          <div className="trust-logo">
            <img src={Waves} alt="Waves" className="img-3d" />
            <span>Waves</span>
          </div>

          <div className="trust-logo">
            <img src={ArtVenue} alt="ArtVenue" className="img-3d" />
            <span>ArtVenue</span>
          </div>
        </div>
      </div>
    </section>
  );
}
