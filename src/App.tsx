import { useEffect, useState } from "react";
import "./App.css";
import LoginScreen from "./components/LoginScreen";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./components/Home";
import Favorites from "./components/Favorites";

function App() {
  const [auth, setAuth] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    let localToken = window.localStorage.getItem("token");

    if (localToken === "QpwL5tke4Pnpja7X4") {
      setAuth(true);
      navigate("/");
    }
  }, [navigate]);

  return (
    <Routes>
      <Route
        path="login"
        element={<LoginScreen auth={auth} setAuth={setAuth} />}
      />
      <Route path="/" element={<Home isLoggedIn={auth} logOut={setAuth} />} />
      <Route
        path="/favorites"
        element={<Favorites isLoggedIn={auth} logOut={setAuth} />}
      />
    </Routes>
  );
}

export default App;
