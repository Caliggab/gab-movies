import { useEffect, useState } from "react";
import Card from "../UI/Card";
import classes from "./MovieCard.module.css";

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
}

const MovieCard: React.FC<Props> = ({ movie }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (
      localStorage
        .getItem("FavoriteMoviesList")!
        .includes(JSON.stringify(movie))
    ) {
      setIsFavorite(true);
    }
  }, [movie]);

  const toggleFavoritesHandler = () => {
    let currentFavoriteList: any = localStorage.getItem("FavoriteMoviesList");

    function SaveDataToLocalStorage(data: any) {
      var a = [];
      a = JSON.parse(localStorage.getItem("FavoriteMoviesList")!) || [];
      a.push(data);
      localStorage.setItem("FavoriteMoviesList", JSON.stringify(a));
    }

    if (!currentFavoriteList) {
      var a = [];
      a.push(JSON.parse(movie));
      localStorage.setItem("FavoriteMoviesList", JSON.stringify(a));
      setIsFavorite(true);
    } else {
      a = JSON.parse(localStorage.getItem("FavoriteMoviesList")!);

      console.log("a", a);
      if (
        localStorage
          .getItem("FavoriteMoviesList")!
          .includes(JSON.stringify(movie))
      ) {
        console.log("hiiii! already in localstorage");

        let Ls = localStorage.getItem("FavoriteMoviesList")!;

        console.log("Ls", Ls);

        let newLs = Ls.replace(JSON.stringify(movie), "");

        console.log(a.length);

        if (a.length < 1) {
          newLs = newLs.replace(" ,", "");
          newLs = newLs.replace(", ,", ", ");
        }

        newLs = newLs.replaceAll(",,", ", ");
        newLs = newLs.replace("[ ,", "[");
        newLs = newLs.replace("[,", "[");
        newLs = newLs.replace(",]", "]");
        newLs = newLs.replace("[ {", "[{");
        newLs = newLs.replaceAll("},{", "}, {");
        newLs = newLs.replaceAll(/(\,\s{1,}])/g, "]");
        newLs = newLs.replaceAll(/(\[\s{1,}{)/g, "[{");
        newLs = newLs.replaceAll(/(,\s{2,},)/g, ", ");
        newLs = newLs.replaceAll(/(,\s{1,},\s{1,})/g, ", ");

        localStorage.setItem("FavoriteMoviesList", newLs);
        setIsFavorite(false);
        return;
      }
      setIsFavorite(true);
      SaveDataToLocalStorage(movie);
    }
  };

  return (
    <div className={classes.cardContainer}>
      <Card>
        <h1>{movie.title}</h1>
        <p>{movie.id}</p>
        <p>{movie.backdrop_path}</p>
        <p>{movie.poster_path}</p>
        <p>{movie.release_date}</p>
        <p>{movie.overview}</p>
        <p>{movie.vote_average}</p>
        <p>{isFavorite ? "IS IN YOUR FAVORITES" : "Not favorite"}</p>

        <button onClick={toggleFavoritesHandler}>
          {isFavorite ? "Remove from favorites" : "Add to favorites!"}
        </button>
        <a href={`/movies/${movie.id}`}>See more details!</a>
      </Card>
    </div>
  );
};

export default MovieCard;
