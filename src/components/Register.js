import { Navigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import {FormControl, FormLabel, Button, Input } from '@chakra-ui/react';

const Register = ({ setAuth, isLoggedIn }) => {

    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    // const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        console.log(userName, email, password)

        axios
        .post ('https://team-production-system.onrender.com/auth/users/', {
            username: userName,
            password: password,
            email: email,
        })

        .then(() =>
        axios
        .post('https://team-production-system.onrender.com//auth/token/login', {
            username: userName,
            password: password,
        })
    )
    .then((res) =>
    setAuth(userName, res.data.auth_token))

    .catch((error) => {
        if (error.response.data.userName)
            setError(error.response.data.userName);

        if (error.response.data.password)
            setError(error.response.data.password)
    })
}
    return (
        <div>
            <form onSubmit={handleRegister}>
            <FormControl  className="form--registration">

                <div className="field">
                    <FormLabel className="label" htmlFor="email">
                        E-mail
                    </FormLabel>
                    <div>
                        <Input
                            type="text"
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
                    <div>
                        <Button type="submit" to="/sessions" >
                            Register
                        </Button>
                    </div>
                </div>
                
            </FormControl>
            </form>
        </div>
    )
}

export default Register