import "./_detailPage.scss";
import { useParams } from "react-router-dom";

import fetchGameDetails from "../../hooks/singleGameFetch";

export default function DetailPage() {
  const { gameId } = useParams();

  if (!gameId) return <div>Game Not Found</div>;

  const GameId = Number(gameId);

  const { gameDetails, artworkUrl, loading } = fetchGameDetails(GameId);

  if (loading) return <div>Loading...</div>;

  return (
    <>
      {gameDetails && (
        <div>
          <div className="detail-hero">
            {artworkUrl ? (
              <img
                className="hero-img"
                src={artworkUrl}
                alt={gameDetails.name}
              />
            ) : (
              <p>No artwork available</p>
            )}
            <div className="text-hero">
              <h3>{gameDetails.name}</h3>
              <p>{gameDetails.summary}</p>
            </div>
          </div>

          <div className="detail-second-page">
            <div className="user-experience">
              <h2>Here user will give their ratings</h2>
            </div>

            {/* gives me ids for now. Probably gonna have to connect to another endpoint to get the actual strings */}
            <div className="quick-info">
              <h2>Quick Info</h2>
              <ul>
                <li>Category: {gameDetails.category}</li>
                <li>Genre: {gameDetails.genres?.join(", ")}</li>
                <li>Themes: {gameDetails.themes?.join(", ")}</li>
                <li>Game rating: {gameDetails.rating}</li>
                <li>Age rating: {gameDetails.age_ratings}</li>
                <li>First released date: {gameDetails.release_dates}</li>
                <li>Game type: {gameDetails.game_type}</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
