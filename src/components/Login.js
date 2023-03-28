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
      .post("https://team-production-system.onrender.com/auth/token/login/", {
        username: userName,
        password: password,
      })
      .then((res) => {
        const token = res.data.auth_token;
        console.log(res);
        axios
          .get("https://team-production-system.onrender.com/myprofile/", {
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
        setLoading(false);
        setError(e.message);
      });
  };

  return (
    <div className="Login">
      <form onSubmit={handleLogin} id="login-form">
        <Stack container="true" justifyContent="center" alignItems="center">
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

          <Stack item="true" className="button--login">
            {loading ? (
              <Button
                id="loading--button"
                isloading
                spinner={<PacmanLoader size={20} color="yellow" />}
              >
                loading...
              </Button>
            ) : (
              <Button type="submit" form="login-form">
                Log in
              </Button>
            )}
          </Stack>
        </Stack>
      </form>
    </div>
  );
}
