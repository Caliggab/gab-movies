import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import MoviesList from "./MoviesList";
import SearchMovies from "./SearchMovies";

interface Props {
  isLoggedIn: boolean;
  logOut: (params: any) => void;
  movies: {}[];
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const Home: React.FC<Props> = ({
  isLoggedIn,
  logOut,
  movies,
  searchTerm,
  setSearchTerm,
}) => {
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div>
      <Header logOut={logOut} />
      <h1>Home!</h1>
      <SearchMovies searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <MoviesList
        movies={movies}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}       />
      <Footer />
    </div>
  );
};

export default Home;
