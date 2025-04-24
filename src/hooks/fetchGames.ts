import { GameSearchResult } from "../types/types";

const fetchGames = async (query: string): Promise<GameSearchResult[]> => {
  try {
    const tokenRes = await fetch("https://id.twitch.tv/oauth2/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: import.meta.env.VITE_TWITCH_CLIENT_ID,
        client_secret: import.meta.env.VITE_TWITCH_CLIENT_SECRET,
        grant_type: "client_credentials",
      }),
    });
    const { access_token } = await tokenRes.json();

    const res = await fetch("/api/games", {
      method: "POST",
      headers: {
        "Client-ID": import.meta.env.VITE_TWITCH_CLIENT_ID,
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "text/plain",
      },
      body: `search "${query}";  fields name, cover.image_id, rating;
  limit 30;
  where rating != null;`,
    });

    const data = await res.json();
    return data.filter((g: GameSearchResult) => g.rating !== 100);
  } catch (err) {
    console.error(err);
    return [];
  }
};

export default fetchGames;
