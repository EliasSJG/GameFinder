import { useEffect, useState } from "react";
import { Game } from "../types/types";
import { fetchFromIGDB } from "../utilities/fetchAPI";

const usefetchGameDetails = (gameId: number) => {
  const [game, setGame] = useState<Game | null>(null);
  const [artworkUrl, setArtwork] = useState<string | null>(null);
  const [genres, setGenres] = useState<string[]>([]);
  const [themes, setTheme] = useState<string[]>([]);
  const [cover, setCover] = useState<string | null>(null);
  const [releaseDate, setReleaseDate] = useState<string>("N/A");
  const [loading, setLoading] = useState<boolean>(true);
  //the hook the fetch the details about the game user has selected
  useEffect(() => {
    const getGameDetails = async () => {
      try {
        const gameData = await fetchFromIGDB<Game[]>(
          //the fields we use to retrieve from the api
          `/api/games`,
          `fields name, summary, rating, artworks.image_id, cover.image_id, genres.name, themes.name, release_dates.date;
           where id = ${gameId};`
        );
        //grabs the first game from the response and stores it
        const game = gameData[0];
        setGame(game);
        //gets the url for the artwork
        const artworkId: string | undefined = game.artworks?.[0]?.image_id;
        if (artworkId) {
          setArtwork(
            `https://images.igdb.com/igdb/image/upload/t_1080p/${artworkId}.jpg`
          );
        }
        //gets the url for the cover
        const coverId = game.cover?.image_id;
        if (coverId) {
          setCover(
            `https://images.igdb.com/igdb/image/upload/t_cover_big/${coverId}.jpg`
          );
        }
        //extracts the genre names and sets the names
        const genres = game.genres?.map((g) => g.name) || [];
        setGenres(genres);

        //extracts the theme names and sets the names
        const themes = game.themes?.map((t) => t.name) || [];
        setTheme(themes);
        //formats and sets the date
        const firstDate = game.release_dates?.[0]?.date;
        const formattedDate = firstDate
          ? new Date(firstDate * 1000).toLocaleDateString()
          : "N/A";
        setReleaseDate(formattedDate);

        setLoading(false);
      } catch (error) {
        console.error("Error while fetching:", error);
        setLoading(false);
      }
    };

    getGameDetails();
  }, [gameId]);

  return {
    game,
    artworkUrl,
    genres,
    themes,
    releaseDate,
    loading,
    cover,
  };
};

export default usefetchGameDetails;
