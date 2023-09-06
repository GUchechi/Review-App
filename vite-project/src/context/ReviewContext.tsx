import { createContext, useState, useEffect, ReactElement } from "react";

type ReviewItem = {
  id: number;
  rating: number;
  text: string;
};

type ReviewContextType = {
  review: ReviewItem[];
  isLoading: boolean;
  addReview: (newReview: ReviewItem) => Promise<void>;
};

const ReviewContext = createContext<ReviewContextType | undefined>(undefined);

type ChildrenType = { children?: ReactElement | ReactElement[] };

export const ReviewProvider = ({ children }: ChildrenType): ReactElement => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [review, setReview] = useState<ReviewItem[]>([]);

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
      console.error(error);
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
      console.error("Error adding review:", error);
    }
  };

  return (
    <ReviewContext.Provider value={{ review, isLoading, addReview }}>
      {children}
    </ReviewContext.Provider>
  );
};

export default ReviewContext;
