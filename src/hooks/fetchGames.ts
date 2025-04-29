import { Game, Character } from "../types/types";

const getAccessToken = async (): Promise<string> => {
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
  return access_token;
};

const fetchSearchResults = async (
  query: string
): Promise<{
  games: Game[];
  characters: Character[];
}> => {
  try {
    const token = await getAccessToken();

    const headers = {
      "Client-ID": import.meta.env.VITE_TWITCH_CLIENT_ID,
      Authorization: `Bearer ${token}`,
      "Content-Type": "text/plain",
    };

    const bodyConfigs = {
      games: `search "${query}"; fields name, cover.image_id, rating; limit 30; where rating != null;`,
      characters: `search "${query}"; fields *, mug_shot.image_id;`,
      companies: `search "${query}"; fields name, logo.image_id; limit 20;`,
    };

    const [gamesRes, charactersRes] = await Promise.all([
      fetch("/api/games", { method: "POST", headers, body: bodyConfigs.games }),
      fetch("/api/characters", {
        method: "POST",
        headers,
        body: bodyConfigs.characters,
      }),
      fetch("/api/companies", {
        method: "POST",
        headers,
        body: bodyConfigs.companies,
      }),
    ]);

    const [gamesData, charactersData] = await Promise.all([
      gamesRes.json(),
      charactersRes.json(),
    ]);

    return {
      games: gamesData,
      characters: charactersData,
    };
  } catch (err) {
    console.error(err);
    return { games: [], characters: [] };
  }
};

export default fetchSearchResults;
