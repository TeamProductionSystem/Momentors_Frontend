import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, Grid } from "@mui/material";

export default function CurrentAvailabilities({
  token,
  pk,
  setAuth,
  refreshAvailabilities,
  setRefreshAvailabilities,
}) {
  const [availabilities, setAvailabilities] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BE_URL}/availability/`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => {
        // Sort the availabilities by date
        let sortedAvailabilities = res.data.sort((a, b) => {
          return new Date(a.start_time) - new Date(b.start_time);
        });
        setAvailabilities(sortedAvailabilities);
        setRefreshAvailabilities(false);
      })
      .catch((err) => {
        console.log("error", err);
      });
  }, [token, pk, refreshAvailabilities]);

  return (
    <Box marginTop={"2rem"}>
      <Typography variant="h4">Current Availabilities</Typography>
      <Box margin={"1rem"}>
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
            <Box>Date:</Box>
          </Grid>
          <Grid item xs={3}>
            <Box>Time:</Box>
          </Grid>
        </Grid>

        {/* Map over the availabilities array and display the date and time */}
        {availabilities.length > 0 ? (
          availabilities.map((availability) => (
            <Grid
              container
              key={availability.pk}
              sx={{
                flexGrow: 1,
                marginLeft: "1rem",
                fontSize: "25px",
                textAlign: "center",
                marginTop: "1rem",
              }}
            >
              <Grid item xs={3}>
                <Box>
                  {new Date(availability.start_time).toLocaleDateString()}
                </Box>
              </Grid>
              <Grid item xs={3}>
                <Box>
                  {new Date(availability.start_time).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}{" "}
                  -{" "}
                  {new Date(availability.end_time).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Box>
              </Grid>
            </Grid>
          ))
        ) : (
          <Typography variant="h6" paddingTop={"2rem"} paddingLeft={"7.5rem"}>
            (No open availabilities)
          </Typography>
        )}
      </Box>
    </Box>
  );
}
