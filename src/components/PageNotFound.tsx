import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import classes from "./PageNotFound.module.css";

interface Props {
  logOut: (params: any) => void;
  currentFavoriteList: any;
  isLoggedIn: boolean;
}

const PageNotFound: React.FC<Props> = ({
  logOut,
  currentFavoriteList,
  isLoggedIn,
}) => {
  const navigate = useNavigate();

  if (isLoggedIn !== true) {
    navigate("/login");
  }

  return (
    <div>
      <Header logOut={logOut} currentFavoriteList={currentFavoriteList} />
      <div className={classes.hero}>
        <div className={classes.textContainer}>
          <h1 className={classes.title}>404: Not Found</h1>
          <h1 className={classes.subText}>
            Try again and let's say yes to the next adventure...
          </h1>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PageNotFound;
