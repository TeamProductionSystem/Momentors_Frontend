import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import PacmanLoader from "react-spinners/PacmanLoader";
import { Button, TextField } from "@mui/material";
import { Stack } from "@mui/system";

export default function Login({ setAuth, setMentor, setMentee }) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    axios
      .post(`${process.env.REACT_APP_BE_URL}/auth/token/login/`, {
        username: userName,
        password: password,
      })
      .then((res) => {
        const token = res.data.auth_token;
        console.log(res);
        axios
          .get(`${process.env.REACT_APP_BE_URL}/myprofile/`, {
            headers: { Authorization: `Token ${token}` },
          })
          .then((res) => {
            setLoading(false);
            setAuth(userName, token, res.data.pk);
            setMentor(res.data.is_mentor);
            setMentee(res.data.is_mentee);
            console.log(res.data);
            navigate("/profile");
          })
          .catch((e) => {
            setLoading(false);
            setError(e.message);
          });
      })
      .catch((e) => {
        if (e.response && e.response.data) {
          setError(e.response.data);
        } else {
          setError({ submit: e.message });
        }
        setLoading(false);
      });
  };

  return (
    <div className="Login">
      <form onSubmit={handleLogin} id="login-form">
        <Stack container="true" justifyContent="center" alignItems="center">
          <Stack item="true" className="field">
            <TextField
              error={error.username ? true : false}
              label="username"
              onChange={(e) => setUserName(e.target.value)}
              helperText={error.username}
            >
              Username
            </TextField>
          </Stack>

          <Stack item="true" className="field">
            <TextField
              error={error.password || error.non_field_errors ? true : false}
              label="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              helperText={error.password || error.non_field_errors}
            >
              Password
            </TextField>
          </Stack>

          <Stack item="true" className="button--login">
            {loading ? (
              <Button
                id="loading--button"
                spinner={<PacmanLoader size={20} color="yellow" />}
              >
                loading...
              </Button>
            ) : (
              <Button type="submit" form="login-form" variant="outlined">
                Log in
              </Button>
            )}
          </Stack>
        </Stack>
      </form>
    </div>
  );
}
