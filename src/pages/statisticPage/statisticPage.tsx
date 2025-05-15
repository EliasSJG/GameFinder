import { Link } from "react-router-dom";
import { useGameContext } from "../../context/gameContext";
import "./statisticPage.scss";
import { useState } from "react";
import Button from "../../components/button/button";
import { Game } from "../../types/types";
import GeneralStatistics from "./generalStatistics/generalStatistics";

export default function StatisticPage() {
  const {
    playedGames,
    wishlistGames,
    faveGames,
    faveChar,
    reviews,
    addFaveChar,
    removeFaveChar,
    isCharFave,
  } = useGameContext();

  const [selectedList, setSelectedList] = useState<
    "played" | "wishlist" | "favorites"
  >("played");
  const [overlay, setOverlay] = useState(false);
  const [selectedGame, setSelectedGame] = useState<number | null>(null);

  const lists: {
    [key in "played" | "wishlist" | "favorites"]: {
      title: string;
      games: Game[];
    };
  } = {
    played: {
      title: "Played Games",
      games: playedGames,
    },
    wishlist: {
      title: "Wishlist Games",
      games: wishlistGames,
    },
    favorites: {
      title: "Favorite Games",
      games: faveGames,
    },
  };

  const currentList = lists[selectedList];

  const handleClick = (list: "played" | "wishlist" | "favorites") => {
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

  const getGames = () => currentList.games;

  return (
    <>
      <h3 className="text-center statistics">Your Statistics</h3>

      <GeneralStatistics />
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

      <h3 className="text-center statistics">{currentList.title}</h3>

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
                className="game-img-stats"
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

      {selectedList === "favorites" && faveChar.length > 0 && (
        <>
          <h3 className="text-center statistics">Favorite Characters</h3>
          <div className="char-section">
            {faveChar.map((char) => (
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
                    if (isCharFave(char.id)) {
                      removeFaveChar(char.id);
                    } else {
                      addFaveChar(char);
                    }
                  }}
                  title={isCharFave(char.id) ? "Unfavorite" : "Favorite"}
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
