import classes from "./Footer.module.css";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <div className={classes.container}>
      <img
        src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_1-5bdc75aaebeb75dc7ae79426ddd9be3b2be1e342510f8202baf6bffa71d7f5c4.svg"
        alt="IMDB logo"
        className={classes.logo}
      />
      <p>Created by Gabriel Arriaza 2022&copy;</p>
      <a href="" className={classes.gitLogo}>
        <FaGithub />
      </a>
    </div>
  );
};

export default Footer;
