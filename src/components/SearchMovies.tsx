import { useRef } from "react";

interface Props {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const SearchMovies: React.FC<Props> = ({ searchTerm, setSearchTerm }) => {
  const searchRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let newSearchTerm = searchRef.current!.value;

    setSearchTerm(newSearchTerm);

    searchRef.current!.value = "";
  };

  return (
    <div>
      <div>SearchMovies!</div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search for a movie title!"
          ref={searchRef}
        />
        {searchTerm ? <p>Searching for: {searchTerm}</p> : ""}
        <button>{!searchTerm ? "Search!" : "Clear search"}</button>
      </form>
    </div>
  );
};

export default SearchMovies;
