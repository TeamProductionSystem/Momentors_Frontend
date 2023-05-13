import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import axios from "axios";
import MenteeRequest from "./MenteeRequest";
import MenteeScheduled from "./MenteeScheduled";
import MenteeCanceled from "./MenteeCanceled";

export default function MenteeSessions({ token, pk, setAuth }) {
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
    <Box className="menteesessions--page">
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
        Mentee Session
      </Typography>
      {/* Filter and add only pending sessions */}
      <MenteeRequest token={token} pk={pk} setAuth={setAuth} />

      {/* Filter and add only confirmed sessions */}
      <MenteeScheduled token={token} pk={pk} setAuth={setAuth} />

      {/* filter and add only canceled sessions */}
      <MenteeCanceled token={token} pk={pk} setAuth={setAuth} />
    </Box>
  );
}
