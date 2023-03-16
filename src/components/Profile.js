import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@chakra-ui/react';
import { Card, Box, Heading, CardBody, CardFooter, Text, Image, Stack, Switch, FormControl, FormLabel } from '@chakra-ui/react';
import axios from 'axios';

export default function Profile ({ token, pk, setAuth }) {

// username, first name, last name, skills

// const [username, setUsername] = useState("");
const [first_name, setFirstname] = useState("");
const [last_name, setLastname] = useState("");
const [phoneNumber, setPhoneNumber] = useState("");

useEffect(() => {
    // if (!id) return;
    axios
        .get(`https://team-production-system.onrender.com/myprofile/`, {
            headers: { Authorization: `Token ${token}` },
        })
        .then((res) => {
            // setUsername(res.data.username);
            setFirstname(res.data.first_name);
            setLastname(res.data.last_name);
            setPhoneNumber(res.data.phone_number);
            console.log(res)
        })
}, [token, pk])
            
    return (
        <div className="profile--page">
        <Box>
        <Heading className="profile--heading">
            <img src="" alt=""/>
            {/* <p className="profile--username">{username}</p> */}
            <p>{first_name} {last_name}</p>
            <p>{phoneNumber}</p>
            
            <Link to="/editprofile" >
                <Button
                border='2px'
                borderColor='orange.200'>Edit</Button>
            </Link>
        </Heading>
        </Box>

        <FormControl display='flex' alignItems='center'>
            <FormLabel className="authentication-switch">
            Mentor or Mentee?
            </FormLabel>
            <Switch id='switch--mentor-mentee' />
        </FormControl>
            

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