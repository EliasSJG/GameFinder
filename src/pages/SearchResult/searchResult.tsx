import { Link, useLocation } from "react-router-dom";
import { Game, Character } from "../../types/types";
import "./_searchResult.scss";

export default function SearchResultPage() {
  const location = useLocation();

  const { games, characters } = location.state?.results || {
    games: [],
    characters: [],
  };

  const query = location.state?.query || "";
  const baseImgUrl = "https://images.igdb.com/igdb/image/upload/t_cover_big/";

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
                    className="type-image"
                  />
                </Link>
              ))}
            </div>
          )}

          {characters.length > 0 && (
            <>
              <h2 className="text-center">Characters</h2>
              <div className="searched-holder">
                {characters.map((character: Character) => (
                  <div key={character.id} className="character-card">
                    {character.mug_shot ? (
                      <img
                        src={`https://images.igdb.com/igdb/image/upload/t_thumb/${character.mug_shot.image_id}.jpg`}
                        alt={character.name}
                        className="type-image"
                      />
                    ) : (
                      <p className="text-center">No image available</p>
                    )}
                    <h3 className="text-center">{character.name}</h3>
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
