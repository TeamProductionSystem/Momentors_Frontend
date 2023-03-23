import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FormControl, FormLabel, TextField, Button } from '@mui/material';
import PacmanLoader from "react-spinners/PacmanLoader";

export default function EditProfile({ token, pk, setAuth }) {

    const [error, setError] = useState('');
    const [userName, setUserName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    // console.log(token);
    
    
    const editProfile = (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        axios
        .patch('https://team-production-system.onrender.com/myprofile/', {
            'first_name': firstName,
            'last_name' : lastName,
            'phone_number': phoneNumber,
            // 'is_mentor': '',
            // 'is_active': '',
        }, {
            headers: { 'Content-type': 'application/json; charset=UTF-8',
            Authorization: `Token ${token}` }
        })
        .then((res) => {
                // const token = res.data.auth_token;
                axios
                  .get('https://team-production-system.onrender.com/myprofile/', {
                    headers: { Authorization: `Token ${token}` },
                  })
                  .then((res) => {
                    setLoading(false);
                    console.log(res.data);
                    navigate('/profile');
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
    }

    return (
        <div className="profile--edit">
            <form onSubmit={editProfile}>
                <FormControl className="form--edit-profile">
                    <div className="field">
                        <FormLabel className="label" htmlFor="first_name">
                            First name
                        </FormLabel>
                        <div>
                            <TextField
                                type="text"
                                id="first_name"
                                className="input"
                                required
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                            </div>
                    </div>
                    <div className="field">
                        <FormLabel className="label" htmlFor="last_name">
                            Last name
                        </FormLabel>
                        <div>
                            <TextField
                                type="text"
                                id="last_name"
                                className="input"
                                required
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                            </div>
                    </div>
                    <div className="field">
                        <FormLabel className="label" htmlFor="phone_number">
                            Phone number
                        </FormLabel>
                        <div>
                            <TextField
                                type="text"
                                id="phone_number"
                                className="input"
                                required
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                            </div>
                    </div>
                    <div>
              <div className="button--edit-profile">
                {loading ? (
                  <Button
                    id="loading--button"
                    isLoading
                    spinner={<PacmanLoader size={20}/>}
                    >
                    loading...
                    </Button>
                ) : (
                  <Button type="submit" onClick={() => navigate("/profile")} >
                    Save changes
                  </Button>
                )}
              </div>
            </div>
                </FormControl>
            </form>
        </div>
    )
}