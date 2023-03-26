import { useState } from "react";
import axios from "axios";
import { Button, TextField } from "@mui/material";
import { Stack } from "@mui/system";
import ProfileMentor from "./ProfileMentor";
import ProfileMentee from "./ProfileMentee";
import { Grid } from "@chakra-ui/react";

export default function Profile({
  token,
  pk,
  setAuth,
  mentor,
  setMentor,
  mentee,
  setMentee,
}) {
  const [error, setError] = useState("");

  const updateMentor = (event) => {
    event.preventDefault();
    setError("");
    axios
      .patch(
        "https://team-production-system.onrender.com/myprofile/",
        {
          is_mentor: true,
        },
        {
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `Token ${token}`,
          },
        }
      )
      .then((res) => {
        setMentor(true);
      })
      .catch((e) => {
        setError(e.message);
      });
  };

  const updateMentee = (event) => {
    event.preventDefault();
    setError("");
    axios
      .patch(
        "https://team-production-system.onrender.com/myprofile/",
        {
          is_mentee: true,
        },
        {
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `Token ${token}`,
          },
        }
      )
      .then((res) => {
        setMentee(true);
      })
      .catch((e) => {
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
