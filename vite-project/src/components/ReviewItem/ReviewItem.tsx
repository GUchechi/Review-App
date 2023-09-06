// import { useContext } from "react";
import { FaEdit, FaTimes } from "react-icons/fa";
import Card from "../shared/Card/Card";
import './ReviewItem.css'

type ReviewItemProps = {
  id: number;
  rating: number;
  text: string;
};

const ReviewItem = ({ item }: { item: ReviewItemProps }) => {
  return (
    <Card>
      <div className="num-display">{item.rating}</div>
      <button className="close">
        <FaTimes color="purple" />
      </button>
      <button className="edit">
        <FaEdit color="purple" />
      </button>
      <div className="text-display">{item.text}</div>
    </Card>
  );
};

export default ReviewItem;
