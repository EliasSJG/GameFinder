import { fetchFromIGDB } from "../utilities/fetchAPI";
import { Game, Character } from "../types/types";

const fetchSearchResults = async (query: string) => {
  try {
    //this is to search on characters and games. We grab the fields we want here depending on if its a game or character
    const bodyConfigs = {
      games: `search "${query}"; fields name, cover.image_id, rating; limit 30; where rating != null;`,
      characters: `search "${query}"; fields *, mug_shot.image_id, description;`,
    };
    //stores the data after we have fetched them at the same time
    const [gamesData, charactersData] = await Promise.all([
      fetchFromIGDB<Game[]>("/api/games", bodyConfigs.games),
      fetchFromIGDB<Character[]>("/api/characters", bodyConfigs.characters),
    ]);
    //after getting the characters and games we return them into an object
    return {
      games: gamesData,
      characters: charactersData,
    };
  } catch (err) {
    console.error(err);
    //returns an empty array if failing to catch
    return { games: [], characters: [] };
  }
};

export default fetchSearchResults;
