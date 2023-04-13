import { Box, Button, Grid, Typography, Chip } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";

export default function MenteeSessions({ token, pk, setAuth }) {
  const [sessions, setSessions] = useState([]);
  const [mentorfirstname, setMentorFirstName] = useState("");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BE_URL}/session/`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => {
        console.log(res.data);
        setSessions(res.data);
        setMentorFirstName(res.data.mentor_first_name);
      })
      .catch((err) => {
        console.log("error", err);
      });
  }, [token, pk]);

  console.log(token);
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

      <Typography
        variant="h2"
        component="div"
        sx={{ flexGrow: 1, marginTop: "4rem", padding: "1rem" }}
      >
        Request:
      </Typography>
      <Box margin={"1rem"}>
        <hr style={{ color: "black" }} />
      </Box>
      <Box>
        <Grid
          container
          sx={{
            flexGrow: 1,
            marginLeft: "1rem",
            fontSize: "25px",
            textAlign: "center",
          }}
        >
          <Grid item xs={3}>
            <Box>Name:</Box>
          </Grid>
          <Grid item xs={3}>
            <Box>Date:</Box>
          </Grid>
          <Grid item xs={3}>
            <Box>Time:</Box>
          </Grid>
          <Grid item xs={3}>
            <Box>Status:</Box>
          </Grid>
        </Grid>
        {sessions.map((session) => {
          return (
            <Grid
              container
              key={session.pk}
              sx={{
                flexGrow: 1,
                marginLeft: "1rem",
                marginTop: "1.75rem",
                fontSize: "25px",
                textAlign: "center",
              }}
            >
              <Grid item xs={3}>
                {
                  <Box>
                    {session.mentor_first_name} {session.mentor_last_name}
                  </Box>
                }
              </Grid>
              <Grid item xs={3}>
                <Box>{new Date(session.start_time).toLocaleDateString()}</Box>
              </Grid>
              <Grid item xs={3}>
                <Box>
                  {new Date(session.start_time).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}{" "}
                  -{" "}
                  {new Date(session.end_time).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Box>
              </Grid>
              <Grid item xs={3}>
                <Chip
                  label={
                    session.status === "Confirmed"
                      ? "Confirmed"
                      : session.status === "Pending"
                      ? "Pending"
                      : "Canceled"
                  }
                  variant="outlined"
                  color={
                    session.status === "Confirmed"
                      ? "success"
                      : session.status === "Pending"
                      ? "warning"
                      : "error"
                  }
                  size="md"
                  sx={{ margin: ".25rem" }}
                >
                  {/* Switch to confirmed onces a mentor confirms the session */}
                </Chip>
              </Grid>
            </Grid>
          );
        })}
      </Box>
    </Box>
  );
}
