import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";

interface Props {
  isLoggedIn: boolean;
  logOut: (params: any) => void;
  setCurrentFavoriteList: React.Dispatch<React.SetStateAction<any>>;
  currentFavoriteList: any;
}

const MovieDetails: React.FC<Props> = ({
  isLoggedIn,
  logOut,
  setCurrentFavoriteList,
  currentFavoriteList,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [specificMovie, setSpecificMovie]: any = useState({});
  const [notFound, setNotFound] = useState(false);
  const [genres, setGenres] = useState([]);
  const [cast, setCast] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  let { id }: any = useParams();

  let favMovieStructure: any = {
    backdrop_path: specificMovie.backdrop_path,
    id: specificMovie.id,
    title: specificMovie.title,
    overview: specificMovie.overview,
    poster_path: specificMovie.poster_path,
    release_date: specificMovie.release_date,
    vote_average: Math.round(specificMovie.vote_average * 10) / 10,
  };

  useEffect(() => {
    if (
      localStorage
        .getItem("FavoriteMoviesList")!
        .includes(JSON.stringify(favMovieStructure))
    ) {
      setIsFavorite(true);
    }
  }, [favMovieStructure]);

  const toggleFavoritesHandler = () => {
    let currentFavoriteList: any = localStorage.getItem("FavoriteMoviesList");

    function SaveDataToLocalStorage(data: any) {
      let a = [];
      a = JSON.parse(localStorage.getItem("FavoriteMoviesList")!) || [];
      a.push(data);
      localStorage.setItem("FavoriteMoviesList", JSON.stringify(a));
    }

    if (!currentFavoriteList) {
      var a: any = [];
      a.push(JSON.parse(favMovieStructure));
      localStorage.setItem("FavoriteMoviesList", JSON.stringify(a));
      setCurrentFavoriteList(JSON.parse(a));
      setIsFavorite(true);
    } else {
      a = JSON.parse(localStorage.getItem("FavoriteMoviesList")!);

      if (
        localStorage
          .getItem("FavoriteMoviesList")!
          .includes(JSON.stringify(favMovieStructure))
      ) {
        let Ls = localStorage.getItem("FavoriteMoviesList")!;
        let newLs = Ls.replace(JSON.stringify(favMovieStructure), "");

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

        setCurrentFavoriteList(JSON.parse(newLs));
        localStorage.setItem("FavoriteMoviesList", newLs);
        setIsFavorite(false);

        return;
      }

      let b = [];
      b = JSON.parse(localStorage.getItem("FavoriteMoviesList")!) || [];
      b.push(favMovieStructure);
      setCurrentFavoriteList(b);

      setIsFavorite(true);
      SaveDataToLocalStorage(favMovieStructure);
    }
  };

  const getSpecificMovie = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=851778a47c1b0f0d7ab8bfb8cbb4e119&language=en-US`
      );

      const data = await response.json();

      if (data.success === false) {
        setNotFound(true);
        return;
      }

      const castResponse = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=851778a47c1b0f0d7ab8bfb8cbb4e119&language=en-US`
      );

      const castData = await castResponse.json();

      const recommendationsResponse = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=851778a47c1b0f0d7ab8bfb8cbb4e119&language=en-US`
      );

      const recommendationsData = await recommendationsResponse.json();

      console.log(recommendationsData.results);

      setCast(castData.cast);
      setGenres(data.genres);
      setRecommendations(recommendationsData.results);
      setSpecificMovie(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getSpecificMovie();
  }, []);

  console.log();

  let movieInfo = (
    <div>
      <h1>{specificMovie!.title}</h1>
      <p>{specificMovie!.id}</p>
      <p>{specificMovie!.poster_path}</p>
      <p>{specificMovie!.release_date}</p>
      <p>{specificMovie!.overview}</p>
      <p>{specificMovie!.vote_average}</p>
      <p>{specificMovie!.success}</p>
      <p>
        Genres:
        {genres.map((genre: any) => (
          <span>-- {genre.name} -- </span>
        ))}
      </p>
      <p>{isFavorite ? "IS IN YOUR FAVORITES" : "Not favorite"}</p>
      {cast.map((person: any) => (
        <>
          <div>
            {person.name} as: {person.character} Img: {person.profile_path}
          </div>
        </>
      ))}
      <div>
        <h2>Recommendations:</h2>
        {recommendations.map((movie: any) => (
          <div>
            <div>{movie.title}</div>
            <a href={`/movies/${movie.id}`}>See more info!</a>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <Header logOut={logOut} currentFavoriteList={currentFavoriteList} />
          {notFound ? <div>Movie Not Found</div> : movieInfo}
          <button onClick={toggleFavoritesHandler}>
            {isFavorite ? "Remove from favorites" : "Add to favorites!"}
          </button>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
