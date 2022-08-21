import { useNavigate, Link, useLocation } from "react-router-dom";
import classes from "./Header.module.css";
import SearchMovies from "./SearchMoviesForm";
import logo from "../assets/img/logo.png";

interface Props {
  logOut: any;
  currentFavoriteList: any;
}

const Header: React.FC<Props> = ({ logOut, currentFavoriteList }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout: React.MouseEventHandler<HTMLButtonElement> = () => {
    logOut();
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className={classes.mainContainer}>
      <div className={classes.container}>
        <div className={classes.logoSearch}>
          <Link to="/">
            <img src={logo} className={classes.logo} alt="logo" />
          </Link>

          <SearchMovies />
        </div>
        <div className={classes.linkAndButton}>
          <ul className={classes.links}>
            {location.pathname === "/" ? (
              <Link to="/favorites" className={classes.link}>
                FAVORITES{" "}
                <div className={classes.number}>
                  {currentFavoriteList.length}
                </div>
              </Link>
            ) : (
              <Link className={classes.link} to="/">
                HOME
              </Link>
            )}
          </ul>
          <span className={classes.link} onClick={handleLogout}>
            LOG OUT
          </span>
        </div>
      </div>
    </div>
  );
};

export default Header;
