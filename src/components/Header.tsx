import { useNavigate, Link, useLocation } from "react-router-dom";
import classes from "./Header.module.css";

interface Props {
  logOut: any;
}

const Header: React.FC<Props> = ({ logOut }) => {
  const navigate = useNavigate();
  const location = useLocation();

  console.log(location.pathname);

  const handleLogout: React.MouseEventHandler<HTMLButtonElement> = () => {
    logOut();
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className={classes.container}>
      <ul className={classes.links}>
        {location.pathname === "/favorites" ? (
          <Link className={classes.link} to="/">
            Home
          </Link>
        ) : (
          ""
        )}
        {location.pathname === "/" ? (
          <Link to="/favorites" className={classes.link}>
            Favorites
          </Link>
        ) : (
          ""
        )}
      </ul>
      <div>Logo</div>
      <button onClick={handleLogout} className={classes.button}>
        Log Out
      </button>
    </div>
  );
};

export default Header;
