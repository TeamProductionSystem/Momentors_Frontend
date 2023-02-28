import { Button } from '@chakra-ui/react';
import { Card, Box, Heading, CardBody, CardFooter, Text, Image, Stack } from '@chakra-ui/react';

export default function Profile ({userName}) {
    return (
        <div className="profile--page">
        <Box>
            <Heading>
                <img src="" alt=""/>
                <h1>{userName}</h1>
                <h1>First Name + Last Name</h1>
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