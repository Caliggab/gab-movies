import { useEffect, useState } from "react";
import "./App.css";
import LoginScreen from "./components/LoginScreen";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./components/Home";
import Favorites from "./components/Favorites";
import MovieDetails from "./components/MovieDetails";

function App() {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "Avengers",
      poster: "url",
      release_date: "15th aug 2022",
      overview: "Good movie!!",
      rating: 5.9,
    },
    {
      id: 2,
      title: "Persona",
      poster: "url2",
      release_date: "10th feb 1982",
      overview: "Good swedish movie!!",
      rating: 8.5,
    },
    {
      id: 3,
      title: "Minions",
      poster: "url3",
      release_date: "15th jan 2011",
      overview: "Good child movie!!",
      rating: 4.3,
    },
    {
      id: 4,
      title: "Spiderman",
      poster: "url4",
      release_date: "26th jan 2000",
      overview: "Good spider movie!!",
      rating: 4.3,
    },
    {
      id: 5,
      title: "Infinity Wars",
      poster: "url5",
      release_date: "15th jan 2024",
      overview: "Good marvel movie!!",
      rating: 4.3,
    },
    {
      id: 6,
      title: "Goldeneye",
      poster: "url6",
      release_date: "15th jan 1991",
      overview: "Good 007 movie!!",
      rating: 4.3,
    },
  ]);
  const [auth, setAuth] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    let localToken = window.localStorage.getItem("token");

    if (localToken === "QpwL5tke4Pnpja7X4") {
      setAuth(true);
    }
  }, [navigate]);

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
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        }
      />
      <Route
        path="/favorites"
        element={
          <Favorites
            isLoggedIn={auth}
            logOut={setAuth}
            movies={movies}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        }
      />
      <Route
        path="/movies/:id"
        element={
          <MovieDetails isLoggedIn={auth} logOut={setAuth} movies={movies} />
        }
      />
    </Routes>
  );
}

export default App;
