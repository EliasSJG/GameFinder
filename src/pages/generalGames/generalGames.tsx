import "./_generalGames.scss";
import { useEffect, useRef, useState } from "react";
import { Tilt } from "react-tilt";

type Game = {
  name: string;
  cover?: { url: string };
  rating?: number;
};
export default function GeneralGames() {
  const [games, setGames] = useState<Game[]>([]);

  const getRandomGames = (gameData: Game[]): Game[] => {
    return gameData.sort(() => Math.random() - 0.5).slice(0, 4);
  };
  useEffect(() => {
    const getAccessToken = async () => {
      try {
        // Getting the token to get the api to work
        const tokenResponse = await fetch("https://id.twitch.tv/oauth2/token", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({
            client_id: import.meta.env.VITE_TWITCH_CLIENT_ID,
            client_secret: import.meta.env.VITE_TWITCH_CLIENT_SECRET,
            grant_type: "client_credentials",
          }),
        });

        //storing the token
        const tokenData = await tokenResponse.json();
        const accessToken = tokenData.access_token;
        console.log("Access Token:", accessToken);

        // Getting the games and data

        const gamesResponse = await fetch("/api/games", {
          method: "POST",
          headers: {
            "Client-ID": import.meta.env.VITE_TWITCH_CLIENT_ID,
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "text/plain", // IGDB uses plain text for the query
          },
          body: "fields name,cover.url,rating; limit: 30; sort rating desc;", // Just an example query
        });

        const gamesData = await gamesResponse.json();

        const filteredGame = gamesData.filter((game: Game) => {
          if (game.rating === 100) {
            return false;
          }
          return true;
        });

        //showing games in console log
        console.log("Games:", gamesData);
        const randomGames = getRandomGames(filteredGame);
        setGames(randomGames);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getAccessToken();
  }, []);

  const imagesPop = useRef<(HTMLDivElement | null)[]>([]);

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
      <h1>Games For You!</h1>
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
              <Tilt className="tilt-card border">
                <a href="">
                  <img className="temp-images" src={imageUrl} alt="" />
                </a>
              </Tilt>
            </div>
          );
        })}
      </div>
    </div>
  );
}
