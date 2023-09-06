import { createContext, useState, useEffect, ReactElement } from "react";

type FeedbackItem = {
  id: number;
  rating: number;
  text: string;
};

type FeedbackContextType = {
  feedback: FeedbackItem[];
  isLoading: boolean;
  addFeedback: (newFeedback: FeedbackItem) => Promise<void>;
};

const FeedbackContext = createContext<FeedbackContextType | undefined>(
  undefined
);

type ChildrenType = { children?: ReactElement | ReactElement[] };

export const FeedBackProvider = ({ children }: ChildrenType): ReactElement => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [feedback, setFeedback] = useState<FeedbackItem[]>([]);

  // Fetch Feedback
  useEffect(() => {
    fetchFeedback();
  }, []);

  const fetchFeedback = async () => {
    const response = await fetch(
      `http://localhost:5000/feedback?_sort=id&_order=desc`
    );
    const data: FeedbackItem[] = await response.json();
    console.log(data);
    setIsLoading(false);
  };

  //AddFeedBack
  const addFeedback = async (newFeedback: FeedbackItem) => {
    const response = await fetch(
      `http://localhost:5000/feedback?_sort=id&_order=desc`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newFeedback),
      }
    );

    const data: FeedbackItem = await response.json();
    setFeedback([data, ...feedback]);
  };

  return (
    <FeedbackContext.Provider value={{ feedback, isLoading, addFeedback }}>
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
