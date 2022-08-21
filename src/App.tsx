import { useEffect, useState } from "react";
import "./App.css";
import LoginScreen from "./components/LoginScreen";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./components/Home";
import Favorites from "./components/Favorites";
import MovieDetails from "./components/MovieDetails";
import SearchResults from "./components/SearchResults";
import PageNotFound from "./components/PageNotFound";

interface popularMovie {
  backdrop_path: string;
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
}

function App() {
  const [movies, setMovies] = useState([{}]);
  const [auth, setAuth] = useState<boolean>(false);
  const [currentFavoriteList, setCurrentFavoriteList]: any[] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    let localToken = window.localStorage.getItem("token");

    if (localToken === "QpwL5tke4Pnpja7X4") {
      setAuth(true);
    }
  }, [navigate]);

  useEffect(() => {
    let a = JSON.parse(localStorage.getItem("FavoriteMoviesList")!);
    let b: any = [];
    if (!a) {
      localStorage.setItem("FavoriteMoviesList", JSON.stringify(b));
    }
  }, []);

  const getPopularMovies = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=851778a47c1b0f0d7ab8bfb8cbb4e119&language=en-US&page=1`
      );

      const data = await response.json();

      let popularMovies: any[] = [];

      data.results.map((movie: popularMovie) =>
        popularMovies.push({
          backdrop_path: movie.backdrop_path,
          id: movie.id,
          title: movie.title,
          overview: movie.overview,
          poster_path: movie.poster_path,
          release_date: movie.release_date,
          vote_average: movie.vote_average,
        })
      );

      setMovies(popularMovies);
      setIsLoading(false)
    } catch (error) {
      console.log(error.message);
    }
  };

  const getCurrentFavoriteList = () => {
    let favoritesInStorage = localStorage.getItem("FavoriteMoviesList")!;
    let arr: any[] = [];

    JSON.parse(favoritesInStorage).forEach((element: any) => {
      arr.push(element);
    });

    setCurrentFavoriteList(arr);
  };

  useEffect(() => {
    getPopularMovies();
    getCurrentFavoriteList();
  }, []);

  return (
    <Routes>
      <Route
        path="login"
        element={<LoginScreen auth={auth} setAuth={setAuth} />}
      />
      <Route
        path="/"
        element={
          <Home
            isLoggedIn={auth}
            logOut={setAuth}
            movies={movies}
            setCurrentFavoriteList={setCurrentFavoriteList}
            currentFavoriteList={currentFavoriteList}
            isLoading={isLoading}
          />
        }
      />
      <Route
        path="/favorites"
        element={
          <Favorites
            isLoggedIn={auth}
            logOut={setAuth}
            movies={currentFavoriteList}
            setCurrentFavoriteList={setCurrentFavoriteList}
            currentFavoriteList={currentFavoriteList}
          />
        }
      />
      <Route
        path="/movies/:id"
        element={
          <MovieDetails
            isLoggedIn={auth}
            logOut={setAuth}
            setCurrentFavoriteList={setCurrentFavoriteList}
            currentFavoriteList={currentFavoriteList}
          />
        }
      />
      <Route
        path="/movies"
        element={
          <SearchResults
            logOut={setAuth}
            isLoggedIn={auth}
            setCurrentFavoriteList={setCurrentFavoriteList}
            currentFavoriteList={currentFavoriteList}
          />
        }
      />
      <Route
        path="*"
        element={
          <PageNotFound
            logOut={setAuth}
            currentFavoriteList={currentFavoriteList}
          />
        }
      />
    </Routes>
  );
}

export default App;
