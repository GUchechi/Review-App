import RatingSelect from "../RatingSelect/RatingSelect";
import Card from "../shared/Card/Card";
import './FeedbackForm.css'

const FeedbackForm = () => {
  return (
    <Card>
      <form>
        <h2>How would you rate your service with us?</h2>
        <RatingSelect />
        <div className="input-group">
          <input
            // onChange={handleTextChange}
            type="text"
            placeholder="Write a review"
            // value={text}
          />
          {/* <Button type="submit" isDisabled={btnDisabled}>
            Send
          </Button> */}
        </div>
        {/* {message && <div className="message">{message}</div>} */}
      </form>
    </Card>
  );
};

export default FeedbackForm;
