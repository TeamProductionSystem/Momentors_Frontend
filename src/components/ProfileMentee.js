import { useState, useEffect } from 'react';
import { Image, Switch, FormControl, FormLabel } from '@chakra-ui/react';
import axios from 'axios';
import ProfileBasicInfo from './ProfileBasicInfo';

export default function ProfileMentee ({ token, pk, setAuth }) {

// first name, last name, phone number
const [firstName, setFirstName] = useState("");
const [lastName, setLastName] = useState("");
const [phoneNumber, setPhoneNumber] = useState("");

useEffect(() => {
    axios
        .get(`https://team-production-system.onrender.com/myprofile/`, {
            headers: { Authorization: `Token ${token}` },
        })
        .then((res) => {
            setFirstName(res.data.first_name);
            setLastName(res.data.last_name);
            setPhoneNumber(res.data.phone_number);
            console.log(res)
        })
}, [token, pk])
            
    return (
        <div className="profile--page">
        <ProfileBasicInfo firstName={firstName} lastName={lastName} phoneNumber={phoneNumber} />
        <FormControl display='flex' alignItems='center'>
            <FormLabel className="authentication-switch">
            Mentor or Mentee?
            </FormLabel>
            <Switch id='switch--mentor-mentee' />
        </FormControl>
        <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZfWLr5vMAESMl38Yncgk4rl7y3-_OiD9nnprz8SGTj2ClL1NfEsn46eXLiPO82dWXZuk&usqp=CAU" alt="temporary image"></Image>
        </div>
    )
}