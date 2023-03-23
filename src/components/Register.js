import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import PacmanLoader from "react-spinners/PacmanLoader";
import { FormControl, FormLabel, Button, Input } from "@mui/material";

const Register = ({ setAuth, isLoggedIn }) => {
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
            // e.target.submit();
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
    // if (isRegistered) {
    //   console.log("Registered!");
    //   return <Navigate to='/profile' />;
    // }
  };

  return (
    <div className='Register'>
      <form onSubmit={handleRegister} id='registration-form'>
        <FormControl className='form--registration'>
          <div className='field'>
            <FormLabel className='label' htmlFor='email'>
              E-mail
            </FormLabel>
            <div>
              <Input
                type='email'
                id='email'
                className='input'
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className='field'>
            <FormLabel className='label' htmlFor='username'>
              Username
            </FormLabel>
            <div>
              <Input
                type='text'
                id='username'
                className='input'
                required
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
          </div>

          <div className='field'>
            <FormLabel className='label' htmlFor='password'>
              Password
            </FormLabel>
            <div>
              <Input
                type='password'
                id='password'
                className='input'
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <div className='button--register'>
              {loading ? (
                <Button
                  id='loading--button'
                  isLoading
                  spinner={<PacmanLoader size={20} />}
                >
                  loading...
                </Button>
              ) : (
                <Button type='submit' form='registration-form'>
                  Register
                </Button>
              )}
            </div>
          </div>
        </FormControl>
      </form>
    </div>
  );
};

export default Register;
