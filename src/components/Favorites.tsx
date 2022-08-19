import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import Header from "./Header";
import MoviesList from "./MoviesList";
import SearchMovies from "./SearchMovies";

interface Props {
  isLoggedIn: boolean;
  logOut: (params: any) => void;
  movies: {
    id: number;
    title: string;
    poster: string;
    release_date: string;
    overview: string;
    rating: number;
  }[];
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
  
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  let currentFavoriteList = JSON.parse(
    localStorage.getItem("FavoriteMoviesList")!
  );

  console.log(currentFavoriteList);

  let parsedList = movies.filter((movie: any) =>
    currentFavoriteList.includes(movie.id)
  );

  return (
    <div>
      <Header logOut={logOut} />
      <h1>Your Favorites!!!</h1>
      <SearchMovies searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <MoviesList
        movies={parsedList}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
    </div>
  );
};

export default Favorites;
