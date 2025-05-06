import "./_detailPage.scss";
import { useParams } from "react-router-dom";
import fetchGameDetails from "../../hooks/singleGameFetch";
import Button from "../../components/button/button";

export default function DetailPage() {
  const { gameId } = useParams();
  if (!gameId) return <div>Game Not Found</div>;
  const GameId = Number(gameId);
  const {
    gameDetails,
    artworkUrl,
    genreNames,
    themeNames,
    releaseDate,
    loading,
  } = fetchGameDetails(GameId);

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
            <div className="quick-info">
              <h2>Quick Info</h2>
              <ul>
                <li>Genre: {genreNames.join(", ") || "Not Available"}</li>
                <li>Themes: {themeNames.join(", ") || "Not Available"}</li>
                <li>Game rating: {Math.round(gameDetails.rating)}</li>
                <li>First released date: {releaseDate}</li>
              </ul>
            </div>

            <div className="user-experience-div">
              <h3>Tell us youre experience!</h3>
              <div className="user-experience">
                <Button title="Add to played list" />
                <Button title="Add to favorites" />
                <Button title="Add to wishlist" />
                <Button title="Write a review" />
                <Button title="Time to beat" />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
