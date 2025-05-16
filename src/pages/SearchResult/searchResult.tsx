import { Link, useLocation } from "react-router-dom";
import { Game, Character } from "../../types/types";
import "./_searchResult.scss";
import Button from "../../components/button/button";
import { useGameContext } from "../../context/gameContext";

export default function SearchResultPage() {
  //useLocation which contains an object about the url
  const location = useLocation();
  //extracts the games and character from the location state

  const { games, characters } = (location.state?.results as {
    games: Game[];
    characters: Character[];
  }) || { games: [], characters: [] };

  const query: string = location.state?.query || "";

  const baseImgUrl = "https://images.igdb.com/igdb/image/upload/t_cover_big/";

  const { addFaveChar, removeFaveChar, faveChar } = useGameContext();

  //checks if character is favorited
  const isCharFave = (id: number) => faveChar.some((c) => c.id === id);

  return (
    <div>
      <h1 className="text-center">{query}</h1>

      {games.length === 0 && characters.length === 0 ? (
        <h2 className="text-center">No results were found for {query}</h2>
      ) : (
        <>
          <h2 className="text-center">Games</h2>
          {games.length > 0 && (
            <div className="searched-holder">
              {games.map((game: Game) => (
                <Link key={game.id} to={`/game/${game.id}`}>
                  <img
                    src={
                      game.cover
                        ? `${baseImgUrl}${game.cover.image_id}.jpg`
                        : "default-image.jpg"
                    }
                    alt={game.name}
                    className="game-img"
                  />
                </Link>
              ))}
            </div>
          )}

          {characters.length > 0 && (
            <>
              <h2 className="text-center seached-type">Characters</h2>
              <div className="searched-holder">
                {characters.map((character: Character) => (
                  <div key={character.id} className="character-card">
                    {character.mug_shot ? (
                      <img
                        src={`https://images.igdb.com/igdb/image/upload/t_720p/${character.mug_shot.image_id}.jpg`}
                        alt={character.name}
                      />
                    ) : (
                      <p className="text-center">No image available</p>
                    )}
                    <h3 className="text-center">{character.name}</h3>
                    <Button
                      onClick={() => {
                        if (isCharFave(character.id)) {
                          removeFaveChar(character.id);
                        } else {
                          addFaveChar(character);
                        }
                      }}
                      title={
                        isCharFave(character.id) ? "Unfavorite" : "Favorite"
                      }
                    />
                    <p>{character.description}</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
