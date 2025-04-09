import "./_generalGames.scss";

import TLOUTEMP from "../../assets/temp/TLOUTEMP.png";
import RDR2TEMP from "../../assets/temp/RDR2TEMP.jpg";
import GOWTEMP from "../../assets/temp/GOWTEMP.jpg";
import GTA5TEMP from "../../assets/temp/GTA5TEMP.jpg";
import { useEffect, useRef } from "react";

export default function GeneralGames() {
  const imagesPop = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        console.log(entry.target, entry.isIntersecting);
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          obs.unobserve(entry.target);
        }
      });
    });

    imagesPop.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const images = [TLOUTEMP, RDR2TEMP, GOWTEMP, GTA5TEMP];

  return (
    <div className="showcase-games-div ">
      <h1>General Games Here</h1>
      <div className="games-holder">
        {images.map((imgSrc, index) => (
          <div
            className="card hidden"
            key={index}
            ref={(el) => {
              imagesPop.current[index] = el;
            }}
          >
            <a href="">
              <img className="temp-images" src={imgSrc} alt="" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
