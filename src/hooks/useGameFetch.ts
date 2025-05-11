import { useEffect, useState } from "react";
import { Game } from "../types/types";
import { fetchFromIGDB } from "../utilities/fetchAPI";

const usefetchGameDetails = (gameId: number) => {
  const [gameDetails, setGameDetails] = useState<Game | null>(null);
  const [artworkUrl, setArtworkUrl] = useState<string | null>(null);
  const [genreNames, setGenreNames] = useState<string[]>([]);
  const [themeNames, setThemeNames] = useState<string[]>([]);
  const [cover, setCover] = useState<string | null>(null);
  const [releaseDate, setReleaseDate] = useState<string>("N/A");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getGameDetails = async () => {
      try {
        const gameData = await fetchFromIGDB(
          `/api/games`,
          `fields *, artworks, genres, themes, game_modes, release_dates; where id = ${gameId};`
        );
        const game = gameData[0];
        setGameDetails(game);

        if (game.artworks && game.artworks.length > 0) {
          const artworkData = await fetchFromIGDB(
            `/api/artworks`,
            `fields url; where id = ${game.artworks[0]};`
          );
          const artworkUrlFromAPI = artworkData[0]?.url;
          if (artworkUrlFromAPI) {
            const fullSizeUrl = artworkUrlFromAPI.replace("t_thumb", "t_1080p");
            setArtworkUrl(`https:${fullSizeUrl}`);
          }
        }

        if (game.cover) {
          const coverData = await fetchFromIGDB(
            `/api/covers`,
            `fields url; where id = ${game.cover};`
          );
          const coverUrl = coverData[0]?.url;
          if (coverUrl) {
            const fullCoverUrl = coverUrl.replace("t_thumb", "t_cover_big");
            setCover(`https:${fullCoverUrl}`);
          }
        }

        if (game.genres && game.genres.length > 0) {
          const genreData = await fetchFromIGDB(
            `/api/genres`,
            `fields name; where id = (${game.genres.join(",")});`
          );
          setGenreNames(genreData.map((g: any) => g.name));
        }

        if (game.themes && game.themes.length > 0) {
          const themeData = await fetchFromIGDB(
            `/api/themes`,
            `fields name; where id = (${game.themes.join(",")});`
          );
          setThemeNames(themeData.map((t: any) => t.name));
        }

        if (game.release_dates && game.release_dates.length > 0) {
          const releaseData = await fetchFromIGDB(
            `/api/release_dates`,
            `fields date; where id = (${game.release_dates.join(
              ","
            )}); sort date asc;`
          );
          const firstRelease = releaseData[0]?.date
            ? new Date(releaseData[0].date * 1000).toLocaleDateString()
            : "N/A";
          setReleaseDate(firstRelease);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error while fetching:", error);
        setLoading(false);
      }
    };

    getGameDetails();
  }, [gameId]);

  return {
    gameDetails,
    artworkUrl,
    genreNames,
    themeNames,
    releaseDate,
    loading,
    cover,
  };
};

export default usefetchGameDetails;
