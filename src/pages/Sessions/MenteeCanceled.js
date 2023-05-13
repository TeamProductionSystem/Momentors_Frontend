import { Box, Grid, Typography, Chip } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";

export default function MenteeSessions({ token, pk, setAuth }) {
  const [cancelsessions, setCancelSessions] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BE_URL}/session/`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => {
        setCancelSessions(
          res.data.filter((session) => session.status === "Canceled")
        );
      })
      .catch((err) => {
        console.log("error", err);
      });
  }, [token, pk]);
  return (
    <Box className="menteecanceled--component">
      {/* filter and add only canceled sessions */}
      <Typography
        variant="h2"
        component="div"
        sx={{ flexGrow: 1, marginTop: "4rem", padding: "1rem" }}
      >
        Canceled:
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
        {cancelsessions.map((session) => {
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
                  label={session.status === "Pending" ? "Pending" : "Canceled"}
                  variant="outlined"
                  color={session.status === "Pending" ? "warning" : "error"}
                  size="md"
                  sx={{ margin: ".25rem" }}
                ></Chip>
              </Grid>
            </Grid>
          );
        })}
      </Box>
    </Box>
  );
}
