import { useState } from "react";
import "./modal.scss";
import Button from "../button/button";
import { Game } from "../../types/types";

type ModalProps = {
  gameDetails: Game;
  onClose: () => void;
  onSubmit: (review: string, rating: number, time: number) => void;
};

export default function Modal({ gameDetails, onClose, onSubmit }: ModalProps) {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = () => {
    const ratingValue = Number(rating);
    const timeValue = Number(time);

    if (
      !review ||
      rating === "" ||
      ratingValue < 0 ||
      ratingValue > 10 ||
      timeValue < 1
    ) {
      setError("Please make sure all fields are filled correctly!");
      return;
    }

    onSubmit(review, ratingValue, timeValue);
    onClose();
  };

  const handleRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/^0+/, "");

    if (value === "" || (Number(value) >= 0 && Number(value) <= 10)) {
      setRating(value);
    }
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/^0+/, "");

    if (value === "" || (Number(value) >= 1 && value.length <= 4)) {
      setTime(value);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {gameDetails ? (
          <h3>Write a Review for {gameDetails.name}</h3>
        ) : (
          <h3>Loading...</h3>
        )}
        <textarea
          placeholder="Write your review here"
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />
        <div className="number-input-div">
          <div>
            <label>Rating (0-10): </label>
            <input
              type="text"
              value={rating}
              onChange={handleRatingChange}
              maxLength={2}
            />
          </div>
          <div>
            <label>Time to beat (hours): </label>
            <input
              type="text"
              value={time}
              onChange={handleTimeChange}
              maxLength={4}
            />
          </div>
        </div>
        {error && <p className="error-message">{error}</p>}
        <div>
          <Button onClick={handleSubmit} title="Submit" />
          <Button onClick={onClose} title="Cancel" />
        </div>
      </div>
    </div>
  );
}
