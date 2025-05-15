import { useState } from "react";
import Button from "../../components/button/button";
import Toast from "../../components/toast/toast";
import usefetchGameDetails from "../../hooks/useGameFetch";
import { useGameContext } from "../../context/gameContext";
import { useParams } from "react-router-dom";
import Modal from "../../components/modal/modal";
import "./_detailPage.scss";

export default function DetailPage() {
  //extracts the id from the url
  const { gameId } = useParams();
  //gets the users function and data with the context
  const {
    addPlayedGame,
    removePlayedGame,
    playedGames,
    addFaveGame,
    removeFaveGame,
    faveGames,
    addWishListGame,
    removeWishListGame,
    wishlistGames,
    addReview,
  } = useGameContext();

  const [toast, setToast] = useState<string | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);

  // creates the function to show the toast with a message and time limit before it dissapears

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  if (!gameId) return <div>Game Not Found</div>;

  //Gets the game id and uses the hook to get the fields about the game
  const GameId = Number(gameId);

  const { game, artworkUrl, genres, themes, releaseDate, loading, cover } =
    usefetchGameDetails(GameId);

  if (loading) return <div>Loading...</div>;
  if (!game) return null;

  //checks if the game is in the list to change the users desicion for example, unfavorite, favorite
  const isPlayed = playedGames.some((g) => g.id === GameId);
  const isFavorite = faveGames.some((g) => g.id === GameId);
  const isWishlisted = wishlistGames.some((g) => g.id === GameId);

  //creates a game object with cover info
  const gamesCover = {
    ...game,
    cover: {
      id: game.cover.id,
      url: cover || "",
      image_id: game.cover.image_id,
    },
  };

  //handles the visual when a user clicks a button to add game to a list
  const handleUsersVisualChoiceToggle = (
    isActive: boolean,
    addFn: (game: typeof gamesCover) => void,
    removeFunction: (id: number) => void,
    addMessage: string,
    removeMessage: string
  ) => {
    isActive ? removeFunction(GameId) : addFn(gamesCover);
    showToast(isActive ? removeMessage : addMessage);
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  //handles the the review submit and adds it to the played list and stores reviews
  const handleReviewSubmit = (review: string, rating: number, time: number) => {
    addPlayedGame(gamesCover);
    addReview(GameId, review, rating, time);
    showToast("Added to played list with your review");
    setModalOpen(false);
  };

  return (
    <>
      <div>
        <div className="detail-hero">
          {artworkUrl ? (
            <img className="hero-img" src={artworkUrl} alt={game.name} />
          ) : (
            <p>No artwork available</p>
          )}
          <div className="text-hero">
            <h3>{game.name}</h3>
            <p>{game.summary}</p>
          </div>
        </div>

        <div className="detail-second-page">
          <div className="quick-info">
            <h2>Quick Info</h2>
            <ul>
              <li>Genre: {genres.join(", ") || "Not Available"}</li>
              <li>Themes: {themes.join(", ") || "Not Available"}</li>
              <li>Game rating: {Math.round(game.rating)}</li>
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
                    handleUsersVisualChoiceToggle(
                      true,
                      addPlayedGame,
                      removePlayedGame,
                      "Added to played list",
                      "Removed from played list"
                    );
                  } else {
                    handleOpenModal();
                  }
                }}
              />

              <Button
                title={
                  isFavorite ? "Remove from favorites" : "Add to favorites"
                }
                onClick={() =>
                  handleUsersVisualChoiceToggle(
                    isFavorite,
                    addFaveGame,
                    removeFaveGame,
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
                  handleUsersVisualChoiceToggle(
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

      {toast && <Toast message={toast} />}

      {isModalOpen && (
        <Modal
          gameDetails={game}
          onClose={handleCloseModal}
          onSubmit={handleReviewSubmit}
        />
      )}
    </>
  );
}
