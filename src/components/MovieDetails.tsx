import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "./Header";
import classes from "./MovieDetails.module.css";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { FaHeart } from "react-icons/fa";
import Footer from "./Footer";
import Profile from "../assets/img/profile.jpg"

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

  let bgImg = !specificMovie!.backdrop_path
    ? "null"
    : `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.9)), url("https://image.tmdb.org/t/p/original/${
        specificMovie!.backdrop_path
      }")`;

  let movieInfo = (
    <div>
      <div
        className={classes.hero}
        style={{
          background: !specificMovie!.backdrop_path
            ? "null"
            : `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 1)), url("https://image.tmdb.org/t/p/original/${
                specificMovie!.backdrop_path
              }")`,
          backgroundSize: "cover",
        }}
      >
        <div className={classes.textContainer}>
          <h1 className={classes.title}>{specificMovie!.title}</h1>
          <p className={classes.subText}>{specificMovie!.overview}</p>
          <div className={classes.addContainer}>
            <span onClick={toggleFavoritesHandler} className={classes.scroller}>
              {isFavorite ? "Remove from favorites" : "Add to favorites!"}
            </span>
            <div>
              {isFavorite ? (
                <span className={classes.heart}>
                  <FaHeart />
                </span>
              ) : (
                ""
              )}
            </div>
          </div>
          <p className={classes.rating}>
            Rating:{" "}
            <span className={classes.ratingNum}>
              {Math.round(specificMovie!.vote_average * 10) / 10}
            </span>
          </p>
          <p>Release Date: {specificMovie!.release_date}</p>

          <p className={classes.genres}>
            {genres.map((genre: any) => (
              <span>{genre.name.toUpperCase()} </span>
            ))}
          </p>
        </div>
      </div>

      <div className={classes.carrouselContainer}>
        {cast.length === 0 ? (
          ""
        ) : (
          <h2 className={classes.carrouselTitle}>Cast</h2>
        )}
        <Carousel
          className={classes.carrousel}
          showIndicators={false}
          emulateTouch={true}
          swipeable={true}
          showArrows={false}
          autoPlay={true}
          infiniteLoop={true}
          showStatus={false}
          showThumbs={false}
          stopOnHover={true}
        >
          {cast.slice(0, 20).map((person: any) => (
            <div className={classes.carrouselItem}>
              <p className={classes.label}>
                {person.name} as: {person.character}
              </p>
              {person.profile_path === null ? (
                // <div className={classes.actorPic}></div>
                <img
                  src={Profile}
                  alt=""
                  className={classes.actorPic}
                />
              ) : (
                <img
                  src={
                    person.profile_path === null
                      ? ""
                      : `https://image.tmdb.org/t/p/original/${person.profile_path}`
                  }
                  alt=""
                  className={classes.actorPic}
                />
              )}

              {/* <img
                src={
                  person.profile_path === null
                    ? ""
                    : `https://image.tmdb.org/t/p/original/${person.profile_path}`
                }
                alt=""
                className={classes.actorPic}
              /> */}
            </div>
          ))}
        </Carousel>
      </div>
      {recommendations.length === 0 ? (
        ""
      ) : (
        <h2 className={classes.recMainTitle}>Recommendations</h2>
      )}
      <div className={classes.recContainer}>
        {recommendations.slice(0, 12).map((movie: any) => (
          <a
            href={`/movies/${movie.id}`}
            className={classes.cardContainer}
            style={{
              background: !movie.backdrop_path
                ? "null"
                : `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.9)), url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,

              backgroundSize: "cover",
            }}
          >
            <div className={classes.innerContainer}>
              <h1 className={classes.recTitle}>{movie.title}</h1>
            </div>
          </a>
        ))}
      </div>
    </div>
  );

  return (
    <div>
      {isLoading ? (
        <div className={classes.background}>
          <iframe
            src="https://embed.lottiefiles.com/animation/9619"
            className={classes.spinner}
            width="500"
            height="500"
            title="spinner"
          ></iframe>
        </div>
      ) : (
        <div>
          <Header logOut={logOut} currentFavoriteList={currentFavoriteList} />
          {notFound ? <div>Movie Not Found</div> : movieInfo}
          <Footer />
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
