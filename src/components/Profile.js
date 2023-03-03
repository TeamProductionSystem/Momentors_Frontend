import { useState, useEffect } from 'react';
import { Button } from '@chakra-ui/react';
import { Card, Box, Heading, CardBody, CardFooter, Text, Image, Stack } from '@chakra-ui/react';
import axios from 'axios';

export default function Profile ({ token, pk }) {

// username, first name, last name, skills

const [username, setUsername] = useState("");
const [firstname, setFirstname] = useState("");
const [lastname, setLastname] = useState("");

useEffect(() => {
    // if (!id) return;
    axios
        .get(`https://team-production-system.onrender.com/myprofile/`, {
            headers: { Authorization: `Token ${token}` },
        })
        .then((res) => {
            setUsername(res.data.username);
            setFirstname(res.data.firstname);
            setLastname(res.data.lastname);
            console.log(res)
        })
}, [token, pk])
            
    return (
        <div className="profile--page">
        <Box>
        <Heading>
            <img src="" alt=""/>
            <p>{username}</p>
            <p>{firstname}</p>
            <p>{lastname}</p>
            <p>e-mail</p>
            <Button>Edit</Button>
        </Heading>
        </Box>

                <Card className="profile--bio"
                direction={{ base: 'column', sm: 'row' }}
                overflow='hidden'
                variant='outline'
                >
                        <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZfWLr5vMAESMl38Yncgk4rl7y3-_OiD9nnprz8SGTj2ClL1NfEsn46eXLiPO82dWXZuk&usqp=CAU" alt="temporary image"></Image>
                        <Stack>
                        <CardBody>

                            <Text>Hi I'm so and so and I am skilled at such and such</Text>
                            {/* Pull in bio from database */}
                        </CardBody>

                        <CardFooter>
                            <Text><b>Skills: </b></Text>
                            {/* Pull in marked skills from database */}
                        </CardFooter>
                        </Stack>
                </Card>

        </div>
    )
}