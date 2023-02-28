import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {FormControl, FormLabel, Button, Input, Box } from '@chakra-ui/react';

export default function Login({ setAuth }) {
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate();

    const handleLogin = (event) => {
        event.preventDefault()
        setError('')
        axios
            .post('https://team-production-system.onrender.com/auth/token/login/', {
                username: userName,
                password: password,
            })
            .then((res) => {
                console.log(res.data);
                const token = res.data.auth_token
                setAuth(userName, token);
                navigate("/profile");
            })
            .catch((e) => setError(e.message))
    }


    return (
        <div className="Login">
            <form onSubmit={handleLogin}>
            <FormControl  className="form--login">
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
                    <div className="button--login">
                        <Button type="submit" to="/profile" >
                            Log in
                        </Button>
                    </div>
                </div>
                </div>
            </FormControl>
            </form>
        </div>
    )
}