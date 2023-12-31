import { ReactElement } from "react";
import { Link } from "react-router-dom";
import Card from "../shared/Card/Card";
import './About.css'


const About = (): ReactElement => {
  return (
    <Card>
      <div className="about">
        <h1>About This Project</h1>
        <p>This is a React app to leave review for a product or service</p>
        <p>Version: 1.0.0</p>

        <p>
          <Link to="/">Back To Home</Link>
        </p>
      </div>
    </Card>
  );
};

export default About;
