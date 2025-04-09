import "./_hero.scss";

import longrope from "../../assets/controller only rope.png";
import onlycontroller from "../../assets/controller with no rope.png";
import { useEffect, useState } from "react";
export default function Hero() {
  const [scrollPosition, setScrollPosition] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const maxScroll = 141;
  const topValue = Math.min(6.5 + scrollPosition / 15, maxScroll);

  return (
    <div className="hero">
      <div>
        <h1>GAME FINDER</h1>;
      </div>
      <div className="hero-image-div">
        <div>
          <img className="hero-image-rope" src={longrope} alt="" />
        </div>
        <div className="hero-controller-div" style={{ top: `${topValue}rem` }}>
          <img className="hero-image-controller" src={onlycontroller} alt="" />
        </div>
      </div>
      {/* make image dissapear/z index under new section*/}
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
