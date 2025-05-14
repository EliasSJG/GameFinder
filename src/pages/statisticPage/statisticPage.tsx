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
  const [overlay, setOverlay] = useState(false);
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
  const getAverageUserRating = () => {
    if (reviews.size === 0) return 0;

    let totalRating = 0;
    let count = 0;

    reviews.forEach((review) => {
      if (typeof review.rating === "number") {
        totalRating += review.rating;
        count++;
      }
    });

    return count === 0 ? 0 : (totalRating / count).toFixed(1);
  };

  const handleClick = (list: string) => {
    setSelectedList(list);
  };

  const handleMouseHover = (gameId: number) => {
    setSelectedGame(gameId);
    setOverlay(true);
  };

  const handleMouseLeaveUnHover = () => {
    setOverlay(false);
    setSelectedGame(null);
  };
  const getTotalHours = () => {
    let total = 0;
    reviews.forEach((review) => {
      total += review.timeToBeat;
    });
    return total;
  };

  const getAverageHours = () => {
    if (reviews.size === 0) return 0;

    return (getTotalHours() / reviews.size).toFixed(1);
  };

  const getAverageIGDBRating = () => {
    if (playedGames.length === 0) return 0;
    const total = playedGames.reduce(
      (sum, game) => sum + (game.rating || 0),
      0
    );
    return (total / playedGames.length).toFixed(1);
  };

  return (
    <>
      <h3 className="text-center statistics">Your Statistics</h3>
      <div className="general-statistics">
        <div>
          <h4>Games Played:</h4>
          <h4>{playedGames.length}</h4>
        </div>
        <div>
          <h4>Total Hours Played:</h4>
          <h4>{getTotalHours()}</h4>
        </div>

        <div>
          <h4>Average Hours:</h4>
          <h4>{getAverageHours()}</h4>
        </div>

        <div>
          <h4>Average IGDB rating:</h4>
          <h4>{getAverageIGDBRating()}</h4>
        </div>
        <div>
          <h4>Average user rating:</h4>
          <h4>{getAverageUserRating()}</h4>
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

      <h3 className="text-center statistics">{getListTitle()}</h3>

      <div className="games-section">
        {getGames().map((game) => (
          <Link to={`/game/${game.id}`} key={game.id}>
            <div
              className="game-div"
              onMouseEnter={() => handleMouseHover(game.id)}
              onMouseLeave={handleMouseLeaveUnHover}
            >
              <img
                src={game.cover?.url ? game.cover.url : "default-image.jpg"}
                alt={game.name}
                className="type-image"
              />

              {overlay && selectedGame === game.id && (
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
          <h3 className="text-center statistics">Favorite Characters</h3>
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
