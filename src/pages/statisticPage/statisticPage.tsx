import { Link } from "react-router-dom";
import { useGameContext } from "../../context/gameContext";
import "./statisticPage.scss";
import { useState } from "react";
import Button from "../../components/button/button";

export default function StatisticPage() {
  const {
    playedGames,
    wishListGames,
    favoriteGames,
    favoriteCharacters,
    reviews,
    addFavoriteCharacter,
    removeFavoriteCharacter,
    isCharacterFavorited,
  } = useGameContext();

  const [selectedList, setSelectedList] = useState("played");
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [selectedGame, setSelectedGame] = useState<number | null>(null);

  const getGames = () => {
    switch (selectedList) {
      case "played":
        return playedGames;
      case "wishlist":
        return wishListGames;
      case "favorites":
        return favoriteGames;
      default:
        return [];
    }
  };

  const getListTitle = () => {
    switch (selectedList) {
      case "played":
        return "Played Games";
      case "wishlist":
        return "Wishlist Games";
      case "favorites":
        return "Favorite Games";
      default:
        return "";
    }
  };

  const handleClick = (list: string) => {
    setSelectedList(list);
  };

  const handleMouseEnter = (gameId: number) => {
    setSelectedGame(gameId);
    setOverlayVisible(true);
  };

  const handleMouseLeave = () => {
    setOverlayVisible(false);
    setSelectedGame(null);
  };

  return (
    <>
      <h1 className="text-center">Your Statistics</h1>
      <div className="general-statistics">
        <div>
          <h3>Games Played</h3>
          <h3>{playedGames.length}</h3>
        </div>
        <div>
          <h3>Total Hours Played</h3>
          <h3>0</h3>
        </div>
        <div>
          <h3>Most common theme/genre</h3>
          <h3>0</h3>
        </div>
      </div>

      <div className="games-links">
        <h3
          className={selectedList === "played" ? "active" : ""}
          onClick={() => handleClick("played")}
        >
          Played
        </h3>
        <h3
          className={selectedList === "wishlist" ? "active" : ""}
          onClick={() => handleClick("wishlist")}
        >
          Wishlist
        </h3>
        <h3
          className={selectedList === "favorites" ? "active" : ""}
          onClick={() => handleClick("favorites")}
        >
          Favorites
        </h3>
      </div>

      <h2 className="text-center">{getListTitle()}</h2>

      <div className="games-section">
        {getGames().map((game) => (
          <Link to={`/game/${game.id}`} key={game.id}>
            <div
              className="game-div"
              onMouseEnter={() => handleMouseEnter(game.id)}
              onMouseLeave={handleMouseLeave}
            >
              <img
                src={game.cover?.url ? game.cover.url : "default-image.jpg"}
                alt={game.name}
                className="type-image"
              />

              {overlayVisible && selectedGame === game.id && (
                <div className="overlay">
                  {reviews.has(game.id) && (
                    <div className="review-info">
                      <p>
                        <strong>Review:</strong> {reviews.get(game.id)?.review}
                      </p>
                      <p>
                        <strong>Rating:</strong> {reviews.get(game.id)?.rating}
                      </p>
                      <p>
                        <strong>Time to beat:</strong>{" "}
                        {reviews.get(game.id)?.timeToBeat} hours
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>

      {selectedList === "favorites" && favoriteCharacters.length > 0 && (
        <>
          <h2 className="text-center">Favorite Characters</h2>{" "}
          <div className="char-section">
            {favoriteCharacters.map((char) => (
              <div className="character-card" key={char.id}>
                <img
                  src={
                    char.mug_shot?.image_id
                      ? `https://images.igdb.com/igdb/image/upload/t_720p/${char.mug_shot.image_id}.jpg`
                      : "default-character.jpg"
                  }
                  alt={char.name}
                  className="character-image"
                />
                <h3>{char.name}</h3>
                <Button
                  onClick={() => {
                    if (isCharacterFavorited(char.id)) {
                      removeFavoriteCharacter(char.id);
                    } else {
                      addFavoriteCharacter(char);
                    }
                  }}
                  title={
                    isCharacterFavorited(char.id) ? "Unfavorite" : "Favorite"
                  }
                />
                <p>{char.description}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}
