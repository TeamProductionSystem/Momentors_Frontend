import { Box, Typography } from "@mui/material";
import MentorScheduledSessions from "./MentorScheduled";
import MentorRequestedSessions from "./MentorRequest";
import MentorCancledSessions from "./MentorCanceled";
import { useEffect } from "react";
import axios from "axios";

export default function MentorSessions({token, pk, setAuth}) {
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BE_URL}/session/`, {
        headers: { Authorization: `Token ${token}` },
      })

      .catch((err) => {
        console.log("error", err);
      });
  }, [token, pk]);

  return (
    <Box className="mentorsessions--page">
      <Typography
        variant="h2"
        component="div"
        sx={{
          flexGrow: 1,
          textAlign: "center",
          marginTop: "2rem",
          textDecoration: "underline",
        }}
      >
        Mentor Session
      </Typography>
      {/* Filter and add only pending sessions */}
      <MentorRequestedSessions token={token} pk={pk} setAuth={setAuth} />
      {/* Filter and add only confirmed sessions */}
      <MentorScheduledSessions token={token} pk={pk} setAuth={setAuth} />
      {/* Filter and add only canceled sessions */}
      <MentorCancledSessions token={token} pk={pk} setAuth={setAuth} />
    </Box>
  );
}
