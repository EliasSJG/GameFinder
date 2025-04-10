import "./_generalGames.scss";
import TLOUTEMP from "../../assets/temp/TLOUTEMP.png";
import RDR2TEMP from "../../assets/temp/RDR2TEMP.jpg";
import GOWTEMP from "../../assets/temp/GOWTEMP.jpg";
import GTA5TEMP from "../../assets/temp/GTA5TEMP.jpg";
import { useEffect, useRef, useState } from "react";
import { Tilt } from "react-tilt";

export default function GeneralGames() {
  const [isVisible, setIsVisible] = useState(false);
  const imagesPop = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (imagesPop.current[0]) {
      observer.observe(imagesPop.current[0]);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const images = [TLOUTEMP, RDR2TEMP, GOWTEMP, GTA5TEMP];

  return (
    <div className="showcase-games-div">
      <h1>Games For You!</h1>
      <div className="games-holder">
        {images.map((imgSrc, index) => (
          <div
            key={index}
            className={`card ${isVisible ? "show" : "hidden"}`}
            ref={(el) => {
              imagesPop.current[index] = el;
            }}
          >
            <Tilt className="tilt-card border">
              <a href="">
                <img className="temp-images" src={imgSrc} alt="" />
              </a>
            </Tilt>
          </div>
        ))}
      </div>
    </div>
  );
}
