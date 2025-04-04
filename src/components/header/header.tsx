import "./_header.scss";
import logo from "../../assets/Logo.png";

export default function Header() {
  return (
    <header>
      <div>
        <a href="">
          <img className="logo" src={logo} alt="GAME FINDER LGOG" />
        </a>
      </div>
      <div>
        <input
          placeholder="Search for game..."
          className="header-search"
          type="search"
        />
        <a href="">
          <img
            className="search-icon"
            src="https://www.freeiconspng.com/thumbs/search-icon-png/search-icon-png-21.png"
            alt=""
          />
        </a>
      </div>

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
