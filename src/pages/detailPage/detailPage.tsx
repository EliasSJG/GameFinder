import { useState } from "react";
import Button from "../../components/button/button";
import Toast from "../../components/toast/toast";
import usefetchGameDetails from "../../hooks/useGameFetch";
import { useGameContext } from "../../context/gameContext";
import { useParams } from "react-router-dom";
import Modal from "../../components/modal/modal";
import "./_detailPage.scss";

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
    addReview,
  } = useGameContext();

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleOpenReviewModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseReviewModal = () => {
    setIsModalOpen(false);
  };

  const handleReviewSubmit = (review: string, rating: number, time: number) => {
    console.log("Review Submitted:", review, rating, time);

    addPlayedGame(gameToToggle);
    addReview(GameId, review, rating, time);

    showToast("Added to played list with your review");
    setIsModalOpen(false);
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
                onClick={() => {
                  if (isPlayed) {
                    handleToggleGameState(
                      true,
                      addPlayedGame,
                      removePlayedGame,
                      "Added to played list",
                      "Removed from played list"
                    );
                  } else {
                    handleOpenReviewModal();
                  }
                }}
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
                    "Added to favorites",
                    "Removed from favorites"
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
                    "Added to wishlist",
                    "Removed from wishlist"
                  )
                }
              />
            </div>
          </div>
        </div>
      </div>

      {toastMessage && <Toast message={toastMessage} />}

      {isModalOpen && (
        <Modal
          gameDetails={gameDetails}
          onClose={handleCloseReviewModal}
          onSubmit={handleReviewSubmit}
        />
      )}
    </>
  );
}
