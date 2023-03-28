import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TextField, FormLabel, Input, Button } from '@mui/material';
import { Stack } from "@mui/system";
import PacmanLoader from "react-spinners/PacmanLoader";

export default function EditProfile({ token, pk, setAuth }) {

    const [error, setError] = useState('');
    const [userName, setUserName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    // Append +1 to phone number if it's not already present
    const formattedPhoneNumber = phoneNumber.startsWith('+1')
    ? phoneNumber : `+1${phoneNumber}`;
    
    
    const editProfile = (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        axios
        .patch('https://team-production-system.onrender.com/myprofile/', {
            'first_name': firstName,
            'last_name' : lastName,
            'phone_number': formattedPhoneNumber,
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
            <form onSubmit={editProfile} id="edit-profile">
                <Stack container="true" justifyContent="center" alignItems="center">

                    <Stack item="true" className="field">
                        <TextField 
                          label="first name"
                          onChange={(e) => setFirstName(e.target.value)}
                          >
                            First name
                        </TextField>
                    </Stack>
                    
                    <Stack item="true" className="field">
                        <TextField
                          label="last name"
                          onChange={(e) => setLastName(e.target.value)}
                          >
                            Last name
                        </TextField>
                    </Stack>

                    <Stack item="true" className="field">
                        <TextField
                          label="phone number"
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          >
                            Phone number
                        </TextField>

                    </Stack>
                    
              <Stack item="true" className="button--edit-profile">
                {loading ? (
                  <Button
                    id="loading--button"
               
                    spinner={<PacmanLoader size={20} color='yellow'/>}
                    >
                    loading...
                    </Button>
                ) : (
                  <Button type="submit" form="edit-profile" >
                    Save changes
                  </Button>
                )}
              </Stack>
            </Stack>
            </form>
        </div>
    );
}