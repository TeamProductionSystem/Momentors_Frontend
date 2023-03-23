import { Navigate, useNavigate } from 'react-router-dom';
import { Button, Box } from '@mui/material';

// We can set this component up to include different info depending on what we pass in
// (for instance the wireframes currently indicate that students will have a team # and mentors will not)
export default function ProfileBasicInfo ({ firstName, lastName, phoneNumber }) {

    const navigate = useNavigate();


    return(
        <Box>
            <div className="profile--heading">
                <img src="" alt=""/>
                <p>{firstName} {lastName}</p>
                <p>{phoneNumber}</p>
                
                    <Button onClick={() => navigate("/editprofile")}>Edit</Button>
            </div>
        </Box>
    )
}