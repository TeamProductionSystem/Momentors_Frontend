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
  const [rePassword, setRePassword] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    axios
      .post(`${process.env.REACT_APP_BE_URL}/auth/users/`, {
        username: userName,
        password: password,
        re_password: rePassword,
        email: email,
      })
      .then((res) => {
        const pk = res.data.id;
        axios
          .post(`${process.env.REACT_APP_BE_URL}/auth/token/login`, {
            username: userName,
            password: password,
          })

          .then((res) => {
            setLoading(false);
            setIsRegistered(true);
            sessionStorage.setItem("user_live", true);
            setAuth(userName, res.data.auth_token, pk);
            sessionStorage.setItem("is_mentor", false);
            sessionStorage.setItem("is_mentee", false);
            navigate("/profile");
          })
          .catch((e) => {
            setError(e.message);
            setLoading(false);
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
    <div className="Register">
      <form onSubmit={handleRegister} id="registration-form">
        <Stack container="true" justifyContent="center" alignItems="center">
          <Stack item="true" className="field">
            <TextField
              error={error.email ? true : false}
              label="email"
              onChange={(e) => setEmail(e.target.value)}
              helperText={error.email}
            >
              E-mail
            </TextField>
          </Stack>

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
              error={error.password ? true : false}
              label="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              helperText={error.password}
            >
              Password
            </TextField>
          </Stack>

          <Stack item="true" className="field">
            <TextField
              error={error.non_field_errors ? true : false}
              label="confirm password"
              type="password"
              onChange={(e) => setRePassword(e.target.value)}
              helperText={error.non_field_errors}
            >
              Confirm Password
            </TextField>
          </Stack>

          <Stack item="true" className="button--register">
            {loading ? (
              <Button
                id="loading--button"
                style={{
                  backgroundColor: loading ? "black" : "",
                  color: "yellow",
                  height: "40px",
                  width: "100px",
                }}
              >
                <PacmanLoader size={20} color="yellow" />
                {!loading && "Loading..."}
              </Button>
            ) : (
              <Button
                id="register--button"
                type="submit"
                form="registration-form"
                style={loading ? { backgroundColor: 'black', color: 'yellow' } : {}}
              >
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
