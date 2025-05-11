import "./_detailPage.scss";
import { useParams } from "react-router-dom";
import usefetchGameDetails from "../../hooks/useGameFetch";
import Button from "../../components/button/button";
import { useGameContext } from "../../context/gameContext";
import { useState } from "react";
import Toast from "../../components/toast/toast";

export default function DetailPage() {
  const { gameId } = useParams();
  const {
    addPlayedGame,
    removePlayedGame,
    playedGames,
    addFavoriteGame,
    removeFavoritesGame,
    favoriteGames,
    addWishListGame,
    removeWishListGame,
    wishListGames,
  } = useGameContext();

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

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
  if (!gameDetails) return null;

  const isPlayed = playedGames.some((g) => g.id === GameId);
  const isFavorite = favoriteGames.some((g) => g.id === GameId);
  const isWishlisted = wishListGames.some((g) => g.id === GameId);

  const gameToToggle = {
    ...gameDetails,
    cover: {
      id: gameDetails.cover.id,
      url: cover || "",
      image_id: gameDetails.cover.image_id,
    },
  };

  const handleToggleGameState = (
    isActive: boolean,
    addFn: (game: typeof gameToToggle) => void,
    removeFn: (id: number) => void,
    addMsg: string,
    removeMsg: string
  ) => {
    isActive ? removeFn(GameId) : addFn(gameToToggle);
    showToast(isActive ? removeMsg : addMsg);
  };

  return (
    <>
      <div>
        <div className="detail-hero">
          {artworkUrl ? (
            <img className="hero-img" src={artworkUrl} alt={gameDetails.name} />
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
            <h3>Tell us your experience!</h3>
            <div className="user-experience">
              <Button
                title={
                  isPlayed ? "Remove from played list" : "Add to played list"
                }
                onClick={() =>
                  handleToggleGameState(
                    isPlayed,
                    addPlayedGame,
                    removePlayedGame,
                    "Added to played list in the statistics page",
                    "Removed from played list in the statistics page"
                  )
                }
              />
              <Button
                title={
                  isFavorite ? "Remove from favorites" : "Add to favorites"
                }
                onClick={() =>
                  handleToggleGameState(
                    isFavorite,
                    addFavoriteGame,
                    removeFavoritesGame,
                    "Added to favorites in the statistics page",
                    "Removed from favorites in the statistics page"
                  )
                }
              />
              <Button
                title={
                  isWishlisted ? "Remove from wishlist" : "Add to wishlist"
                }
                onClick={() =>
                  handleToggleGameState(
                    isWishlisted,
                    addWishListGame,
                    removeWishListGame,
                    "Added to wishlist in the statistics page",
                    "Removed from wishlist in the statistics page"
                  )
                }
              />
              <Button onClick={() => {}} title="Write a review" />
              <Button onClick={() => {}} title="Time to beat" />
            </div>
          </div>
        </div>
      </div>
      {toastMessage && <Toast message={toastMessage} />}
    </>
  );
}
