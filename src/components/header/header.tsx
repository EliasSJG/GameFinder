import "./_header.scss";
import logo from "../../assets/Logo.png";
import SearchBar from "../search/search";

export default function Header() {
  return (
    <header>
      <div>
        <a href="">
          <img className="logo" src={logo} alt="GAME FINDER LGOG" />
        </a>
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
