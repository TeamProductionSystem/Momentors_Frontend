import { useState } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import { Stack } from "@mui/system";
import ProfileMentor from "../Profile/ProfileMentor";
import ProfileMentee from "../Profile/ProfileMentee";

export default function Profile({
  token,
  pk,
  setAuth,
}) {
  const [error, setError] = useState("");
  const [userPk, setUserPk] = useState(pk);
  // Get user type from localStorage when component mounts
  const [mentor, setMentor] = useState(JSON.parse(sessionStorage.getItem("isMentor")));
  const [mentee, setMentee] = useState(JSON.parse(sessionStorage.getItem("isMentee")));

  const updateMentor = (event) => {
    event.preventDefault();
    setError("");
    // Update the state immediately
    setMentor(true);
    axios
      .patch(
        `${process.env.REACT_APP_BE_URL}/myprofile/`,
        {
          is_mentor: "True",
        },
        {
          headers: {
            "Content-type": "multipart/form-data",
            Authorization: `Token ${token}`,
          },
        }
      )

      .then((res) => {
        axios.post(
          `${process.env.REACT_APP_BE_URL}/mentorinfo/`,
          {
            about_me: "About Me",
            skills: ["HTML"],
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${token}`,
            },
          }
        );
      })

      .then((res) => {
        sessionStorage.setItem("isMentor", true);
        setMentor(true);
      })
      .catch((e) => {
        setError(e.message);
        // If there's an error, reset the state.
        setMentor(false);
      });
  };

  const updateMentee = (event) => {
    event.preventDefault();
    setError("");
    // Update the state immediately
    setMentee(true);
    axios
      .patch(
        `${process.env.REACT_APP_BE_URL}/myprofile/`,
        {
          is_mentee: "True",
        },
        {
          headers: {
            "Content-type": "multipart/form-data",
            Authorization: `Token ${token}`,
          },
        }
      )

      .then((res) => {
        axios.post(
          `${process.env.REACT_APP_BE_URL}/menteeinfo/`,
          {
            team_number: 0,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${token}`,
            },
          }
        );
      })

      .then((res) => {
        sessionStorage.setItem("isMentee", true);
        setMentee(true);
      })
      .catch((e) => {
        // If there's an error, reset the state.
        setMentee(false);
        setError(e.message);
      });
  };

  if (mentor === true) {
    return <ProfileMentor token={token} pk={pk} setAuth={setAuth} />;
  } else if (mentee === true) {
    return <ProfileMentee token={token} pk={pk} setAuth={setAuth} />;
  } else {
    return (
      <div className="Profile-Signup">
        <Stack
          container="true"
          justifyContent="space-evenly"
          alignItems="center"
          spacing={2}
        >
          <div className="Profile-Header">
            <h1>Are you signing up as a mentor or mentee?</h1>
          </div>
          <Button variant="contained" size="large" onClick={updateMentor}>
            Mentor
          </Button>
          <Button variant="contained" size="large" onClick={updateMentee}>
            Mentee
          </Button>
        </Stack>
      </div>
    );
  }
}
