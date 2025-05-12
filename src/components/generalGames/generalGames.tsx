import "./_generalGames.scss";
import { useEffect, useRef } from "react";
import useIGDBHook from "../../hooks/useIGDBHook";

export default function GeneralGames() {
  const imagesPop = useRef<(HTMLDivElement | null)[]>([]);
  const games = useIGDBHook("fields name,cover.url,rating;", 30, true);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    imagesPop.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => {
      observer.disconnect();
    };
  }, [games]);

  return (
    <div className="showcase-games-div">
      <h1 className="text-center">Games For You!</h1>
      <div className="games-holder">
        {games.map((game, index) => {
          const imageUrl = game.cover?.url
            ? `https:${game.cover.url.replace("t_thumb", "t_720p")}`
            : "";

          return (
            <div
              key={index}
              className="card hidden"
              ref={(el) => {
                imagesPop.current[index] = el;
              }}
            >
              <div className="tilt-card border">
                <a href="">
                  <img className="temp-images" src={imageUrl} alt={game.name} />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
