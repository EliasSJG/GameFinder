import { useEffect, useState } from "react";
import { Game } from "../types/types";
import { fetchFromIGDB } from "../utilities/fetchAPI";

//this hook fetches the games on the start page
const useIGDBHook = (query: string, limit = 30, noPerfectRatings = true) => {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    //fetches the games
    const getGames = async () => {
      try {
        const gamesResponse = await fetchFromIGDB<Game[]>(
          "/api/games",
          `${query} limit: ${limit}; sort rating desc;`
        );
        //randoms the games so its only 4 and they are random each time
        const getRandomGames = (gameData: Game[]): Game[] => {
          return gameData.sort(() => Math.random() - 0.5).slice(0, 4);
        };

        //filters so no 100 rated games will come with
        const filteredGame = noPerfectRatings
          ? gamesResponse.filter((game: Game) => game.rating !== 100)
          : gamesResponse;

        //gets the games
        setGames(getRandomGames(filteredGame));
      } catch (error) {
        console.error("Error while fetching data:", error);
      }
    };

    getGames();
  }, [query, limit, noPerfectRatings]);

  return games;
};

export default useIGDBHook;
