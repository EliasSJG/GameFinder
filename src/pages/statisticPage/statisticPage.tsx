import { Link } from "react-router-dom";
import { useGameContext } from "../../context/gameContext";
import "./statisticPage.scss";
import { useState } from "react";

export default function StatisticPage() {
  const { playedGames, wishListGames, favoriteGames } = useGameContext();
  const [selectedList, setSelectedList] = useState("played");
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

  const handleClick = (list: string) => {
    setSelectedList(list);
  };
  return (
    <>
      <h1>Your Statistics</h1>
      <div className="general-statistics">
        <div>
          <h2>Games Played</h2>
          <h2>{playedGames.length}</h2>
        </div>
        <div>
          <h2>Total Hours Played</h2>
          <h2>0</h2>
        </div>
        <div>
          <h2>Most common theme/genre</h2>
          <h2>0</h2>
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

      <div className="games-section">
        {getGames().map((game) => (
          <Link to={`/game/${game.id}`} key={game.id}>
            <div>
              <img
                src={game.cover?.url ? game.cover.url : "default-image.jpg"}
                alt={game.name}
                className="type-image"
              />
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
