import "./_header.scss";
import logo from "../../assets/Logo.png";
import SearchBar from "../search/search";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <div>
        <Link to="/">
          <img className="logo" src={logo} alt="GAME FINDER LGOG" />
        </Link>
      </div>
      <SearchBar />
      <div>
        <a href="">
          <img
            className="meny"
            src="https://img.icons8.com/ios11/512/FFFFFF/menu.png"
            alt=""
          />
        </a>
      </div>
    </header>
  );
}
