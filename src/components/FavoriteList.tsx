import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import MovieCard from "./MovieCard";
import classes from "./MoviesList.module.css";

interface Props {
  movies: {}[];
  setCurrentFavoriteList: React.Dispatch<React.SetStateAction<any>>;
  currentFavoriteList: any;
}

const FavoriteList: React.FC<Props> = ({
  movies,
  setCurrentFavoriteList,
  currentFavoriteList,
}) => {
  const [specificCurrentFavoriteList, setSpecificCurrentFavoriteList] =
    useState();
  let list: any[] = [];
  const location = useLocation();

  useEffect(() => {
    setSpecificCurrentFavoriteList(currentFavoriteList);
  }, []);

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

export default FavoriteList;
