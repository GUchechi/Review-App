import { ReactElement, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReviewContext from "../../context/ReviewContext";
import Spinner from "../shared/Spinner/Spinner";
import ReviewItem from "../ReviewItem/ReviewItem";

const ReviewList = () => {
  const { review, isLoading } = useContext(ReviewContext);

  if (!isLoading && (!review || review.length === 0)) {
    return <p>There is no Review</p>;
  }

  return isLoading ? (
    <Spinner />
  ) : (
    <div className="feedback-list">
      <AnimatePresence>
        {review.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ReviewItem key={item.id} item={item} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ReviewList;
