import "./_header.scss";
import logo from "../../assets/Logo.png";
import statisticsPNG from "../../assets/statistics-png.png";
import SearchBar from "../search/search";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <div>
        <Link to="/">
          <img className="logo" src={logo} alt="GAME FINDER" />
        </Link>
      </div>
      <SearchBar />
      <div>
        <img
          className="meny"
          src="https://img.icons8.com/ios11/512/FFFFFF/menu.png"
          alt="Meny"
        />
      </div>
      <div>
        <Link to="/statistics">
          <img
            src={statisticsPNG}
            className="statistics-png"
            alt="Statistics Page"
          />
        </Link>
      </div>
    </header>
  );
}
