import "./_hero.scss";
import logo from "../../assets/Logo.png";
import SearchBar from "../../components/search/search";

export default function Hero() {
  return (
    <>
      <div className="hero">
        <div>
          <img className="logo" src={logo} alt="GAME FINDER LGOG" />{" "}
        </div>
        <div>
          <h2>FIND YOUR GAME!</h2>;
        </div>

        <SearchBar />
      </div>
    </>
  );
}
