import MovieCard from "./MovieCard";
import classes from "./MoviesList.module.css";

interface Props {
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

const MoviesList: React.FC<Props> = ({ movies, searchTerm, setSearchTerm }) => {
  let list: any[] = [];

  if (searchTerm) {
    list = movies
      .filter((movie) =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .map((movie) => <MovieCard movie={movie} key={movie.id} />);
  } else {
    list = movies.map((movie) => <MovieCard movie={movie} key={movie.id} />);
  }

  return (
    <div>
      <h1>Movies List!</h1>
      {searchTerm && searchTerm.length < 2 ? (
        <div>Please type a longer query!</div>
      ) : (
        <div className={classes.container}>{list}</div>
      )}
      {list.length === 0 ? <div>No movies found!</div> : ""}
    </div>
  );
};

export default MoviesList;
