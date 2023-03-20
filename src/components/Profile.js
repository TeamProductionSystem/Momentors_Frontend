import { useState } from "react";
import axios from "axios";
import { Button } from '@chakra-ui/react';
import ProfileMentor from "./ProfileMentor"
import ProfileMentee from "./ProfileMentee"

export default function Profile ({ token, pk, setAuth, mentor, setMentor, mentee, setMentee }) {
    const [error, setError] = useState("");

    const updateMentor = (event) => {
        event.preventDefault();
        setError("");
        axios
            .patch('https://team-production-system.onrender.com/myprofile/', {
                'is_mentor': true,
            }, {
                headers: { 'Content-type': 'application/json; charset=UTF-8',
                Authorization: `Token ${token}` }
            })
            .then((res) => {
                setMentor(true)
            })
            .catch((e) => {
                setError(e.message);
            });
    }

    const updateMentee = (event) => {
        event.preventDefault();
        setError("");
        axios
            .patch('https://team-production-system.onrender.com/myprofile/', {
                'is_mentee': true,
            }, {
                headers: { 'Content-type': 'application/json; charset=UTF-8',
                Authorization: `Token ${token}` }
            })
            .then((res) => {
                setMentee(true)
            })
            .catch((e) => {
                setError(e.message);
            });
    }

    if (mentor === true) {
        return (
            <ProfileMentor token={token} pk={pk} setAuth={setAuth} />
        )
    } else if (mentee === true) {
        return (
            <ProfileMentee token={token} pk={pk} setAuth={setAuth} />
        )
    } else {
        return (
            <>
                <p>Are you signing up as a mentor or mentee?</p>
                <Button
                    border='2px'
                    borderColor='orange.200'
                    onClick={updateMentor}>Mentor</Button>
                <Button
                    border='2px'
                    borderColor='orange.200'
                    onClick={updateMentee}
                    >Mentee</Button>
                
            </>
        )
    }
}