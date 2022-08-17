import { Navigate } from "react-router-dom";
import Header from "./Header";

interface Props {
  isLoggedIn: boolean
  logOut: (params: any) => void
}

const Home: React.FC<Props> = ({ isLoggedIn, logOut}) => {
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return <div>
    <Header logOut={logOut}/>
    <h1>Home!</h1>
    <p>Movie 1</p>
    <p>Movie 2</p>
    <p>Movie 2</p>
    <p>Movie 2</p>
  </div>;
};

export default Home;
