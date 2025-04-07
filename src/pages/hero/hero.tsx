import "./_hero.scss";

import longrope from "../../assets/controller only rope.png";
import onlycontroller from "../../assets/controller with no rope.png";
export default function Hero() {
  return (
    <div className="hero">
      <div>
        <h1>GAME FINDER</h1>;
      </div>
      <div className="hero-image-div">
        <div>
          <img className="hero-image-rope" src={longrope} alt="" />
        </div>
        <div className="hero-controller-div">
          <img className="hero-image-controller" src={onlycontroller} alt="" />
        </div>
      </div>

      <div className="search-div">
        <input
          placeholder="Search for game..."
          className="header-search-hero"
          type="search"
        />
      </div>
    </div>
  );
}
