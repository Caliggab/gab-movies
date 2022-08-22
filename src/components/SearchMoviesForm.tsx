import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./SearchMoviesForm.module.css";
import { FaSearch } from "react-icons/fa";
import { IconContext } from "react-icons";

interface Props {}

const SearchMovies: React.FC<Props> = () => {
  const [isInvalid, setIsInvalid] = useState(false);
  const [message, setMessage] = useState("");
  const searchRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  const handleSubmit: any = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let query = searchRef.current!.value;

    if (query.length < 4) {
      setIsInvalid(true);
      setMessage("Query should be longer than 3 characters");
      return;
    }

    if (query.length > 15) {
      setIsInvalid(true);
      setMessage("Query shouldn't exceed 15 characters");
      return;
    }

    if (/[^A-Za-z0-9]+/g.test(query)) {
      setIsInvalid(true);
      setMessage("Please only use letters and numbers");
      return;
    }

    navigate(`/movies?search=${query}`);
    searchRef.current!.value = "";
    setIsInvalid(false);
  };

  return (
    <div className={classes.container}>
      <form className={classes.wrapper} onSubmit={handleSubmit}>
        <div className={classes.search_box}>
          <input
            type="text"
            placeholder="Let's find something..."
            ref={searchRef}
          />
          <IconContext.Provider value={{ className: classes.fasearch }}>
            <div className={classes.searchIcon} >
              <FaSearch onClick={handleSubmit}/>
            </div>
          </IconContext.Provider>
        </div>
      </form>
      {isInvalid ? <p className={classes.error}>{message}</p> : ""}
    </div>
  );
};

export default SearchMovies;
