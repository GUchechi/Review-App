import { useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReviewContext from "../../context/ReviewContext";
import Spinner from "../shared/Spinner/Spinner";
import ReviewItem from "../ReviewItem/ReviewItem";

type ReviewItemProps = {
  id: number;
  rating: number;
  text: string;
};

const ReviewList = () => {
  const { review, isLoading } = useContext(ReviewContext);

  if (!isLoading && (!review || review.length === 0)) {
    return <p>There are no Reviews</p>;
  }

  return isLoading ? (
    <Spinner />
  ) : (
    <div className="review-list">
      <AnimatePresence>
        {review.map((item: ReviewItemProps) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ReviewItem item={item} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ReviewList;
