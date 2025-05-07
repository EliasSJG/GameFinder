import { useEffect, useState } from "react";
import { Game } from "../types/types";

const usefetchGameDetails = (gameId: number) => {
  const [gameDetails, setGameDetails] = useState<Game | null>(null);
  const [artworkUrl, setArtworkUrl] = useState<string | null>(null);
  const [genreNames, setGenreNames] = useState<string[]>([]);
  const [themeNames, setThemeNames] = useState<string[]>([]);
  const [cover, setCover] = useState<string | null>(null);

  const [releaseDate, setReleaseDate] = useState<string>("N/A");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getAccessToken = async () => {
      try {
        const tokenResponse = await fetch("https://id.twitch.tv/oauth2/token", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({
            client_id: import.meta.env.VITE_TWITCH_CLIENT_ID,
            client_secret: import.meta.env.VITE_TWITCH_CLIENT_SECRET,
            grant_type: "client_credentials",
          }),
        });
        const tokenData = await tokenResponse.json();
        const accessToken = tokenData.access_token;

        const gameResponse = await fetch(`/api/games`, {
          method: "POST",
          headers: {
            "Client-ID": import.meta.env.VITE_TWITCH_CLIENT_ID,
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "text/plain",
          },
          body: `fields *, artworks, genres, themes, game_modes, release_dates; where id = ${gameId};`,
        });
        const gameData = await gameResponse.json();
        const game = gameData[0];
        setGameDetails(game);

        if (game.artworks && game.artworks.length > 0) {
          const artworkId = game.artworks[0];
          const artworkResponse = await fetch(`/api/artworks`, {
            method: "POST",
            headers: {
              "Client-ID": import.meta.env.VITE_TWITCH_CLIENT_ID,
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "text/plain",
            },
            body: `fields url; where id = ${artworkId};`,
          });
          const artworkData = await artworkResponse.json();
          const artworkUrlFromAPI = artworkData[0]?.url;
          if (artworkUrlFromAPI) {
            const fullSizeUrl = artworkUrlFromAPI.replace("t_thumb", "t_1080p");
            setArtworkUrl(`https:${fullSizeUrl}`);
          }
        }
        if (game.cover) {
          const coverResponse = await fetch(`/api/covers`, {
            method: "POST",
            headers: {
              "Client-ID": import.meta.env.VITE_TWITCH_CLIENT_ID,
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "text/plain",
            },
            body: `fields url; where id = ${game.cover};`,
          });

          const coverData = await coverResponse.json();
          const coverUrl = coverData[0]?.url;

          console.log("Cover URL:", coverUrl);

          if (coverUrl) {
            const fullCoverUrl = coverUrl.replace("t_thumb", "t_cover_big");
            setCover(`https:${fullCoverUrl}`);
          }
        }

        if (game.genres && game.genres.length > 0) {
          const genreResponse = await fetch(`/api/genres`, {
            method: "POST",
            headers: {
              "Client-ID": import.meta.env.VITE_TWITCH_CLIENT_ID,
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "text/plain",
            },
            body: `fields name; where id = (${game.genres.join(",")});`,
          });
          const genreData = await genreResponse.json();
          setGenreNames(genreData.map((g: any) => g.name));
        }

        if (game.themes && game.themes.length > 0) {
          const themeResponse = await fetch(`/api/themes`, {
            method: "POST",
            headers: {
              "Client-ID": import.meta.env.VITE_TWITCH_CLIENT_ID,
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "text/plain",
            },
            body: `fields name; where id = (${game.themes.join(",")});`,
          });
          const themeData = await themeResponse.json();
          setThemeNames(themeData.map((t: any) => t.name));
        }

        if (game.release_dates && game.release_dates.length > 0) {
          const releaseResponse = await fetch(`/api/release_dates`, {
            method: "POST",
            headers: {
              "Client-ID": import.meta.env.VITE_TWITCH_CLIENT_ID,
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "text/plain",
            },
            body: `fields date; where id = (${game.release_dates.join(
              ","
            )}); sort date asc;`,
          });
          const releaseData = await releaseResponse.json();
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

    getAccessToken();
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
