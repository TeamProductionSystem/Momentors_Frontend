import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import {FormControl, FormLabel, Button } from '@chakra-ui/react';

export default function Login({ setAuth, isLoggedIn, setUserName, userName }) {
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleLogin = (event) => {
        event.preventDefault()
        setError('')
        axios
            .post('https://team-production-system.onrender.com/auth/token/login/', {
                username: userName,
                password: password,
            })
            .then((res) => {
                console.log(res.data)
                const token = res.data.auth_token
                setAuth(userName, token)
            })
            .catch((e) => setError(e.message))
    }

    if (isLoggedIn) {
        return <Navigate to="/sessions" replace={true} />
    }


    return (
        <div className="Login">
            {/* {error && <div className="error">{error}</div>} */}
            <FormControl onSubmit={handleLogin} className="section">
                <div className="field">
                    <FormLabel className="label" htmlFor="username">
                        Username
                    </FormLabel>
                    <div>
                        <input
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
                        <input
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
                    <div>
                        <Button type="submit" to="/sessions" >
                            Log in
                        </Button>
                    </div>
                </div>
                </div>
            </FormControl>
        </div>
    )
}