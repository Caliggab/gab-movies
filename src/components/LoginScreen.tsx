import { useEffect, useState } from "react";
import Card from "../UI/Card";
import classes from "./LoginScreen.module.css";
import { useNavigate } from "react-router-dom";
import logo from "../assets/img/logo.png";

interface Props {
  auth: boolean;
  setAuth: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginScreen: React.FC<Props> = ({ auth, setAuth }) => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (auth === true) {
      navigate("/");
    }
  }, [auth, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (input.email.length < 5 || input.password.length < 5) {
      setIsInvalid(true);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("https://reqres.in/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: input.email, password: input.password }),
      });

      if (!response.ok) {
        setError(true);
      }

      const data = await response.json();

      if (data.token === "QpwL5tke4Pnpja7X4") {
        window.localStorage.setItem("token", data.token);
        setAuth(true);
        navigate("/");
      }
      setIsLoading(false);
    } catch (error: any) {
      console.log("error!!!");
      console.log(error.message);
    }
  };

  return (
    <div className={classes.backdrop}>
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
        <div className={classes.modal}>
          <Card>
            <div className={classes.mainContainer}>
              <img src={logo} className={classes.logo} alt="logo" />

              <div className={classes.container}>
                <form className={classes.wrapper} onSubmit={handleSubmit}>
                  <div className={classes.search_box}>
                    <input
                      type="email"
                      placeholder="Email"
                      value={input.email}
                      onChange={handleChange}
                      name="email"
                    />
                    <input
                      type="password"
                      placeholder="Password"
                      value={input.password}
                      onChange={handleChange}
                      name="password"
                    />
                  </div>
                  <button className={classes.scroller}>
                    {" "}
                    Begin your adventure{" "}
                  </button>
                </form>
              </div>
              {isInvalid ? <p className={classes.error}>Fields are too short</p> : ""}
              {error ? <p className={classes.error}>Credentials are wrong, please try again</p> : ""}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default LoginScreen;
