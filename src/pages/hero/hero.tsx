import "./_hero.scss";
import logo from "../../assets/Logo.png";

export default function Hero() {
  return (
    <>
      <div className="hero">
        <div>
          <img className="logo" src={logo} alt="GAME FINDER LGOG" />{" "}
        </div>
        <div>
          <h1>Find The Game For You!</h1>;
        </div>
        <div className="search-div">
          <input
            placeholder="Search for game..."
            className="header-search-hero"
            type="search"
          />
        </div>
      </div>
    </>
  );
}
