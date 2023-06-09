import { Box, Grid, Typography, Button, Chip } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import CancelSessionButton from "../../components/CancelSessionButton";

export default function MentorRequestedSessions({ token, pk, setAuth }) {
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

  // Function to handle the confirm button
  const handleConfirm = (sessionPK) => {
    axios
      .patch(
        `${process.env.REACT_APP_BE_URL}/sessionrequest/${sessionPK}/`,
        { status: "Confirmed" },
        {
          headers: { Authorization: `Token ${token}` },
        }
      )
      .then((res) => {
        setPendingSessions((prevSessions) =>
          prevSessions.map((session) =>
            session.pk === sessionPK
              ? { ...session, status: "Confirmed" }
              : session
          )
        );
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  return (
    <Box className="mentorrequest--component">
      {/* Filter and add only pending sessions */}
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
        {pendingsessions.map((session) => {
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
                    {session.mentee_first_name} {session.mentee_last_name}
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
                {/* Confirm button */}
                {session.status === "Pending" ? (
                  <>
                    <Button
                      variant="outlined"
                      color="success"
                      size="md"
                      sx={{ margin: ".25rem" }}
                      onClick={() => handleConfirm(session.pk)}
                    >
                      Confirm
                    </Button>
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
                  </>
                ) : session.status === "Confirmed" ? (
                  <Typography
                    variant="outlined"
                    display="block"
                    sx={{ color: "success.main" }}
                  >
                    Confirmed!
                  </Typography>
                ) : session.status === "Canceled" ? (
                  <Chip label="Canceled" color="error" variant="outlined" />
                ) : null}
              </Grid>
            </Grid>
          );
        })}
      </Box>
    </Box>
  );
}
