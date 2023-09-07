// import { useContext } from "react";
import { FaEdit, FaTimes } from "react-icons/fa";
import Card from "../shared/Card/Card";
import "./ReviewItem.css";
import { useContext, useState } from "react";
import ReviewContext from "../../context/ReviewContext";
import Modal from "../Modal/Modal";

type ReviewItemProps = {
  id: number;
  rating: number;
  text: string;
};

const ReviewItem = ({ item }: { item: ReviewItemProps }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { editReview, deleteReview } = useContext(ReviewContext);

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    deleteReview(item.id);
    setIsDeleteModalOpen(false);
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
  };

  return (
    <Card>
      <div className="num-display">{item.rating}</div>
      <button className="close" onClick={handleDeleteClick}>
        <FaTimes color="purple" />
      </button>
      <button className="edit" onClick={() => editReview(item)}>
        <FaEdit color="purple" />
      </button>
      <div className="text-display">{item.text}</div>

      <Modal
        isOpen={isDeleteModalOpen}
        message="Are you sure you want to delete this review?"
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </Card>
  );
};

export default ReviewItem;
