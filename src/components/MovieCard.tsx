import { useEffect, useState } from "react";
import Card from "../UI/Card";
import classes from "./MovieCard.module.css";

interface Props {
  movie: {
    id: any;
    title: string;
    poster: string;
    release_date: string;
    overview: string;
    rating: number;
  };
}

const MovieCard: React.FC<Props> = ({ movie }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    let a = JSON.parse(localStorage.getItem("FavoriteMoviesList")!);
    if (a && a.includes(movie.id)) {
      setIsFavorite(true);
    }
  }, [movie.id]);

  const toggleFavoritesHandler = () => {
    let currentFavoriteList = localStorage.getItem("FavoriteMoviesList");

    function SaveDataToLocalStorage(data: number) {
      var a = [];
      a = JSON.parse(localStorage.getItem("FavoriteMoviesList")!) || [];
      a.push(data);
      localStorage.setItem("FavoriteMoviesList", JSON.stringify(a));
    }

    if (!currentFavoriteList) {
      var a = [];
      a.push(JSON.parse(movie.id));
      localStorage.setItem("FavoriteMoviesList", JSON.stringify(a));
      setIsFavorite(true);
    } else {
      a = JSON.parse(localStorage.getItem("FavoriteMoviesList")!);
      if (a.includes(movie.id)) {
        return;
      }
      setIsFavorite(true);
      SaveDataToLocalStorage(movie.id);
    }

    console.log(currentFavoriteList);
  };

  return (
    <div className={classes.cardContainer}>
      <Card>
        <h1>Title: {movie.title}</h1>
        <p>{movie.id}</p>
        <p>{movie.poster}</p>
        <p>{movie.release_date}</p>
        <p>{movie.overview}</p>
        <p>{movie.rating}</p>
        <p>{isFavorite ? "IS IN YOUR FAVORITES" : "Not favorite"}</p>

        <button onClick={toggleFavoritesHandler}>{isFavorite ? "Remove from favorites" : "Add to favorites!"}</button>
        <a href={`/movies/${movie.id}`}>See more details!</a>
      </Card>
    </div>
  );
};

export default MovieCard;
