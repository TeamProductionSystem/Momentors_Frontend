import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import PacmanLoader from "react-spinners/PacmanLoader";
import { Button, TextField } from "@mui/material";
import { Stack } from "@mui/system";


export default function Login({ setAuth, setMentor, setMentee, setUserLive }) {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handlePWReset = (event) => {
        event.preventDefault();
        setError("");
        setLoading(true);
        axios
          .post(`${process.env.REACT_APP_BE_URL}/auth/users/reset_password/`, {
            email: email,
          })
          .then((res) => {
            setLoading(false);
            navigate("/");
          })
          .catch((e) => {
            // TODO: What to do with error
            setLoading(false);
            setError(e.message);
          });
    };

    return(
        <>
            <form onSubmit={handlePWReset} id="login-form">
                <Stack container="true" justifyContent="center" alignItems="center">
                <Stack item="true" className="field">
                    <TextField
                    // error={error.username ? true : false}
                    label="email"
                    onChange={(e) => setEmail(e.target.value)}
                    // helperText={error.username}
                    >
                    Email
                    </TextField>
                </Stack>
                <Stack item="true" className="button--login">
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
                    <>
                        <Button
                        id="resetPW--button"
                        type="submit"
                        style={
                            loading ? { backgroundColor: "black", color: "yellow" } : {}
                        }
                        >
                        Reset Password
                        </Button>
                        </>
                    )}
                </Stack>
                </Stack>
            </form>
        </>
    )
}