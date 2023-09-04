import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  reverse?: boolean;
}

const Card = ({ children, reverse = false }: CardProps): ReactNode => {
  return <div className={`card ${reverse && "reverse"}`}>{children}</div>;
};

export default Card;
