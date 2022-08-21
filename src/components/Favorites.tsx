import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FavoriteList from "./FavoriteList";
import Footer from "./Footer";
import Header from "./Header";
import classes from "./Favorites.module.css";

interface Props {
  isLoggedIn: boolean;
  logOut: (params: any) => void;
  movies: any;
  setCurrentFavoriteList: React.Dispatch<React.SetStateAction<any>>;
  currentFavoriteList: any;
}

const Favorites: React.FC<Props> = ({
  isLoggedIn,
  logOut,
  movies,
  setCurrentFavoriteList,
  currentFavoriteList,
}) => {
  const [noFavorites, setNoFavorites] = useState(false);
  const navigate = useNavigate();

  const executeScroll = () => {
    window.scrollBy({
      top: 1050,
      left: 0,
      behavior: "smooth",
    });
  };

  let favoritesInStorage = JSON.parse(
    localStorage.getItem("FavoriteMoviesList")!
  );

  useEffect(() => {
    if (favoritesInStorage.length === 0) {
      setNoFavorites(true);
    }
  }, []);

  if (isLoggedIn !== true) {
    navigate("/login");
  }

  return (
    <div>
      <Header logOut={logOut} currentFavoriteList={currentFavoriteList} />
      <div className={classes.hero}>
        <div className={classes.textContainer}>
          <h1 className={classes.title}>All your Movies in one place...</h1>
          <p className={classes.subText}>
            Tune in to GabMovies anytime. All your movies. With action, comedy,
            movies, news, and more 24/7, there’s a film for everyone, all the
            time.
          </p>
          <span onClick={executeScroll} className={classes.scroller}>
            {" "}
            START YOUR JOURNEY{" "}
          </span>
        </div>
      </div>
      <h1>Your Favorites!!!</h1>
      <p>Favorite Total: {currentFavoriteList.length}</p>
      {noFavorites ? (
        "No favorites added yet!"
      ) : (
        <FavoriteList
          movies={[...movies].reverse()}
          setCurrentFavoriteList={setCurrentFavoriteList}
          currentFavoriteList={currentFavoriteList}
          key={Math.random()}
        />
      )}
      <Footer />
    </div>
  );
};

export default Favorites;
