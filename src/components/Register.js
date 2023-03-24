import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import PacmanLoader from "react-spinners/PacmanLoader";
import { Button, TextField } from "@mui/material";
import { Stack } from "@mui/system";

const Register = ({ setAuth }) => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [token, setToken] = useState(null);

  const handleRegister = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    axios
      .post("https://team-production-system.onrender.com/auth/users/", {
        username: userName,
        password: password,
        email: email,
      })
      .then(() => {
        axios
          .post(
            "https://team-production-system.onrender.com/auth/token/login",
            {
              username: userName,
              password: password,
            }
          )

          .then((res) => {
            setLoading(false);
            console.log(res.data.auth_token);
            setToken(res.data.auth_token);
            setIsRegistered(true);
            setAuth(userName, res.data.auth_token);
            navigate("/profile");
          })
          .catch((e) => {
            setError(e.message);
            setLoading(false);
          });
      })
      .catch((e) => {
        setLoading(false);
        setError(e.message);
      });
  };

  return (
    <div className="Register">
      <form onSubmit={handleRegister} id="registration-form">
        <Stack container="true" justifyContent="center" alignItems="center">
          <Stack item="true" className="field">
            <TextField label="email" onChange={(e) => setEmail(e.target.value)}>
              E-mail
            </TextField>
          </Stack>

          <Stack item="true" className="field">
            <TextField
              label="username"
              onChange={(e) => setUserName(e.target.value)}
            >
              Username
            </TextField>
          </Stack>
          <Stack item="true" className="field">
            <TextField
              label="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            >
              Password
            </TextField>
          </Stack>

          <Stack item="true" className="button--register">
            {loading ? (
              <Button
                id="loading--button"
                spinner={<PacmanLoader size={20} color="yellow" />}
              >
                loading...
              </Button>
            ) : (
              <Button type="submit" form="registration-form">
                Register
              </Button>
            )}
          </Stack>
        </Stack>
      </form>
    </div>
  );
};

export default Register;
