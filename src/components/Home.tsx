import { useEffect, useRef } from "react";
import { Navigate } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import MoviesList from "./MoviesList";
import classes from "./Home.module.css";

interface Props {
  isLoggedIn: boolean;
  logOut: (params: any) => void;
  movies: {}[];
  setCurrentFavoriteList: React.Dispatch<React.SetStateAction<any>>;
  currentFavoriteList: any;
  isLoading: boolean;
}

const Home: React.FC<Props> = ({
  isLoggedIn,
  logOut,
  movies,
  setCurrentFavoriteList,
  currentFavoriteList,
  isLoading,
}) => {
  const myRef: any = useRef(null);

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  const executeScroll = () => {
    window.scrollBy({
      top: 1050,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <div>
      <Header logOut={logOut} currentFavoriteList={currentFavoriteList} />

      {isLoading ? (
        <div className={classes.background}>
          <iframe
            src="https://embed.lottiefiles.com/animation/9619"
            className={classes.spinner}
            width="500"
            height="500"
            title="spinner"
          ></iframe>
        </div>
      ) : (
        <div>
          <div className={classes.hero}>
            <div className={classes.textContainer}>
              <h1 className={classes.title}>All your Movies in one place...</h1>
              <p className={classes.subText}>
                Tune in to GabMovies anytime. All your movies. With action,
                comedy, movies, news, and more 24/7, there’s a film for
                everyone, all the time.
              </p>
              <span onClick={executeScroll} className={classes.scroller}>
                {" "}
                START YOUR JOURNEY{" "}
              </span>
            </div>
          </div>
          <h1 ref={myRef} className={classes.subtitle}>
            Popular Movies
          </h1>
          <MoviesList
            movies={movies}
            setCurrentFavoriteList={setCurrentFavoriteList}
          />
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Home;
