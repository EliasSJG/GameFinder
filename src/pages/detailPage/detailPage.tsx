import "./_detailPage.scss";
import { useParams } from "react-router-dom";
import usefetchGameDetails from "../../hooks/useGameFetch";
import Button from "../../components/button/button";
import { useGameContext } from "../../context/gameContext";

export default function DetailPage() {
  const { gameId } = useParams();
  const { addPlayedGame, removePlayedGame, playedGames } = useGameContext();
  if (!gameId) return <div>Game Not Found</div>;
  const GameId = Number(gameId);
  const {
    gameDetails,
    artworkUrl,
    genreNames,
    themeNames,
    releaseDate,
    loading,
    cover,
  } = usefetchGameDetails(GameId);

  if (loading) return <div>Loading...</div>;

  const isPlayed = playedGames.some((game) => game.id === GameId);

  const handleTogglePlayed = () => {
    if (!gameDetails) return;

    const gameToToggle = {
      ...gameDetails,
      cover: {
        id: gameDetails.cover.id,
        url: cover || "",
        image_id: gameDetails.cover.image_id,
      },
    };

    if (isPlayed) {
      removePlayedGame(GameId);
    } else {
      addPlayedGame(gameToToggle);
    }
  };

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
                <Button
                  title={
                    isPlayed ? "Remove from played list" : "Add to played list"
                  }
                  onClick={handleTogglePlayed}
                />

                <Button onClick={() => {}} title="Add to favorites" />

                <Button onClick={() => {}} title="Add to wishlist" />
                <Button onClick={() => {}} title="Write a review" />
                <Button onClick={() => {}} title="Time to beat" />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
