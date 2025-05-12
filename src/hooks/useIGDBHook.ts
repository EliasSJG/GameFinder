import { useEffect, useState } from "react";
import { Game } from "../types/types";
import { fetchFromIGDB } from "../utilities/fetchAPI";

const useIGDBHook = (query: string, limit = 30, noPerfectRatings = true) => {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    const getRandomGames = (gameData: Game[]): Game[] => {
      return gameData.sort(() => Math.random() - 0.5).slice(0, 4);
    };

    const getGames = async () => {
      try {
        const gamesResponse = await fetchFromIGDB(
          "/api/games",
          `${query} limit: ${limit}; sort rating desc;`
        );
        const filteredGame = noPerfectRatings
          ? gamesResponse.filter((game: Game) => game.rating !== 100)
          : gamesResponse;

        setGames(getRandomGames(filteredGame));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getGames();
  }, [query, limit, noPerfectRatings]);

  return games;
};

export default useIGDBHook;
