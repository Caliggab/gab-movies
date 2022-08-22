import MovieCard from "./MovieCard";
import classes from "./MoviesList.module.css";

interface Props {
  movies: {}[];
  setCurrentFavoriteList: React.Dispatch<React.SetStateAction<any>>;
}

const MoviesList: React.FC<Props> = ({ movies, setCurrentFavoriteList }) => {
  let list: any[] = [];

  list = movies.map((movie: any) => (
    <MovieCard
      movie={movie}
      key={movie.id + Math.random()}
      setCurrentFavoriteList={setCurrentFavoriteList}
    />
  ));

  return (
    <div className={classes.mainContainer}>
      <div className={classes.container}>{list}</div>
    </div>
  );
};

export default MoviesList;
