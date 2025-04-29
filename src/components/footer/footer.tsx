import "./_footer.scss";
import logo from "../../assets/Logo.png";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <>
      <svg
        className="waves"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 24 150 28"
        preserveAspectRatio="none"
        shapeRendering="auto"
      >
        <defs>
          <path
            id="gentle-wave"
            d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
          />
        </defs>
        <g className="parallax">
          <use href="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7" />
          <use href="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
          <use href="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
          <use href="#gentle-wave" x="48" y="7" fill="#fff" />
        </g>
      </svg>

      <footer>
        <div>
          <Link to="/">
            <img className="footer-logo" src={logo} alt="Gamefinder" />
          </Link>
        </div>
        <h3>Created by Elias Gustafsson | Frontend developer student</h3>
        <h3>Yrkeshögskolan i Borås</h3>
        <h3>Frontendutvecklare React</h3>
        <h3>Created with IGDB API</h3>
      </footer>
    </>
  );
}
