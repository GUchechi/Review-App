import { createContext, useState, useEffect, ReactElement } from "react";

type ReviewItem = {
  id: number;
  rating: number;
  text: string;
};


type ReviewContextType = {
  review: ReviewItem[ReviewDataTypes[] = [
  {
    id: 1,
    rating: 10,
    text: "This is feedback item 1",
  },
  {
    id: 2,
    rating: 9,
    text: "This is feedback item 2",
  },
  {
    id: 3,
    rating: 7,
    text: "This is feedback item 3",
  },
  {
    id: 4,
    rating: 8,
    text: "This is feedback item 4",
  },
  {
    id: 5,
    rating: 5,
    text: "This is feedback item 5",
  },
];
];
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
    item: { id: 0, rating: 0, text: "" },
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
        item: { id: 0, rating: 0, text: "" },
        edit: false,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Delete Review
  const deleteReview = async (id: number) => {
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
        updateReview,
        deleteReview,
      }}
    >
      {children}
    </ReviewContext.Provider>
  );
};

export default ReviewContext;
