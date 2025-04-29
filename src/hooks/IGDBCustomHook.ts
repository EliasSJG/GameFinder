import { useEffect, useState } from "react";
import { Game } from "../types/types";

const useIGDBHook = (query: string, limit = 30, noPerfectRatings = true) => {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    const getRandomGames = (gameData: Game[]): Game[] => {
      return gameData.sort(() => Math.random() - 0.5).slice(0, 4);
    };
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
            "Content-Type": "text/plain",
          },
          body: `${query} limit: 30; sort rating desc;`,
        });

        const gamesData = await gamesResponse.json();

        const filteredGame = noPerfectRatings
          ? gamesData.filter((game: Game) => game.rating !== 100)
          : gamesData;

        //showing games in console log
        console.log("Games:", gamesData);
        const randomGames = getRandomGames(filteredGame);
        setGames(randomGames);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getAccessToken();
  }, [query, limit, noPerfectRatings]);
  return games;
};
export default useIGDBHook;
