import { fetchFromIGDB } from "../utilities/fetchAPI";

const fetchSearchResults = async (query: string) => {
  try {
    const bodyConfigs = {
      games: `search "${query}"; fields name, cover.image_id, rating; limit 30; where rating != null;`,
      characters: `search "${query}"; fields *, mug_shot.image_id;`,
    };

    const [gamesData, charactersData] = await Promise.all([
      fetchFromIGDB("/api/games", bodyConfigs.games),
      fetchFromIGDB("/api/characters", bodyConfigs.characters),
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
