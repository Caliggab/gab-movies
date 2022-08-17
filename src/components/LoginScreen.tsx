import { useState } from "react";
import Card from "../UI/Card";
import classes from "./LoginScreen.module.css";
import { useNavigate } from "react-router-dom";

interface Props {
  auth: boolean;
  setAuth: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginScreen: React.FC<Props> = ({ auth, setAuth }) => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch("https://reqres.in/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: input.email, password: input.password }),
      });

      const data = await response.json();

      if (data.token === "QpwL5tke4Pnpja7X4") {
        window.localStorage.setItem("token", data.token);
        setAuth(true);
        navigate("/");
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <div className={classes.backdrop}>
      <div className={classes.modal}>
        <Card>
          <div className={classes.container}>
            <h1>Log in to see your movies</h1>
            <form className={classes.form} onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Email"
                className={classes.text}
                value={input.email}
                onChange={handleChange}
                name="email"
              />
              <input
                type="password"
                placeholder="Password"
                className={classes.text}
                value={input.password}
                onChange={handleChange}
                name="password"
              />
              <button className={classes.button}>Log In</button>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LoginScreen;