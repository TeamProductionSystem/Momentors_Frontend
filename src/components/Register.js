import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { FormControl, FormLabel, Button, Input } from "@chakra-ui/react";

const Register = ({ setAuth, isLoggedIn }) => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    console.log(userName, email, password);
    axios
      .post("https://team-production-system.onrender.com/auth/users/", {
        username: userName,
        password: password,
        email: email,
      })
      .then(() =>
        axios
          .post(
            "https://team-production-system.onrender.com/auth/token/login",
            {
              username: userName,
              password: password,
            }
          )

          .then((res) => {
            console.log(res.data);
            const token = res.data.auth_token;
            setIsRegistered(true);
            setAuth(userName, token);
            e.target.submit();
          })
          .catch((e) => setError(e.message))
      );
  };

    if (isRegistered) {
    console.log("Registered!")
    return <Navigate to='/profile' />
  }

  return (
    <div className="Register">
      <form onSubmit={handleRegister} id="registration-form">
        <FormControl className="form--registration">
          <div className="field">
            <FormLabel className="label" htmlFor="email">
              E-mail
            </FormLabel>
            <div>
              <Input
                type="email"
                id="email"
                className="input"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="field">
            <FormLabel className="label" htmlFor="username">
              Username
            </FormLabel>
            <div>
              <Input
                type="text"
                id="username"
                className="input"
                required
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
          </div>

          <div className="field">
            <FormLabel className="label" htmlFor="password">
              Password
            </FormLabel>
            <div>
              <Input
                type="password"
                id="password"
                className="input"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <div className="button--register">
              <Button type="submit" form="registration-form">
                Register
              </Button>
            </div>
          </div>
        </FormControl>
      </form>
    </div>
  );
};

export default Register;
