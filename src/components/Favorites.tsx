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
          <h1 className={classes.title}>Your secret Vault</h1>
          <p className={classes.subText}>
            Here you can find all your favorite movies. See them and share them
            with your friends. It only makes sense to be alive if you are
            surrounded by great films. Relive your adventures now.
          </p>
          <span onClick={executeScroll} className={classes.scroller}>
            {" "}
            EXPLORE YOUR MEMORIES{" "}
          </span>
        </div>
      </div>
      <h1 className={classes.subtitle}>Your Favorites</h1>

      {noFavorites ? (
        ""
      ) : (
        <p className={classes.total}>Total: {currentFavoriteList.length}</p>
      )}
      {noFavorites ? (
        <h2 className={classes.noFavs}>No favorites added yet! 😢</h2>
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
