import "./_generalGames.scss";
import { useEffect, useRef } from "react";
import useIGDBHook from "../../hooks/useIGDBHook";
import { Link } from "react-router-dom";

export default function GeneralGames() {
  //A ref to look at the images
  const imagesPop = useRef<(HTMLDivElement | null)[]>([]);

  //fetches the games
  const games = useIGDBHook("fields name,cover.url,rating;", 30, true);

  //observer to look over the games when user is seeing them.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          //if user sees cards gives them show class and it becomes visible
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    //observes each card.
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
              key={game.id}
              className="card hidden"
              ref={(el) => {
                imagesPop.current[index] = el;
              }}
            >
              <div className="game-card">
                <Link to={`/game/${game.id}`}>
                  <img
                    className="game-images-forYou"
                    src={imageUrl}
                    alt={game.name}
                  />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
