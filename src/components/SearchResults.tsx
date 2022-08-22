import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import MoviesList from "./MoviesList";
import SearchMovies from "./SearchMoviesForm";
import classes from "./SearchResults.module.css";

interface Props {
  isLoggedIn: boolean;
  logOut: (params: any) => void;
  setCurrentFavoriteList: React.Dispatch<React.SetStateAction<any>>;
  currentFavoriteList: any;
}

const SearchResults: React.FC<Props> = ({
  isLoggedIn,
  logOut,
  setCurrentFavoriteList,
  currentFavoriteList,
}) => {
  const [foundMovies, setFoundMovies]: any[] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  let searchQuery = searchParams.get("search");

  const fetchSearchResults = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=851778a47c1b0f0d7ab8bfb8cbb4e119&query=${searchQuery}&language=en-US `
      );

      const data = await response.json();

      setFoundMovies(data.results);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchSearchResults();
  }, [searchQuery]);

  if (isLoggedIn !== true) {
    navigate("/login");
  }

  if (!searchQuery) {
    navigate("/");
  }

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
          <div className={classes.hero}></div>
          <div className={classes.container}>
            <p className={classes.title}>
              Current search:{" "}
              <span className={classes.query}>{searchQuery}</span>
            </p>
            {foundMovies.length === 0 ? (
              <div className={classes.noResults}>No results found! Try a different query</div>
            ) : (
              ""
            )}
            <div className={classes.listContainer}>
              <MoviesList
                movies={foundMovies}
                setCurrentFavoriteList={setCurrentFavoriteList}
              />
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default SearchResults;
