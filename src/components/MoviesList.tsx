import { useLocation } from "react-router-dom";
import MovieCard from "./MovieCard";
import classes from "./MoviesList.module.css";

interface Props {
  movies: {}[];
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const MoviesList: React.FC<Props> = ({ movies, searchTerm, setSearchTerm }) => {
  let list: any[] = [];
  const location = useLocation();

  
    list = movies.map((movie: any) => (
      <MovieCard movie={movie} key={movie.id + Math.random()} />
    ));

  let favoritesInStorage = localStorage.getItem("FavoriteMoviesList")!;
  let storageArray = favoritesInStorage.replace(/([\[\]])/g, "").split(",");

  let arr: any[] = [];

  JSON.parse(favoritesInStorage).forEach((element: any) => {
    arr.push(element);
  });

  const favoriteList: any[] = [];

  arr.forEach((movie) => {
    favoriteList.push(<MovieCard key={movie.id} movie={movie} />);
  });

  return (
    <div>
      <h1>Movies List!</h1>
      {/* {searchTerm && searchTerm.length < 2 ? (
        <div>Please type a longer query!</div>
      ) : (
        <div className={classes.container}>{list}</div>
      )}
      {list.length === 0 ? <div>No movies found!</div> : ""} */}

      {location.pathname === "/favorites" ? (
        <div>{favoriteList}</div>
      ) : (
        <div>{list}</div>
      )}
    </div>
  );
};

export default MoviesList;
