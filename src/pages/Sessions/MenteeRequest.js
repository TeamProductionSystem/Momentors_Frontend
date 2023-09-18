import { Box, Grid, Typography, Chip } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import CancelSessionButton from "../../components/CancelSessionButton";

export default function MenteeSessions({ token, pk, setAuth }) {
  const [pendingsessions, setPendingSessions] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BE_URL}/session/`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => {
        setPendingSessions(
          res.data.filter((session) => session.status === "Pending")
        );
      })
      .catch((err) => {
        console.log("error", err);
      });
  }, [token, pk]);

  return (
    <Box className="menteerequest--component">
      {/* Filter and add only pending sessions */}
      <Typography
        variant="h5"
        component="div"
        sx={{ flexGrow: 1, marginTop: "1rem", padding: "1rem" }}
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
            fontSize: "20px",
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
        {pendingsessions.map((session) => {
          return (
            <Grid
              container
              key={session.pk}
              sx={{
                flexGrow: 1,
                marginLeft: "1rem",
                marginTop: "1.75rem",
                fontSize: "20px",
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
                {/* Hide the Cancel button if the session is canceled */}
                {session.status === "Pending" ? (
                  <CancelSessionButton
                    token={token}
                    sessionPK={session.pk}
                    onSessionCancelled={(cancelledSessionPK) => {
                      setPendingSessions((prevSessions) =>
                        prevSessions.map((session) =>
                          session.pk === cancelledSessionPK
                            ? { ...session, status: "Canceled" }
                            : session
                        )
                      );
                    }}
                  />
                ) : null}
              </Grid>
            </Grid>
          );
        })}
      </Box>
    </Box>
  );
}
