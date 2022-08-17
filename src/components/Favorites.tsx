import { Navigate } from "react-router-dom";
import Header from "./Header";

interface Props {
  isLoggedIn: boolean
  logOut: (params: any) => void
}

const Favorites: React.FC<Props> = ({ isLoggedIn, logOut}) => {
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return <div>
    <Header logOut={logOut}/>
    <h1>Favorites!!!</h1>
    <p>Movie 1</p>
    <p>Movie 2</p>
    <p>Movie 2</p>
    <p>Movie 2</p>
  </div>;
};

export default Favorites;