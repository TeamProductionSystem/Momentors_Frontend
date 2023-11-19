import { Box, Grid, Typography, Pagination } from "@mui/material";
import MentorScheduledSessions from "./MentorScheduled";
import MentorRequestedSessions from "./MentorRequest";
import MentorCancledSessions from "./MentorCanceled";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ArchivedSessions({token, pk, mentor}) {
  const [archivedSessions, setArchivedSessions] = useState([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  // tracking sessions displayed based on page
  const [sessionsDisplay, setSessionsDisplay] = useState([]);

  const handlePageChange = (event, value) => { 
    setPage(value); 
  };

  useEffect(() => {
    const indexStart = (page - 1)*10;
    const indexEnd = page*10 - 1;
    setSessionsDisplay(archivedSessions.slice(indexStart,indexEnd));
  }, [page, archivedSessions]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BE_URL}/archivesession/`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => {
        setArchivedSessions(res.data);
        setSessionsDisplay(res.data.slice(0,9));
        setPageCount(Math.ceil(res.data.length/10));
      })
      .catch((err) => {
        console.log("error", err);
      });
  }, [token, pk]);

  return (
    <Box 
      className="mentorsessions--page"
      sx={{
        marginBottom: "2rem",
      }}
    >
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
        Archived Sessions
      </Typography>
      <Box 
        className="mentorcanceled--component"
        sx={{
          marginBottom: "2rem",
        }}
      >
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
            <Grid item xs={4}>
              <Box>Name:</Box>
            </Grid>
            <Grid item xs={4}>
              <Box>Date:</Box>
            </Grid>
            <Grid item xs={4}>
              <Box>Time:</Box>
            </Grid>
          </Grid>
          {sessionsDisplay.map((session) => {
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
                <Grid item xs={4}>
                  {
                    <Box>
                      {mentor ? session.mentee_first_name : session.mentor_first_name} {mentor ? session.mentee_last_name : session.mentor_last_name}
                    </Box>
                  }
                </Grid>
                <Grid item xs={4}>
                  <Box>{new Date(session.start_time).toLocaleDateString()}</Box>
                </Grid>
                <Grid item xs={4}>
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
              </Grid>
            );
          })}
        </Box>
      </Box>
      {pageCount !== 0 ?
              <Box display="flex" justifyContent="center">
                <Pagination 
                count={pageCount} 
                page={page}  
                onChange={handlePageChange} 
                size="large" />
              </Box>
            :
              <></>
          }
    </Box>
  );
}
