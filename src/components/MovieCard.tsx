import { useEffect, useReducer, useState } from "react";
import Card from "../UI/Card";
import classes from "./MovieCard.module.css";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

interface Props {
  movie:
    | {
        backdrop_path: string;
        id: any;
        title: string;
        poster_path: string;
        release_date: string;
        overview: string;
        vote_average: number;
      }
    | any;
  setCurrentFavoriteList: React.Dispatch<React.SetStateAction<any>>;
}

const MovieCard: React.FC<Props> = ({ movie, setCurrentFavoriteList }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  let parsedMovie: any = {
    backdrop_path: movie.backdrop_path,
    id: movie.id,
    title: movie.title,
    overview: movie.overview,
    poster_path: movie.poster_path,
    release_date: movie.release_date,
    vote_average: movie.vote_average,
  };

  useEffect(() => {
    if (
      localStorage
        .getItem("FavoriteMoviesList")!
        .includes(JSON.stringify(parsedMovie))
    ) {
      setIsFavorite(true);
    }
  }, [movie]);

  let bgImg =
    !movie.backdrop_path
      ? "null"
      : `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.9)), url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`;

  return (
    <Link
      to={`/movies/${movie.id}`}
      className={classes.cardContainer}
      style={{
        background: bgImg,
        backgroundSize: "cover",
      }}
    >
      <div className={classes.innerContainer}>
        <h1 className={classes.title}>{movie.title}</h1>
        <p>Release date: {movie.release_date}</p>
        <p className={classes.overview}>{movie.overview}</p>
        <p className={classes.rating}>Rating: {movie.vote_average}</p>
        <p className={classes.heart}>{isFavorite ? <FaHeart /> : ""}</p>
      </div>
    </Link>
  );
};

export default MovieCard;
