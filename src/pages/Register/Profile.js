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
  mentor,
  setMentor,
  mentee,
  setMentee,
}) {
  const [error, setError] = useState("");
  const [userPk, setUserPk] = useState(pk);

  const updateMentor = (event) => {
    event.preventDefault();
    setError("");
    axios
      .patch(
        `${process.env.REACT_APP_BE_URL}/myprofile/`,
        {
          is_mentor: true,
        },
        {
          headers: {
            "Content-type": "multipart/form-data; charset=UTF-8",
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
        `${process.env.REACT_APP_BE_URL}/myprofile/`,
        {
          is_mentee: true,
        },
        {
          headers: {
            "Content-type": "multipart/form-data; charset=UTF-8",
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
