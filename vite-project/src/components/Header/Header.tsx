import { ReactElement } from "react";
import "./Header.css";

type headerProps = {
  title: string;
};

const Header = ({ title }: headerProps): ReactElement => {
  return (
    <header>
      <h1 className="header__container">{title}</h1>
    </header>
  );
};

export default Header;
