import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import MoviesList from "./MoviesList";
import SearchMovies from "./SearchMovies";

interface Props {
  isLoggedIn: boolean;
  logOut: (params: any) => void;
  movies: any;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const Favorites: React.FC<Props> = ({
  isLoggedIn,
  logOut,
  movies,
  searchTerm,
  setSearchTerm,
}) => {
  const [noFavorites, setNoFavorites] = useState(false);

  let favoritesInStorage = JSON.parse(
    localStorage.getItem("FavoriteMoviesList")!
  );

  useEffect(() => {
    if (favoritesInStorage.length === 0) {
      setNoFavorites(true);
    }
  }, []);


  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }


  return (
    <div>
      <Header logOut={logOut} />
      <h1>Your Favorites!!!</h1>
      <SearchMovies searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      {noFavorites ? (
        "No favorites added yet!"
      ) : (
        <MoviesList
          movies={movies}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      )}
      <Footer />
    </div>
  );
};

export default Favorites;
