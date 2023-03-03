import { useState, useEffect } from 'react';
import { Button } from '@chakra-ui/react';
import { Card, Box, Heading, CardBody, CardFooter, Text, Image, Stack } from '@chakra-ui/react';
import axios from 'axios';

export default function Profile ({ token, id }) {

// username, first name, last name, skills

const [username, setUsername] = useState("");

useEffect(() => {
    console.log(id);
    // if (!id) return;
    axios
        .get(`https://team-production-system.onrender.com/auth/users/me/`, {
            // hardcode with a 1 and see if it console logs
            headers: { Authorization: `Token ${token}` },
        })
        .then((res) => {
            setUsername(res.data.username);
            console.log(res)
        })
}, [token, id])
            

    return (
        <div className="profile--page">
        <Box>
        <Heading>
            <img src="" alt=""/>
            <p>{username}</p>
            <p>First Name + Last Name</p>
            <p>e-mail</p>
            <Button>Edit</Button>
        </Heading>
        </Box>

                <Card
                direction={{ base: 'column', sm: 'row' }}
                overflow='hidden'
                variant='outline'
                >
                        <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZfWLr5vMAESMl38Yncgk4rl7y3-_OiD9nnprz8SGTj2ClL1NfEsn46eXLiPO82dWXZuk&usqp=CAU" alt="temporary image"></Image>
                        <Stack>
                        <CardBody>

                            <Text>Hi I'm so and so and I am skilled at such and such</Text>
                        </CardBody>

                        <CardFooter>
                            <Text>Skills: </Text>
                        </CardFooter>
                        </Stack>
                </Card>

        </div>
    )
}