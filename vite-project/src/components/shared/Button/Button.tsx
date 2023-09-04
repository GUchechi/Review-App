import { ReactNode } from "react";
import "./Button.css";

type ButtonProps = {
  children: ReactNode;
  version?: string;
  type?: "button" | "submit" | "reset";
  isDisabled?: boolean;
};

const Button = ({
  children,
  version = "primary",
  type = "button",
  isDisabled = false,
}: ButtonProps) => {
  return (
    <button disabled={isDisabled} type={type} className={`btn btn-${version}`}>
      {children}
    </button>
  );
};

export default Button;
