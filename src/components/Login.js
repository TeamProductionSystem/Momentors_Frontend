import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PacmanLoader from "react-spinners/PacmanLoader";
import { FormControl, FormLabel, Button, Input } from "@chakra-ui/react";

export default function Login({ setAuth }) {
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
    <div className='Login'>
      <form onSubmit={handleLogin}>
        <FormControl className='form--login'>
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
              <div className='button--login'>
                {loading ? (
                  <Button
                    id='loading--button'
                    isLoading
                    colorScheme='gray'
                    spinner={<PacmanLoader size={20} color='yellow' />}
                  >
                    loading...
                  </Button>
                ) : (
                  <Button type='submit' to='/profile'>
                    Log in
                  </Button>
                )}
              </div>
            </div>
          </div>
        </FormControl>
      </form>
    </div>
  );
}
