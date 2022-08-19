import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";

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
}

const MovieDetails: React.FC<Props> = ({ isLoggedIn, logOut, movies }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  let { id } = useParams();

  useEffect(() => {
    let a = JSON.parse(localStorage.getItem("FavoriteMoviesList")!);
    if (a.includes(id)) {
      setIsFavorite(true);
    }
  }, [id]);

  let selectedMovie: any = movies.filter(
    (movie) => movie.id === parseInt(id!)
  )[0];

  console.log(selectedMovie);

  let movieInfo = selectedMovie ? (
    <div>
      <h1>Title: {selectedMovie.title}</h1>
      <p>{selectedMovie.id}</p>
      <p>{selectedMovie.poster}</p>
      <p>{selectedMovie.release_date}</p>
      <p>{selectedMovie.overview}</p>
      <p>{selectedMovie.rating}</p>
      <p>{isFavorite ? "IS IN YOUR FAVORITES" : "Not favorite"}</p>
    </div>
  ) : (
    <p>Movie not found!</p>
  );

  return (
    <div>
      <Header logOut={logOut} />
      {movieInfo}
    </div>
  );
};

export default MovieDetails;
