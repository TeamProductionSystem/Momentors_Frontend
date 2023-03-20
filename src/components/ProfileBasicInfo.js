import { Link } from 'react-router-dom';
import { Button } from '@chakra-ui/react';
import { Box, Heading } from '@chakra-ui/react';

export default function ProfileBasicInfo ({ firstName, lastName, phoneNumber }) {
    // We can set this component up to include different info depending on what we pass in (for instance the wireframes currently indicate that students will have a team # and mentors will not)

    return(
        <Box>
            <Heading className="profile--heading">
                <img src="" alt=""/>
                <p>{firstName} {lastName}</p>
                <p>{phoneNumber}</p>
                
                <Link to="/editprofile" >
                    <Button
                    border='2px'
                    borderColor='orange.200'>Edit</Button>
                </Link>
            </Heading>
        </Box>
    )
}