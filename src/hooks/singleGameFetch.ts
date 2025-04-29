import { useEffect, useState } from "react";
import { Game } from "../types/types";

const fetchGameDetails = (gameId: number) => {
  const [gameDetails, setGameDetails] = useState<Game | null>(null);

  const [artworkUrl, setArtworkUrl] = useState<string | null>(null);
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

        const gameDetailsResponse = await fetch(`/api/games`, {
          method: "POST",
          headers: {
            "Client-ID": import.meta.env.VITE_TWITCH_CLIENT_ID,
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "text/plain",
          },
          body: `fields *, artworks; logo; where id = ${gameId};`,
        });
        const gameData = await gameDetailsResponse.json();
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

        setLoading(false);
      } catch (error) {
        console.error("Error while fetching:", error);
        setLoading(false);
      }
    };

    getAccessToken();
  }, [gameId]);

  return { gameDetails, artworkUrl, loading };
};

export default fetchGameDetails;
