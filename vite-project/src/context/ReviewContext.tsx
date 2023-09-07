import { createContext, useState, useEffect, ReactElement } from "react";

type ReviewItem = {
  id: number;
  rating: number;
  text: string;
};

type ReviewContextType = {
  review: ReviewItem[];
  reviewEdit: { item: ReviewItem; edit: boolean };
  isLoading: boolean;
  error: string | null;
  editReview: (item: ReviewItem) => void;
  addReview: (newReview: ReviewItem) => Promise<void>;
  updateReview: (id: number, updItem: ReviewItem) => void;
  deleteReview: (id: number) => void;
};

const ReviewContext = createContext<ReviewContextType | undefined>(undefined);

type ChildrenType = { children?: ReactElement | ReactElement[] };

export const ReviewProvider = ({ children }: ChildrenType): ReactElement => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [review, setReview] = useState<ReviewItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [reviewEdit, setReviewEdit] = useState({
    item: {},
    edit: false,
  });

  // Fetch review
  useEffect(() => {
    fetchReview();
  }, []);

  const fetchReview = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/review?_sort=id&_order=desc`
      );
      const data: ReviewItem[] = await response.json();
      setReview(data);
      setIsLoading(false);
    } catch (error) {
      setError(error as string);
    }
  };

  //AddReview
  const addReview = async (newReview: ReviewItem) => {
    try {
      const response = await fetch(
        `http://localhost:3000/review?_sort=id&_order=desc`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newReview),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add a review");
      }

      const data: ReviewItem = await response.json();

      setReview([data, ...review]);
    } catch (error) {
      console.error(error as string);
    }
  };

  // editReview
  const editReview = (item: ReviewItem) => {
    setReviewEdit({
      item,
      edit: true,
    });
  };

  // Update Review Item
  const updateReview = async (id: number, updItem: ReviewItem) => {
    try {
      const response = await fetch(`http://localhost:3000/review/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updItem),
      });

      const data = await response.json();

      // Note: no need to spread data and item
      setReview(review.map((item) => (item.id === id ? data : item)));

      // FIX: this fixes being able to add a review after editing
      setReviewEdit({
        item: {},
        edit: false,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Delete Review
  const deleteReview = async (id: number) => {
    if (window.confirm("Are you sure you want to delete?")) {
      try {
        const response = await fetch(`http://localhost:3000/review/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Failed to delete the review");
        }

        setReview(review.filter((item) => item.id !== id));
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <ReviewContext.Provider
      value={{
        review,
        error,
        isLoading,
        addReview,
        reviewEdit,
        editReview,
        setReviewEdit,
        updateReview,
        deleteReview,
      }}
    >
      {children}
    </ReviewContext.Provider>
  );
};

export default ReviewContext;
