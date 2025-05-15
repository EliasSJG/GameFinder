import { useState } from "react";
import "./modal.scss";
import Button from "../button/button";
import { Game } from "../../types/types";
import NumberInput from "./numberInput/numberInput";

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
    //creates a const for rating and time
    const ratingValue = Number(rating);
    const timeValue = Number(time);
    //validation for the whole submit
    if (
      !review ||
      rating === "" ||
      ratingValue < 0 ||
      ratingValue > 100 ||
      timeValue < 1
    ) {
      setError("Please make sure all fields are filled correctly!");
      return;
    }
    //if succeded stores the users inputs
    onSubmit(review, ratingValue, timeValue);
    onClose();
  };

  //validation for the rating
  const handleRatingValidation = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    if (value === "") {
      setRating(value);
      return;
    }

    if (value.length > 1 && value.startsWith("0")) {
      return;
    }

    const numberValue = Number(value);
    if (numberValue >= 0 && numberValue <= 100 && /^\d+$/.test(value)) {
      setRating(value);
    }
  };

  //validation for the time
  const handleTimeValidation = (e: React.ChangeEvent<HTMLInputElement>) => {
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
          <NumberInput
            label="Rating (0-100): "
            value={rating}
            onChange={handleRatingValidation}
            maxLength={3}
          />
          <NumberInput
            label="Time to beat (hours): "
            value={time}
            onChange={handleTimeValidation}
            maxLength={4}
          />
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
