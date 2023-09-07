import { useContext } from "react";
import "./ReviewStats.css";
import ReviewContext from "../../context/ReviewContext";


const ReviewStats = () => {
  const {review} = useContext(ReviewContext)

  // Calculate Ratings Average
  let ratingAverage = review.reduce((acc,cur) => {
    return acc + cur.rating;
  }, 0) / review.length;

  ratingAverage = ratingAverage.toFixed(0).replace(/[.,]0$/, "");


  return (
    <div className="review-stats">
      <h4>{review.length} Reviews</h4>
      <h4>Average Rating: {isNaN(ratingAverage) ? 0 : ratingAverage}</h4>
    </div>
  );
};

export default ReviewStats;
