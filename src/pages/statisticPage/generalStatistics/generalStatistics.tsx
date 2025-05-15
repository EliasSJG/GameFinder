import { useGameContext } from "../../../context/gameContext";
import "./generalStatistics.scss";
export default function GeneralStatistics() {
  const { playedGames, reviews } = useGameContext();

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
  );
}
