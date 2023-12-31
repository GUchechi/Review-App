import { ChangeEvent, useContext, useEffect, useState } from "react";
import RatingSelect from "../RatingSelect/RatingSelect";
import Button from "../shared/Button/Button";
import Card from "../shared/Card/Card";
import "./ReviewForm.css";
import ReviewContext from "../../context/ReviewContext";

const ReviewForm = () => {
  const { addReview, reviewEdit, updateReview } = useContext(ReviewContext);
  const [text, setText] = useState<string>("");
  const [rating, setRating] = useState<number>();
  const [btnDisabled, setBtnDisabled] = useState<boolean>(true);
  const [message, setMessage] = useState<string | null>("");

  // Form Validation
  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value;
    if (newText === "") {
      setBtnDisabled(true);
      setMessage(null);
    } else if (newText !== "" && text.trim().length <= 10) {
      setMessage("Text must be at least 10 characters");
      setBtnDisabled(true);
    } else {
      setMessage(null);
      setBtnDisabled(false);
    }
    setText(newText);
  };

  // handleSubmit
  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (text.trim().length > 10) {
      const newReview = { text, rating };

      if (reviewEdit.edit === true) {
        updateReview(reviewEdit.item.id, newReview);
      } else {
        addReview(newReview);
      }

      setText("");
    }
  };

  // EditReview
  useEffect(() => {
    if (reviewEdit.edit === true) {
      setBtnDisabled(false);
      setText(reviewEdit.item.text);
      setRating(reviewEdit.item.rating);
    }
  }, [reviewEdit]);

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h2>How would you rate your service with us?</h2>
        <RatingSelect select={(rating) => setRating(rating)} />
        <div className="input-group">
          <input
            onChange={handleTextChange}
            type="text"
            placeholder="Write a review"
            value={text}
          />
          <Button type="submit" isDisabled={btnDisabled}>
            Send
          </Button>
        </div>
        {message && <div className="message">{message}</div>}
      </form>
    </Card>
  );
};

export default ReviewForm;
